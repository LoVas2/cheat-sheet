# Services

Description des services dans ``/etc/systemd/system/``.
Le '#' sert à passer des variables à l'intérieur du fichier. Tt ce qui est derriere l'@ remplacera %i.

*Exemple de nom de fichier* : ``my_service@.servicce``

*Exemple de configuration par défaut*:
````commandline
[Unit]
Description=mon-service Apps with conf. : service%i.env
After=syslog.target

[Service]
User=deploy
EnvironmentFile=/home/deploy/services/my_service/service%i.env
ExecStart=/home/deploy/services/my_service/current.war
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
````

Restart service & log : 
``sudo /bin/systemctl restart my_service@1.service && journalctl -f -u my_service@1.service``

Alias des serveurs de prod : dans .ssh/config
````commandline
Host my-server-ovh
  Hostname 51.XXX.XXX.XXX
````

## New service example
1. Créer le script de déploiement
    - ``scp current.war deploy@my-server-ovh:/home/www/services/my_service/new_current_dateDuJour.war``
    - ``ln -s /home/www/services/my_service/new_current_dateDuJour.war /home/www/services/my_service/current.war``
    - ``sudo /bin/systemctl restart my_service``
2. Créer le répo sur le serveur et le fichier de conf
3. Créer un service dans '/etc/systemd/system'
````
   [Unit]
   Description=my_service Apps
   After=syslog.target

   [Service]
   User=deploy
   EnvironmentFile=/home/deploy/services/my_service/service.env
   ExecStart=/home/deploy/services/my_service/current.war
   SuccessExitStatus=143

   [Install]
   WantedBy=multi-user.target
````
