var messages = require('../models/messages');

class TemperatureSingleton {
    constructor(temp = '', temperatureSensor) {
        if (!!TemperatureSingleton.instance) {
            return TemperatureSingleton.instance;
        }

        TemperatureSingleton.instance = this;

        this.temp = temp;

        this.temperatureSensor = temperatureSensor;

        return this;
    }

    getTemp() {
        return this.temp;
    }
    
    setTemp(temp) {
        this.temp = temp;
    }

    getTemperatureSensor() {
        return this.temperatureSensor;
    }

    setTemperatureSensor(temperatureSensor) {
        this.temperatureSensor = temperatureSensor;
    }
}

module.exports = TemperatureSingleton;