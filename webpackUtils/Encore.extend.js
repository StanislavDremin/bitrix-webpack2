/**
 * Created by dremin_s on 20.10.2017.
 */
"use strict";

/** @const @symfony/webpack-encore */
const Encore = require('@symfony/webpack-encore');

/**
 * ���������� ���������� � Encore JS-����� ����/����� ��� ����������
 *
 * @param {string} name �������� ���������� � ������� demo:news.list
 *
 * ���. ��������� ����� ����/�����
 * @param params {{
 * 	app: {string},
 * 	out: {string},
 * 	template: {string},
 * 	siteTemplate: {string}
 * }}
 * app - �������� ����� � �������
 * out - ����-����, � ������� ��� ����������
 * template - ����� ����������, � ������� ����� ������ ����
 * siteTemplate - �������� ������� �����, ���� ������ ���������� �� � /local/components/demo
 *
 * @returns {Encore}
 * @constructor
 */
Encore.BXComponentJs = (name, params = {}) => {
	// ������ ��������� ��������� �� ��������
	let paramsJs = Object.assign({}, {app: 'app.js', out: 'index', template: '.default', siteTemplate: false}, params);

	// �������� ����� ����/�����
	let entry = Encore.BXComponent.getEntry(name, paramsJs);

	// ��������� � Encore ����� �����
	return Encore.addEntry(entry.build, entry.app);
};

/**
 * ���������� ���������� � Encore style-����� ����/����� ��� ����������
 *
 * @param {string} name �������� ���������� � ������� demo:news.list
 *
 * ���. ��������� ����� ����/�����
 * @param params {{
 * 	app: {string},
 * 	out: {string},
 * 	template: {string},
 * 	siteTemplate: {string}
 * }}
 * app - �������� ����� � �������
 * out - ����-����, � ������� ��� ����������
 * template - ����� ����������, � ������� ����� ������ ����
 * siteTemplate - �������� ������� �����, ���� ������ ���������� �� � /local/components/demo
 *
 * @returns {Encore}
 * @constructor
 */
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

module.exports = Encore;