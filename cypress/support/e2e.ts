// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import 'cypress-axe'
import './waitForFontsToLoad'

// FOLLOWING CONFIG NOT WORKING DUE TO A CYPRESS BUG (https://github.com/cypress-io/cypress/issues/22689)
// import './snapshot'
// 
// import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
// 
// addMatchImageSnapshotCommand({
//   failureThreshold: 0.03, // threshold for entire image
//   failureThresholdType: 'percent', // percent of image or number of pixels
//   customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
// });

