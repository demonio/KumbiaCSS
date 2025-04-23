function updatePrismContainer(selector, code) {
    let container = document.querySelector(selector);
    if (container) {
        container.innerText = code;
        Prism.highlightElement(container);
    }
}