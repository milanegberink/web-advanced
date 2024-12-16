import {goto} from '@mateothegreat/svelte5-router';
import { isAdmin } from "../stores/userStore.svelte.js";

const logoutUser = async () => {
    const token = localStorage.getItem('token');
    try {
        await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`}
        });
        isAdmin.set(false);
        localStorage.removeItem('token');
        goto('/login');
    } catch (error) {
        console.error(error);
    }
}

export default logoutUser;