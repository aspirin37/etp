module.exports = {
  devServer: {
    port: 3000,
  },

  transpileDependencies: [
    'vuetify',
  ],

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins.scss";',
      },
    },
  },

  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/icons',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.[hash:8].svg',
      },
      pluginOptions: {
        plainSprite: true,
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
};
