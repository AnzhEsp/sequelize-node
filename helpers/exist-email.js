const { User } = require("../models/users");

const existEmail = async (email) => {
    const verifyEmail = await User.findOne({ where: { email: email } });
    if (verifyEmail) {
        throw new Error(`El email ${email} ya existe en la BD`);
    }
};

module.exports = {
    existEmail,
};
