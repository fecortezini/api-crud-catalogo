import { Model, DataTypes } from "sequelize";
import sequelize from "../data/database";

class Content extends Model {
    id: number;
    title: string;
    eps: string;
    genre: string;
    description: string;
    poster: any;
}

Content.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eps: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'content',
    timestamps: false
})

export default Content;
