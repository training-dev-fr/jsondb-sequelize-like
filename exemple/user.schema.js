import Jdb,{DataTypes} from "../src/index.js";

let database = new Jdb();

let User = database.createModel('user',{
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        validate: /.*@.*/
    },
    password: {
        type: DataTypes.STRING(255)
    }
});

export default User;