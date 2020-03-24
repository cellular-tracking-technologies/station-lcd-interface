// Import Statements
import MenuItem from "./menu-item";
import MenuManager from "./menu-manager"

// Tasks
import {IpAddressTask} from "./tasks/ip-address-task";
import {CellularTask} from "./tasks/cellular-task";
import {GpsTask} from "./tasks/gps-task";
import {SensorTemperatureTask} from "./tasks/sensor-temp-task";
import {SensorVoltageTask} from "./tasks/sensor-voltage-task";
import {SystemIdsTask} from "./tasks/system-ids-task";
import {SystemRestartTask} from "./tasks/system-restart-task";
import {UsbDownloadTask} from "./tasks/usb-download-task";
import {MountUsbTask} from "./tasks/usb-mount-task";
import {UnmountUsbTask} from "./tasks/usb-unmount-task";
import {UsbWifiUploadTask} from "./tasks/usb-wifi-upload-task";


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

const host = 'http://localhost:3000';

let items = new MenuItem("main", null, [
    new MenuItem("File Transfer", null,[
        new MenuItem("Mount Usb", new MountUsbTask(host), []),
        new MenuItem("Unmount Usb", new UnmountUsbTask(host), []),
        new MenuItem("Download", new UsbDownloadTask(host), []),
        new MenuItem("Get WiFi", new UsbWifiUploadTask(host), [])
    ]),
    new MenuItem("Network", null, [
        new MenuItem("Cellular", new CellularTask(host), []),
        new MenuItem("Ip Address", new IpAddressTask(), [])
    ]),
    new MenuItem("Server", null, []),
    new MenuItem("Power", new SensorVoltageTask(host), []),
    new MenuItem("Temperature", new SensorTemperatureTask(host), []),
    new MenuItem("Location", new GpsTask(host), []),
    new MenuItem("System", null, [
        new MenuItem("About", new SystemIdsTask(host), []),
        new MenuItem("Restart", new SystemRestartTask(), [])
    ])
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

let menu = new MenuManager(items);
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