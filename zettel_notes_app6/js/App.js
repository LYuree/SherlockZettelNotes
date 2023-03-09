import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";
import Cookies from './js_cookies/js.cookie.mjs'

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
        console.log(Cookies.get('authenticated'));

        // CODE MOVED FROM CALLSIGNINWINDOW
        // =================================

        this.modalSignInBackground = document.querySelector('.modal__sign-in__background');
        this.modalSignIn = document.getElementById('modal__sign-in');
        this.modalSignUpBackground = document.querySelector('.modal__sign-up__background');
        this.modalSignUp = document.getElementById('modal__sign-up');
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
                    const notesArray = NotesAPI.getNotes(login, password);
                    console.log(notesArray);
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
                        Cookies.set('username', login, 1);
                        this.username = login;
                        Cookies.set('password', password, 1);
                        Cookies.set('authenticated', true, 1);
                        //loading...
                        this.modalSignInBackground.classList.remove('active');
                        this.modalSignIn.classList.remove('active');
                        this.view.notesSidebar.classList.add('active');
                    }
                }          
                else{
                    // console.log(!(login.length < 8));
                    // console.log(!(login.length > 14));
                    // console.log(_isAlpha(login));
                    // console.log(!(password.length < 8));
                    this.modalSignInError.classList.add('active');
                    // this.modalLogInInput.classList.add('error', 'invalid-username');
                    // this.modalLogInError.classList.add('active');
                    // this.modalPasswordInput.classList.add('error', 'invalid-password');
                    // this.modalPasswordError.classList.add('active');
                    // this.modalLogInError.innerHTML += 'Логин не может быть короче 8 символов.';
                    // this.modalPasswordError.innerHTML += 'Логин не может быть короче 8 символов.';
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
            console.log(notesArray);
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
                // Cookies.set('authenticated', true, 1);
                //loading...
                this.modalSignInBackground.classList.remove('active');
                this.modalSignIn.classList.remove('active');
                this.view.notesSidebar.classList.add('active');
            }
        }
    }

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
        // console.log(this); //outputs App
        // this.modalSignInBackground = document.querySelector('.modal__sign-in__background');
        // this.modalSignIn = document.getElementById('modal__sign-in');
        // this.modalSignUpBackground = document.querySelector('.modal__sign-up__background');
        // this.modalSignUp = document.getElementById('modal__sign-up');
        // this.modalSignInBtn = document.querySelector('.modal__sign-in__button');
        // this.modalLogInInput = document.querySelector('.modal__sign-in__login-input');
        // this.modalPasswordInput = document.querySelector('.modal__sign-in__password-input');
        // this.modalSignInError = document.querySelector('.modal__sign-in__error-wrapper__flex-container');
        // this.modalSignInLink = document.querySelector('.modal__sign-in__register-link');
        // this.modalSignUpLink = document.querySelector('.modal__sign-up__authorize-link');
        // // this.modalLogInError = document.querySelector('.modal__sign-in__username-error');
        // // this.modalPasswordError = document.querySelector('.modal__sign-in__password-error');
        // this.modalSignInLink.addEventListener('click', () => {
        //     this.modalSignInBackground.classList.remove('active');
        //     this.modalSignIn.classList.remove('active');
        //     this.modalSignUpBackground.classList.add('active');
        //     this.modalSignUp.classList.add('active');
        // });

        // this.modalSignUpLink.addEventListener('click', () => {
        //     this.modalSignUpBackground.classList.remove('active');
        //     this.modalSignUp.classList.remove('active');
        //     this.modalSignInBackground.classList.add('active');
        //     this.modalSignIn.classList.add('active');
        // });
        
        // this.modalSignInBtn.addEventListener('click', () =>{
        //     const login = this.modalLogInInput.value.trim(),
        //         password = this.modalPasswordInput.value.trim();

        //         const _isAlpha = str => /^[a-zA-Z]*$/.test(str);

        //         if(!(login.length < 8) && !(login.length > 14) && _isAlpha(login) && !(password.length < 6)){
        //             const notesArray = NotesAPI.getNotes(login, password);
        //             console.log(notesArray);
        //             if (notesArray === null) {
        //                 this.modalLogInInput.classList.add('error', 'wrong-username-or-pw');
        //                 this.modalPasswordInput.classList.add('error', 'invalid-password');
        //             }
        //             else{
        //                 this.view = new NotesView(this, this.root, this._handlers());
        //                 this._setNotes(notesArray);
        //                 Cookies.set('username', login, 1);
        //                 this.username = login;
        //                 Cookies.set('password', password, 1);
        //                 Cookies.set('authenticated', true, 1);
        //                 //loading...
        //                 this.modalSignInBackground.classList.remove('active');
        //                 this.modalSignIn.classList.remove('active');
        //                 this.view.notesSidebar.classList.add('active');
        //             }
        //         }          
        //         else{
        //             console.log(!(login.length < 8));
        //             console.log(!(login.length > 14));
        //             console.log(_isAlpha(login));
        //             console.log(!(password.length < 8));
        //             this.modalSignInError.classList.add('active');
        //             // this.modalLogInInput.classList.add('error', 'invalid-username');
        //             // this.modalLogInError.classList.add('active');
        //             // this.modalPasswordInput.classList.add('error', 'invalid-password');
        //             // this.modalPasswordError.classList.add('active');
        //             // this.modalLogInError.innerHTML += 'Логин не может быть короче 8 символов.';
        //             // this.modalPasswordError.innerHTML += 'Логин не может быть короче 8 символов.';
        //         }
        // });

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

    // _refreshNotes(username, password) {
    //     const notesMatrix = NotesAPI.getAllNotes(username, password);
    //     // this._setNotes(notesMatrix);
    // }

    _setNotes(notesMatrix){
        this.notesMatrix = notesMatrix;
        this.view.initiateNotesList(notesMatrix);
        // this.view.updatePreviewVisibility(true);
    }

    _setActiveNote(noteId){
        this.activeNoteId = noteId;
        this.view.updateActiveNote(noteId);
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
                const lastNote = this.view.notesContainer.lastElementChild;
                console.log(lastNote);
                console.log(this.view.notesContainer);
                this.activeNoteId = (lastNote === null? 0 : +lastNote.id) + 1;
                this.view.createListItemHTML(this.activeNoteId, "Новая заметка", "Введите текст...",
                    NotesView.getCurrentDateString());
                NotesAPI.noteSave(this.activeNoteId, "Новая заметка", "Введите текст...", this.username);
            },

            onNoteEdit: () => {
                const newTitleText = this.view.inputTitle.value.trim(),
                    newBodyText = this.view.inputBody.value.trim();
                NotesAPI.noteSave(this.activeNoteId, newTitleText, newBodyText, this.username);
                this.view.updateSmallActiveNote(newTitleText, newBodyText);
            },
            
            onNoteDelete: NotesAPI.noteDelete
        }
    }
    //this is meant to prevent the errors 
    //with the SQL-insert query
}
