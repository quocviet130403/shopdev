'use strict'

const redis = require('redis')

class RedisPubSubService {
    constructor() {
        this.subscriber = redis.createClient()
        this.publisher = redis.createClient()
        this.initialize();
    }

    async initialize() {
        await this.publisher.connect();
        await this.subscriber.connect();
    }

    async publish(channel, message) {
        return new Promise((resolve, reject) => {
            this.publisher.publish(channel, message, (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
        })
    }

    async subscribe(channel, callback) {
        this.subscriber.subscribe(channel);
        this.subscriber.on('message', (channelSubcribe, message) => {
            console.log('Received message:', message);
            if (channelSubcribe === channel) callback(message)
        });
    }   
}

module.exports = new RedisPubSubService()