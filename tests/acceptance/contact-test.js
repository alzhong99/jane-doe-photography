import { test } from 'qunit';
import moduleForAcceptance from 'jane-doe-photography/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | contact');

test('sending a message', function(assert) {
  // Visit contact route, fill in inputs, and click submit button
  visit('/contact');
  fillIn('#name-input', 'Bob');
  fillIn('#email-input', 'bob@gmail.com');
  fillIn('#message-input', 'Hello');
  click('button');
  // Should render "Message Sent!", sender contact info, and message
  andThen(function() {
    assert.equal(find('h5').text().trim(), 'Message Sent!', 'Displays "Message Sent!"');
    assert.equal(find('#contact-info').text().trim(), 'From Bob, bob@gmail.com:', 'Displays sender contact info');
    assert.equal(find('#message').text().trim(), 'Hello', 'Displays message');
  });
});

test('attempting to send a message without filling in fields', function(assert) {
  // Visit contact route and click submit button without filling in inputs
  visit('/contact');
  click('button');
  // Should not render message
  andThen(function() {
    assert.equal(find('h5').text().trim(), '', 'Does NOT display "Message Sent!"');
    assert.equal(find('#contact-info').text().trim(), '', 'Does NOT display sender contact info');
    assert.equal(find('#message').text().trim(), '', 'Does NOT display message');
  })
})
