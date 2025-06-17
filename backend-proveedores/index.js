const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const proveedoresRoutes = require('./routes/proveedores');

const app = express();

// Permitir peticiones desde cualquier origen (por ejemplo, React)
app.use(cors());

// Interpretar cuerpos JSON en las peticiones
app.use(bodyParser.json());
app.use(express.json());    //No funcionó en Postman sin esta parte, permite envio de datos en formato json

// Usar las rutas definidas en routes/proveedores.js
app.use('/api/proveedores', proveedoresRoutes);

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
