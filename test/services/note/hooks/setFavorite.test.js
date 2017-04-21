'use strict';

const assert = require('assert');
const setFavorite = require('../../../../server/services/note/hooks/setFavorite.js');

describe('note setFavorite hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    setFavorite()(mockHook);

    assert.ok(mockHook.setFavorite);
  });
});
