mustachio-middleware is an [express][express] middleware for
[Mustachio][mustachio], a streaming implementation of the
[Mustache][mustache] templating language.

[express]: http://expressjs.com/
[mustachio]: https://www.npmjs.com/package/mustachio
[mustache]: https://mustache.github.io/mustache.5.html

Getting started
===============

Put your templates in the `templates` directory, and make a `.js`-file like
this:

	const express = require('express');
	const mu = require('mustachio-middleware');

	const app = express();
	app.use(mu(/* config could go here */));

	app.get('/', function (req, res) {
		res.mu('demo', { name: "World" });
	});

	app.listen(8000);

If you have `templates/demo.mustache` that contains `Hello, {{name}}!`, this
small program would respond `Hello, World!` to requests.
