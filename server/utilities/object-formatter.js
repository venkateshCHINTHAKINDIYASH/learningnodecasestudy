"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const COLUMN_DELIMITER = ', ';
const NO_OF_TRAIL_CHARACTERS = 2;
const START_POS = 0;
class ObjectFormatter {
    static format(obj) {
        let formattedString = '';
        if (obj) {
            for (let property in obj) {
                let propertyValue = obj[property];
                if (typeof propertyValue !== 'function') {
                    formattedString += `${propertyValue}${COLUMN_DELIMITER}`;
                }
            }
            formattedString = formattedString.substr(START_POS, formattedString.length - NO_OF_TRAIL_CHARACTERS);
        }
        return formattedString;
    }
}
exports.default = ObjectFormatter;
