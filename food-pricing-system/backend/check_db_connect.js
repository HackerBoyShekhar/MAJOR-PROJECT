const mongoose = require('mongoose');
require('dotenv').config();

async function checkDB() {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db';
        await mongoose.connect(uri);
        console.log('Connected to:', uri);
        
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections in', db.databaseName, ':');
        collections.forEach(c => console.log(' -', c.name));
        
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('Available Databases:');
        dbs.databases.forEach(d => console.log(' -', d.name));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDB();
