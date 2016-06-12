#!/usr/bin/env node

'use strict';

const express = require('express');
const mu = require('../');

const app = express();
app.use(mu());

app.get('/', function (req, res) {
	res.mu('example', { "user-agent": req.get('user-agent') });
});

app.listen(8000);
