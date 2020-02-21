class Item{
    constructor(name, callback){
        this.parent = null;
        this.callback = callback;
        this.name = name;        
        this.children_ = [];        
    }
    addChild(child){
        this.children_.push(child);
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

function setRelation(parent, child) {
    if(parent instanceof this.Item == false){
        throw TypeError;
    }else if(parent instanceof this.Item == false){
        throw TypeError;
    }

    parent.addChild(child);
    child.parent = parent;
}

function unitTest() {
}

if (typeof module !== 'undefined' && !module.parent) {
    unitTest()
} else {
    console.log("Importing " + module.filename)
}

export {Item, setRelation};



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
