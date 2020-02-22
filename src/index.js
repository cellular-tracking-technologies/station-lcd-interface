// Hardware Libraries
var Gpio = require('onoff').Gpio;

// Software Libraries
import * as Menu from './menu-item';
import { display } from "./display";

const fetch = require('node-fetch');

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

display.clear()
display.writeRow("hello\nworld")
// display.writeRow("test2", 2)
// display.writeRow("test3", 3)
// display.writeRow("test4", 4)

// const Url = 'http://192.168.0.58:8080/files/ip_address.json';

// lcd.on();
// lcd.clear();
// lcd.println( 'Loading...', 1);

// fetch(Url)
// .then(data=>{return data.json()})
// .then(res=>{

//     lcd.clear();
//     lcd.println(JSON.stringify(res), 1);

// })
// .catch(error=>{

//     lcd.clear();
//     lcd.println("Error!", 1);
//     console.log(error);

// });

/*
           a 
    {aa ab ac} b c d    

    {aaa}      {ba}  {da db dc de}
  
    Focus Item = a

    select a.aa


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

/*
sudo systemctl status station-lcd
sudo i2cdetect -y 1
sudo systemctl stop station-lcd
journalctl -r -u station-lcd
*/

