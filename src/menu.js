class Item{
    constructor(name, callback, children){
        this.parent = null;
        this.callback = callback;
        this.name = name;        
        this.children_ = children;
    }
    addChild(child){
        if(child instanceof Item){
            child.parent = this;
            this.children_.push(child);
        }else{
            throw TypeError;
        }
    }
    childCount(){
        return this.children_.length;
    }
    getChild(name){
        return this.children_.find(obj => (obj.name == name))
    }
    childrenNames(){
        let names = []
        this.children_.forEach(child => {
            names.push(child.name);
        });
        return names
    }
}

class Scroller {
    constructor(window_size=4){
        this.window_size = window_size;
        this.rows = []
        this.first_;
        this.last_;
        this.selected;
    }
    init(rows){
        this.rows_ = rows;
        this.first_ = 0;
        this.last_ = this.first_ + this.window_size;
        this.selected = this.first_;
    }
    getRows(){
        return this.rows_.slice(this.first_, this.last_);
    }
    scrollUp(){
        if(this.first_ <= 0){
            return;
        }
        this.first_--;
        this.last_--;
    }
    scrollDown(){
        if(this.last_< this.rows_.length){
            this.last_++;
            this.first_++;
        }
    }
}

function unitTest() {
    let data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    let s = new Scroller()
    s.init(data)
    console.log(s.first_)
    console.log(s.last_)
    for(let x = 0; x < 20; x++){
        console.log(s.getRows())
        s.scrollDown()
    }

    console.log("")
    console.log("")

    for(let x = 0; x < 20; x++){
        console.log(s.getRows())
        s.scrollUp()
    }
}

if (typeof module !== 'undefined' && !module.parent) {
    unitTest()
} else {
    console.log("Importing " + module.filename)
}

export {Item, Scroller};


/*

* = value
- = Submenu
# = Task

-File Transfer
    # Usb
-Location
    * Latitude
    * Longitude
    * Satellites in View
-Network   
    -Cellular  
        * Sim
        * Imei
        * Carrier, ACT, dBm
    -WiFi
        # Connect
    -Ip Address
        * WiFi
        * Ethernet
-Power
    * Main Voltage
    * Solar Voltage
    * Rtc Voltage
-Server
    # Connect
System
    - Disk
        * Size GB
        * Space Free GB
        * Space Used GB
    # Restart
*/


/*
menu = { 
         1: "Tags",                 # List of tags seen
         2: "Nodes",                # List of nodes seen with voltages
         3: "GPS",                  # GPS lat/lon/mode
         4: "Cellular",             # Cellular information
         5: "Network",              # IP addresses
         6: "Storage",              # disk usage, available space, etc
         7: "Power",                # battery voltage, solar voltage, coin cell voltage
         8: "Time",                 # Chrony outputs (RTC errors, time sources, current time, etc)
         9: "Environment",          # get all temperatures, pressure
         10: "Diagnostics",          # screen test, qa, radio program 
         11: "Cloud Services",      # last successful transmission
         12: "Force Check In",      # force check in
         13: "USB",                 # lsusb
         14: "System",              # versions, raspberry pi info
         15: "WiFi",		        # WiFi network specifics
         16: "Settings",            # static vs dhcp ip, etc
         17: "Download Data",       # download data to usb card
         18: "Identification",      # list of all IDs
         19: "About",               # about, copyright, etc.
         20: "Restart Screen"       # self destruct command
}
*/
