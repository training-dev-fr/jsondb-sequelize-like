import fs from "fs";

export default class DeepSave {
    constructor(logname, filename, model, namespace) {
        this.logname = logname;
        this.filename = filename;
        this.model = model;
        this.namespace = namespace;
        if (fs.existsSync("./" + this.namespace + "/history/" + this.model + ".old.txt")) {
            this.save(false);
        }
    }

    save(createOldHistory = true) {
        try {
            if (createOldHistory) {
                fs.renameSync("./" + this.namespace + "/history/" + this.logname, "./" + this.namespace + "/history/" + this.model + ".old.txt");
            }
            let content = fs.readFileSync("./" + this.namespace + "/history/" + this.model + ".old.txt", { encoding: 'utf8' }).split('\n');
            content = content.filter(line => line != "");
            this.data = JSON.parse(fs.readFileSync("./" + this.namespace + "/" + this.filename, { encoding: 'utf8' }));
            for (let line of content) {
                this.addLine(line);
            }
            fs.writeFileSync("./" + this.namespace + "/" + this.filename, JSON.stringify(this.data));
            fs.writeFileSync("./" + this.namespace + "/history/" + this.logname, "", { flag: "a+" });
            fs.rmSync("./" + this.namespace + "/history/" + this.model + ".old.txt");
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