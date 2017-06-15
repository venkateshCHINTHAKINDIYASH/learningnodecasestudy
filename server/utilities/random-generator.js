"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_MINIMUM = 0;
const DEFAULT_MAXIMUM = 1000000;
class RandomGenerator {
    static generate(minimum = DEFAULT_MINIMUM, maximum = DEFAULT_MAXIMUM) {
        let generatedNumber = Math.floor(Math.random() * (maximum - minimum) + minimum);
        return generatedNumber;
    }
}
exports.default = RandomGenerator;
