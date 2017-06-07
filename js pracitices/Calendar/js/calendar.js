var mon = document.getElementById('Monday');
var tue = document.getElementById('Tuesday');
var wed = document.getElementById('Wednesday');
var thur = document.getElementById('Thursday');
var fri = document.getElementById('Friday');
var sat = document.getElementById('Sataurday');
var sun = document.getElementById('Sunday');
var year = document.getElementById('year');
var month = document.getElementById('month');
var weekdays = [mon,tue,wed,thur,fri,sat,sun];

function initDate () {
	year.innerText = new Date().getFullYear();
	month.innerText = new Date().getMonth() + 1;
}

function setDate (year, month) {
	var sumDate = new Date(year, month, 0).getDate();
	// 留白
	var firstDate = new Date(year, month - 1, 0).getDay();
	for (var i = 0; i < firstDate; i++) {
		var datep = document.createElement('p');
		datep.className = 'date';
		weekdays[i].appendChild(datep);
	}
	// 添加日期
	for (var i = 0;i < sumDate;i++){
		var weekday = new Date(year, month - 1, i).getDay();
		var datep = document.createElement('p');
		datep.className = 'date';
		var datenum = document.createTextNode(i + 1);
		datep.appendChild(datenum);
		switch (weekday) {
			case 0:
				mon.appendChild(datep);
				break;
			case 1:
				tue.appendChild(datep);
				break;
			case 2:
				wed.appendChild(datep);
				break;
			case 3:
				thur.appendChild(datep);
				break;
			case 4:
				fri.appendChild(datep);
				break;
			case 5:
				sat.appendChild(datep);
				break;
			case 6:
				sun.appendChild(datep);
				break;
		}
	}
}

window.onload = function () {
	initDate();
	setDate(year.innerText, month.innerText);
}