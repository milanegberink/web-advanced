import authenticate from "./authenticate.js";

const authenticateAdmin = authenticate({
    requiredRoles: ['admin']
});

export default authenticateAdmin;