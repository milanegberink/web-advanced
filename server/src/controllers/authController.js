import { findUser} from "../modules/findUser.js";
import { v4 as uuidv4 } from 'uuid';
import users from '../data/users.json' assert {type: 'json'};
import jwt from 'jsonwebtoken';
import { verifyPassword } from "../modules/passwordUtils.js";
import writeToFile from "../modules/writeToFile.js";
import User from "../models/User.js";

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await findUser(username);

    if (!user) {
        return res.status(404).send(JSON.stringify('User not found'));
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
        return res.status(404).send(JSON.stringify('Invalid password or username'));
    }

    const secret = uuidv4();

    user.secret = secret;

    await writeToFile(users, './src/data/users.json');

    const jwtToken = jwt.sign({ username: user.username, role: user.role, id: user.id }, secret);

    if (user.roles.includes('admin')) {
        return res.status(200).send(JSON.stringify({ token: jwtToken, admin: true }));
    }

    return res.status(200).send(JSON.stringify({ token: jwtToken }));
}

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create(username, password, 'user');
        await user.save()
        res.status(201).send('User created successfully');
    } catch (e) {
        res.status(400).send(JSON.stringify(e.message));
    }
}

const handleSuccessfullAuth = async (req, res) => {
    res.sendStatus(200);
}

const logoutUser = async (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    delete user.secret;
    await writeToFile(users, './src/data/users.json');
    res.sendStatus(200)
}

export {loginUser, registerUser, handleSuccessfullAuth, logoutUser};