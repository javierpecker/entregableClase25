import express, { application } from 'express';
import session from 'express-session'
import path from 'path';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo';
import * as http from 'http';
import config from './config';
import routerRead from './routes/routerProduct';
import routerLogin from './routes/routerLogin';
import { dbConnection } from './models/mensajesDB';
import { initWSServer } from './api/sockets';

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const puerto = 8080;
const server = http.Server(app);

dbConnection.init();
initWSServer(server);

server.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);
server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPath,
    extname: 'hbs',
  })
);

export const publicPath = path.resolve(__dirname, '../public');

console.log(config.MONGO_ATLAS_URL)
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
    mongoOptions: advancedOptions,
    dbName: 'sesiones',
    collectionName: 'sesiones',
    ttl: 60,
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false /* ,
  cookie: {
      maxAge: 40000
  } */,
};


app.use(cookieParser());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session(StoreOptions)
);
app.use('/api', routerRead);
app.use('/', routerLogin);



