/**
 * @author raaf
 */

const kategoria = [
	"przysłowia",
	"postacie z bajek",
	"tytuł filmu",
	"znana osoba",
	"aktor/aktorka"
]
const przyslowia = [
	"co dwie głowy to nie jedna",
	"Bez pracy nie ma kołaczy",
	"Bez pracy nie ma kołaczy",
	"gdzie diabeł nie może tam babę pośle",
	"dla kota za dużo dla psa za mało",
	"chleb pracą nabyty bywa smaczny i syty",
	"co nagle to po diable",
	"cudza praca nie wzbogaca",
	"dzisiaj bal jutro żal",
	"wyskoczył jak filip z konopi"
]
const postacieZBajek = [
	"reksio",
	"koziołek matołek",
	"kaczor donald",
	"myszka miki",
	"czerwony kapturek",
	"calineczka",
	"wilk i zając",
	"królowa lodu",
	"śpiąca królewna",
	"kubuś puchatek"
]
const tytulFilmu = [
	"w pustyni i w puszczy",
	"kształt wody",
	"nad niemnem",
	"spiderman",
	"harry potter i komnata tajemnic",
	"czterej pancerni i pies",
	"czterej pancerni i pies",
	"cześć tereska",
	"dziennik bridget jones",
	"tytanic"
]
const znanaOsoba = [
	"Alexander Graham Bell",
	"Albert Einstein",
	"Aleksander Wielki",
	"Bill Gates",
	"Walt Disney",
	"Thomas Edison",
	"William Szekspir",
	"Józef Piłsudski",
	"Napoleon Bonaparte",
	"Lech Wałęsa"
]
const aktorAktorka = [
	"Janusz Gajos",
	"Anna Dymna",
	"Sharon Stone",
	"Grażyna Szapołowska",
	"Louis de Funes",
	"Jerzy Stuhr",
	"Bogusław Linda",
	"Jean Claude Van Damme",
	"Keanu Reeves",
	"Clint Eastwood"
]

//wybór kategorii i losowego hasła z danej kategorii
let haslo = '';
//funkcja losująca
function losowanie(tablica) {
	return tablica[Math.floor(Math.random() * tablica.length)];
}

const wyborKategorii = losowanie(kategoria);
document.querySelector(".kategoria").innerHTML = "KATEGORIA: " + wyborKategorii;

if (wyborKategorii === "przysłowia") {
	haslo = losowanie(przyslowia);
} else if (wyborKategorii === "postacie z bajek") {
	haslo = losowanie(postacieZBajek);
} else if (wyborKategorii === "tytuł filmu") {
	haslo = losowanie(tytulFilmu);
} else if (wyborKategorii === "aktor/aktorka") {
	haslo = losowanie(aktorAktorka);
} else {
	haslo = losowanie(znanaOsoba);
}
haslo = haslo.toUpperCase();

//początek gry
const dlugosc = haslo.length;
let ile_skuch = 0;
let startStoper;
const yes = new Audio("yes.wav");
const no = new Audio("no.wav");


//sprawdzenie czy hasło nie jest za długie
if (dlugosc > 25) {
	document.getElementById("plansza").style.fontSize = "40px";
}

//wypisanie hasła na ekranie
let haslo1 = "";
for (i = 0; i < dlugosc; i++) {
	if (haslo.charAt(i) == " ") haslo1 = haslo1 + " ";
	else haslo1 = haslo1 + "-";
}

function wypisz_haslo() {
	document.getElementById("plansza").innerHTML = haslo1;
}

const litery = [
	"A", "Ą", "B", "C", "Ć", "D", "E", "Ę",
	"F", "G", "H", "I", "J", "K", "L", "Ł",
	"M", "N", "Ń", "O", "Ó", "P", "Q", "R",
	"S", "Ś", "T", "U", "V", "W", "X", "Y",
	"Z", "Ź", "Ż"
]

function start() {
	startStoper = setInterval(stoper, 1000);
	document.querySelector("button").classList.add("ukryjButton");
	let tresc_diva = "";

	for (i = 0; i < 35; i++) {
		let element = "lit" + i;
		tresc_diva = tresc_diva + '<div class = "litera" onclick=sprawdz(' + i + ') id="' + element + '">' + litery[i] + '</div>';
		if ((i + 1) % 7 == 0) tresc_diva = tresc_diva + '<div style = "clear:both;"></div>';
	}

	document.getElementById("alfabet").innerHTML = tresc_diva;
	wypisz_haslo();
}

// String.prototype.ustawZnak = function (miejsce, znak) {
// 	if (miejsce > this.length - 1) return this.toString();
// 	else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
// }
/*
//uruchomienie czasu
let startStoper = setInterval(stoper,1000);
*/
function sprawdz(nr) {
	let trafiona = false;

	let patt = new RegExp(litery[nr], 'gi');

	while (patt.test(haslo) == true) {
		let index = patt.lastIndex;
		haslo1 = haslo1.substring(0, index - 1) + litery[nr] + haslo1.substring(index);
		trafiona = true;
	}

	if (trafiona == true) {
		yes.play();
		let element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		wypisz_haslo();
		stopStoper();
		wznowStoper();
	}
	else {
		no.play();
		let element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";

		document.getElementById(element).setAttribute("onclick", ";");

		//skucha
		ile_skuch++;
		let obraz = "img/s" + ile_skuch + ".jpg";
		document.querySelector(".szubienica").innerHTML = '<img src="' + obraz + '" alt=""/>';
		stopStoper();
		wznowStoper();
	}
	//wygrana
	if (haslo == haslo1) {
		document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawdziwe hasło: " + haslo + '<br/><br/><span class = "reset" onclick="location.reload()">JESZCZE RAZ???</span>';
		document.querySelector("button").classList.add("ukryjButton");
		stopStoper();
	}
	//przegrana
	if (ile_skuch >= 9) {
		document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło to: " + haslo + '<br/><br/><span class = "reset" onclick="location.reload()">JESZCZE RAZ???</span>';
		document.querySelector("button").classList.add("ukryjButton");
		stopStoper();
	}
}
//stoper
const uchwytStopera = document.querySelector(".zegar");
let wartoscStopera = uchwytStopera.textContent;

function stoper() {
	//dodanie klasy koncowy - czerwony kolor odliczania
	if (wartoscStopera < 5) {
		document.querySelector(".zegar").classList.add("koncowy");
	}

	if (wartoscStopera == 0) {
		no.play();
		ile_skuch++;
		var obraz = "img/s" + ile_skuch + ".jpg";
		document.querySelector(".szubienica").innerHTML = '<img src="' + obraz + '" alt=""/>';
		if (ile_skuch >= 9) {
			document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło to: " + haslo + '<br/><br/><span class = "reset" onclick="location.reload()">JESZCZE RAZ???</span>';
			document.querySelector("button").classList.add("ukryjButton");
			stopStoper();
			return;
		}
		wartoscStopera = 10;
		uchwytStopera.innerHTML = wartoscStopera;
		//usunięcie klasy koncowy
		document.querySelector(".zegar").classList.remove("koncowy");
	}
	else {
		wartoscStopera = wartoscStopera - 1;
		uchwytStopera.innerHTML = wartoscStopera;
	}
}
function wznowStoper() {
	wartoscStopera = 10;
	document.querySelector(".zegar").classList.remove("koncowy");
	uchwytStopera.innerHTML = wartoscStopera;
	startStoper = setInterval(stoper, 1000);
}
function stopStoper() {
	clearInterval(startStoper);
}
function pokaz() {
	document.querySelector(".kategoria").classList.add("pokazKategoria");
	document.querySelector(".zegar").classList.add("pokazZegar");
	document.querySelector(".szubienica").classList.add("pokazSzubienica");

}
const buttonStart = document.querySelector("button");
buttonStart.addEventListener("click", function () {
	start();
	pokaz();

});

