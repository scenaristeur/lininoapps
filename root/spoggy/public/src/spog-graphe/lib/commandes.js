function catchCommande(message, network){
  // les retours se font sous forme de Array
  if (message.startsWith("/")) {
    console.log(message);
    switch(message) {
      case "/e":
      case "/export":
      case "/exportJson":
      exportJson(network);
      break;
      case "/i":
      case "/import":
      case "/importJson":
      importJson(network);
      break;
      case "/n":
      console.log("new graph");
      break;
      /*
      case "/p":
      case "/t":
      // non traité ici , mais par le serveur
      console.log("triplet, predicat ou noeud");
      break;*/
      default:
      return afficheCommandes();
    }
  }
}

function afficheCommandes(){
  //return([{id:":n", contenu: "nouveau Noeud (pas encore implémenté)"}, {id:":p", contenu: "nouveau Predicat ou Edge (pas encore implémenté)"}, {id:"/e", contenu: "exportJson"}, {id:"/i", contenu: "importJson"}, {id:":Sujet predicat Objet", contenu: "Commencez par ':', pour insérer un triplet"}]);
  return ([{id:"/e", contenu: "exportJson"}, {id:"/i", contenu: "importJson"}, {id:"::", contenu: "Commencez par '::', pour insérer un triplet"}]);
}
