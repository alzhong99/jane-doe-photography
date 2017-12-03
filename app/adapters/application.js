import DS from 'ember-data';
import config from 'jane-doe-photography/config/environment';

export default DS.RESTAdapter.extend({
  host: config.apiHost,
  namespace: 'api'
});
