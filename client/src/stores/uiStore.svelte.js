import { writable } from 'svelte/store';

export const isSidebarOpen = writable(true);

export const theme = writable(localStorage.getItem('data-theme'));

export const setTheme = (value) => {
    localStorage.setItem('data-theme', value);
}

export const currentRoute = writable(window.location.pathname);
