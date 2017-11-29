import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions: {
    getComments(photoId) {
      return DS.PromiseArray.create({
        promise: $.ajax({
          type: 'GET',
          url: `http://localhost:3000/api/photos/${photoId}/comments`,
        })
      });
    },
    addComment(comment, photoId) {
      let newComment = this.get('store').createRecord('comment', comment);
      let promise = newComment.save().then(result => {
        let editPhoto = this.get('store').findRecord('photo', photoId).then(function(photo) {
          photo.incrementProperty('num_comments');
          photo.save();
        });
      });
      return promise;
    },
    removeComment(commentId, photoId) {
      let promise = $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/comments/${commentId}`,
      }).then(result => {
        let editPhoto = this.get('store').findRecord('photo', photoId).then(function(photo) {
          photo.decrementProperty('num_comments');
          photo.save();
        });
      });
      return promise;
    }
  }
});
