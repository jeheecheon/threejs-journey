import * as THREE from "three";
import { OrbitControls } from "three/addons";
import GUI from "lil-gui";

import galaxyVertexShader from "./shaders/galaxy/vertex.glsl";
import galaxyFragmentShader from "./shaders/galaxy/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI({
    closeFolders: true,
}).close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Galaxy
 */
const galaxyParameters = {
    count: 200000,
    size: 0.02,
    radius: 5,
    branches: 4,
    spin: -0.2,
    spread: 1,
    spreadPower: 2,
    innnerColor: "#ff6030",
    outerColor: "#4b72d2",
};

gui.add(galaxyParameters, "count")
    .min(100)
    .max(1000000)
    .step(100)
    .onFinishChange(generateGalaxy);
gui.add(galaxyParameters, "size")
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(generateGalaxy);
gui.add(galaxyParameters, "radius")
    .min(1)
    .max(20)
    .step(0.1)
    .onFinishChange(generateGalaxy);
gui.add(galaxyParameters, "branches")
    .min(2)
    .max(20)
    .step(1)
    .onFinishChange(generateGalaxy);
gui.add(galaxyParameters, "spin")
    .min(-5)
    .max(5)
    .step(0.001)
    .onFinishChange(generateGalaxy);
gui.add(galaxyParameters, "spread")
    .min(0)
    .max(10)
    .step(0.001)
    .onFinishChange(generateGalaxy);
gui.add(galaxyParameters, "spreadPower")
    .min(1)
    .max(10)
    .step(0.001)
    .onFinishChange(generateGalaxy);
gui.addColor(galaxyParameters, "innnerColor").onFinishChange(generateGalaxy);
gui.addColor(galaxyParameters, "outerColor").onFinishChange(generateGalaxy);

let galaxy = null;
let galaxyGeometry = null;
let galaxyMaterial = null;

function generateGalaxy() {
    /**
     * Destroy old galaxy
     */
    if (galaxy) {
        galaxyGeometry.dispose();
        galaxyMaterial.dispose();
        scene.remove(galaxy);
    }

    /**
     * Geometry
     */
    galaxyGeometry = new THREE.BufferGeometry();

    const galaxyPositions = new Float32Array(galaxyParameters.count * 3);
    const galaxyColors = new Float32Array(galaxyParameters.count * 3);
    const scales = new Float32Array(galaxyParameters.count * 1);
    const randomness = new Float32Array(galaxyParameters.count * 3);

    const innerColor = new THREE.Color(galaxyParameters.innnerColor);
    const outerColor = new THREE.Color(galaxyParameters.outerColor);

    for (let i = 0; i < galaxyParameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * galaxyParameters.radius;
        const spinAngle = radius * galaxyParameters.spin;
        const branchAngle =
            (i % galaxyParameters.branches) *
            ((Math.PI * 2) / galaxyParameters.branches);

        galaxyPositions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius;
        galaxyPositions[i3 + 1] = Math.sin(branchAngle + spinAngle) * radius;
        galaxyPositions[i3 + 2] = 0;

        // Randomness
        const randomX =
            Math.pow(Math.random(), galaxyParameters.spreadPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            galaxyParameters.spread *
            radius *
            0.2;
        const randomY =
            Math.pow(Math.random(), galaxyParameters.spreadPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            galaxyParameters.spread *
            radius *
            0.2;
        const randomZ =
            Math.pow(Math.random(), galaxyParameters.spreadPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            galaxyParameters.spread *
            radius *
            1;

        randomness[i3 + 0] = randomX;
        randomness[i3 + 1] = randomY;
        randomness[i3 + 2] = randomZ;

        const mixedColor = innerColor.clone();
        mixedColor.lerp(outerColor, radius / galaxyParameters.radius);

        galaxyColors[i3 + 0] = mixedColor.r;
        galaxyColors[i3 + 1] = mixedColor.g;
        galaxyColors[i3 + 2] = mixedColor.b;

        // Scale
        scales[i] = Math.random();
    }

    galaxyGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(galaxyPositions, 3)
    );
    galaxyGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(galaxyColors, 3)
    );
    galaxyGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    galaxyGeometry.setAttribute(
        "aRandomness",
        new THREE.BufferAttribute(randomness, 3)
    );

    /**
     * Material
     */
    galaxyMaterial = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: galaxyVertexShader,
        fragmentShader: galaxyFragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uSize: { value: 30 * renderer.getPixelRatio() },
        },
    });

    /**
     * Points
     */
    galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 3;
camera.position.x = -2;
camera.position.y = -2;
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update material
    galaxyMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
