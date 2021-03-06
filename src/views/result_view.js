import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Result from '../models/result.js';
import Movie from '../models/movie';


var ResultView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    var compiledTemplate = this.template({movie: this.model.toJSON()});

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    "click #add-movie" : "addMovie"
  },
  addMovie: function() {
    // if(this.model.save()) {
    // alert("WHOOP THERE IT IS!");
    // } else {
    //   alert("Something went wrong :(");
    // }
    this.model.save(this.model.attributes, {success: function() { alert("YEEEEEESSS");}, error: function(){ alert("NOOOOO");}});
    // $('#messages').html("New movie added");
    window.location.replace("http://localhost:8081");


  }
});

export default ResultView;
