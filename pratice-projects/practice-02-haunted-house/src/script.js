import * as THREE from "three";
import { OrbitControls, Timer, Sky } from "three/addons";
import GUI from "lil-gui";

/**
 * Images
 */
// floor
import floorAlphaImage from "./textures/floor/alpha.webp";
import floorColorImage from "./textures/floor/mud_cracked_dry_03_1k/mud_cracked_dry_03_diff_1k.webp";
import floorARMImage from "./textures/floor/mud_cracked_dry_03_1k/mud_cracked_dry_03_arm_1k.webp";
import floorNormalImage from "./textures/floor/mud_cracked_dry_03_1k/mud_cracked_dry_03_nor_gl_1k.webp";
import floorDisplacementImage from "./textures/floor/mud_cracked_dry_03_1k/mud_cracked_dry_03_disp_1k.webp";
// wall
import wallColorImage from "./textures/wall/stone_wall_04_1k/stone_wall_04_diff_1k.webp";
import wallARMImage from "./textures/wall/stone_wall_04_1k/stone_wall_04_arm_1k.webp";
import wallNormalImage from "./textures/wall/stone_wall_04_1k/stone_wall_04_nor_gl_1k.webp";
import wallDisplacementImage from "./textures/wall/stone_wall_04_1k/stone_wall_04_disp_1k.webp";
// roof
import roofColorImage from "./textures/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp";
import roofARMImage from "./textures/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp";
import roofNormalImage from "./textures/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp";
import roofDisplacementImage from "./textures/roof/roof_slates_02_1k/roof_slates_02_disp_1k.webp";
// bush
import bushColorImage from "./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp";
import bushARMImage from "./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp";
import bushNormalImage from "./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp";
import bushDisplacementImage from "./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_disp_1k.webp";
// grave
import graveColorImage from "./textures/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp";
import graveARMImage from "./textures/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp";
import graveNormalImage from "./textures/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp";
// door
import doorColorImage from "./textures/door/color.webp";
import doorAlphaImage from "./textures/door/alpha.webp";
import doorAmbientOcclusionImage from "./textures/door/ambientOcclusion.webp";
import doorHeightImage from "./textures/door/height.webp";
import doorNormalImage from "./textures/door/normal.webp";
import doorMetalnessImage from "./textures/door/metalness.webp";
import doorRoughnessImage from "./textures/door/roughness.webp";

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

// Floor
const floorAlphaTexture = textureLoader.load(floorAlphaImage);
const floorColorTexture = textureLoader.load(floorColorImage);
const floorARMTexture = textureLoader.load(floorARMImage);
const floorDisplacementTexture = textureLoader.load(floorDisplacementImage);
const floorNormalTexture = textureLoader.load(floorNormalImage);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

// Wall
const wallColorTexture = textureLoader.load(wallColorImage);
const wallARMTexture = textureLoader.load(wallARMImage);
const wallNormalTexture = textureLoader.load(wallNormalImage);
const wallDisplacementTexture = textureLoader.load(wallDisplacementImage);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof
const roofColorTexture = textureLoader.load(roofColorImage);
const roofARMTexture = textureLoader.load(roofARMImage);
const roofNormalTexture = textureLoader.load(roofNormalImage);
const roofDisplacementTexture = textureLoader.load(roofDisplacementImage);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// Bush
const bushColorTexture = textureLoader.load(bushColorImage);
const bushARMTexture = textureLoader.load(bushARMImage);
const bushNormalTexture = textureLoader.load(bushNormalImage);
const bushDisplacementTexture = textureLoader.load(bushDisplacementImage);

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

// Grave
const graveColorTexture = textureLoader.load(graveColorImage);
const graveARMTexture = textureLoader.load(graveARMImage);
const graveNormalTexture = textureLoader.load(graveNormalImage);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

// Door
const doorColorTexture = textureLoader.load(doorColorImage);
const doorAlphaTexture = textureLoader.load(doorAlphaImage);
const doorAmbientOcclusionTexture = textureLoader.load(
    doorAmbientOcclusionImage
);
const doorHeightTexture = textureLoader.load(doorHeightImage);
const doorNormalTexture = textureLoader.load(doorNormalImage);
const doorMetalnessTexture = textureLoader.load(doorMetalnessImage);
const doorRoughnessTexture = textureLoader.load(doorRoughnessImage);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Meshes
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.112,
    })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const floorDebugFolder = gui.addFolder("floor").close();
floorDebugFolder
    .add(floor.material, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("floor displacement scale");
floorDebugFolder
    .add(floor.material, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("floor displacement bias");

// House group
const houseGroup = new THREE.Group();
scene.add(houseGroup);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4, 100, 100, 100),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        transparent: true,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
        displacementMap: wallDisplacementTexture,
        displacementScale: 0.2,
        displacementBias: -0.144,
    })
);
walls.position.y += 2.5 / 2;
houseGroup.add(walls);

const wallsDebugFolder = gui.addFolder("walls").close();
wallsDebugFolder
    .add(walls.material, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("wall displacement scale");
wallsDebugFolder
    .add(walls.material, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("wall displacement bias");

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4, 100),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        transparent: true,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
        displacementMap: roofDisplacementTexture,
        displacementScale: 0.108,
        displacementBias: -0.056,
    })
);
roof.position.y += 2.5 + 1.5 / 2;
roof.rotation.y = Math.PI / 4;
houseGroup.add(roof);

const roofDebugFolder = gui.addFolder("roof").close();
roofDebugFolder
    .add(roof.material, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("roof displacement scale");
roofDebugFolder
    .add(roof.material, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("roof displacement bias");

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        displacementBias: -0.017,
    })
);
door.position.y = 1;
door.position.z = 2 + 0.01;
houseGroup.add(door);

const doorDebugFolder = gui.addFolder("door").close();
doorDebugFolder
    .add(door.position, "y")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("door y");
doorDebugFolder
    .add(door.material, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("door displacement scale");
doorDebugFolder
    .add(door.material, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("door displacement bias");

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 64, 64);
const bushMeterial = new THREE.MeshStandardMaterial({
    color: "#89c854",
    map: bushColorTexture,
    transparent: true,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
    displacementMap: bushDisplacementTexture,
    displacementScale: 0.304,
    displacementBias: -0.306,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMeterial);
bush1.scale.setScalar(0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -Math.PI / 6;

const bush2 = new THREE.Mesh(bushGeometry, bushMeterial);
bush2.scale.setScalar(0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -Math.PI / 6;

const bush3 = new THREE.Mesh(bushGeometry, bushMeterial);
bush3.scale.setScalar(0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -Math.PI / 6;

const bush4 = new THREE.Mesh(bushGeometry, bushMeterial);
bush4.scale.setScalar(0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -Math.PI / 6;

houseGroup.add(bush1, bush2, bush3, bush4);

const bushDebugFolder = gui.addFolder("bush").close();
bushDebugFolder
    .add(bushMeterial, "displacementScale")
    .min(0)
    .max(1)
    .step(0.001)
    .name("bush displacement scale");
bushDebugFolder
    .add(bushMeterial, "displacementBias")
    .min(-1)
    .max(1)
    .step(0.001)
    .name("bush displacement bias");

// Gaves
const graveGroup = new THREE.Group();
scene.add(graveGroup);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    transparent: true,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
});

for (let i = 0; i < 30; ++i) {
    const angle = Math.random() * Math.PI * 2;

    const radius = 3.2 + Math.random() * 7;

    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, Math.random() * 0.4, z);
    grave.rotation.x = (Math.random() * Math.PI) / 4;
    grave.rotation.y = Math.random() * Math.PI;
    graveGroup.add(grave);
}

/**
 * Lights
 */
const lightColors = {
    ambient: "#d34545",
    directional: "#fd5d5d",
    doorPoint: "#d400ff",
};

// Ambient light
const ambientLight = new THREE.AmbientLight(lightColors.ambient, 0.2);
scene.add(ambientLight);

const ambientLightDebugFolder = gui.addFolder("ambient light").close();
ambientLightDebugFolder
    .addColor(lightColors, "ambient")
    .onChange(() => {
        ambientLight.color.set(lightColors.ambient);
    })
    .name("ambient light color");
ambientLightDebugFolder
    .add(ambientLight, "intensity")
    .min(0)
    .max(1)
    .step(0.001)
    .name("ambient light intensity");

// Directional light
const directionalLight = new THREE.DirectionalLight(lightColors.directional, 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

const directionalLightDebugFolder = gui.addFolder("directional light").close();
directionalLightDebugFolder
    .addColor(lightColors, "directional")
    .onChange(() => {
        directionalLight.color.set(lightColors.directional);
    })
    .name("directional light color");
directionalLightDebugFolder
    .add(directionalLight, "intensity")
    .min(0)
    .max(1)
    .step(0.001)
    .name("directional light intensity");

// Door light
const doorLight = new THREE.PointLight(lightColors.doorPoint, 1, 7);
doorLight.position.set(0, 2.2, 2.7);
houseGroup.add(doorLight);

const doorLightDebugFolder = gui.addFolder("door light").close();
doorLightDebugFolder
    .addColor(lightColors, "doorPoint")
    .onChange(() => {
        doorLight.color.set(lightColors.doorPoint);
    })
    .name("door light color");
doorLightDebugFolder
    .add(doorLight, "intensity")
    .min(0)
    .max(1)
    .step(0.001)
    .name("door light intensity");

// Ghost light
const ghostLight1 = new THREE.PointLight("#ff00ff", 1);
const ghostLight2 = new THREE.PointLight("#ff0088", 1);
const ghostLight3 = new THREE.PointLight("#ff0000", 1);
scene.add(ghostLight1, ghostLight2, ghostLight3);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
 * Shadows
 */
// renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive
directionalLight.castShadow = true;
ghostLight1.castShadow = true;
ghostLight2.castShadow = true;
ghostLight3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for (const grave of graveGroup.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
}

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.bottom = -8;

ghostLight1.shadow.mapSize.width = 256;
ghostLight1.shadow.mapSize.height = 256;
ghostLight1.shadow.camera.near = 1;
ghostLight1.shadow.camera.far = 10;

ghostLight2.shadow.mapSize.width = 256;
ghostLight2.shadow.mapSize.height = 256;
ghostLight2.shadow.camera.near = 1;
ghostLight2.shadow.camera.far = 10;

ghostLight3.shadow.mapSize.width = 256;
ghostLight3.shadow.mapSize.height = 256;
ghostLight3.shadow.camera.near = 1;
ghostLight3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.setScalar(100);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value = new THREE.Vector3(
    0.3,
    -0.038,
    -0.95
);

scene.add(sky);

/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#02343f", 0.1);
// scene.fog = new THREE.Fog("#02343f", 1, 13);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
    // Timer
    timer.update();
    const elapsedTime = timer.getElapsed();

    // Ghost
    const ghost1Angle = elapsedTime * 0.2;
    ghostLight1.position.x = Math.sin(ghost1Angle) * 4;
    ghostLight1.position.z = Math.cos(ghost1Angle) * 4;
    ghostLight1.position.y =
        Math.sin(ghost1Angle) *
        Math.sin(ghost1Angle * 2.34) *
        Math.sin(ghost1Angle * 3.45);

    const ghost2Angle = -elapsedTime * 0.6;
    ghostLight2.position.x = Math.sin(ghost2Angle) * 5;
    ghostLight2.position.z = Math.cos(ghost2Angle) * 5;
    ghostLight2.position.y =
        Math.sin(ghost2Angle) *
        Math.sin(ghost2Angle * 2.34) *
        Math.sin(ghost2Angle * 3.45);

    const ghost3Angle = elapsedTime * 0.9;
    ghostLight3.position.x = Math.sin(ghost3Angle) * 7.5;
    ghostLight3.position.z = Math.cos(ghost3Angle) * 7.5;
    ghostLight3.position.y =
        Math.sin(ghost3Angle) *
        Math.sin(ghost3Angle * 2.34) *
        Math.sin(ghost3Angle * 3.45);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};
tick();
