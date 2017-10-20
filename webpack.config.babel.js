"use strict";
const Encore = require('./webpackUtils/Encore.extend');
import path from 'path';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
// раскоментить, если сайт работает в cp1251
// import EncodingPlugin from 'webpack-encoding-plugin';

import BComponent from './webpackUtils/BComponent';

const rootPath = (p = '') => {
	let root = path.resolve(__dirname, '..');
	return root + p;
};

Encore.BXComponent = new BComponent({root: rootPath()});

process.noDeprecation = true;
Encore
	.setOutputPath('..')
	.setPublicPath(rootPath())

	// файлы выхода (out) надо указывать без расширения
	// .BXComponentJs('')
	// .BXComponentStyle('bitrix:menu', {template:'top_new', siteTemplate: 'inner', out: 'style'})

	.enableSassLoader()
	.enableVueLoader()
	.enableSourceMaps(false)

	// если сайт работает в cp1251, то подключаем этот плагин,
	// при этом все файлы для сборки (.js, .sass, .css и пр) должны быть в utf-8, плагин сам их конвертит при сборке
	// .addPlugin(new EncodingPlugin({encoding: "cp1251"}))
	.addPlugin(new FriendlyErrorsWebpackPlugin({clearConsole: true}))
;

const config = Encore.getWebpackConfig();

if(!config.resolve.hasOwnProperty('modules')){
	config.resolve = Object.assign({}, config.resolve, {
		modules: [
			rootPath('/local/src/js'),
			'node_modules', // указываем папку, откуда брать основные либы, иначе будут косяки
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