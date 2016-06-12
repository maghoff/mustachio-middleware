'use strict';

const fs = require('fs');
const path = require('path');
const mustachio = require('mustachio');

module.exports = function (config) {
	config = config || {};
	const root = config.root || path.join(path.dirname(require.main.filename), 'template');
	const suffix = config.suffix || '.mustache';

	return function (req, res, next) {
		res.mu = function (templateName, data) {
			fs.readFile(path.join(root, templateName + suffix), 'utf8', function (err, templateString) {
				if (err) return next(err);

				const template = mustachio.string(templateString);
				template.render(data).stream().pipe(res);
			});
		};
		next();
	}
};
