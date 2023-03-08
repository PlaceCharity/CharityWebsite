import { writable } from "svelte/store";

const storedTheme = localStorage.getItem("theme");
const storedLocale = localStorage.getItem("locale");

export const theme = writable(storedTheme);
export const locale = writable(storedLocale);

theme.subscribe(value => {
    localStorage.setItem("theme", value === 'light' ? 'light' : 'dark');
});

locale.subscribe(value => {
    localStorage.setItem("locale", value === null || value === undefined ? 'en' : value);
});