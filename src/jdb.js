import Model from './Model.js';
import fs from 'fs';

class Jdb {
    constructor({
        namespace,
        encrypt
    }={namespace: 'data',encrypt: false}) {
        this.namespace = namespace;
        this.encrypt = encrypt;
        if(!fs.existsSync('./' + this.namespace)){
            fs.mkdirSync('./' + this.namespace + '/history', {recursive: true});
        }
    }
    define(name, schema) {
        return new Model(name, schema, this.namespace);
    }
}



export default Jdb;