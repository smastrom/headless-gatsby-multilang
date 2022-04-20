module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jestPreprocess.js',
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
};
