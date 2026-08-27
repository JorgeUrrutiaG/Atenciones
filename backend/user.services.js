//Obtener datos de usuario
// function getDataUser() {
//   const userEmail = Session.getActiveUser().getEmail();
//   const profesionales = getDataProfesionals();
//   const user = profesionales.find(prof => prof[USUARIO.correo] === userEmail);
//   let usuario = {
//     email: user[USUARIO.correo],
//     nombre: user[USUARIO.nombre],
//     cargo: user[USUARIO.cargo],
//     perfil: user[USUARIO.perfil],
//   };
//   return usuario;
// }

function obtenerUsuarioLogueado() {
  const email = Session.getActiveUser().getEmail();
  const usuarios = getDataProfesionals();
  const usuarioEncontrado = usuarios.find(u => u[USUARIO.correo] === email);
  console.log(usuarioEncontrado);
  return {
    email: email,
    nombre: usuarioEncontrado ? usuarioEncontrado[ USUARIO.nombre] : "Usuario Externo",
    cargo: usuarioEncontrado[USUARIO.cargo],
    perfil: usuarioEncontrado[USUARIO.perfil]
  };
}