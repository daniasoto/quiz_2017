var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.randomplay){
        req.session.randomplay.resolved=[];
    }
    res.render('index');
});

// Pagina de creditos
router.get('/author', function(req, res, next) {
    if(req.session.randomplay){
        req.session.randomplay.resolved=[];
    }
    res.render('author');
});
// Pagina de ayuda
router.get('/help', function(req, res, next) {
    if(req.session.randomplay){
        req.session.randomplay.resolved=[];
    }
    res.render('help');
});



// Autoload de rutas que usen :quizId
router.param('quizId', quizController.load);


// Definición de rutas de /quizzes
router.get('/quizzes',                     quizController.index);//mostrar lista de recurso
router.get('/quizzes/:quizId(\\d+)',       quizController.show);//mostrar recurso
router.get('/quizzes/new',                 quizController.new);//formulario:crear recurso
router.post('/quizzes',                    quizController.create);//a;adir recurso a BBDD
router.get('/quizzes/:quizId(\\d+)/edit',  quizController.edit);//formulario:editar recurso
router.put('/quizzes/:quizId(\\d+)',       quizController.update);//actualizar recurso en BBDD
router.delete('/quizzes/:quizId(\\d+)',    quizController.destroy);//borrar recurso en BBDD

router.get('/quizzes/:quizId(\\d+)/play',  quizController.play);//mostrar pregunta
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);//comprobar respuesta

//Definicion de rutas de randomplay y randomcheck
router.get('/quizzes/randomplay',quizController.randomplay);
router.get('/quizzes/randomcheck/:quizId(\\d+)', quizController.randomcheck);

module.exports = router;
