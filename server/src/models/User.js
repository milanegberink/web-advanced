import users from '../data/users.json' assert {type: 'json'};
import writeToFile from "../modules/writeToFile.js";
import {validatePassword, hashPassword} from "../modules/passwordUtils.js";

class User {
    constructor(id, username, password) {
        this.id = id;
        this.setUsername(username);
        this.password = password;
        this.roles = ['user'];
    }

    static create = async (username, password, role) => {

        validatePassword(password);

        const hashedPassword = await hashPassword(password);

        return new this(users.length + 1, username, hashedPassword, role);
    }

    setUsername(username) {

        if(!username) {
            throw new Error('Username is required');
        }

        username = username.toLowerCase();

        if (username.length < 3 || username.length > 50) {
            throw new Error('Username must be at least 3 characters long and no more than 50 characters');
        }

        if (username.includes(' ')) {
            throw new Error('Username cannot contain empty space');
        }

        if (users.find(user => user.username === username)) {
            throw new Error('User with this username already exists');
        }

        this.username = username;
    }

    async save() {

        users.push(this);

        await writeToFile(users, './src/data/users.json');
    }
}

export default User;