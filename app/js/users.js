var range={
	 'form': '',
	 'to' : ''
}
(function () {
	var calendarCountClicker=0;//для встановлення діапазону
	var lastCalendarDate;
	$('input#registrationDate').glDatePicker();//add datePicker
	$('#generalCalendar').glDatePicker({			//add calendar
		showAlways: true,
		cssName: 'darkneon',
		zIndex: 100,
		onClick: (function(el, cell, date, data) {
			var currentDate=date.toLocaleDateString();
			if(lastCalendarDate==undefined||currentDate!=lastCalendarDate){
				calendarCountClicker++;
				
				if(calendarCountClicker%2==0)
				{
					console.log(currentDate);
					console.log(lastCalendarDate);
					
					
				}
				lastCalendarDate=currentDate;
			}
				//el.val(date.toLocaleDateString());
				
			})
});

})();

google.charts.load('current', {'packages':['corechart']});


var users=[];

function createUser(){
	var user={
		first_name: $('#userFirstName').val(),
		second_name: $('#userSecondName').val(),
		age: $('#userAge').val(),
		sex: $('#userSex').val(),
		profession: $('#userProfession').val(),
		registDate: $('#registrationDate').val()
	}
	users[users.length]=user;
	$('#registrForm')[0].reset();
}

//charts
function drawChart () {
	var generalData = prepareUserData();//data for charts

	var data1 = new google.visualization.DataTable();//chart for names
	data1.addColumn('string', 'name');
	data1.addColumn('number', 'Count');
	for(var key in generalData.names){
		data1.addRows([[key,generalData.names[key]]]);
	}
	var options1 = {
		title: 'Age of Users',
		legend: { position: 'none' },
		colors: ['#e7711c'],
		histogram: { lastBucketPercentile: 5 },
		vAxis: { scaleType: 'mirrorLog' }
	};
	var chart1 = new google.visualization.Histogram(document.getElementById('chart0'));
	chart.draw(data1, options1);

	var data2 = new google.visualization.DataTable();//chart profession
	data2.addColumn('string', 'profession');
	data2.addColumn('number', 'Count');
	for(var key in generalData.professions){
		data2.addRows([[key,generalData.profession[key]]]);
	}
	var options2 = {
		title: 'User`s professions'
	};
	var chart2 = new google.visualization.PieChart(document.getElementById('chart1'));
	chart.draw(data2, options2);

	var data3 = new google.visualization.DataTable();//chart sex
	data3.addColumn('string', 'Sex');
	data3.addColumn('number', 'Count');
	for(var key in generalData.sex){
		data3.addRows([[key,generalData.sex[key]]]);
	}
	var options3 = {
		title: 'User`s Sex',
		is3D: true
	};
	var chart3 = new google.visualization.PieChart(document.getElementById('chart2'));
	chart.draw(data3, options3);

var data4 = new google.visualization.DataTable();//chart for age
data4.addColumn('number', 'Age');
data4.addColumn('number', 'Count');
for(var key in generalData.age){
	data4.addRows([[ +key, +generalData.age[key]]]);
}
var options4 = {
	title: 'Age of Users',
	legend: { position: 'none' },
	colors: ['#e7711c'],
	histogram: { lastBucketPercentile: 5 },
	vAxis: { scaleType: 'mirrorLog' }
};
var chart4 = new google.visualization.Histogram(document.getElementById('chart3'));
chart.draw(data4, options4);
}

function prepareUserData () {
	
	let temp_name={},
	temp_profession={},
	temp_Sex={},
	temp_Age={};

	for(var i=0;i<users.length;i++){
		if(users[i].first_name in temp_name){//name
			temp_name[users[i].first_name] +=1;
		}
		else temp_name[users[i].first_name] =1;

		if(users[i].profession in temp_profession){//profession
			temp_profession[users[i].profession] +=1;
		}
		else temp_profession[users[i].profession] =1;

		if(users[i].sex in temp_Sex){//sex
			temp_Sex[users[i].sex] += 1;
		}
		else temp_name[users[i].sex] = 1;

		if(users[i].age.toString() in temp_Age){//age
			temp_Age[users[i].age.toString()] +=1;
		}
		else temp_name.users[i]=1;
	}
	var result={
		'names' : temp_name,
		'professions' : temp_profession,
		'sex' : temp_Sex,
		'Age' : temp_Age
	};
	console.log(result);
	return result;
}