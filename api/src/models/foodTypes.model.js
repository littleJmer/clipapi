import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class FoodType extends Model {
        static associate(models) {
        }
    }
    FoodType.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'FoodType',
        }
    );
    return FoodType;
};
