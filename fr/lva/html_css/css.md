## S�lecteurs

cibler tous les liens de la page -> a { ..; }

 a img { border : dashed orange ; } 
-> toutes images sous un lien (m�me si balises interm�diaires entre le a et l�img) : avec bordures en pointill�s orange 

un �l�ment directement descendant d�un autre  
Ex. :   a > img { border : dashed orange ; }

p + img { border : dashed orange ;  } 
-> toutes les images qui suivent un paragraphe 

 p ~ img { border : dashed orange ; } 
-> toutes les images ayant un paragraphe comme fr�re (au niveau dans l�arborescence) 

header.titre { color : tomato ; } 
-> les balises header avec l�attribut class="titre" couleur tomate 

#sommaire { color : yellow ; } 
-> l��l�ment dont l�attribut id="sommaire" en jaune 

E[att] 
-> El�ment E contenant l�attribut att (sans valeur pr�cise) � CCS2 
Ex. :  
E[att="val"] 
-> El�ment E dont l�attribut att est exactement �gal � val � CSS2 

### Pseudo class :

:link   	-> les liens non visit�s 
:visited	-> les liens d�j� visit�s 
:hover	-> les liens survol�s par la souris 
:active	-> �l�ment activ� par l�utilisateur (entre la pression du bouton et son rel�chement) 
:focus	-> �l�ment recevant l�attention de l�utilisateur (ex. : saisie clavier) 
:first-child	-> le premier �l�ment re�oit le style indiqu� 
:before -> pour ins�rer un contenu avant un �l�ment 
:after -> pour ins�rer un contenu apr�s un �l�ment 
Ex. :   cite:before {content : open-quote ; } 
cite:after {content : close-quote ; } 
:first-letter -> pour affecter un style � la premi�re lettre d�un �l�ment 
:first-line -> pour affecter un style � la premi�re ligne d�un bloc 

## Les conteneurs : <div> et <span>

Constitu� de :
- D�un contenu (texte, paragraphe, image, etc�) 
- D�une marge int�rieure (padding) 
- D�une bordure (border), facultatives 
- D�une marge ext�rieure (margin)

Position :
- Static : par d�faut.  
- Relative : Se comporte comme un �l�ment static mais peut �tre d�plac� par rapport aux autres (sans que les autres s�en aper�oivent !). Un �l�ment avec la propri�t� CSS position � relative peut devenir la r�f�rence de coordonn�es pour ses �l�ments fils (les d�calages � top, right, bottom et left � sont relatifs au bloc parent) 
- absolute 
Contrairement aux deux pr�c�dentes m�thodes de positionnement 
Un �l�ment absolute : retir� du flux  
Peut alors �tre plac� n�importe o�, sans affecter les autres �l�ments de la page 
La position se d�finit gr�ce aux m�mes propri�t�s (top, right, bottom, left) par rapport � la page (distance par rapport � chacun des bords de l��l�ment parent) 
- fixed : Se positionne comme un �l�ment absolute mais reste fix�e (m�me si on se d�place sur la page)  
