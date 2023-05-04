//YOUR FIRE BASE LINKS
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
room_name = localStorage.getItem("room_name");
document.getElementById("msg").addEventListener("keydown", send1());

function send1(e){

}

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
  //document.getElementById("msg").focus();
  //document.getElementById("btn1").blur();
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name1 = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
        
        //End code
      }
    });
  });
}
getData();

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  if(likes==10){
    window.alert("You can give a maximum of 10 likes to a message")
    document.getElementById("firebase_message_id").disabled=true
    
  }
  else{
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });
  }
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}