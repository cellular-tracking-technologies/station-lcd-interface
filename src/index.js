// Hardware Libraries
var Gpio = require('onoff').Gpio;
var LCD = require('lcdi2c');
var lcd = new LCD( 0, 0x27, 20, 4 ); // https://github.com/craigmw/lcdi2c

import * as Menu from './menu-item';

let parent = new Menu.Item("root", null);
let child1 = new Menu.Item("child1", null);
let child2 = new Menu.Item("child2", null);

Menu.setRelation(parent, child1)
Menu.setRelation(parent, child2)

function cb(x) {
    console.log(`${x} is working\n`)
}

parent.callback = cb
child1.callback = cb

console.log(parent.childrenNames())

parent.children_.forEach(item => {
    if(item.childCount() == 0){
        if (typeof item.callback === 'function'){
            item.callback(item.name)
        }else{
            console.log(item.name + "- No Callback")
        }
    }
});

console.log(parent.childCount())
const item = parent.getChild("child2")
console.log(item)
console.log(typeof item)
console.log(item.name)

/*
           a 
    {aa ab ac} b c d    

    {aaa}      {ba}  {da db dc de}
  
    Focus Item = a

    select a.aa


*/


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