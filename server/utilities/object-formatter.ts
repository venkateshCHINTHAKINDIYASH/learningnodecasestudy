const COLUMN_DELIMITER: string = ', ';
const NO_OF_TRAIL_CHARACTERS: number = 2;
const START_POS: number = 0;

class ObjectFormatter {
    static format(obj: any): string {
        let formattedString: string = '';

        if (obj) {
            for (let property in obj) {
                let propertyValue = obj[property];

                if (typeof propertyValue !== 'function') {
                    formattedString += `${propertyValue}${COLUMN_DELIMITER}`;
                }
            }

            formattedString = formattedString.substr(START_POS,
                formattedString.length - NO_OF_TRAIL_CHARACTERS);
        }

        return formattedString;
    }
}

export default ObjectFormatter;
