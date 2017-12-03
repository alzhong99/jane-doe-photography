import Ember from 'ember';
import DS from 'ember-data';
import $ from 'jquery';

export default Ember.Controller.extend({
  toast: Ember.inject.service(),
  actions: {
    getComments(photoId) {
      return DS.PromiseArray.create({
        promise: $.ajax({
          type: 'GET',
          url: `http://localhost:3000/api/photos/${photoId}/comments`
        })
      });
    },
    addComment(comment, photoId) {
      let newComment = this.get('store').createRecord('comment', comment);
      let promise = newComment.save().then(() => {
        this.get('store').findRecord('photo', photoId).then(photo => {
          photo.incrementProperty('num_comments');
          photo.save().then(() => {
            this.get('toast').success('Added comment!');
          }, () => {
            this.get('toast').error('Failed to update number of comments');
          });
        });
      }, () => {
        this.get('toast').error('Failed to add comment. Make sure you enter a name and comment!');
      });
      return promise;
    },
    removeComment(commentId, photoId) {
      let promise = $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/comments/${commentId}`,
      }).then(() => {
        this.get('store').findRecord('photo', photoId).then(photo => {
          photo.decrementProperty('num_comments');
          photo.save().then(() => {
            this.get('toast').success('Deleted comment!');
          }, () => {
            this.get('toast').error('Failed to delete comment');
          });
        });
      });
      return promise;
    }
  }
});
