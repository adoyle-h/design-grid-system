'use strict';

const {
    override, addBabelPlugin, disableEsLint, addBundleVisualizer,
} = require('customize-cra');

module.exports = override(
    disableEsLint(),
    addBabelPlugin('emotion'),
    process.env.BUNDLE_VISUALIZE && addBundleVisualizer({
        analyzerMode: 'static',
        reportFilename: 'var/report.html',
    }),
);
