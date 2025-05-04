import Model from './Model.js';
import fs from 'fs';

/**
 * @class Jdb
 * @constructor
 */
class Jdb {
    /*!*
     * constructor to manage model definition and storage
     * @param {Object} [options]
     * @param {number} [options.deepSaveTiming=300000] timing in milliseconds between two automatic deepSave
     * @param {string} [options.namespace=data] the path to the folder where data should be stored
     */
    constructor({namespace, deepSaveTiming} = {namespace:"data",deepSaveTiming: 1000*60*5}) {
        this.namespace = namespace;
        this.deepSaveTiming = deepSaveTiming;
        this.listModel = [];
        if (!fs.existsSync('./' + this.namespace)) {
            fs.mkdirSync('./' + this.namespace + '/history', { recursive: true });
        }
    }
    define(name, schema) {
        if(this.listModel.some(model => model.name === name)){
            throw new Error(name + " model already exists");
        }
        let model = new Model(name, schema, {namespace: this.namespace,deepSaveTiming: this.deepSaveTiming});
        this.listModel.push(model);
        return model;
    }
}



export {Jdb};