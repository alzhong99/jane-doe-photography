import Ember from 'ember';
import DS from 'ember-data';
import $ from 'jquery';
import config from 'jane-doe-photography/config/environment';

export default Ember.Controller.extend({
  toast: Ember.inject.service(),
  actions: {
    // Get photo's associated comments from dynamic url
    getComments(photoId) {
      return DS.PromiseArray.create({
        promise: $.ajax({
          type: 'GET',
          url: `${config.apiHost}/api/photos/${photoId}/comments`
        })
      });
    },
    // Add comment to photo
    addComment(comment, photoId) {
      // POST AJAX request, create and save a new comment
      let newComment = this.get('store').createRecord('comment', comment);
      let promise = newComment.save().then(() => {
        // If success
        this.get('store').findRecord('photo', photoId).then(photo => {
          // PUT AJAX request, increment photo's num_comments and save changes
          photo.incrementProperty('num_comments');
          photo.save().then(() => {
            // If success, then toastr success notification
            this.get('toast').success('Added comment!');
          }, () => {
            // If fail, then toastr error notification
            this.get('toast').error('Failed to update number of comments');
          });
        });
      }, () => {
        // If fail, then toastr error notification
        this.get('toast').error('Failed to add comment. Make sure you enter a name and comment!');
      });
      return promise;
    },
    // Remove comment from photo
    removeComment(commentId, photoId) {
      // DELETE AJAX request, delete comment using comment ID
      let promise = $.ajax({
        type: 'DELETE',
        url: `${config.apiHost}/api/comments/${commentId}`,
      }).then(() => {
        // If success
        this.get('store').findRecord('photo', photoId).then(photo => {
          // PUT AJAX request, decrement photo's num_comments and save changes
          photo.decrementProperty('num_comments');
          photo.save().then(() => {
            // If success, then toastr success notification
            this.get('toast').success('Deleted comment!');
          }, () => {
            // If fail, then toastr error notification
            this.get('toast').error('Failed to update number of comments');
          });
        });
      }, () => {
        // If fail, then toastr error notification
        this.get('toast').error('Failed to delete comment');
      });
      return promise;
    }
  }
});
