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
    const Url = 'http://192.168.0.58:8080/files/ip_address.json';

    lcd.clear();
    lcd.println( 'Loading...', 1);

    fetch(Url)
    .then(data=>{return data.json()})
    .then(res=>{
        lcd.clear();
        lcd.println(res.ip, 1);
    })
    .catch(error=>{
        lcd.clear();
        lcd.println("Error!", 1);
        console.log(error);
    });
}


export {welcomeTask, ipAddress};