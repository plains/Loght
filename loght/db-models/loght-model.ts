import * as Sequelize from 'sequelize';
import sequelize from '../sequelize-conection';


export interface ModelPOJO {
    id?: number;
    message?: string;
    prefix?: string;
    stack?: string;
    created_at?: Date;
}

export interface ModelInstance
extends Sequelize.Instance<ModelInstance, ModelPOJO>, ModelPOJO { }

var Model = sequelize.define<ModelInstance, ModelPOJO>(
    'Logs', {
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
    }
);

Model.sync();

export default Model;
