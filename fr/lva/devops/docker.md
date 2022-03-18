===================================================================================================================================================================
																			DOCKER
===================================================================================================================================================================

| Action                                                                         | Command                                                                                              |
|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Liste les images   											                                                 | 			docker images                                                                                     |
| Liste les containers 											                                               | 		docker ps -a                                                                                       |
| Créer une image                                                                | docker build -t MyImage .                                                                            |
| Créer un conteneur                                                             | docker create --name MyContainer MyImage                                                             |
| Créer un container et le garde up (depuis une image) : 		                      | 			docker run -t -d (detach) -p HOST_PORT:CLIENT_PORT (MACHINE(pc):CONTAINER) --name my_name myImage |
| Créer un conteneur et aller dedans                                             | docker run -it --net fftiam-ws-account_default identity_image bash                                   |
| Pour aller dans le container : 								                                        | 			docker exec -it my_name bash                                                                      |
| Pour supprimer un container :									                                         | 		docker rm containerID                                                                              |
| Pour supprimer une image                                                       | docker image rm imageId                                                                              |
| Aller dans un conteneur arrêter (créer un nouveau avec Override du entrypoint) | docker run -it --rm --entrypoint sh myImage                                                          |
| ***Compose***                                                                  |                                                                                                      |
| Créer les images                                                               | docker compose create                                                                                |
| Liste les images  										                                                   | docker compose images                                                                                |
| Liste les conteneurs									                                                  | docker compose ps                                                                                    |
| Démarre les images                                                             | docker compose start myImage                                                                         |
| Créer et démarre les containers                                                | docker compose up -d                                                                                 |
| Exécute la commande                                                            | docker compose run account bash (il faut que ``ENTRYPOINT ["/bin/bash", "-l", "-c" ]``)              |
| Supprime tout (Containers, Images, Vols, etc.)                                 | docker compose down --rmi all                                                                        |

docker-compose stop myImage && docker-compose rm -f myImage && docker-compose create myImage && docker-compose start myImage

Debug un container en Java 11
run -d -p 8083:8080 -p 5005:5005 -e JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,address=*:5005,server=y,suspend=n" myImage


Push to Gitlab Registry :
docker login registry.gitlab.com -u user -p 23xx.........
docker login registry.gitlab.com -u user -p 23xx.........
docker image tag myWebapp registry.gitlab.com/loic-perso/backend/myWebapp:4.0.4
docker image push registry.gitlab.com/loic-perso/backend/myWebapp:4.0.4


Ajouter variable d'environnement                                        ENV IDENTITY_PROVIDER_PUBLIC_KEY=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh3qDk3hy76qidYZufKTWSHB0nxP4PCbiPkzDL+1fr8ZcO+E5prQBHmDPdADmySqXo4Vi8BY3zUTRnTAKNiS/SiNhxb22wdTJTvI9yzUBk0BjmL3+oDKIgabTtdX21m8rjD+LBTDoO6kM48PMImwVXaMA3nZuo3FPmEVTXQztFEugbanoWvcxyeoDI2h4FRd4xofwzliwe9FIKs4uJJe79eTx1Qqlz0+c5jVsi12fFoxmKJU7HdhJJiuLfv6R6qhCKREOgop3QuIXEBcS77zNqsX85VsX5y+4sl61o70UH470LmqpQQ9Z1Cjsamzvl36zyMd/cL760INovFQKR4c3lwIDAQAB
Aller dans le conteneur                                                 ENTRYPOINT ["/bin/bash", "-l", "-c" ]


docker run -it -d --name identity -p 8081:8080 --network fftiam-ws-account_default identity_image bash