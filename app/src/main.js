var puzzle = require('./puzzle');
var eventListeners = require('./eventListeners');

$(function(){
    puzzle.newInstance();
    eventListeners.call();
});

 var template = require("../templates/main.hbs");

 // This is how we pass context into Handlebars. But due to lack of time, I am just showing you how to pass model into handlebars
 // template. I dont want to spend more time on this.
 var str = template({
 	congratulationsText : "Congratulations!!"
 });
  $("body").html(str);
