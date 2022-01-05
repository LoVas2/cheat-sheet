# Container

Les conteneurs sont des images de l'application qui peuvent tournés sur n'importe quel OS.
Ils incluent les dépendances/librairies nécessaires pour lancer une appli.

Un conteneur est immuable, on ne peut pas changer son code au runtime. Il faut déployer une nouvelle image.

K8s supporte plusieurs type de conteneur : Docker, containerd, CRI-O.

## Image
Avant de pouvoir utiliser une image dans K8s, il faut la pusher sur la registry.

Par défaut si on ne met pas de tag dans la spec d'un Pod, K8s utilise *latest*.
Il est déconseillé d'utiliser ça pour la Prod.

Pour forcer K8s à télécharger les dernières images disponibles, on peut soit mettre la propriété *imagePullPolicy* à *Always* ou utiliser le tag *:latest*.

La valeur de *imagePullPolicy* est assigné qu'à la création de l'objet. Si on vient à modifier le tag de l'image pour mettre *:latest*, il faudra changer manuellement la politique d'image de l'objet.

**Private registry :**
Pour accéder à un registry privé, on peut soit : 
* Configurer les noeuds pour s'authentifier (partager par tous les pods). Effectué par l'admin du cluster
* Pré-téléchargé les images
* Spécifier un secret au niveau du pod pour s'authentifier

**Runtime Class :**
Il est possible de spécifier quel environnement de container utiliser pour chaque pod. Selon si on a envie de privilégier la sécurité ou la performance.

**Container Lifecycle Hooks:**
On peut intercepter 2 événements dans la vie d'un container : *PostStart* (juste après que le container soit créé), *PreStop* (juste avant que l'arrêt).
Quand on intercepte ces 2 événements, on peut soit appeler une commande (pre-stop.sh) ou exécuter une requête HTTP.

# Pods
## Généralité
Les Pods sont la plus petite unité déployable sur K8s. Un Pod consiste à 1 ou plusieurs containers partageant le **stockage** et le **réseau**.
La plupart du temps : 1 pod = 1 container, cad 1 Pod run une seule instante d'une application. On passe ensuite par la *réplication* pour avoir plusieurs instances. 

Les Pods sont schédulé 1 et 1 seule fois. Il ne changera plus de noeud après. Si le noeud tombe, les Pods sont programmés pour être arrêtés au bout d'un certain temps. 

Il est possible d'ajouter un *initContainer* qui se lance lors de l'initialisation du pod ou des *ephemeral containers* pour debugger.
On peut modifier ou remplacer les Pods via les verbes *patch* et *replace*.

A chaque Pod est assigné une adresse IP. Donc chaque containers dans un Pod partage cette IP. 
Les containers à l'intérieur d'un Pod peuvent communiquer entre eux via localhost sinon via IP networking.

**Static Pods :** Manager directement par Kubelete et non par l'API (et donc les controller). Lié à 1 et 1 seul noeud. But principal : utilisé pour superviser les components du control plane.

## Lifecycle
Les Pods ont le cycle suivant :
* Pending : Juste après que le Pod soit schédulé, les conteneurs ne sont pas encore prêts (téléchargement des images en cours)
* Running : Au moins 1 conteneur a démarré
* Succeeded : tous les conteneurs sont démarrés
* Failed : tous les contenais sont terminés ou 1 est en erreur.
* Terminating : pod en cours de suppression

Les Pods ne se surveillent pas eux-mêmes mais c'est effectué par les controllers. Les Pods ne sont jamais "reschédulé" mais remplacé avec le même nom mais un UID différent.
Les volumes attachés à un Pod suivent le même cycle (Pod supprimé -> volume supprimé)

Kubelet est capable de redémarrer les conteneurs en fonction de certaines erreurs. 
Lifecycle des containers : *Waiting*, *Running* et *Terminated*.
On peut spécifier si le conteneur peuvent être redémarré via la propriété ``restartPolicy``. Valeurs possibles : *Always* (default), *OnFailure* et *Never*

## Container probes
Les Probes sont des diagnostics effectués par kubelet. Il permet de vérifier l'état du conteneur. Il existe 3 types d'implémentation :
* ExecAction : exécute une commande à l'intérieur du conteneur
* TCPSocketAction : TCP check sur l'adresse IP et sur un port.
* HTTPGetAction : requête HTTP en GET sur un chemin (réponse doit être >= 200 et < 400)

Les 3 types de probes :
* livenessProbe : indique si le conteneur est lancé et OK. Exemple healthCheck
* readinessProbe : indique si le conteneur est prêt. Envoyer du traffic qu'après ce check
* startupProbe : indique si le conteneur est démarré. Pour les conteneurs prenant du temps à démarrer

## Termination of Pods
1. kubectl delete pod ... (défaut grace period = 30sec)
1. Pod est flaggé comme "Terminating" par le Control Plan
1. Kubelet voit que le Pod est indiqué comme "Terminating" -> lance le shutdown
    1. PreStop des conteneurs
    1. Kubelet send TERM signal aux process
1. En // le control plan supprime le Pod des EndPoints    
1. Fin du grace period -> SIGKILL sur les process restant

Pour éviter les erreurs sur les suppressions manuelles mais involontaires des Pods on peut intégrer la notion de *PodDisruptionBudget*. Cela permet d'interdire de supprimer un Pod si le nombre de pod en cours ne respecte pas cette limite.

## Pod-template-hash label
The pod-template-hash label is added by the Deployment controller to every ReplicaSet that a Deployment creates or adopts.

This label ensures that child ReplicaSets of a Deployment do not overlap. It is generated by hashing the PodTemplate of the ReplicaSet and using the resulting hash as the label value that is added to the ReplicaSet selector, Pod template labels, and in any existing Pods that the ReplicaSet might have.



