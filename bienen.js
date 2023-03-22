$(document).ready(function() {
	alert("Wird erst ausgeführt, wenn alles geladen ist!");
});

let x = 0;
let y = 0;
let zielx = Math.floor(Math.random()*28)*20+20;
let ziely = 460;
let score = 0;
let spielzeit = 45;
let restzeit = 0;
let startzeit = new Date();
let gegnerpositionen = [1, 10, 60, 100, 150, 296];
let gegnerbewegung = [2, 3, -2, 4, 5, -3];

$(document).ready(function() {
	takt = window.setInterval(taktung, 150);
	var spielbrett = document.getElementById('Leinwand');
	spielfeld = spielbrett.getContext('2d');
	let spielfigur = new Image();
	spielfigur.src = 'bilder/spielfigur.png';
	
	spielfigur.onload = function() {
		spielfeld.drawImage(spielfigur,x,y);
	}

	function zeichneZielfeld() {
		let zielfeld = new Image();
		zielfeld.src = 'bilder/zielbereich.png';
		zielfeld.onload=function() {
			spielfeld.drawImage(zielfeld,zielx,ziely);
		}
	}
	zeichneZielfeld();
	
	function taktung(){
		spielfeld.clearRect(0,0,600,480);
		zeichneZielfeld();
		spielfeld.drawImage(spielfigur,x,y);
		kollisionspruefungGegner();
		zielfelderreicht();
		setzegegner();

		let aktuellezeit = new Date();
		restzeit = spielzeit - Math.floor((aktuellezeit.getTime()-startzeit.getTime())/1000);
		$('#spielzeit').html('Spielzeit: ' + restzeit);
		if (restzeit <=0){
			spielende();
		}
	}
	function zielfelderreicht() {
		console.log("x: " + x + "|Ziel x: " + zielx);
		console.log("y: " + y + "|Ziel y: " + ziely);
		
		if(x==zielx && y==ziely) {
			// Ziel erreicht!
			console.log('Ziel erreicht!');
			// neues Ziel
			if (ziely==460){
				ziely=0;
			}
			else{
				ziely=460;
			}
			zielx=Math.floor(Math.random()*28)*20+20;
			score++;
			$('#punktestand').html('Score: '+ score);
	}}
	function spielende(){
		clearInterval(takt);
		$('#spielendeanzeige').show();
	}

	function setzegegner() {
		for (nr = 0 ; nr < gegnerpositionen.length ; nr++) {
			gegnerpositionen[nr] += gegnerbewegung[nr] * 5;
			if (gegnerpositionen[nr] > 580 || gegnerpositionen[nr] < 0) {
				gegnerbewegung[nr] *= -1;
			}
			erzeugeGegner(gegnerpositionen[nr], 360-(nr*40));
		}	
	}

	function erzeugeGegner(gx, gy) {
		let img = new Image();
		img.src ='bilder/gegner.png';
		img.onload = function() {
			spielfeld.drawImage(img, gx, gy)
		}
	}

	function kollisionspruefungGegner() {
		for (nr = 0; nr < gegnerpositionen.length; nr++) {
			let ygeg = 360-(nr*40);
			if ( Math.abs(x - gegnerpositionen[nr]) < 20 && y == ygeg ) {
				// Zusammenstoss
				console.log('Zusammenstoss!!!');
				console.log( Math.abs(x - gegnerpositionen[nr]) );
            	console.log( " | y: "+ y );
            	console.log( " | y: "+ ygeg  + " berechnet ");
				kollisionsgegner();
			}
		}
	}

	function kollisionsgegner() {
		clearInterval(takt);
		$('#gameover').show();
	}

	$(document).bind('keydown', function(evt) {
		console.log("Tastaturcode: " + evt.keyCode);
		switch (evt.keyCode) {
			// Pfeiltaste nach unten
			case 40:
				console.log("Pfeiltaste nach unten");
				y += 20;
				if (y >= 480) {
					y = 460;
				}
				console.log("Wert y: " + y);
				return false;
				break;
			case 38:
				console.log("Pfeiltaste nach oben");
				y -= 20;
				if (y <= 0) {
					y = 0;
				}
				console.log("Wert y: " + y);
				return false;
				break;
			case 37:
				console.log("Pfeiltaste nach links");
				x -= 20;
				if (x <= 0) {
					x = 0;
				}
				console.log("Wert x: " + x);
				return false;
				break;
			case 39:
				console.log("Pfeiltaste nach rechts");
				x += 20;
				if (x >= 600) {
					x = 580;
				}
				console.log("Wert x: " + x);
				return false;
				break;
		}
	})
});
	
	

