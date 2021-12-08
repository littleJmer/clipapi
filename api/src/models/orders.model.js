import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models.Client, { foreignKey: 'clientId' });
            this.hasMany(models.OrderItem, { foreignKey: 'orderId' });
        }
    }
    Order.init(
        {
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
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
            total: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );
    return Order;
};
