/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para gestionar usuarios
 */

const db = require('../config/db');
const Usuario = require('../entities/Usuario');

const usuarioRepository = db.getRepository(Usuario);

/**
 * Crear un nuevo usuario
 * @param {Object} datosUsuario - { nombre, apellido, email, edad }
 * @returns {Object} El usuario creado
 */
const crearUsuario = async (datosUsuario) => {
  const nuevoUsuario = usuarioRepository.create(datosUsuario);
  return await usuarioRepository.save(nuevoUsuario);
};

/**
 * Obtener todos los usuarios
 * @returns {Array} Array de todos los usuarios
 */
const obtenerTodosLosUsuarios = async () => {
  return await usuarioRepository.find();
};

/**
 * Obtener un usuario por ID
 * @param {Number} id 
 * @returns {Object|null}
 */
const obtenerUsuarioPorId = async (id) => {
  return await usuarioRepository.findOneBy({ id });
};

/**
 * Actualizar un usuario existente
 * @param {Number} id
 * @param {Object} datosActualizados
 * @returns {Object|null}
 */
const actualizarUsuario = async (id, datosActualizados) => {
  const usuarioExistente = await obtenerUsuarioPorId(id);

  if (!usuarioExistente) {
    return null;
  }

  await usuarioRepository.update(id, datosActualizados);

  return await obtenerUsuarioPorId(id);
};

/**
 * Eliminar un usuario
 * @param {Number} id
 * @returns {boolean}
 */
const eliminarUsuario = async (id) => {
  const result = await usuarioRepository.delete(id);

  return result.affected > 0;
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
