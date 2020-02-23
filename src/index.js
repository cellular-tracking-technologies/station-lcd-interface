// Import Statements
import * as Menu from './menu';
import * as Tasks from './display-tasks';

// Require Statements
var Gpio = require('onoff').Gpio;

/*
    Build the menu: Each item MUST be given:
        A) 'name' for selecting/traversings menu-items on the screen
        B) A function to be executed when the menu item is 'selected'
            Note: If item has a submenu, set callback to null
        C) List of children, which must be of type Menu.Item
            Note: If item has no children, set to []

    Note: All menu items must have unique names!
*/ 

let menu = new Menu.Item("main", Tasks.welcomeTask, [
    new Menu.Item("File Transfer", null,[
        new Menu.Item("Usb Drive", null, [])
    ]),
    new Menu.Item("Location", null, []),
    new Menu.Item("Network", null, [
        new Menu.Item("Cellular", null, []),
        new Menu.Item("Ethernet", null, []),
        new Menu.Item("WiFi", null, [
            new Menu.Item("WiFi Connect", null, [])
        ]),
    ]),
    new Menu.Item("Power", null, []),
    new Menu.Item("Server", null, []),
    new Menu.Item("System", null, [])
]);  

let s = new Menu.Scroller()
let selected_item = menu;
s.init(selected_item.childrenNames())

display();

function display(){
    console.log("")

    let rows = s.getRows();
    let selected_row = s.getSelectedRow()

    rows.forEach(element => {
        if(selected_row == element){
            console.log(`> ${element}`)
        }else{
            console.log(`  ${element}`)
        }
    });
    
    console.log("")
}

// console.log(selected_item.childCount())
// console.log(selected_item.childrenNames())

// selected_item.children_.forEach(item => {
//     if (typeof item.callback === 'function'){
//         console.log(item.name + "- Has Callback")
//         // item.callback(item.name)
//     }else{
//         console.log(item.name + "- No Callback")
//     }
// });

const button_up = new Gpio(4, 'in', 'rising', {debounceTimeout: 50});
const button_down = new Gpio(5, 'in', 'rising', {debounceTimeout: 50});
const button_select = new Gpio(6, 'in', 'rising', {debounceTimeout: 50});
const button_back = new Gpio(7, 'in', 'rising', {debounceTimeout: 50});

button_up.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("Up")
    s.up();
    display();

});
button_down.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("Down")
    s.down();
    display();
});
button_select.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("Select")

});
button_back.watch((err, value) => {
    if (err) {
      throw err;
    }

    console.log("Back")

});

/*
sudo systemctl status station-lcd
sudo i2cdetect -y 1
sudo systemctl stop station-lcd
journalctl -r -u station-lcd
*/

