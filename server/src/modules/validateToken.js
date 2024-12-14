import jwt from 'jsonwebtoken';

const validateToken = async (token, secret) => {
    try {
        jwt.verify(token, secret)

        return true;
    } catch (error) {
        return false;
    }
}

export default validateToken;