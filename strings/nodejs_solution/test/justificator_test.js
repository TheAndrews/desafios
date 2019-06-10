const assert = require('assert');
const justificator = require('../justificator')

describe('text', function() {
  
    it('should break line at limit passed', function() {
        const text = "random text";
        const formatted = justificator.formattText(text, 6);
        assert.equal("random", formatted.split('\n')[0]);
    });

    it('should justify text line adding empty space', function() {
        const text = "random text";
        const formatted = justificator.formattText(text, 6);
        assert.equal(6, formatted.split('\n')[0].length);
    });
  
});
