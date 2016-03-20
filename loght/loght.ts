import * as Sequelize from 'sequelize';
import { default as LoghtModel, ModelPOJO as LoghtModelPOJO, ModelInstance as LoghtModelInstance} from './db-models/loght-model';

function loght (message: string|Error|Object, prefix = ''): void {
    var messageContent = ""; 
    
    if (message instanceof Error) {
        messageContent = message.message + '\n' + message.stack;
    } else if (typeof message !== 'string') {
        messageContent = JSON.stringify(message);
    } else {
        messageContent = message;
    }
    
    var invokeStack = getInvokeStack();
    
    LoghtModel.create({
        message: messageContent,
        prefix: prefix || '',
        stack: invokeStack,
        created_at: new Date()
    }, null)
    .catch((result) => {
        console.error('Loght: save log occur error', result);
        return Sequelize.Promise;
    });
    
    return ;
}

export default loght;

/**
 * 获取Loght调用的位置
 */
function getInvokeStack () {
    var reg = /^(?:[^♛]*?\n){3}.*?\((.*?)\)/g;
    var lineNumber = '';
    var matching: string[];
    try {
        throw new Error('Hi, Loght');
    } catch (err) {
        matching = reg.exec(err.stack);
    }
    
    return matching[1] || 'bulalal';
}
