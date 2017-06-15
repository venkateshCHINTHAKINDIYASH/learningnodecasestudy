import InternetCustomer from '../models/internet-customer';
import ICustomerService from './icustomer-service';

const DEFAULT_TIMEOUT_PERIOD: number = 1000;
const FOUND_INDEX_POS: number = 0;
const MIN_CREDIT_LIMIT: number = 1000;

class InMemoryCustomerService implements ICustomerService {
    private customers: InternetCustomer[] = [];

    constructor() {
        this.customers =
            [
                new InternetCustomer(11, 'Northwind Traders', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(12, 'Southwind Traders', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(13, 'Eastwind Traders', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(14, 'Westwind Traders', 'Mangalore', 'info@ntw.com', '080-4089343', 13000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(15, 'Oxyrich Traders', 'Mysore', 'info@ntw.com', '080-4089343', 23000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(16, 'Adventureworks', 'Bangalore', 'info@ntw.com', '080-4089343', 33000, true, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(17, 'Footmart', 'Bangalore', 'info@ntw.com', '080-4089343', 23000, false, 'Simple Customer Record', 'http://blogs.msdn.com/nwt'),
                new InternetCustomer(18, 'ePublishers', 'Hyderabad', 'info@ntw.com', '080-4089343', 43000, false, 'Simple Customer Record', 'http://blogs.msdn.com/nwt')
            ];
    }

    getCustomers(): Promise<InternetCustomer[]> {
        let promise = new Promise<InternetCustomer[]>(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.customers);
                }, DEFAULT_TIMEOUT_PERIOD);
            });

        return promise;
    }

    getCustomer(customerId: number): Promise<InternetCustomer> {
        let promise = new Promise<InternetCustomer>(
            (resolve, reject) => {
                let validation: boolean = false;
                let filteredCustomer = null;

                for (let customer of this.customers) {
                    if (customer && customer.customerId === customerId) {
                        validation = true;
                        filteredCustomer = customer;

                        break;
                    }
                }

                if (!validation) {
                    reject({
                        status: false
                    });

                    return;
                }

                if (typeof filteredCustomer !== 'undefined')
                    resolve(<InternetCustomer>filteredCustomer);
            });

        return promise;
    }

    getCustomersByName(customerName: string): Promise<InternetCustomer[]> {
        let promise = new Promise<InternetCustomer[]>(
            (resolve, reject) => {
                let filteredCustomers =
                    this.customers.filter(
                        customer => {
                            let validation = customer &&
                                typeof customer.name !== 'undefined' &&
                                customer.name.indexOf(customerName) >= FOUND_INDEX_POS;

                            return validation;
                        });

                resolve(filteredCustomers);
            });

        return promise;
    }

    addNewCustomer(customer: InternetCustomer): Promise<InternetCustomer> {
        let promise = new Promise<InternetCustomer>(
            (resolve, reject) => {
                let validation = customer &&
                    customer.name && typeof customer.credit !== 'undefined' &&
                    customer.credit >= MIN_CREDIT_LIMIT;

                if (!validation) {
                    reject({
                        status: false
                    });
                    return;
                }

                this.customers.push(customer);

                resolve(customer);
            });

        return promise;
    }
}

export default InMemoryCustomerService;
