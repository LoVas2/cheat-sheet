# Components
Quand on déploie sur Kubernetes on obtient un *cluster*. Un cluster est consititué d'un ensemble de machine physique.
Le cluster est constitué d'un ensemble de *noeuds* (VMs) sur lesquels tournent les conteneurs.
Chaque cluster à au moins 1 noeud.

Les noeuds (nodes) héberge les *pods* (ou workload).

Et le *control plan* gère les noeuds et les pods. 

En production, le control plan est sur plus serveurs et le cluster est composé de plusieurs noeuds pour être toujours disponible.
Le control plan exécute également les *controllers* qui sont des loop infinies pour vérifier l'état du cluster.

![components](images/components-of-kubernetes.svg)

## Control Plane
The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events (for example, starting up a new pod when a deployment's replicas field is unsatisfied).

Control plane components can be run on any machine in the cluster. However, for simplicity, set up scripts typically start all control plane components on the same machine, and do not run user containers on this machine. 

### kube-api-server
The API server is a component of the Kubernetes control plane that exposes the Kubernetes API. The API server is the front end for the Kubernetes control plane.

The main implementation of a Kubernetes API server is kube-apiserver. kube-apiserver is designed to scale horizontally—that is, it scales by deploying more instances. You can run several instances of kube-apiserver and balance traffic between those instances.

### etcd
Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.

If your Kubernetes cluster uses etcd as its backing store, make sure you have a back up plan for those data.

Kubernetes stores its serialized state in terms of the API resources by writing them into etcd.

### kube-scheduler 
Control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on.

Factors taken into account for scheduling decisions include: individual and collective resource requirements, hardware/software/policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

### kube-controller-manager
Control Plane component that runs controller processes.
Les controleurs sont des boucles infinies qui scanne l'état courant du cluster et applique des modifications pour s'approcher de l'état désiré. (Exemple : thermostat d'une piece)

Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process.

Some types of these controllers are:
* Node controller: Responsible for noticing and responding when nodes go down.
* Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
* Endpoints controller: Populates the Endpoints object (that is, joins Services & Pods).
* Service Account & Token controllers: Create default accounts and API access tokens for new namespaces.

### cloud-controller-manager
A Kubernetes control plane component that embeds cloud-specific control logic. The cloud controller manager lets you link your cluster into your cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with your cluster.
The cloud-controller-manager only runs controllers that are specific to your cloud provider. If you are running Kubernetes on your own premises, or in a learning environment inside your own PC, the cluster does not have a cloud controller manager.

As with the kube-controller-manager, the cloud-controller-manager combines several logically independent control loops into a single binary that you run as a single process. You can scale horizontally (run more than one copy) to improve performance or to help tolerate failures.

The following controllers can have cloud provider dependencies:
* Node controller: For checking the cloud provider to determine if a node has been deleted in the cloud after it stops responding
* Route controller: For setting up routes in the underlying cloud infrastructure
* Service controller: For creating, updating and deleting cloud provider load balancers

## Nodes
Un noeud peut être un serveur physique ou virtuel. Il est managé par le *control-plane* et contient les fonctionnalités pour lancer les Pods.
Généralement un cluster est composé de plusieurs noeuds.

Chaque noeud est composé de 3 composants : *kubelet*, un *container runtime*, et le *kube-proxy*.
Ces components tournent sur chaque noeud, ils maintiennent les pods à jour et fournissent le runtime environnement de K8s.

### kubelet
An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.

The kubelet takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy. The kubelet doesn't manage containers which were not created by Kubernetes.

### kube-proxy
kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept.

kube-proxy maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.

kube-proxy uses the operating system packet filtering layer if there is one and it's available. Otherwise, kube-proxy forwards the traffic itself.

### Container runtime
The container runtime is the software that is responsible for running containers.

Kubernetes supports several container runtimes: Docker, containerd, CRI-O, and any implementation of the Kubernetes CRI (Container Runtime Interface).

### Nodes Management
#### Création
On peut créer des noeuds de 2 manières différentes : 
* par kubelet sur un noeud qui s'auto enregistre. La propriété ``--register-node`` est utilisée 
* manuellemnt par kubectl

Après que le noeud soit créé, K8s vérifie qu'un kubelet s'est également enregistré au niveau du control plan.
Puis quand tous les services sont disponibles, le noeud est éligible pour lancer des pods.

Pour sécuriser la création/modification des noeuds on peut modifier le Node authorization mode et NodeRestriction admission plugin.

#### Modification
On peut ajouter des labels aux nodes, ainsi on peut définir dans les pods des nodes selectors qui permettent de lancer les pods que sur les noeuds choisis.

Pour indiquer qu'un noeud ne devrait plus lancer de pods, on le désactive via la commande : ``kubectl cordon $NODENAME``. C'est utilisé pour préparer les maj d'un noeud.

#### Informations
Pour récupérer les informations sur un noeud on utilise la commande : ``kubectl describe node <node-name>``.
On récupère comme informations :
* **Adresses** : Hostname, ExternalIp et InternalIp du noeud
* **Conditions** : statut et état du noeud (diskPressure, memoryPressure, PIDPressure, Network available)
* **Capacity and Allocatable** : CPU, mémoire et nombre maximum de pods
* **Info** : information générale (K8s version, docker, etc.)

Si le noeud n'est toujours pas prêt, tous les pods sont programmés pour être supprimés.

#### Lifetime

Les noeuds sont gérés par le *node controller* du control plane. Qui a pour rôle d'assigner un CIDR, assurer le lien entre les noeuds et les VMs du cluster, vérifier l'état des noeuds.

Heartbeats : envoyé par les noeuds lorsque le statut est mis à jour ou géré par le Lease object. <br/>
Cet objet présent dans le namespace *kube-node-lease* permet d'améliorer les performances du heartbeats quand le cluster grossi.
<br/> Le kubelet est chargé d'envoyer le statut et de créer et mettre en jour le lease object. 

## Addons
Addons use Kubernetes resources (DaemonSet, Deployment, etc) to implement cluster features. Because these are providing cluster-level features, namespaced resources for addons belong within the kube-system namespace.

Selected addons are described below; for an extended list of available addons, please see Addons.

### DNS
While the other addons are not strictly required, all Kubernetes clusters should have cluster DNS, as many examples rely on it.

Cluster DNS is a DNS server, in addition to the other DNS server(s) in your environment, which serves DNS records for Kubernetes services.

Containers started by Kubernetes automatically include this DNS server in their DNS searches.

### Web UI (Dashboard)
Dashboard is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage and troubleshoot applications running in the cluster, as well as the cluster itself.

### Container Resource Monitoring
Container Resource Monitoring records generic time-series metrics about containers in a central database, and provides a UI for browsing that data.

### Cluster-level Logging
A cluster-level logging mechanism is responsible for saving container logs to a central log store with search/browsing interface.


