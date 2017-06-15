const DEFAULT_MINIMUM: number = 0;
const DEFAULT_MAXIMUM: number = 1000000;

class RandomGenerator {
    static generate(minimum = DEFAULT_MINIMUM, maximum = DEFAULT_MAXIMUM) {
        let generatedNumber: number =
            Math.floor(Math.random() * (maximum - minimum) + minimum);

        return generatedNumber;
    }
}

export default RandomGenerator;
