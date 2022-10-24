var config = {
    db: {
        options: {
            db: {native_parser: true},
            server: {poolSize: 5},
//  replset: { rs_name: 'myReplicaSetName' },
//  user: 'admin',
//  pass: '123456'
        },
        uri: process.env.MONGO_URL || 'mongodb://mongo:27017/vuegustchess'
    },
    porthttp: process.env.WEBSITES_PORT || 3311,
    multicore: false,
    https: true,
    debug: false
}
module.exports = config;
