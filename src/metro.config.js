const { getDefaultConfig } = require("metro-config");

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: ["svg"],
    sourceExts: ["js", "jsx", "ts", "tsx", "svg"],
  },
};
