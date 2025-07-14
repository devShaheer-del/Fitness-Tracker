const mongoose = require('mongoose');

const url = process.env.DB_URL;




mongoose.connect(url).then(()=> console.log('Database is connected')).catch(e => console.log(e));