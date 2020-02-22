var LCD = require('lcdi2c');
// var os = require('os');

class Display{
    constructor(columns=20, rows=4){
        this.columns = columns;
        this.rows = rows;
        this.lcd;
    }
    init(){
        this.lcd = new LCD( 0, 0x27, this.columns, this.rows ); // https://github.com/craigmw/lcdi2c
    }
    clear(){
        this.lcd.on();
        this.lcd.clear();
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
