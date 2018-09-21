const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use('/wiki', wikiRouter);


app.get("/", (req, res) =>  {
  res.send('');
})

const PORT = 3000;

const init = async () =>  {
  await models.db.sync({force: true})
  // await models.User.sync()
  // await models.Page.sync()
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();


