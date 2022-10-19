import express from "express";
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import routes from './routes/index.routes.js';
import morgan from 'morgan';


const app = express();
app.set('port', PORT);
app.use(bodyParser.json())
app.use(morgan('dev'))

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `*`);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use("/", routes);

export default app;

