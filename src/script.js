import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl");

const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
    console.log(cursor.x, cursor.y);
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

// Geometry and Material
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
const geometry = new THREE.ShapeGeometry( heartShape );

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = Math.PI;
scene.add(mesh);

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

camera.position.z = 5;
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
