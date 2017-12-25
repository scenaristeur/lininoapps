Youhou Wahou ! 

Si vous lisez ce fichier, c'est que vous êtes en présence d'une SmagYun ou que vous vous intéressez au sujet.

Mais Smagyun, qu'est-ce que c'est ?

SmagYun est une préparation particulière de la carte Arduino Yun officielle.
SmagYun est "tunnée" pour faciliter : 
- la découverte de la programmation, et de la robotique
- la découverte de l'écosystème Arduino et des objets connectés (iot)
- propose un environnement prêt à l'emploi pour les développement d'application multi-utilisateurs ou de jeux multi-joueurs 


Pour des informations sur la carte Arduino Yun reportez-vous aux nombreuses documentations proposées sur l'un des deux sites Arduino officiels ou ailleurs sur le net, ça ne manque pas.


Par où commencer ?
L'Arduino Yun est un peu particulière de par sa configuration : une puce Arduino et une puce Linux. 
Elle fournit par défaut un hotspot wifi "Arduino-Yun-XXXXXXXXXX" sur lequel on peut connecter un ordinateur ou un smartphone.
Une fois connecté à ce wifi, vous pouvez lancer votre navigateur à l'adresse http://192.168.240.1 pour voir la page d'accueil de la carte.
Cette page d'accueil peut être modifiée, c'est le fichier "index.html" du répertoire /www dans le système Linux de la carte.
Pour y accéder plusieurs solutions s'offrent à vous : 
- depuis la page d'accueil : 
	- cliquez sur "ArduinoOs", saisissez le mot de passe de la carte (arduino par défaut)
	- une fois entré dans l'interface ArduinoOs, cliquez sur l'icone Arduino en haut à gauche, puis sur utility, et file Manager. Vous avez ici accès à l'ensemble des fichiers du système Linux.
	- selectionnez sur la gauche "Arduino storage", et naviguez jusqu'au dossier /www
	- double-cliquez sur index.html, et selectionnez un editeur de texte (code mirror ou textpad)
	- faites les modifications souhaitées, et enregistrez votre fichier.
	- retournez à l'adresse http://192.168.240.1, vous devriez voir vos modification apparaitre.
- avec Winscp
- avec putty

le repertoire /www est un serveur web. sa configuration peut s'effectuer dans le fichier /etc/config/uhttpd

La pluplart des fichiers de config se trouve dans /etc ou /etc/config.
La configuration est modifiable via les commandes UCI

l'interface Arduinoos permet la plupart des opérations de gestion de la carte.
L'interface Luci permet également d'effectuer des opérations de la carte (basée sur OpenWrt)


Le répertoire Root est NodeJs
