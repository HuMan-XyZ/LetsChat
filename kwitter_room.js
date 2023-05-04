//ADD YOUR FIREBASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyBKpfbwngV8j1lwmq__l_-QHr5VFeuA1GU",
  authDomain: "kwitter-a54cd.firebaseapp.com",
  databaseURL: "https://kwitter-a54cd-default-rtdb.firebaseio.com",
  projectId: "kwitter-a54cd",
  storageBucket: "kwitter-a54cd.appspot.com",
  messagingSenderId: "297117749732",
  appId: "1:297117749732:web:7a9707664e62e0b3e3f7f1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}