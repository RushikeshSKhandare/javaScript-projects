const firebaseConfig = {
  apiKey: "AIzaSyDYQxoFMDV5gKie-E8zg_lz6CCXHcYOvcM",
  authDomain: "notion-it-chat.firebaseapp.com",
  projectId: "notion-it-chat",
  storageBucket: "notion-it-chat.appspot.com",
  messagingSenderId: "432618414673",
  appId: "1:432618414673:web:0ec827619226dae0f0ce70",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
// console.log(app);
// console.log(db)

//  This Javascript code for Index page
function myfunc() {
  // storing the input data in variables
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var userName = firstname + " " + lastname;

  firebase
    .firestore()
    .collection("users")
    .add({
      Firstname: firstname,
      Lastname: lastname,
    })

    .then((ref) => {
      // storig the data in local storage in from of json
      localStorage.setItem(
        "user",
        JSON.stringify({
          userName: userName,
          id: ref.id,
        })
      );
      window.location.href = "/chat.html";
    });
  // redirecting my page to new chat page
}

function getallmsg() {
  db.collection("chat")
    .orderBy("time")
    .onSnapshot((querySnapshot) => {
      document.getElementById("box").innerHTML = "";
      querySnapshot.forEach((doc) => {
        // console.log(doc.data)
        showchat(doc.data());
      });
    });
}
getallmsg();
// This is for chat page !
function myfunc1() {
  var inputtext = document.getElementById("textarea").value;
  var user = JSON.parse(localStorage.getItem("user"));
  firebase
    .firestore()
    .collection("chat")
    .add({
      message: inputtext,
      time: Date.now(),
      id: user.id,
      userName: user.userName,
    })

    .then((ref) => {
      return ref.id;
    });

  if (document.getElementById("textarea").value !== "") {
  }
  document.getElementById("textarea").value = "";
}
   // This function is for Showing chat 
function showchat(doc) {
  console.log(doc);
  var mymsg = document.getElementById("box");
  var nameinlocalStorage = JSON.parse(localStorage.getItem("user"));
  var div = document.createElement("div");
  if (nameinlocalStorage.userName == doc.userName) {
    div.setAttribute("class", "mymsg");
    div.innerHTML = `
    
    <div id="mytext">
    <div>
    <small >${doc.userName}</small>
    <p> ${doc.message} </p>
    </div>
        
    <img src="https://spng.pngfind.com/pngs/s/176-1760995_png-file-svg-user-icon-free-copyright-transparent.png"
    alt="user_name" id="userimg" />
        </div>
        
        `;
      } else
      // This inner HTML for the others msg
    div.innerHTML = `
    <div id="othermsg">
          <img  src="https://spng.pngfind.com/pngs/s/176-1760995_png-file-svg-user-icon-free-copyright-transparent.png"
            alt="user_name"
            id="userimg"/>
          <div id="usermsg">
          <small >${doc.userName}</small>
          <p> ${doc.message} </p>
          </div>
          </div>
       
         `;
  mymsg.append(div);
  mymsg.scrollTop= mymsg.scrollHeight
}
