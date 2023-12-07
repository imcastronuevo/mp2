const mongoose = require('mongoose');
// const mongoURI = process.env.MONGO_URI;

const mongoURI = "mongodb+srv://vercel-admin-user-6571a0bccd87993af35d9e36:28Rms96BerxTtczv@cluster0.vtj4bqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function connectToDatabase() {
    const mongooseOptions = {
        ...(parseInt(mongoose.version.split('.')[0], 10) < 4 && {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
    };

    mongoose.connect(mongoURI, mongooseOptions);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB Atlas');
    });

    return db;
}

module.exports = connectToDatabase;
