Youhou Wahou ! 

Si vous lisez ce fichier, c'est que vous �tes en pr�sence d'une SmagYun ou que vous vous int�ressez au sujet.

Mais Smagyun, qu'est-ce que c'est ?

SmagYun est une pr�paration particuli�re de la carte Arduino Yun officielle.
SmagYun est "tunn�e" pour faciliter : 
- la d�couverte de la programmation, et de la robotique
- la d�couverte de l'�cosyst�me Arduino et des objets connect�s (iot)
- propose un environnement pr�t � l'emploi pour les d�veloppement d'application multi-utilisateurs ou de jeux multi-joueurs 


Pour des informations sur la carte Arduino Yun reportez-vous aux nombreuses documentations propos�es sur l'un des deux sites Arduino officiels ou ailleurs sur le net, �a ne manque pas.


Par o� commencer ?
L'Arduino Yun est un peu particuli�re de par sa configuration : une puce Arduino et une puce Linux. 
Elle fournit par d�faut un hotspot wifi "Arduino-Yun-XXXXXXXXXX" sur lequel on peut connecter un ordinateur ou un smartphone.
Une fois connect� � ce wifi, vous pouvez lancer votre navigateur � l'adresse http://192.168.240.1 pour voir la page d'accueil de la carte.
Cette page d'accueil peut �tre modifi�e, c'est le fichier "index.html" du r�pertoire /www dans le syst�me Linux de la carte.
Pour y acc�der plusieurs solutions s'offrent � vous : 
- depuis la page d'accueil : 
	- cliquez sur "ArduinoOs", saisissez le mot de passe de la carte (arduino par d�faut)
	- une fois entr� dans l'interface ArduinoOs, cliquez sur l'icone Arduino en haut � gauche, puis sur utility, et file Manager. Vous avez ici acc�s � l'ensemble des fichiers du syst�me Linux.
	- selectionnez sur la gauche "Arduino storage", et naviguez jusqu'au dossier /www
	- double-cliquez sur index.html, et selectionnez un editeur de texte (code mirror ou textpad)
	- faites les modifications souhait�es, et enregistrez votre fichier.
	- retournez � l'adresse http://192.168.240.1, vous devriez voir vos modification apparaitre.
- avec Winscp
- avec putty

le repertoire /www est un serveur web. sa configuration peut s'effectuer dans le fichier /etc/config/uhttpd

La pluplart des fichiers de config se trouve dans /etc ou /etc/config.
La configuration est modifiable via les commandes UCI

l'interface Arduinoos permet la plupart des op�rations de gestion de la carte.
L'interface Luci permet �galement d'effectuer des op�rations de la carte (bas�e sur OpenWrt)


Le r�pertoire Root est NodeJs
