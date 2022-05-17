<img src="vector/twitter-banner-upsized.svg" style="width:100%; height: 100%;" >
<img src="vector/bar.svg" style="width:100%; height: 100%;">
<a href="https://twitter.com/nilostolte"><img src="vector/twitter-logo.svg" style="width:4%; height: 4%; vertical-align: bottom; padding-left: 4%; padding-bottom: 0.15%; padding-right: 0.25%;"></a>&nbsp;
<a href="https://github.com/nilostolte"><img src="vector/github-logo.svg" style="width:4%; height: 4%; vertical-align: bottom; padding-top: 0.5%; padding-left: 0.25%; padding-right: 0.375%;"></a>&nbsp;
<a href="https://dev.to/nilostolte"><img src="vector/dev-logo.svg" style="width:4%; height: 4%; vertical-align: bottom; padding-left: 0.375%;"></a>
<img src="vector/bar.svg" style="width:100%; height: 100%;">

## Why vector graphics?

Vector graphics is preferable to pixel graphics in many cases because its image quality is independent of the 
screen resolution. One of the typical properties of vector graphics is allowing infinite zooming without any 
quality lost. This property is excellent for GUIs, and using only simple primitives the interfaces can be built 
practically hardware independent and be portable. Another advantage of using these primitives is that common 
vector art produced by graphics designers can be used in live interfaces or widgets. This means that interfaces 
are no longer limited in terms of creativity.

## [Vector Art](https://github.com/nilostolte/Vector-Art#vector-art)

Vector graphics allows styles widely known in graphics design for quite a long time. It is very popular for 
commercial use, such as in logos, labels and advertisements. These designs are generally flat, but near realistic 
designs gain popularity with the advent of digital vector art. Below is an example of flat vector art of mine 
used as beer label:

<p align="center">
<img src="vector/selling-england.svg" style="width:60%; height: 60%;">
</p>

## Technical Illustrations

Vector graphics really excells in technical illustrations. Below the correspondence between the octree data structure and its representation in space is shown. The space is recursively subdivided in eight equal sized regions called octants. The octants are contiguously stored in arrays with eight positions as shown. If the octant is not empty it points to another array of eight positions and so forth until the last level is reached. Here the coordinates of the voxel nearer to the observer in a space with resolution 32³ are placed in a table to show how their bits are grouped to form an index in the array at each of its five levels. In this way one can convert indexes to coordinates and vice-versa.

<p align="center">
<img src="vector/octree-struct.svg" style="width:90%; height: 90%;">
</p>
<br>

## Why to use vector graphics everywhere?

Vector graphics solves the problem of having different and quite disparate displays and screen 
resolutions, especially in the near future with ultra high resolutions, because it scales 
appropriately without losing quality. It becomes the ideal technology to construct GUIs in 
different programming languages as well as on the web as demonstrated in this website. The 
simplicity of vector primitives also promotes portability across different platforms, OS, 
and languages. Since they are quite similar in different environments it is easy to 
automatically convert from one environment to another.

## What about 3D graphics? Is it vector graphics?

3D graphics and the different 3D frameworks (e.g., OpenGL) are only partially vectorial 
nowadays. Imagine 2D vector graphics without Bezier curves. That’s what 3D graphics look 
like because surfaces are defined by polygons. 3D graphics still don’t allow the use of 
3D Bezier patches at rendering time. Since 2D Bezier curves are “flattened” as a set of 
lines to be displayed, it is possible that in the future 3D Bezier patches will be flattened 
as a set of polygons. 3D surfaces “flatness” should change with depth (levels of detail), 
whereas in 2D curves it remains constant.

## [ClockWidget](https://github.com/nilostolte/ClockWidget)

ClockWidget is a real time vector graphics clock inspired in a design found in 
[**Freepik**](https://www.freepik.com/) and written in 
[**Java**](https://github.com/nilostolte/ClockWidget/blob/main/com/ClockWidget.java). 
This is an implementation working on desktops, automatically placed at the top right 
side of the screen.

The same analog vector graphics clock appearing [here](https://nilostolte.github.io/examples) 
is ClockWidget rewritten in 
[**JavaScript**](https://github.com/nilostolte/nilostolte.github.io/blob/main/index.html) 
using 
[**HTML 5 Canvas vector graphics primitives**](https://github.com/nilostolte/nilostolte.github.io/blob/main/index.html). 
In this implementation every time the width of the browser window changes, the size of 
the clock also changes. A modifiable map sets the bold parts of this text clickable, 
independently of size.

## Basic Vector Interface

[This example](https://nilostolte.github.io/) coded using HTML 5 Canvas and JavaScript demonstrates simple interactivity in an interface that allows changing a Bezier curve. The picking algorithm just loops into the array containing the coordinates of the control points of the Bezier curve. Once the point  clicked on is found it can be changed by moving the mouse. For more complex objects this scheme is inadequate. One can get constant time picking by organizing the objects in lists or grids (as in menus or in calculator keys), or exploiting some sort of spacial coherence scheme such as BSP tree or quadtree. Although this is more straighforward in Java, on the web this would be more adequate and efficient using WebAssembly.


<p align="center">
  <img src="https://user-images.githubusercontent.com/80269251/162779499-d5274b4e-4309-4899-83de-3c3e24b1bd88.png">
</p>

<img src="vector/bar.svg" style="width:100%; height: 100%;">

## [Research Work](https://github.com/nilostolte/Research-Work#research-work)

<img src="vector/bar.svg" style="width:100%; height: 100%;">
