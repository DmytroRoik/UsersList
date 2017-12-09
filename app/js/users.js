var USERS=(function () {
	var module={};
	var users=[];

	var range={
	'form': '',
	'to' : ''
	};

module.init = function () {
	google.charts.load('current', {'packages':['corechart']});//for charts
	$('#registrBtn').on('click',createUser);
	$('input#registrationDate').glDatePicker();//add datePicker

	users=loadDatafromLocalStorage();
	if(users==null)users=[];
	else Show_in_table();
	console.log(users)

	var calendarCountClicker=0;//для встановлення діапазону
	var lastCalendarDate;
	$('#generalCalendar').glDatePicker({			//add calendar
		showAlways: true,
		cssName: 'darkneon',
		zIndex: 100,
		
		onClick: (function(el, cell, date, data) {
			var currentDate=date;
			if(lastCalendarDate==undefined||currentDate!=lastCalendarDate){
				calendarCountClicker++;
				if(calendarCountClicker%2==0)
				{
					if(lastCalendarDate<currentDate){
						range.from=lastCalendarDate;
						range.to=currentDate;
					}
					else{
						range.from=currentDate;
						range.to=lastCalendarDate;
					}
					drawChart ();											//download charts
				}
				lastCalendarDate=currentDate;
			}
		})
	});
}

function loadDatafromLocalStorage () {
	return JSON.parse(localStorage.getItem('users'));
}
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
	localStorage.setItem('users', JSON.stringify(users));//save to localStorage
	Show_in_table();
	$('#registrForm')[0].reset();
}

function prepareUserData () {
	let temp_name={},
	temp_profession={},
	temp_Sex={},
	temp_Age={};

 	var	temp_users=users.filter(function (user) {// filtered users
 		return user.registDate>=range.from.toLocaleDateString()&&user.registDate<=range.to.toLocaleDateString();
 	});

 	for(var i=0;i<temp_users.length;i++){
		if(temp_users[i].first_name in temp_name){//name
			temp_name[temp_users[i].first_name] +=1;
		}
		else temp_name[temp_users[i].first_name] =1;

		if(temp_users[i].profession in temp_profession){//profession
			temp_profession[temp_users[i].profession] +=1;
		}
		else temp_profession[temp_users[i].profession] =1;

		if(temp_users[i].sex in temp_Sex){//sex
			temp_Sex[users[i].sex] += 1;
		}
		else temp_Sex[temp_users[i].sex] = 1;

		if(temp_users[i].age.toString() in temp_Age){//age
			temp_Age[temp_users[i].age] +=1;
		}
		else temp_Age[temp_users[i].age]=1;
	}
	var result={
		'names' : temp_name,
		'professions' : temp_profession,
		'sex' : temp_Sex,
		'age' : temp_Age
	};
	return result;
}


//charts
function drawChart () {
	if(users.length===0)return;
	var generalData = prepareUserData();//data for charts

	var data1 = new google.visualization.DataTable();//chart for names
	data1.addColumn('string', 'name');
	data1.addColumn('number', 'Count');
	for(var key in generalData.names){
		data1.addRows([[key,generalData.names[key]]]);
	}
	var options1 = {
		title: 'Name of Users',
	};
	var chart1 = new google.visualization.ColumnChart(document.getElementById('chart0'));
	chart1.draw(data1, options1);

	var data2 = new google.visualization.DataTable();//chart profession
	data2.addColumn('string', 'profession');
	data2.addColumn('number', 'Count');
	for(var key in generalData.professions){
		data2.addRows([[key,+generalData.professions[key]]]);
	}
	var options2 = {
		title: 'User`s professions'
	};
	var chart2 = new google.visualization.PieChart(document.getElementById('chart1'));
	chart2.draw(data2, options2);

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
	chart3.draw(data3, options3);

	var data4 = new google.visualization.DataTable();//chart for age
	data4.addColumn('number', 'Age');
	for(var key in generalData.age){
		for(var i=0;i<generalData.age[key];i++){
			data4.addRows([[ +key]]);
		}
	}
	var options4 = {
		title: 'User`s Age',
		hAxis: {title: 'Age', minValue: 0},
		legend: 'none'
	};
	var chart4 = new google.visualization.Histogram(document.getElementById('chart3'));
	chart4.draw(data4, options4);
}

function Show_in_table () {
	var tableBody=$('#tableUsersBody');
	for(let i=0;i<users.length;i++){
		var row=$('<tr></tr>');
		for(var key in users[i]){
			var td=$('<td></td>').text(users[i][key]);
			row.append(td);
		}
		tableBody.append(row);
	} 
}
return module;
})();

USERS.init();
