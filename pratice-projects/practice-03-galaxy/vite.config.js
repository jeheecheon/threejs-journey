import restart from "vite-plugin-restart";
import glsl from "vite-plugin-glsl";

export default {
    base: "/threejs-journey/practice-03-galaxy",
    root: "./", // Sources files (typically where index.html is)
    publicDir: "./static/", // Path from "root" to static assets (files that are served as they are)
    server: {
        host: true, // Open to local network and display URL
        // open: !(
        //     "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env
        // ), // Open if it's not a CodeSandbox
    },
    build: {
        outDir: "./dist", // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
    },
    assetsInclude: ["**/*.hdr"], // Include .hdr files
    plugins: [
        restart({ restart: ["./static/**"] }), // Restart server on static file change
        glsl()
    ],
};
