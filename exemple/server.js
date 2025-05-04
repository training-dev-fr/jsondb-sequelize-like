import User from './user.schema.js';
import Role from './role.schema.js';
import { Op } from '../src/index.js';

try {
//     User.create({
//         email: "mark@yopmail.com",
//         password: "123456789"
//     });
// 
//     User.create({
//         email: "jane@yopmail.com",
//         password: "1235456"
//     });
//     User.create({
//         email: "avaast@yopmail.com",
//         password: "123456789"
//     });
// 
//     User.create({
//         email: "aurelien.vaast@yopmail.com",
//         password: "1235456"
//     });
    
    User.hasOne(Role);
    let result = User.findAll({ where:{email:{[Op.like]: "%vaast%"}}});
    console.log(JSON.stringify(result));
    
    //User.hasMany(Message, {foreignKey: senderId, })
    /*console.log(result);*/
} catch (e) {
    console.error(e);
}