import Op from '../src/Operator.js';
import User from './user.schema.js';

try {
        User.create({
            email: "mark@yopmail.com",
            password: "123456789"
        });
    
        User.create({
            email: "jane@yopmail.com",
            password: "123456"
        });
    let result = User.findAll({ where: {password:{ [Op.in]: ["123456789","123456"] }} });
    console.log(result);
} catch (e) {
    console.error(e);
}