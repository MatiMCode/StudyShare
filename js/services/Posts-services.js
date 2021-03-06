import config from './db.js'
import sql from 'mssql'

class PostService{
    getAll = async () => {
        let returnEntity = null;
        console.log('debug en getAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("select Usuario.nombre, P.*, Materia.Nombre as Materia, Materia.ColorCode as Color from Posts P inner join Usuario on P.idUsuario = Usuario.ID inner join Materia on P.IdMateria = Materia.ID");
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0][0]
    }

    get5MoreRecent = async () => {
        let returnEntity = null;
        console.log('debug en getAll IVAN')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("select Usuario.nombre, P.*, Materia.Nombre as Materia, Materia.ColorCode as Color from Posts P inner join Usuario on P.idUsuario = Usuario.ID inner join Materia on P.IdMateria = Materia.ID");
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]
    }

    getByTitleTop5 = async (TituloABuscar) => {  //not funcar
        let returnEntity = null;
        console.log('debug en getAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pTAB', sql.NVarChar, TituloABuscar)
            .query("select * from Posts where titulo like '%@pTAB%' order by Puntuacion desc"); // fix this
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]
    }

    getById = async (IDs) => {
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select Usuario.nombre, P.* from Posts P inner join Usuario on P.idUsuario = Usuario.ID where P.ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0][0]
    }

    getEtiquetasByPostId = async (IDs) => {  // ask next class
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select etiquetas.nombre from Posts inner join EtiquetasPorPost on Posts.ID = EtiquetasPorPost.IdPost inner join etiquetas on EtiquetasPorPost.IdEtiqueta = etiquetas.ID where Posts.ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0][0]
    }

    getComenatiosByPostId = async (IDs) => {  // ask next class
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select c.Texto, Posts.ID from Comentario C INNER JOIN Posts ON C.IdPost = Posts.ID where Posts.ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0][0]
    }

    insert = async (idUsuario,tipo, titulo, descripcion, Puntuacion,linkArchivo,idMateria) => {
        let rowsAffected = 0;
        console.log('debug en insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('ptipo', sql.Bit, tipo)
                .input('ptitulo', sql.NVarChar, titulo)
              .input('pdescripcion', sql.NVarChar, descripcion)
              .input('ppuntuacion', sql.Int, Puntuacion)
              .input('pidUsuario', sql.Int, idUsuario)
              .input('plink', sql.NVarChar, linkArchivo)
              .input('pidMateria', sql.Int, idMateria)
             .query("INSERT INTO Posts (idUsuario,tipo, titulo, descripcion, Puntuacion,linkArchivo,IdMateria) VALUES (@pidUsuario,@ptipo, @ptitulo, @pdescripcion, @ppuntuacion,@plink,@pidMateria)");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

    //hacer el d update
    updateNombre = async (ID, NewNombre) => {
        let rowsAffected = 0;
        console.log('debug en updateNombre')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .input('pNewNombre', sql.NVarChar, NewNombre)
                    .query("UPDATE Posts SET titulo = @pNewNombre  where ID = @pId");
                    
                 rowsAffected = result.rowsAffected; 
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    
    }

    deleteById = async (ID) => {
        let rowsAffected = 0;
        console.log('debug en borrar por id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .query("DELETE FROM Posts where ID = @pId");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

}



export default PostService