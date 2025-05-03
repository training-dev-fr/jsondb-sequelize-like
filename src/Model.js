import fs from "fs";
import DeepSave from "./DeepSave.js";
import { validate } from "./Validator.js";
import Op from "./Operator.js";

/**
 * Represent a model of data, with many method to manage data storage.
 * This is build from jdb.define, based on a schema.
 * @class Model
 * @constructor
 */
class Model {
    /**
     * Model constructor, this class should not be instanciate directly, but called through jdb.define
     * @param {string} name the name of the data to store (table name)
     * @param {Object} schema the validation schema with table properties and options
     * @param {string} [namespace] the path to the folder where data should be stored (default /data)
     * @param {number} [deepSaveTiming] timing in milliseconds between two automatic deepSave (default 5 minutes)

     */
    constructor(name, schema, { namespace, deepSaveTiming = 1000 * 60 * 5 }) {
        /**
         * @private
         */
        this.name = name;
        /**
         * @private
         */
        this.schema = schema;
        if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.createdAt || this.schema.createdAt !== false)) {
            this.schema.createdAt = {
                type: Date,
            }
        }
        if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.updatedAt || this.schema.updatedAt !== false)) {
            this.schema.updatedAt = {
                type: Date,
            }
        }

        /**
         * @private
         */
        this.filename = name + ".json";
        /**
         * @private
         */
        this.logname = name + ".txt";
        /**
         * @private
         */
        this.namespace = namespace;
        /**
         * @private
         */
        this.deepSaveTiming = deepSaveTiming;
        /**
         * @private
         */
        this.deepSave = new DeepSave(this.logname, this.filename, this.name, this.namespace);

        if (!fs.existsSync("./" + this.namespace + "/history/" + this.logname)) {
            fs.writeFileSync("./" + this.namespace + "/history/" + this.logname, "", { flag: "a+" });
        } else {
            this.deepSave.save();
        }
        if (!fs.existsSync("./" + this.namespace + "/" + this.filename)) {
            /**
             * @private
             */
            this.data = [];
            fs.writeFileSync("./" + this.namespace + "/" + this.filename, "[]", { flag: "a+" });
        } else {
            this.data = JSON.parse(fs.readFileSync("./" + this.namespace + "/" + this.filename, { flag: "a+" }));
        }
        this.deepSaveLauncher();
        /**
         * @private
         */
        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) : 0;
    }
    /**
     * Launch the deepSave function to store all history operation in json data file
     */
    flush() {
        this.deepSave.save();
    }

    /**
     * Add operation in history for storage
     * @param {string} operation type of crud operation to add in history
     * @param {*} data data related to the operation
     * @private
     */
    save(operation, data) {
        try {
            fs.appendFileSync("./" + this.namespace + "/history/" + this.logname, operation + " " + JSON.stringify(data) + "\n");
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Method to launch auto-save of history into json files
     * @private
     */
    deepSaveLauncher() {
        setTimeout(() => {
            this.deepSave.save();
            this.deepSaveLauncher();
        }, this.deepSaveTiming);
    }

    /**
     * Read query to get all elements of a model.
     * @param {Object} options various filtering options
     * @returns All elements matching filtering conditions
     */
    findAll(options) {
        try {
            if (this.data.length === 0) {
                return this.data;
            }
            let result = this.data;
            if (options.where) {
                result = result.filter(element => this.checkWhereClause(element, options));
            }
            if (options.order) {
                result.sort((a, b) => {
                    for (let [property, order] of options.order) {
                        if (a[property] && !b[property]) {
                            return 1;
                        }
                        if (!a[property] && b[property]) {
                            return -1;
                        }
                        if (a[property] && b[property]) {
                            if (order === 'DESC') {
                                if (a[property] !== b[property]) {
                                    return a[property] < b[property] ? 1 : -1;
                                }
                            }
                            if (a[property] !== b[property]) {
                                return a[property] > b[property] ? 1 : -1;
                            }
                        }
                    }
                })
            }
            if (options.offset) {
                result = result.slice(options.offset)
            }
            if (options.limit) {
                result = result.slice(0, options.limit);
            }
            if (options.attributes) {
                return this.mapAttributes(result, options)
            }
            return result;
        } catch (e) {
            throw e;
        }
    }

    mapAttributes(result, options) {
        if (!Array.isArray(options.attributes)) {
            throw new Error("Attributes must be an array of string");
        }
        let newResult = [];
        for (let element of result) {
            let newElement = {};
            for (let attribute of options.attributes) {
                if (typeof attribute !== "string") {
                    throw new Error("Attributes must be an array of string");
                }
                if (typeof element[attributes] === 'undefined') {
                    throw new Error("Attributes must correspond to data column name");
                }
                newElement = element[attribute];
            }
            newResult.push(newElement);
        }
        return newResult;
    }

    /**
     * Read query to get the first element of a model.
     * @param {Object} options various filtering options
     * @returns First element matching filtering conditions
     */
    findOne(options) {
        try {
            let result = null;
            if (!options.where && this.data.length > 0) {
                result = this.data[0];
            }
            result = this.data.find(element => this.checkWhereClause(element, options));
            if (options.attributes) {
                result = this.mapAttributes([result], options);
                if (!Array.isArray(result) || result.length !== 1) {
                    throw new Error("Error while trying to map attributes");
                }
                return result[0];
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Read query to get the first element of a model by its id
     * @param {int} id id to look for
     * @returns First element with id
     */
    findByPk(id, options = {}) {
        try {
            options.where = {
                id: id
            }
            return this.data.findOne(options);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Combo query to get the first element of a model corresponding to a condition, or create it, if it does not exist
     * @param {Object} options various filtering options
     * @returns First element matching filtering conditions
     */
    findOrCreate(options) {
        try {
            let element = this.findOne(options);
            if (element) {
                return element;
            }
            return this.create(options.defaults);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Read query to count elements of a model.
     * @param {Object} options various filtering options
     * @returns All elements matching filtering conditions
     */
    count(options) {
        try {
            let result = this.findAll(options);
            if (result) {
                return result.length;
            }
            return 0;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Create query to insert an element into the database
     * @param {Object} element the element to store
     * @returns the element after created
     * @throws Error may be throw if the element does not pass all schema validation conditions
     */
    create(element) {
        try {
            let errorStack = [];
            this.addDefaultValue(element);
            errorStack = errorStack.concat(this.checkFieldExist(element));
            errorStack = errorStack.concat(this.checkFormat(element));
            errorStack = errorStack.concat(this.checkAllowNull(element));
            errorStack = errorStack.concat(this.checkValidator(element));
            if (errorStack.length > 0) {
                throw new Error("Validation failed", { cause: errorStack });
            }
        } catch (e) {
            throw e;
        }

        const newElement = {
            ...element,
            id: this.currentId + 1,
        };
        if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.createdAt || this.schema.createdAt !== false)) {
            newElement.createdAt = Date.now();
        }
        if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.updatedAt || this.schema.updatedAt !== false)) {
            elementToUpdate.updatedAt = Date.now();
        }
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

    /**
     * Update query to update an element into the database
     * @param {Object} element the element to update
     * @param {Object} options various filtering options
     * @returns the element after update
     * @throws Error may be throw if the element does not pass all schema validation conditions
     */
    updateOne(element, options) {
        let elementToUpdate = this.findOne(options);
        let copy = structuredClone(elementToUpdate);
        Object.assign(elementToUpdate, element);
        try {
            let errorStack = [];
            errorStack = errorStack.concat(this.checkFieldExist(elementToUpdate));
            errorStack = errorStack.concat(this.checkFormat(elementToUpdate));
            errorStack = errorStack.concat(this.checkAllowNull(elementToUpdate));
            errorStack = errorStack.concat(this.checkValidator(elementToUpdate));
        } catch (e) {
            throw e;
        }
        try {
            if ((!this.schema.timestamps || this.schema.timestamps !== false) && (!this.schema.updatedAt || this.schema.updatedAt !== false)) {
                elementToUpdate.updatedAt = Date.now();
            }
            this.save("update", elementToUpdate);
            return elementToUpdate;
        } catch (e) {
            elementToUpdate = copy;
            throw new Error(e.message);
        }
    }

    /**
     * Delete query to remove one or many elements from the database
     * @param {Object} options various filtering options
     * @returns number of deleted elements
     * @throws Error may be throw if the deletion failed
     */
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

    /**
     * Check all where query constraint on one element
     * @param {Object} element the element to check
     * @param {Object} options various filtering options
     * @returns true if the element passed all conditions, either false
     * @private
     */
    checkWhereClause(element, options) {
        for (let [field, value] of Object.entries(options.where)) {
            if (typeof value === "object") {
                if (this.checkOperator({ type: Object.keys(value)[0], value }, element[field]) === false) {
                    return false;
                }
            }
            else if (element[field] !== value) {
                return false;
            }
        }
        return true;
    }



    /**
     * Check element match schema validation before insert and update queries
     * @param {Object} element the element to check
     * @returns {Error[]} an array of error, if empty, the element passed all check
     * @private
     */
    checkFormat(element) {
        let errorStack = [];
        for (let [property, value] of Object.entries(element)) {
            if (typeof value !== this.schema[property].type.type) {
                errorStack.push(new Error("Error : property " + property + " must be of type " + this.schema[property].type.type));
            }
            if (this.schema[property].type.min || this.schema[property].type.max) {
                errorStack = errorStack.concat(this.checkType(property, value));
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

    checkType(property, value) {
        let errorStack = [];
        switch (this.schema[property].type) {
            case "string":
                if (this.schema[property].type.max && value.length > this.schema[property].type.max) {
                    errorStack.push(new Error("Error : property " + property + " must have " + this.schema[property].type.max + " at most"));
                }
                break;
            case "number":
                if (this.schema[property].type.max && value > this.schema[property].type.max) {
                    errorStack.push(new Error("Error : property " + property + " can not be greater than " + this.schema[property].type.max));
                }
                if (this.schema[property].type.min && value < this.schema[property].type.min) {
                    errorStack.push(new Error("Error : property " + property + " can not be lower than " + this.schema[property].type.max));
                }
                if (this.schema[property].special && this.schema[property].special === "integer") {
                    if (!Number.isInteger(value)) {
                        errorStack.push(new Error("Error : property " + property + " must be an integer value"));
                    }
                }
                if (this.schema[property].special && ["float", "double", "decimal"].includes(this.schema[property].special)) {
                    if (Number(value) !== value) {
                        errorStack.push(new Error("Error : property " + property + " must be an number value"));
                    }
                    if (this.schema[property].precision) {
                        if (value.toString().replace('.', '').replace('-', '').length > this.schema[property].precision) {
                            errorStack.push(new Error("Error : property " + property + " can not exceed " + this.schema[property].precision + " digits"));
                        }
                    }
                    if (this.schema[property].scale) {
                        let splitNumber = value.split('.');
                        if (splitNumber.length > 1) {
                            if (splitNumber[2].toString().length > this.schema[property].scale) {
                                errorStack.push(new Error("Error : property " + property + " can not have more than " + this.schema[property].scale + " decimals digits"));
                            }
                        }
                    }
                }
                break;
        }
        return errorStack;
    }

    /**
     * Check element match schema allowNull validation before insert and update queries
     * @param {Object} element the element to check
     * @returns {Error[]} an array of error, if empty, the element passed all allowNull check
     * @private
     */
    checkAllowNull(element) {
        let errorStack = [];
        /*let allowNull = Array.from(this.schema).filter(property => property.allowNull && property.allowNull === false);*/
        for (let [property, options] of Object.entries(this.schema)) {
            if (!element[property]) {
                if (property.allowNull && property.allowNull === false) {
                    errorStack.push(new Error("Error : property " + property + " is required"));
                } else {
                    element[property] = null;
                }

            }
        }
        return errorStack;
    }

    /**
     * Check element match schema properties, and no other ones before insert and update queries
     * @param {Object} element the element to check
     * @returns {Error[]} an array of error, if empty, the element passed all allowNull check
     * @private
     */
    checkFieldExist(element) {
        let errorStack = [];
        for (let property of Object.keys(element)) {
            if (!this.schema[property]) {
                errorStack.push(new Error("Error : property " + property + " does not exist on " + this.name));
            }
        }
        return errorStack;
    }

    /**
     * Check element match schema unique validation before insert and update queries
     * @param {Object} element the element to check
     * @returns {boolean} true if element is unique, either false
     * @private
     */
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

    /**
     * add defaultValue on empty element before insert and update queries
     * @param {Object} element the element to check for default values
     * @private
     */
    addDefaultValue(element) {
        for (let [property, value] of Object.entries(this.schema)) {
            if (value.defaultValue && !element[property]) {
                element[property] = value.defaultValue;
                console.log(element[property]);
            }
        }
    }

    /**
     * Check element match schema validators before insert and update queries
     * @param {Object} element the element to check
     * @returns {Error[]} an array of error, if empty, the element passed all validators check
     * @private
     */
    checkValidator(element) {
        let errorStack = [];
        for (let [property, value] of Object.entries(this.schema)) {
            if (value.validate) {
                errorStack = errorStack.concat(validate(element[property], property, value.validate));
            }
        }
        return errorStack;
    }

    checkOperator(operator, value) {
        switch (operator.type) {
            case Op.like:
                if (!this.checkLikeClause(value, operator.value.like)) {
                    return false;
                }
                break;
            case Op.ilike:
                if (!this.checkLikeClause(value, operator.value.ilike, true)) {
                    return false;
                }
                break;
            case Op.in:
                if (!this.checkInClause(value, operator.value.in)) {
                    return false;
                }
                break;
            case Op.eq:
                if (!this.checkEqClause(value, operator.value.eq)) {
                    return false;
                }
                break;
            case Op.ne:
                if (this.checkEqClause(value, operator.value.ne)) {
                    return false;
                }
                break;
            case Op.gte:
                if (!this.checkGtClause(value, operator.value.gte) && !this.checkEqClause(value, operator.value.gte)) {
                    return false;
                }
                break;
            case Op.gt:
                if (!this.checkGtClause(value, operator.value.gt)) {
                    return false;
                }
                break;
            case Op.lte:
                if (this.checkGtClause(value, operator.value.lte)) {
                    return false;
                }
                break;
            case Op.lt:
                if (this.checkGtClause(value, operator.value.lt) || this.checkEqClause(value, operator.value.lt)) {
                    return false;
                }
                break;
            case Op.notIn:
                if (this.checkInClause(value, operator.value.notIn)) {
                    return false;
                }
                break;
            case Op.notLike:
                if (this.checkLikeClause(value, operator.value.notLike)) {
                    return false;
                }
                break;
            case Op.notiLike:
                if (this.checkLikeClause(value, operator.value.notLike, true)) {
                    return false;
                }
                break;
            case Op.between:
                if (!this.checkBetweenClause(value, operator.value.between)) {
                    return false;
                }
                break;
            case Op.notBetween:
                if (this.checkBetweenClause(value, operator.value.notBetween)) {
                    return false;
                }
                break;
            case Op.is:
                if (!this.checkIsClause(value, operator.value.is)) {
                    return false;
                }
                break;
            case Op.isNot:
                if (this.checkIsClause(value, operator.value.isNot)) {
                    return false;
                }
                break;
        }

    }

    /**
     * Transform like query to js regex, and check if the corresponding element field check the constraint
     * @param {string} field the value to check on the element
     * @param {string} like the like constraint on query where options
     * @returns true if the regex match the value, either false
     * @private
     */
    checkLikeClause(field, like, insensitive = false) {
        if (typeof like !== "string") {
            throw new Error("Like operator required an string value");
        }
        let regex = new RegExp(like.replaceAll('%', '.*'), insensitive ? "i" : "");
        return regex.test(field);
    }

    /**
     * Transform in query to js includes, and check if the corresponding element field check the constraint
     * @param {string} field the value to check on the element
     * @param {array} array the list of accepted value
     * @returns true if the value is in the array, either false
     * @private
     */
    checkInClause(field, array) {
        if (!Array.isArray(array)) {
            throw new Error("In operator required an array value");
        }
        return array.includes(field);
    }

    /**
     * Transform eq query to js strict equal or value compare if type is complex (Object,Array), and check if the corresponding element field check the constraint
     * @param {string} field the value to check on the element
     * @param {*} value the value to compare
     * @returns true if the value is equel, either false
     * @private
     */
    checkEqClause(field, value) {
        if (Array.isArray(field)) {
            for (let index in field) {
                if (field[index] !== value[index]) {
                    return false;
                }
            }
            return true;
        }
        if (typeof field === "object") {
            for (let [property, propertyValue] of Object.entries(field)) {
                if (!value[property] || value[property] !== propertyValue) {
                    return false;
                }
            }
            return true;
        }
        return field === value;
    }

    /**
     * Transform gt query to js compare, and check if the corresponding element field check the constraint
     * @param {string} field the value to check on the element
     * @param {number} value the value to compare
     * @returns true if the value is in the array, either false
     * @private
     */
    checkGtClause(field, value) {
        if (Number.parseFloat(value) !== value) {
            throw new Error("Eq operator required a number value");
        }
        return field > value;
    }

    /**
     * Transform is query to js compare, and check if the corresponding element field check the constraint
     * @param {string} field the value to check on the element
     * @param {boolean} value the value to compare
     * @returns true if the value is in the array, either false
     * @private
     */
    checkIsClause(field, value) {
        if (value !== true && value !== false && value !== null) {
            throw new Error("Is operator required a boolean or null value");
        }
        return field === value;
    }

    /**
     * Transform between query to js compare, and check if the corresponding element field check the constraint
     * @param {string} field the value to check on the element
     * @param {array[]} value the value to compare 
     * @returns true if the value is in the array, either false
     * @private
     */
    checkBetweenClause(field, value) {
        if (!Array.isArray(value) || value.length !== 2) {
            throw new Error("Between operator required a array with two value");
        }
        return field >= value[0] && field <= value[1];
    }
}

export default Model;