# GlyphVisualizer

[GlyphVisualizer](https://nilostolte.github.io/applications/GlyphVisualizer/) is a web application to visualize the glyphs of a font file. It uses Opentype.js. The novelty is that all the UI is designed mostly with inline SVG, including the display of the glyphs. The SVG widgets that are in external files are: folder ([folder_high.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/folder_high.svg "folder_high.svg")), magnifiers ([zoom-in.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/zoom-in.svg "zoom-in.svg") and [zoom-out.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/zoom-out.svg "zoom-out.svg")),  left and right triangular arrows ([triangle_left.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/triangle_left.svg "triangle_left.svg") and [triangle_right.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/triangle_right.svg "triangle_right.svg")) icons. All other elements are inline SVG.

## Documentation

The user must read a font file in order to make the program start displaying glyphs. This is done either clicking on the folder icon or clicking at the option "Read otf or ttf font file" in the menu. To make the menu appear one must click on the gear icon. The menu disappear without producing any action by clicking again on gear icon. Any active option in the menu produces an action, even the options not yet implemented (if an action is clicked and it's not implemented an alert will be shown indicating that the option is not defined).

The program is self documented, that is, each active element of the GUI shows a text message instructing what it does and what to do when the cursor stops over it. These messages are detailed in the sections below.

## Navigation
The figure below shows all messages displayed when stopping the cursor over each navigation element. These elements allow to change the glyph being displayed. The triangular arrows allow to pass to the previous and to the next glyph in the font, or the glyph with previous and the next code (ASCII or Unicode). 

The index of the glyph in the font and the code of the glyph are displayed in the corresponding fields as decimal numbers. Some glyphs don't have an ASCII or Unicode code. In these cases the code displayed is zero and the arrows to pass from one code to the previous or to the next won't work. Navigating using only the glyphs indices will always allow to pass from one glyph to the previous or to the next, provided the glyph is not the first or the last one in the font. When the first glyph of the font is reached it's not possible to pass to the previous glyph, since it doesn't exist. In the opposite situation, if the last glyph in the font was reached, it's not possible to pass to the next glyph, since it also doesn't exist either.

The figure shows the character `%` which corresponds to the ASCII code `37` in decimal as indicated. The index shown is `8` , which indicates that the ninth glyph in this particular font (`Camy W01 Normal Narrow.ttf`) corresponds to character `%`.

The fields containing the index and the code can be typed by hand to allow accessing a glyph directly. All it's needed to accomplish that is to click in either field and edit the content using the keyboard. Once the edition is finished, hitting `Enter` exits the edition mode and the submitted content is validated. Indices or codes that don't exist in the font are not accepted. In these cases the value is not modified and the glyph displayed remains the same.

If a correct value was entered the new value is set and the correspondent glyph is displayed. If the value entered was a code, the corresponding index is also updated. If the value entered was an index the corresponding code, if it exists, is updated. If the code doesn't exist, the code zero is displayed and both navigation arrows for changing code stop working.

<kbd>
  <img src="https://github.com/user-attachments/assets/e067ebfb-dc50-4728-a474-3f6db7149fb9">
</kbd>
<br><br>

## Menu

The figure below shows all messages displayed when stopping the cursor over the gear icon or each element in the menu. Clicking on the gear toggles between displaying or hiding the menu. Stopping the cursor over the menu's title shows a welcome message, a description of what the program does, and a suggestion to click at the option "Read otf or ttf font file" to upload a font file. This option is the only one that actually triggers a useful action. The other two options only issue alert messages saying the options weren't yet implemented.

This menu only exists as a demo to show how to implement menus with active menu options using inline SVG and JS. Each menu option changes the option background color when clicked to indicate the option was accepted. Notwithstanding, only when the mouse button is released the choice is actually accepted and the action taken. Once the action is taken, the menu automatically closes. If the button is not released and the cursor is dragged outside the option field, the choice is disconsidered and the the menu is automatically closed.

As far as a demo is concerned, it's a completely customized and customizable menu that is elegant, compact, easy to implement, having predictable behavior (no side effects), robust, and scalable. The fact that the menu itself can be hidden, or have its options change background colors when clicked, etc., requires the SVG code to be inline, since its attributes may change dynamically. We could also have implemented the same sort of interactive behavior with other elements of the interface, by making these elements inline as well.

At the bottom of the menu, the name of the font file (in this case truncated to fit the menu width) and the scale applied to the whole interface are displayed, as shown in the figure.

<kbd>
  <img src="https://github.com/user-attachments/assets/5887c9bb-186c-4d83-b352-3ad94bed37c9">
</kbd>
<br><br>

## Scaling

The figure below shows all messages displayed when stopping the cursor over the magnifiers or the folder icons. By clicking on either these icons produces a corresponding action. Clicking on the magnifiers changes the scale of the whole interface.

<kbd>
  <img src="https://github.com/user-attachments/assets/5ee57648-98e3-4b73-ae36-482b88442a66">
</kbd>

