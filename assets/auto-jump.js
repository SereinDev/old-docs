(function () {
    var check = () => {
        if (window.location.hash.startsWith('#/Extension')) {
            let url = new URL(window.location.href);
            url.pathname = '/Extension/';
            url.hash = url.hash.replace('/Extension', '');
            window.location.href = url.href;
        }
    },
        auto_jump = function (hook, vm) {
            hook.mounted(check);
            hook.inited(check);
        };

    $docsify = $docsify || {};
    $docsify.plugins = [].concat(auto_jump, $docsify.plugins || []);
})();