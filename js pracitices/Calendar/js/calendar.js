function $ (node) {
	return document.getElementById(node);
}

var year = new Date().getFullYear();
var month = new Date().getMonth();
var yearNode = $('year');
var monthNode = $('month');
var mon = $('Monday');
var tue = $('Tuesday');
var wed = $('Wednesday');
var thur = $('Thursday');
var fri = $('Friday');
var sat = $('Sataurday');
var sun = $('Sunday');
var weekdays = [mon,tue,wed,thur,fri,sat,sun];

function initDate () {
	yearNode.innerText = year;
	monthNode.innerText = month + 1;
	setDate(year, month);
	changeDate();
};

function clearDate () {
	for (var i in weekdays){
		while (weekdays[i].children[1]) {
			weekdays[i].removeChild(weekdays[i].children[1]);
		}
	}
}

function setDate (year, month) {
	var sumDate = new Date(year, month + 1, 0).getDate();
	// 留白
	var firstDate = new Date(year, month, 0).getDay();
	for (var i = 0; i < firstDate; i++) {
		var datep = document.createElement('p');
		datep.className = 'date';
		weekdays[i].appendChild(datep);
	}
	// 添加日期
	for (var i = 0;i < sumDate;i++){
		var weekday = new Date(year, month, i).getDay();
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

function changeDate () {
	var preY = $('preYear');
	var preM = $('preMonth');
	var nextY = $('nextYear');
	var nextM = $('nextMonth');

	preY.addEventListener('click', function () {
		clearDate();
		setDate(--year, month);
		yearNode.innerText = parseInt(yearNode.innerText) - 1;
	});

	preM.addEventListener('click', function () {
		clearDate();
		setDate(year, --month);
		if (parseInt(monthNode.innerText) === 1) {
			monthNode.innerText = 12;
			yearNode.innerText = parseInt(yearNode.innerText) - 1;
		} else {
		  monthNode.innerText = parseInt(monthNode.innerText) - 1;
		}
	});

	nextY.addEventListener('click', function () {
		clearDate();
		setDate(++year, month);
		yearNode.innerText = parseInt(yearNode.innerText) + 1;
	});

	nextM.addEventListener('click', function () {
		clearDate();
		setDate(year, ++month);
		if (parseInt(monthNode.innerText) === 12) {
			monthNode.innerText = 1;
			yearNode.innerText = parseInt(yearNode.innerText) + 1;
		} else {
		  monthNode.innerText = parseInt(monthNode.innerText) + 1;
		}
	});
}
