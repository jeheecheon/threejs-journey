import * as THREE from "three";
import Experience from "../Experience";

export default class Fox {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.resource = this.resources.items["foxModel"];
        this.debug = this.experience.debug;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Fox");
        }

        this.setModel();
        this.setAnimation();
    }

    setModel() {
        this.model = this.resource.scene;
        this.model.scale.set(0.02, 0.02, 0.02);
        this.scene.add(this.model);

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }

    setAnimation() {
        const mixer = new THREE.AnimationMixer(this.model);
        const actions = {
            idle: mixer.clipAction(this.resource.animations[0]),
            walk: mixer.clipAction(this.resource.animations[1]),
            run: mixer.clipAction(this.resource.animations[2]),
            current: mixer.clipAction(this.resource.animations[0])
        };
        this.animation = {
            mixer,
            actions
        };
        this.animation.actions.current.play();

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const oldAction = this.animation.actions.current;

            newAction.reset();
            newAction.play();
            newAction.crossFadeFrom(oldAction, 1);

            this.animation.actions.current = newAction;
        };

        // Debug
        if (this.debug.active) {
            const debugObject = {
                playIdle: () => this.animation.play("idle"),
                playWalk: () => this.animation.play("walk"),
                playRun: () => this.animation.play("run")
            }

            this.debugFolder.add(debugObject, "playIdle");
            this.debugFolder.add(debugObject, "playWalk");
            this.debugFolder.add(debugObject, "playRun");
        }
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}
