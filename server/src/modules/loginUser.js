import { findUser } from "./findUser.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import users from '../data/users.json' assert {type: 'json'};
import jwt from 'jsonwebtoken';
import { verifyPassword} from "./passwordUtils.js";
import writeToFile from "./writeToFile.js";

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await findUser(username);

    if (!user) {
        return res.status(404).send('User not found');
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
        return res.status(404).send('Invalid password or username');
    }

    const secret = uuidv4();

    user.secret = secret;

    await writeToFile(users, './src/data/users.json');

    const jwtToken = jwt.sign({ username: user.username, role: user.role, id: user.id }, secret);

    return res.status(200).send(JSON.stringify({ token: jwtToken }));
}

export default loginUser;