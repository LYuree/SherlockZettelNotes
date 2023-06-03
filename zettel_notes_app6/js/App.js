import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";
import Cookies from './js_cookies/js.cookie.mjs'
// import rake from '../node_modules/rake-js/src/lib/rake.ts'
// import rake from '../node_modules/rake-js/dist/lib/index.js'


export default class App{
    constructor(root){
        //these should also be assigned conditionally?
        this.root = root;
        this.notesMatrix = [];
        this.activeNoteId = null;
        this.activeSmallBody = null;
        this.activeSmallTitle = null;
        this.username = null;
        
        
        // Cookies.set('username', login, 1);
        // Cookies.set('password', password, 1);
        // Cookies.set('authenticated', false, 1);
        Cookies.set('authenticated', true, 1);
        // console.log(Cookies.get('authenticated'));

        // CODE MOVED FROM CALLSIGNINWINDOW
        // =================================

        this.modalSignInBackground = document.querySelector('.modal__sign-in__background');
        this.modalSignIn = document.getElementById('modal__sign-in');
        this.modalSignUpBackground = document.querySelector('.modal__sign-up__background');
        this.modalSignUp = document.getElementById('modal__sign-up');
        this.modalRakeWindowBackground = document.querySelector('.modal__rake_window__background');
        this.modalRakeWindow = document.getElementById('modal__rake_window');
        this.modalRakeWindowRefreshKeywordsBtn = document.querySelector('.modal__rake_window__users_keywords__refresh_keywords_button');
        this.modalRakeWindowRefreshCandidatesBtn = document.querySelector('.modal__rake_window__cowork_candidates__refresh_candidates_button');
        this.modalRakeWindowRefreshKeywordsLoaderBackgr = document.querySelector('.modal__rake_window__users_keywords__loader_mask');
        this.modalRakeWindowRefreshKeywordsLoader = document.querySelector('.modal__rake_window__users_keywords__loader');
        this.modalRakeWindowRefreshCoworkCandidatesLoaderBackgr = document.querySelector('.modal__rake_window__cowork_candidates__loader_mask');
        this.modalRakeWindowRefreshCoworkCandidatesLoader = document.querySelector('.modal__rake_window__cowork_candidates__loader');
        this.modalRakeWindowKeywordsTable = document.querySelector('.modal__rake_window__users_keywords__table');
        this.modalRakeWindowCoworkCandidatesTable = document.querySelector('.modal__rake_window__cowork_candidates__table');
        this.modalSignInBtn = document.querySelector('.modal__sign-in__button');
        this.modalSignUpBtn = document.querySelector('.modal__sign-up__button');
        this.modalSignInLogIn = document.querySelector('.modal__sign-in__login-input');
        this.modalSignInPassword = document.querySelector('.modal__sign-in__password-input');
        this.modalSignUpLogin = document.querySelector('.modal__sign-up__login-input');
        this.modalSignUpEmail = document.querySelector('.modal__sign-up__email-input');
        this.modalSignUpPassword = document.querySelector('.modal__sign-up__password-input');
        this.modalSignUpPasswordRepeat = document.querySelector('.modal__sign-up__repeat-password-input');
        this.modalSignInError = document.querySelector('.modal__sign-in__error-wrapper__flex-container');
        this.modalVerificationBackground = document.querySelector('.modal__verification_message__background');
        this.modalVerification = document.querySelector('.modal__verification_message');
        this.modalVerificationLink = document.querySelector('.modal__verification_message__authorize-link');
        this.modalSignInLink = document.querySelector('.modal__sign-in__register-link');
        this.modalSignUpLink = document.querySelector('.modal__sign-up__authorize-link');
        this.flaskButton = document.querySelector('.notes__navbar__analysis_button');
        this.modalRakeWindowCloseBtn = document.querySelector('.modal__rake_window__background__close_button');


        window.onbeforeunload = () => {

        };

        
        
        this.flaskButton.addEventListener('click', ()=>{
            this.modalRakeWindowBackground.classList.add('active');
            this.modalRakeWindow.classList.add('active');
        });

        this.modalRakeWindowCloseBtn.addEventListener('click', () => {
            this.modalRakeWindowBackground.classList.remove('active');
            this.modalRakeWindow.classList.remove('active');
        });

        this.modalRakeWindowRefreshKeywordsBtn.addEventListener('click', ()=>{
            this._refreshUsersKeywords();
        });



        // this.modalRakeWindowRefreshCandidatesBtn.addEventListener('click', ()=>{
        // });


        // this.modalLogInError = document.querySelector('.modal__sign-in__username-error');
        // this.modalPasswordError = document.querySelector('.modal__sign-in__password-error');
        this.modalSignInLink.addEventListener('click', () => {
            this.modalSignInBackground.classList.remove('active');
            this.modalSignIn.classList.remove('active');
            this.modalSignUpBackground.classList.add('active');
            this.modalSignUp.classList.add('active');
        });

        this.modalSignUpLink.addEventListener('click', () => {
            this.modalSignUpBackground.classList.remove('active');
            this.modalSignUp.classList.remove('active');
            this.modalSignInBackground.classList.add('active');
            this.modalSignIn.classList.add('active');
        });
        
        this.modalSignInBtn.addEventListener('click', () =>{
            const login = this.modalSignInLogIn.value.trim(),
                password = this.modalSignInPassword.value.trim();

                const _isAlpha = str => /^[a-zA-Z]*$/.test(str);

                if(!(login.length < 8) && !(login.length > 15) && (_isAlpha(login) || this._isValidEmail(login)) && !(password.length < 5)){
                    // get user!
                    const userEntry = NotesAPI.getUserEntry(login, password);
                    let notesArray = new Array();
                    if(userEntry['active'] == 'true') {
                        notesArray = NotesAPI.getNotes(login, password);
                        console.log(notesArray);

                        this.view = new NotesView(this, this.root, this._handlers());
                        this._setNotes(notesArray);
                        
                        Cookies.set('username', login, 1);
                        this.username = login;
                        Cookies.set('password', password, 1);
                        Cookies.set('authenticated', true, 1);
                        // new
                        this._initiateKeywords();
                        //
                        //loading...
                        this.modalSignInBackground.classList.remove('active');
                        this.modalSignIn.classList.remove('active');
                        this.view.notesSidebar.classList.add('active');
                    }
                    else{
                        // console.log(!(login.length < 8));
                        // console.log(!(login.length > 14));
                        // console.log(_isAlpha(login));
                        // console.log(!(password.length < 8));
                        // console.log(notesArray.password);
                        // console.log(notesArray.hash);
                        // console.log(notesArray.verified);
                        this.modalSignInLogIn.classList.add('error', 'wrong-username-or-pw');
                        this.modalSignInPassword.classList.add('error', 'invalid-password');
                        this.modalSignInError.classList.add('active');
                        // this.modalLogInInput.classList.add('error', 'invalid-username');
                        // this.modalLogInError.classList.add('active');
                        // this.modalPasswordInput.classList.add('error', 'invalid-password');
                        // this.modalPasswordError.classList.add('active');
                        // this.modalLogInError.innerHTML += 'Логин не может быть короче 8 символов.';
                        // this.modalPasswordError.innerHTML += 'Логин не может быть короче 8 символов.';
                    }
                }         
        });

        this.modalSignUpBtn.addEventListener('click', () => {
            console.log(this.modalSignUpLogin);
            console.log(this.modalSignUpEmail);

            const username = this.modalSignUpLogin.value.trim(),
                email = this.modalSignUpEmail.value.trim(),
                password = this.modalSignUpPassword.value.trim(),
                passwordRepeat = this.modalSignUpPasswordRepeat.value.trim();

            let inputError = false;

            if(username === '') {
                this._setErrorFor(this.modalSignUpLogin, "Имя пользователя не может быть пустым");
                inputError = true;
            }
            else if (username.length < 4 || username.length > 14){
                this._setErrorFor(this.modalSignUpLogin, "Имя пользователя должно состоять из 4-14 символов");
                inputError = true;
            }
            else if(this._checkLettersEN(username) === false){
                this._setErrorFor(this.modalSignUpLogin, "Имя пользователя должно содержать только символы a-z");
                inputError = true;
            }
            else {
                this._setSuccessFor(this.modalSignUpLogin);
                this._removeErrorFor(this.modalSignUpLogin);
            }

            



            if(email === '') {
                this._setErrorFor(this.modalSignUpEmail, "E-mail не может быть пустым");
                inputError = true;
            }
            else if (!this._isValidEmail(email)) {
                this._setErrorFor(this.modalSignUpEmail, 'E-mail недействителен');
                inputError = true;
            }
            else {
                this._setSuccessFor(this.modalSignUpEmail);
                this._removeErrorFor(this.modalSignUpEmail);
            }
        
        
        
            if(password === '') {
                this._setErrorFor(this.modalSignUpPassword, "Пароль не может быть пустым");
                inputError = true;
            }
            else if(password.length < 6 || password.length > 10){
                this._setErrorFor(this.modalSignUpPassword, "Пароль должен содержать 6-10 символов");
                inputError = true;
            }
            else {
                this._setSuccessFor(this.modalSignUpPassword);
                this._removeErrorFor(this.modalSignUpPassword);
            }
        
        
        
            if(passwordRepeat === '') {
                this._setErrorFor(this.modalSignUpPasswordRepeat, "Пароль не может быть пустым");
                inputError = true;
            }
            else if(passwordRepeat !== password) {
                this._setErrorFor(this.modalSignUpPasswordRepeat, "Пароли не совпадают");
                inputError = true;
            }
            else {
                this._setSuccessFor(this.modalSignUpPasswordRepeat);
                this._removeErrorFor(this.modalSignUpPasswordRepeat);
            }
            //SENDING A QUERY
            if(inputError != true){
                const response = NotesAPI.createUser(username, email, password);
                console.log(response);
                if(response.usernameExists === true){
                    this._setErrorFor(this.modalSignUpLogin, "Пользователь с таким именем уже существует");
                }
                else if(response.emailExists === true){
                    this._setErrorFor(this.modalSignUpEmail, "На этот адрес уже зарегистрирован другой аккаунт");
                }
                else {
                    //verification message window: active
                    this.modalVerificationLink.addEventListener('click', () => {
                        this.modalVerificationBackground.classList.remove('active');
                        this.modalVerification.classList.remove('active');
                        this.modalSignInBackground.classList.add('active');
                        this.modalSignIn.classList.add('active');
                    });
                    this.modalVerificationBackground.classList.add('active');
                    this.modalVerification.classList.add('active');
                }
            }
            

        });

        // =========================================
        // =========================================

        //move this to the auth function and set a condition:
        //it seems like Cookies.set accepts a string-value, so we can't assign boolean, undefined or null,
        //unless we create our own custom constructor
        if(Cookies.get('authenticated') === null || Cookies.get('authenticated') === undefined || Cookies.get('authenticated') == 'false'){
            this._callSignInWindow();
        }
        else{
            const notesArray = NotesAPI.getNotes(Cookies.get('username'), Cookies.get('password'));
            // console.log(notesArray);
            // if (notesArray.notes === null) {
            if (notesArray.verified === false) { 
                console.log(notesArray.password);
                console.log(notesArray.hash);
                console.log(notesArray.verified);
                this.modalSignInLogIn.classList.add('error', 'wrong-username-or-pw');
                this.modalSignInPassword.classList.add('error', 'invalid-password');
            }
            else{
                this.view = new NotesView(this, this.root, this._handlers());
                this._setNotes(notesArray);
                // Cookies.set('username', login, 1);
                this.username = Cookies.get('username');
                // Cookies.set('password', password, 1);
                Cookies.set('authenticated', true, 1);
                // new
                this._initiateKeywords();
                //
                //loading...
                this.modalSignInBackground.classList.remove('active');
                this.modalSignIn.classList.remove('active');
                this.view.notesSidebar.classList.add('active');
            }
        }
    }


    // haven't managed to get done with proper file imports

    // _extractKeywordsFromNote_obsolete(){
    //     if(this.notesMatrix.length > 0)
    //         for(note of notesMatrix){
    //             const keywordsFromNoteTitle = rake(note['name']).join(",");
    //             const keywordsFromNoteBody = rake(note['note_text']).join(",");
    //             const keywordsString = keywordsFromNoteTitle + ','
    //             + keywordsFromNoteBody;
    //             return keywordsString;
    //         }
    // }


    // now add an eventlistener with a callback of a method that'll call this._extractKeywords
    // + NotesAPI.pushKeywods

    
    _setErrorFor(inputElement, message){
        const formControl = ((inputElement.parentElement).parentElement).parentElement;
        const small = formControl.querySelector("small");
        //add error messge text inside small 
        small.innerText = message;
        formControl.classList.remove('success');
        formControl.classList.add('error');
    }

    _removeErrorFor(inputElement){
        const formControl = ((inputElement.parentElement).parentElement).parentElement;
        const small = formControl.querySelector("small");
        //add error messge text inside small 
        small.innerText = '';
        formControl.classList.remove('error');
    }

    _setSuccessFor(inputElement){
        (((inputElement.parentElement).parentElement).parentElement).classList.add('success');
    }

    _checkLettersEN(input){
        for(var i = 0; i < input.length; i++){
            if(!((input[i] >= 'a' && input[i] <= 'z') || (input[i] >= 'A' && input[i] <= 'Z'))) {
                console.log(input[i]);
                return false;
            }
        }
    }

    _isValidEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    _callSignInWindow(){
        this.modalSignUpBackground.classList.remove('active');
        this.modalSignUp.classList.remove('active');
        this.modalSignInBackground.classList.add('active');
        this.modalSignIn.classList.add('active');
    }

    _callSignUpWindow(){
        this.modalSignInBackground.classList.remove('active');
        this.modalSignIn.classList.remove('active');
        this.modalSignUpBackground.classList.add('active');
        this.modalSignUp.classList.add('active');
    }

    _setNotes(notesMatrix){
        console.log("SETTING YOUR NOTES");
        this.notesMatrix = notesMatrix;
        this.view.initiateNotesList(notesMatrix);
        // this.view.updatePreviewVisibility(true);
    }

    _setActiveNote(noteId){
        this.activeNoteId = noteId;
        this.view.updateActiveNote(noteId);
    }

    _initiateKeywords(){
        // console.log(this);
        console.log(Cookies.get('authenticated'));
        console.log(Cookies.get('authenticated') === "true" && this.username !== null);
        if(Cookies.get('authenticated') === "true" && this.username !== null){
            console.log("FUCKING SLAVE!");
            const keywords = NotesAPI.getKeywords(this.username);
            // copied from _refreshUsersKeywords
            const keywordTable = this.modalRakeWindowKeywordsTable;
            this._clearChildNodes(keywordTable);
            const rowClass = "modal__rake_window__users_keywords__table_row";
            for (let word of keywords){
                console.log(word);
                this._createTableRowHTML(keywordTable, 1, rowClass, [word['keyword']]);
            }
            this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList.remove('active');
            this.modalRakeWindowRefreshKeywordsLoader.classList.remove('active');
            // const keywordsString = noteKeywords.join(",");
            // // console.log("KEYWORDS STRING, APP: ", keywordsString);
            // NotesAPI.pushKeywords(this.username, note['id'], keywordsString);
        }
    }

    _refreshUsersKeywords(){
        for (let note of this.notesMatrix){
            this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList += 'active';
            this.modalRakeWindowRefreshKeywordsLoader.classList += 'active';
            let noteKeywords = NotesAPI.extractKeywords(note['note_text']);
            noteKeywords.push(note['name']);
            // for (let word of noteKeywords){
            //     console.log("Word before mutation: ", word);
            //     word = NotesAPI.shieldApostrophes(word);
            //     console.log("Word after mutation: ", word);
            // }
            // noteKeywords.forEach(NotesAPI.shieldApostrophes);
            noteKeywords = noteKeywords.map(str => NotesAPI.shieldApostrophes(str));
            const keywordTable = this.modalRakeWindowKeywordsTable;
            this._clearChildNodes(keywordTable);
            const rowClass = "modal__rake_window__users_keywords__table_row";
            for (let word of noteKeywords){
                this._createTableRowHTML(keywordTable, 1, rowClass, [word]);
            }
            this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList.remove('active');
            this.modalRakeWindowRefreshKeywordsLoader.classList.remove('active');
            const keywordsString = noteKeywords.join(",");
            // console.log("KEYWORDS STRING, APP: ", keywordsString);
            NotesAPI.pushKeywords(this.username, note['id'], keywordsString);
        }
    }


    // based on the general computer-science considerations,
    // it's generally quicker to remove the last element
    // of a collection then the first one
    _clearChildNodes(parent){
        while (parent.lastElementChild) {
            parent.removeChild(parent.lastElementChild);
          }
    }

    // _refreshUsersKeywords(){
    //     console.log(this.notesMatrix); //correct output
    //     const usersKeywordsArray = this._getUsersKeywords();
    //     console.log(usersKeywordsArray);
    //     // a string to be exploded into an array
    //     // in the .php-script
    //     const keywordString = usersKeywordsArray.join(",");
    //     console.log("APP, KEYWORDSTRING: ", keywordString);

    //     // YOU'RE NOT PASSING ANY SPECIFIC NOTE ID

    //     NotesAPI.pushKeywords(this.username, keywordString);        
    // }

    // _getUsersKeywords(){
    //     // console.log(this.notesMatrix);
    //     let usersKeywords = new Array();
    //     for (let note of this.notesMatrix){
    //         console.log("Note text: ", note['note_text']);
    //         // raw array of note body keywords with note id not specified
    //         const noteBodyKeywords = NotesAPI.extractKeywords(note['note_text']);
    //         const noteId = note['id'];
    //         const noteBodyKeyValuePairs = new Array();
    //         // attaching the note's id to each of its keywords
    //         for (word of noteBodyKeywords){
    //             noteBodyKeyValuePairs.push([noteId, word]);
    //         }
    //         console.log(noteBodyKeyValuePairs);
    //         // console.log("App, get user's keywords: ", noteBodyKeywords);
    //         usersKeywords.push([noteId, note['name']]);
    //         // usersKeywords = usersKeywords.concat(noteBodyKeywords); //concat works fine,
    //                                                     // but noteBodyKeywords is empty
    //         usersKeywords = usersKeywords.concat(noteBodyKeyValuePairs);
    //         // console.log(usersKeywords);
    //     }
    //     return usersKeywords;
    // }

    // _trimWhitespace(strings){
    //     for (let str in strings){
    //         str.trim();
    //         str = str.replace(/\s+/g, " ");
    //     }
    // }
    


    //  declare constant strings for cell classes
    _createTableRowHTML(parentalTable, numberOfCells, rowClass, cellValues){
        const newRow = document.createElement("tr");
        // const cells = new Array();
        // cellValues is an array
        for(let i = 0; i < numberOfCells; i++){
            const dataCell = document.createElement("td");
            dataCell.classList += rowClass;
            dataCell.innerHTML = cellValues[i];
            newRow.appendChild(dataCell);
            // cells.push(dataCell);
        }
        parentalTable.appendChild(newRow);
    }

    _handlers(){
        return {
            onNoteSearch: (substringToSearch, noteListItemsArray) => {
                for (let item of noteListItemsArray){
                    const itemSmallTitle = item.querySelector('.notes__small-title'),
                            itemSmallBody = item.querySelector('.notes__small-body');    
                    if(itemSmallTitle.innerHTML.toLowerCase().indexOf(substringToSearch) == -1 && itemSmallBody.innerHTML.toLowerCase().indexOf(substringToSearch) == -1){
                        item.style.display = 'none';
                    }
                    else item.style.display = 'block';
                }
            },

            onNoteSelect: noteId => {
                this._setActiveNote(noteId);
            },

            onNoteAdd: () => {     
                // const lastNote = this.view.notesContainer.lastElementChild;
                // console.log(lastNote);
                // console.log(this.view.notesContainer);
                // this.activeNoteId = (lastNote === null? 0 : +lastNote.id) + 1;
                const lastId = NotesAPI.noteSave(-1, "Новая заметка", "Введите текст...", this.username);
                console.log("onNoteAdd, id to add: ", lastId);
                this.view.createListItemHTML(lastId, "Новая заметка", "Введите текст...",
                    NotesView.getCurrentDateString());
            },

            onNoteEdit: () => {
                const newTitleText = this.view.inputTitle.value.trim(),
                    newBodyText = this.view.inputBody.value.trim();
                    console.log("onNoteEdit, activeNoteId: ", this.activeNoteId);
                NotesAPI.noteSave(this.activeNoteId, newTitleText, newBodyText, this.username);
                this.view.updateSmallActiveNote(newTitleText, newBodyText);
            },
            
            onNoteDelete: NotesAPI.noteDelete
        }
    }
    //this is meant to prevent the errors 
    //with the SQL-insert query
}
