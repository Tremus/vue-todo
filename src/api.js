import express from 'express';
import db from './models';

const router = express.Router();
const app = express();

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
});

router.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

router.get('/tasks', async (req, res) => {
    const tasks = await db.Task.findAll();
    res.json({ tasks });
});

router.post('/tasks', async (req, res) => {
    const task = await db.Task.create(req.body);
    res.json({ task });
});

router.get('/tasks/:id', async (req, res) => {
    const task = await db.Task.findByPk(req.params.id);
    res.json({ task });
});

router.patch('/tasks/:id', async (req, res) => {
    const task = await db.Task.findByPk(req.params.id);
    const newtask = await task.update(req.body);
    res.json({ task: newtask });
});

router.delete('/tasks/:id', async (req, res) => {
    const task = await db.Task.findByPk(req.params.id);
    await task.destroy();
    res.writeHead(200);
    res.end();
});

export default {
    path: '/api',
    handler: router,
};
