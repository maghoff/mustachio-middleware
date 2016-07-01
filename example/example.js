#!/usr/bin/env node

'use strict';

const express = require('express');
const mu = require('../');

const app = express();
app.use(mu());

app.get('/', function (req, res) {
	res.mu('example', {
		headers: Object.keys(req.headers).map(key => ({ key, value: req.headers[key] }))
	});
});

app.listen(8000);
