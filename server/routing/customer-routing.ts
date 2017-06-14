import * as express from 'express';

import InternetCustomer from '../models/internet-customer';
import CustomerService from '../services/customer-service';
import HttpStatusCodes from '../utilities/http-status-codes';

class CustomerRouting {
    private customerService: CustomerService = new CustomerService();
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRouting();
    }

    private initializeRouting() {
        this.router.get('/', (request, response) => {
            this.customerService
                .getCustomers()
                .then(result => response.status(HttpStatusCodes.OK).json(result))
                .catch(error => response.status(HttpStatusCodes.CLIENT_ERROR));
        });

        this.router.get('/:customerId', (request, response) => {
            let parsedCustomerId = parseInt(request.params.customerId);

            this.customerService.getCustomer(parsedCustomerId)
                .then(result => response.status(HttpStatusCodes.OK).json(result))
                .catch(error => response.status(HttpStatusCodes.CLIENT_ERROR));
        });

        this.router.get('/search/:customerName', (request, response) => {
            let searchString = request.params.customerName;

            this.customerService.getCustomersByName(searchString)
                .then(result => response.status(HttpStatusCodes.OK).json(result))
                .catch(error => response.status(HttpStatusCodes.CLIENT_ERROR));
        });

        this.router.post('/', (request, response) => {
            let customer = request.body;

            customer.__proto__ = new InternetCustomer;

            this.customerService.addNewCustomer(customer)
                .then(result => response.status(HttpStatusCodes.OK).json(result))
                .catch(error => response.status(HttpStatusCodes.CLIENT_ERROR));
        });
    }

    get Router() {
        return this.router;
    }
}

export default CustomerRouting;
