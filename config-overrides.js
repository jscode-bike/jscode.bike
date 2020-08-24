const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const rewireFrontmatterMarkdown = require("react-app-rewire-frontmatter-markdown");

module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: [
        "json",
        "javascript",
        /// below is optional for richer autocompletion...
        /// see if you can make this a configurable
        // "typescript",
      ],
    })
  );
  rewireFrontmatterMarkdown(config, {
    mode: ["react-component"],
  });
  return config;
};
