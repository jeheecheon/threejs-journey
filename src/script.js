import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import GUI from "lil-gui";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import doorColorImage from "./textures/door/color.jpg";
import doorAlphaImage from "./textures/door/alpha.jpg";
import doorHeightImage from "./textures/door/height.jpg";
import doorNormalImage from "./textures/door/normal.jpg";
import doorAmbientOcclusionImage from "./textures/door/ambientOcclusion.jpg";
import doorMetalnessImage from "./textures/door/metalness.jpg";
import doorRoughnessImage from "./textures/door/roughness.jpg";
import matcapImage from "./textures/matcaps/3.png";
import gradientImage from "./textures/gradients/5.jpg";

/**
 * Debug
 */
const gui = new GUI();

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");

/**
 * Scnene
 */
const scene = new THREE.Scene();

/**
 * Objects
 */

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load(doorColorImage);
const doorAlphaTexture = textureLoader.load(doorAlphaImage);
const doorHeightTexture = textureLoader.load(doorHeightImage);
const doorNormalTexture = textureLoader.load(doorNormalImage);
const doorAmbientOcclusionTexture = textureLoader.load(
    doorAmbientOcclusionImage
);
const doorMetalnessTexture = textureLoader.load(doorMetalnessImage);
const doorRoughnessTexture = textureLoader.load(doorRoughnessImage);
const matcapTexture = textureLoader.load(matcapImage);
const gradientTexture = textureLoader.load(gradientImage);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

matcapTexture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshPhysicalMaterial();
material.side = THREE.DoubleSide;
material.roughness = 1;
material.metalness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAlphaTexture;

gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "metalness").min(0).max(1).step(0.0001);

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 64, 64),
    material
);

const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.1, 64, 128),
    material
);

sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environtMap) => {
    environtMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environtMap;
    scene.environment = environtMap;
});

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 4;
scene.add(camera);

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
 * Animations
 */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    sphereMesh.rotation.y = elapsedTime * 1.5;
    planeMesh.rotation.y = elapsedTime * 1.5;
    torusMesh.rotation.y = elapsedTime * 1.5;

    sphereMesh.rotation.x = elapsedTime * 0.7;
    planeMesh.rotation.x = elapsedTime * 0.7;
    torusMesh.rotation.x = elapsedTime * 0.7;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
