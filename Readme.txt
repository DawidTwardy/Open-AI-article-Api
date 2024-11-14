Sposób uruchomienia:Pobieramy i Otwieramy folder przez VSC i wpisujemy w terminalu "node app.js",Wpisy na terminalu będą nas informować o jakim numerze 
    zadanie bieżaco jest wykonywane.

Opis działania:
a)Dla App.js
    1.Import fs i node-fetch w celu obslugi plików i zapytań do sztucznej inteligencji
    2.Następnie definiuje stałą,która przechowuje klucz do API
    3.Funkcja readFileAndPreparePrompts(filePath)- Odczytuje Plik tekstowy podanny w zmiennej (filePath),usuwa puste linie się w nim znajdujące
        Tworzy tablice obiektow {header,content} w celu lepszego generowania zapytań do openAI.Zwraca gotową tablice obiektów.
    4.Funkcja sendToOpenAI(header, content) -modyfikuje nam wczesniej wyseparowane obiekty header i content w celu ruzbodowanego zapytania do chatgpt i zapisuje
        w zmodyfikowanym prompcie,zmodyfikowanego prompta wysyla do chatgpt-3.5-turbo,jest zabezpieczona również na napotkanie problemow takich jak:
        Brak oczekiwanych danych w odpowiedzi i "Błąd komunikacji z API, jesli jednak wszystko pojdzie dobrze zwraca nam odpowiedz od openAI
    5.Funkcja cleanHtmlResponse(response) -funkcja usuwajace znacznik "```html" i nadmiarowych spacji
    6.Funkcja saveResultsToText(results, filePath)-Funkcja iteruje przez tablice wynikow i dla kazdego z nich uzywa cleanHtmlResponse(response)
        później łączy w jeden ciąg tekstowy całą tablice i wysyła ją do pliku artykul.html.Dodatkowo funkcja przed zapisaniem całej wersji pliku usuwa starą wersje jego.
    7.Funkcja processFile(filePath)-Główna funkcja przyjmująca plik ze źródłem,później wykorzystując funkcje pobiera dane z pliku,wysyła do openAI 
        zapytanie,modyfikuje otrzymane dane od openAI i  zapisuje do pliku
    8.Uruchomienie następuje poprzez processFile(testy.txt); testy.txt-plik źródłowy z danymi
b) szablon.html- prosta strona html z dynamicznie ładującym sie .css w celu sprawdzenia jak będą wyglądać artykuły na stronie
c) podglad.html- Pobiera artykuły z pliku artkul.html,zawiera obsluge błędu jakby nie udało się załadować pliku artykul.html,Przetwarza plik artykul.hmtml,
rozpoznaje nowy artykul tak,ze jest oddzielony conajmniej 4 znakami nowej linii ,dodałem funkcję loadArticleFromFil w celu załadowania artykułów po załadowaniu
 całej strony



