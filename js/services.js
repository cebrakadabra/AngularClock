// **************************************************************
// **************************************************************
// Service für die digitale und analoge Businesslogik der App 
// **************************************************************
// **************************************************************
clockapp.factory('clockDataService', ['$interval', '$filter',  function($interval, $filter){

	// Objekt clockdata
	// enthält Variablen, die nach außen
	// sichtbar sein sollen und die
	// später returned werden 
	var clockdata = {
		offset: "",
		digital: "",
		hourRotation: 0,
		minuteRotation: 0,
		secondRotation: 0
	},
	_timezoneOffset = 0,
	_now = 0;


	// erzeugt pro Sekunde ein new Date
	// berechnet die Rotation für die analoge Uhrzeit pro Sekunde neu
	// formatiert digitale Uhrzeit sowie den Offset korrekt
	var _calculateRotation = function () {
		_now = new Date();
		clockdata.hourRotation = 360 * _getHours() / 12;
		clockdata.minuteRotation = 360 * _getMinutes() / 60;
		clockdata.secondRotation = 360 * _getSeconds() / 60;
		clockdata.digital = _formatTime();

		clockdata.offset = _formatOffset(_timezoneOffset);
	};

	
	// setzt den Zeitzonenoffset je nach Userinput und
	// setzt die Grenzen mit +/-12 richtig
	var _setTimezoneOffset = function (timezoneOffset) {
		if(timezoneOffset == _timezoneOffset) {
			return timezoneOffset;
		}
		timezoneOffset = timezoneOffset % 24;

		if(timezoneOffset < -12) {
			timezoneOffset += 24;

		} else if(timezoneOffset >= 12) {
			timezoneOffset -= 24;

		}
		_timezoneOffset = timezoneOffset;

		return _timezoneOffset;
	};


	// gibt den aktuellen Zeitzonenoffset zurück
	var _getTimezoneOffset = function () {
		return _timezoneOffset;
	};

	// gibt die aktuelle Stunde (UTC) +/- dem aktuellen Zeitzonenoffset
	var _getHours = function () {
		return (_now.getUTCHours() + _timezoneOffset + 24)%24;
	};	

	// gibt die aktuelle Minute (UTC) zurück
	var _getMinutes = function () {
		return _now.getUTCMinutes();
	};

	// gibt die aktuelle Sekunde (UTC) zurück
	var _getSeconds = function () {
		return _now.getUTCSeconds();
	};

	// formatiert den Zeitzonenoffset je nach Wert
	var _formatOffset = function (off) {
		if(off > 0){
			var _newoffstyle = "+"+off;
			return _newoffstyle;
		} if(off == 0){
			var _newoffstyle = "+/- "+off;
			return _newoffstyle;
		} if(off < 0){
			return off;
		}
	};

	// manuelle Formatierung der digitalen Uhrzeit (wenn Wert < 10)
	// date: format  bzw. mithilfe von $filter von Angular 
	// kann hier leider nicht eingesetzt werden
	var _formatTime = function () {
		var h = _getHours();
		var min = _getMinutes();
		var s = _getSeconds();

		if(s < 10){
			s = "0"+s;
		}

		if(min < 10){
			min = "0"+min;
		}

		if(h < 10){
			h = "0"+h;
		}

		return h + ":" + min + ":" + s;
	};


	// zählt eine Stunde dazu und setzt den Zeitzonenoffset neu
	var plushour =  function (){
		return _setTimezoneOffset(_getTimezoneOffset() + 1);
	}

	// zieht eine Stunde ab und setzt den Zeitzonenoffset neu
	var minushour = function (){
		return _setTimezoneOffset(_getTimezoneOffset() - 1);
	}

	// setzt die Uhrzeit auf die UTC Zeit zurück
	var resetToLocal = function (){
		return _setTimezoneOffset(0);
	}

	
	// Intervalfunktion, um die Rotation für die AnalogClock pro Sekunde zu berechnen,
	// sowie die Zeit der Digital Clock zu aktualisieren
	$interval(_calculateRotation, 1000);
	_calculateRotation(); // Erstaufruf der privaten Funktion _calculateRotation


	// Objekt clockdata und Funktionen, die nach außen sichtbar sein sollen returnen
	return {
		plushour: plushour,
		minushour: minushour,
		resetToLocal: resetToLocal,
		clockdata: clockdata
	}  
	
}]); // Ende von clockDataService






// **************************************************************
// **************************************************************
// Service für die Businesslogik der Stoppuhr
// **************************************************************
// **************************************************************
clockapp.factory('stopwatch', ['$interval', '$filter', function ($interval, $filter) {

	// Objekt stopwatchdata 
	// enthält Variablen, die nach außen
	// sichtbar sein sollen und die
	// später returned werden 
	var stopwatchdata = { 
		timevalueID: 0,
		timevalue: 0,
		description: "",
		timelist: []
	},
	_starttime = 0,
	_laptime = 0,
	_stopwatch = null;
	

	// private Initialisierungsfunktion
	// prüft ob der LocalStorage leer ist
	// sonst wird die Liste der Zeiten aus dem LocalStorage geladen und
	// die aktuelle fortlaufende Nummer auf das letzte Element gesetzt 
	var _init = function () {

		if(localStorage.getItem("timelist") === null){
			stopwatchdata.timelist = [];
		} else{
			var _getObjects = localStorage.getItem("timelist");
			stopwatchdata.timelist = JSON.parse(_getObjects);
			stopwatchdata.timevalueID = stopwatchdata.timelist[stopwatchdata.timelist.length-1].ID;
		}
		
	};

	// new Date().getTime() wird benötigt
	// um die Millisekunden überhaupt 3 stellig anzeigen
	// zu können
	var	_now = function () {
		return (new Date()).getTime();
	};


	// Funktion zur Ausführung des Stoppuhrstarts
	var start = function () {
		// Wenn die Startzeit gesetzt, dann nimm die Startzeit, sonst die von _now()
		// wird zum Beispiel benötigt, wenn wieder nach einem Stop auf Start gedrückt wird
		if(_starttime != undefined){
			_starttime = _starttime ? _starttime : _now();
			// Intervalfunktion für die Stoppuhr, die den Wert alle 100ms vorantreibt,
			_stopwatch = $interval(function(){
					var newTime = _gettime();
					stopwatchdata.timevalue = newTime;
		    	}, 100);
			return true;
		}
		return false;
		
	};

	// Stoppt die Stoppuhr beim aktuellen Wert
	var stop = function() {
		if(_starttime != 0){
			// laptime bezeichnet die gerade angezeigte Zeit
			_laptime = _starttime ? _laptime + _now() - _starttime : _laptime;
			_starttime = 0;
			// stoppt das aktuelle aktualisierungs Intervall der Stoppuhr (sozusagen den Heartbeat)
			$interval.cancel(_stopwatch);
			_stopwatch = null;

			return true;
		}
		return false;
		
	};

	// setzt die Stoppuhr komplett zurück, auch localStorage reset
	var reset = function() {
		_laptime = _starttime = 0;
		stop();
		stopwatchdata.timevalue = 0;
		stopwatchdata.timevalueID = 0;
		stopwatchdata.description = "";
		stopwatchdata.timelist = [];
		localStorage.clear();
	};

	// gibt die aktuell verstrichene Zeit zurück, wieder mithilfe von Alternativtrue und Alternativfalse
	var _gettime = function() {
		return _laptime + (_starttime ? _now() - _starttime : 0);
	};


	// die Funktion speichern für die Liste der Zeiten
	var save = function () {
    	// Increment ID of timevalue
    	stopwatchdata.timevalueID++;
    	// pushed die ID, die Zeit mithilfe von Angular date $filter (sehr praktisch) und die Description in das timelist array
    	stopwatchdata.timelist.push({ID: stopwatchdata.timevalueID, timetoSave: $filter('date')(stopwatchdata.timevalue, 'mm:ss,sss') , timedesc: stopwatchdata.description});
    	// setzt die letzte Description wieder auf einen leeren string
    	stopwatchdata.description = "";
    	// schreibt das aktuelle timelist array in den localStorage
    	localStorage.setItem("timelist", JSON.stringify(stopwatchdata.timelist));
    };


    // löscht die aktuelle Zeitliste, auch aus dem localStorage
    var clearlist = function () { 
    	// setzt die aktuelle Description auf einen leeren String
    	stopwatchdata.description = "";
    	// setzt das timelist array auf ein leeres Array zurück
    	stopwatchdata.timelist = [];
    	// löscht somit auch, das im localStorage gespeicherte Array 
    	localStorage.clear();
    };

    // löscht das zu löschende Element aus der Liste der Zeiten
    var deleteitem = function (time) {
    	// aktuell geklickter Index mithilfe von Angular finden
    	var index = stopwatchdata.timelist.indexOf(time);
    	// Index aus Array entfernen
    	stopwatchdata.timelist.splice(index, 1);
    	// localStorage updaten
    	localStorage.setItem("timelist", JSON.stringify(stopwatchdata.timelist));
    };

    // Erstaufruf der privaten Initialisierungsfunktion, für die Liste der Zeiten
    _init();


    // Objekt stopwatchdata und Funktionen, die nach außen sichtbar sein sollen returnen
    return {
    	stopwatchdata: stopwatchdata,
    	start: start,
    	stop: stop,
    	reset: reset,
    	save: save,
    	clearlist: clearlist,
    	deleteitem: deleteitem
    };


}]); // Ende von stopwatch
