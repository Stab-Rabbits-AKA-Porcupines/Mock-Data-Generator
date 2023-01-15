const express = require('express')
const mongoose = require('mongoose')
const app = express()
const apiRouter = require('./routers/apiRouter.js')
const PORT = process.env.PORT || 3000

const MONGO_URI = 'mongodb+srv://user:user@our-mockdata-storage.ghivuab.mongodb.net/?retryWrites=true&w=majority';

// account for incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connection to mongo db
mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(() => console.log('db connection open'))
.catch((err) => console.log('error db connection: ', err))

//route to apiRouter
app.use ('/api', apiRouter)


// handle all unknown routes
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

//global error handler 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  if (err.type === 'redirect') {
    res.redirect(err.url)
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})