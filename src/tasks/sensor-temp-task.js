const fetch = require('node-fetch');
const url = require('url');

class SensorTemperatureTask {
    constructor(base_url) {
        this.url = url.resolve(base_url, 'sensor/temperature')
        this.header = "Temperature";
    }
    loading() {
        return [this.header, "Loading..."];
    }
    results() {
        return new Promise((resolve, reject) => {
            fetch(this.url)
                .then(data => {
                    return data.json()
                })
                .then(res => {
                    resolve([this.header, `Temp:${res.celsius}C [${res.fahrenheit}F]`]);
                })
                .catch(error => {
                    resolve([this.header, `error`]);
                });
        });
    }
}

export { SensorTemperatureTask };