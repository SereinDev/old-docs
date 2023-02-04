setTimeout(() => {
    if (window.location.hash.startsWith('#/Extension')) {
        let url = new URL(window.location.href);
        url.pathname = '/Extension/';
        url.hash = url.hash.replace('Extension/', '');
        setTimeout(() => {
            window.location.href = url.href;
        }, 200);
    }
}, 100);