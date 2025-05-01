import fs from "fs";

export default class DeepSave {
    constructor(logname, filename, model) {
        this.logname = logname;
        this.filename = filename;
        this.model = model;
    }

    save() {
        try {
            fs.renameSync("./data/log/" + this.logname, "./data/log/" + this.model + ".old.txt");
            
            let content = fs.readFileSync("./data/log/" + this.model + ".old.txt", { encoding: 'utf8' }).split('\n');
            content.pop();
            this.data = JSON.parse(fs.readFileSync("./data/" + this.filename, { encoding: 'utf8' }));
            for (let line of content) {
                this.addLine(line);
            }
            fs.writeFileSync("./data/" + this.filename, JSON.stringify(this.data));
            fs.writeFileSync("./data/log/" + this.logname, "", { flag: "a+" });
            fs.rmSync("./data/log/" + this.model + ".old.txt");
        } catch (e) {
            console.error(e);
        }
    }

    addLine(line) {
        let [operation, data] = line.split(" ");
        data = JSON.parse(data);
        switch (operation) {
            case "add":
                this.data.push(data);
                break;
            case "update":
                let element = this.data.find(e => e.id === data.id);
                element = data;
                break;
            case "delete":
                this.data.filter(element => element.id !== data.id);
                break;
        }
    }
}