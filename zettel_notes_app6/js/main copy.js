// import NotesAPI from "./NotesAPI.js";
import Cookies from './js_cookies/js.cookie.mjs'
//use ./ instead of js/, cuz that's a relative link
console.log(Cookies.get('authenticated'));

const modalSignInBackground = document.querySelector('.modal__sign-in__background'),
        modalSignIn = document.getElementById('modal__sign-in'),
        modalSignInBtn = document.querySelector('.modal__sign-in__button'),
        modalLogInInput = document.querySelector('.modal__sign-in__login-input'),
        modalPasswordInput = document.querySelector('.modal__sign-in__password-input');
        




// if(Cookies.get('authenticated') === null || Cookies.get('authenticated') === undefined){
//     // requestAnimationFrame(() => {
//     //     getComputedStyle(modalSignInBackground);
//     //     console.log(modalSignInBackground);
//     //     requestAnimationFrame(() =>{


//             console.log(modalSignInBackground);
//             // modalSignInBackground.style.opacity = '1';
//             modalSignInBackground.classList.add('active');
//             modalSignIn.classList.add('active');
            
//             modalSignInBtn.addEventListener('click', () =>{
//                 const login = modalLogInInput.value.trim(),
//                     password = modalPasswordInput.value.trim();

//                     // const stringIsAlpha = function(ch){
//                     //     return typeof ch === "string" && ch.length === 1
//                     //            && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
//                     //   } //typeof относится к ch, а не ко всей условной конструкции :)


//                     const isAlpha = str => /^[a-zA-Z]*$/.test(str);
//                     if(login.length < 4 || login.length > 12 || !isAlpha(login)){
                        
//                     }
                
//                     const xhr = new XMLHttpRequest(),
//                     url = 'index.php',
//                     params = 'login=' + login + 'password=' + password;
//                     xhr.open('POST', url);
//                     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//                     xhr.onreadystatechange = function() {
//                         if(xhr.readyState === 4 && xhr.status === 200){
//                             console.log('query sent and processed!');
//                             const result = JSON.parse(xhr.response);
//                             switch (result) {
//                                 case 'fail':
//                                     //output wrong username or pw
//                                     break;
//                                 case 'success':
//                                     break;
//                             }
//                         }
//                     }

//                     xhr.send(params);
//                 });
//             // });
//         // });
// };

    // const searchField = document.querySelector(".search__note");

    // searchField.addEventListener("keypress", (event) => {
    //     if (event.key == "Enter"){
    //         substringToSearch = searchField.value.toLowerCase();
    //         const listItemsArray = notesContainer.getElementsByClassName('note__list-item');
    //         for (item of listItemsArray){
    //             const itemSmallTitle = item.querySelector('.notes__small-title'),
    //                     itemSmallBody = item.querySelector('.notes__small-body');

    //             if(itemSmallTitle.innerHTML.toLowerCase().indexOf(substringToSearch) == -1 && itemSmallBody.innerHTML.toLowerCase().indexOf(substringToSearch) == -1){
    //                 item.style.display = 'none';
    //             }
    //             else item.style.display = 'block';
    //         }
    //     }
    // })


    // function sidebarClickHandler(event){
    //     const eventTarget = event.target;
    //     const targetClassList = event.target.classList;


    //     if(targetClassList.contains("notes__delete")){
    //         console.log("Note deletion event...");
    //         const confirmDeletion = confirm('Вы действительно хотите удалить эту заметку?');
    //         const idToRemove = eventTarget.parentNode.id;
            
    //         if(confirmDeletion){

    //             //============================
    //             //call NotesAPI.noteDelete
    //             //============================



    //             // const xhr = new XMLHttpRequest(),
    //             // url = 'index.php',
    //             // noteId = idToRemove,
    //             // params = "idToDelete=" + noteId;
    //             // // params = 'orem=ipsum&name=binny';
    //             // xhr.open('POST', url, true);
            
    //             // //Send the proper header information along with the request
    //             // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
    //             // xhr.onreadystatechange = function() {//Call a function when the state changes.
    //             //     if(xhr.readyState == 4 && xhr.status == 200) {
    //             //         // console.log(xhr.responseText);
    //             //         console.log("Deleting a note from a database...");
    //             //         // text_body.value = '1';    
    //             //     }
    //             // }
            
    //             // xhr.send(params);
    //             // eventTarget.parentNode.remove();



    //         }

    //     }
    //     else{
    //             if (targetClassList.contains("notes__small-title") || targetClassList.contains("notes__small-body") || targetClassList.contains("notes__small-updated"))
    //             {
    //                 eventTargetParent = eventTarget.parentNode;
    //                 activeNoteId = eventTargetParent.id;

    //                 smallTitle = eventTargetParent.querySelector('.notes__small-title');
    //                 smallBody = eventTargetParent.querySelector('.notes__small-body'); 
    //                 // console.log(smallTitle); 
    //                 // console.log(smallBody);          
    //             }
    //             else if(targetClassList.contains("note__list-item"))
    //             {
    //                 // console.log("ITEM!");
    //                 activeNoteId = eventTarget.id;
    //                 smallTitle = eventTarget.querySelector('.notes__small-title');
    //                 smallBody = eventTarget.querySelector('.notes__small-body');
    //                 // console.log(smallTitle); 
    //                 // console.log(smallBody);           
    //             }
    //             // console.log(activeNoteId);

    //             // console.log(eventTarget, targetClassList);
                
    //             const smallTitleText = smallTitle.innerHTML,
    //                 smallBodyText = smallBody.innerHTML;

    //             // console.log(smallTitleText);
    //             // console.log(smallBodyText);


    //             console.log(title);
    //             console.log(body);

    //             title.value = smallTitleText;
    //             body.value = smallBodyText;
    //             notesView.style.display = "flex";
    //         }

    
    // }



    //========================================================================
    //SETTING UP THE NOTE VIEW
    //========================================================================

    // let activeNoteId = null;

    // const notesView = document.querySelector('.notes__preview');
    // const notesContainer = document.querySelector('.notes__list-items__container');

    // let smallTitle = null,
    //     smallBody = null;

    // const title = notesView.querySelector('.notes__title'),
    //     body = notesView.querySelector('.notes__body');


    // notesContainer.addEventListener('click', sidebarClickHandler);

    // title.addEventListener('blur', () => {
    //     // const body = notesView.querySelector('.notes__title'),
    //         // title = notesView.querySelector('.notes__title');
    //     // console.log("Title blur-event has been fired!");
    //     const xhr = new XMLHttpRequest(),
    //         url = 'index.php',
    //         noteId = activeNoteId,
    //         noteTitle = title.value,
    //         noteText = body.value,
    //         params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText=" +  noteText;
    //         console.log(params);
    //     xhr.open('POST', url, true);
    
    //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    //     xhr.onreadystatechange = function() {//Call a function when the state changes.
    //         if(xhr.readyState == 4 && xhr.status == 200) {
    //             console.log("Updating title...");
    //         }
    //     }    
    //     xhr.send(params);

    //     smallTitle.innerHTML = noteTitle;
    // })



    // body.addEventListener('blur', () => {
    //     // const body = notesView.querySelector('.notes__title'),
    //         // title = notesView.querySelector('.notes__title');
    //         // console.log("Body blur-event has been fired!");
    //         const xhr = new XMLHttpRequest(),
    //         url = 'index.php',
    //         noteId = activeNoteId,
    //         noteTitle = title.value,
    //         noteText = body.value,
    //         params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText=" +  noteText;
    //         // params = 'orem=ipsum&name=binny';
    //         xhr.open('POST', url, true);
        
    //         //Send the proper header information along with the request
    //         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
    //         xhr.onreadystatechange = function() {//Call a function when the state changes.
    //             if(xhr.readyState == 4 && xhr.status == 200) {
    //                 // console.log(xhr.responseText);
    //                 console.log("Updating body...");
    //                 // text_body.value = '1';    
    //             }
    //         }
        
    //         xhr.send(params);

    //         smallBody.innerHTML = noteText;
    // })




    //========================================================================
    //========================================================================


    // const noteAddBtn = document.querySelector('.notes__add');

    // noteAddBtn.addEventListener('click', ()=>{
    //     const today = new Date();
    //     const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     const dateTime = date+' '+time;

    //     let idToAdd = +notesContainer.lastElementChild.id + 1;
    //     // idToAdd++;
    //     // console.log(notesContainer);
    //     // console.log(notesContainer.lastElementChild);
    //     console.log(idToAdd);


    //     activeNoteId = idToAdd;
        

    //     const newNote = document.createElement("div"),
    //         newNoteSmallTitle = document.createElement("div"),
    //         newNoteDeleteBtn = document.createElement("button"),
    //         newNoteSmallBody = document.createElement("div"),
    //         newNoteSmallUpdated = document.createElement("div");

    //         // smallTitleTextNode = document.createTextNode("New Note"),
    //         // smallBodyTextNode = document.createTextNode("New text..."),
    //         // smallUpdatedTextNode = document.createTextNode(`${dateTime}`);

    //     newNote.classList += "note__list-item";
    //     newNote.id = idToAdd;
    //     newNoteSmallTitle.classList += "notes__small-title";
    //     newNoteDeleteBtn.classList += "notes__delete";
    //     newNoteSmallBody.classList += "notes__small-body";
    //     newNoteSmallUpdated.classList += "notes__small-updated";

    //     // newNote.appendChild(smallTitleTextNode); //wtf, why
    //     newNoteSmallTitle.innerHTML = "New Note";
    //     newNoteDeleteBtn.innerHTML = " X ";
    //     newNoteSmallBody.innerHTML = "New text...";
    //     newNoteSmallUpdated.innerHTML = `${dateTime}`;
    //     newNote.appendChild(newNoteSmallTitle);
    //     newNote.appendChild(newNoteDeleteBtn);
    //     newNote.appendChild(newNoteSmallBody);
    //     newNote.appendChild(newNoteSmallUpdated);

    //     notesContainer.appendChild(newNote);

    //     title.value = "New Note";
    //     body.value = "New text...";
    //     notesView.style.display = "flex";

    //     smallTitle = newNoteSmallTitle;
    //     smallBody = newNoteSmallBody;

    //     const noteTitle = title.value,
    //     noteText = body.value;
    //     smallBody.innerHTML = noteText;

    //     const xhr = new XMLHttpRequest(),
    //         url = 'index.php',
    //         noteId = activeNoteId,
    //         params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText=" +  noteText;
    //         // params = 'orem=ipsum&name=binny';
    //         xhr.open('POST', url, true);
        
    //         //Send the proper header information along with the request
    //         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
    //         xhr.onreadystatechange = function() {//Call a function when the state changes.
    //             if(xhr.readyState == 4 && xhr.status == 200) {
    //                 // console.log(xhr.responseText);
    //                 console.log("Adding a new note...");
    //                 // text_body.value = '1';    
    //             }
    //         }
        
    //         xhr.send(params);


    // })

    // noteAddBtn.addEventListener('click', sendTestRequest);

    console.log('End of script. Callbacks are emerging now, if any.');

