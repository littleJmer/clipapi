import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Client extends Model {
        static associate(models) {
            this.hasMany(models.Address, { foreignKey: 'clientId' });
        }
    }
    Client.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Client',
        }
    );
    return Client;
};
