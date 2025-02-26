const express = require('express');
const { startServer, app } = require('./server/server');
const loginRoute = require('./routes/login')
const userRoutes = require('./routes/user');
const userAdminRoutes = require('./routes/admin');
const votingRoute = require('./routes/voters')
const path = require('path')
const cookieParser = require('cookie-parser')
const { restrictToLoginUserOnly, restrictToAdminOnly } = require('./middleware/auth')


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))



app.use('/', loginRoute)
app.use('/user', restrictToLoginUserOnly, userRoutes);
app.use('/admin', restrictToAdminOnly, userAdminRoutes);
app.use('/voters', votingRoute)

startServer()