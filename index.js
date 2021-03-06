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
let objForm = {
     listUniveritys: {}
    ,listCity: {}
    ,listCourses: {}
    ,listCoursesSelected: []
}

const init = async () => {
    
    await axios.get(urlUniversitys)
    .then( res => {
        console.log('data ',res.data)
        objForm.listUniveritys  = res.data.filter( uni => uni.enabled ).sort();
        
        objForm.listCourses = objForm.listUniveritys.map( uni => uni.course )
                                                    .filter(function (a) {
                                                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                                                    }, Object.create(null)).sort();
        
        objForm.listCity = objForm.listUniveritys.map( uni => uni.campus.city )
                                                .filter(function (a) {
                                                    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                                                }, Object.create(null)).sort();
    })
}   

init()

app.get('/', (req, res) => {
    res.render('home', {
        objForm
    })
})

app.post('/', (req, res) => {

    if(objForm.listCoursesSelected.length < 3) { 
        if( req.body.courseSelected.length === 1){
            objForm.listCoursesSelected.push(objForm.listUniveritys[ req.body.courseSelected ])
        } else {
            req.body.courseSelected.map( item => {
                objForm.listCoursesSelected.push(objForm.listUniveritys[ item ])
            })
        }
    }
    
    console.log(objForm.listCoursesSelected)

    res.render('home', {
        objForm
    })
})

//Add port and start server
app.listen(port, (err) => {
    if(err)
        console.log('Não foi possivel iniciar o servidor QueroEducação')
    else
        console.log('Servidor rodando...')
})