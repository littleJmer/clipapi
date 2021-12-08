import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            this.belongsTo(models.Order, { foreignKey: 'orderId' });
            this.belongsTo(models.Menu, { foreignKey: 'menuId' });
        }
    }
    OrderItem.init(
        {
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            menuId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            subTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'OrderItem',
        }
    );
    return OrderItem;
};
