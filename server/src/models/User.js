import users from '../data/users.json' assert { type: 'json' };
import writeToFile from "../modules/writeToFile.js";

class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.setUsername(username);
        this.setPassword(password);
        this.setRole(role);
    }
    setUsername(username) {
        if (username.length < 3 || username.length > 50) {
            throw new Error('Username must be at least 3 characters long and no more than 50 characters');
        }

        if (users.find(user => user.username === username)) {
            throw new Error('User with this username already exists');
        }

        this.username = username;
    }
    setPassword(password) {
        if (password.length < 3 || password.length > 50) {
            throw new Error('Password must be at least 3 characters long and no more than 50 characters');
        }

        this.password = password;
    }

    setRole(role) {
        if (role !== 'admin' && role !== 'user') {
            throw new Error('Role must be either admin or user');
        }

        this.role = role;
    }

    async save() {
        users.push(this);
        await writeToFile(users, './src/data/users.json');
    }
}

export default User;