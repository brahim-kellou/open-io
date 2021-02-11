# Rapport Final : Projet WoT et capteurs Arduino <!-- omit in toc -->

Contrôle des flux d'entrée et de sortie en agissant sur les portes automatiques

- [1. Introduction](#1-introduction)
- [2. Les membres de l'équipe et répartition des rôles](#2-les-membres-de-léquipe-et-répartition-des-rôles)
- [3. Listes des tâches](#3-listes-des-tâches)
- [4. Bilan (travail réalisé)](#4-bilan-travail-réalisé)
  - [4.1 Matériel](#41-matériel)
    - [Matériel utilisés](#matériel-utilisés)
    - [Architecture matérielle](#architecture-matérielle)
  - [4.2 Logiciel](#42-logiciel)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Clients](#clients)
  - [4.3 Diagram de séquence](#43-diagram-de-séquence)
  - [4.4 Déploiement](#44-déploiement)
  - [4.5 Tests](#45-tests)
    - [Environnement de test physique](#environnement-de-test-physique)
    - [Environnement de test logiciel](#environnement-de-test-logiciel)
- [5 La gestion des problèmes](#5-la-gestion-des-problèmes)
- [6. Références](#6-références)


## 1. Introduction

Depuis le 11 mai 2020 et la publication par le gouvernement du protocole national de déconfinement, une des règles imposées aux magasins est de respecter une jauge de fréquentation maximum de 1 client pour 8 m² de surface de vente, soit 125 clients pour 1 000 m². Le Conseil national des centres commerciaux recommande même à ses adhérents 1 client pour 10 m², soit la norme incendie divisée par trois. « Ce calcul est moins avantageux pour les magasins mais plus simple à faire », précise le délégué général de l’association professionnelle Perifem, Franck Charton.

## 2. Les membres de l'équipe et répartition des rôles

Avec le Covid-19 et le respect des nouvelles règles sanitaires, les magasins sont contraints de compter les clients entrants et sortants pour respecter le niveau de fréquentation autorisé. l'équipe **OpenIO** a recensé une solution d’automatisation pour sortir des méthodes empiriques adoptées durant cette crise. En effet, notre but et de digitaliser pour mieux informer, les membres de l'équipe **OpenIO** sont :

- **ABDI Karim, p2019045** en tant que responsable du côté matériel.
- **KELLOU Brahim, p2021003** en tant que responsable du développement web.
- **SABOUR Oussama, p2020578** en tant que développeur arduino.
- **LARMITOU Arnaud, p2019764** en tant que développeur arduino
- **SALHI mohamed, p2020685** en tant que développeur
- **AGAGNA Radjaa, p2020608** en tant que chef de projet.

## 3. Listes des tâches

 Nom | Contenu | Affectation
---|---|---
 Développement Arduino | Développement et montage des arduinos <br/> Détection des personnes Ouvrir/fermer la porte déclencher les alertes | Karim, Oussama, Arnaud
 Développement Côté back-end | Connexion entre les deux clients | Brahim, Mohamed 
 Développement côté front-end | Gestion de la caméra <br/> Comptage des personnes | Brahim, Radjaa
 Déploiement VM (production) | Configuration de Nginx | Mohamed, Oussama
 Gestion de l’équipe | Gérer les réunions | Radjaa
 Analyser la qualité du projet | Tester le fonctionnement <br/> S’assurer que tout soit en corrélation avec l’idée du projet | Karim
 Documentation | Rédaction des rapports | Arnaud

## 4. Bilan (travail réalisé)

### 4.1 Matériel

#### Matériel utilisés

- 2 Arduinos
- 2 Boards
- 1 Servomoteur
- 1 Buzzer
- 2 LEDs (rouge et verte) 1 Photorésistant
- 1 Condensateur 100uF
- 4 Resistances 10 kilohms

#### Architecture matérielle

- Arduino Capteur

![Arduino Capteur](https://i.ibb.co/bL0FDPB/Rapport-002.jpg)

Le capteur est seulement composé d’une photorésistance, il est en charge d’envoyer un message au serveur lorsqu’une personne traverse.

- Arduino Actionneur

![Arduino Actionneur](https://i.ibb.co/1G5qn8X/Rapport-003.png)

L’actionneur reçoit un message pour ouvrir ou fermer la porte.

Lorsque le nombre de personnes maximum n’est pas encore atteint, la LED verte est allumée et la porte est ouverte.

Si le nombre maximum de personnes est atteint, la LED rouge va s’allumer, la porte va se fermer.

Une alerte sonore préviendra lorsque le nombre maximal est dépassé.

### 4.2 Logiciel

#### Frontend

L’application web se charge d’afficher le nombre des personnes exact ainsi elle permet de définir et changer le nombre max des personnes autorisés dans le magasin.

#### Backend

L’application web se charge d'envoyer des requêtes vers le serveur arduino détecteur pour signaler le dépassement de nombre max afin de fermer la porte (changement de direction du moteur) et allumer le led rouge.

#### Clients

Les arduinos sont les clients du serveur web, ils vont envoyer des informations au serveur web, comme la détection de passage, mais aussi recevoir des messages pour ouvrir et fermer la porte.

L’arduino capteur va seulement envoyer des messages au serveur, tandis que l’arduino actionneur va en recevoir sans envoyer.

Il s’agit plus d’un flot continu partant du capteur, qui va envoyer le message de détection au serveur, qui mettra à jour le nombre de personnes présentes, qui enverra ou non un message à l’actionneur pour interagir avec la porte.

### 4.3 Diagram de séquence

![Diagram de séquence](https://i.ibb.co/bg7Hy6V/Rapport-004.jpg)

### 4.4 Déploiement

Nous présentons dans qui se suit l’architecture de déploiement pour notre projet qui contient 3 serveurs, un serveur en local pour l’arduino actionneur un autre serveur en local pour l’arduino détecteur et un 3eme pour l’application web déployée sur la VM :

![Diagram de déploiement](https://i.ibb.co/7pnsnzn/Rapport-005.jpg)

### 4.5 Tests

#### Environnement de test physique

Pour tester le fonctionnement des capteurs, une installation a été mise en place afin de bien savoir si la luminosité est une bonne manière de détection de passage pour le projet.

On a donc installé une lampe face au capteur et regardé les valeurs rendues par le capteur.

A partir de là, une limite a été fixée en brute dans le code et on a fait passer des personnes entre la lampe et le capteur.

On a pu en conclure que les passages étaient bien détectés et que le projet pouvait continuer en restant sur la détection de luminosité.

#### Environnement de test logiciel

Pour tester le fonctionnement de la VM et application web ainsi que les 2 machines contenant les 2 serveurs détecteur et actionneur, une installation des 2 serveurs en local pour se connecter avec la VM à distance tout en utilisant le web socket.

## 5 La gestion des problèmes

De multiples problèmes matériels et techniques sont apparus tout au long du projet qui nous ont forcés à trouver des solutions rapidement.

Tout d’abord, la photorésistance captait des valeurs trop faibles, nous faisant questionner si la luminosité était une bonne manière de capter les passages de personnes.

Plusieurs solutions s’offraient alors à nous, trouver un moyen de faire fonctionner les passages avec luminosité, utiliser un émetteur/récepteur infrarouge ou un émetteur/récepteur ultrason.

Les autres modules n'étant pas disponibles ou fonctionnels, une solution a été trouvée avec la luminosité en utilisant une source lumineuse plus facilement captable par la photorésistance.

Sur l’arduino actionneur, le moteur tournait dans un sens mais pas dans l’autre, pour gérer ce problème, il y a tout d’abord eu un changement de moteur mais le problème subsistait.

Après plusieurs tests et un nouveau changement de moteur, tout était fonctionnel.

Un dernier problème est apparu lors du déploiement sur la machine virtuelle, les protocoles de websockets demandaient des configurations supplémentaires pour que l’application puisse fonctionner correctement.

## 6. Références

- [http://johnny-five.io/](http://johnny-five.io/)

- [https://www.lsa-conso.fr/sept-solutions-pour-gerer-le-comptage-des-clients,350349](https://www.lsa-conso.fr/sept-solutions-pour-gerer-le-comptage-des-clients,350349)

- [https://projetsdiy.fr/piloter-servomoteur-arduino/](https://projetsdiy.fr/piloter-servomoteur-arduino/)

- [https://www.youtube.com/watch?v=ybG6TLamn_I&t=381s&ab_channel=Arduino](https://www.youtube.com/watch?v=ybG6TLamn_I&t=381s&ab_channel=Arduino)
