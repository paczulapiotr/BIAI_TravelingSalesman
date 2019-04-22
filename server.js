const express = require('express');

const app = express();

app.use(express.static('dist'));
app.use('/public', express.static('public'));
// eslint-disable-next-line
app.listen(process.env.PORT || 8080, () => console.log('biai-travelinigsalesman seems ok!'));
