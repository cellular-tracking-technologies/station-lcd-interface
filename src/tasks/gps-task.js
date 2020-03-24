const fetch = require('node-fetch');
const url = require('url');

class GpsTask {
    constructor(base_url) {
        this.url = url.resolve(base_url, 'gps')
        this.header = "Location";
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
                    resolve([this.header, `Lat:${res.mean.lat}`, `Lon:${res.mean.lng}`]);
                })
                .catch(error => {
                    resolve([this.header, `error`]);
                });
        });
    }
}

export { GpsTask };