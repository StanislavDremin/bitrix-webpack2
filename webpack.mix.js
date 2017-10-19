const { mix } = require('laravel-mix');
const path = require('path');
const EncodingPlugin = require('webpack-encoding-plugin');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const app = (p) => {
	let root = path.resolve(__dirname, 'online.1c.ru', 'public_html') + '/';
	return root + p;
};

// import BX from './BXConfigComponent';
// const Component = new BX({
// 	baseFolder: path.join('..'),
// });
// Component.addComponent({name: 'applicant:profile'});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath("online.1c.ru/public_html/"); // установка папки по дефолту, откуда будет считать путь до билда
mix.setResourceRoot("online.1c.ru/public_html/");
mix
	// .sass('test/vue.sass', 'test/build/vue-styles.css')
	.js(app('local/components/esd/grid/app.js'), 'local/components/esd/grid/buildTest.js')
	// .extract(['vue','vee-validate'])
;
mix.options({ extractVueStyles: 'test/css.css'});

mix.webpackConfig({
	resolve: {
		modules: [
			app('local/src/js')
		]
	},
	plugins: [
		new EncodingPlugin({encoding: "cp1251"}),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		})
	]
});


// fs.writeFileSync('./encore_conf.txt', JSON.stringify(mix.config));
// mix.browserSync({
// 	proxy: 'dev.nano-two.abraxabra.ru'
// });
// mix.browserSync('http://dev.nano-two.abraxabra.ru');