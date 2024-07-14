# Study Note

What I studied / learned during [this course](https://threejs-journey.com)

## Chapter 02.

### 14. Lights

Discovered various built-in light classes

`AmbientLight`:

- It's like omnidirectional. Every part of a object will be lightned up / illuminated the same way.
- To simulate light bouncing!

`DirectionalLight`:

- Sun-like effect as if the sun were traveling in parallel
- When I want to change its orientation, I can just change its position.
- distance doesn't matter for this light system.

`HemisphereLight`:

- This one shows similar result to the AmbientLight but can provide two colors, one for the upper side, and one for the bottom side
- omnidirectional!

![HemisphereLight](./images/hemisphere-light.png)

`PointLight`:

- It's not like a light bulb. It's like an infinitely small point that lights up the space with specified intensity (+ in every direction).
- the facing part (of object) gets a lot of light and the other parts will have less.
- has additional properties, which are `decay` and `distance`
- decay is how fast the light dims after specified distance units.

`RectAreaLight`:

- it's like on the photo shoot!
- it onls works with `MeshStandardMaterial` and `MeshPhysicalMaterial`.

`SpotLight`:

- It's like flash light
- Lights up but faded with distance.
- penumbra specifies how smooth the edges are.
- decay value changes how fast the light intensity goes to zero
- how it can be rotated is different from other lights, I need to change the position of its target and add the target to the scene!

lights impart performance so adding too mushg light is a bad idea(Generally!!!!!!!!)

Minimal cost lights

- `Ambient light`
- `Hemisphere light`

High cost lights

- `SpotLight`
- `RectAreaLight`

#### Bake

When I need to put a lot of lights, I can bake them into the texture.
This can be done in a 3D software. But baked light cannot be moved. It's the only drawback.

#### Light helper

It can be a difficult job to position the light when I can't see the effect of the light!

### 15. Shadows

The dark shadow on the back part of an object is called `core shadow`
The silhouette on the plane is called `drop shadow`

Three.js does a render for each light supporting shadows. Those renders will simulate what the light sees as if it was a camera.

Those light renders produces results as texture and save them into shadow maps!
And then, shadow maps are used to materials where shadows should be projected

Only 3 types of light support shadow

- PointLight
- DirectionalLight
- SpotLight

There are shadowmap algorithms that can be applied to shadow maps

- THREE.BasicShadowMap - Very performant, but lousy quality
- THREE.PCFShadowMap - Less perfomant, but smoother edges (default)
- THREE.PCFSoftShadowMap - Less performant but even softer edges
- THREE.VSMShadowMap - Less performant, more constraints, can have unexpected results

I cannot tweak the FOV property when the light is a PointLight or SpotLight.

PointLight creates shadow maps in 6 directions, which is bad for performance!
better to avoid using too many shadows whenever possible.

### 16. Haunded House
![Practice 02 - Haunted House](https://github.com/jeheecheon/threejs-journey/assets/62019774/b099efa5-5c7b-4622-aa08-2658e18527e4)  
Made a simple project: [Click here to explore the project!](https://jeheecheon.github.io/threejs-journey/practice-02-haunted-house)

### 17. Particles

Particles can be created by using built-in PointsMaterial class.  
Each vertex will be rendered as a particle with specified texture (When it's provided).

#### alphaTest

But What's behind from a particle can mistakenly be hidden. I should tell to GPU which pixel it should draw. It should be done by setting setting alphaTest val between 0 and 1. this way, the transparent values of texture will be used.

#### depthTest

Another solutuib is turning off the depthTest feature. When drawing, the WebGL tests if what's being drawn is closer than what's already drawn. That is called depth testing and can be deactivated.
But turning off depthTest cna creates bug when there is another object with a different color in the scene!!!
![alt text](./images/depthTest.png)

#### depthWrite

The WebGL is testing if what's being drawn is closer than what's already drawn. The depth of what's being drawn is stored in what we call a depth buffer. Instead of not testing if the particle is closer than what's in this depth buffer, we can tell the WebGL not to write particles in that depth buffer

#### blending

By changing the blending property, we can tell the WebGL not only to draw the pixel, but also to add the color of that pixel to the color of the pixel already drawn. That will have a saturation effect that can look amazing.

### 18. Galaxy Generator
![Practice 03 - Galaxy](./images/galaxy.gif)  
Made a simple project: [Click here to explore the project!](https://jeheecheon.github.io/threejs-journey/practice-03-galaxy)

### 19. Scroll based animation
Leanrt how to make canvas transparent
Discovered many interesting ways to trigger anmiations depending on mouse positions and movement.