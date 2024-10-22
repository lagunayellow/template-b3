const express = require('express'),
    app = express(),
    port = 3000;

app.use(express.static('website'));
app.listen(port, init);

function init() {
    console.log(`We are looking the website on ${port}`);
};
