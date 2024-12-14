import jwt from 'jsonwebtoken';
import validateToken from "../modules/validateToken.js";
import {findUser, findUserById} from "../modules/findUser.js";

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decodedToken = jwt.decode(token);

    if (!decodedToken) return res.sendStatus(403);

    const user = await findUserById(decodedToken.id);

    if (await validateToken(token, user.secret)) {
        req.user = user;
        next();
    } else return res.sendStatus(403);
};

export default authenticateUser;