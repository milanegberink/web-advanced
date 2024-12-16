import authenticate from "./authenticate.js";

const authenticateUser = authenticate({
    requiredRoles: ['user']
});

export default authenticateUser;