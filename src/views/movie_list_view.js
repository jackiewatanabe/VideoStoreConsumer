import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import MovieView from './movie_view';
import Movie from '../models/movie';
import ResultList from '../collections/result_list';
import ResultListView from './result_list_view';
import MovieDetailsView from './movie_details_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.template2 = params.detailsTemplate;

    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    this.$("#movie-list").empty();
    var that = this;

    this.model.each(function(movie) {
      var movieView = new MovieView( {
        model: movie,
        template: that.template,
      });
      that.listenTo(movieView, "selected", function(movie1) {
        $('#movie-list').empty();
        $('#movie-details').empty();

        // var movieDetails = this.template({movie: movie.attributes});

        console.log("movie: ", movie1);
        var myMovieDetailsView = new MovieDetailsView({
            model: movie1,
            template: _.template($('#movie-details-template').html()),
            el: '.movie-container'
          });

          myMovieDetailsView.render();
        // this.$('#movie-details').append(myMovieDetailsView);
      });
      that.$('#movie-list').append(movieView.render().$el);
    });

    return this;
  },
  events: {
    "click #submit-search" : "search"
  },
  getFormData: function() {
    var formTitle = this.$("#title").val();
    this.$("#title").val('');

    return {
      title: formTitle
    };
  },
  search: function() {
    var mySearchTerm = this.getFormData().title;
    var resultList = new ResultList();

    resultList.fetch({data: {query: mySearchTerm}
    });

    var myResultListView = new ResultListView( {
      model: resultList,
      template: _.template($('#result-template').html()),
      params: this.getFormData(),
      el: 'main'
    });

    myResultListView.render();
  }

  // movieDetails: function(movie) {
  //   $('#movie-list').empty();
  //   $('#movie-details').empty();
  //
  //   var movieDetails = this.template2({movie: movie.attributes});
  //
  //   this.$('#movie-details').append(movieDetails);
  // },



});

export default MovieListView;
