import users from '../data/users.json' assert {type: 'json'};

const findUser = async (username) => users.find(user => user.username === username);
const findUserById = async (id) => users.find(user => user.id === id);

export { findUser, findUserById };