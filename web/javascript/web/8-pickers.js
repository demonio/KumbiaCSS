const buttons = document.querySelectorAll('.color-picker button, .theme-picker button');

buttons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        if (event.currentTarget.matches('.color-picker button')) {
            const color = event.currentTarget.getAttribute('data-color');
            document.querySelector('html').setAttribute('data-color', color);
            storage.action('save', 'color', color);
            updatePrismContainer('.set-color', `<html data-color="${color}">`);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.querySelector('.theme-picker [name="dark_mode"]');

    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', () => {
            const theme = darkModeSwitch.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            storage.action('save', 'theme', theme);
            updatePrismContainer('.set-theme', `<html data-theme="${theme}">`);
        });
    }
});