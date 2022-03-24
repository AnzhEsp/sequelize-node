const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");
};
