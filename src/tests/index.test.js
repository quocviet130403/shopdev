'use strict'


const redisPubSubService = require('../services/redisPubSub.service')

// Example usage
redisPubSubService.subscribe('myChannel', (message) => {
    console.log('Received message:', message);
});

// Example publishing
redisPubSubService.publish('myChannel', 'Hello World!')
    .then(() => {
        console.log('Message published successfully.');
    })
    .catch((error) => {
        console.error('Error publishing message:', error);
    });