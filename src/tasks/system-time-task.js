var os = require('os');

class SystemTimeTask{
    constructor(){
        this.header = "Time";
    }
    loading(){
        return [this.header];
    }
    results(){
        return new Promise((resolve, reject) => {

            let ts = Date.now();

            let date = new Date(ts);
            let year = date.getFullYear();
            let mon = date.getMonth() + 1;
            let day = date.getDate();

            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();

            const time_string = `${year}-${mon}-${day} ${hour}:${min}:${sec}`;
            
            resolve([this.header, time_string]);
        });
    }
}

export {SystemTimeTask};