const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.SERVER_DBO, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
// const sequelize = new Sequelize(process.env.SERVER_DB);
sequelize
    .authenticate()
    .then(() => {
        console.log("conexion");
    })
    .catch((error) => {
        console.log(
            "No se logro hacer la conexion con la base de datos",
            error
        );
    });
module.exports = sequelize;
