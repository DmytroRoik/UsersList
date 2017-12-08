$('input#registrationDate').glDatePicker();
$('#generalCalendar').glDatePicker({
	showAlways: true,
	 cssName: 'darkneon',
	 zIndex: 100,
	 onClick: (function(el, cell, date, data) {
			//el.val(date.toLocaleDateString());
			console.log(date.toLocaleDateString());
		})
});


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
