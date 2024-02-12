// import App from "./App.js";
import App from "./App_en.js";
import NotesAPI from "./NotesAPI.js";
const root = document.getElementById("app");
const app = new App(root);


const setAppUserPublicity = (APIsetUsernameFunc, appObj) =>{
    const userEntry = NotesAPI.getUserEntry('ciri', '123456');
    console.log(userEntry);
    APIsetUsernameFunc(appObj, userEntry['publicity']);
};

// setAppUserPublicity(NotesAPI.setAppUserPublicity, App);
