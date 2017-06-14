import ObjectFormatter from '../utilities/object-formatter';
import Customer from './customer';

class InternetCustomer extends Customer {
    constructor(public customerId?: number,
        public name?: string, public address?: string,
        public email?: string, public phoneNumber?: string,
        public credit?: number, public status?: boolean,
        public remarks?: string, public blogUrl?: string) {
        super(customerId, name, address, email, phoneNumber,
            credit, status, remarks);
    }

    toString(): string {
        return super.toString().toUpperCase();
    }
}

export default InternetCustomer;
