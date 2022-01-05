# Deployment

Les Deployment définissent l'état désiré pour les Pods et les ReplicaSets. 
C'est pour les applications sans états. 
Géré par le Deployment Controller.
Il assure que 75% des Pods tournent lors de la maj et que max 125% de Pod sont schédulés.
Un nouveau Pod est toujours créé avant qu'un autre soit supprimé. 
Un nouveau RS est créé à chaque fois qu'un Deployment est maj. Le nombre de replicas des anciens RS est descendu à 0.

Commande | Description
--- | ---
`kubectl apply -f https://k8s.io/examples/controllers/nginx-deployment.yaml` | Créer un déploiement
`kubectl get deployments` | Voir les déploiements
`kubectl describe deployments` | Détail d'un déploiement
`kubectl get deployment nginx-deployment -o yaml` | Voir l'état d'un déploiement
`kubectl rollout status deployment/nginx-deployment` | Voir l'état en cours d'un déploiement
`kubectl get rs` | Voir les ReplicatSet créés
`kubectl rollout history deployment.v1.apps/nginx-deployment` | Voir l'historique
`kubectl rollout undo deployment.v1.apps/nginx-deployment` | Annuler la dernière modif
`kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=2` | Retourner à une version
`kubectl scale deployment.v1.apps/nginx-deployment --replicas=10` | Changer le nombre de replicas
`kubectl autoscale deployment.v1.apps/nginx-deployment --min=10 --max=15 --cpu-percent=80` | Définir la conf pour l'autoScale
`kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:sometag` | Modifier l'image
`kubectl rollout pause deployment.v1.apps/nginx-deployment` | Mettre en pause le déploiement pour appliquer un ensemble de modif
`kubectl rollout resume deployment.v1.apps/nginx-deployment` | Relancer le déploiement
`` |
`` |

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment # name of the Deployment
  labels:
    app: nginx
spec:
  replicas: 3 # Nbr of instance
  progressDeadlineSeconds: 120 # (optional) Nbr de secondes avant qu'un déploiement soit indiqué comme bloqué
  minReadySeconds: 120 # (optional) Nbr de secondes pour q'un Pod soit ready
  revisionHistoryLimit: 5 # (optional) Nbr de RS conservés pour le rollBack. (Défaut = 10). Consomme de la ressource dans etcd 
  strategy: # (optional)
    type: Recreate # RollingUpdate (default). Recreate supprime d'abord les Pods avant de les recréer
    rollingUpdate: # seulement quand le type est défini à RollingUpdate
      maxUnavailable: 0 # Nbr de Pods indispo pendant la maj. En integer ou en % (Défaut = 25%)
      maxSurge: 0 # Nbr de Pods en plus par rapport au désiré. Pour la maj.
  selector: # immutable
    matchLabels:
      app: nginx # defines which pods to manage
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```