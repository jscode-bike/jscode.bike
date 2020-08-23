const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const rewireFrontmatterMarkdown = require("react-app-rewire-frontmatter-markdown");

module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ["json", "javascript"],
    })
  );
  rewireFrontmatterMarkdown(config, {
    mode: ["react-component"],
  });
  return config;
};
