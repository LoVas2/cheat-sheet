Vous pouvez mettre n’importe quelle expression JavaScript entre accolades dans du JSX.

# Components 

Un component étend la class React.Component. Et implémente par défaut la méthode 'render' qui affiche la vue à l'écran.

Pour pouvoir utiliser un composant dans une autre vue, il faut l'exporter : ``export default MyComponent`` => un component = un fichier = un export par défaut

On ne peut appliquer de style que sur les components React Native. 
**StyleSheet** est une API React Native permettant d'augmenter les performances de vos styles dans votre application.
* Sans StyleSheet, à chaque fois que votre application appelle un style, un nouvel objet avec votre style est créé. 
* Avec StyleSheet, votre style est associé à un identifiant. Chaque fois que votre application appelle votre style, StyleSheet utilise l'identifiant pour récupérer l'objet avec votre style.

**FlexBox** : Permet d'indiquer quelle part de l'écran les blocs vont prendre. Pour ce faire, utiliser le style 'flex' de Flexbox. Quand les box ont une part égale elles vont prendre la même taille sur l'écran. Par défaut, TOUS les components React Native ont un style  flex  à 0. Lorsqu'un component a un style  flex  à 0, il adapte sa taille en fonction de son style  height  et, s'il n'a pas de style  height, il adapte sa taille en fonction de celle de ses components enfants. Si un composant n'a ni flex ou height mais par contre qui contient de texte (Text, TextInput, Button), la taille utilisée va être celle du fontSize (=14 par défaut)

* flex : permet de définir la proportion du composant par rapport aux autres. flex=3 sera 3 fois plus grand que flex=1
* flexDirection : permet de définir comment on aligne les composants. 'column' or 'row'
* justifyContent : permet de définir comment s'aligne les éléments par rapport à l'axe principal. Y quand on est en alignement 'column', X pour l'alignement 'row'.
* alignItems : permet de définir la position des éléments sur l'axe secondaire.

**FlatList** a une propriété flex=1 par défaut.

## Props

Un composant accepte des paramètres, appelés props (qui est la contraction de « propriétés »),
et renvoie via sa méthode render une arborescence de vues à afficher.

Passer une prop appelée value :
````javascript
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
````

Dans les applis React, c’est grâce au passage de props que l’information circule, toujours des parents vers les enfants.

Les props sont fixées par le component parent et ne peuvent pas être modifiées par le component qui les reçoit. Les props sont accessibles en **lecture uniquement**.


## State
Les composants React peuvent définir un état local en définissant `this.state` dans leurs constructeurs. `this.state` est considéré comme une donnée privée du composant React qui le définit.

Quand vous appelez `setState` dans un composant, React met automatiquement à jour TOUT le composant et les composants enfants au sein de celui-ci.

Pour récupérer les données d’enfants multiples, ou pour permettre à deux composants enfants de communiquer entre eux, il vous faut plutôt déclarer leur état partagé dans le composant parent. 
Ce composant parent peut alors leur repasser cet état au travers des props ; ainsi, les composants enfants sont synchronisés entre eux et avec le composant parent.

L’état local est considéré privé, réservé au composant qui le définit, nous ne pouvons pas mettre cet état à jour directement depuis l'enfant.

Si vous souhaitez récupérer la valeur d'un component, il faut qu'un évènement ait lieu sur ce component.

### Utiliser des objets immutables
On peut modifier des objets de 2 façons différentes :
1. En les mutants : ``var player = {score: 1, name: 'Jérémie'};
   player.score = 2;``
2. En les copiants : ``var player = {score: 1, name: 'Jérémie'}; var newPlayer = {...player, score: 2};``

En refusant de muter les objets, on gagne plusieurs avantages :
1. Des fonctionnalités complexes deviennent simples (garder un historique par exemple)
2. Détecter des modifications : quand un objet est immuable, c'est la référence de l'objet qui change et c'est donc plus simple à détecter
3. Déclencher quand un composant doit se rafraichir. (shouldComponentUpdate). Ceci permet de créer des *composants purs*