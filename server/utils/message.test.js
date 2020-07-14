const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');


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


describe('generateLocationMessage', () => {
    it('should generate correct message location', () => {
        let from = 'Nos';
        let latitude = 15;
        let longitude = 77;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });

    });
});