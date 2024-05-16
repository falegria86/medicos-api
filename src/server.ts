import express from 'express'
import routes from './routes';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}!`))