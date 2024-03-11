const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Discount} = require('../models/models')

const generateJwt = (id, email_user, role) => {
    return jwt.sign({id, email_user, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {

    async registration(req, res, next) {
        const {email_user, password_user, role} = req.body;
        if (!email_user || ! password_user) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }

        const candidate = await User.findOne({where: {email_user}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password_user, 5)

        const user = await User.create({email_user, role, password_user: hashPassword})
        const token = generateJwt(user.id, email_user, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const { email_user, password_user } = req.body;

        try {
            const user = await User.findOne({ where: { email_user } });

            if (!user) {
                return next(ApiError.internal('Пользователь не найден'));
            }

            if (password_user === user.password_user) {
                console.log("Проверка вышла на этом этапе");
                console.log(user);
                const token = generateJwt(user.id_user, user.email_user, user.role_user);
                // Возвращаем объект с токеном и информацией о пользователе
                return res.json({ token, userInfo: user });

                // return res.json({ token });
            } else {
                return next(ApiError.badRequest('Указан неверный пароль'));
            }
        } catch (error) {
            console.error('Error during login:', error);
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }


    async check(req, res) {
        console.log("req.user --------- ", req.user);
        const token = generateJwt(req.user.id_user, req.user.email_user, req.user.role);
        return res.json({token});
    }

    async getUserInfo(req, res) {
        const { email } = req.params;
        const user = await User.findOne({ where: { email_user: email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Найденный пользователь через get --- ", user);
        return res.json({ user });
    }

    async updateUserInfo(req) {
        const { newUser } = req.body;
        // console.log("newUser", newUser);
        if (!newUser) return console.log("Информация не полноценна!");
        try {
            await User.update(newUser.newUser._user, { where: { id_user: newUser.newUser._user.id_user} });
        }catch (e) {
            console.log("Ошибка обновления информации о пользователе")
        }


    }


}

module.exports = new UserController();

