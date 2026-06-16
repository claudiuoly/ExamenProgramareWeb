# 📚 Web Technologies — Întrebări Grilă

> Răspunsurile corecte sunt marcate cu ✅

---

## 🌐 HTML / DOM / CSS

**1. Care dintre următoarele sunt prefixe acceptate pe unele browsere pentru proprietățile CSS experimentale?**

- `-safari-`
- `-chrome-`
- ✅ `-webkit-`
- ✅ `-o-`
- ✅ `-moz-`

**2. Pentru inserarea de diacritice într-un document HTML se pot folosi:**

- ✅ Editoare capabile să salveze fișierul UTF-8 și specificarea acestui set de caractere în secțiunea `<head>`
- ✅ Entități HTML
- Tastatura setată pe limba română și specificarea atributului `lang="ro-RO"` la tagul HTML

**3. Pentru a centra un element cu display-ul `block` în cadrul unui alt container se folosește:**

- `align: center`
- `align: middle`
- `text-align: center`
- ✅ `margin: 0 auto`

**4. Elementul `<th>` trebuie folosit în cadrul unui tabel pentru:**

- centrarea textului și bold-area conținutului unei celule
- definirea unui nou rând în tabel
- ✅ definirea unei celule cu semnificația de celulă din header-ul tabelului

**5. Care este forma corectă de folosire a tag-ului `img` în XHTML?**

- `<img> poza.jpg </img>`
- ✅ `<img src="poza.jpg"></img>`
- `<img src="poza.jpg">`
- ✅ `<img src="poza.jpg"/>`

**6. Care este forma corectă de folosire a tag-ului `img` în HTML5?**

- `<img> poza.jpg </img>`
- `<img src="poza.jpg"></img>`
- ✅ `<img src="poza.jpg">`
- `<img src="poza.jpg"/>`

**7. Care dintre următoarele tag-uri HTML sunt deprecated în HTML5?**

- `b`
- `body`
- ✅ `font`
- ✅ `center`

**8. Care categorii de aplicații se pot folosi de DOCTYPE?**

- Serverele web
- ✅ Motoarele de căutare
- ✅ Editoarele și medii IDE
- ✅ Browserele

**9. Care dintre următoarele elemente au toate display-ul implicit `block`?**

- `ul, ol, p, table, input`
- `ul, ol, p, img, div`
- `input, div, p, form`
- ✅ `div, p, ul, ol, h1`

**10. Pentru a defini o listă ordonată cu litere din alfabetul grec în CSS se folosește:**

- `list-type: lower-greek`
- `list: lower-greek`
- ✅ `list-style-type: lower-greek`

**11. Care dintre următoarele elemente au display-ul implicit `inline`?**

- `a, span, b, i, li`
- `p, a, b, i, span`
- `b, i, li, span, img`
- ✅ `img, span, b, i, a`

**12. Care dintre următoarele afirmații sunt adevărate?**

- definițiile de stil interne au prioritate înaintea celor externe
- ✅ o definiție de stil aplicată clasei „bate" ca prioritate definiția de stil aplicată pe „tag"
- ✅ o proprietate inline suprascrie o proprietate dintr-o definiție aplicată unui selector bazat pe id

**13. Dându-se un container părinte și unul fiu, care dintre următoarele poziționări are/au sens?**

- fiu `relative` în părinte `virtual`
- fiu `flex` în părinte `relative`
- fiu `fixed` în părinte `relative`
- ✅ fiu `absolute` în părinte `relative`

**14. Care dintre următoarele informații despre tagul `<title>` sunt adevărate?**

- este opțional
- nu există tag-ul title, ci doar atributul title
- ✅ este folosit în mare măsură de motoarele de căutare
- ✅ este afișat în bara de titlu sau de bookmarks

**15. Care sunt asemănările și diferențele dintre atributele `id` și `name`?**

- ✅ orice tag acceptă atributul `id`, nu toate tagurile acceptă atributul `name`
- atributul `name` se folosește pentru referirea unui element din CSS/JavaScript
- ✅ două elemente HTML pot avea același `name`, dar nu pot avea același `id`
- ✅ atributul `id` se folosește pentru referirea unui element în CSS/JavaScript

**16. Care dintre sintaxele CSS de mai jos este/sunt corecte?**

- `body:color=red`
- `{body: color=red}`
- `{body; color:blue}`
- ✅ `body{color:#aabbcc}`
- ✅ `body{color:yellow}`

**17. Care dintre următoarele tag-uri este folosit pentru definirea de stiluri CSS interne?**

- `css`
- `class`
- `script`
- ✅ `style`

**18. `#RRAABB` este un cod de culoare valid?**

- Nu, codul hexazecimal trebuie să conțină două cifre extra pentru opacitate
- Da, valorile sunt specificate în baza 16
- Da, RR = roșu, AA = verde, BB = albastru
- ✅ **Nu**, deoarece valorile nu sunt specificate în baza 16

**19. Ce selector CSS selectează doar al doilea div (cel cu `id="age"`)?**

```html
<div class="info">John Doe</div>
<div class="info number" id="age">25</div>
```

- ✅ `.info.number`
- `.info .number`
- ✅ `.info[id]`
- `.info #age`

**20. Unde se poate defini un stil CSS pentru o anumită clasă?**

- inline, cu atributul `style`
- ✅ în interiorul tag-ului `<style>` din antetul paginii
- ✅ într-un fișier extern specificat cu tag-ul `<link>`

**21. Pe ce fundal va fi afișat textul „Cocosul canta"?**

```html
<style type="text/css">
#id2 {
    background-color: blue;
}

div #id1 .class2 {
    background-color: green;
}

div .class1 #id2 {
    background-color: yellow;
}

#id1 {
    background-color: red;
}
</style>

<div>
    <div class="class1" id="id1">
        <div class="class2" id="id2">
            Cocosul canta
        </div>
    </div>
</div>
```

- Roșu
- ✅ **Galben** (`div #id1 .class2` și `div .class1 #id2` au aceeași specificitate; câștigă regula de mai jos)
- Albastru
- Verde

**22. Care va fi culoarea și înălțimea div-ului cu `id="id1"`?**

```html
<style> #id1 { height: 100px; background-color: red; } </style>
<style> #id1 { background-color: blue; } </style>
```

- culoare = red, înălțime = 100px
- culoare = blue, înălțime nedefinită
- ✅ culoare = blue, înălțime = 100px

**23. În care dintre următoarele limbaje este posibilă crearea unei animații?**

- HTML
- PHP
- ✅ CSS
- ✅ JavaScript

**24. Ce trebuie adăugat următorului cod HTML pentru a fi corect?**

```html
<table style="width:100%">
<tr>
<th>Company</th>
<th>Contact</th>
<th>Country</th>
</tr>
<tr>
<td>Alfreds Futterkiste</td>
<td>Maria Anders</td>
<td>Germany</td>
<td>Optional</td>
</tr>
</table>
```

- `rowspan="2"` în tagul `th` de la Country
- ✅ Nimic, tabelul se afișează
- `rowspan="2"` și `colspan="2"`
- `colspan="2"` în tagul `th` de la Country

**25. Unde se va deschide resursa cerută de `<a href="www.google.com" target="nume1" />`?**

- Nu se va deschide
- ✅ Într-un `<iframe>` cu numele `"nume1"`
- Într-un nou tab sau în același tab (dacă a mai fost deschis cu același `target`)

**26. Care este motivul de utilizare al sprite-urilor?**

- Simplitate
- ✅ Reducerea numărului de request-uri
- Realizarea de animații

**27. Poziționarea `relative` este folosită pentru:**

- a poziționa un element relativ la obiectul document
- a poziționa un element relativ la fereastra browserului
- ✅ un container părinte care are elemente fiu poziționate absolut
- ✅ a muta un element în diferite direcții relativ la poziția sa normală

---

## 💻 JavaScript & jQuery

**28. Care cuvinte/caractere nu sunt rezervate în JavaScript și se pot folosi ca nume de variabile?**

- `this, a, b`
- `with, a, b`
- `let, a, b`
- ✅ `$, a, b`

**29. Ce face `$('li:first').addClass('patrat').addClass('deplasat').addClass('colorat')`?**

- selectează toate listele și le adaugă clasele
- selectează primul element din fiecare listă
- selectează toate elementele din liste
- ✅ selectează primul `li` și îi adaugă clasele `patrat`, `deplasat`, `colorat`

**30. Ce face `$(':not(p)').addClass('patrat').addClass('colorat')`?**

- selectează toate elementele cu clasele patrat și colorat, mai puțin paragrafele
- selectează toate elementele fără paragrafe care au deja acele clase
- selectează toate paragrafele cu acele clase
- ✅ selectează toate elementele cu excepția paragrafelor și le adaugă clasele `patrat` și `colorat`

**31. Ce se înțelege prin scop global în JavaScript?**

- obiectul `document`
- variabila `this`
- scopul imediat exterior celui în care este declarată o funcție
- ✅ obiectul `window`

**32. În funcție de context, în jQuery `$(this)` poate fi folosit pentru:**

- a returna obiectul JavaScript de bază
- ✅ a construi un wrapper jQuery în jurul documentului
- ✅ a construi un wrapper jQuery în jurul obiectului `window`
- ✅ a construi un wrapper jQuery în jurul obiectului pe care se apelează un eveniment

**33. Cum se declară corect un array în JavaScript?**

- `var studenti = ("Mihai", "Cristina", "Paula", "Dan")`
- `var studenti = "Mihai", "Cristina", "Paula", "Dan"`
- `var studenti = {"Mihai", "Cristina", "Paula", "Dan"}`
- ✅ `var studenti = ["Mihai", "Cristina", "Paula", "Dan"]`

**34. Unde se poate insera cod JavaScript într-un document HTML?**

- doar în `<head>`
- doar în `<body>`
- ✅ atât în `<head>` cât și în `<body>`

**35. Cum se inserează corect un fișier extern JavaScript `test.js`?**

- `<script name="test.js"></script>`
- `<script href="test.js">`
- `<script src="test.js">`
- ✅ `<script src="test.js"></script>`

**36. În JavaScript, `typeof 1/0` este `NaN` pentru că:**

- 1/0 este NaN și typeof NaN este NaN
- 1/0 este Infinity și typeof Infinity este NaN
- typeof 1/0 nu are rezultatul NaN, ci Infinity
- ✅ `typeof 1` este `Number` și `Number` nu se poate împărți la 0, rezultând `NaN`

**37. Care afirmații referitoare la filtrele de vizibilitate sunt adevărate?**

- `:hidden` selectează elemente care ocupă spațiu în pagină
- `:visible` selectează elemente cu `display:none` sau `width/height:0`
- `:visible` selectează elemente cu `visibility:hidden` și `opacity:0`
- ✅ `:visible` selectează toate elementele care ocupă spațiu în pagină
- ✅ `:hidden` selectează toate elementele ascunse în pagină

**38. Ce face:**

```js
var content = $('li').html();
$('li').append('<em> ' + content + '</em>');
```

- introduce `content` după primul list item
- introduce conținutului primului li înaintea fiecărui li
- conținutul din primul li va fi scris cu italic
- conținuturile din toate li-urile vor fi scrise cu italic
- ✅ introduce conținutului primului `li` **după** fiecare `li`

**39. Care expresii jQuery se pot folosi interschimbabil?**

- `$(selector).each(function() {})` cu `$(selector.each).function() {}`
- `$(ready(function() {}))` cu `$(document).ready(function() {})`
- `$(document.myelem)` și `$(document.getElementById("myelem"))`
- `$(document).myelem` și `$("#myelem")[0]`
- ✅ `$(function() {})` cu `$(document).ready(function() {})`
- ✅ `$("#myelem")[0]` și `document.getElementById("myelem")`
- ✅ `$("#myelem")` și `$(document.getElementById("myelem"))`
- ✅ `$` și `jQuery`

**40. Care informații despre plugin-urile jQuery sunt adevărate?**

- permit portarea codului jQuery pe diferite browsere
- permit rularea codului jQuery independent
- ✅ permit extinderea funcționalității API-ului standard jQuery cu noi metode
- unele permit includerea librăriei de pe diverse CDN-uri

**41. Care sunt specificități ale unor metode din API-ul jQuery?**

- pot fi apelate atât pe obiectul DOM cât și pe wrapper-ul jQuery
- ✅ pot fi folosite atât ca funcții Setter cât și ca funcții Getter
- ✅ întorc referința la obiectul pe care au fost apelate
- ✅ pot fi apelate atât sincron cât și asincron

**42. Ce face `$('ul:has(li)').addClass('patrat').addClass('deplasat').addClass('colorat')`?**

- selectează toate elementele din liste și le adaugă clasele
- selectează toate listele care au cel puțin un element
- selectează listele ordonate cu cel puțin un element
- selectează toate listele
- ✅ selectează listele **neordonate** care au cel puțin un element și le adaugă clasele

**43. Cum se afișează un mesaj printr-o fereastră de dialog modală în JavaScript?**

- `modalMessage("Mesaj")`
- `modalBox("Mesaj")`
- `alertBox("Mesaj")`
- ✅ `alert("Mesaj")`

**44. O variabilă `x` cu valoarea `7` poate fi declarată în JavaScript astfel:**

- `var x:= 7`
- ✅ `var x = 7`
- `x = new Number(7)`
- ✅ `let x = 7`
- ✅ `x = 7`

**45. În care element HTML se plasează codul JavaScript?**

- `<javascript>`
- `<js>`
- ✅ `<script>`

**46. Ce evenimente se generează la un click de mouse pe un element?**

- `ondoubleclick`
- `onmouseover`
- `onmouseclick`
- ✅ `onclick`

**47. Ce se va afișa în consolă?**

```js
if (1 === '1') { console.log("1 === '1'"); }
else if (1 == true) { console.log("1 == true"); }
else if (1 === 1.0) { console.log("1 === 1.0"); }
```

- nimic
- `1 === 1.0`
- `1 === '1'`
- ✅ `1 == true`

**48. Cum se ascund toate div-urile din pagină folosind jQuery?**

- `$("div").hidden()`
- `$("div").visibility(false)`
- `$("div").css("visibility", "hide")`
- ✅ `$("div").css("visibility", "hidden")`

---

## 📡 HTTP, Servere Web & Formulare

**49. Ce indică un cod de răspuns de forma `3xx`?**

- o eroare efectuată de client
- o eroare apărută pe server
- ✅ mutarea documentului cerut la o altă adresă
- ✅ redirecționarea clientului spre alt URL

**50. Un formular care conține un input de tip `file` trebuie:**

- submis prin metoda GET
- să aibă specificat atributul `accept`
- să aibă specificat atributul `content`
- ✅ submis prin metoda POST
- ✅ să aibă specificat `enctype="multipart/form-data"`

**51. Pentru a redirecționa automat browser-ul spre un nou URL, server-ul poate:**

- răspunde cu `1xx` împreună cu un header `location`
- include noul URL direct pe back-end cu `include`
- trimite un link HTML și simula un click din JavaScript
- ✅ răspunde cu `3xx` împreună cu un header `Location`
- ✅ folosi `window.location = "http://url-nou"` din JavaScript

**52. Care afirmații despre metoda HTTP POST sunt adevărate?**

- trebuie folosită pentru formulare cu input de tip `video`
- ✅ este recomandată pentru formulare cu input de tip `password`
- ✅ trebuie folosită pentru formulare cu input de tip `file`

**53. Care sunt adevărate despre un server web?**

- poate fi configurat să accepte cereri prin `file://`
- ✅ poate fi configurat să accepte cereri HTTP pe portul 443
- ✅ implicit ascultă HTTP pe portul 80 și HTTPS pe portul 443

**54. Care informații despre `readonly` și `disabled` sunt adevărate?**

- ✅ valoarea unui input `readonly` poate fi modificată din JavaScript, pe când `disabled` nu
- atributele specifică același lucru
- ✅ valoarea unui input `readonly` se trimite serverului la submit, pe când `disabled` nu

**55. Care metode HTTP nu presupun trimiterea de conținut după antete în răspuns?**

- GET
- PUT
- POST
- ✅ HEAD

**56. Care metode HTTP nu presupun trimiterea de conținut în cerere?**

- ✅ GET
- POST
- PUT
- ✅ HEAD

**57. Care antete sunt obligatorii pentru o cerere HTTP/1.1?**

- `Content-Type`
- `User-Agent`
- `Cookie`
- ✅ `Host`

**58. Care informații despre un URL accesat prin POST sunt adevărate?**

- URL-ului i se poate face bookmark
- URL-ul poate fi partajat
- ✅ reaccesarea prin reload presupune o confirmare din partea utilizatorului

**59. Serverul răspunde cu `404 Not Found`. Ce este adevărat?**

- serverul nu mai poate returna nimic după 404
- browserele răspund cu 200 OK pentru a confirma primirea erorii
- ✅ chiar dacă nu a găsit fișierul, serverul îi poate da totuși clientului conținut HTML

**60. Un URL de pe back-end poate fi invocat atât prin GET cât și prin POST?**

- Doar dacă datele primite sunt aceleași
- Nu
- ✅ **Da**

**61. Pe ce nivel al stivei TCP/IP se situează protocolul HTTP?**

- Internet
- Legătură de date
- Transport
- ✅ **Aplicație**

**62. Care este un avantaj al metodei GET față de POST?**

- Este mai bună pentru date confidențiale
- Nu are limită maximă de dimensiune
- Nu are avantaje
- ✅ Permite salvarea răspunsului ca bookmark

**63. Cărui fișier i se trimit datele când se dă submit la următorul formular?**

```html
<form>
  <input type="text" id="fname" name="fname"><br>
  <input type="text" id="lname" name="lname"><br><br>
  <input type="submit" value="Submit">
</form>
```

- Datele nu se trimit deloc
- ✅ Scriptului de pe backend care afișează formularul
- Unui fișier setat într-un fișier de configurare

**64. Care este un query string posibil dacă se dă submit la următorul formular?**

```html
<form>
  <input type="text" id="fname" name="fname"><br>
  <input type="text" id="lname"><br>
  <input type="email" id="email" name="email" validate><br>
  <input type="submit" value="Submit">
</form>
```

- `"fname=Ion&lname=Popescu&email=ionpopescu@gmail.com"`
- `"fname=Ion&email=ionpopescu@gmail.com"`
- `"fname=Ion&lname=Popescu&email=ionpopescu"`
- ✅ `"fname=Ion&email=ionpopescu"`

**65. Cum este posibil să existe 2 butoane de submit într-un formular?**

- Nu se poate
- ✅ Două `input` de tip `submit` cu nume diferite
- ✅ Două butoane dintre care unul are atributul `formaction` setat spre alt fișier

---

## 🔄 AJAX

**66. Cum se salvează date (nume și vârstă) folosind AJAX prin GET?**

- ✅ `$.get("save.php?nume=Ion&varsta=10")`
- ✅ `$.get("save.php", { nume: 'Ion', varsta: 10 })`
- ✅ `$.get("save.php", 'nume=Ion&varsta=10')`

**67. Un apel AJAX se poate face către o resursă statică?**

- Doar dacă se trimit și parametri
- Nu, niciodată
- ✅ **Da, întotdeauna**

**68. În ce condiții metoda `send` se apelează cu șirul vid?**

- Dacă request-ul AJAX se face prin HTTP
- Metoda send nu poate fi apelată cu șirul vid
- ✅ Dacă request-ul AJAX se face prin **GET**

**69. Care metode jQuery folosesc AJAX?**

- `$.post, $.request, load`
- `$.ajax, $.get, $.post, $.request`
- `$.get, load, unload`
- ✅ `$.ajax, $.get, load`

**70. Ordonați de la cea mai simplă la cea mai configurabilă:**

- ✅ `load` → `$.get` → `$.ajax`

**71. Pentru a verifica succesul unui apel AJAX:**

- `readyState = 4` și `status = 100`
- `readyState = 0` și `status = 100`
- `readyState = 1` și `status = 200`
- ✅ `readyState = 4` și `status = 200`

**72. Care sunt proprietăți ale unui obiect `XMLHttpRequest`?**

- `state, request, response, status`
- `readyState, request, response, status`
- ✅ `readyState, response, responseText, status`

**73. Un apel AJAX este în starea 2 dacă:**

- s-a făcut receive, dar nu send
- s-a făcut și send și receive
- s-a făcut open dar nu send
- ✅ s-a făcut `send` dar nu a sosit răspunsul de la server

**74. Funcția `onreadystatechange` se apelează:**

- când serverul schimbă codul de răspuns
- ✅ când obiectul AJAX își schimbă starea
- ✅ este posibil să se apeleze și când continuă să vină răspuns de la server

**75. Răspunsul sosit printr-un apel AJAX poate fi:**

- ✅ un fișier text
- ✅ un fișier JSON
- ✅ un fișier XML
- ✅ un fișier JavaScript

---

## 🐘 PHP

**76. Care dintre următoarele sunt scriptlet-uri valide în PHP?**

- `<% %>`
- ✅ `<?= ?>`
- ✅ `<? ?>` (cu opțiunea din `php.ini`)
- ✅ `<?php ?>`

**77. Un fișier PHP poate fi executat:**

- De către browser
- ✅ În linia de comandă cu `php.exe` / `php`
- De interpretorul SO pe care este instalată stiva AMP
- ✅ De un modul din cadrul serverului web

**78. Cum se poate interschimba valoarea variabilelor `$a` și `$b` în PHP?**

- ✅ `list($a, $b) = [$b, $a];`
- ✅ `list($a, $b) = array($b, $a);`

**79. În PHP, `return` este folosit pentru:**

- a termina execuția pe server și a trimite răspunsul complet
- a trimite clientului un răspuns
- ✅ a termina scriptul curent și a reda controlul unui script care l-a inclus cu `include`/`require`
- ✅ a termina execuția unei funcții

**80. Ce face `session_start()` în PHP?**

- Inițializează întotdeauna o nouă sesiune
- Porneste sesiunea și trimite cookie-ul prin `Cookie` header
- ✅ Dacă sesiunea e nouă, generează un cookie aleator și îl trimite clientului
- ✅ Dacă sesiunea e veche, identifică sesiunea și populează `$_SESSION`

**81. Cum se concatenează două șiruri în PHP?**

- `$s = '$a$b';`
- `$s = $a + $b;`
- ✅ `$s = "$a$b";`
- ✅ `$s = $a . $b;`

**82. Care declarație este corectă pentru definirea unui array în PHP?**

- ✅ `$fructe = array("struguri", "mere", "pere");`
- ✅ (PHP 5.4+) `$fructe = ["struguri", "mere", "pere"];`

**83. Unde se poate folosi funcția `header()` în PHP?**

- în orice scriptlet din fișier
- ✅ în primul scriptlet și doar dacă nu s-a trimis anterior niciun conținut spre browser

**84. Care afirmații sunt adevărate?**

- `mysqli_`* asigură în plus față de PDO posibilitatea „prepared statement"-urilor
- `mysqli_*` asigură față de PDO independența față de SGBD
- ✅ `mysql_*` (Old Extension) nu suportă „prepared statement"-uri, dar permite evitarea injecțiilor SQL

**85. Cum se introduc comentarii într-un scriptlet PHP?**

- ````
- ✅ `//`
- ✅ `/* ... */`
- ✅ `#`

**86. Cum se obțin parametrii la apăsarea ancorei `<a href="www.siteulmeu.com?addFav=1">`?**

- `$_SESSION["addFav"]`
- `$_POST["addFav"]`
- Nu se trimit parametri
- ✅ `$_GET["addFav"]`

---

## ☕ Java (Servlets & Arhitectură)

**87. Conectarea la o bază de date într-o aplicație web Java se recomandă:**

- La pornirea containerului, o singură conexiune
- ✅ La inițializarea aplicației web / a contextului
- La fiecare request în cadrul metodei `doGet` sau `doPost`

**88. Parametrii de configurare sunt preluați în cadrul metodei:**

- `applicationCreated()`
- `init()`
- ✅ `contextInitialized()`

**89. O bază de date embedded se recomandă a fi memorată:**

- Oriunde altundeva în sistemul de fișiere
- În `app/databases/`
- ✅ În folderul `WEB-INF` (inaccesibil clienților web)

**90. În câte instanțe se instanțiază un servlet?**

- O instanță separată la fiecare cerere
- În nicio instanță
- ✅ **O singură instanță**

**91. O sesiune într-o aplicație web Java se termină cu:**

- `session.destroy()`
- `session.close()`
- ✅ `session.invalidate()`

---

## 🛡️ Securitate Web

**92. Injecțiile JavaScript se datorează:**

- Folosirii HTTP în loc de HTTPS
- ✅ Validării insuficiente la nivel JavaScript
- Bugurilor din browser
- ✅ Validării insuficiente **server-side** la nivelul scriptului ce prelucrează datele din formular

**93. Cum se poate „fura" un cookie de sesiune?**

- Prin lipsa invalidării sesiunii (logout) și navigarea pe un site malițios
- ✅ Prin cod JavaScript injectat (XSS)
- ✅ Prin interceptarea datelor la nivelul rețelei (man in the middle)

**94. Pentru evitarea injecțiilor SQL în PHP 7 se recomandă:**

- Eliminarea ghilimelelor și apostrofelor
- `mysql_real_escape_string`
- ✅ Folosirea de **prepared statement**-uri

**95. Măsuri pentru evitarea injecțiilor SQL:**

- Dezactivarea SQL la nivel de browser
- Verificări riguroase la nivel de browser
- ✅ Verificări riguroase la nivel de backend și folosirea de ORM-uri
- ✅ Folosirea de **prepared statement**-uri la nivel de backend

**96. Măsuri pentru evitarea vulnerabilităților de tip XSS:**

- Verificări la nivel de browser
- Biblioteci JavaScript la nivel de browser
- Dezactivarea JavaScript din aplicație
- ✅ Înlocuirea anumitor caractere cu entitățile HTML corespunzătoare

**97. Care funcție PHP este folosită pentru a preveni XSS?**

- `mysql_real_escape_string`
- `filter_xss`
- ✅ `htmlentities`

**98. Care vulnerabilități pot fi exploatate pentru a fura sesiunea unui utilizator autentificat?**

- SQL Injection
- Cross-Site Request Forgery (CSRF)
- ✅ Cross-Site Scripting (XSS)

**99. Care expresii jQuery se pot folosi interschimbabil?** *(variantă examen)*

- `$(ready(function() {}))` cu `$(document).ready(function() {})`
- ✅ `$(function() {})` cu `$(document).ready(function() {})`
- `$(selector).each(function() {})` cu `$(selector.each).function() {}`

**100. Care expresii jQuery se pot folosi interschimbabil?** *(variantă examen)*

- ✅ `$("#myelem")[0]` și `document.getElementById("myelem")`
- ✅ `$("#myelem")` și `$(document.getElementById("myelem"))`
- `$(document.myelem)` și `$(document.getElementById("myelem"))`
- ✅ `$` și `jQuery`
- `$(document).myelem` și `$("#myelem")[0]`

**101. În jQuery `$(this)` se folosește pentru:** *(variantă fără „în funcție de context")*

- a returna obiectul JavaScript de bază
- a construi un wrapper jQuery în jurul documentului
- a construi un wrapper jQuery în jurul obiectului `window`
- ✅ a construi un wrapper jQuery în jurul obiectului pe care se apelează un eveniment

