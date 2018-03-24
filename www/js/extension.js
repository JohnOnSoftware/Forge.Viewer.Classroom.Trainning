AutodeskNamespace('Viewing.ClassroomTrainning');

var _viewer;
var _data;
var _options;
var _googleChart;

var _temperatureTimeSeries;
var _humidityTimeSeries;

Viewing.ClassroomTrainning.Extension = function( viewer, option ){
    Autodesk.Viewing.Extension.call( this, viewer, option );
    _viewer = viewer;
};


Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension;


Viewing.ClassroomTrainning.Extension.prototype.load  = ()=>{
 
    //// Step 3, Uncomment the code to add charts and timeline
    // /////////////////////////////////////////////////////////////////////////
    // /// create google charts for Temperature and Humidity
    // google.charts.load('current', { 'packages': ['gauge'] });
    // google.charts.setOnLoadCallback(drawChart);
    // function drawChart() {
    //     _data = google.visualization.arrayToDataTable([
    //         ['Label', 'Value'],
    //         ['Temperature', 40],
    //         ['Humidity', 100]
    //     ]);
    //     _options = {
    //         width: 400, height: 120,
    //         redFrom: 90, redTo: 100,
    //         yellowFrom: 75, yellowTo: 90,
    //         minorTicks: 5
    //     };
    //     _googleChart = new google.visualization.Gauge(document.getElementById('chartDiv'));
    //     _googleChart.draw(_data, _options);
    // }

    // //////////////////////////////////////////////////////////////////////////////
    // /// create smoothie timeline chart
    // _temperatureTimeSeries   = new TimeSeries();
    // _humidityTimeSeries      = new TimeSeries();
    
    // var temperatureChart = new SmoothieChart();
    // temperatureChart.addTimeSeries(_temperatureTimeSeries, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 1 });
    // temperatureChart.streamTo(document.getElementById("chart1"),1000);

    // var humidityChart    = new SmoothieChart();
    // humidityChart.addTimeSeries(_humidityTimeSeries, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 1 });
    // humidityChart.streamTo(document.getElementById("chart2"), 1000);
    //// Step 3, Uncomment the code to add charts and timeline




    //////////////////////////////////////////////////////////////////////////////////
    /// get iot data from socket connection
    //replace with your own website
    const baseurl = 'http://localhost:3000';
    const socketio = io.connect(baseurl);

    //replace with your suitable topic names 
    const SOCKET_TOPIC_TEMPERATURE       = 'Intel-Forge-Temperature';
    const SOCKET_TOPIC_HUMIDITY          = 'Intel-Forge-Humidity';
    
    //replace with your test id
    var testdbid = 4808;


    //// Step 4, Uncomment the code to add event to update the data
    // //subscribe the socket data
    // $("#startwebsocket").click(function (res) {
    //     socketio.on(SOCKET_TOPIC_TEMPERATURE, function (msg) {
    //         console.log("Temperature Data from Intel: " + msg);

    //         var msgJson = JSON.parse(msg);
    //         if (msgJson.sensor_id == 'temperature') {
    //             // set the temperature data to google chart
    //             _data.setValue(0, 1, msgJson.value);
    //             _googleChart.draw(_data, _options);

    //             // set the temperature data to smoothie timeline
    //             _temperatureTimeSeries.append(new Date().getTime(), msgJson.value);

    //             // use the temperature data to control the color of viewer element
    //             if (msgJson.value < 20) {
    //                 _viewer.setThemingColor(
    //                     testdbid,
    //                     new THREE.Vector4(0, 1, 1, 1)
    //                 );
    //             }
    //             else if (msgJson.value > 20 && msgJson.value < 30) {
    //                 _viewer.setThemingColor(
    //                     testdbid,
    //                     new THREE.Vector4(0, 0.5, 1, 1)
    //                 );
    //             }
    //             else {
    //                 _viewer.setThemingColor(
    //                     testdbid,
    //                     new THREE.Vector4(1, 0, 0, 1)
    //                 );
    //             }
    //         }

    //     });

    //     socketio.on(SOCKET_TOPIC_HUMIDITY, function (msg) {
    //         console.log("Humidity Data from Intel: " + msg);
    //         var msgJson = JSON.parse(msg);
    //         if (msgJson.sensor_id == 'humidity') {
    //             // set the temperature data to google chart
    //             _data.setValue(1, 1, msgJson.value);
    //             _googleChart.draw(_data, _options);

    //             // set the temperature data to smoothie timeline
    //             _humidityTimeSeries.append(new Date().getTime(), msgJson.value);
    //         }
    //     });
    // });
    //// Step 4, Uncomment the code to add event to update the data


    //// Step 5: Uncomment the code to remove the listeners
    // //unsubscribe the socket data 
    // $("#endwebsocket").click(function (res) {
    //     socketio.removeAllListeners(SOCKET_TOPIC_TEMPERATURE);
    //     socketio.removeAllListeners(SOCKET_TOPIC_HUMIDITY);
        
    // });
    // //// Step 5: Uncomment the code to remove the listeners

    // alert('My Extension is loaded');
    return true;
};

Viewing.ClassroomTrainning.Extension.prototype.unload  = ()=>{
    alert('My Extension is unloaded');
    return true;
    
};


Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', Viewing.ClassroomTrainning.Extension);


//////////////////////////////////////////////////////////


