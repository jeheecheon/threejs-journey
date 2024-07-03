import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

/*
 * cursor
 */
const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
    console.log(cursor.x, cursor.y);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scnene
const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        // wireframe: true,
    })
);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Camera
// * first param is vertical field of view
// * second param is aspect ratio
// * third param is near clipping plane
// * fourth param is far clipping plane
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// );

camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // mesh.rotation.y = elapsedTime;

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
