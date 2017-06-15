import CustomerMappedModel from '../schemas/customer-schema';
import InternetCustomer from '../models/internet-customer';
import ICustomerService from './icustomer-service';

class CustomerService implements ICustomerService {
    getCustomers(): Promise<InternetCustomer[]> {
        let promise = new Promise<InternetCustomer[]>(
            async (resolve, reject) => {
                try {
                    let customers = await CustomerMappedModel.find({}).exec();

                    resolve(customers);
                } catch (error) {
                    reject(error);
                }
            });

        return promise;
    }

    getCustomer(customerId: number): Promise<InternetCustomer> {
        let promise = new Promise<InternetCustomer>(
            async (resolve, reject) => {
                try {
                    let filteredCustomer = await CustomerMappedModel.findOne({
                        customerId: customerId
                    }).exec();

                    resolve(<InternetCustomer>filteredCustomer);
                } catch (error) {
                    reject(error);
                }
            });

        return promise;
    }

    getCustomersByName(customerName: string): Promise<InternetCustomer[]> {
        let promise = new Promise<InternetCustomer[]>(
            async (resolve, reject) => {
                try {
                    let searchStringRegExp = new RegExp(customerName);

                    let filteredCustomers = await CustomerMappedModel.find({
                        name: searchStringRegExp
                    }).exec();

                    resolve(filteredCustomers);
                } catch (error) {
                    reject(error);
                }
            });

        return promise;
    }

    addNewCustomer(customer: InternetCustomer): Promise<InternetCustomer> {
        let promise = new Promise<InternetCustomer>(
            async (resolve, reject) => {
                try {
                    let newCustomerRecord = new CustomerMappedModel(customer);
                    let savedCustomerRecord = await newCustomerRecord.save();

                    resolve(savedCustomerRecord);
                } catch (error) {
                    reject(error);
                }
            });

        return promise;
    }
}

export default CustomerService;
