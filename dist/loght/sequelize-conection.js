var Sequelize = require('sequelize');
var config = {
    database: 'ts',
    host: '127.0.0.1',
    port: 3306,
    userName: 'root',
    password: '',
};
var sequelize = new Sequelize(config.database, config.userName, config.password, {
    host: config.host,
    dialect: 'mysql',
    port: config.port,
    timezone: '+08:00',
    logging: false,
    pool: {
        maxConnections: 5,
        minConnections: 0,
        maxIdleTime: 10000
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sequelize;
//# sourceMappingURL=sequelize-conection.js.map