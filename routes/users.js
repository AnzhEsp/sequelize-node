const { Router } = require("express");
const { check } = require("express-validator");
const { getUusers, postUsers, deleteUsers } = require("../controllers/users");
const { existEmail } = require("../helpers/exist-email");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getUusers);
router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("apellidos", "El apellidos es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty(),
        check("email").custom(existEmail),
        check("pass", "El pass es obligatorio").not().isEmpty(),
        check("tipo", "El tipo es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    postUsers
);
router.delete("/:id", deleteUsers);
module.exports = router;
