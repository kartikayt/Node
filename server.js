const dotenv = require('dotenv');
dotenv.config({ path: './config_dev.env' });
const app = require('./app');

const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB is connected....');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});
