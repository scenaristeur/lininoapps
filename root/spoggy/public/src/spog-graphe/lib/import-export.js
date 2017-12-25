// recupere du projet Github/scenaristeur/Spog
function exportJson(network) {
  var textToWrite = "";
  var fileNameToSaveAs = "spog_nodes_edges_" + Date.now() + ".json";
  var textFileAsBlob = "";

  console.log("export Json");
  console.log(network.body.data);
  var nodes_edges = { nodes: network.body.data.nodes.get(), edges: network.body.data.edges.get() };
  console.log(nodes_edges);
  var nodes_edgesJSON = JSON.stringify(nodes_edges);
  console.log(nodes_edgesJSON);
  textFileAsBlob = new Blob([nodes_edgesJSON], {
    type:
    'application/json'
  }
);
var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
if(navigator.userAgent.indexOf("Chrome") != -1)
{
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  console.log("CHROME");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else
{
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  console.log("FF");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.target="_blank";
  //downloadLink.onclick = destroyClickedElement;
  //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  console.log(this.$.popupTtl);
}
console.log(downloadLink);
/*downloadLink.click();*/
/* creation d'un event car download.click() ne fonctionne pas sous Firefox */
var event = document.createEvent("MouseEvents");
event.initMouseEvent(
  "click", true, false, window, 0, 0, 0, 0, 0
  , false, false, false, false, 0, null
);
downloadLink.dispatchEvent(event);
var app = this;
setTimeout(function(){
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadLink);
}, 100);
/*if (window.URL != null) {
// Chrome allows the link to be clicked
// without actually adding it to the DOM.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else {
// Firefox requires the link to be added to the DOM
// before it can be clicked.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.onclick = destroyClickedElement;
downloadLink.style.display = "none";
document.body.appendChild(downloadLink);
}
downloadLink.click();*/
}
function exportTtl() {
  /* source https://github.com/scenaristeur/dreamcatcherAutonome/blob/master/autonome/public/agents/ExportAgent.js */

  var nodes = this.nodes.get();
  var edges = this.edges.get();
  console.log("exportation");
  console.log(nodes);
  console.log(edges);
  //creation des statements (triplets)
  /*var statements = [];
  for (var j = 0; j < edges.length; j++){
  var edge = edges[j];
  console.log(edge);
  statements.push({sujet: node.id, propriete: "rdfs:label", objet: node.label});
}
console.log(statements);*/

var output = "@prefix : <http://smag0.blogspot.fr/tempPrefix#> . \n";
output += "@prefix owl: <http://www.w3.org/2002/07/owl#> . \n";
output += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n";
output += "@prefix xml: <http://www.w3.org/XML/1998/namespace> . \n";
output += "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n";
output += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . \n";
output += "@prefix smag: <http://smag0.blogspot.fr/tempPrefix#> . \n";
output += "@base <http://smag0.blogspot.fr/tempPrefix> . \n";
output += "<http://smag0.blogspot.fr/tempPrefix> rdf:type owl:Ontology ;  \n";
output += "                    owl:versionIRI <http://smag0.blogspot.fr/tempPrefix/1.0.0> . \n";
output += " \n";
output += "owl:Class rdfs:subClassOf owl:Thing .  \n";

var listeInfos = new Array();
var listeComplementaire = new Array();

for (var i = 0; i < edges.length; i++) {
  var edge = edges[i];

  var sujet = edge.from;
  var propriete = edge.label;
  var objet = edge.to;


  //string.indexOf(substring) > -1
  console.log(sujet);
  console.log(propriete);
  console.log(objet);

  var sujetWithPrefix = this.validRdf(sujet);
  var proprieteWithPrefix = this.validRdf(propriete);
  var objetWithPrefix = this.validRdf(objet);

  if (sujetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
  sujetWithPrefix = ':' + sujetWithPrefix;
}

if (proprieteWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
proprieteWithPrefix = ':' + proprieteWithPrefix;

}

if (objetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
objetWithPrefix = ':' + objetWithPrefix;
}


var typedeProp = ["owl:AnnotationProperty", "owl:ObjectProperty", "owl:DatatypeProperty"];
var indiceTypeDeProp = 1; // -1 pour ne pas ajouter la prop, sinon par defaut en annotationProperty, 1 pour Object, 2 pour Datatype --> revoir pour les datatypes

if ((proprieteWithPrefix == "type") || (proprieteWithPrefix == ":type") || (proprieteWithPrefix == "rdf:type")) {
  proprieteWithPrefix = "rdf:type";
  listeComplementaire.push(objetWithPrefix + " rdf:type owl:Class . \n");
  indiceTypeDeProp = 1;


} else if ((proprieteWithPrefix == "subClassOf") || (proprieteWithPrefix == ":subClassOf") || (proprieteWithPrefix == "rdfs:subClassOf")) {
  proprieteWithPrefix = "rdfs:subClassOf";

}
else if ((proprieteWithPrefix == "sameAs") || (proprieteWithPrefix == ":sameAs")) {
  proprieteWithPrefix = "owl:sameAs";
  indiceTypeDeProp = -1;
}
else if ((proprieteWithPrefix.toLowerCase() == "ispartof") || (proprieteWithPrefix.toLowerCase() == "partof") || (proprieteWithPrefix.toLowerCase() == ":ispartof") || (proprieteWithPrefix.toLowerCase() == ":partof") || (proprieteWithPrefix.toLowerCase() == ":ispartof")) {
  proprieteWithPrefix = "smag:partOf";
  indiceTypeDeProp = 1;

} else if ((proprieteWithPrefix.toLowerCase() == "comment") || (proprieteWithPrefix.toLowerCase() == "commentaire") || (proprieteWithPrefix.toLowerCase() == "//") || (proprieteWithPrefix.toLowerCase() == "#")) {
  proprieteWithPrefix = "rdfs:comment";
  indiceTypeDeProp = -1;

}


if (indiceTypeDeProp >= 0) {
  listeComplementaire.push(proprieteWithPrefix + " rdf:type " + typedeProp[indiceTypeDeProp] + " . \n");
}
var data = sujetWithPrefix + " " + proprieteWithPrefix + " " + objetWithPrefix + " . \n";
listeInfos[i] = data;
}
console.log(listeInfos);
console.log(listeComplementaire);
//suppression des doublons
listeInfos = this.uniq_fast(listeInfos.sort());
listeComplementaire = this.uniq_fast(listeComplementaire.sort());
// console.log (listeInfos);
for (var k = 0; k < listeInfos.length; k++) {
  output = output + listeInfos[k];
  console.log(output);
}

for (var l = 0; l < listeComplementaire.length; l++) {
  output = output + listeComplementaire[l];
  console.log(output);
}


this.$.inputTextToSave.value = output; //     document.getElementById("inputTextToSave").value =output;
/*this.$.popupTtl.fitInto = this.$.menu;*/
this.$.popupTtl.toggle();
}

function saveTextAsFile(){
  var textToWrite="";
  var fileNameToSaveAs="";
  var textFileAsBlob="";
  var extension="ttl";
  var nomFichier="";

  //  console.log(data);

  if((typeof data != "undefined")&& (data.length>0)){
    textToWrite=data;
  }else{

    textToWrite = this.$.inputTextToSave.value;    //textToWrite = document.getElementById("inputTextToSave").value;
  }

  if ((typeof nomFichier != "undefined") && (nomFichier.length>0)){
    fileNameToSaveAs = nomFichier+"."+extension;
  }else{
    fileNameToSaveAs = this.$.inputFileNameToSaveAs.value+"."+extension; // fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+"."+extension;
  }


  if ((typeof extension != "undefined") && (extension.length>0)){
    switch(extension){
      case "ttl" :
      textFileAsBlob = new Blob([textToWrite], {
        type:
        'text/turtle'
      }
    );
    break;
    case "rdf" :
    //pas implementé pour l'instant
    textFileAsBlob = new Blob([textToWrite], {
      type:
      'application/rdf+xml'
    }
  );
  break;
  default :
  console.log("non traite  , extension : "+extension);
  break;
}
}


console.log(nomFichier+" : "+extension);



var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
//console.log(window.URL);
//if (window.URL != null)
if(navigator.userAgent.indexOf("Chrome") != -1)
{
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  console.log("CHROME");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else
{
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  console.log("FF");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.target="_blank";
  //downloadLink.onclick = destroyClickedElement;
  //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  console.log(this.$.popupTtl);
}
console.log(downloadLink);
/*downloadLink.click();*/
/* creation d'un event car download.click() ne fonctionne pas sous Firefox */
var event = document.createEvent("MouseEvents");
event.initMouseEvent(
  "click", true, false, window, 0, 0, 0, 0, 0
  , false, false, false, false, 0, null
);
downloadLink.dispatchEvent(event);
var app = this;
setTimeout(function(){
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadLink);
}, 100);
}

function validRdf(string){
  console.log(this.nodes.get(string));
  // transformer le noeud en noeud rdf (resource ou literal)
  // ajouter la construction du noeud, son uri, prefix, localname, type...
  /*var valid = "";
  valid.type = "uri";
  if ((string.contains(" ") || string{
  valid.type = "literal"
}*/
/*
replaceAll(string, " ","_");
replaceAll(string, "","_");
replaceAll(string, ",","_");
replaceAll(string, ";","_");
replaceAll(string, " ","_");
*/

return string;
}

function importJson(network){
  document.getElementById('importPopUp').style.display = 'block';
  var filepicker = document.getElementById('filepicker');
  filepicker.addEventListener('change', handleFileSelect, false);
  filepicker.network = network;
}

function handleFileSelect(evt) {
  var network = evt.target.network;
  var partageImport = document.getElementById('partageImport').checked;
  var remplaceNetwork = document.getElementById('remplaceNetwork').checked;
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0; i < files.length; i++) {
    // Code to execute for every file selected
    var fichier = files[i];
   console.log(fichier);
    var reader = new FileReader(); //https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file

  //  console.log(fichier);
    reader.addEventListener('load', function () {
      //  console.log(fichier);
      /*loadstart : La lecture vient de commencer.
      progress : Tout comme avec les objets XHR, l'événement progress se déclenche à intervalles réguliers durant la progression de la lecture. Il fournit, lui aussi, un objet en paramètre possédant deux propriétés, loaded et total, indiquant respectivement le nombre d'octets lus et le nombre d'octets à lire en tout.
      load : La lecture vient de se terminer avec succès.
      loadend : La lecture vient de se terminer (avec ou sans succès).
      abort : Se déclenche quand la lecture est interrompue (avec la méthode abort() par exemple).
      error : Se déclenche quand une erreur a été rencontrée. La propriété error contiendra alors un objet de type FileError pouvant vous fournir plus d'informations.*/
  //    console.log(this.result);
      //alert('Contenu du fichier "' + fichier.name + '" :\n\n' + reader.result);


      switch (fichier.type) {
        case "application/json":
    //    console.log("JSON");
        //  thisElement.dispatch('addNodesEdgesJSON', JSON.parse(reader.result));
    //    console.log(network);
        var nodes = JSON.parse(reader.result).nodes;
    //    console.log(nodes);
        var edges = JSON.parse(reader.result).edges;
    //    console.log(edges);
        network.beforeImport = [];
        network.beforeImport.nodes = network.body.data.nodes.get();
        network.beforeImport.edges = network.body.data.edges.get();
        network.body.data.nodes.update(nodes);
        network.body.data.edges.update(edges);
        /*if(remplaceNetwork){
          console.log(remplaceNetwork);
          network.body.nodes = new vis.DataSet([]);
          network.body.edges = new vis.DataSet([]);
          network.body.nodes = nodes // clear() ne semble pas fonctionner, à revoir
          network.body.edges= edges;
        }else{

          try{
        network.body.data.nodes.update(nodes);
        network.body.data.edges.update(edges);
      }
        catch(e){
          console.log(e);
        }
      }*/
        console.log(network);
        console.log(partageImport);
        break;
        case "rdf+xml":
        case "application/rdf+xml":
        console.log("fichier RDF"); //https://github.com/scenaristeur/dreamcatcherAutonome/blob/8376cb5211095a90314e34e9d286b820fbed335b/autonome1/public/agents/FichierAgent.js
        rdf2Xml(reader.result, thisElement);
        //  thisElement.dispatch('addTriplets', thisElement.triplets);// CREER UNE NOUVELLE ACTION POUR ENVOYER TS LES TRIPLETS
        break;
        case "turtle":
        case "text/turtle":
        case "application/turtle":
        console.log("fichier turtle");
        console.log("ce type de fichier n'est pas pris en compte (" + fichier.type + ")");
        ttl2Xml(reader.result, thisElement);
        //thisElement.dispatch('addTriplets', thisElement.triplets);
        break;
        default:
        console.log("ce type de fichier n'est pas pris en compte (" + fichier.type + ")");
        var extension = fichier.name.split('.').pop();
        console.log(extension);
        console.log(fichier);
        //  console.log(reader.result);
        if ((extension == "ttl") || (extension == "n3") || (extension == "n3t")) {
          //   sketch.ttl2Xml(reader.result);
          ttl2Xml(reader.result, thisElement);
          //  thisElement.dispatch('addTriplets', thisElement.triplets);
        } else if ((extension == "rdf") || (extension == "owl")) {
          //  sketch.data2Xml(reader.result); //if srdf
          rdf2Xml(reader.result, thisElement);
          //  thisElement.dispatch('addTriplets', thisElement.triplets);
        }
        else if ((extension == "json") || (reader.result.startsWith("[{"))) {
          // json2Xml(reader.result);
          //  thisElement.dispatch('addNodesEdgesJSON', JSON.parse(reader.result));
        } else {
          data2Xml(reader.result, thisElement);
        }
        console.log("fichier lu");
      }

      // thisApp.dispatch('update_triplets2add', this.triplets2add);

    });
    console.log(fichier);
    reader.readAsText(fichier);
  }
  console.log("fin");
  // Code to execute after that
  evt.target.files = null;
  document.getElementById('importPopUp').style.display = 'none';
}
