function initializeSocketClient() {
    if (io) {
        var socketUrl = 'http://localhost:9090';
        var socketClient = io.connect(socketUrl);
        var eventName = 'NewCustomerRecord';

        if (socketClient) {
            socketClient.on(eventName,
                function (notificationMessage) {
                    if (notificationMessage) {
                        console.log('Notification Received ... ' +
                            JSON.stringify(notificationMessage));
                    }
                });
        }
    }
}

initializeSocketClient();