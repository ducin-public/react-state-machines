const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};

// /**
//  * @type {Cypress.PluginConfig}
//  */
// module.exports = (on, config) => {
//   on('before:browser:launch', (browser = {}, launchOptions) => {
//     if (browser.family === 'chromium' && browser.isHeaded) {
//       // 🔥 When running on retina displays uncomment the line below, to downscale resolution, otherwise
//       // screenshot tests will fail, see: https://github.com/cypress-io/cypress/issues/6485.
//       // launchOptions.args.push('--force-device-scale-factor=1');
//     }
//     return launchOptions;
//   });

//   addMatchImageSnapshotPlugin(on, config);

//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config

//   on('task', {
//     log(message) {
//       console.log(message)
//       return null
//     },
//     table(message) {
//       console.table(message)
//       return null
//     }
//   })
// }
