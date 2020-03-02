import { display } from "./display";
const fetch = require('node-fetch');
var os = require('os');

const base_url = 'http://localhost:3000';

function ipAddress() {
    let rows = ["Ip Address"]
    let keys = ["eth0", "wlan0"];
    var ifaces = os.networkInterfaces();
    keys.forEach(function (ifname) {
        if(ifaces.hasOwnProperty(ifname) == false){
            return;
        }
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return; // Skip internal (i.e. 127.0.0.1) and non-ipv4 addresses
            }
            // Each interface could have multiple addresses. We will store all
            // we find, but only up to 3 total addresses can be displayed.
            rows.push(`${ifname} ${iface.address}`)
        });
    });
    display.write(rows)
}

function usbDownload() {
    display.write([
        "Usb Download",
        " Complete!",
        "",
        ""
    ])
}

function location() {
    display.write([
        "Location",
        "Lat: 39.021912",
        "Lon:-74.89286",
        ""
    ])
}

function cellular() {
    display.write(["Cellular","Loading...","",""])

    fetch(base_url + '/modem')
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["Cellular", res.carrier, res.signal, res.info]);
    })
    .catch(error=>{
        display.write(["Cellular", "Error", "", ""]);
    });
}

function wifiConnect() {
    display.write([
        "WiFi Connect",
        "Error: No File",
        "",
        ""
    ])
}

function power() {
    const title = "Power [Volts]"
    
    display.write([title,"Loading...","",""])

    fetch(base_url + '/sensor/voltages')
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write([title, `Battery:${res.battery}`, `Rtc:${res.rtc}`, `Solar:${res.solar}`]);
    })
    .catch(error=>{
        display.write([title, "Error", "", ""]);
    });
}
function server() {
    display.write([
        "Server",
        "Send Complete!",
        "",
        ""
    ])
}
function system() {
    display.write([
        "System",
        "Fw: 1.0.0",
        "Hw: 2.0",
        "2020-02-24 18:05:16"
    ])
}

export {
    ipAddress,
    usbDownload,
    location,
    cellular,
    wifiConnect,
    power,
    server,
    system
};
