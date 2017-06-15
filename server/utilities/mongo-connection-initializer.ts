import * as mongoose from 'mongoose';

const DEFAULT_DB_SERVER_NAME: string = 'localhost';
const DEFAULT_PORT_NUMBER: number = 27017;
const DEFAULT_DB_NAME: string = 'yashcrmsystemdb';

class MongoConnectionInitializer {
    private constructor(private databaseServerName: string = DEFAULT_DB_SERVER_NAME,
        private portNumber: number = DEFAULT_PORT_NUMBER,
        private databaseName: string = DEFAULT_DB_NAME) {

        let connectionString = `mongodb://${databaseServerName}:${portNumber}/${databaseName}`;

        mongoose.connect(connectionString);

        // Change the default promise used by Mongoose to ES 2015 Promise Classes, rather
        // using in-built promises.
        (<any>mongoose).Promise = Promise;
    }

    get Connection() {
        return mongoose;
    }

    private static connectionInitializer: MongoConnectionInitializer;

    static getInstance() {
        if (typeof MongoConnectionInitializer.connectionInitializer === 'undefined') {
            MongoConnectionInitializer.connectionInitializer = new MongoConnectionInitializer();
        }

        return MongoConnectionInitializer.connectionInitializer;
    }
}

export default MongoConnectionInitializer;
