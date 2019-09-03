const express    = require('express')
const bodyParser = require('body-parser')
const path       = require('path')
const axios      = require('axios')

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

const urlUniversitys = 'https://testapi.io/api/redealumni/scholarships'
let listUniveritys = {}
let listCity = {}
let listCursos = {}

const init = () => {
    
    axios.get(urlUniversitys).then( res => {
        
        listUniveritys = res.data

        listCursos = listUniveritys
                    .map( uni => uni.course)
                    
        listCity = listUniveritys
                    .map( uni => uni.campus )
                    /*.filter(( el, i, citys ) => {
                        citys.findIndex( item => item["city"] === el["city"] ) === i 
                    })*/
      
        console.log(listUniveritys)
    })
}

init()

app.get('/', (req, res) => {
    console.log(listUniveritys)
    res.render('home', {
        listUniveritys
        ,listCity
        ,listCursos
    })
})

//Add port and start server
app.listen(port, (err) => {
    if(err)
        console.log('Não foi possivel iniciar o servidor QueroEducação')
    else
        console.log('Servidor rodando...')
})