#StatefulSets

Permet de gérer les applications stateful. Les Pods sont garantie d'être uniques et ordonnés.
Unlike a Deployment, a StatefulSet maintains a sticky identity for each of their Pods. These pods are created from the same spec, but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.

If you want to use storage volumes to provide persistence for your workload, you can use a StatefulSet as part of the solution. Although individual Pods in a StatefulSet are susceptible to failure, the persistent Pod identifiers make it easier to match existing volumes to the new Pods that replace any that have failed.

## Cas d'usage :
* Stable, unique network identifiers.
* Stable, persistent storage.
* Ordered, graceful deployment and scaling.
* Ordered, automated rolling updates.

# DaemonSet

Les DaemonSet assure qu'un Pod tourne sous tous les noeuds (ou ceux spécifiés).
Quand un noeud est rajouté au cluster, le pod l'est également.

## Cas d'usage :
* running a cluster storage daemon on every node
* running a logs collection daemon on every node
* running a node monitoring daemon on every node

# Job et CronJob

Permet de créer des exécutions de Pods.