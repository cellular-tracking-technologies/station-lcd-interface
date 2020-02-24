class Item{
    constructor(id, view, children){
        this.id = id;
        this.parent_id = null;
        this.children = [];
        
        this.setChildren_(children);
        this.view = view;        
    }
    setChildren_(children){
        let parent_id = this.id;
        this.children = children.map((child) => {             
            child.parent_id = parent_id;
            return child;
        });
    }
    childCount(){
        return this.children.length;
    }
    getChild(id){
        return this.children.find(obj => (obj.id == id))
    }
    childrenNames(){
        let ids = []
        this.children.forEach(child => {
            ids.push(child.id);
        });
        return ids
    }
}

function findById(menu, id){
    if(menu.id == id){
        return menu;
    }else if(menu.childCount() > 0){
        let result = null;
        for(let i=0; i < menu.childCount(); i++){
             result = findById(menu.children[i], id);
             if(result != null){
                 break;
             }
        }
        return result;
    }
    return null;
}

class Scroller {
    constructor(window_size=4){
        this.window_size_ = window_size;
        this.rows_ = []
        this.first_;
        this.last_;
        this.selected_;
    }
    init(rows){
        this.rows_ = rows;
        this.first_ = 0;
        this.last_ = this.first_ + this.window_size_;
        this.selected_ = this.first_;
    }
    getRows(){
        return this.rows_.slice(this.first_, this.last_);
    }
    getSelectedRow(){
        let r = this.getRows()
        return r[this.selected_ - this.first_];
    }
    up(){
        if(this.selected_ > 0){
            this.selected_--;
            if(this.selected_ < this.first_){
                this.scrollUp_();
            }
        }
    }
    down(){
        if(this.selected_ < this.rows_.length-1){
            this.selected_++;
            if(this.selected_ >= this.last_){
                this.scrollDown_();
            }
        }
    }
    scrollUp_(){        
        if(this.first_ > 0){
            this.first_--;
            this.last_--;
        }
    }
    scrollDown_(){
        if(this.last_ < this.rows_.length){
            this.last_++;
            this.first_++;
        }
    }
}

function unitTest() {

}

if (typeof module !== 'undefined' && !module.parent) {
    unitTest()
} else {
    console.log("Importing " + module.filename)
}

export {Item, findById, Scroller};


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
