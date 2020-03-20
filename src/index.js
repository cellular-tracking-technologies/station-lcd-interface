// Import Statements
import {Item as MenuItem } from "./menu";
import {Manager as Menu} from "./station-menu"
import * as Views from './display-views';

// Require Statements
var Gpio = require('onoff').Gpio; // RaspberryPI Gpio functions

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

let items = new MenuItem("main", null, [
    new MenuItem("File Transfer", null,[
        new MenuItem("Mount Usb", Views.usbMount, []),
        new MenuItem("Unmount Usb", Views.usbUnmount, []),
        new MenuItem("Download", Views.usbDownload, [])
    ]),
    new MenuItem("Location", Views.location, []),
    new MenuItem("Network", null, [
        new MenuItem("Cellular", Views.cellular, []),
        new MenuItem("Ip Address", Views.ipAddress, []),
        new MenuItem("WiFi", null, [
            new MenuItem("WiFi Connect", Views.wifiConnect, [])
        ]),
    ]),
    new MenuItem("Power", Views.power, []),
    new MenuItem("Sensor", Views.sensor, []),
    new MenuItem("Server", Views.server, []),
    new MenuItem("System", Views.system, [])
]);  

/*
    Instantiate a menu manager that operates on a list of 
    menu items organized within a hierarchical structure.
    The manager is capable of traversing the menu items using
    the following commands:
        A) up()     - Traverse 'up' a list of items in a dir
        B) down()   - Traverse 'down' a list of items in a dir
        C) select() - Enters a dir within a menu.
        D) back()   - Exits a dir within a menu.
*/

let menu = new Menu(items);
menu.init();

/*
    Configure Pi buttons and mount callbacks for when they are pushed.
    The push callbacks will trigger menu operations corresponding to 
    the specific buttons pressed. 
    
    Note: Debounce is common feature to prevent buttons from being 
    pressed multiple times in rapid sucession.
*/

const button_up = new Gpio(4, 'in', 'rising', {debounceTimeout: 50});
button_up.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.up();
});

const button_down = new Gpio(5, 'in', 'rising', {debounceTimeout: 50});
button_down.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.down();
});

const button_select = new Gpio(6, 'in', 'rising', {debounceTimeout: 50});
button_select.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.select();
});

const button_back = new Gpio(7, 'in', 'rising', {debounceTimeout: 50});
button_back.watch((err, value) => {
    if (err) {
      throw err;
    }
    menu.back();
});