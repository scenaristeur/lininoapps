# 0smag

https://smag0.blogspot.fr/2017/08/smagyun-une-arduino-yun-preparee-pour.html
- Prerequis
L'appli "Smag0" nécessite l'accès à un serveur de données ouvertes.
Nous allons utiliser "Apache Fuseki" comme serveur aussi appelé endpoint.
Nous aurons besoin d'un dataset, un espace pour stocker nos données.
Nous pourrons ensuite découper ce dataset en graphes.

- Installer Nodejs, npm et le package bower

- Installer Apache Fuseki
téléchargez la dernière version du serveur Fuseki : https://jena.apache.org/download/index.cgi
décompressez-le et depuis ce répertoire, lancez la commande : fuseki-server
ceci devrait vous indiquer que le serveur est accessible sur le port 3030, c'est à dire à l'adresse http://127.0.0.1:3030
Vous pouvez vous y rendre et créer un dataset nommé "test"
Votre serveur est prêt

- Installer l'appli "0smag"

```
git clone https://github.com/scenaristeur/0smag.git
cd 0smag
npm install
cd public
bower install
cd ..
node .

```
ou en une ligne de commande :

```
git clone https://github.com/scenaristeur/0smag.git && cd 0smag && npm install && cd public && bower install && cd .. && node .

```

- Lancer l'appli "Smag0"
se placer dans le dossier 0smag et lancer "npm install" pour installer les dépendances node.js
se placer ensuite dans public et lancer "bower install"
revenir dans le dossier 0smag et lancer l'appli par "node ."
l'appli devrait se lancer et être accessible à l'adresse "http://127.0.0.1:3000"

- Vous pouvez gérer les droits d'accès au serveur Fuseki dans le fichier /fuseki/run/shiro.ini


voir aussi graphql : http://graphql.org/learn/
