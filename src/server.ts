import express from 'express'
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}!`))