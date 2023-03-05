addEventListener('fetch', (event) => event.respondWith(handle(event.request)));

async function handle(request) {
    if (request.url.endsWith('ico'))
        return Response.redirect('https://serein.cc/assets/Serein.ico', 301);

    if (request.url.replace(/\/$/, '') != 'https://online-count.serein.cc')
        return Response.redirect('https://online-count.serein.cc');

    return new Response(
        await (await fetch('https://raw.githubusercontent.com/Zaitonn/Serein-Docs/online_count/index.html')).text(),
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'text/html; charset=utf-8'
            }
        });
}
