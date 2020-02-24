// Import Statements
import {Item as MenuItem } from "./menu";
import {Manager as Menu} from "./station-menu"
import * as Tasks from './display-tasks';

// Require Statements
var Gpio = require('onoff').Gpio;

/*
    Build the menu: Each item MUST be given:
        A) 'name' for selecting/traversings menu-items on the screen
        B) A display view to be rendered when the menu item is 'selected'
            Note: If item is a submenu, set view to null as the next menu will
                be rendered in-leui of a custom view.
        C) List of children, which must be of type MenuItem
            Note: If item has no children, set to []

    Note: All menu items must have unique names!
*/ 

let items = new MenuItem("main", Tasks.welcomeTask, [
    new MenuItem("File Transfer", null,[
        new MenuItem("Usb Drive", null, [])
    ]),
    new MenuItem("Location", null, []),
    new MenuItem("Network", null, [
        new MenuItem("Cellular", null, []),
        new MenuItem("Ip Address", Tasks.ipAddress, []),
        new MenuItem("WiFi", null, [
            new MenuItem("WiFi Connect", null, [])
        ]),
    ]),
    new MenuItem("Power", null, []),
    new MenuItem("Server", null, []),
    new MenuItem("System", null, [])
]);  

let menu = new Menu(items);
menu.init();

const button_up = new Gpio(4, 'in', 'rising', {debounceTimeout: 50});
const button_down = new Gpio(5, 'in', 'rising', {debounceTimeout: 50});
const button_select = new Gpio(6, 'in', 'rising', {debounceTimeout: 50});
const button_back = new Gpio(7, 'in', 'rising', {debounceTimeout: 50});

button_up.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.up();
});
button_down.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.down();
});
button_select.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.select();
});

button_back.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.back();
});

/*
sudo systemctl status station-lcd
sudo i2cdetect -y 1
sudo systemctl stop station-lcd
journalctl -r -u station-lcd
*/

