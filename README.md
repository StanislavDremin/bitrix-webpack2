# webpack
webpack2 for bitrix
сборка webpack2 под комопоненты битрикса
==============================================
Когда вы работаете с компонентами битрикс, то у их шаблонов есть особенность - если в шаблоне есть файл script.js он автоматом подключится в хедер при инициализации компонента на странице.

Задача сборки - позволить генерить на каждый компонент свой файл js и подключать его только на нужных страницах.

Webpak говорит нам что может быть несколько точек входа (entry) и одна - выход (тот файл, который соберет и минифицирует вебпак).
Мы можем так же в конфиге вебпака проставить несколько точек вход-выход. Но при этом нам надо прописывать длинные пути к компонентам.
На пример, конфиг вебпака лежит в папке /webpack от корня сайта
```js
entry: {
   'components/ab:news.list/templates/.default/script.js': path.resolve(__dirname, '..', 'local', 'components', 'ab', 'news.list', 'app', 'app.js')
   },
   output: {
       path: path.resolve(__dirname, '..', 'local'),
       filename: "[name]"
   }    
}
```
Но таких точек entry может быть много и писать такие пути лень, да и ошибиться можно на раз.

Сборка позволяет генерить такие entry, указав название компонента в виде ab:news.list и при необходимости еще шаблон, в который генерить собранный файл.

Чтобы сгенерить файлы для компонента заходим в webpack.config.babel.js.

После var BComponent = new Component();
добавлем 

```js
BComponent.addComponent('help', {
		name: 'ul:help'
	});
```

help - это произвольное назкание для конфига.
ul:help это название нашего компонента.

Далее нужно добавить сгенренные пути в основной конфиг с помощью:

```js
configBase = BComponent.mergeConfig(configBase, ['help']);
```
configBase - базовый конфиг
BComponent.addComponent возвращает обьект BComponent, так что при построении путей можно использовать цепочки методов.

```js
BComponent
	.addComponent('help', {
		name: 'ab:help'
	})
	.addComponent('help2', {
		name: 'ab:help2'
	});

configBase = BComponent.mergeConfig(configBase, ['help', 'help2']);	
```

Варианты настроек для addComponent
-------------------------

Компонент находится в local/components/ab/help
```js
BComponent.addComponent('help', {
		name: 'ab:help'
	})
```
Перед этим должен быть создан файл local/components/ab/help/app/app.js
После выполнения комнды webpack, будет создан файл local/components/ab/help/templates/.default/script.js

Если нам нужно сгенерить script.js в какой-то другой шаблон этого компонента, то в name: 'ab:help:myTemplate'

Компонент системный, кастомизируем только шаблон.
В этом случае шаблон компонента будет лежать в local/templates/.default/components/bitrix/news.list/my_template

```js
BComponent.addComponent('news1', {
		name: 'bitrix:news.list:my_template'
	})
```

Если шаблон лежит не в local/templates/.default, а, на пример, в local/templates/site_template/components/bitrix/news.list/my_template,
то в параметры добавляется site: site_template
```js
BComponent.addComponent('news1', {
		name: 'bitrix:news.list:my_template',
		site: 'site_template'
	})
```
Если у нас шаблон компонента дефолтный local/templates/site_template/components/bitrix/news.list/.default, 
то в параметре name: 'bitrix:news.list:.default' .default можно не писать - name: 'bitrix:news.list'.

Скприты
-------------------------
В это сборке установлены команды:
* npm run dev - дев-режим с запуском наблюдателя файлов
* npm run build - сборка для продакшена с генерацией min - версий файлов и map-файлов к ним
