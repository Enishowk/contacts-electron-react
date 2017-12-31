import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

export default {
  entry: "src/index.js",
  format: "cjs",
  dest: "src/app.min.js",
  plugins: [babel({ exclude: "node_modules/**" }), uglify({}, minify)],
  external: ["electron", "react-dom", "react-router-dom", "react"]
};
