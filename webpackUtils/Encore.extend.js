/**
 * Created by dremin_s on 20.10.2017.
 */
"use strict";

/** @const @symfony/webpack-encore */
const Encore = require('@symfony/webpack-encore');

/**
 * ”прощенное добавление в Encore JS-точек вход/выход дл€ компонента
 *
 * @param {string} name название компонента в формате demo:news.list
 *
 * доп. параметры точек вход/выход
 * @param params {{
 * 	app: {string},
 * 	out: {string},
 * 	template: {string},
 * 	siteTemplate: {string}
 * }}
 * app - название файла с логикой
 * out - билд-файл, в который все собиаретс€
 * template - шблон компонента, в котором будет лежать билд
 * siteTemplate - название шаблона сайта, если шаблон компонента не в /local/components/demo
 *
 * @returns {Encore}
 * @constructor
 */
Encore.BXComponentJs = (name, params = {}) => {
	// мержим дефолтные параметры со входными
	let paramsJs = Object.assign({}, {app: 'app.js', out: 'index', template: '.default', siteTemplate: false}, params);

	// получаем точки вход/выход
	let entry = Encore.BXComponent.getEntry(name, paramsJs);

	// добавл€ем в Encore точку входа
	return Encore.addEntry(entry.build, entry.app);
};

/**
 * ”прощенное добавление в Encore style-точек вход/выход дл€ компонента
 *
 * @param {string} name название компонента в формате demo:news.list
 *
 * доп. параметры точек вход/выход
 * @param params {{
 * 	app: {string},
 * 	out: {string},
 * 	template: {string},
 * 	siteTemplate: {string}
 * }}
 * app - название файла с логикой
 * out - билд-файл, в который все собиаретс€
 * template - шблон компонента, в котором будет лежать билд
 * siteTemplate - название шаблона сайта, если шаблон компонента не в /local/components/demo
 *
 * @returns {Encore}
 * @constructor
 */
Encore.BXComponentStyle = (name, params = {}) => {
	let paramsCss = {app: 'app.sass', template: '.default', siteTemplate: false};

	if(!params.hasOwnProperty('out')){
		params.out = name.replace(':', '_') + '_' + paramsCss.template.replace('.', '');
	}

	let entry = Encore.BXComponent.getStyleEntry(
		name,
		Object.assign({}, paramsCss, params)
	);
	return Encore.addStyleEntry(entry.build, entry.app);
};

module.exports = Encore;