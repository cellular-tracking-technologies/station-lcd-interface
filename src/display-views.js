import { display } from "./display";
const fetch = require('node-fetch');

function ipAddress(){
    // const Url = 'http://192.168.0.58:8080/files/ip_address.json';

    // display.write([
    //     "Ip Address",
    //     "Loading...",
    //     "",
    //     ""
    // ])

    // fetch(Url)
    // .then(data=>{return data.json()})
    // .then(res=>{
    //     display.write([
    //         res.ip.toString(),
    //         "",
    //         "",
    //         ""
    //     ])
    // })
    // .catch(error=>{
    //     display.write([
    //         "Error!",
    //         "",
    //         "",
    //         ""
    //     ])
    // });

    display.write([
        "Ip Address",
        "e0:192.168.0.115",
        "w0:192.168.0.103",
        ""
    ])
}

function usbDownload(){
    display.write([
        "Usb Download",
        " Complete!",
        "",
        ""
    ])
}

function location(){
    display.write([
        "Location",
        "Lat: 39.021912",
        "Lon:-74.89286",
        ""
    ])
}

function cellular(){
    display.write([
        "Cellular",
        "Carrier: AT&T,-87",
        "Tech: 4G",
        ""
    ])
}

function wifiConnect(){
    display.write([
        "WiFi Connect",
        "Error: No File",
        "",
        ""
    ])
}

function power(){
    display.write([
        "Power",
        "Battery 12.1 [Volts]",
        "Solar   24.0 [Volts]",
        "Rtc     3.1  [Volts]"
    ])
}
function server(){
    display.write([
        "Server",
        "Send Complete!",
        "",
        ""
    ])
}
function system(){
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