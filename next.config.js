module.exports = {
  publicRuntimeConfig: {
    API_URL: "https://website-gallery.now.sh" //process.env.API_URL
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader"
    });
    return config;
  }
};
