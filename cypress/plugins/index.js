// cypress/plugins/index.js

module.exports = (on, config) => {
	require("@cypress/code-coverage/task")(on, config);
	// include any other plugin code...

	// It's IMPORTANT to return the config object
	// with any changed environment variables

	if (config.testingType === "component") {
		const { startDevServer } = require("@cypress/webpack-dev-server");

		// Vue's Webpack configuration
		const webpackConfig = require("@vue/cli-service/webpack.config.js");
		on("dev-server:start", (options) => startDevServer({ options, webpackConfig }));
	}

	return config;
};
