const fetch = require('node-fetch');
const url = require('url');

class SensorVoltageTask {
    constructor(base_url) {
        this.url = url.resolve(base_url, 'sensor/voltages')
        this.header = "Voltages";
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
                    resolve([this.header, `Battery:${res.battery}`, `Rtc:${res.rtc}`, `Solar:${res.solar}`]);
                })
                .catch(error => {
                    resolve([this.header, `error`]);
                });
        });
    }
}

export { SensorVoltageTask };