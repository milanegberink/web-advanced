import {goto} from '@mateothegreat/svelte5-router';

const logoutUser = async () => {
    const token = localStorage.getItem('token');
    try {
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`}
        });
        goto('/login');
    } catch (error) {
        console.error(error);
    }
}

export default logoutUser;