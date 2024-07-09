import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

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
    count: 20000,
    size: 0.02,
    radius: 5,
    branches: 4,
    spin: 1,
    spread: 1,
    spreadPower: 2,
    innnerColor: "#ff6030",
    outerColor: "#4b72d2",
};

gui.add(galaxyParameters, "count")
    .min(100)
    .max(100000)
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

    const innerColor = new THREE.Color(galaxyParameters.innnerColor);
    const outerColor = new THREE.Color(galaxyParameters.outerColor);

    for (let i = 0; i < galaxyParameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * galaxyParameters.radius;
        const spinAngle = radius * galaxyParameters.spin;
        const branchAngle =
            (i % galaxyParameters.branches) *
            ((Math.PI * 2) / galaxyParameters.branches);

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

        galaxyPositions[i3 + 0] =
            Math.cos(branchAngle + spinAngle) * radius + randomX;
        galaxyPositions[i3 + 1] =
            Math.sin(branchAngle + spinAngle) * radius + randomY;
        galaxyPositions[i3 + 2] = randomZ;

        const mixedColor = innerColor.clone();
        mixedColor.lerp(outerColor, radius / galaxyParameters.radius);

        galaxyColors[i3 + 0] = mixedColor.r;
        galaxyColors[i3 + 1] = mixedColor.g;
        galaxyColors[i3 + 2] = mixedColor.b;
    }

    galaxyGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(galaxyPositions, 3)
    );
    galaxyGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(galaxyColors, 3)
    );

    /**
     * Material
     */
    galaxyMaterial = new THREE.PointsMaterial({
        size: galaxyParameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });

    /**
     * Points
     */
    galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);
}

generateGalaxy();

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
