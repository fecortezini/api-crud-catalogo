import { Model, DataTypes } from "sequelize";
import sequelize from "../data/database";

class Content extends Model {
    id: number;
    title: string;
    eps: string;
    genre: string;
    description: string;    
    aired: string;
    duration: string;
    type: string;
    status: string;
    rating: string;
    score: string;
    producer: string;
    studio: string;
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
    aired: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.STRING,
        allowNull:true
    },
    score: {
        type: DataTypes.STRING,
        allowNull: true
    },
    producer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    studio: {
        type: DataTypes.STRING,
        allowNull: true
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
