const expect = require("expect");
const { isRealString } = require("./validation.js");


describe('isRealString', () => {
    it('should reject non-string values', () => {
        let res = isRealString(555);
        expect(res).toBe(false);

    });

    it("should allow string with non-space character", () => {
        let res = isRealString('Hallelujah');
        expect(res).toBe(true);
    });

    it("should reject string with only spaces", () => {
        let res = isRealString(' ');
        expect(res).toBe(false);
    });

});