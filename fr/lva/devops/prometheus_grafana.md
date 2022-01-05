Ajout d'un service dans Prometheus / Grafana 
* Les services exposent les métrics au EndPoint /management/prometheus. (Il faut autoriser les curl vers ce endpoint niveau sécu)
* Il faut modifier la conf de Prometheus pour qu'il récupére les métrics toutes les 5 sec. (Prométheus récup ces infos, les mets dans une BDD et Grafana est un outil graphique pour afficher ces données).
* Optionnel : on peut rajouter des tags aux données récupérées par Prométheus par service
* Fichier de conf dans /home/ubuntu/prometheus-grafana-compose/data/prometheus et rajouter une configuration du service
* Reload la conf de Prom avec la commande "curl -X POST http://localhost:9091/-/reload"
* Vérifier que la configuration a bien été prise en compte sur l'interface d'admin de Prométheus : "https://monitoring-preprod:9092"
* Grafana lit automatiquement toutes les données possibles dans la BDD de Prométheus
