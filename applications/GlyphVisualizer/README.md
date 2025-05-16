# GlyphVisualizer

GlyphVisualizer is a web application to visualize the glyphs of a font file. It uses Opentype.js. The novelty is that all the UI is designed mostly with inline SVG, including the display of the glyphs. The SVG widgets that are in external files are: folder ([folder_high.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/folder_high.svg "folder_high.svg")), magnifiers ([zoom-in.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/zoom-in.svg "zoom-in.svg") and [zoom-out.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/zoom-out.svg "zoom-out.svg")),  left and right triangular arrows ([triangle_left.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/triangle_left.svg "triangle_left.svg") and [triangle_right.svg](https://github.com/nilostolte/nilostolte.github.io/blob/main/applications/GlyphVisualizer/resources/triangle_right.svg "triangle_right.svg")) icons. All other elements are inline SVG.

## Documentation

The user must read a font file in order to make the program to start displaying glyphs. This is done either clicking on the folder icon or clicking at the option "Read otf or ttf font file" in the menu. To make the menu appear one must click on the gear icon. The menu disappear without producing any action by clicking again on gear icon. Any active option in the menu produces an action, even the options not yet implemented (if an action is clicked and it's not implemented an alert will be shown indicating that the option is not defined).

The program is self documented, that is, each active element of the GUI shows a text message instructing what it does and what to do when the cursor stops over it. These messages are detailed in the sections below.

## Navigation

<kbd>
  <img src="https://github.com/user-attachments/assets/e067ebfb-dc50-4728-a474-3f6db7149fb9">
</kbd>
<br><br>

## Menu

<kbd>
  <img src="https://github.com/user-attachments/assets/ce6cf595-9c7b-4ec6-aee6-25d2a6ae2dbf">
</kbd>
<br><br>

