* configuration file : ``/usr/local/etc/mongod.conf``
* log directory : ``/usr/local/var/log/mongodb``
* data directory : ``/usr/local/var/mongodb``
* Start services : ``brew services start mongodb-community@3.6``
* Se connecter à mongo : ``mongo (db_name)``


* **Insert** : 					db.inventory.insertOne( { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } } )
* **Find** : 					db.inventory.find( {} ) 		ou 			db.inventory.find( { item: "canvas" } )
* **List Collections** : 		db.getCollectionNames()
