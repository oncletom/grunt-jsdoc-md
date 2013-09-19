"use strict";

module.exports = {
  excludeComments: function generateExcludeFilter(filters){
    return function excludeComments(comment){
      return !filters.some(function(filter){
        return filter(comment);
      });
    }
  }
};