const mongoose = require('mongoose');
const database = 'chatapp';

mongoose.connect(`mongodb://localhost/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Established a connection to the database'))
.catch((err) => console.log('Something went wrong when connection to the database', err));

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose error: ${err}`);
  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});