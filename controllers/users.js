const { request } = require('express')
const { response } = require('express')
const { User } = require('../models/users')
const bcrypt = require('bcryptjs')

// ! OBTENER TODOS LOS USUARIOS
const getUusers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  try {
    const [users, total] = await Promise.all([
      User.findAll({
        offset: desde,
        limit: limite,
        attributes: ['nombre', 'apellidos', 'email', 'pass', 'tipo']
      }),
      User.count()
    ])
    if (total === 0) throw new Error()

    res.status(200).json({ data: { users, total } })
  } catch (error) {
    res.status(400).json('No hay data')
  }
}

// ! CREAR USUARIOS
const postUsers = async (req = request, res = response) => {
  const { nombre, apellidos, email, pass, tipo } = await req.body
  try {
    const data = await User.create({
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      pass: pass,
      tipo: tipo
    })
    const salt = bcrypt.genSaltSync()
    data.pass = bcrypt.hashSync(pass, salt)
    // *PARA GUARDAR LA DATA MODIFICADA
    await data.save()
    res.json(data)
  } catch (error) {
    res.status(400).json(
      'No se pudo registrar el usuario/ Hable con el administrador'
    )
  }
}

// ! ELIMINAR USUARIOS
const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params
  const one = await User.findByPk(id)
  if (!one) {
    return res
      .status(400)
      .json({ msg: `El usuario con el id:${id} no existe` })
  }
  await User.destroy({ where: { id: id } })
  res.status(200).json({ msg: `El usuario con id:${id} a sido eliminado` })
}
module.exports = {
  getUusers,
  postUsers,
  deleteUsers
}
