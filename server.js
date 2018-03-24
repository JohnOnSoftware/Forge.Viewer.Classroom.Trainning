/*

The MIT License (MIT)

Copyright (c) Thu Aug 18 2016 Zhong Wu zhong.wu@autodesk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
///////////////////////////////////////////////////////////
//replace with your suitable topic names 
const  MQTT_TOPIC_TEMPERATURE = 'sensors/temperature/data';
const  MQTT_TOPIC_HUMIDITY = 'sensors/humidity/data';

const  SOCKET_TOPIC_TEMPERATURE = 'Intel-Forge-Temperature';
const  SOCKET_TOPIC_HUMIDITY = 'Intel-Forge-Humidity';

//import neccessary libraries 
var favicon = require('serve-favicon');
var express = require('express');
var app = express();  

//routes
var api = require('./routes/token.js'); 
app.use('/', express.static(__dirname + '/www'));
app.use(favicon(__dirname + '/www/img/favicon.ico'));
app.use('/api', api); 
var server = require('http').Server(app); 

//// Step 1, Uncomment the socketio server creation code.
// //subscribe socket 
// var socketio = require('socket.io')(server);  
// socketio.on('connection', function(socket){
//     console.log('socket on server side is connected');
// }); 
//// Step 1, Uncomment the socketio server creation code.




//// Stpe 2, Uncomment the mqtt subscribe and emit message to socketio
// //subscribe mqtt
// var mqtt = require('mqtt');
// var mqttclient  = mqtt.connect('mqtt://test.mosquitto.org:1883');
// mqttclient.on('connect', function () {

//     console.log('mqtt on server side is connected');

//     //subscribe a topic of mqtt
//     mqttclient.subscribe(MQTT_TOPIC_TEMPERATURE,function(err,granted){
//         console.log(granted);
//         console.log(err);
        
//         mqttclient.on('message', function (topic, message) {
//             // message is Buffer
//             var iotdata = message.toString();
//             console.log('Intel temperature data: ' + iotdata)

//             //broadcast the IoT data to socket
//             socketio.emit(SOCKET_TOPIC_TEMPERATURE , iotdata); 
//             //mqttclient.end()
//           }) 
//      }); 


//     //subscribe a topic of  humidity
//     mqttclient.subscribe(MQTT_TOPIC_HUMIDITY,function(err,granted){
//         console.log(granted);
//         console.log(err);
        
//         mqttclient.on('message', function (topic, message) {
//             // message is Buffer
//             var iotdata = message.toString();
//             console.log('Intel humidity data: ' + iotdata)

//             //broadcast the IoT data to socket
//             socketio.emit(SOCKET_TOPIC_HUMIDITY , iotdata); 
//             //mqttclient.end()
//           }) 
//      });      
// })  
//// Stpe 2, Uncomment the mqtt subscribe and emit message to socketio


app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});