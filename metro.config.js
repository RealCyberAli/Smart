const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// This tells Metro to allow .db files to be used in the app
config.resolver.assetExts.push('db');

module.exports = config;

