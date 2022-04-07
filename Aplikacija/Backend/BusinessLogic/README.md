U bussines logic folderu se nalaze fajlovi sa funkcijama za obradu biznis logike

U ovom folderu se nalaze dva podfoldera, za asinhronu i sinhronu komunikaciju. U njima se nalaze konkretni fajlovi za implementaciju biznis logike

SyncLogic folder sadrzi logiku za funkcionalnosti sa neo4j bazom podataka.
AsyncLogic sadrzi logiku za message broker i perzistenciju push notifikacija kroz mySQL bazu.

Folder u async logic - pushNotif 
Odgovoran za push notifikacije ka front strani, sastoji se iz tri fajla: 
    1.Redis-config.js je konfiguracija za redis
    2.Socketio-config.js je konfiguracija za socket.io paket i implementacija singletona 
    3. PushNotification.js je wrapper oko poziva konkretnih socketio funkcija za slanje notifikacija