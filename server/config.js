const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public'),
    database: 'mongodb://localhost/music',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    facebook: {
        appId: '863516967482642',
        appSecret: 'ff9feb758908bb4432719a1ba73ca43f'
    }
};