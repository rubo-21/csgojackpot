# CS:GO jackpot

### Version
0.0.1

### Tech

CS:GO jackpot uses a number of open source projects to work properly:

* [Gulp] - the streaming build system
* [jQuery] - for DOM manipulations
* [Jade] - for generating HTML
* [Stylus] - for generating CSS
* [Bower] - for frontend libs

### Installation

You need Gulp and Bower installed globally:

```sh
$ npm i -g gulp
$ npm i -g bower
```

```sh
$ git clone [git-repo-url] In-Pro
$ cd In-Pro
$ npm i
$ bower i
```
for build run this command:

```sh
$ gulp build
```

### Development

Want to contribute? Great!

Pablo uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run this command.

```sh
$ gulp
```

### File structure

#### Main source
**Note**: Here is not all files

    ├── bower.json // bower config file
    ├── gulpfile.js // Gulp config file
    ├── package.json // node packages list
    ├── readme.md // this doc file
    └── src // all source files
	├── img
        └── jade
	  ├── blocks
	  ├── helpers
	  ├── layouts
	  ├── pages
	  ├── partials
        ├── js
        ├── resources // all resource files (fonts, json files, etc)
        └── styles
	  ├── base
	  ├── blocks
	  ├── helpers
	  ├── partials
	  |── common.styl // main style file
        ├── vendor // bower libs (3rd party libs)

#### After Build

**Note**: for build just run `gulp build`

> **dist** - all generated files (css, js, images, fonts and etc)


License
----

MIT

**Free Software, Hell Yeah!**

[jQuery]:http://jquery.com
[Gulp]:http://gulpjs.com
[Jade]:http://jade-lang.com/
[Stylus]:https://learnboost.github.io/stylus/
[Bower]:http://bower.io/
