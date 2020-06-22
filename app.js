
const app = require('./server');

const appPort = process.env.PORT || 3002; 

app.listen(appPort, () => console.log('Server started in port', appPort));
