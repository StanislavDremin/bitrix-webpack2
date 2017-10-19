"use strict";
const Encore = require('@symfony/webpack-encore');
import path from 'path';
import EncodingPlugin from 'webpack-encoding-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import BComponent from './webpackUtils/BComponent';

const app = (p = '') => {
	let root = path.resolve(__dirname, 'online.1c.ru', 'public_html');
	return root + p;
};

Encore.BXComponent = new BComponent({root: path.resolve(__dirname, 'online.1c.ru', 'public_html')});

Encore.BXComponentJs = (name, params = {}) => {
	let entry = Encore.BXComponent.getEntry(
		name,
		Object.assign({}, {app: 'app.js', out: 'index', template: '.default', siteTemplate: false}, params)
	);
	return Encore.addEntry(entry.build, entry.app);
};
Encore.BXComponentStyle = (name, params = {}) => {
	if(!params.hasOwnProperty('out')){
		params.out = name.replace(':', '_') + '_' + params.template.replace('.', '');
	}

	let entry = Encore.BXComponent.getStyleEntry(
		name,
		Object.assign({}, {app: 'app.sass', template: '.default', siteTemplate: false}, params)
	);
	return Encore.addStyleEntry(entry.build, entry.app);
};

process.noDeprecation = true;
Encore
	.setOutputPath('online.1c.ru/public_html')
	.setPublicPath(path.resolve(__dirname, 'online.1c.ru', 'public_html'))

	.BXComponentJs('esd:grid', {out: 'script'})
	.BXComponentStyle('esd:grid', {out: 'style'})
	// .addEntry('local/components/esd/grid/buildTest.js', app('/local/components/esd/grid/app.js'))
	// .addStyleEntry('local/components/esd/grid/data-style', app('/local/components/esd/grid/main.sass'))

	.enableSassLoader()
	.enableVueLoader()
	.enableSourceMaps(false)

	/*.addPlugin(new ExtractTextPlugin({
		filename: 'local/components/esd/grid/style.css',
		allChunks: true
	}))*/
	.addPlugin(new EncodingPlugin({encoding: "cp1251"}))
	.addPlugin(new FriendlyErrorsWebpackPlugin({clearConsole: true}))
;



const config = Encore.getWebpackConfig();
if(!config.resolve.hasOwnProperty('modules')){
	config.resolve = Object.assign({}, config.resolve, {
		modules: [
			app('/local/src/js'),
			'node_modules',
		]
	});

	config.stats = Object.assign({}, config.stats, {
		hash: false,
		version: false,
		timings: false,
		assets: true,
		chunks: true,
		maxModules: 0,
		modules: true,
		children: false,
		source: false,
		errors: false,
		errorDetails: false,
		warnings: false,
		// publicPath: true,
		colors: true,
		entrypoints: true,
		performance: true,
		reasons: true,
	})
}

config.performance = { hints: false };

// fs.writeFileSync('./encore_conf.txt', JSON.stringify(config.plugins));
// console.info(config.plugins);
// throw new Error;


module.exports = config;