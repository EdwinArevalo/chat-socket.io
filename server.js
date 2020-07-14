const express =require('express');
const user = require('./models/user');
const app = express();

http = require('http').Server(app);
io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000)
.set('view engine','jade');

app.use('/static', express.static('public'))
.get('/', (req, res) => {
    res.render('main');
});
 
io.on('connection', (socket)=> {
    console.log('Usuario conectado');
    socket.on('crear', (data)=> {
        user.create(data, (rpta)=> {
            io.emit('nuevo', rpta);
        });
    });
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    user.show(function(data){
        socket.emit('listar',data);
    });
});

http.listen(app.get('port'), ()=> {
    console.log('Server on port ', app.get('port'));
});