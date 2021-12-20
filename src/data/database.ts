import { Sequelize } from "sequelize";

const sequelize = new Sequelize('data-db', 'user', 'pass',
{
    dialect: 'sqlite',
    storage: './src/data/database.sqlite'
})

export default sequelize;