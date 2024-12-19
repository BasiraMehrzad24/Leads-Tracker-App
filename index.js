
import { initializeApp } from "firebase/app";
import { getDatabase,ref ,push , onValue, remove} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCOWxywXYi5ZStCCdnIG1QGZmUFPq4pjHw",
    authDomain: "leads-tracker-app-ca3e0.firebaseapp.com",
    databaseURL: "https://leads-tracker-app-ca3e0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "leads-tracker-app-ca3e0",
    storageBucket: "leads-tracker-app-ca3e0.firebasestorage.app",
    messagingSenderId: "229644073990",
    appId: "1:229644073990:web:c02c2960643f6a5c3e5787"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB =ref(database ,"leads")



onValue(referenceInDB,function(snapshot){
const snapshotDoseExist = snapshot.exists();

    if (snapshotDoseExist){
    
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads)
    
    }

})

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function() {
remove(referenceInDB)
ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""

})