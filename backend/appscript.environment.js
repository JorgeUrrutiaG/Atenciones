//Libro Atenciones II Semestre
const BD_ID_ATENCIONES = '1EnHvMkiuvSypKHqlS3woOMQJKI2nT0-yQjKLA7hG2dE'; //Atenciones Telefonicas
const SS = SpreadsheetApp.openById(BD_ID_ATENCIONES);
const HOJA_ATENCIONES = SS.getSheetByName('Atenciones');
const ATENCION = {
    ID: 0, FECHA: 1, PROFESIONAL: 2, AREA: 3, ESTUDIANTE: 4, CURSO: 5, TIPO_ATENCION: 6, ESTADO: 7,
    APODERADO: 8, MOTIVO: 9, DETALLE: 10, MES: 11, SEMANA: 12, CATEGORIA: 13, NIVEL: 14};

//Libro BD_CSCJ 
const BD_ID_CSCJ = "1S1troX7CoWJkikzHWnP0vMTHuRm6iQobPnP05lLVUM8"; // Datos Colegio: Profesionales,Alumnos,etc
const SS_CSCJ = SpreadsheetApp.openById(BD_ID_CSCJ);
const HOJA_ALUMNOS = SS_CSCJ.getSheetByName('Alumnos');
const ALUMNO = { RUT: 0, CURSO: 1, LISTA: 2, NOMBRE: 3, ESTADO: 4, NIVEL: 5 };
const HOJA_CURSOS = SS_CSCJ.getSheetByName('Cursos');
const HOJA_TIPOS_ATENCION_CSCJ = SS_CSCJ.getSheetByName('Tipos Atencion');
const HOJA_PROFESIONALES = SS_CSCJ.getSheetByName('Profesionales');
const USUARIO = { correo: 0, nombre: 1, cargo: 2, perfil: 3};
const HOJA_APODERADOS = SS_CSCJ.getSheetByName('Apoderados');
const APODERADO = { estudiante: 0, apoderado1: 1, fono: 3, apoderado2: 6, fono2: 7, apoderado3: 8, fono3: 10, apoderado4: 11, fono4: 13 };




