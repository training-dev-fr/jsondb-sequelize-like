import {Jdb} from "../src/jdb.js";

/**
 * this need to be in seperate file if you ever want to switch to sequelize.
 * In that case, you juste have to replace this line, by sequelize constructor/connection, and everything else will work on it
 */ 
let database = new Jdb();


export {database};