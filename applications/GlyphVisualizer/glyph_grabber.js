var code = 33;
var index;
var font;
var yMin, yMax;
var wMax, hMax;
var outlinesFormat;
var scale = 1.25;

function fontname() {
	// matches everything following a / or a \ at the end of the string
	let name = fontFileName.match(/[^\\/]+?$/)[0]; 
	if ( name == "" ) {
		if (fontFileName == "") return "none";
		return fontFileName;
	}
	console.log(name);
	if (18 < name.length) name = name.substring(0, 18);
	return name;
}

function onReadFile(e) {
    var file = e.target.files[0];
    fontFileName = e.target.value;
	console.log(fontFileName);
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            font = opentype.parse(e.target.result, {lowMemory:true});
            showErrorMessage('');
            onFontLoaded(font);
			document.getElementById("font").textContent = fontname();
        } catch (err) {
            showErrorMessage(err.toString());
            if (err.stack) console.log(err.stack);
            throw(err);
        }
    };
    reader.onerror = function(err) {
        showErrorMessage(err.toString());
    };

    reader.readAsArrayBuffer(file);
}

function onFontLoaded(font) {
    window.font = font;
    var head = font.tables.head;
    yMin = head.yMin;
    yMax = head.yMax;
    wMax =  font.tables.hhea.advanceWidthMax;
    hMax = yMax - yMin;
    outlinesFormat = font.outlinesFormat;
    /*
        var w = cellWidth - cellMarginLeftRight * 2,
            h = cellHeight - cellMarginTop - cellMarginBottom,
            head = font.tables.head,
            maxHeight = head.yMax - head.yMin;
        fontScale = Math.min(w/(head.xMax - head.xMin), h/maxHeight);
        fontSize = fontScale * font.unitsPerEm;
        fontBaseline = cellMarginTop + h * head.yMax / maxHeight;
    */

    // var ind = fontFileName.lastIndexOf('\\');
    // if (ind == -1) ind = fontFileName.lastIndexOf('/');

    index = font.tables.cmap.glyphIndexMap[code];
    if (index == undefined) index = 0;
    if (index == 0) {
        document.getElementById("code").innerText = 0;
        code = 0;
    }
    document.getElementById("index").innerText = index;
    document.getElementById("glyph_display").style.borderStyle = "solid";
    generateSVG();
}
function showErrorMessage(message) {
    var el = document.getElementById('message');
    if (!message || message.trim().length === 0) {
        el.style.display = 'none';
    } else {
        el.style.display = 'block';
    }
    el.innerHTML = message;
}

function pathCommandToSVGString(cmd) {
    const sep = ' ';
    var str;
    switch(cmd.type) {
        case "M":
            str = "M" + sep + cmd.x + sep + (-cmd.y);
            break;
        case "L":
            str = "L" + sep + cmd.x + sep + (-cmd.y);
            break;
        case "Q":
            str = "Q" + sep + cmd.x1 + sep + (-cmd.y1) + sep + cmd.x + sep + (-cmd.y) ;
            break;
        case "C":
            str = "C" + sep + cmd.x1 + sep + (-cmd.y1) + sep + cmd.x2 + sep + (-cmd.y2) + sep + cmd.x + sep + (-cmd.y);
            break;
        case "Z":
            str = "Z";
            break;
        default:
            str = "ERROR: unknown command: " + cmd.type;
    }
    return str;
}

function getSVGfromPSGlyph() { // same as getSVGGlyph but for PostScript fonts
    var i = 0, cmd, xMin, yMin, xMax, yMax, tx, ty;
    var glyph, path;
    glyph = font.glyphs.get(index);
    path = glyph.path;
    size = path.commands.length;
    if (size <= 0) return "";
    var svgPath = "";
    xMin = yMin = Number.MAX_SAFE_INTEGER;
    xMax = yMax = Number.MIN_SAFE_INTEGER;
    while(true) {
        cmd = path.commands[i];
        svgPath += pathCommandToSVGString(cmd);
        if (cmd.x < xMin) xMin = cmd.x;
        if (cmd.y < yMin) yMin = cmd.y;
        if (cmd.x > xMax) xMax = cmd.x;
        if (cmd.y > yMax) yMax = cmd.y;
        if (++i == size) break;
        svgPath += " ";
    }
    tx = ((wMax-(xMax-xMin)) >> 1) - xMin;
    ty = yMax + ((hMax-(yMax-yMin)) >> 1);
    return "<path " + "transform=\"translate(" + tx + "," + ty + ")\" d=\"" + svgPath + "\"/>";
}
function getSVGGlyph() {
    if (index == undefined ) { return; }
    if (outlinesFormat.charAt(0) == "c") { // PostScript font
        return getSVGfromPSGlyph();
    }
    var glyph, path;
    var i, j, size, tx, ty;
    var text = "";
    glyph = font.glyphs.get(index);
    path = glyph.path;
    size = path.commands.length -1;
    if (size <0 ) return "";
    tx = ((wMax-(glyph.xMax-glyph.xMin)) >> 1) - glyph.xMin;
    ty = glyph.yMax + ((hMax-(glyph.yMax-glyph.yMin)) >> 1);
    text += "<path " + "transform=\"translate(" + tx + "," + ty + ")\" d=\"";
    for ( j= 0; j < size; j++ )
        text += pathCommandToSVGString(path.commands[j]) + " ";
    text += pathCommandToSVGString(path.commands[size]) + "\"/>";
    return text;
}

function generateSVG() {
    if (!font) {
        alert("Please load a font by clicking the button <Choose File> below");
        return;
    }
    if (index == undefined ) {
        alert("An unknown index indicates the glyph does not exist");
        return;
    }
    const indoc = true;
    const nl = (indoc) ? "<br>" : "\n";
    var text = "<svg viewBox=\" 0 0 " + wMax + " " +  hMax  +"\" overflow=\"visible\">\n";
    text += "   " + getSVGGlyph( ) + "\n";
    text += "</svg>";
    // if (indoc) document.write(text);
    if (indoc) {
        document.getElementById("glyph_display").innerHTML = text;
    }
}

// function format() {
//     document.getElementById("line1").setAttribute("style", "height: " + (40 * scale) + "px;");
//     document.getElementById("zoom").setAttribute("style", "left: " + (250 * scale) + "px");
// }
// format();

// var cssVarVal;
// function generateCSSVarMap() {
//     var r = document.querySelector(':root');
//     var rs = getComputedStyle(r);
//     cssVarVal = [
//         [ "--d6", parseInt(rs.getPropertyValue("--d6"))],
//         [ "--d40", parseInt(rs.getPropertyValue("--d40"))],
//     ];
// }
function zoom() {
    var r = document.querySelector(':root');
    // var i, e;
    // for (i = 0; i < cssVarVal.length; i++) {
    //     e = cssVarVal[i];
    //     r.style.setProperty(e[0], ""+(e[1]*scale)+"px");
    // }
    r.style.setProperty("--s", scale);
    var rs = getComputedStyle(r);
	
	//
}

var zoom_inc = 0.125;
function zoomIn() {
    scale += zoom_inc;
    zoom();
	document.getElementById("scale").textContent = scale;
	//console.log(document.getElementById("scale"));
}

function zoomOut() {
    if (scale == zoom_inc) return;
    scale -= zoom_inc;
    zoom();
	document.getElementById("scale").textContent = scale;
	//console.log(document.getElementById("scale"));
}
//
// var f;
//
// async function upLoadFile() {
//     [f] = await window.showOpenFilePicker();
//     var fname = f.name;
//     console.log(fname);
// }

// var menu_visible = false;
// var menu;
// var gear;
// function toggleMenu() {
//     if (menu_visible ) {
//         menu.parentNode.removeChild(menu);
//         menu_visible = false;
//         return;
//     }
//     gear.parentNode.removeChild(gear);
//     document.body.appendChild(menu);
//     document.body.appendChild(gear);
//     menu_visible = true;
// }

function intUnicode(unicode) {
    return unicode;
}
function indexUpdate(value){
    if (!font) {
        alert("Please load a font by clicking the button <Choose File> below");
        return;
    }
    console.log("new index: " + value + " - old index: " + index);
	var myindex;
	if (typeof value === "string") {
		if (value.charAt(value.length-1) === " ")  value = value.substring(0, value.length-1);
		if (value === "") {
			console.log("value is empty - restoring old value")
			document.getElementById("index").innerText = index;
			return;
		}
		myindex = parseInt(value);
	}
    else myindex = value;
	if (typeof myindex !== "number") myindex = index;
    if (myindex == index) return; //trying to reenter the same value
    var last = font.numGlyphs -1;
    if ( (myindex > last ) || (myindex < 0) ) {
        console.log("off bounds: " + ((myindex > last )? "maximum " + last: "minimum zero"));
        document.getElementById("index").innerText = index;
        return;
    }
    document.getElementById("index").innerText = myindex;
    index = myindex;
    var glyph = font.glyphs.get(index);
    code = glyph.unicodes.map(intUnicode)[0];
    if (code == undefined) { code = 0;}
    document.getElementById("code").innerText = code;
}

function index_entered(value) {
    console.log("index_entered: "+value);
    var myindex = index;
    indexUpdate(value);
    if (myindex == index) return;
    generateSVG();
}

function nextIndex(){
    if (index == undefined) return;
    var myindex = index;
    indexUpdate(index + 1);
    if (myindex == index) return;
    generateSVG();
}
function prevIndex(){
    if (index == undefined) return;
    var myindex = index;
    indexUpdate(index - 1);
    if (myindex == index) return;
    generateSVG();
}

function index_reload(){
        document.getElementById("index").innerText = index;
}

function codeUpdate(value){
    var mycode, myindex;
    if (font) {
		if (typeof value === "string") {
			if (value.charAt(value.length-1) === " ")  value = value.substring(0, value.length-1);
			if (value === "") {
				console.log("value is empty - restoring old value")
				document.getElementById("code").innerText = code;
				return;
			}
			mycode = parseInt(value);
		}
		else mycode = value;
		if (typeof mycode !== "number") mycode = index;
        if (mycode == code) return;
        myindex = font.tables.cmap.glyphIndexMap[mycode];
        if (myindex == undefined) {
            document.getElementById("code").innerText = code;
            return;
        }
        code = mycode;
        index = myindex;
        document.getElementById("index").innerText = myindex;
        return;
    }

}

function code_entered(value) {
    var mycode = code;
    codeUpdate(value);
    if (mycode == code) return;
    generateSVG();
}

function nextCode(){
    if (code == undefined) return;
    var mycode = code;
    codeUpdate(code + 1);
    if (mycode == code) return;
    document.getElementById("code").innerText = code;
    generateSVG();
}
function prevCode(){
    if (code == undefined) return;
    var mycode = code;
    codeUpdate(code - 1);
    if (mycode == code) return;
    document.getElementById("code").innerText = code;
    generateSVG();
}

function code_reload(){
    document.getElementById("code").innerText = code;
}


function clickNumber(e) {
    var id = e.target.id;
    var element = document.getElementById(id.substring(0,id.length-3));
    if (element.innerText == "") {
        element.innerText = " ";
    };
    setCursor(0, element );
}
function setCursor(pos, element) {
    // Creates range object
    var setpos = document.createRange();

    // Creates object for selection
    var set = window.getSelection();

    // Set start position of range
    setpos.setStart(element.childNodes[0], pos);

    // Collapse range within its boundary points
    // Returns boolean
    // setpos.collapse(true);

    // Remove all ranges set
    set.removeAllRanges();

    // Add range with respect to range object.
    set.addRange(setpos);

    // Set cursor on focus
    element.focus();
}
function enter( e ){
    console.log("enter pressed "+e.target.id+ " - text: " + e.target.innerText);
    window[e.target.id+"_entered"](document.getElementById(e.target.id).innerText);
	window.getSelection().removeAllRanges(); // remove focus
	document.getElementById(e.target.id).blur();
}
function backspace(e) {
    var caretPos = window.getSelection().getRangeAt(0).startOffset;
    console.log("baskspace for "+e.target.id+ " - text: " + e.target.innerText + "at position: " + caretPos);
    if (caretPos > 0) {
        if (caretPos == 1) {
			if (e.target.innerText.length == 1) {
				e.target.innerText = " ";
			}
            else e.target.innerText = e.target.innerText.substring(1);
            return;
        }
        e.target.innerText = e.target.innerText.substring(0,caretPos-1);
        e.target.innerText += e.target.innerText.substring(caretPos);
		setCursor(caretPos-1,e.target);
    }
}
function del(e) {
    var caretPos = window.getSelection().getRangeAt(0).startOffset;
    console.log("delete for "+e.target.id+ " - text: \"" + e.target.innerText + "\" at position: " + caretPos);
    if (caretPos < e.target.innerText.length) {
        if (caretPos == 0) {
            if (e.target.innerText.length == 1) {
				e.target.innerText = " ";
			}
            else e.target.innerText = e.target.innerText.substring(1);
            return;
        }
        e.target.innerText = e.target.innerText.substring(0,caretPos);
        e.target.innerText += e.target.innerText.substring(caretPos+1);
		setCursor(caretPos,e.target);
    }
}
function left(e) {
    var caretPos = window.getSelection().getRangeAt(0).startOffset;
    if (caretPos > 0) setCursor(caretPos - 1,e.target);
}
function right(e) {
    var caretPos = window.getSelection().getRangeAt(0).startOffset;
    if (caretPos <  e.target.innerText.length) {
		if (e.target.innerText.charAt(caretPos) != " ")
			setCursor(caretPos + 1,e.target);
	}
}
function home(e) {
    setCursor(0,e.target);
}
function end(e) {
	if (e.target.innerText.charAt(e.target.innerText.length - 1) == " ") {
		console.log("** found hairspace **");
		setCursor(e.target.innerText.length - 1,e.target);
		return;
	}
    setCursor(e.target.innerText.length,e.target);
}

var keyProcessing = {
    "Enter" :  enter,
    "Backspace": backspace,
    "Delete" : del,
    "ArrowLeft": left,
    "ArrowRight" : right,
    "ArrowDown" : home,
    "Home" : home,
    "ArrowUp" : end,
    "End" : end
}

function editNumber(e){
    if (e.shiftKey) { e.preventDefault(); return; }
    var key = e.key;
    var str = "", i, text;
    console.log(a2hex(e.target.innerText) + " = " + e.target.innerText);
    if (key.length > 1) {
        var f = keyProcessing[key];
        if ( f !== undefined ) {
            f(e);
        }
        e.preventDefault();
        return;
    }
    var char = key.charCodeAt(0);
    if ((char < 48) || (char > 57)) {
        e.preventDefault();
    }
    if (e.target.innerText.length > 7) {
        e.preventDefault();
    }
}

function a2hex(str) {
    var hex = '';
    for (var i = 0, l = str.length; i < l; i++) {
        var hexx = Number(str.charCodeAt(i)).toString(16);
        hex += (hexx.length > 1 && hexx || '0' + hexx);
    }
    return hex;
}
