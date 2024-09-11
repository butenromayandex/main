const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sspa",
    projectName: "main",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        // library: { type: 'var', name: 'home' },
        filename: 'remoteEntry.js',
        remotes: {
          "auth": "auth@http://localhost:8501/sspa-auth.js",
          "profile": "profile@http://localhost:8502/sspa-profile.js",
        },
        shared: ["react", "react-dom"],
        // exposes: {
        //   './Card': './src/components/Card',
        // },
      }),
    ],
  });
};
