let color = storage.action('read', 'color') || 'green';
document.querySelector('html').setAttribute('data-color', color);
updatePrismContainer('.set-color', `<html data-color="${color}">`);

let theme = storage.action('read', 'theme') || 'dark';
document.querySelector('html').setAttribute('data-theme', theme);
updatePrismContainer('.set-theme', `<html data-theme="${theme}">`);

document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.querySelector('.theme-picker [name="dark_mode"]');
    if (darkModeSwitch) {
        darkModeSwitch.checked = theme === 'dark';
    }
});