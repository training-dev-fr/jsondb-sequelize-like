import { DataTypes } from "../src/DataTypes/DataTypes.js";
import { database } from "./connection.js";

let Role = database.define('role', {
    name: {
        type: DataTypes.STRING(255),
        required: true
    }
});

export default Role;