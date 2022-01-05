# Network
## Intro
K8s rassemble 4 concepts pour le réseau :
- Les conteneurs dans un Pod utilise le réseau vie loopback
- Le cluster fourni une communication entre les différents Pods
- Les Services permettent d'exposer une application en dehors du cluster
- On peut utiliser les services pour publier des endpoints à l'intérieur du cluster.

# Services
Les services permettent d'exposer un ensemble de Pods sur le réseau.
K8s fournit aux Pods leur propre adresse IP et un nom DNS.

Les services permettent de résoudre le pb que les Pods sont créés et supprimés à la volée et donc que leurs adresses IPs changent constamment.
Grâce aux services on résout ce pb.

Exemple de création d'un service :
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376 # possibilité d'utiliser le nom définit dans le Pod
```
Ce service est lié aux Pods ayant pour label "app=MyApp" et qui écoute sur le port TCP 9376.<br/>
K8s assigne une adresse IP à ce service (appelé *Custer IP*).<br/>
Le contrôleur pour les services scanne périodiquement les Pods qui correspondent au selector.<br/>

Pour faciliter les changements, il est possible de spécifier le nom du Port défini dans le Pod au lieu du numéro dans le targetPort.

## Services sans selector
Généralement les services font l'abstraction des Pods mais il est possible de les utiliser d'une autre manière. Par exemple :
* Pour se connecter à une BDD
* Pointer le service vers un autre service qui est dans un autre namespace
* Sélectionner seulement les backends que l'on souhaite.

Exemple :
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```
Comme le service n'a pas de sélecteur, l'objet Endpoint associé n'est pas créé automatiquement. Il faut alors le définir :
```yaml
apiVersion: v1
kind: Endpoints
metadata:
  name: my-service
subsets:
  - addresses:
      - ip: 192.0.2.42
    ports:
      - port: 9376
```

## Service Types
* **ClusterIP** : (default) expose le service uniquement dans le cluster. Assigne un cluster-internal IP.
* **NodePort** : Expose le service sur chaque IP des noeuds et sur le port static (le NodePort). On peut attaquer le service en dehors du cluster sur "\<NodeIp>:\<NodePort>". Le NodePort permet d'utiliser son propre système de load balancing.
* **LoadBalancer** : Expose le service à l'extérieur en utilisant un load balancer du Cloud Provider. (Un NodePort et un CluserIP service sont créés.)
* **ExternalName** : Map le service sur le champ "externalName" en retournant un "CNAME" DNS. 
* **Ingress** : Ce n'est pas un type de service mais d'objet. Agit comme un point d'entrée dans le cluster.
