# Study Note

What I studied / learned during [this course](https://threejs-journey.com)

## Chapter 01.

### 03. First Three.js Project

-   created various three.js objects, including `Scene`, `Object`, `BoxGeometry`, `MeshBasisMaterial`, `Mesh`, `PerspectiveCamera` and `WebGLRenderer`
-   rendered a Cube Mesh onto the screen

![image](https://github.com/jeheecheon/threejs-journey/assets/62019774/30d5affe-ac39-4f72-84c1-53ec849f5e8d)

### 04. First Three.js Project

-   discovered how to group 3d objects into a single unit.
-   learned how to scale, rotate and move using properties `position`, `rotation` and `scale`.
-   found out the usage of `AxesHelper`.
-   learned how to make camera focus on a specific point.

![image](https://github.com/jeheecheon/threejs-journey/assets/62019774/a72c574d-7ca1-4b30-a0fc-bb2261b5085c)

### 05. Animations

-   learned how to make animate objects using requestAnimationFrame on the `window` object.
-   animated objects consistently on each frame using delta time value.
-   discovered how to use a built-in `Clock` class.
-   installed gressnsock library. learned this library called requestAnimationFrame on its own.
    (it doesn't mean I don't need to render scene by myself.)

### 06. Camera

There are various types of cameras I can use.

-   `Camera` is just an abstract Camera ohter cameras inherit from.
-   `ArrayCamera` is used to render a scene with multible point of views.
-   `StreoCamera` to create an depth effot for special devices for example like VR headset...
-   `CubeCamera` make six renders, one on the left, one on the right, one backword and so on... to create a render of the surrounding. Three.js uses this one to make environment maps. Or things that needs reflection, refraction and shadow.
-   `OrthographicCamera` used to create a render of the scene without perspective.
-   `PerspectiveCamera` renders scnes with perspective info.

A list of controls available right now

-   [FlyControls](https://threejs.org/docs/?q=control#examples/en/controls/FlyControls)
-   [FirstPersonControls](https://threejs.org/docs/?q=control#examples/en/controls/FirstPersonControls)
-   [PointerLockControls](https://threejs.org/docs/?q=control#examples/en/controls/PointerLockControls)
-   [OrbicControls](https://threejs.org/docs/?q=control#examples/en/controls/OrbitControls)
-   [TrackballControls](https://threejs.org/docs/?q=control#examples/en/controls/TrackballControls)
-   [TransformControls](https://threejs.org/docs/?q=control#examples/en/controls/TransformControls)
-   [DragControls](https://threejs.org/docs/?q=control#examples/en/controls/TransformControls)
-   [MapControls](https://threejs.org/docs/?q=control#examples/en/controls/TransformControls)
-   [ArchballControls](https://threejs.org/docs/?q=control#examples/en/controls/ArcballControls)

In the latest versions of Three.js, DeviceOrientationControls has been removed because a reliable implementation across all devices was not possible.

![chrome-capture-2024-7-3](https://github.com/jeheecheon/threejs-journey/assets/62019774/616cff37-2562-4bd2-8d73-afaf272d4a9f)

### 07. Fullscreen and resizing

-   learned how to make canvas fit the screen.
-   fount out how to handle resize event to fit the canvas size accordingly.
-   learned how to have the user enter and exit fullscreen

Users may have a screen with a diffrent pixel ratio (higher than 1) and would have bad expierence because of it. So I need to tell the renderer what pixel ratio a user has.

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

### 08. Geometries

`vertices`(vertex): are coordinates in space. vertices are linked to create a `faces`

Three.js built-in geometries
All of the Geometires provided by Three.js inherit from `Geometry` Class!
It was great to understand all of the built-in Gemotries from just playint with it on the official website. It provides each of the Geometries with a viewer!

[BoxGeometry](https://threejs.org/docs/?q=Geometry#api/en/geometries/BoxGeometry)
I could find other examples as well on the website...

Three.js built-in shaders use a value of position attribute so I need to set the attribute appropriately when creating `BufferGeometry`!
It should be done like this...

```javascript
const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);
```

![heart](https://github.com/jeheecheon/threejs-journey/assets/62019774/76130068-822c-4ea6-af74-9d0cc1f5380b)

### 09. Debug UI

Debug tools available

1. dat.GUI
2. lil-gui
3. control-panel
4. Uil
5. Tweakpane
6. Guify
7. Oui

lil-gui

-   popular
-   well maintained
-   easy to use

To use the lil-gui
first I needed to instal this library.
`npm i lil-gui`

And then I can import this like this
`import GUI from 'lil-gui'`

Now I can add properties that I want to change values during debugging.
`GUI.add(someObject, "a name of property");`

Three.js does some color management thing so when you tweak a color property and get the color value, it's a different to the real color that's being used🙄
Three.js internally uses a slightly diffrent color!!
So I need to manage color values in a diffrent object like this.

```javascript
const debugObject = {
    color: "#ffffff",
};
```

[lil-gui documentation](https://lil-gui.georgealways.com/)

