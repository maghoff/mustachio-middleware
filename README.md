mustachio-middleware is an [express][express] middleware for
[Mustachio][mustachio], a pull streaming implementation of the
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
    app.use(mu());

    app.get('/', function (req, res) {
      res.mu('demo', { name: "World" });
    });

    app.listen(8000);

If you have `templates/demo.mustache` that contains `Hello, {{name}}!`, this
small program would respond `Hello, World!` to requests.

Configuration
=============
    const mu = require('mustachio-middleware');
    app.use(mu(opts));

where `opts` can be:

    {
      "root": ...,
      "suffixes": ...
    }

`"root"` specifies the root directory for resolving templates and partials.
This defaults to the `templates` subdirectory of your project directory.

`"suffixes"` is an array specifying the file name suffixes to look for when
resolving templates and partials. It defaults to `[ '.mustache', '.mu',
'.mu.html', '.html' ]`.

For more flexibility, `opts` can be `{ "partialsResolver": ... }` with an
object that implements the partials resolver interface. For more details see
[partials](https://github.com/maghoff/mustachio/tree/master/lib/partials).

The default partials resolver when no `"partialsResolver"` is specified is
`partials.FsWatch`. If `NODE_ENV` is `production`, the partials resolver is
`partials.Fs` instead.
