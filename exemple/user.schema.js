import { DataTypes } from "../src/DataTypes/DataTypes.js";
import { database } from "./connection.js";

let User = database.define('user', {
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        validate: {
            is: /.*@.*/
        },
        required: true
    },
    password: {
        type: DataTypes.STRING(255),
        required: true,
        defaultValue: '123456654321'
    }
});

export default User;