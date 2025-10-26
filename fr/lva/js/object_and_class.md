# Les objets
Les objets en JavaScript sont simplement des collections de pairs noms-valeurs. Équivalent à une HashMap en Java.
Ce sont des **JSON**.
Le **nom** est une chaîne de caractère et la **valeur** peut être n'importe quoi.

Pour initialiser un objet ``let obj = new Object();`` ou en littéral ``let obj = {};``.
Quand on crée un objet, une référence est associée à celui-ci. 

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

const book = new Book('Harry Potter', 550);
```

On peut déclarer des méthodes dans les objets
```javascript
class Book {
  constructor(title, pages) {
    this.title=title;
    this.pages=pages;
  }
  
  show = () => {
    console.log('Le livre ' + this.title + ' a ' + this.pages + ' pages.');
  }
}
```

On peut déclarer des méthodes static. Celles-ci ne sont pas liées à l'instance de l'objet.
````javascript
class BePolite {
    static sayHello() {
        console.log("Hello!");
    }
    static sayHelloTo(name) {
        console.log("Hello " + name + "!");
    }
}
BePolite.sayHello(); // imprime "Hello!""
BePolite.sayHelloTo("Will"); // imprime "Hello Will!""
````