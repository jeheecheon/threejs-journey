import Experience from "../Experience";
import * as THREE from "three";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Environment");
        }

        this.setSunLight();
        this.setEnvironmentMap();
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(3.5, 2, -1.25);
        this.scene.add(this.sunLight);

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.sunLight, "intensity")
                .min(0)
                .max(10)
                .step(0.001)
                .name("intensity");

            this.debugFolder
                .add(this.sunLight.position, "x")
                .min(-10)
                .max(10)
                .step(0.001)
                .name("x");

            this.debugFolder
                .add(this.sunLight.position, "y")
                .min(-10)
                .max(10)
                .step(0.001)
                .name("y");

            this.debugFolder
                .add(this.sunLight.position, "z")
                .min(-10)
                .max(10)
                .step(0.001)
                .name("z");
        }
    }

    setEnvironmentMap() {
        this.environmentMap = {
            intensity: 0.4,
            texture: this.resources.items["environmentMapTexture"]
        };
        this.environmentMap.texture.encoding = THREE.sRGBEncoding;
        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (
                    child instanceof THREE.Mesh &&
                    child.material instanceof THREE.MeshStandardMaterial
                ) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            });
        };
        this.environmentMap.updateMaterials();

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, "intensity")
                .min(0)
                .max(1)
                .step(0.001)
                .name("intensity")
                .onChange(() => {
                    this.environmentMap.updateMaterials();
                });
        }
    }
}