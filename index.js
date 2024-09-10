const express = require('express')
const {averiguarPais} = require('./geolocalizador-nombres/geolocalizar-nombre')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'hbs');
app.set('views', './views');  // Ruta a los archivos .hbs

app.get('/pais-origen', async (req, res) => {
    const nombreUsuario = req.query.nombre;
    const {nombre, bandera} = await averiguarPais(nombreUsuario);
    
    res.render('respuesta', {
      nombre: nombreUsuario,
      paisDeOrigen: nombre,
      bandera,
      esArgentina: nombre == "Argentina"
    });
    //res.send(`${nombre} proviene de ${paisDeOrigen}`);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Servidor activo en puerto ${port}`)
})