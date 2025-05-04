import { DataTypes } from "../src/DataTypes/DataTypes.js";
import { database } from "./connection.js";

let Message = database.define('message', {
    text: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
});

export default Message;