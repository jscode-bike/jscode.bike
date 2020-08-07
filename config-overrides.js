const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const rewireFrontmatterMarkdown = require("react-app-rewire-frontmatter-markdown");
const hljs = require("highlight.js"); // https://highlightjs.org/
const javascript = require("highlight.js/lib/languages/javascript");
hljs.registerLanguage("js", javascript);

module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ["json", "javascript"],
    })
  );
  rewireFrontmatterMarkdown(config, {
    mode: ["react-component"],
    markdownIt: {
      highlight: function (str, lang = "js") {
        if (hljs.getLanguage(lang)) {
          try {
            const output = hljs.highlight(lang, str, true).value;
            return output;
          } catch (_) {}
        }
      },
    },
  });
  return config;
};
