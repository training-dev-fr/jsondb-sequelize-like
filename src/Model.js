import fs from "fs";
import DeepSave from "./DeepSave.js";
import { validate } from "./Validator.js";

export default class Model {
    constructor(name, schema, namespace) {
        this.name = name;
        this.schema = schema;
        this.filename = name + ".json";
        this.logname = name + ".txt";
        this.namespace = namespace;
        this.deepSave = new DeepSave(this.logname, this.filename, this.name, this.namespace);
        if (!fs.existsSync("./" + this.namespace + "/" + this.filename)) {
            this.data = [];
            fs.writeFileSync("./" + this.namespace + "/" + this.filename, "[]", { flag: "a+" });
        } else {
            this.data = JSON.parse(fs.readFileSync("./" + this.namespace + "/" + this.filename, { flag: "a+" }));
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
            let errorStack = [];
            this.addDefaultValue(element);
            errorStack = errorStack.concat(this.checkFieldExist(element));
            errorStack = errorStack.concat(this.checkFormat(element));
            this.checkRequired(element);
            errorStack = errorStack.concat(this.checkValidator(element));
            if(errorStack.length > 0){
                throw new Error("Validation failed",{cause: errorStack});
            }
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
            this.checkValidator(element);
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
            if (value.like) {
                if (!this.checkLikeClause(element[field], value.like)) {
                    return false;
                }
            }
            else if (value.in) {
                if (!this.checkInClause(element[field], value.in)) {
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
        if (typeof like !== "string") {
            throw new Error("Like operator required an string value");
        }
        let regex = new RegExp(like.replaceAll('%', '.*'));
        return regex.test(field);
    }

    checkInClause(field, array) {
        if (!Array.isArray(array)) {
            throw new Error("In operator required an array value");
        }
        return array.includes(field);
    }

    checkFormat(element) {
        let errorStack = [];
        for (let [property, value] of Object.entries(element)) {
            if (typeof value !== this.schema[property].type.type) {
                errorStack.push(new Error("Error : property " + property + " must be of type " + this.schema[property].type.type));
            }
            if (this.schema[property].type.max && value.length > this.schema[property].type.max) {
                errorStack.push(new Error("Error : property " + property + " must have " + this.schema[property].type.max + " at most"));
            }
            if (this.schema[property].unique) {
                let result = this.checkUnique(property, value);
                if (!result) {
                    errorStack.push(new Error("Error : property " + property + " must be unique"));
                }
            }
        }
        return errorStack;
    }

    checkRequired(element) {
        let errorStack = [];
        let required = Array.from(this.schema).filter(property => property.required && property.required === true);
        for (let [property, options] of Object.entries(required)) {
            if (!element[property]) {
                errorStack.push(new Error("Error : property " + property + " is required"));
            }
        }
        return errorStack;
    }

    checkFieldExist(element) {
        let errorStack = [];
        for (let property of Object.keys(element)) {
            if (!this.schema[property]) {
                errorStack.push(new Error("Error : property " + property + " does not exist on " + this.name));
            }
        }
        return errorStack;
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

    addDefaultValue(element) {
        for (let [property, value] of Object.entries(this.schema)) {
            if (value.defaultValue && !element[property]) {
                element[property] = value.defaultValue;
                console.log(element[property]);
            }
        }
    }

    checkValidator(element){
        let errorStack = [];
        for (let [property, value] of Object.entries(this.schema)) {
            if (value.validate) {
                errorStack = errorStack.concat(validate(element[property],property,value.validate));
            }
        }
        return errorStack;
    }
}