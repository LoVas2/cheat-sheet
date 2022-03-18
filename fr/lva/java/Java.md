Héritage - Extends

Une classe ne peut hériter que d'une seule classe. 
Tout objet de la classe Fille peut dans ses méthodes utiliser tout élément de la classe Mère déclaré public ou protected.
La classe dérivée (fille) doit prendre en charge la construction de la classe de base.
On peut surcharger ou redéfinir les méthodes de la classe Mère dans la classe fille.

Abstract :
Une classe abstraite ne peut pas être étendue.
Une méthode abstraite doit obligatoirement être redéfinie dans les sous-classes.
Une méthode abstraite n'a pas de corps et est toujours contenue dans une classe abstraite.
Servent qu'à mettre en œuvre le polymorphisme.

## Thread
https://www.jmdoudoux.fr/java/dej/chap-threads.htm

### Sleep
La méthode static sleep() de la classe Thread permet de mettre en sommeil le thread courant pour le délai en millisecondes dont la valeur est fournie en paramètre.
Elle est bloquante, elle lève une exception de type InterruptedException au cours de son exécution si un autre thread demande l'interruption de l'exécution du thread.
Ne s'applique que sur le thread courant et il n'est pas possible de désigner le thread concerné.
Contrairement à la méthode wait() de la classe Object, la méthode sleep() ne libère pas les verrous qui sont posés par le thread.

### Join
La méthode join() de la classe Thread permet d'attendre la fin de l'exécution du thread. Elle peut lever une exception de type InterruptedException.
On peut passer un temps max d'attente join(1000).

### Priority
L'attribution d'une priorité supérieure permet simplement d'augmenter ses chances d'exécution.

Les valeurs possibles se situent entre :
Thread.MIN_PRIORITY : la valeur de la priorité minimale (0)
Thread.MAX_PRIORITY : la valeur de la priorité maximale (10)
Thread.NORM_PRIORITY : la valeur de la priorité normale (5)