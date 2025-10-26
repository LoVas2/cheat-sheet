# Partial response

Pour éviter de transférer toutes les données d'une API à un consommateur, il existe plusieurs solutions : 

- GraphQL : Solution assez lourde à mettre en place surtout pour le client qui doit connaître la structure des données. Le cache n'est pas efficace car chaque requête remonte des données différentes
- Paramètres 'fields' : Solution custom utilisée par Facebook et Google
- Hateoas : Les données annexes sont récupérées via un nouvel appel API grâce aux liens attachés à la réponse de l'objet principal. Chaque client est responsable d'appeler ou non l'API pour avoir des données supplémentaires
- Paramètres *true* / *false* sur les types de donnée, exemple : ```photo=true```