"use strict";

module.exports = {
  groupParams: function(comment){
    comment.params = [];

    if (comment.tags && comment.tags.length) {
      comment.tags = comment.tags.filter(function(tag){
        if (tag.type && tag.type === "param"){
          comment.params.push(tag);
          return false;
        }

        return true;
      });
    }

    return comment;
  }
};