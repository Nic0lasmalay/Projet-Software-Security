const http = require('http')
const httpProxy = require('http-proxy')

const proxy =httpProxy.createProxyServer({});

http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.end();
    let sacAdos = [];
    req.on('data', (morceau) => sacAdos.push(morceau));

    req.on('end', () => {
        const donneesCompletes = Buffer.concat(sacAdos);
        proxy.web(req, res, {target: 'http://localhost:3000',buffer: streamify(donneesCompletes)}, (err) => {
            console.log("On passe sur le port 3001");
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            proxy.web(req, res, {target: 'http://localhost:3001',buffer: streamify(donneesCompletes)}, (err2) => {
                res.writeHead(502);
                res.end("Tous les serveurs sont off.");
            });
        });
    });
}).listen(8080, () => {
    console.log('Load Balancer actif sur http://localhost:8080');
});
function streamify(buffer) {
    const { Readable } = require('stream');
    return Readable.from([buffer]);
}

