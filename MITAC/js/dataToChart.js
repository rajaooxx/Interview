/**
 * 
 * @authors Hardy Chou (rajaooxx@gmail.com)
 * @date    2018-07-19 17:12:59
 */
//準備chart
var ctx = document.getElementById("dataChart").getContext('2d');
var myChart = new Chart(ctx, {
	type: 'line',
    data: {
        labels: [],
        datasets: [
        {
        	label: 'Temperature [°C]',
        	data:[],
            yAxisID: 'y-axis-temp',
        	backgroundColor: 'transparent',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        },{
        	type: 'line',
            label: 'Humidity [%RH]',
            data: [],
            yAxisID: 'y-axis-humi',
        	backgroundColor: 'transparent',
            borderColor: '#36A2EB',
            borderWidth: 1
        }]
    },
    options: {
    	responsive: false,
    	title:{
    		display: true,
    		text: 'Temperature & Humidity '
    	},
        scales: {
            yAxes: [{
            	type: 'linear',
            	position: 'right',
            	id: 'y-axis-humi',
                ticks: {
                	min: 40,
                    // beginAtZero:true
                }
            },{
            	type: 'linear',
            	position: 'left',
            	id: 'y-axis-temp',
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

function dataToChart(data){
	// sensor utc timezone
	let utcTimeStr = data.notification.timestamp;
	console.log(utcTimeStr);
	// user timezone
	let localTime = moment.utc(utcTimeStr).toDate();
	localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
	console.log(localTime);

	//add data to chart
	let myTime = moment(localTime).format('HH:mm:ss');
	let myTemp = data.notification.parameters.temperature.value.toFixed(2);
	let myHumi = data.notification.parameters.humidity.value.toFixed(2);
	console.log(myTemp);
	console.log(myHumi);
	addData(myChart,myTime,myTemp,myHumi);
}

function addData(chart, label, temp, humi) {
	var charData = chart.data;
	
	//Chart大於十筆資料就shift
    if(charData.labels.length >= 10){
    	charData.labels.shift();
    	charData.datasets[0].data.shift();
    	charData.datasets[1].data.shift();
    }
    //Add data to chart
    charData.labels.push(label);
    charData.datasets[0].data.push(temp);
    charData.datasets[1].data.push(humi);

    //Update chart
    chart.update();
};