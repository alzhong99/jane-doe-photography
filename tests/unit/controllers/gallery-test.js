import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:gallery', 'Unit | Controller | gallery', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:toast']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
