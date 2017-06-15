import RestServiceHost from './hosting/rest-service-hosting';

let host = new RestServiceHost();

host.start()
    .then(
    result => console.log('REST Service Successfully Started ...'));

process.on('exit',
    () => {
        host.stop()
            .then(result => {
                process.exit();
            });
    });

process.on('SIGINT', () => {
    host.stop()
        .then(result => {
            console.log('REST Service Stopped!');
            
            process.exit();
        });
});