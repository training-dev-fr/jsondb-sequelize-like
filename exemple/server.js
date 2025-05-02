import User from './user.schema.js';

try {
    User.create({
        email: "mark@yopmail.com",
        password: "123456789"
    });

    User.create({
        email: "jane@yopmail.com",
        password: "1235456"
    });
    let result = User.findAll({ order: [["password","DESC"],["email"]],offset:2,limit: 1});
    console.log(result);
} catch (e) {
    console.error(e);
}