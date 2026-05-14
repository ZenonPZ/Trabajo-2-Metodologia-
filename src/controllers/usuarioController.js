/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP relacionadas con usuarios
 */

const { sendSuccess, sendError } = require('../handlers/responseHandler');
const usuarioService = require('../services/usuarioService');
const { createUsuarioSchema, updateUsuarioSchema } = require('../validations/usuarioValidation');


const crearUsuario = async (req, res) => {
  try {
    const { error, value } = createUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(res, 'Error en validación de datos',400,error.details.map(err => err.message));
    }

    const usuarioCreado = await usuarioService.crearUsuario(value);

    return sendSuccess(
      res,
      usuarioCreado,
      'Usuario creado exitosamente',
      201
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 'Error al crear usuario', 500);
  }
};


const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosLosUsuarios();

    return sendSuccess(
      res,
      usuarios,
      'Usuarios obtenidos exitosamente'
    );
  } catch (error) {
    return sendError(res, 'Error al obtener usuarios', 500);
  }
};


const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await usuarioService.obtenerUsuarioPorId(Number(id));

    if (!usuario) {
      return sendError(res, 'Usuario no encontrado', 404);
    }

    return sendSuccess(res, usuario,'Usuario obtenido exitosamente');

  } catch (error) {

    return sendError(res, 'Error al obtener usuario', 500);
  }
};


const actualizarUsuario = async (req, res) => {
  try {
    const { error, value } = updateUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(res, 'Error en validación de datos',400,error.details.map(err => err.message));
    }

    const { id } = req.params;


    const usuarioActualizado = await usuarioService.actualizarUsuario(Number(id),value);

    if (!usuarioActualizado) {
      return sendError(res, 'Usuario no encontrado', 404);
    }

    return sendSuccess(res, usuarioActualizado,'Usuario actualizado exitosamente');

  } catch (error) {

    return sendError(res, 'Error al actualizar usuario', 500);
  }
};


const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await usuarioService.eliminarUsuario(Number(id));

    if (!eliminado) {
      return sendError(res, 'Usuario no encontrado', 404);
    }

    return sendSuccess(res,null,'Usuario eliminado exitosamente');

  } catch (error) {

    return sendError(res, 'Error al eliminar usuario', 500);

  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
