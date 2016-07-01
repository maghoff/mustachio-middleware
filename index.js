'use strict';

const fs = require('fs');
const path = require('path');
const mustachio = require('mustachio');

module.exports = function (config) {
	config = config || {};

	const partials = new mustachio.partials.FsPartials(config.root, config.suffixes);

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
