import User from './user.schema.js';

try {
    User.create({
        email: "aurelien.vaast3@viacesi.fr",
        password: "123456"
    });

    User.create({
        email: "avaast3@myges.fr",
        password: "123456"
    });
} catch (e) {
    console.error(e);
}