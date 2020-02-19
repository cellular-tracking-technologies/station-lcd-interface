var Gpio = require('onoff').Gpio;
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    console.log("just a test");
  });

class Test {
    constructor(){
        console.log("hello world")
    }
}

var l = new five.LCD({
    controller: "PCF8574A"
  });

  l.useChar("heart");
  l.cursor(0, 0).print("hello :heart:");
  l.blink();
  l.cursor(1, 0).print("Blinking? ");
  l.cursor(0, 10).print(random);


let x = new Test()

const button_up = new Gpio(4, 'in', 'rising', {debounceTimeout: 50});
const button_down = new Gpio(5, 'in', 'rising', {debounceTimeout: 50});
const button_select = new Gpio(6, 'in', 'rising', {debounceTimeout: 50});
const button_back = new Gpio(7, 'in', 'rising', {debounceTimeout: 50});

button_up.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_1 press")

});
button_down.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_2 press")

});
button_select.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_3 press")

});
button_back.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("button_4 press")

});


