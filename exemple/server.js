import User from './user.schema.js';
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
    let result = User.findAll({ where:{email:{[Op.like]: "%vaast%"}}});
    console.log(result);
} catch (e) {
    console.error(e);
}