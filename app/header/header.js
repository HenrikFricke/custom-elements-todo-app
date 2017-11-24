class HfHeader extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.render();
    }
    
    render() {
        this.shadow.innerHTML = `
            <header class="hf-header">
                <h1 class="hf-header__headline">${this.textContent}</h1>
            </header>
            <link rel="stylesheet" href="header/header.css">
        `;
    }
}

window.customElements.define('hf-header', HfHeader);