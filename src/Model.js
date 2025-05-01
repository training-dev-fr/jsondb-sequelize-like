import fs from "fs";
import DeepSave from "./DeepSave.js";

export default class Model {
    constructor(name, schema, namespace) {
        this.name = name;
        this.schema = schema;
        this.filename = name + ".json";
        this.logname = name + ".txt";
        this.namespace = namespace;
        this.deepSave = new DeepSave(this.logname, this.filename, name);
        if (!fs.existsSync("./" + this.namespace + "/" + this.filename)) {
            this.data = [];
            fs.writeFileSync("./" + this.namespace + "/" + this.filename, "[]", { flag: "a+" });
        } else {
            this.data = JSON.parse(fs.readFileSync('./" + this.namespace + "/' + this.filename, { flag: "a+" }));
        }
        if (!fs.existsSync("./" + this.namespace + "/history/" + this.logname)) {
            fs.writeFileSync("./" + this.namespace + "/history/" + this.logname, "", { flag: "a+" });
        }
        this.deepSaveLauncher();

        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) : 0;
    }

    save(operation, data) {
        try {
            fs.appendFileSync("./" + this.namespace + "/history/" + this.logname, operation + " " + JSON.stringify(data) + "\n");
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
            this.checkRequired(element);
        } catch (e) {
            throw e;
        }
        const newElement = {
            ...element,
            id: this.currentId + 1
        };
        this.data.push(newElement);
        try {
            this.save("add", newElement);
            this.currentId++;
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
            this.checkRequired(element);
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
                if(!this.checkLikeClause(element[field], value.like)){
                    return false;
                }
            }
            else if (value.in) {
                if(!this.checkInClause(element[field], value.like)){
                    return false;
                }
            }
            else if (element[field] !== value) {
                return false;
            }
        }
        return true;
    }

    checkLikeClause(field, like) {
        if (!typeof like !== "string") {
            throw new Error("Like operator required an string value");
        }
        let regex = new RegExp(like.replaceAll('%', '.*'));
        if (!regex.test(field)) {
            return false;
        }
    }

    checkInClause(field, array){
        if (!Array.isArray(array)) {
            throw new Error("In operator required an array value");
        }
        if (!array.includes(field)) {
            return false;
        }
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

    checkRequired(element){
        let required = this.schema.filter(property => property.required && property.required === true);
        for(let [property,options] of Object.entries(required)){
            if(!element[property]){
                throw new Error("Error : property " + property + " is required");
            }
        }
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