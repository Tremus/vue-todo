const http = require('http');
const db = require('./models');

const PORT = 8081;

const getBody = req =>
    new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => (data += chunk));
        req.on('error', err => reject(err));
        req.on('end', () => resolve(JSON.parse(data)));
    });

const jsonMiddleware = async (req, res) => {
    if (req.headers['content-type'] === 'application/json') {
        req.body = await getBody(req);
    }
    res.json = obj => {
        res.writeHead(res.statusCode || 200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(obj));
        res.end();
    };
};

const handle = async (req, res) => {
    switch (true) {
        case /^\/api\/ping$/.test(req.url):
            res.json({ message: 'pong' });
            break;

        case /^\/api\/tasks$/.test(req.url) && req.method === 'GET':
            const tasks = await db.Task.findAll();
            res.json({ tasks });
            break;

        case /^\/api\/tasks$/.test(req.url) && req.method === 'POST':
            if (req.body) {
                const task = await db.Task.create(req.body);
                res.json({ task });
            }
            res.writeHead(400);
            res.end();
            break;

        case /^\/api\/tasks\/[0-9]+$/.test(req.url) && req.method === 'PATCH':
            var taskId = /^\/api\/tasks\/([0-9]+)$/.exec(req.url)[1];
            if (req.body) {
                const task = await db.Task.findByPk(taskId);
                await task.update(req.body);
                res.writeHead(200);
                res.end();
            }
            res.writeHead(400);
            res.end();
            break;

        case /^\/api\/tasks\/[0-9]+$/.test(req.url) && req.method === 'DELETE':
            var taskId = /^\/api\/tasks\/([0-9]+)$/.exec(req.url)[1];
            const task = await db.Task.findByPk(taskId);
            await task.destroy();
            res.writeHead(200);
            res.end();
            break;

        default:
            res.writeHead(404);
            res.end();
    }
};

http.createServer(async (req, res) => {
    await jsonMiddleware(req, res);

    handle(req, res).catch(err => {
        console.error(err);
        res.writeHead(500);
        res.end();
    });
}).listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});
