const jwt = require("jsonwebtoken");

const generarJWT = (id = "", login = "", nombre = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id, login, nombre };
        jwt.sign(
            payload,
            process.env.PRIVATEKEY,
            { expiresIn: "24h" },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject("no se pudo generar el json JWT");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generarJWT,
};
