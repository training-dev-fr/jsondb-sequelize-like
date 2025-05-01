import Jdb,{DataTypes} from "../src/index.js";

let database = new Jdb();

let User = database.createModel('user',{
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        validate: /.*@.*/,
        required: true
    },
    password: {
        type: DataTypes.STRING(255),
        required: true,
        defaultValue: '123456654321'
    }
});

export default User;