import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { FontLoader, TextGeometry, RGBELoader } from "three/addons";

import matcapImage4 from "./textures/matcaps/4.png";
import matcapImage5 from "./textures/matcaps/5.png";

import environmentMap from "./textures/environmentMap/2k.hdr";

/**
 * Debug
 */
const gui = new GUI({
    title: "Practice 01 - 3D Text",
}).close();

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");

/**
 * Scnene
 */
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcap4Texture = textureLoader.load(matcapImage4);
matcap4Texture.colorSpace = THREE.SRGBColorSpace;

const matcap5Texture = textureLoader.load(matcapImage5);
matcap5Texture.colorSpace = THREE.SRGBColorSpace;

/**
 * Objects
 */
const donuts = [];

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load(
    `${import.meta.env.VITE_BASE}/fonts/helvetiker_regular.typeface.json`,
    (font) => {
        const textGeometry = new TextGeometry("Jehee Cheon", {
            font,
            size: 0.5,
            depth: 0.2,
            curveSegments: 128,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
        });
        textGeometry.center();

        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcap5Texture,
        });

        const text = new THREE.Mesh(textGeometry, textMaterial);
        gui.add(text.rotation, "x")
            .min(-Math.PI)
            .max(Math.PI)
            .step(0.01)
            .name("Text X");
        gui.add(text.rotation, "y")
            .min(-Math.PI)
            .max(Math.PI)
            .step(0.01)
            .name("Text Y");

        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
        const torusMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcap4Texture,
        });
        for (let i = 0; i < 100; ++i) {
            const donutMesh = new THREE.Mesh(donutGeometry, torusMaterial);

            donutMesh.position.x = (Math.random() - 0.5) * 10;
            donutMesh.position.y = (Math.random() - 0.5) * 10;
            donutMesh.position.z = (Math.random() - 0.5) * 10;

            donutMesh.rotation.x = (Math.random() - 0.5) * 2 * Math.PI;
            donutMesh.rotation.y = (Math.random() - 0.5) * 2 * Math.PI;

            const scale = Math.random();
            donutMesh.scale.set(scale, scale, scale);

            donuts.push(donutMesh);

            scene.add(donutMesh);
        }
    }
);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load(environmentMap, (environtMap) => {
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

camera.position.z = 5;
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

    // Update objects
    donuts.forEach((donut) => {
        let xSpeed = donut.rotation.x > 0 ? 1 : -1;
        let ySpeed = donut.rotation.y > 0 ? 1 : -1;

        donut.rotation.x = elapsedTime * xSpeed;
        donut.rotation.y = elapsedTime * ySpeed;
    });

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
