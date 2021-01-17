# Pré_rapport : Projet WoT et capteurs Arduino



#### 1) Titre : Contrôle des flux d'entrée et de sortie en agissant sur les portes automatiques

#### 2) Scénario d’utilisation et membres du groupe :

Nombre de personnes, distance, masque, test, amende, voyage... En pleine épidémie de Covid-19, le respect des nouvelles règles sanitaires, les magasins sont contraints de compter les clients entrants et sortants pour respecter le niveau de fréquentation autorisé. Dans un but de répondre à cette problématique l’équipe **OpenIO** composée de :

- *ABDI Karim : p2019045,*
- *KELLOU Brahim : p2021003,*
- *SABOUR Oussama : p2020578,*
- *LARMITOU Arnaud : p2019764,*
- *SALHI mohamed : p2020685,*
- *AGAGNA Radjaa : p2020608.*

A suggéré de proposer un projet qui permet de contrôler en temps réel le nombre de personnes qui entrent et sortent du magasin et aussi qui sont dans la surface de vente. La jauge maximale d’accueil est réglable via un portail logiciel. Des alertes visuelles sous forme de code couleur (vert/rouge) sont envoyées lorsque la limite fixée est sur le point d’être atteinte, pour avertir et afficher l’information au public. Ces avertissements vont permettre par la suite de prendre les décisions nécessaires, comme la fermeture ou l’ouverture d’une porte automatique. Pour résumer le scénario : Des bandeaux leds positionnés à l’entrée s’affichent au vert et les portes s’ouvrent si la jauge de fréquentation n’est pas dépassée et au rouge dans le cas contraire, et les portes se referment. Dès qu’une sortie est détectée, le système la prend en compte pour repasser au vert. 



#### 3) Architecture matérielle:

  Dans ce projet, nous allons utiliser deux arduinos :

- Le premier aura pour rôle de détecter si une personne rentre dans un magasin, et par la suite envoyer un signal à notre serveur afin d’incrémenter le nombre de personnes présentes.

- Le deuxième permettra d’ouvrir la porte ou la fermer selon le nombre de personnes présentes dans le magasin. Aussi il permettra de déclencher des alertes visuelles sous forme de code couleur (vert/rouge), tels que :	

  	- Si un led vert est allumé, alors la porte est ouverte.      
  	- Si un led rouge est allumé, alors la porte est fermée.	

  	- Si le buzzer bip cela veut dire qu’il y a eu une alerte concernant le nombre de personnes présentes dans la salle. 

  Dans un but de mieux contrôler le nombre de personnes présentes, nous avons jugé utile de rajouter une ou plusieurs caméras (selon l’avancement du projet ). Cette dernière(s) va(vont) recalculer le nombre de personnes présentes et envoie(ent) une alerte si la jauge maximale est atteinte.

  

#### 4) Architecture logicielle :

Notre architecture logicielle est comme suit:

![](https://i.ibb.co/j6G7Fnd/djklm-unknown.png)



- Une API REST sur notre serveur est exposée au détecteur arduino,
- Une API REST sur notre serveur est exposée à l’application frontend,
- Un protocole de communication Websocket de notre serveur vers l’actionneur.



#### 5) APIs / Interactions entre les composants

Le projet est constitué de 2 parties la partie d’application web ainsi que la partie d’arduino et les composants qui gèrent les différentes fonctionnalités nous expliquons dans 2 parties la relation entre l’arduino et les des différentes composantes et le 2eme coté la relation matériel et l’application web.



##### 	1) Interactions entre les composants

​	Nous disposons de 2 arduinos et les composants suivants : les leds (rouge et vert en cas de dépassement 	de le nombre maximum des personnes dans le magasin) sur un arduino ainsi que le crochet d’ouverture 	et fermeture et bazzar sonor en cas d'alarme sur l’autre arduino nous trouverons le détecteur de             mouvement.

##### 	2) Interactions avec les APIs

​	Nous disposons aussi des caméras liées avec l’application web pour analyser le nombre exact des personnes et, suivant cette information, nous augmentons le nombre présent dans le magasin, si on dépasse le nombre maximum .



#### Schéma :

![](https://i.ibb.co/9VfnF1s/lhjoue.png)



#### 6) Description de l'utilisation du standard WoT 

- ##### A Web Thing MUST at least be an HTTP/1.1 server

Le serveur sera chargé de mettre en relation les deux Arduinos dont l’un sera le capteur et l’autre sera l’actionneur.Un Serveur HTTP sera donc installé pour pouvoir communiquer avec les deux objets.

- ##### A Web Thing MUST have a root resource accessible via an HTTP URL

Une page d'accueil affichera le nombre de personnes présentes dans la pièce et permettra d’ouvrir ou fermer la porte principale à distance.L’accès à la caméra des objets devant la porte sera aussi disponible.On pourra aussi changer la limite de personnes maximale possible dans la pièce.

- ##### A Web Thing MUST support GET, POST, PUT and DELETE HTTP verbs

Le verbe GET sera utilisé pour l’affichage des pages HTMLs et pour la récupération des données sur le nombre de personnes dans la pièce et pour l’état actuel de la porte.POST établira la limite maximale des personnes.PUT sera utilisé pour les modifications manuelles comme l’ouverture/fermeture de la porte et la limite maximale de personne dans la pièce.DELETE supprime l’historique d’un jour/période sur le nombre de personnes présentes.

- ##### A Web Thing MUST implement HTTP status codes 200, 400, 500

Les différents codes seront implémentés pour faciliter le contrôle à distance de l’objet et communiquer sur les ressources et l’état de l’objet.

- ##### A Web Thing MUST support JSON as default representation

Les objets communiqueront en JSON pour récupérer l’état actuel de l’objet, modifier ses variables ou prendre le contrôle à distance de l’objet (caméra, porte).

- ##### A Web Thing MUST support GET on its root URL

La page d’accueil renverra une page HTML avec les données récupérées et enregistrées par l’objet.





#### ANNEXE:

1. https://electrotoile.eu/fabrication-diy-porte-poulailler-automatique-arduino.php
2. https://ouiaremakers.com/posts/tutoriel-diy-arduino-et-porte-automatique-de-poulailler
3. https://aurelient.github.io/tiw8/2019/TP4/
4. https://www.lsa-conso.fr/sept-solutions-pour-gerer-le-comptage-des-clients,350349
5. http://model.webofthings.io/#level-0-must