import * as Bowser from "bowser";

(() => {
    const $viewport = document.querySelector('[data-js-viewport]');
    const $resolution = document.querySelector('[data-js-resolution]');
    const $ppi = document.querySelector('[data-js-ppi]');
    const $platform = document.querySelector('[data-js-platform]');
    const $browser = document.querySelector('[data-js-browser]');

    const calcProps = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const ppi = window.devicePixelRatio;
        const viewportSize = `${width} × ${height}`;
        const resolution = `${(width * ppi)} × ${(height * ppi)}`;

        $viewport.innerHTML = viewportSize;
        $resolution.innerHTML = resolution;
        $ppi.innerHTML = ppi;

        const browser = Bowser.getParser(window.navigator.userAgent);
        $browser.innerHTML = `${browser.parsedResult.browser.name} ${browser.parsedResult.browser.version}`;
        $platform.innerHTML = browser.parsedResult.os.name;
    };

    window.addEventListener('resize', () => {
        calcProps();
    });

    calcProps();
})();