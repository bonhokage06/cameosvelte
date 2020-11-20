import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import strip from "@rollup/plugin-strip";
import replace from "@rollup/plugin-replace";
import { copy } from '@web/rollup-plugin-copy';
import del from 'rollup-plugin-delete';
export default [
  {
    input: "src/service-worker.js", output: {
      file: "./public/service-worker.js",
      format: "esm",
    },
    plugins: [replace({
      TIMESTAMP: Date.now()
    })]
  },
  {
    input: "src/service-worker.js", output: {
      file: "./build/service-worker.js",
      format: "esm",
    },
    plugins: [replace({
      TIMESTAMP: Date.now()
    }), del({ targets: 'build/*.js' })]
  }, {
    input: 'src/index.js',
    output: {
      name: "App",
      dir: './build/',
      format: "es",
      entryFileNames: "[name].js"
    },
    plugins: [
      css({ output: "./build/index.css" }), svelte(), commonjs(), strip(), nodeResolve(), copy({ patterns: '**/*.{svg,jpg,json,png}', rootDir: "./public" })
    ]
  }
];