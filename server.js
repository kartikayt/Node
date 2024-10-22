const dotenv = require('dotenv');
dotenv.config({ path: './config_dev.env' });
const app = require('./app');
const x = 0;
x = 5;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});
