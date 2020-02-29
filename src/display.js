var LCD = require('lcdi2c');
// var os = require('os');

class Display{
    constructor(columns=20, rows=4){
        this.columns = columns;
        this.rows = rows;
        this.lcd;
    }
    init(){
        // i2c addresses 0x3f 0x27
        this.lcd = new LCD( 1, 0x3f, this.columns, this.rows ); // https://github.com/craigmw/lcdi2c
    }
    clear(){
        this.lcd.on();
        this.lcd.clear();
    }
    write(rows){
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
    writeRow(data, row){
        if(typeof data != 'string'){
            throw TypeError;
        }  
        this.lcd.println(data, row)      
    }    
}

export let display = new Display();

display.init()
