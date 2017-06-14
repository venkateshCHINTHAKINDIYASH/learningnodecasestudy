import ObjectFormatter from '../utilities/object-formatter';

class Customer {
    constructor(public customerId?: number, public name?: string,
        public address?: string, public email?: string,
        public phoneNumber?: string, public credit?: number,
        public status?: boolean, public remarks?: string) { }

    toString(): string {
        return ObjectFormatter.format(this);
    }
}

export default Customer;
