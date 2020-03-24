const { exec } = require('child_process');

class SystemRestartTask {
    constructor() {
        this.header = "Restarting";
    }
    loading() {
        return [this.header + "..."];
    }
    results() {
        return new Promise((resolve, reject) => {
            let child = exec('shutdown -r now', (error, stdout, stderr) => {
                if (error) {
                    display.write(["System", "Restart Error!", "", ""])
                }
            })
            child.stdout.on('data', (data) => {
            });
            child.on('close', (code) => {
                resolve(this.loading());
            });
        });
    }
}

export { SystemRestartTask };