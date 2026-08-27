// Posicion BD
const TRAYECTORIA = { "ID": 0, "CURSO": 1, "ALUMNO": 2, "PROFESIONAL": 3, "INASISTENCIA": 4, "JUSTIFICADA": 5, "LLAMADAS": 6, "OBSERVACION": 7, "CARTA": 8, "REGULARIZACION": 9, "OBSERVACIONES": 10 };
//Libro BD_Trayectorias
const BD_ID_TRAYECTORIAS= '1jAN_UwWZ9tWfTGf-AdqxU3lH06S3jCzsoVkkdiLb890'; // Registro trayectorias
const SS_TRAYECTORIAS= SpreadsheetApp.openById(BD_ID_TRAYECTORIAS);
const HOJA_TRAYECTORIAS= SS_TRAYECTORIAS.getSheetByName('Trayectorias');


function crudTrayectoria(trayectoria, accion) {
    let mensaje="";
    if (accion = "new") {
        let id = new Date().getTime();
        HOJA_TRAYECTORIAS.appendRow([
            id,
            trayectoria.listCursos,
            trayectoria.alumnos,
            trayectoria.profesional,
            trayectoria.inasistencias,
            trayectoria.justificadas,
            trayectoria.llamadas,
            trayectoria.llamadasObs,
            trayectoria.carta,
            trayectoria.regularizacion,
            trayectoria.regularizacionObs
        ]);
        mensaje= "¡La atención ha sido guardada!";
    } else if ("update") {
        const fila = buscarFilaTrayectoria(trayectoria.id);
        HOJA_TRAYECTORIAS.getRange(fila, 2, 1, HOJA_TRAYECTORIA.getLastColumn() - 1).setValues([[
            trayectoria.curso,
            trayectoria.alumno,
            trayectoria.profesional,
            trayectoria.inasistencias,
            trayectoria.justificadas,
            trayectoria.llamadas,
            trayectoria.observacion,
            trayectoria.carta,
            trayectoria.regularizacion,
            trayectoria.observaciones

        ]])

        mensaje= "¡La atención ha sido Modificada!";
    }

    return mensaje;
}

function guardarNuevaTrayectoria(form) {
  let id = new Date().getTime();
  let curso = form.curso;
  let alumno = form.alumno;
  let profesional = form.profesional;
  let inasistencias = form.inasistencias;
  let justificadas = form.justificadas;
  let llamadas = form.llamadas;
  let observacionLlamadas = form.observacionLlamadas;
  let carta = form.carta;
  let regularizacion = form.regularizacion;
  let regularizacionObservaciones = form.regularizacionObservaciones;
  HOJA_TRAYECTORIAS.appendRow([id, curso, alumno, profesional, inasistencias, justificadas, llamadas, observacionLlamadas, carta, regularizacion, regularizacionObservaciones]);
  return "¡La atención ha sido guardada!";
}


function guardarEdicionTrayectoria(trayectoria) {


}

function crearNuevoIdTrayectorias() {
    let id = 1;
    if (HOJA_TRAYECTORIA.getLastRow() === 1) {
        return id;
    }
    const ids = HOJA_TRAYECTORIA.getRange(2, 1, HOJA_TRAYECTORIA.getLastRow() - 1, 1).getValues().map(id => id[0]);
    let maxId = 0;
    ids.forEach(id => {
        if (id > maxId) {
            maxId = id;
        }
    });
    return maxId + 1;
}

function borrarTrayectoriaPorId(id) {
    const fila = buscarFila(id);
    if (fila > 1) {
        HOJA_TRAYECTORIA.deleteRow(fila);
        return `La atención N° ${id} ha sido borrada correctamente`;
    } else {
        return `Error al borrar el registro ${id}`;
    }
}

function buscarFilaTrayectoria(idTrayectoria) {
    const ids = HOJA_TRAYECTORIA.getRange(2, 1, HOJA_TRAYECTORIA.getLastRow() - 1, 1).getValues().map(id => id[0]);
    const index = ids.indexOf(Number(idTrayectoria));
    const row = index + 2;
    return row;
}

function buscarTrayectoria(id) {
    let trayectorias = HOJA_TRAYECTORIA.getDataRange().getDisplayValues();
    for (var i in trayectorias) {
        if (trayectorias[i][TRAYECTORIA.ID] === id) {
            var trayectoria = {
                id: id,
                fecha: trayectorias[i][1],
                profesional: trayectorias[i][2],
                perfil: trayectorias[i][3],
                alumno: trayectorias[i][4],
                curso: trayectorias[i][5],
                tipo: trayectorias[i][6],
                estado: trayectorias[i][7],
                apoderado: trayectorias[i][8],
                motivo: trayectorias[i][9],
                detalle: trayectorias[i][10],
                mes: trayectorias[i][11],
                semana: trayectorias[i][12],
                categoria: trayectorias[i][13],
                nivel: trayectorias[i][14]
            };
            return trayectoria;
        }
    }
}

// function getTablaResumenCurso(curso) {
//     let encabezados = ["Lista", "Rut", "Estudiante", "Estado", "Social", "Psicologíca", "Total", "Acciones"];
//     let alumnos = HOJA_ALUMNOS.getDataRange().getDisplayValues();
//     alumnos.shift();
//     let alumnosCurso = alumnos.filter(alumno => alumno[ALUMNO.CURSO] === curso);
//     let trayectoriasAlumnos = HOJA_TRAYECTORIA.getDataRange().getDisplayValues();
//     trayectoriasAlumnos.shift();
//     let trayectoriasCurso = trayectoriasAlumnos.filter(trayectoria => trayectoria[ATENCION.CURSO] === curso);
//     let trayectoriasSociales = trayectoriasCurso.filter(trayectoria => trayectoria[ATENCION.AREA] === "Social");
//     let trayectoriasPsicologicas = trayectoriasCurso.filter(trayectoria => trayectoria[ATENCION.AREA] === "Psicológica");
//     let filtroAlumnos = [];

//     alumnosCurso.forEach(alumno => {
//         let alumnoFiltrado = [];
//         alumnoFiltrado.push(alumno[ALUMNO.LISTA]);
//         alumnoFiltrado.push(alumno[ALUMNO.RUT]);
//         alumnoFiltrado.push(alumno[ALUMNO.NOMBRE]);
//         alumnoFiltrado.push(alumno[ALUMNO.ESTADO]);
//         alumnoFiltrado.push(trayectoriasSociales.filter(trayectoria => trayectoria[ATENCION.ESTUDIANTE] === alumno[ALUMNO.NOMBRE]).length);
//         alumnoFiltrado.push(trayectoriasPsicologicas.filter(trayectoria => trayectoria[ATENCION.ESTUDIANTE] === alumno[ALUMNO.NOMBRE]).length);
//         alumnoFiltrado.push(trayectoriasCurso.filter(trayectoria => trayectoria[ATENCION.ESTUDIANTE] === alumno[ALUMNO.NOMBRE]).length);
//         filtroAlumnos.push(alumnoFiltrado);
//     });

//     return { encabezados, filtroAlumnos };
// }

function getTrayectoria() {
    // if (HOJA_TRAYECTORIAS.getLastRow() <= 1) return [];
    let [headers, ...dataInfo] = HOJA_TRAYECTORIAS.getDataRange().getDisplayValues();
    return { headers, dataInfo };

}
