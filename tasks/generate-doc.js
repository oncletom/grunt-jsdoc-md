"use strict";

var dox = require("dox");
var swig  = require("swig");
var filters = require("../lib/filters.js");
var modifiers = require("../lib/modifiers.js");
var each = require('each-async');

var defaultOptions = {
  /**
   * Filters out unwanted comments from the documentation output.
   * Each function is applied on the parsed comments.
   *
   * @type {Array.<Function>} Filter functions array. They receive the `dox` comment object as sole argument.
   */
  filters: [],
  /**
   * Extracts the `@param` tags to display them in a different way more easily.
   *
   * @type {Boolean} If true, will move every `param` tag to a `comment.params` array.
   */
  tabledParams: true,
  /**
   * Indicates which file will be used as an output template for the Markdown file.
   *
   * It should use the [swig template engine](http://paularmstrong.github.io/swig/) syntax.
   *
   * @type {String}
   */
  templateFile: __dirname + "/../src/templates/layout.md.swig",
  /**
   * Options to provide to the [dox markdown parser](https://github.com/isaacs/github-flavored-markdown).
   * In the future it should become [marked](https://github.com/visionmedia/dox/issues/56).
   *
   * @type {Object}
   */
  marked: { raw: true }
};

module.exports = function(grunt){
  grunt.registerMultiTask("jsdoc_md", function(){
    var done = this.async();

    // This is the options you are looking for.
    var options = this.options(defaultOptions);

    each(this.files, function(fileConfig, i, next){
      var parsedComments = dox.parseComments(grunt.file.read(fileConfig.src[0]), options.marked);

      if (options.filters.length){
        parsedComments = parsedComments.filter(filters.excludeComments(options.filters));
      }

      if (options.tabledParams){
        parsedComments = parsedComments.map(modifiers.groupParams);
      }

      swig.renderFile(options.templateFile, { comments: parsedComments }, function(err, output){
        if (err){
          throw new Error(err);
        }

        grunt.file.write(fileConfig.dest, output);
        next();
      });
    }, done);
  });
};