import fs from "fs";
import DeepSave from "./DeepSave.js";

export default class Model {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
        this.filename = name + ".json";
        this.logname = name + ".txt";
        this.deepSave = new DeepSave(this.logname,this.filename,name);
        if (!fs.existsSync("./data/" + this.filename)) {
            this.data = [];
            fs.writeFileSync("./data/" + this.filename, "[]", { flag: "a+" });
        } else {
            this.data = JSON.parse(fs.readFileSync('./data/' + this.filename, { flag: "a+" }));
        }
        if (!fs.existsSync("./data/log/" + this.logname)) {
            fs.writeFileSync("./data/log/" + this.logname, "", { flag: "a+" });
        }
        this.deepSaveLauncher();

        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) : 0;
    }

    save(operation, data) {
        try {
            fs.appendFileSync("./data/log/" + this.logname, operation + " " + JSON.stringify(data) + "\n");
        } catch (e) {
            throw new Error(e.message);
        }
    }

    deepSaveLauncher() {
        setTimeout(() => {
            this.deepSave.save();
        }, 5000);
    }

    deep

    findAll(options) {
        if (!options.where && this.data.length > 0) {
            return this.data;
        }
        return this.data.filter(element => this.checkWhereClause(element, options));
    }

    findOne(options) {
        if (!options.where && this.data.length > 0) {
            return this.data[0];
        }
        return this.data.find(element => this.checkWhereClause(element, options));
    }

    create(element) {
        try {
            this.checkFieldExist(element);
            this.checkFormat(element);
        } catch (e) {
            throw e;
        }
        const newElement = {
            ...element,
            id: ++this.currentId
        };
        this.data.push(newElement);
        try {
            this.save("add", newElement);
        } catch (e) {
            this.data.pop();
            throw new Error(e.message);
        }

        return newElement;
    }

    updateOne(element, options) {
        let elementToUpdate = this.findOne(options);
        let copy = structuredClone(elementToUpdate);
        try {
            this.checkFieldExist(element);
            this.checkFormat(element);
        } catch (e) {
            throw e;
        }
        Object.assign(elementToUpdate, element);
        try {
            this.save("update", elementToUpdate);
        } catch (e) {
            elementToUpdate = copy;
            throw new Error(e.message);
        }
    }

    destroy(options) {
        if (!options.where && this.data.length > 0) {
            return 0;
        }
        let count = this.data.length;
        const dataToDelete = this.findOne(options);
        this.data = this.data.filter(user => !checkWhereClause(user, options));
        try {
            this.save("delete", dataToDelete);
        } catch (e) {
            this.data.push(dataToDelete);
            throw new Error(e.message);
        }
        return count - this.data.length;
    }

    checkWhereClause(element, options) {
        for (let [field, value] of Object.entries(options.where)) {
            if (typeof element[field] === 'number') {
                value = parseInt(value);
            }
            if (value.like) {
                let regex = new RegExp(value.like.replaceAll('%', '.*'));
                if (!regex.test(element[field])) {
                    return false;
                }
            }
            else if (value.is) {
                if (!Array.isArray(value.is)) {
                    throw new Error("Is operator required an array value");
                }
                if (!value.is.includes(element[field])) {
                    return false;
                }
            }
            else if (element[field] !== value) {
                return false;
            }
        }
        return true;
    }

    checkFormat(element) {
        for (let [property, value] of Object.entries(element)) {
            if (typeof value !== this.schema[property].type.type) {
                throw new Error("Error : property " + property + " must be of type " + this.schema[property].type.type);
            }
            if (this.schema[property].type.max && value.length > this.schema[property].type.max) {
                throw new Error("Error : property " + property + " must have " + this.schema[property].type.max + " at most");
            }
            if (this.schema[property].unique) {
                let result = this.checkUnique(property, value);
                if (!result) {
                    throw new Error("Error : property " + property + " must be unique");
                }
            }
        }
        return true;
    }

    checkFieldExist(element) {
        for (let property of Object.keys(element)) {
            if (!this.schema[property]) {
                throw new Error("Error : property " + property + " does not exist on " + this.name);
            }
        }
        return true;
    }

    checkUnique(property, value) {
        let obj = {};
        obj[property] = value;
        let element = this.findOne({
            where: obj
        });
        if (element) {
            return false;
        }
        return true;
    }
}