# memory

Prosta gra memory w Vue.js oparta o nazwy popularnych paczek z NPM.

## Jak grać

Wystarczy nacisnąć myszką na dowolną kartę by zobaczyć jej zawartość. Odkrycie dwóch identycznych kart naraz oznacza je jako znalezioną parę i odkrywa do końca gry. Odkrycie dwóch różnych kart tylko zabiera ruch i po chwili je chowa.
Celem gry jest znalezienie wszystkich par w jak najmniejszej liczbie ruchów - ważna jest więc pamięć, jak i szczęście.

## Co jest na kartach?

Aplikacja przy generacji pobiera listę paczek z NPM wg. popularności, z odrobiną losowości dodaną do by dostawać różne zestawy. Odkrycie karty ujawni nazwę paczki, jednak najechanie na kartę z już znalezionej pary pokaże opis paczki, a naciśnięcie na nią otworzy nową kartę z jej stroną na NPM

## Jak działa aplikacja?

Aplikacja napisana jest w [Vue.js v3](https://v3.vuejs.org/) i [TypeScripcie](https://www.typescriptlang.org/).

Większość logiki opiera się o [stan w Vuex](src/store/state.ts) - karty są tam arrayem obiektów zawierających dane paczki której dotyczą (nazwę, opis, link) i informacje czy zostały odkryte/znalezione. Naciśnięcie na kartę na stronie wywołuje [akcję `revealCard`](src/store/actions.ts#L67) która w zależności od odkrytych już kart:

0. tylko odkryje wybraną
1. odkryje wybraną i sprawdzi czy ma taką samą nazwę co już odkryta - jeśli tak oznaczy obie jako znalezione, jeśli nie uruchomi timer do schowania obu
1. schowa obie już odkryte i odkryje wybraną

A także będzie zwiększać odpowiednio liczbę wykonanych ruchów.
Getter `won` służy sprawdzeniu czy jest jakakolwiek nieznaleziona karta i decyduje o pokazaniu informacji o skończeniu gry.

Generowanie kart odbywa się przez [akcję `generateCards`](src/store/actions.ts#L34), która resetuje licznik ruchów, pobiera listę paczek (z cache lub wykonując request do NPM jeśli cache jest zbyt małe/puste), losuje układ kart (na szybko zaimplementowany algorytm Fishera–Yatesa w [`utils.ts`](src/utils.ts)) i ostatecznie commituje nowy stan do Vuex.

Wyświetlanie wszystkiego opiera się na 3 komponentach Vue - [`Menu.vue`](src/components/Menu.vue) wyświetla tytuł, licznik ruchów i pozwala wybrać rozmiar i uruchomić generację planszy. [`CardGrid.vue`](src/components/CardGrid.vue) to kontener dla kart, który pobiera stan i tworzy z niego listę komponentów [`Card.vue`](src/components/Card.vue), czyli już właściwych kart.

## Przygotowanie projektu

Po sklonowaniu repozytorium (`git clone https://github.com/grupa-js/memory`) należy do niego przejść i zainstalować zależności:

```bash
yarn install
# lub
npm install
```

## Skrypty służące do pracy z repozytorium:

### Uruchomienie serwera dev z live reload

```bash
yarn serve
# lub
npm run serve
```

### Kompilowanie strony do produkcji

```
yarn build
# lub
npm run build
```

### Lintowanie i naprawianie problemów

```
yarn lint
# lub
npm run lint
```
