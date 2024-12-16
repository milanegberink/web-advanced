import { goto } from '@mateothegreat/svelte5-router';
import { isAdmin} from "../stores/userStore.svelte.js";

const handleProtectedRoute = async (userRole) => {
    if (!localStorage.getItem("token")) {
        return goto("login")
    }

    if (!(await checkIfTokenValid(userRole))) {
        return goto("login")
    }
}

const checkIfTokenValid = async (userRole) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/auth/${userRole}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`}
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default handleProtectedRoute;
