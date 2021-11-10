const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

// vue.config.js
module.exports = {
    publicPath: '/',
    devServer: { port: process.env.PORT || 8081,  
        progress: false },

    configureWebpack: {
        plugins: [
            new GoogleFontsPlugin({
                fonts: [
                    { family: "Roboto" }
                ]
            })
        ]
    },

    transpileDependencies: [
      'vuetify'
    ]
};
