'use strict';

const fs = require('fs');
const path = require('path');
const mustachio = require('mustachio');

module.exports = function (config) {
	config = config || {};

	const prod = process.env['NODE_ENV'] === 'production';

	const partials =
		config.partials ? config.partials :
		(prod ?
			new mustachio.partials.Fs(config.root, config.suffixes) :
			new mustachio.partials.FsWatch(config.root, config.suffixes));

	return function (req, res, next) {
		res.mu = function (templateName, data) {
			Promise.resolve(partials.get(templateName)).then(ast => {
				const template = new mustachio.Template(ast);
				template.render(data, partials).stream().pipe(res);
			}).catch(next);
		};
		next();
	}
};
