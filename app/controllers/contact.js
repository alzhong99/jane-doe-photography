import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  toast: Ember.inject.service(),
  sentMessage: false,
  nameInput: '',
  emailInput: '',
  messageInput: '',
  actions: {
    sendMsg(e) {
      // Prevent automatic page refresh
      e.preventDefault();
      this.set('nameInput', $('#nameInput').val());
      this.set('emailInput', $('#emailInput').val());
      this.set('messageInput', $('#messageInput').val());
      // If inputs are blank, then toastr error notification
      if(this.get('nameInput') == ''
        || this.get('emailInput') == ''
        || this.get('messageInput') == '') {
        this.get('toast').error('Enter your name, email, and message')
      }
      else {
        // Display sent message
        this.set('name', this.get('nameInput'));
        this.set('email', this.get('emailInput'));
        this.set('message', this.get('messageInput'));
        this.set('sentMessage', true);
        // Reset form inputs
        $('form')[0].reset();
        // Toastr success notification
        this.get('toast').success('Message sent!');
      }
    }
  }
});
