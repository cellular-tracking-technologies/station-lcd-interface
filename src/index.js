// Hardware Libraries
var Gpio = require('onoff').Gpio;
var LCD = require('lcdi2c');
var lcd = new LCD( 0, 0x27, 20, 4 ); // https://github.com/craigmw/lcdi2c

// Software Libraries
const Menu = require("./menu-item.js");

let parent = new Menu.Item("root", null);
let child1 = new Menu.Item("child1", null);
let child2 = new Menu.Item("child2", null);

Menu.setRelation(parent, child1)
Menu.setRelation(parent, child2)

console.log(Menu.childrenNames(parent))

/*
           a 
    {aa ab ac} b c d    
   {aaa}      {ba}  {da db dc de}

   
*/


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


// lcd.on();
lcd.clear();
lcd.println( 'plThis is line 1...', 1 );
lcd.println( 'plThis is line 2...', 2 );
lcd.println( 'plThis is line 3...', 3 );
lcd.println( 'plThis is line 4...', 4 );