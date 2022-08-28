require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnect');

connectDb();

const PORT = process.env.PORT || 3500;

const app = express();
app.use( logger );
app.use(cors(corsOptions));
app.use(express.urlencoded( { extended: false }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routers/root'));

app.use('/users', require('./routers/api/userRouters'));
app.use('/register', require('./routers/api/registerRouters'));
app.use('/auth', require('./routers/api/authRouters'));

app.all('*', (req,res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "Page not found"})
    } else {
        res.type('txt').send('404. Page not found')
    }   
})

mongoose.connection.once('open', () => {
    console.log('Connected to database')
    app.listen(PORT, () =>console.log(`Server running on port ${PORT}`));
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
    
})

app.use(errorHandler);
