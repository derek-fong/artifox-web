require('reflect-metadata');
require('zone.js/dist/zone-node');

const express = require('express');
const functions = require('firebase-functions');
const { enableProdMode } = require('@angular/core');
const { ngExpressEngine } = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { join } = require('path');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

enableProdMode();

const app = express();
const distPath = join(process.cwd(), 'dist');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [ provideModuleMap(LAZY_MODULE_MAP) ]
}));

app.set('view engine', 'html');
app.set('views', join(distPath, 'browser'));

// Server static files from `/browser`.
app.get('*.*', express.static(join(distPath, 'browser')));

// All regular routes use the Universal engine.
app.get('*', (req, res) => {
  res.render('index', { req });
});

exports.serverSideRendering = functions.https.onRequest(app);
