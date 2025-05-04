class Entity {
    constructor(data, model, attributes) {
        this.model = model;
        if (this.attributes) {
            if (!Array.isArray(this.attributes)) {
                throw new Error("Attributes must be an array of string");
            }
        }
        if (this.attributes) {
            if (!Array.isArray(this.attributes)) {
                throw new Error("Attributes must be an array of string");
            }

            for (let property of this.attributes) {
                if (property === 'string') {
                    throw new Error("Attributes must be string")
                }
                if (typeof this.model.schema[property] === 'undefined') {
                    throw new Error("Attributes must exists in schema properties")
                }
                this[property] = this.parseType(property, data[property]);
            }
        }else{
            Object.entries(data).map(([property,value]) => this[property] = this.parseType(property,value));
        }
        this.attributes = attributes;
    }

    parseType(property, value) {
        switch (this.model.schema[property].type.type) {
            case "integer":
                return Number.parseInt(value);
            case "date":
                return new Date(value);
            default :
                return value;
        }
    }

    toJSON() {
        if (this.attributes) {
            if (!Array.isArray(this.attributes)) {
                throw new Error("Attributes must be an array of string");
            }
        }
        let toJsonElement = {};
        for (let [property, value] of Object.entries(this.model.schema)) {
            if (typeof this[property] !== undefined) {
                toJsonElement[property] = this[property];
            }
        }
        return toJsonElement;
    }
}



export { Entity };