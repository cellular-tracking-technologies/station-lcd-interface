var LCD = require('lcdi2c');
const { exec } = require('child_process');

class Display {
    constructor(columns = 20, rows = 4) {
        this.columns = columns;
        this.rows = rows;
        this.lcd = null;
    }
    _scanI2cPort(i2c_port) {
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
                let addresses = []

                output.split("\n")
                    .filter(line => line.indexOf(":") > -1)
                    .forEach(line => {
                        let data = line.match(/ [A-Fa-f0-9]{2}/g);
                        if (data != null) {
                            addresses.push(...data.map(record => record.trim()));
                        }
                    });

                resolve(addresses);
            });
        });
    }
    _initLcd(addresses){
        const lcds = [0x3f, 0x27];

        let allowed = addresses.map((element) =>{
            return parseInt(element, 16);
        }).filter(address => lcds.includes(address));

        if(allowed.length == 0){
            return false;
        }

        this.lcd = new LCD(1, allowed[0], this.columns, this.rows); // https://github.com/craigmw/lcdi2c

        return true;
    }
    init() {
        // todo - rearchitect using promise.all()
        
        return new Promise((resolve, reject) => {
            this._scanI2cPort(0) // i2c-0
            .then((devices) =>{
                if(this._initLcd(devices) == true){
                    resolve();
                }              
                return this._scanI2cPort(1); // i2c-1
            }).then((devices) =>{
                if(this._initLcd(devices) == true){
                    resolve();
                }              
                reject("Display Not Found");
            }).catch((err) => {
                reject(err);
            });
        });
    }
    clear() {
        if(this.lcd == null){
            return;
        }
        this.lcd.on();
        this.lcd.clear();
    }
    write(rows) {
        if(this.lcd == null){
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
        if(this.lcd == null){
            return;
        }
        if (typeof data != 'string') {
            throw TypeError;
        }
        this.lcd.println(data, row)
    }
}

let display = new Display();

export { display };
