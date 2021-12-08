import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            this.belongsTo(models.Client, { foreignKey: 'clientId' });
        }
    }
    Address.init(
        {
            addressLine: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zipCode: {
                type: DataTypes.STRING(5),
                allowNull: false
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'Address',
        }
    );
    return Address;
};
