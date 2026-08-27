function obtenerNombresPorCurso(cursoSeleccionado) {
    const ALUMNO = { CURSO: 0, NOMBRE: 2 };
    let alumnosCurso = [];
    let alumnos = HOJA_ALUMNOS
        .getRange(2, 2, HOJA_ALUMNOS.getLastRow() - 1, 3)
        .getDisplayValues();
    alumnos.forEach(alumno => {
        if (alumno[ALUMNO.CURSO] === cursoSeleccionado) {
            alumnosCurso.push(alumno[ALUMNO.NOMBRE]);
        }
    });
    return alumnosCurso;
}

function getAtencionesDeAlumno(alumno) {
  let [headers, ...dataInfo] = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  // if (HOJA_ATENCIONES.getLastRow() <= 1) return {headers,};
  let atencionesAlumno = dataInfo.filter(atencion => atencion[ATENCION.ESTUDIANTE] === alumno);
  dataInfo = atencionesAlumno;
  return { alumno, headers, dataInfo };
}

function obtenerAlumnoPorId(id){

}