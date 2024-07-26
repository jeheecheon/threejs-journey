import * as THREE from "three";
import { GLTFLoader } from "three/addons";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        // Options
        this.sources = sources;

        // Setup
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader()
        };
    }

    startLoading() {
        // Load each source
        for (const source of this.sources) {
            switch (source.type) {
                case "gltfModel":
                    this.loaders.gltfLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                case "texture":
                    this.loaders.textureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                case "cubeTexture":
                    this.loaders.cubeTextureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        ++this.loaded;
        if (this.loaded === this.toLoad) {
            this.trigger("ready");
        }
    }
}
