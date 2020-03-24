const fetch = require('node-fetch');
const url = require('url');

class CellularTask {
    constructor(base_url) {
        this.url = url.resolve(base_url, 'modem')
        this.header = "Cellular";
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
                    resolve([this.header, res.carrier, res.signal, res.info]);
                })
                .catch(error => {
                    resolve([this.header, `error`]);
                });
        });
    }
}

export { CellularTask };