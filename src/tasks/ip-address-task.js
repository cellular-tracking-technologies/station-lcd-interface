var os = require('os');

class IpAddressTask{
    constructor(){
        this.header = "Ip Address";
    }
    loading(){
        return [this.header];
    }
    results(){
        return new Promise((resolve, reject) => {
            const regex = /(wlan\d+|eth\d+)/;   // Match all 'eth' or 'wlan' interfaces
            var ifaces = os.networkInterfaces();
            
            let rows = [this.header];
            for (let [key, value] of Object.entries(ifaces)) {
                if (key.match(regex)) {
                    const result = value.filter(element => (element.family == 'IPv4') && (element.internal == false));
                    result.forEach(element => {
                        rows.push(`${key} ${element.address}`);
                    })
                }
            }
            resolve(rows);
        });
    }
}

export {IpAddressTask};