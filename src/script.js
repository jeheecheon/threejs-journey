import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import GUI from "lil-gui";
import gsap from "gsap";
import colorImage from "./textures/door/color.jpg";
import alphaImage from "./textures/door/alpha.jpg";
import heightImage from "./textures/door/height.jpg";
import normalImage from "./textures/door/normal.jpg";
import ambientOcclusionImage from "./textures/door/ambientOcclusion.jpg";
import metalnessImage from "./textures/door/metalness.jpg";
import roughnessImage from "./textures/door/roughness.jpg";



/*
    Debug
*/
const gui = new GUI({
    title: "My Awesome GUI",
    width: 300,
    closeFolders: false,
}).close();
gui.hide();

window.addEventListener("keydown", (event) => {
    if (event.key === "h") {
        // this is how to toggle gui
        gui.show(gui._hidden);
    }
})

const debugObject = {
    materialColor: 0xff0000,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
    // console.log(cursor.x, cursor.y);
});

window.addEventListener("dblclick", () => {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

    const requestFullscreen = (
        canvas.requestFullscreen || canvas.webkitRequestFullscreen
    ).bind(canvas);

    const exitFullscreen = (
        document.exitFullscreen || document.webkitExitFullscreen
    ).bind(document);

    if (fullscreenElement) {
        exitFullscreen();
    } else {
        requestFullscreen();
    }
});

// Scnene
const scene = new THREE.Scene();

/*
    Textures
*/

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log("onStart");
};
loadingManager.onLoad = () => {
    console.log("onLoad");
}
loadingManager.onProgress = () => {
    console.log("onProgress");
}
loadingManager.onError = () => {
    console.log("onError");
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(colorImage);
const alphaTexture = textureLoader.load(alphaImage);
const heightTexture = textureLoader.load(heightImage);
const normalTexture = textureLoader.load(normalImage);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImage);
const metalnessTexture = textureLoader.load(metalnessImage);
const roughnessTexture = textureLoader.load(roughnessImage);

colorTexture.colorSpace = THREE.SRGBColorSpace;

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

colorTexture.center = new THREE.Vector2(0.5, 0.5);
colorTexture.rotation = Math.PI / 4;

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    // color: debugObject.materialColor,
    map: colorTexture
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const myAwesomFolder = gui.addFolder("My Aweson folder");
myAwesomFolder.close();

myAwesomFolder
    .add(mesh.position, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("elevation");

myAwesomFolder.add(mesh, "visible").name("visible");

myAwesomFolder.add(mesh.material, "wireframe").name("wireframe");

myAwesomFolder
    .addColor(debugObject, "materialColor")
    .name("color")
    .onChange(() => {
        material.color.set(debugObject.materialColor);
    });

debugObject.spin = function () {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y - Math.PI * 2 });
};

myAwesomFolder.add(debugObject, "spin").name("spin");

debugObject.subdivision = 2;

myAwesomFolder
    .add(debugObject, "subdivision")
    .min(2)
    .max(100)
    .step(1)
    .name("subdivision")
    // it will be triggered when the value is changed
    .onFinishChange(() => {
        // Dispose the old geometry. This is important to avoid memory leaks
        mesh.geometry.dispose();

        mesh.geometry = new THREE.BoxGeometry(
            1,
            1,
            1,
            debugObject.subdivision,
            debugObject.subdivision,
            debugObject.subdivision
        );
    });

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 2;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animations
const tick = () => {
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
