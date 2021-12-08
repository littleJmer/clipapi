import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Menu extends Model {
        static associate(models) {
            this.belongsTo(models.FoodType, { foreignKey: 'foodTypeId' });
        }
    }
    Menu.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            foodTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 50,
                allowNull: false,
            },
            available: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            sequelize,
            modelName: 'Menu',
        }
    );
    return Menu;
};
