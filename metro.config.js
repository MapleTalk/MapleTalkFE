module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
        babelTransformerPath: require.resolve(
          'react-native-typescript-transformer',
        ),
      },
    }),
  },
};
