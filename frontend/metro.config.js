const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: exclusionList([
      // Exclude nested node_modules
      /node_modules\/.*\/node_modules\/react-native\/.*/,
      // Exclude build directories
      /.*\/build\/.*/,
      /.*\/dist\/.*/,
      // Exclude android and ios build folders
      /.*\/android\/app\/build\/.*/,
      /.*\/ios\/build\/.*/,
      /.*\/ios\/Pods\/.*/,
      // Exclude common cache directories
      /.*\/.cache\/.*/,
      /.*\/\.gradle\/.*/,
      /.*\/\.idea\/.*/,
      /.*\/\.vscode\/.*/,
      // Exclude parent directories (monorepo isolation)
      /.*\/\.\.\/backend\/.*/,
      /.*\/\.\.\/bmad\/.*/,
      /.*\/\.\.\/docs\/.*/,
      /.*\/\.\.\/scripts\/.*/,
    ]),
  },
  watcher: {
    watchman: {
      deferStates: ['hg.update'],
    },
    // Additional watcher options to reduce file watching
    healthCheck: {
      enabled: true,
    },
  },
  // Limit the number of workers to reduce resource usage
  maxWorkers: 2,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
