import display from "./display-driver";
const fetch = require('node-fetch');
var os = require('os');
const url = require('url');
const { exec } = require('child_process');

const base_url = 'http://localhost:3000';

function ipAddress() {
    let rows = ["Ip Address"]
    const regex = /(wlan\d+|eth\d+)/;   // Match all 'eth' or 'wlan' interfaces
    var ifaces = os.networkInterfaces();

    for (let [key, value] of Object.entries(ifaces)){
        if(key.match(regex)){
            const result = value.filter(element => (element.family == 'IPv4') && (element.internal == false));
            result.forEach(element =>{
                rows.push(`${key} ${element.address}`);
            })        
        }
    } 

    display.write(rows)
}
function usbMount() {

    display.write(["Usb","Mounting...","",""])

    fetch(url.resolve(base_url, 'usb/mount'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["Usb", `Mount:${res.status}`,"",""]);
    })
    .catch(error=>{
        display.write(["Usb", `Mount:error`,"",""]);
    });
}
function usbUnmount() {
    display.write(["Usb","Unmounting...","",""])

    fetch(url.resolve(base_url, 'usb/unmount'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["Usb", `Unmount:${res.status}`,"",""]);
    })
    .catch(error=>{
        display.write(["Usb", `Unmount:error`,"",""]);
    });
}
function usbDownload() {
    display.write(["Usb","Downloading...","",""])

    fetch(url.resolve(base_url, 'usb/data'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["Usb", `Download:${res.status}`,"",""]);
    })
    .catch(error=>{
        display.write(["Usb", `Download:error`,"",""]);
    });
}

function location() {
    display.write(["Location","Loading...","",""])

    fetch(url.resolve(base_url, 'gps'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["Location", `Lat:${res.mean.lat}`, `Lon:${res.mean.lng}` ,""]);
    })
    .catch(error=>{
        console.log(error)
        display.write(["Location", "Error", "", ""]);
    });

}

function cellular() {
    display.write(["Cellular","Loading...","",""])

    fetch(url.resolve(base_url, 'modem'))
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
    display.write(["WiFi","Uploading...","",""])

    fetch(url.resolve(base_url, 'usb/wifi'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["WiFi", `Uploading:${res.status}`,"",""]);
    })
    .catch(error=>{
        display.write(["WiFi", `Uploading:error`,"",""]);
    });
}

function power() {
    const title = "Power [Volts]"    
    display.write([title,"Loading...","",""])

    fetch(url.resolve(base_url, 'sensor/voltages'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write([title, `Battery:${res.battery}`, `Rtc:${res.rtc}`, `Solar:${res.solar}`]);
    })
    .catch(error=>{
        display.write([title, "Error", "", ""]);
    });
}
function sensor() {
    const title = "Sensor"    
    display.write([title,"Loading...","",""])

    fetch(url.resolve(base_url, 'sensor/temperature'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write([title, `Temp:${res.celsius}C [${res.fahrenheit}F]`, "", ""]);
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
    display.write(["System","Loading...","",""])

    fetch(url.resolve(base_url, 'id'))
    .then(data=>{ 
        return data.json()})
    .then(res=>{
        display.write(["System",res.id,"",""])
    })
    .catch(error=>{
        display.write(["System","error","",""])
    });
}

function restart(){
    display.write(["System","Restarting...","",""])
    let child = exec('shutdown -r now', (error,stdout, stderr) =>{
        if(error){
            display.write(["System","Restart Error!","",""])
        }
    })         
    child.stdout.on('data', (data) => {                       
    });
    child.on('close', (code) => {
    }); 
}

export {
    ipAddress,
    usbMount,
    usbUnmount,
    usbDownload,
    location,
    cellular,
    wifiConnect,
    power,
    sensor,
    server,
    system,
    restart
};
