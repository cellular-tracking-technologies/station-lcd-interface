var Gpio = require('onoff').Gpio;
var LCD = require('lcdi2c');
var lcd = new LCD( 0, 0x27, 20, 4 );

class Test {
    constructor(){
        console.log("hello world")
    }
}

let x = new Test()

const button_up = new Gpio(4, 'in', 'rising', {debounceTimeout: 50});
const button_down = new Gpio(5, 'in', 'rising', {debounceTimeout: 50});
const button_select = new Gpio(6, 'in', 'rising', {debounceTimeout: 50});
const button_back = new Gpio(7, 'in', 'rising', {debounceTimeout: 50});

button_up.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_up press")

});
button_down.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_down press")

});
button_select.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_select press")

});
button_back.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_back press")

});


lcd.clear();
lcd.println( 'plThis is line 1...', 1 );
lcd.println( 'plThis is line 2...', 2 );
lcd.println( 'plThis is line 3...', 3 );
lcd.println( 'plThis is line 4...', 4 );