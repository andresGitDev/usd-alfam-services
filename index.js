require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const router = require('./routes/router')
const PORT = process.env.PORT || 8085
const app = express();

app.set('port', PORT);

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS (antes del router para que aplique a todas las rutas)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

app.get('/', (req, res) => {
    res.send("API para obtener las cotizaciones de los distintos tipos de dolar y riesgo pais. La documentacion la podes encontrar en https://github.com/andresGitDev/usd-alfam-services")
})

app.use('/', router)

// En Vercel la app se exporta y la plataforma maneja el servidor; en local escucha en un puerto.
if (require.main === module) {
    app.listen(app.get('port'), () => {
        console.log('Server running on port ' + PORT)
    });
}

module.exports = app
