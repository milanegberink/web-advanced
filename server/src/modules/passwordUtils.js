import bcrypt from "bcrypt";

const validatePassword = (password) => {
    if (password.length < 5 || password.length > 50) {
        throw new Error('Password must be at least 5 characters long and no more than 50 characters');
    }

    if (password.includes(' ')) {
        throw new Error('Password cannot contain empty space');
    }
}

const hashPassword = (password) => bcrypt.hash(password, 10);

const verifyPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export { validatePassword, hashPassword, verifyPassword };