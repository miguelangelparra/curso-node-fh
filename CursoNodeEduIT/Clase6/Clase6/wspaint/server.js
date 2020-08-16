'use strict';

const express = require('express')

const app = express()
const http = require('http').Server(app)
var io = require('socket.io')(http)

var fs = require('fs');

var PORT = process.env.app_port || process.env.PORT || 8080;

app.use(express.static('public'))

app.get('/reset', (req,res) => {
    for (var i = 0; i < 1280; i++)
    {
        PersistentRectangleMap[i] = new Array(1280);
    }

    var ListToSend = []
    for (var x = 0; x < PersistentRectangleMap.length; x++) {
        for (var y = 0; y < PersistentRectangleMap[x].length; y++) {
            var r = PersistentRectangleMap[x][y];
            if (r != null) {
                ListToSend.push(r);
            }
       }
    }
    io.sockets.emit('rectlistdata', ListToSend);
    res.send('Reset ok')
})

const server = http.listen(PORT, err => {
    if(err) throw Error(`Servidor error: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

var MaxRects = 100;
var PersistentRectangleMap = new Array(1280);
var CurrentColor = 1; //black=1 blue=2 red=3 green=4
function GetCurrentColor()
{
    switch(CurrentColor) {
        case 1:
            return {
                r:0,
                g:0,
                b:0
            };
        case 2:
            return {
                r:0,
                g:0,
                b:255
            };
        case 3:
            return {
                r:255,
                g:0,
                b:0
            };
        case 4:
            return {
                r:0,
                g:255,
                b:0
            };
    }
}

function Shape(_x, _y, _w, _h, _r, _g, _b)
{
    return {
        x: _x,
        y: _y,
        w: _w,
        h: _h,
        r: _r,
        g: _g,
        b: _b
    }
}

for (var i = 0; i < 1280; i++)
{
    PersistentRectangleMap[i] = new Array(1280);
}

io.sockets.on('connection', function (socket) {
    var thisClientIP = socket.handshake.address;
    socket.emit('color', CurrentColor);
    socket.emit('address', thisClientIP);

    socket.on('blackChk', function (data) {
        if (data == 1) CurrentColor = 1;
        socket.emit('color', CurrentColor); //Send to Client 
        socket.broadcast.emit('color', CurrentColor); //Alert the other clients of the change
    });
    socket.on('blueChk', function (data) {
        if (data == 1) CurrentColor = 2;
        socket.emit('color', CurrentColor); //Send to Client
        socket.broadcast.emit('color', CurrentColor); //Alert the other clients of the change
    });
    socket.on('redChk', function (data) {
        if (data == 1) CurrentColor = 3;
        socket.emit('color', CurrentColor); //Send to Client
        socket.broadcast.emit('color', CurrentColor); //Alert the other clients of the change
    });
    socket.on('greenChk', function (data) {
        if (data == 1) CurrentColor = 4;
        socket.emit('color', CurrentColor); //Send to Client
        socket.broadcast.emit('color', CurrentColor); //Alert the other clients of the change
    });
    socket.on('info', function (data) {
        console.log(data);
        socket.broadcast.emit('info', data);
    })

    socket.on('refresh', function (data)
    {
        if (data == 'rectlist') {
            var ListToSend = []
            for (var x = 0; x < PersistentRectangleMap.length; x++) {
                for (var y = 0; y < PersistentRectangleMap[x].length; y++) {
                    var r = PersistentRectangleMap[x][y];
                    if (r != null) {
                        ListToSend.push(r);
                    }
               }
            }
            socket.emit('rectlistdata', ListToSend);
        }
    })
    var Size = 4;
    socket.on('rect', function (data) {
        //console.log(data);
        var c = GetCurrentColor();       
        data.x = (Math.trunc(data.x/Size)*Size);
        data.y = (Math.trunc(data.y / Size) * Size);
        var shape = new Shape(data.x, data.y, Size, Size, c.r, c.g, c.b);
        PersistentRectangleMap[data.x][data.y] = shape;

        socket.emit('rect', shape);
        socket.broadcast.emit('rect', shape);        
    })
});
