var Sequelize = require('sequelize');
var loght_model_1 = require('./db-models/loght-model');
function loght(message, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var messageContent = "";
    if (message instanceof Error) {
        messageContent = message.message + '\n' + message.stack;
    }
    else if (typeof message !== 'string') {
        messageContent = JSON.stringify(message);
    }
    else {
        messageContent = message;
    }
    var invokeStack = getInvokeStack();
    loght_model_1.default.create({
        message: messageContent,
        prefix: prefix || '',
        stack: invokeStack,
        created_at: new Date()
    }, null)
        .catch(function (result) {
        console.error('Loght: save log occur error', result);
        return Sequelize.Promise;
    });
    return;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loght;
function getInvokeStack() {
    var reg = /^(?:[^♛]*?\n){3}.*?\((.*?)\)/g;
    var lineNumber = '';
    var matching;
    try {
        throw new Error('Hi, Loght');
    }
    catch (err) {
        matching = reg.exec(err.stack);
    }
    return matching[1] || 'bulalal';
}
//# sourceMappingURL=loght.js.map