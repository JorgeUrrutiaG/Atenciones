function obtenerCursos() {
  let listaCursos = HOJA_CURSOS.getDataRange().getDisplayValues();
  listaCursos.shift();
  return listaCursos;
}

function getTablaResumenCurso(curso) {
  let encabezados = ["Lista", "Rut", "Estudiante", "Estado", "Social", "Psicologíca", "Total", "Acciones"];
  let alumnos = HOJA_ALUMNOS.getDataRange().getDisplayValues();
  alumnos.shift();
  let alumnosCurso = alumnos.filter(alumno => alumno[ALUMNO.CURSO] === curso);
  let atencionesAlumnos = HOJA_ATENCIONES.getDataRange().getDisplayValues();
  atencionesAlumnos.shift();
  let atencionesCurso = atencionesAlumnos.filter(atencion => atencion[ATENCION.CURSO] === curso);
  let atencionesSociales = atencionesCurso.filter(atencion => atencion[ATENCION.AREA] === "Social");
  let atencionesPsicologicas = atencionesCurso.filter(atencion => atencion[ATENCION.AREA] === "Psicológica");
  let filtroAlumnos = [];

  alumnosCurso.forEach(alumno => {
    let alumnoFiltrado = [];
    alumnoFiltrado.push(alumno[ALUMNO.LISTA]);
    alumnoFiltrado.push(alumno[ALUMNO.RUT]);
    alumnoFiltrado.push(alumno[ALUMNO.NOMBRE]);
    alumnoFiltrado.push(alumno[ALUMNO.ESTADO]);
    alumnoFiltrado.push(atencionesSociales.filter(atencion => atencion[ATENCION.ESTUDIANTE] === alumno[ALUMNO.NOMBRE]).length);
    alumnoFiltrado.push(atencionesPsicologicas.filter(atencion => atencion[ATENCION.ESTUDIANTE] === alumno[ALUMNO.NOMBRE]).length);
    alumnoFiltrado.push(atencionesCurso.filter(atencion => atencion[ATENCION.ESTUDIANTE] === alumno[ALUMNO.NOMBRE]).length);
    filtroAlumnos.push(alumnoFiltrado);
  });

  return { encabezados, filtroAlumnos };
}

