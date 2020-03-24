const fetch = require('node-fetch');
const url = require('url');

class SystemIdsTask {
    constructor(base_url) {
        this.url = url.resolve(base_url, 'id')
        this.header = "System";
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
                    resolve([this.header, res.id]);
                })
                .catch(error => {
                    resolve([this.header, `error`]);
                });
        });
    }
}

export { SystemIdsTask };