import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import strip from "@rollup/plugin-strip";
export default {
  input: 'src/index.js',
  output: {
    name: "App",
    file: './build/bundle.js',
    format: "esm"
  },
  plugins: [
    css(), svelte(), commonjs(), strip(), nodeResolve()
  ]
};