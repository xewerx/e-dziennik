import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const api = require('./routes/api');
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/api', api)

app.get('/', function(req, res) {
    res.send("Hello");
});

app.listen(PORT, function() {
    console.log('Server is running at port: ' + PORT);
})