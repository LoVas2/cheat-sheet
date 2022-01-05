## Explication conf

Conf dans '/etc/nginx/site-enabled' pour les websockets, la registry ,la gate et l'api

1. Upstream -> on définit un alias (permet de définir 2 webapp pour le même service)
2. Listen tel port
3. Sur le nom de domaine server_name
4. Applique la conf dans location

server_name : conf correspondant à ce nom de domaine sur le port 'listen' (443)

locatation /XXXX/ -> applique la conf sur ce chemin

proxy-pass -> redirect vers ça

on achete un nom de domaine (lva.com), après on peut créer autant de sous-domaine qu'on veut. On associe un sous-domaine à une adresse IP. (côté OVH)
