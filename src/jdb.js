import Model from './Model.js';
import fs from 'fs';

/**
 * @class Model
 * @constructor
 */
class Jdb {
    /**
     * constructor to manage model definition and storage
     * @param {number} [deepSaveTiming=300000] timing in milliseconds between two automatic deepSave
     * @param {string} [namespace=data] the path to the folder where data should be stored
     */
    constructor({namespace="data", deepSaveTiming=1000*60*5}) {
        this.namespace = namespace;
        this.deepSaveTiming = deepSaveTiming;
        if (!fs.existsSync('./' + this.namespace)) {
            fs.mkdirSync('./' + this.namespace + '/history', { recursive: true });
        }
    }
    define(name, schema) {
        return new Model(name, schema, this.namespace, this.deepSaveTiming);
    }
}



export default Jdb;