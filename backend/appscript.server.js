// Código para el servidor
function doGet() {
  // Verificar si el usuario está autorizado
  const userEmail = Session.getActiveUser().getEmail();
  const emailsAutorizados = HOJA_PROFESIONALES
    .getRange(2, 1, HOJA_PROFESIONALES.getLastRow() - 1, 1)
    .getValues().flat().filter(String);

  if (emailsAutorizados.includes(userEmail)) {
    return HtmlService.createTemplateFromFile('frontend/index')
      .evaluate()
      .setTitle('Sistema Prueba Convivencia');
  } else {
    return HtmlService.createTemplateFromFile('frontend/views/error/error')
      .evaluate()
      .setTitle('Usuario no autorizado');
  }
}
// incluir html
function incluir(archivo) { return HtmlService.createHtmlOutputFromFile(archivo).getContent(); }






