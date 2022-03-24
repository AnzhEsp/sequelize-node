const bcryp = require("bcrypt");
const { User } = require("../models/users");
const { generarJWT } = require("../helpers/generar-jwt");
const { request } = require("express");
const { response } = require("express");

const login = async (req = request, res = response) => {
    const { email, pass } = req.body;
    try {
        const usuario = await User.findOne({ where: { email: email } });
        if (!usuario) {
            return res.status(400).json({
                msg: "Error in the pass or email",
            });
        }
        const token = await generarJWT(
            usuario.idusuaio,
            "true",
            usuario.nombre
        );

        const validarPass = bcryp.compareSync(pass, usuario.pass);
        if (!validarPass) {
            return res.status(400).json({
                msg: "Error in the pass or email-pass",
            });
        }

        res.json({ usuario, token });
    } catch (error) {
        res.json("no tuvo exito");
    }
};

module.exports = {
    login,
};
