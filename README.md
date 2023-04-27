Стек: React, JavaScript, NodeJS Express

`npm install` - установлены все зависимости <br />
`npm run start` - приложение запускается на локальной машине по адресу localhost:3000 <br />
`npm run dockerize` - создаётся docker image c именем ugmk_test_app <br />
`npm run start-container` - запускает контейнер с именем ugmk_test_app, приложение доступно по адресу localhost:3000 При завершении приложения, контейнер должен быть автоматически удалён <br />

Задача - разработать SPA приложение на React для демонстрации графиков по данным загруженным через API.

Данные будут предоставлены в виде файла в формате JSON и CSV - products.json и products.csv
Приложение должно запускаться как напрямую из папки с исходным кодом (ниже будут детали), так и из Docker контейнера.

Для front-end разработчиков данные нужно загружать через API с локальной машины, отдельный backend не нужен.
Для запуска mock сервера нужно использовать https://www.npmjs.com/package/json-server и прилагаемый файл products.json

json-server --watch products.json --port 3001

API будет доступно по адресу http://localhost:3001/products
Приложение запущенное в контейнере так же должно уметь работать с АПИ запущенным на хосте

Для full-stack разработчиков данные нужно загружать на backend из файла products.csv и предоставлять во frontend через созданное API (не через mock сервер) Допустимо использование любого JavaScript фреймворка на ваше усмотрение.

Приложение в обоих случаях (fullstack и frontend) должно быть контейнеризированно с помощью Docker

Данные должны быть представлены в следующем виде:

На главной странице ("/") должна быть столбчатая диаграмма где для каждого месяца из набора доступных данных
отражено 2 столбца - один количество продукции (в тоннах) произведенной фабрикой А, другой - количество продукции (в тоннах) произведенной для фабрике Б

Над графиком должен быть фильтр позволяющий выбрать - какую продукцию учитывать - всю, Продукт 1 или Продукт 2
Выбранное значение фильтра должно быть сохранено в браузере. Последнее выбранное значение должно автоматически устанавливаться при заходе на страницу

Фабрике A в данных соответсвуют строки с factory_id = 1
Фабрике Б в данных соответсвуют строки с factory_id = 2
Поле date содержит дату производства продукции в формате d/m/yyyy
Объем продукции типа "Продукт 1" сохранен в поле product1 в килограммах
Объем продукции типа "Продукт 2" сохранен в поле product2 в килограммах

При клике на любом из столбцов, нужно перейти на страницу /details/<factory id>/<month number> с круговой диаграммой показывающей сколько продукции типа 1 и 2 было произведено на фабрике <factory id> в месяц <month number>
Например, /details/1/2 - производство продукции на Фабрике A в феврале.
Должен поддерживаться обратный переход с детальной на основную страницу с помощью кнопки back браузера.

Страницы должны выглядеть и работать в соответсвии с приложенными примерами.
Основные компоненты должны быть отцентрованны на экране и оставаться в центре при изменении размеров окна.

Приложение должно быть написано на JavaScript и React, можно использовать любые JavaScript библиотеки с
последующим обоснованием их применения на интервью.

Код должен собираться в MacOS или Linux
Код должен быть загружен на GitHub в публичный репозиторий с именем ugmk_test_app
Например, https://github.com/<user name>/ugmk_test_app

Приложение должно разрабатываться так, как если бы готовилось на production

В корневой директории с кодом должен быть текстовый файл AUTHOR содержащий имя и фамилию автора

Код будет запускаться и тестироваться на MacOS в Chrome
На машине будет установлены Docker Desktop, Node.js v16, NPM v8, json-server

В случае с фронтэнд версией задачи, на хосте будет заранее запущено API по адресу http://localhost:3001/products с помощью json-server

После клонирования кода на тестовую машину в директорию ugmk_test_app должны выполняться следующие команды:

npm install - установлены все зависимости
npm run start - приложение запускается на локальной машине по адресу localhost:3000
npm run dockerize - создаётся docker image c именем ugmk_test_app
npm run start-container - запускает контейнер с именем ugmk_test_app, приложение доступно по адресу localhost:3000 При завершении приложения, контейнер должен быть автоматически удалён

Ошибка при исполнении любой из вышеуказанных команд вызванных ошибками разрабочика, будет означать автоматически не прохождение задания.
