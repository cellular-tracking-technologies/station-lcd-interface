const fetch = require('node-fetch');
const url = require('url');

class CellularTask {
    constructor(base_url, refresh=1000) {
        this.url = url.resolve(base_url, 'modem')
        this.header = "Cellular";
        this.autoRefresh = refresh;
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