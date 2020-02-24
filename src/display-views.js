import { display } from "./display";
const fetch = require('node-fetch');


// display.writeRow("test2", 2)
// display.writeRow("test3", 3)
// display.writeRow("test4", 4)


function welcomeTask(){
    display.clear()
    display.writeRow("SensorStation")
}

function ipAddress(){
    // const Url = 'http://192.168.0.58:8080/files/ip_address.json';

    // lcd.clear();
    // lcd.println( 'Loading...', 1);

    // fetch(Url)
    // .then(data=>{return data.json()})
    // .then(res=>{
    //     lcd.clear();
    //     lcd.println(res.ip, 1);
    // })
    // .catch(error=>{
    //     lcd.clear();
    //     lcd.println("Error!", 1);
    //     console.log(error);
    // });

    console.log("Ip Address")
    console.log(" -eth0: 192.168.0.115")
    console.log(" -wlan0:192.168.0.103")
    console.log("")
    
    // display.writeRow("eth0: 192.168.0.115", 1);
    // display.writeRow("wlan0:192.168.0.103", 2)
}

function usbDownload(){
    console.log("Usb Download")
    console.log(" Complete!")
    console.log("")
    console.log("")
}

function location(){
    console.log("Location")
    console.log("Lat: 39.021912")
    console.log("Lon:-74.89286")
    console.log("")
}

function cellular(){
    console.log("Cellular")
    console.log("Carrier: AT&T [-87 dBm]")
    console.log("Tech: 4G")
    console.log("")
}

function wifiConnect(){
    console.log("WiFi Connect")
    console.log("Error: No Usb File")
    console.log("")
    console.log("")
}

function power(){
    console.log("Power")
    console.log("Battery: 12.1 [Volts]")
    console.log("Solar: 24.0 [Volts]")
    console.log("Rtc: 3.1 [Volts]")
}
function server(){
    console.log("Server")
    console.log("Send Complete...")
    console.log("")
    console.log("")
}
function system(){
    console.log("System")
    console.log("Fw: 1.0.0")
    console.log("Hw: 2.0")
    console.log("2020-02-24 18:05:16")
}
export {ipAddress, usbDownload, location, cellular, wifiConnect, power, server, system};