const fetch = require('node-fetch');
const url = require('url');

class ServerConnectRequest {
    constructor(base_url) {
        this.url = url.resolve(base_url, '/radio/server-checkin')
        this.header = "Connect Request";
    }
    loading() {
        return [this.header, "Request In Progress..."];
    }
    results() {
        return new Promise((resolve, reject) => {
            fetch(this.url)
                .then(res => {
                    resolve([this.header, "Request Received"]);
                })
                .catch(error => {
                    resolve([this.header, `Request Error`]);
                });
        });
    }
}

export { ServerConnectRequest };