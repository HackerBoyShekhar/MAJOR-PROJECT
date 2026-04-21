const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MenuItem = require('./models/MenuItem');

async function checkImages() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        console.log('Connected to MongoDB');

        const items = await MenuItem.find();
        const results = [];
        const publicImagesPath = path.join(__dirname, '../frontend/public/images');

        console.log(`Checking ${items.length} items...`);

        for (const item of items) {
            let status = 'OK';
            let error = '';

            if (!item.image) {
                status = 'MISSING';
            } else if (item.image.startsWith('http')) {
                try {
                    const res = await axios.head(item.image, { timeout: 5000 });
                    if (res.status !== 200) {
                        status = 'BROKEN';
                        error = `HTTP ${res.status}`;
                    }
                } catch (err) {
                    status = 'BROKEN';
                    error = err.message;
                }
            } else if (item.image.startsWith('/images/')) {
                const fileName = item.image.replace('/images/', '');
                const filePath = path.join(publicImagesPath, fileName);
                if (!fs.existsSync(filePath)) {
                    status = 'LOCAL_MISSING';
                    error = `File not found: ${filePath}`;
                }
            } else {
                status = 'INVALID_PATH';
                error = `Unknown path format: ${item.image}`;
            }

            results.push({
                name: item.name,
                image: item.image,
                status,
                error
            });
        }

        console.log('\n--- IMAGE STATUS REPORT ---');
        const broken = results.filter(r => r.status !== 'OK');
        if (broken.length === 0) {
            console.log('All images are VALID! ✅');
        } else {
            console.log(`${broken.length} issues found:`);
            broken.forEach(r => {
                console.log(`- [${r.status}] ${r.name}: ${r.image} (${r.error})`);
            });
        }

        fs.writeFileSync('image_report.json', JSON.stringify(results, null, 2));
        console.log('\nReport saved to image_report.json');

        process.exit(0);
    } catch (err) {
        console.error('Fatal error:', err);
        process.exit(1);
    }
}

checkImages();
