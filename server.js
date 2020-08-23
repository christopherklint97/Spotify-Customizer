const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors');
require('dotenv').config();

app.use(cors());
app.listen(port, () => console.log('Backend server live on ' + port));

app.get('/', (req, res) => {
    res.send({ message: 'We did it!' });
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
});