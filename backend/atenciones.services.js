//Obtener Atenciones Por Area y categoria
function getFiltroAtenciones(area, categoria) {
  if (HOJA_ATENCIONES.getLastRow() <= 1) return [];
  let [headers, ...dataInfo] = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  if (area === 'Todas' && categoria != "Todas") {
    if (categoria === "Mis Atenciones") {
      let usuario = getDataUser();
      let atencionesUsuario = dataInfo.filter(atencion => atencion[ATENCION.PROFESIONAL] === usuario.nombre);
      dataInfo = atencionesUsuario;
    } else {
      let filtroAtenciones = dataInfo.filter(atencion => atencion[ATENCION.CATEGORIA] === categoria);
      dataInfo = filtroAtenciones;
    }
  }
  return { headers, dataInfo, categoria };
}
// Obtener Atenciones por Profesional
function obtenerAtencionesPorProfesional(profesional) {
  if (HOJA_ATENCIONES.getLastRow() <= 1) return [];
  let [headers, ...dataInfo] = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  dataInfo = dataInfo.filter(atencion => atencion[ATENCION.PROFESIONAL] === profesional);
  return { headers, dataInfo };
}

//Obtener Lista de Nombres de Profesionales
function getListProfesionals() {
  let profesionales = getDataProfesionals();
  let filtrarProfesionales = [];
  profesionales.forEach((row) => {
    if (row[USUARIO.departamento] === "Convivencia") {
      filtrarProfesionales.push(row[USUARIO.nombre]);
    }
  });
  return filtrarProfesionales;

}

function getDataProfesionals() {
  let profesionales = HOJA_PROFESIONALES.getDataRange().getDisplayValues();
  profesionales.shift();
  return profesionales;
}

function guardarNuevaAtencion(form) {
  const id = crearNuevoIdAtenciones();
  const fecha = form.fecha;
  const profesional = form.profesional;
  const perfil = form.perfil;
  const alumno = form.alumnos;
  const curso = form.cursos;
  const tipo = form.tipos;
  const estado = (tipo === "Telefónica" || tipo === "Visitas") ? form.estados : "Realizada";
  const apoderado = form.apoderado;
  const motivo = form.motivo;
  const detalle = form.detalle;
  const mes = form.mes;
  const semana = form.semana;
  const categoria = form.categoria;
  const nivel = form.nivel;
  HOJA_ATENCIONES.appendRow([id, fecha, profesional, perfil, alumno, curso, tipo, estado, apoderado, motivo, detalle, mes, semana, categoria, nivel]);
  return "¡La atención ha sido guardada!";
}

function guardarAtencionEditada(atencion) {
  console.log(atencion);
  const fila = buscarFila(atencion.id);
  (atencion.estado === null) ? atencion.estado = "Realizada" : atencion.estado;

  HOJA_ATENCIONES.getRange(fila, 2, 1, HOJA_ATENCIONES.getLastColumn() - 1).setValues([[
    atencion.fecha,
    atencion.profesional,
    atencion.perfil,
    atencion.alumnos,
    atencion.cursos,
    atencion.tipos,
    atencion.estados,
    atencion.apoderado,
    atencion.motivo,
    atencion.detalle,
    atencion.mes,
    atencion.semana,
    atencion.categoria,
    atencion.nivel

  ]])

  return "¡La atención ha sido Modificada!";

}

function crearNuevoIdAtenciones() {
  let id = 1;
  if (HOJA_ATENCIONES.getLastRow() === 1) {
    return id;
  }
  const ids = HOJA_ATENCIONES.getRange(2, 1, HOJA_ATENCIONES.getLastRow() - 1, 1).getValues().map(id => id[0]);
  let maxId = 0;
  ids.forEach(id => {
    if (id > maxId) {
      maxId = id;
    }
  });
  return maxId + 1;
}

function borrarAtencionPorId(id) {
  const fila = buscarFila(id);
  if (fila > 1) {
    HOJA_ATENCIONES.deleteRow(fila);
    return `La atención N° ${id} ha sido borrada correctamente`;
  } else {
    return `Error al borrar el registro ${id}`;
  }
}

function buscarFila(idAtencion) {
  const ids = HOJA_ATENCIONES.getRange(2, 1, HOJA_ATENCIONES.getLastRow() - 1, 1).getValues().map(id => id[0]);
  const index = ids.indexOf(Number(idAtencion));
  const row = index + 2;
  return row;
}

function buscarAtencion(id) {
  let atenciones = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  for (var i in atenciones) {
    if (atenciones[i][ATENCION.ID] === id) {
      var atencion = {
        id: id,
        fecha: atenciones[i][1],
        profesional: atenciones[i][2],
        perfil: atenciones[i][3],
        alumno: atenciones[i][4],
        curso: atenciones[i][5],
        tipo: atenciones[i][6],
        estado: atenciones[i][7],
        apoderado: atenciones[i][8],
        motivo: atenciones[i][9],
        detalle: atenciones[i][10],
        mes: atenciones[i][11],
        semana: atenciones[i][12],
        categoria: atenciones[i][13],
        nivel: atenciones[i][14]
      };
      return atencion;
    }
  }
}

function getListaTiposDeAtencion(area, categoria) {
  let COL = { ID: 0, NOMBRE: 1, AREA: 2, CATEGORIA: 3 };
  let listaTipos = [];
  let tipos = HOJA_TIPOS_ATENCION_CSCJ.getDataRange().getDisplayValues();
  tipos.shift();
  let filtroTiposPorArea = tipos.filter(tipo => tipo[COL.AREA] === area);
  let filtroTiposPorCategoria = filtroTiposPorArea.filter(tipo => tipo[COL.CATEGORIA] === categoria);
  listaTipos = filtroTiposPorCategoria;
  console.log(listaTipos);
  return listaTipos;
}

function getResumenPorTipoAtencion(area) {
  const AREA = 2;
  let resumen = [];
  let [headers, ...dataInfo] = HOJA_TIPOS_ATENCION
    .getRange(1, 1, HOJA_TIPOS_ATENCION.getLastRow(), 11)
    .getDisplayValues();
  if (area) {
    dataInfo.forEach((atencion) => {
      if (atencion[AREA] === area) resumen.push(atencion);
    });
    dataInfo = resumen;
  }
  return { area, headers, dataInfo };

}

function getConteoPorTipoAtencion(area) {
  let headers = ['#', 'Tipo', 'Séptimo', 'Octavo', 'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Total'];
  let tiposDeAtencion = HOJA_TIPOS_ATENCION_CSCJ.getDataRange().getDisplayValues();
  let atenciones = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  atenciones.shift();
  tiposDeAtencion.shift();
  let dataInfo = [];
  let filtroPerfil = atenciones.filter(atencion => atencion[ATENCION.AREA] === area);
  let filtroTiposDeAtencion = tiposDeAtencion.filter(tipoDeAtencion => tipoDeAtencion[2] === area);
  let filaTotales = [0, 'Total', 0, 0, 0, 0, 0, 0, 0];
  filtroTiposDeAtencion.forEach(tipoDeAtencion => {
    let tipo = [];
    tipo.push(tipoDeAtencion[0]);
    tipo.push(tipoDeAtencion[1]);
    tipo.push(filtroPerfil.filter(atencion => atencion[ATENCION.TIPO_ATENCION] === tipoDeAtencion[1] && atencion[ATENCION.NIVEL] === 'Séptimo').length);
    tipo.push(filtroPerfil.filter(atencion => atencion[ATENCION.TIPO_ATENCION] === tipoDeAtencion[1] && atencion[ATENCION.NIVEL] === 'Primero').length);
    tipo.push(filtroPerfil.filter(atencion => atencion[ATENCION.TIPO_ATENCION] === tipoDeAtencion[1] && atencion[ATENCION.NIVEL] === 'Segundo').length);
    tipo.push(filtroPerfil.filter(atencion => atencion[ATENCION.TIPO_ATENCION] === tipoDeAtencion[1] && atencion[ATENCION.NIVEL] === 'Tercero').length);
    tipo.push(filtroPerfil.filter(atencion => atencion[ATENCION.TIPO_ATENCION] === tipoDeAtencion[1] && atencion[ATENCION.NIVEL] === 'Octavo').length);
    tipo.push(filtroPerfil.filter(atencion => atencion[ATENCION.TIPO_ATENCION] === tipoDeAtencion[1] && atencion[ATENCION.NIVEL] === 'Cuarto').length);
    tipo.push(tipo[2] + tipo[3] + tipo[4] + tipo[5] + tipo[6] + tipo[7]);
    filaTotales[0] = tipo[0] + 1;
    filaTotales[2] += tipo[2];
    filaTotales[3] += tipo[3];
    filaTotales[4] += tipo[4];
    filaTotales[5] += tipo[5];
    filaTotales[6] += tipo[6];
    filaTotales[7] += tipo[7];
    filaTotales[8] += tipo[8];
    dataInfo.push(tipo);
  });
  dataInfo.push(filaTotales);
  return { headers, dataInfo, area };

}

// Obtener Conteo de Atenciones por semana por mes del usuario
function getMiConsolidado(mes) {
  let headers = ['#', 'Tipo', 'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Total'];
  const usuario = getDataUser();
  let atenciones = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  let tiposDeAtencion = HOJA_TIPOS_ATENCION_CSCJ.getDataRange().getDisplayValues();
  atenciones.shift();
  tiposDeAtencion.shift();
  let dataInfo = [];
  let atencionesUsuario = atenciones.filter(atencion => atencion[ATENCION.PROFESIONAL] === usuario.nombre && atencion[ATENCION.AREA] === usuario.perfil && atencion[ATENCION.MES] === mes);
  let filtroTiposDeAtencion = tiposDeAtencion.filter(tipoDeAtencion => tipoDeAtencion[2] === usuario.perfil);
  let filaTotales = [0, 'Total', 0, 0, 0, 0, 0, 0];
  filtroTiposDeAtencion.forEach(tipoDeAtencion => {
    let tipo = [];
    tipo.push(tipoDeAtencion[0]);
    tipo.push(tipoDeAtencion[1]);
    tipo.push(atencionesUsuario.filter(atencion => atencion[6] === tipoDeAtencion[1] && atencion[12] === 'Semana 1').length);
    tipo.push(atencionesUsuario.filter(atencion => atencion[6] === tipoDeAtencion[1] && atencion[12] === 'Semana 2').length);
    tipo.push(atencionesUsuario.filter(atencion => atencion[6] === tipoDeAtencion[1] && atencion[12] === 'Semana 3').length);
    tipo.push(atencionesUsuario.filter(atencion => atencion[6] === tipoDeAtencion[1] && atencion[12] === 'Semana 4').length);
    tipo.push(atencionesUsuario.filter(atencion => atencion[6] === tipoDeAtencion[1] && atencion[12] === 'Semana 5').length);
    tipo.push(tipo[2] + tipo[3] + tipo[4] + tipo[5] + tipo[6]);
    filaTotales[0] = tipo[0] + 1;
    filaTotales[2] += tipo[2];
    filaTotales[3] += tipo[3];
    filaTotales[4] += tipo[4];
    filaTotales[5] += tipo[5];
    filaTotales[6] += tipo[6];
    filaTotales[7] += tipo[7];
    dataInfo.push(tipo);
  });
  dataInfo.push(filaTotales);
  return { headers, dataInfo };

}

