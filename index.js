const express    = require('express')
const bodyParser = require('body-parser')
const path       = require('path')

const app  = express()

//Config port by env (local or prod)
const port = process.env.PORT || 3300

//Maps views for views folder
app.set('views', path.join(__dirname, 'views')) 

//Set EJS with view engine
app.set('view engine', 'ejs')

//Map public with default path
app.use(express.static(path.join(__dirname, 'public'))) 
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

//Add port and start server
app.listen(port, (err) => {
    if(err)
        console.log('Não foi possivel iniciar o servidor QueroEducação')
    else
        console.log('Servidor rodando...')
})