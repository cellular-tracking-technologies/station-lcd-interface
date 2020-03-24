var LCD = require('lcdi2c');
const { exec } = require('child_process');

class Display {
    constructor(columns = 20, rows = 4) {
        this.columns = columns;
        this.rows = rows;
        this.lcd = null;
    }
    /**
     * Retrieves all i2c addresses for a specified i2c port  
     * @param {number} i2c_port - Port number of the i2c bus to-be-searched.
     * @return {Promise<Object>} Resolve - Object with port and list of addresses.
     */
    scanI2cPort_(i2c_port) {
        return new Promise((resolve, reject) => {
            let output = "";
            let child = exec(`i2cdetect -y ${i2c_port}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
            })

            child.stdout.on('data', (response) => {
                output += response;
            });

            child.on('close', (code) => {

                let i2c = {
                    addresses: [],
                    port: i2c_port
                }

                output.split("\n")
                    .filter(line => line.indexOf(":") > -1)
                    .forEach(line => {
                        let data = line.match(/ [A-Fa-f0-9]{2}/g);
                        if (data != null) {
                            i2c.addresses.push(...data.map(record => record.trim()));
                        }
                    });

                resolve(i2c);
            });
        });
    }
    /**
     * Attempts to initialize lcd by searching from a list of i2c addresses on a port.
     * @param {number} port i2c bus number 
     * @param {Array<number>} addresses List of i2c addresses present on 'bus'.
     * @return {boolean} True if the lcd was discovered. 
     */
    initLcd_(port, addresses) {
        const lcds = [0x3f, 0x27]; // i2c addresses of supported i2c-to-parallel converters for lcds

        let allowed = addresses.map((element) => {
            return parseInt(element, 16);
        }).filter(address => lcds.includes(address));

        if (allowed.length == 0) {
            return false;
        }

        this.lcd = new LCD(port, allowed[0], this.columns, this.rows); // https://github.com/craigmw/lcdi2c

        return true;
    }
    /**
     * Initializes lcd by scanning i2c ports for supported device.
     * @return {Promise<string>} Returns 'ok' on resolve or error string for reject.
     */
    init() {
        return new Promise((resolve, reject) => {
            const i2cScans = [
                this.scanI2cPort_(0), // i2c-0
                this.scanI2cPort_(1)  // i2c-1
            ]
            Promise.all(i2cScans).then((results) => {
                results.forEach((i2c) =>{
                    if(this.initLcd_(i2c.port, i2c.addresses) == true){
                        resolve("ok");
                        return;
                    }   
                })
                reject("Display Not Found");
            }).catch((err) => {
                reject(err.toString());
            });
        });
    }
    clear() {
        if (this.lcd == null) {
            return;
        }
        this.lcd.on();
        this.lcd.clear();
    }
    write(rows) {
        if (this.lcd == null) {
            return;
        }

        let line = 1;
        display.clear();
        console.log("");
        rows.forEach(element => {
            display.writeRow(element, line);
            console.log(element);
            line++;
        });
        console.log("");
    }
    writeRow(data, row) {
        if (this.lcd == null) {
            return;
        }
        if (typeof data != 'string') {
            throw TypeError;
        }
        this.lcd.println(data, row)
    }
}

let display = new Display();

export default display;
