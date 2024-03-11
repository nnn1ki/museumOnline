const jwt = require('jsonwebtoken')
const {DataTypes} = require("sequelize");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {

        const token = req.headers.authorization.split(' ')[1];
        console.log("token --------- ", token);
        if (!token) {
            return res.status(401).json({message: 'Не авторизован'})
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY);
        console.log("req.user ----------- ", req.user);
        // req.user = {
        //     id_user: 4,
        //     username: 'user4',
        //     email_user: 'user4@example.com',
        //     password_user: 'password123',
        //     role_user: 'admin',
        //     address_user: 'Address 4'
        // };
        next();
    } catch (e) {
        res.status(401).json({message: 'Не авторизован'})
    }

    // next();

    //другой вариант
    // const token = req.headers.authorization;
    //
    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    //
    // jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    //     if (err) {
    //         return res.status(403).json({ message: 'Forbidden' });
    //     }
    //
    //     // Установить user в объект запроса
    //     req.user = user;
    //     next();
    // });

}