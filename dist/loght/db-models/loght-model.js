var Sequelize = require('sequelize');
var sequelize_conection_1 = require('../sequelize-conection');
var Model = sequelize_conection_1.default.define('Logs', {
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
    prefix: {
        type: Sequelize.STRING,
        allowNull: true
    },
    stack: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    underscored: true,
    updatedAt: false,
    tableName: 'logs',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
Model.sync();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
//# sourceMappingURL=loght-model.js.map