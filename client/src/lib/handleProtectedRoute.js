import { goto } from '@mateothegreat/svelte5-router';

const handleProtectedRoute = async () => {
    if (!localStorage.getItem("token")) {
        return goto("login")
    }

    if (!(await checkIfTokenValid())) {
        return goto("login")
    }
}


const checkIfTokenValid = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/auth', {
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