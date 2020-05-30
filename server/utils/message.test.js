const expect = require('expect');
const { generateMessage } = require('./message');


describe('generateMessages', () => {
    it('should generate correct message object', () => {
        let from = 'jen';
        let text = 'messages';
        let message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});