import * as THREE from "three";
import { GLTFLoader, DRACOLoader, OrbitControls } from "three/addons";
import { gsap } from "gsap";
import * as lil from "lil-gui";

import firefliesVertexShader from "./shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl";

import overlayVertexShader from "./shaders/overlay/vertex.glsl";
import overlayFragmentShader from "./shaders/overlay/fragment.glsl";

import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

/**
 * Base
 */
// Debug
const debugObject = {
    clearColor: "#201919",
    portalColorStart: "#cf9ee0",
    portalColorEnd: "#623e7e"
};
const gui = new lil.GUI({ width: 400 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
const loadingBarElement = document.querySelector(".loading-bar");
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        // Wait a little
        window.setTimeout(() => {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });
            gsap.to(firefliesMaterial.uniforms.uAlpha, { duration: 3, value: 1, delay: 1 });

            // Update loadingBarElement
            loadingBarElement.classList.add("ended");
            loadingBarElement.style.transform = "";
        }, 500);
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBarElement.style.transform = `scaleX(${progressRatio})`;
    }
);

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

/**
 * Textures
 */
const bakedTexture = textureLoader.load("./textures/baked3.webp");
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshToonMaterial({ map: bakedTexture });

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

// Portal light material
const portalLightMaterial = new THREE.ShaderMaterial({
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
        uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) }
    }
});
gui.addColor(debugObject, "portalColorStart").onChange(() => {
    portalLightMaterial.uniforms.uColorStart.value.set(debugObject.portalColorStart);
});
gui.addColor(debugObject, "portalColorEnd").onChange(() => {
    portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd);
});

/**
 * Models
 */
gltfLoader.load("/models/portal.glb", (gltf) => {
    const merged = gltf.scene.children.find((child) => child.name === "Merged");
    const poleLightAMesh = gltf.scene.children.find((child) => child.name === "PoleLightA");
    const poleLightBMesh = gltf.scene.children.find((child) => child.name === "PoleLightB");
    const portalLightMesh = gltf.scene.children.find((child) => child.name === "PortalLight");

    merged.material = bakedMaterial
    portalLightMesh.material = portalLightMaterial;
    poleLightAMesh.material = poleLightMaterial;
    poleLightBMesh.material = poleLightMaterial;

    scene.add(gltf.scene);
});

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms: {
        uAlpha: { value: 1 }
    },
    vertexShader: overlayVertexShader,
    fragmentShader: overlayFragmentShader,
    depthWrite: false
    // depthTest: false,
});
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay);

/**
 * Fireflies
 */
// Geometry
const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 30;
const positions = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);

for (let i = 0; i < firefliesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 4; // x
    positions[i * 3 + 1] = Math.random() * 2; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // z

    scaleArray[i] = Math.random() * 0.9 + 0.1;
}

firefliesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
firefliesGeometry.setAttribute("aScale", new THREE.BufferAttribute(scaleArray, 1));

// Material
const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 60 },
        uAlpha: { value: 0 },
        uTime: { value: 0 }
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

gui.add(firefliesMaterial.uniforms.uSize, "value").min(1).max(500).step(1).name("firefliesSize");

// Points
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
scene.add(fireflies);

/**
 * Lights
 */
const directionalLight = new THREE.AmbientLight("#ffffff", 1);
directionalLight.castShadow = false;
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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

    // Update fireflies
    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 2, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(debugObject.clearColor);

gui.addColor(debugObject, "clearColor").onChange(() => {
    renderer.setClearColor(debugObject.clearColor);
});

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update fireflies
    firefliesMaterial.uniforms.uTime.value = elapsedTime;

    // Update portal light
    portalLightMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
