# My threejs learning journey
# My study note

three.js 강의 수강하며 배운 것 정리
What I did / learned from this course
[Lesson link](https://threejs-journey.com/)

## 03. First Three.js Project
- created various three.js objects, including `Scene`, `Object`, `BoxGeometry`, `MeshBasisMaterial`, `Mesh`, `PerspectiveCamera` and `WebGLRenderer`
- rendered a Cube Mesh onto the screen

![image](https://github.com/jeheecheon/threejs-journey/assets/62019774/30d5affe-ac39-4f72-84c1-53ec849f5e8d)

## 04. First Three.js Project
- discovered how to group 3d objects into a single unit.
- learned how to scale, rotate and move using properties `position`, `rotation` and `scale`.
- found out the usage of `AxesHelper`.
- learned how to make camera focus on a specific point.

![image](https://github.com/jeheecheon/threejs-journey/assets/62019774/a72c574d-7ca1-4b30-a0fc-bb2261b5085c)

## 05. Animations
- learned how to make animate objects using requestAnimationFrame on the `window` object.
- animated objects consistently on each frame using delta time value.
- discovered how to use a built-in `Clock` class.
- installed gressnsock library. learned this library called requestAnimationFrame on its own.
  (it doesn't mean I don't need to render scene by myself.)

## 06. Camera
There are various types of cameras I can use.
- `Camera` is just an abstract Camera ohter cameras inherit from.
- `ArrayCamera` is used to render a scene with multible point of views.
- `StreoCamera` to create an depth effot for special devices for example like VR headset...
- `CubeCamera` make six renders, one on the left, one on the right, one backword and so on... to create a render of the surrounding. Three.js uses this one to make environment maps. Or things that needs reflection, refraction and shadow.
- `OrthographicCamera` used to create a render of the scene without perspective.
- `PerspectiveCamera` renders scnes with perspective info.

A list of controls available right now
- [FlyControls](https://threejs.org/docs/?q=control#examples/en/controls/FlyControls)
- [FirstPersonControls](https://threejs.org/docs/?q=control#examples/en/controls/FirstPersonControls)
- [PointerLockControls](https://threejs.org/docs/?q=control#examples/en/controls/PointerLockControls)
- [OrbicControls](https://threejs.org/docs/?q=control#examples/en/controls/OrbitControls)
- [TrackballControls](https://threejs.org/docs/?q=control#examples/en/controls/TrackballControls)
- [TransformControls](https://threejs.org/docs/?q=control#examples/en/controls/TransformControls)
- [DragControls](https://threejs.org/docs/?q=control#examples/en/controls/TransformControls)
- [MapControls](https://threejs.org/docs/?q=control#examples/en/controls/TransformControls)
- [ArchballControls](https://threejs.org/docs/?q=control#examples/en/controls/ArcballControls)

+ In the latest versions of Three.js, DeviceOrientationControls has been removed because a reliable implementation across all devices was not possible.
