## Sélecteurs

cibler tous les liens de la page -> a { ..; }

 a img { border : dashed orange ; } 
-> toutes images sous un lien (même si balises intermédiaires entre le a et l’img) : avec bordures en pointillés orange 

un élément directement descendant d’un autre  
Ex. :   a > img { border : dashed orange ; }

p + img { border : dashed orange ;  } 
-> toutes les images qui suivent un paragraphe 

 p ~ img { border : dashed orange ; } 
-> toutes les images ayant un paragraphe comme frère (au niveau dans l’arborescence) 

header.titre { color : tomato ; } 
-> les balises header avec l’attribut class="titre" couleur tomate 

#sommaire { color : yellow ; } 
-> l’élément dont l’attribut id="sommaire" en jaune 

E[att] 
-> Elément E contenant l’attribut att (sans valeur précise) – CCS2 
Ex. :  
E[att="val"] 
-> Elément E dont l’attribut att est exactement égal à val – CSS2 

### Pseudo class :

:link   	-> les liens non visités 
:visited	-> les liens déjà visités 
:hover	-> les liens survolés par la souris 
:active	-> élément activé par l’utilisateur (entre la pression du bouton et son relâchement) 
:focus	-> élément recevant l’attention de l’utilisateur (ex. : saisie clavier) 
:first-child	-> le premier élément reçoit le style indiqué 
:before -> pour insérer un contenu avant un élément 
:after -> pour insérer un contenu après un élément 
Ex. :   cite:before {content : open-quote ; } 
cite:after {content : close-quote ; } 
:first-letter -> pour affecter un style à la première lettre d’un élément 
:first-line -> pour affecter un style à la première ligne d’un bloc 

## Les conteneurs : <div> et <span>

Constitué de :
- D’un contenu (texte, paragraphe, image, etc…) 
- D’une marge intérieure (padding) 
- D’une bordure (border), facultatives 
- D’une marge extérieure (margin)

Position :
- Static : par défaut.  
- Relative : Se comporte comme un élément static mais peut être déplacé par rapport aux autres (sans que les autres s’en aperçoivent !). Un élément avec la propriété CSS position à relative peut devenir la référence de coordonnées pour ses éléments fils (les décalages – top, right, bottom et left – sont relatifs au bloc parent) 
- absolute 
Contrairement aux deux précédentes méthodes de positionnement 
Un élément absolute : retiré du flux  
Peut alors être placé n’importe où, sans affecter les autres éléments de la page 
La position se définit grâce aux mêmes propriétés (top, right, bottom, left) par rapport à la page (distance par rapport à chacun des bords de l’élément parent) 
- fixed : Se positionne comme un élément absolute mais reste fixée (même si on se déplace sur la page)  
