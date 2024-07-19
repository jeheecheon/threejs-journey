# Study Note

What I studied / learned during [this course](https://threejs-journey.com)

## Chapter 03.

### 20. Physics

3D physics libraries

- Ammo.js
- Cannon.js
- Oimo.js

2D physics libraries

- Matter.js
- P2.js
- Planck.js
- Box2D.js

There are also solutions tryting to comine Three.js with physics library like Physijs

### 21. Imported models

Different criteria

- Dedicated to one software
- Very light but might lack specific data
- Almost all data but are heavy
- Open source
- Not opne source
- Binary
- ASCII
- Etc.

A list of popular formats you might come across:

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- GLTF

GLTF stands for GL Transmission Format. It's made by the Khronos Group  
GLTF supports 4 different GLTF formats:

- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded

#### glTF

This format is kind of the default format. It contains various information like cameras, lights, scenes, materials, objects transformations, but neither the geometries nor the textures. The .bin file is a binary that you can't read like this. It usually contains data like the geometries and all information associated with the vertices like UV coordinates, normals, vertex colors, etc.

When we load this format, we only load the .gltf that contains references to the other files that will then be loaded automatically.

#### glTF-Binary

This format is composed of only one file.

This format can be a little lighter and more comfortable to load because there is only one file, but you won't be able to easily alter its data. For example, if you want to resize or compress the textures, you just can't because it's inside that binary file, merge with the rest.

#### glTF-Draco

This format is like the glTF default format, but the buffer data (typically the geometry) is compressed using the Draco algorithm. If you compare the .bin file size, you'll see that it's much lighter.

#### glTF-Embedded

This format is like the glTF-Binary format because it's only one file, but this file is actually a JSON that you can open in your editor.

The only benefit of this format is to have only one easily editable file.

#### Animation
Animations should be handle this way in THREE.js
```js
mixer = new THREE.AnimationMixer(gltf.scene);
const action = mixer.clipAction(gltf.animations[0]);
action.play();
```
