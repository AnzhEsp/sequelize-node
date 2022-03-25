const { request } = require("express");
const { response } = require("express");
const { User } = require("../models/users");
const bcrypt = require("bcryptjs");

// ! OBTENER TODOS LOS USUARIOS
const getUusers = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    try {
        const [users, total] = await Promise.all([
            User.findAll({
                offset: desde,
                limit: limite,
                attributes: ["nombre", "apellidos", "email", "pass", "tipo"],
            }),
            User.count(),
        ]);
        if (total === 0) {
            res.status(200).json({ data: "No hay datos" });
        }
        res.status(200).json({ data: { users, total } });
    } catch (error) {
        res.json("No hay data");
    }
};

// ! CREAR USUARIOS
const postUsers = async (req = request, res = response) => {
    const { nombre, apellidos, email, pass, tipo } = await req.body;

    const data = await User.create({
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        pass: pass,
        tipo: tipo,
    });
    let salt = bcrypt.genSaltSync();
    data.pass = bcrypt.hashSync(pass, salt);
    // *PARA GUARDAR LA DATA MODIFICADA
    await data.save();
    res.json(data);
};

// ! ELIMINAR USUARIOS
const deleteUsers = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = await User.destroy({ where: { idusuaio: id } });
    res.status(200).json({ data: usuario });
};
module.exports = {
    getUusers,
    postUsers,
    deleteUsers,
};
