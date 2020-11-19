// const css = require("rollup-plugin-css-only");
// const svelte = require("rollup-plugin-svelte");
// const resolve = require("@rollup/plugin-node-resolve");
// const commonjs = require("@rollup/plugin-commonjs");
// const strip = require("@rollup/plugin-strip");
module.exports = {
    "mount": {
        "public": "/",
        "src": "/src"
    },
    "plugins": [
        "@snowpack/plugin-svelte"
    ]
}