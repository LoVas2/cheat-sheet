# Javascript introduction
## Les types
* Les nombres : Number
* Les grands entiers (BigInt) : BigInt
* Les chaînes de caractères : String. Séquences de caractères Unicode. Séquences de codets UTF-16 : chaque codet est représenté par un nombre sur 16 bits et chaque caractère Unicode est représenté par 1 ou 2 codets.
* Les booléens : Boolean. False = 0, '', Nan, null et undefined
* Les objets : Object
  * Function, Array, Date et Regexp
* Les symboles : Symbol 
* Null : objet de type object indiquant une absence délibérée de valeur
* Undefined : objet de type undefined indiquant une variable non initialisée
* NaN : Not a Number


### String interpolation

````javascript
const myName = `Alexander`;
const salutation = `Bienvenue sur mon site ${myName}!`;
console.log(salutation);   //retournera “Bienvenue sur mon site Alexander!” 
````

## Les variables
* **let :** permet de déclarer des variables qui pourront être utilisées dans un *bloc*. 
* **const :** permet de déclarer des variables dont la valeur ne doit pas changer.
* **var :** permet de déclarer des variables qui pourront être utilisées dans une *fonction*.

Si on ne donne pas de valeur à la variable, par défaut elle vaut undefined.
JavaScript se différencie de Java avec les variables ***var***, 
quand une de ces variables est déclarée dans un bloc *if*, 
elle est également disponible en dehors de ce bloc.

Les types primitifs sont passés par **valeur** alors que les objets et les tableaux sont passés par **référence**.


## Les opérateurs
* **Opérateurs classiques :** +, -, *, / et % pour le reste (n'est pas égale à modulo)
* **Opérateur d'incrément :** +=, -=, ++, --
* **Concaténation :** + 
  * `"coucou" + " monde"; // "coucou monde"`
  * `"3" + 4 + 5; // "345"`
  * `3 + 4 + "5"; // "75"`
* **Comparaison :** 
  * <, >, <= et >=
  * == : effectue une équivalence (``123 == "123"; // true`` ou ``1 == true; // true``)
  * === : évite les conversions implicites

`"" + 4` => est une manière utile de convertir une variable en chaîne de caractères.

## Les structures de contrôle
* if () {} else if () {} else {}
* while () {}
* do {} while ()
* for (let i = 0; i < 5; i++) {}
* for (let element of tableau) {}
* for (let propriété in objet) {}
* switch (action) { case 'dessiner' : dessine(); break; default: }

### Les opérateurs conditionnels
Les ``&&`` et les ``||`` peuvent être utilisés pour affecter des valeurs à des variables :
* ``let nom = o && o.getNom();`` vérifie que o est non null avant d'affecter le nom.
* ``let nom = autreNom || "nomParDéfaut";`` permet d'assigner une valeur par défaut.
* ``let nom = nomEnCache || (nomEnCache = getNom());`` permet de mettre en cache des valeurs

Opérateur ternaire : ``let permis = (age > 18) ? "oui" : "non";``

### Les objets
Les objets en JavaScript sont simplement des collections de paires nom-valeur. Équivalent à une HashMap en Java.
Ce sont des **JSON**.
Le **nom** est une chaîne de caractère et la **valeur** peut être n'importe quoi.

Pour initialiser un objet ``let obj = new Object();`` ou en littéral ``let obj = {};``

Pour accéder aux attributs : ``obj.details.color;`` ou ``obj['details']['color'];``

Fonction pour définir un objet
````javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Définir un objet
let you = new Person('You', 24);
let me = {[name] : 'Me', [age] : 18};
````

On utilise le **constructor** dans les classes :
```javascript
class Book {
  constructor(title, pages) {
    this.title=title;
    this.pages=pages;
  }
}
```

## Les tableaux
### Construire un tableau : 
``let a = [];``<br/>
``let a = ["chien", "chat", "poule"];``<br/>
``let a = Array(9).fill(null),``

La longueur d'un tableau (length) vaut toujours 1 de plus que l'indice le plus élevé.
````javascript
let a = ["chien", "chat", "poule"];
a[100] = "renard";
a.length // 101
typeof(a[90]); // undefined
````

Parcourir un tableau :
````javascript
for (const currentValue of a) {
  // Faire quelque chose avec currentValue
}
a.forEach(function(currentValue, index, array) {
  // Faire quelque chose avec currentValue ou array[index]
});
````
### Méthodes utiles
Méthode | Description
--- | ---
``a.push(item);`` | Ajoute un élément à la fin du tableau
``a.unshift(item);`` | Ajoute un élément au début du tableau
``a.join(sep)``| Convertit le tableau en une chaîne séparé par 'sep'
``a.pop()`` | Renvoie le dernier élément du tableau et le retire de celui-ci
``a.shift()`` | Renvoie le premier élément du tableau et le retire de celui-ci

## Les fonctions
```javascript
function ajoute(x, y) {
  let total = x + y;
  return total;
}
```

Quand on appelle une fonction, les paramètres sont optionnels. On pourrait appeler ajoute() (x et y valent undefined) ou ajoute(2,3,4) (où 4 est ignoré)

Les fonctions ont accès à des variables supplémentaires à l'intérieur de leur corps appelée ``arguments``. Il s'agit d'un objet semblable à un tableau qui contient toutes les valeurs reçues par la fonction.
```javascript
function ajoute() {
  let somme = 0;
  for (let i = 0, j = arguments.length; i < j; i++) {
    somme += arguments[i];
  }
  return somme;
}

ajoute(2, 3, 4, 5); // 14
```

Les fonctions anonymes sont des fonctions sans nom : ``function () { toto... };``. Une telle fonction n'est pas utile en soit car elle n'est pas appelable. On l'utilise souvent quand elle est passée en paramètre d'une autre fonction ou assignée à une variable : ``let f = function...``

On peut mettre des fonctions dans un objet :
```javascript
function creerPersonne(prenom, nom) {
  return {
    prenom: prenom,
    nom, // équivaut à nom: nom
    nomComplet: function() {
      return this.prenom + ' ' + this.nom;
    },
    nomCompletInverse: function() {
      return this.nom + ' ' + this.prenom;
    }
  };
}
let s = creerPersonne("Simon", "Willison")
s.nomComplet(); // Simon Willison
```

## This
Utilisé au sein d'une fonction, *this* fait référence à l'objet courant. Sa signification dépend de la façon dont la fonction a été appelée. Si elle a été appelée avec la notation utilisant le point ou les crochets sur un objet, cet objet devient *this*. Si cette notation n'a pas été utilisée pour l'appel, *this* fera référence à l'objet global.
```javascript
let s = creerPersonne("Simon", "Willison");
let nomComplet = s.nomComplet;
nomComplet(); // undefined undefined
```
Lorsqu'on appelle nomComplet() seul, sans utiliser s.nomComplet(), this est lié à l'objet global. Comme il n'y a pas de variables globales appelées prenom ou nom, on se retrouve avec undefined pour chacune.
Il vaut mieux passer par des constructeurs :
```javascript
function personneNomComplet() {
  return this.prenom + ' ' + this.nom;
}

function personneNomCompletInverse() {
  return this.nom + ' ' + this.prenom;
}

function Personne(prenom, nom) {
  this.prenom = prenom;
  this.nom = nom;
  this.nomComplet = personneNomComplet;
  this.nomCompletInverse = personneNomCompletInverse;
}
```
### Prototype
```javascript
function Personne(prenom, nom) {
  this.prenom = prenom;
  this.nom = nom;
}

Personne.prototype.nomComplet = function() {
  return this.prenom + ', ' + this.nom;
}

Personne.prototype.nomCompletInverse = function() {
  return this.nom + ', ' + this.prenom;
}
```
``Personne.prototype`` est un objet partagé par toutes les instances de Personne. Il fait partie d'une chaîne de résolution (qui a un nom spécial, la « chaîne de prototypes ») : chaque fois que vous essayez d'accéder à une propriété de Personne qui n'est pas définie, JavaScript va vérifier Personne.prototype pour voir si cette propriété n'existe pas plutôt à cet endroit. Par conséquent, tout ce qui est assigné à Personne.prototype devient disponible à toutes les instances de ce constructeur via l'objet this.

Il est également possible d'ajouter des choses aux prototypes de classes d'objets JavaScript prédéfinies.
```javascript
let s = "Simon";
s.inverse(); // TypeError on line 1: s.inverse is not a function

String.prototype.inverse = function inverse() {
  let r = "";
  for (let i = this.length - 1; i >= 0; i--) {
    r += this[i];
  }
  return r;
}
s.inverse(); // "nomiS"
"Ceci peut maintenant être inversé.".inverse() // ".ésrevni ertê tnanetniam tuep iceC"
```

## Fonctions imbriquées
Ces fonctions peuvent être utiles pour éviter de définir trop de variables dans le scope globale.
```javascript
function parentFunc() {
  let a = 1;
  function fonctionImbriquee() {
    let b = 4; // Inacessible depuis parentFunc()
    return a + b;
  }
  return fonctionImbriquee(); // 5
}
```

## Exports et Imports
**default** : export default MonElement  et  import MonElement
**nommé** : export { MonElement1, MonElement2 }  et  import { MonElement1, MonElement2 }