const webpack = require("@nativescript/webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = (env) => {
	webpack.init(env);

	webpack.chainWebpack((config) => {
		config.plugin("polyfills").use(NodePolyfillPlugin);

		config.plugin("define-env").use(DefinePlugin, [
			{
				"process.env": JSON.stringify({
					NODE_ENV: process.env.NODE_ENV || "development",
				}),
			},
		]);
	});

	return webpack.resolveConfig();
};