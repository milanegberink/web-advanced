import { writable } from 'svelte/store';

const storedAdminStatus = localStorage.getItem('isAdmin') === 'true';

export const isAdmin = writable(storedAdminStatus);

isAdmin.subscribe(value => {
    localStorage.setItem('isAdmin', value.toString());
});