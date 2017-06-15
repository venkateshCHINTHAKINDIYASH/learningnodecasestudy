import MongoConnectionInitializer from '../utilities/mongo-connection-initializer';

let Connection = MongoConnectionInitializer.getInstance().Connection;
let Schema = Connection.Schema;

let CustomerSchema = new Schema({
    customerId: Number,
    name: String,
    address: String,
    email: String,
    phone: String,
    credit: Number,
    status: Boolean,
    remarks: String,
    blogUrl: String
});

let CustomerMappedModel = Connection.model('customers', CustomerSchema);

export default CustomerMappedModel;
