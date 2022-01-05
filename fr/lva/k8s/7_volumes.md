#Volumes
Les conteneurs sont éphémères, quand un conteneur s'arrête on perd les fichiers associés. 
Il existe également un pb lorsqu'on veut partager des fichiers entre conteneurs dans un Pod.

C'est pour répondre à ces soucis que les **Volumes** de K8s entre en jeu. Il existe plusieurs types de volumes :
* Ephemeral volume : attaché à un Pod (le Pod meurt = le volume aussi)
* Persistent volume : reste en place quand le Pod n'existe plus

Dans les 2 cas, les volumes persistent quand les conteneurs sont redémarrés.

Pour utiliser un volume, il faut le spécifier au Pod dans la partie ```spec.volumes```et déclarer où les monter dans les conteneurs par ``spec.containers[*].volumeMounts``.
Les volumes sont rattachés à l'image dans le conteneur.

Exemple emptyDir :
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir: {}
```
# Persistent volume
Un *PersistentVolume* est un espace stockage qui a été créé par un admin ou créé dynamiquement par les *Storage Classes*.<br/>
L'état du PV est indépendant des Pods auxquels il est associé.

Un *PersistentVolumeClaim* est une requête pour stocker par un user. Comme les Pods consomment les ressources du noeud, les PVC consomme les ressources des PV.

Les PVs sont des ressources dans le cluster et les PVCs sont des requêtes pour ces ressources.

On peut créer un PV de 2 manières différentes :
* Static : créé par un admin du cluster. Le PV porte les détails du stockage réel. Il existe dans l'API de K8s et est disponible pour être consommé.
* Dynamic : quand aucun PV ne correspond à la requête d'un PVC d'un user, le cluster essaye de créer dynamiquement le volume. 
  Cette création est basée sur la StorageClass : le PVC doit indiquer la StorageClass et l'admin doit avoir auparavant créé et configuré cette class.
  Le cluster doit être configuré également en activant le *DefaultStorageClass*.
  
Les PVs sont protégé contre la suppression. Tant que tous les PVCs et les Pods liés à ce volume ne sont pas supprimés, le PV restera en vie.

### Lier les PV et les PVC
On peut lier un PV à des PVCs en spécifiant la propriété ``claimRef`` du PV. Le control vérifie alors ces données en plus de la *storageClass*, *accessMode* et l'espace de stockage requis.

### Étendre un PVC
Pour étendre un PVC il faut que sa storage class à la propriété `allowVolumeExpansion` à *true*.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: foo-pvc
  namespace: foo
spec:
  storageClassName: "" # Empty string must be explicitly set otherwise default StorageClass will be set
  volumeName: foo-pv
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: foo-pv
spec:
  storageClassName: ""
  claimRef:
    name: foo-pvc
    namespace: foo
```

## Définition du PV
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0003
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: slow
  mountOptions:
    - hard
    - nfsvers=4.1
  nfs:
    path: /tmp
    server: 172.17.0.2
```
* **capacity** : espace de stockage
* **volumeModes** : Filesystem ou Block. Le mode *Filesystem* monte le répertoire sur les Pods. Le mode *Block* défini le volume comme un "block device" dans un Pod sans filesystem.
* **accessModes** : ReadWriteOnce ou ReadOnlyMany ou ReadWriteMany. Dépend du type du volume.
* **storageClassName** : lie les PVs et les PVCs qui ont cette classe de définie.
* **persistentVolumeReclaimPolicy** : Retain ou Delete ou Recycle.  
    * Retain : le PV reste en place, un PVC pourra s'y reconnecter quand les données de l'ancien PVC seront supprimé par l'admin. 
    * Delete : le sera supprimé ainsi que les données.
    * Recycle : le volume est supprimé puis recréé (deprecated)

## Définition du PVC
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 8Gi
  storageClassName: slow
  selector:
    matchLabels:
      release: "stable"
    matchExpressions:
      - {key: environment, operator: In, values: [dev]}
```
## Utilisation dans les Pods
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: mypd
  volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: myclaim
```
