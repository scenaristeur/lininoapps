function notifyMe() {
  // Voyons si le navigateur supporte les notifications
  if (!("Notification" in window)) {
    alert("Ce navigateur ne supporte pas les notifications desktop");
  }

  // Voyons si l'utilisateur est OK pour recevoir des notifications
  else if (Notification.permission === "granted") {
    // Si c'est ok, cr�ons une notification
    var notification = new Notification("Salut toi !");
  }

  // Sinon, nous avons besoin de la permission de l'utilisateur
  // Note : Chrome n'impl�mente pas la propri�t� statique permission
  // Donc, nous devons v�rifier s'il n'y a pas 'denied' � la place de 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      // Quelque soit la r�ponse de l'utilisateur, nous nous assurons de stocker cette information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // Si l'utilisateur est OK, on cr�e une notification
      if (permission === "granted") {
        var notification = new Notification("Salut toi !");
      }
    });
  }

  // Comme �a, si l'utlisateur a refus� toute notification, et que vous respectez ce choix,
  // il n'y a pas besoin de l'ennuyer � nouveau.
}