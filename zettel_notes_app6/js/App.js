import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";
import Cookies from './js_cookies/js.cookie.mjs'
// import rake from '../node_modules/rake-js/src/lib/rake.ts'
// import rake from '../node_modules/rake-js/dist/lib/index.js'


export default class App{
    static KB = 2097152/2;

    constructor(root){
        //these should also be assigned conditionally?
        this.root = root;
        this.notesMatrix = [];
        this.activeNoteId = null;
        this.activeSmallBody = null;
        this.activeSmallTitle = null;
        this.username = null;
        this.memoryLimitKB = null;
        this.registrationDate = null;
        this.publicity = null;
        // table cell tag constants

        Object.defineProperty(this, "TD", {
            value: "td",
            writeable: false
        });
        
        Object.defineProperty(this, "TH", {
            value: "th",
            writeable: false
        });
        // const TD = "td";
        // const TH = "th";
        
        
        // Cookies.set('username', login, 1);
        // Cookies.set('password', password, 1);
        // Cookies.set('authenticated', false, 1);
        // Cookies.set('authenticated', true, 1);
        // console.log(Cookies.get('username'));

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
        this.modalRakeWindowUsername = this.modalRakeWindow.querySelector('.modal__rake_window__username');
        this.modalRakeWindowRegDate = this.modalRakeWindow.querySelector('.modal__rake_window__registration_date');
        this.modalRakeWindowPublicity = this.modalRakeWindow.querySelector('.modal__rake_window__publicity');
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
        this.modalVerification = document.getElementById('modal__verification_message');
        this.modalVerificationLink = document.querySelector('.modal__verification_message__authorize-link');
        this.modalSignInLink = document.querySelector('.modal__sign-in__register-link');
        this.modalSignUpLink = document.querySelector('.modal__sign-up__authorize-link');
        this.flaskButton = document.querySelector('.notes__navbar__analysis_button');
        this.modalRakeWindowCloseBtn = document.querySelector('.modal__rake_window__background__close_button');
        this.signOutBtn = document.querySelector('.notes__navbar__fas__fa-icons__sign-out');
        this.toggleVisibilityBtn1 = document.querySelector('.modal__sign-in__input-wrapper__toggle-visibility__img1');
        this.toggleVisibilityBtn2 = document.querySelector('.modal__sign-in__input-wrapper__toggle-visibility__img2');
        this.toggleVisibilityBtn3 = document.querySelector('.modal__sign-in__input-wrapper__toggle-visibility__img3');
        this.modalRakeWindowPublicityBtn = document.querySelector('.modal__rake_window__publicity_button');
        this.modalRakeWindowMemoryProgressBar = document.querySelector('.modal__rake_window__memory_progress_bar');
        this.modalRakeWindowMemoryProgressBarLabel = document.querySelector('.modal__rake_window__memory_progress_bar_label');

        this.modalRakeWindowMemoryProgressBar.style.width = (this.memoryLimitKB? (App.KB*2-this.memoryLimitKB)/(App.KB*2)*100.0 + '%' : '0');
        this.modalRakeWindowMemoryProgressBarLabel.innerText = `${this.memoryLimitKB ? (this.memoryLimitKB/App.KB).toFixed(2) : 0} ГБ / 2.00 ГБ свободно`;
        // console.log()


        window.onbeforeunload = () => {
            
        };

        this.modalRakeWindowPublicityBtn.addEventListener('click', () => {
            const accessOpen = NotesAPI.toggleAccountPublicity(this.username);
            // if(accessOpen != null && accessOpen != undefined) {
            //     alert(`Поздравляем! Доступ к Вашим ключевым словам изменён на: ${(accessOpen) ? 'ОТКРЫТЫЙ (приложение может рекомендовать Вас как коллегу другому клиенту со схожим набором ключ. слов)' :
            //     'ЗАКРЫТЫЙ (приложение НЕ ИМЕЕТ доступа к Вашим ключевым словам и не будет рекомендовать другим клиентам сотрудничество с Вами).'}`);
            //     this.modalRakeWindowPublicityBtn.innerText = 
            // }
            if(accessOpen == true){
                alert(`Поздравляем! Доступ к Вашим ключевым словам изменён на: 'ОТКРЫТЫЙ' (приложение может рекомендовать Вас как коллегу другому клиенту со схожим набором ключ. слов)`);
                this.modalRakeWindowPublicity.innerText = "Публичный аккаунт";
                this.modalRakeWindowPublicityBtn.innerText = 'Сделать аккаунт закрытым';
                this.publicity = !this.publicity;
                Cookies.set('publicity', true, 1);
            }
            else if(accessOpen == false){
                alert(`Поздравляем! Доступ к Вашим ключевым словам изменён на: ЗАКРЫТЫЙ (приложение НЕ ИМЕЕТ доступа к Вашим ключевым словам и не будет рекомендовать другим клиентам сотрудничество с Вами).`);
                this.modalRakeWindowPublicity.innerText = "Закрытый аккаунт";
                this.modalRakeWindowPublicityBtn.innerText = 'Сделайте свой аккаунт публичным';
                this.publicity = !this.publicity;
                Cookies.set('publicity', false, 1);
            }
            else alert(`Ай-ай-ай! Кажется, возникли проблемы при изменении
                доступа к Вашим ключевым словам. Возможно, стоит
                повторить попытку позже?`);
        });

        this.toggleVisibilityBtn1.addEventListener('click', ()=>{
            if (this.modalSignInPassword.type === "password") {
                this.modalSignInPassword.type = "text";
                this.toggleVisibilityBtn1.src = './images/eye-green.png';
            } else {  
                this.modalSignInPassword.type = "password";
                this.toggleVisibilityBtn1.src = './images/eye-black.png';
            }
        });


        this.modalSignUpPassword = document.querySelector('.modal__sign-up__password-input');

        this.toggleVisibilityBtn2.addEventListener('click', ()=>{
            if (this.modalSignUpPassword.type === "password") {
                this.modalSignUpPassword.type = "text";
                this.toggleVisibilityBtn2.src = './images/eye-green.png';
            } else {  
                this.modalSignUpPassword.type = "password";
                this.toggleVisibilityBtn2.src = './images/eye-black.png';
            }
        });

        this.toggleVisibilityBtn3.addEventListener('click', ()=>{
            if (this.modalSignUpPasswordRepeat.type === "password") {
                this.modalSignUpPasswordRepeat.type = "text";
                this.toggleVisibilityBtn3.src = './images/eye-green.png';
            } else {  
                this.modalSignUpPasswordRepeat.type = "password";
                this.toggleVisibilityBtn3.src = './images/eye-black.png';
            }
        });
        
        this.flaskButton.addEventListener('click', ()=>{
            if(!(Cookies.get('authenticated') === null || Cookies.get('authenticated') === undefined || Cookies.get('authenticated') == 'false')){
                this.modalRakeWindowBackground.classList.add('active');
                this.modalRakeWindow.classList.add('active');
            }
        });

        this.modalRakeWindowCloseBtn.addEventListener('click', () => {
            this.modalRakeWindowBackground.classList.remove('active');
            this.modalRakeWindow.classList.remove('active');
        });

        this.modalRakeWindowRefreshKeywordsBtn.addEventListener('click', ()=>{
            this._refreshUsersKeywords();
        });

        this.modalRakeWindowRefreshCandidatesBtn.addEventListener('click', ()=>{
            if(!this.publicity) alert(`Ваш аккаунт является закрытым. Сделайте свой аккаунт публичным, чтобы приложение могло сравнить ваш набор ключевых слов с наборами других пользователей.`);
            else this._refreshUsersCoworkCandidates();
        });

        this.signOutBtn.addEventListener('click', () => {
            Cookies.set('authenticated', false, 1);
            location.reload();
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
                // !(login.length < 8) && !(login.length > 15) && 
                if((_isAlpha(login) || this._isValidEmail(login)) && !(password.length < 5)){
                    // get user!
                    const userEntry = NotesAPI.getUserEntry(login, password);
                    this.publicity = userEntry['publicity'];
                    console.log(userEntry);
                    // console.log(`user entry: ${userEntry['active']}`);
                    if(userEntry != null && userEntry['active'] == true) {
                        // console.log("user entry active!");
                        // notesArray = NotesAPI.getNotes(login, password);
                        let response = NotesAPI.getNotes(login, password);
                        if(response['verified'] == true){                          
                            this.memoryLimitKB = +userEntry['memoryLimitKB'];
                            console.log(this.memoryLimitKB);
                            this.modalRakeWindowMemoryProgressBar.style.width = (this.memoryLimitKB? (App.KB*2-this.memoryLimitKB)/(App.KB*2)*100.0 + '%' : '0');
                            this.modalRakeWindowMemoryProgressBarLabel.innerText = `${this.memoryLimitKB ? (this.memoryLimitKB/App.KB).toFixed(2) : 0} ГБ / 2.00 ГБ свободно`;
                            this.registrationDate = userEntry['regDate'];
                            this.modalRakeWindowRegDate.innerText = `Вы с нами с: ${this.registrationDate}`;
                            this.view = new NotesView(this, this.root, this._handlers());
                            this._setNotes(response['notes']);                            
                            this.username = login;
                            Cookies.set('username', login, 1);
                            Cookies.set('password', password, 1);
                            Cookies.set('authenticated', true, 1);
                            // new
                            this._initiateKeywords();
                            //
                            //loading...
                            if(userEntry['public'] == true) {
                                this.modalRakeWindowPublicityBtn.innerText = 'Сделать аккаунт закрытым';
                                this.modalRakeWindowPublicity.innerText = 'Публичный аккаунт';
                                this.publicity = true;
                                Cookies.set('publicity', true, 1);
                            }
                            else {
                                this.modalRakeWindowPublicity.innerText = 'Закрытый аккаунт';
                                this.publicity = false;
                                Cookies.set('publicity', false, 1);
                            }
                            this.modalRakeWindowUsername.innerText = this.username;
                            this.modalSignInBackground.classList.remove('active');
                            this.modalSignIn.classList.remove('active');
                            this.view.notesSidebar.classList.add('active');
                        }
                        else {
                            this.modalSignInLogIn.classList.add('error', 'wrong-username-or-pw');
                            this.modalSignInPassword.classList.add('error', 'invalid-password');
                            this.modalSignInError.classList.add('active');
                        }
                    }
                    else{
                        console.log("something went wrong");
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
            // console.log(this.modalSignUpLogin);
            // console.log(this.modalSignUpEmail);

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
                if(response.usernameExists == true){
                    console.log("Username already occupied");
                    this._setErrorFor(this.modalSignUpLogin, "Пользователь с таким именем уже существует");
                    inputError = true;
                }
                
                if(response.emailExists == true){
                    console.log("Email already occupied");
                    this._setErrorFor(this.modalSignUpEmail, "На этот адрес уже зарегистрирован другой аккаунт");
                    inputError = true;
                }
                
                console.log(response.activationCode != null);

                if(inputError != true && response.activationCode != null) {
                    //verification message window: active
                    NotesAPI.sendEmail(email, response.activationCode);
                    this.modalVerificationLink.addEventListener('click', () => {
                        this.modalVerificationBackground.classList.remove('active');
                        this.modalVerification.classList.remove('active');
                        this.modalSignUp.classList.remove('active');
                        this.modalSignUpBackground.classList.remove('active');
                        this.modalSignInBackground.classList.add('active');
                        this.modalSignIn.classList.add('active');
                    });
                    this.modalVerificationBackground.classList.add('active');
                    this.modalVerification.classList.add('active');
                }
                else console.log("ERROR: email verification code might be undefined...");
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
            const response = NotesAPI.getNotes(Cookies.get('username'), Cookies.get('password'));
            // console.log(notesArray);
            // if (notesArray.notes === null) {
            if (response['verified'] === false) { 
                console.log(notesArray.password);
                console.log(notesArray.hash);
                console.log(notesArray.verified);
                this.modalSignInLogIn.classList.add('error', 'wrong-username-or-pw');
                this.modalSignInPassword.classList.add('error', 'invalid-password');
            }
            else{
                this.view = new NotesView(this, this.root, this._handlers());
                this._setNotes(response['notes']);
                // Cookies.set('username', login, 1);
                this.username = Cookies.get('username');
                this.modalRakeWindowUsername.innerText = this.username;
                // Cookies.set('password', password, 1);
                Cookies.set('authenticated', true, 1);
                // new
                this._initiateKeywords();
                // const userEntry = NotesAPI.getUserEntry('username');
                //
                //loading...
                this.modalSignInBackground.classList.remove('active');
                this.modalSignIn.classList.remove('active');
                this.view.notesSidebar.classList.add('active');
                const userEntry = NotesAPI.getUserEntry(this.username, this.password);
                this.publicity = userEntry['public'];
                // console.log("publicity: ", this.publicity);
                this.modalRakeWindowPublicity.innerText = (this.publicity) ? "Публичный аккаунт" : "Закрытый аккаунт";
                this.modalRakeWindowPublicityBtn.innerText = (this.publicity) ? "Сделать аккаунт закрытым" : "Сделайте свой аккаунт публичным";
                // Cookies.set('publicity', userPublicity, 1);
                this.memoryLimitKB = +userEntry['memoryLimitKB'];
                this.registrationDate = userEntry['regDate'];
                this.modalRakeWindowRegDate.innerText = `Вы с нами с: ${this.registrationDate}`;
                // this.memoryLimitKB = 2097152/2;
                this.modalRakeWindowMemoryProgressBar.style.width = (this.memoryLimitKB? (App.KB*2-this.memoryLimitKB)/(App.KB*2)*100.0 + '%' : '0');
                console.log(App.KB);
                console.log(this.memoryLimitKB);
                console.log(this.modalRakeWindowMemoryProgressBar.style.width);
                // console.log(this.memoryLimitKB);
                // console.log((App.KB-this.memoryLimitKB)/100.0);
                this.modalRakeWindowMemoryProgressBarLabel.innerText = `${this.memoryLimitKB ? (this.memoryLimitKB/App.KB).toFixed(2) : 0} ГБ / 2.00 ГБ свободно`;
                // Cookies.set('memoryLimitKB', this.memoryLimitKB, 1);
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
        // console.log(this.notesMatrix);
        // this.view.updatePreviewVisibility(true);
    }

    _setActiveNote(noteId){
        this.activeNoteId = noteId;
        this.view.updateActiveNote(noteId);
    }

    _initiateKeywords(){
        if(Cookies.get('authenticated') === "true" && this.username !== null){
            const keywords = NotesAPI.getClientsKeywords(this.username);
            const keywordTable = this.modalRakeWindowKeywordsTable;
            const rowClass = "modal__rake_window__users_keywords__table_row";
            this._clearChildNodes(keywordTable);
            this._createTableRowHTML(this.TH, keywordTable, 3, rowClass, ['Слово', 'Встреча<wbr>емость', 'Ранг']);
            for (let word of keywords){
                this._createTableRowHTML(this.TD, keywordTable, 3, rowClass, [word['keyword'], word['occurrences'],
                    word['rank']]);
            }
            this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList.remove('active');
        }
    }

    _refreshUsersKeywords(){
        console.log("App, refreshing user's keywords, showing notesMatrix: ", this.notesMatrix);
        // const keywordTable = this.modalRakeWindowKeywordsTable;
        // const rowClass = "modal__rake_window__users_keywords__table_row";
        // this._clearChildNodes(keywordTable);
        // this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList.add('active');
        // this.modalRakeWindowRefreshKeywordsLoader.classList.add('active');
        
        for (let note of this.notesMatrix){
            // this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList += 'active';
            // this.modalRakeWindowRefreshKeywordsLoader.classList += 'active';
            let noteKeywords = NotesAPI.extractKeywords(this._stripHTMLTags(note['note_text']));
            if (note['name'] != '') noteKeywords.push(note['name'].toLowerCase());
            noteKeywords = noteKeywords.map(str => NotesAPI.shieldApostrophes(str));
            // console.log("_refreshUsersKeywords proc, noteKeywords: ", noteKeywords);
            // for (let word of noteKeywords){
            //     this._createTableRowHTML(keywordTable, 1, rowClass, [word]);
            // }
            const keywordsString = noteKeywords.join(",");
            NotesAPI.pushKeywords(this.username, note['id'], keywordsString);
        }
        this._initiateKeywords();
        
        // debugging
        // setTimeout(() => {
        //     this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList.remove('active');
        //     this.modalRakeWindowRefreshKeywordsLoader.classList.remove('active');
        // },
        // 5000);

        // this.modalRakeWindowRefreshKeywordsLoaderBackgr.classList.remove('active');
        // this.modalRakeWindowRefreshKeywordsLoader.classList.remove('active');
    }

    _stripHTMLTags(html){
        return (html.replace(/(<([^>]+)>)/gi, ""));
    }


    _refreshUsersCoworkCandidates(){
        let usersWithKeywords = NotesAPI.getKeywordsByUsers();
        const index = usersWithKeywords.findIndex(user => user.username == this.username);
        const clientWithKeywords = usersWithKeywords[index];
        usersWithKeywords.splice(index, 1);
        this._clearChildNodes(this.modalRakeWindowCoworkCandidatesTable);
        const rowClass = "modal__rake_window__cowork_candidates__table_row";
        this._createTableRowHTML(this.TH, this.modalRakeWindowCoworkCandidatesTable,
            3, rowClass, ["Пользователь", "Общие<br>слова", "Сходство<wbr>иерархий"]);
        for (let user of usersWithKeywords){
            let clientsKeywords = clientWithKeywords.keywords;
            let usersKeywords = user.keywords;
            // getting an array of keywords with occurrences and ranks
            // const matchingKeywords = usersKeywords.filter(keyword => clientsKeywords.includes(keyword));
            usersKeywords = usersKeywords.filter(function(usersItem){
                for (let clientsItem of clientsKeywords)
                    if(usersItem.keyword === clientsItem.keyword) return true;
                return false;
            });
            clientsKeywords = clientsKeywords.filter(function(clientsItem){
                for (let usersItem of usersKeywords)
                    if(usersItem.keyword === clientsItem.keyword) return true;
                return false;
            });
            const matchesCount = clientsKeywords.length;
            let SpearmanCorrelation = 0;
            if(matchesCount > 0){
                if(matchesCount == 1) SpearmanCorrelation = 1;
                else{
                    let newRank = matchesCount;

                    for (let word of clientsKeywords){
                        word.rank = newRank;
                        newRank--;
                    }

                    newRank = matchesCount;
                    for (let word of usersKeywords){
                        word.rank = newRank;
                        newRank--;
                    }

                    // RECALCULATING THE RANKS FOR BOTH ARRAYS
                    // ======================================================
                    // since two users may have a big difference in the total
                    // number of the keywords they possess,
                    // when we find the intersection of their keyword arrays,
                    // we'll have to recalculate the ranks of those keywords,
                    // so that their keyword ranking systems are comparable.
                    // ======================================================

                    let sumSqrDif = 0;

                    // HOW WE CALCULATE THE SQUARE DIFFERENCES FOR THE SPEARMAN'S RHO
                    // we have to take THE SAME keyword and look at the difference between
                    // two ranks
                    // so we'll have to find corresponding 
                    // objects by property at each iteration
                    
                    for (let clientsWord of clientsKeywords){
                        // console.log(usersKeywords,clientsKeywords);
                        const usersWord = usersKeywords.find(item => item.keyword == clientsWord.keyword);
                        console.log(clientsWord, usersWord);
                        const sqrDif = (clientsWord.rank - usersWord.rank)**2;
                        sumSqrDif += sqrDif;
                    }
                    console.log(sumSqrDif);
                    SpearmanCorrelation = 1 - 6*sumSqrDif/(matchesCount*(matchesCount**2 - 1));
                }
            }
            console.log(user.email, user.username);
            const nameCellHTML = `<a href=\'mailto:${user.email}\'>${user.username}</a>`;
            this._createTableRowHTML(this.TD, this.modalRakeWindowCoworkCandidatesTable,
                3, rowClass, [nameCellHTML, matchesCount, SpearmanCorrelation.toFixed(2)]);
            
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
    
    _createTableRowHTML(cellTag, parentalTable, numberOfCells, rowClass, cellValues){
        const newRow = document.createElement("tr");
        // const cells = new Array();
        // cellValues is an array
        for(let i = 0; i < numberOfCells; i++){
            const dataCell = document.createElement(`${cellTag}`);
            dataCell.classList += rowClass;
            dataCell.innerHTML = cellValues[i];
            const noTagValue = (typeof cellValues[i] == 'string') ? this._stripHTMLTags(cellValues[i]) : cellValues[i];
            dataCell.setAttribute('title', noTagValue);
            newRow.appendChild(dataCell);
        }
        parentalTable.appendChild(newRow);
    }

    _byteSize(str){
        return new Blob([str]).size;
    }

    _byteSizeKB(str){
        return new Blob([str]).size/1024.0;
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
                const title = "Новая заметка",
                    body = "Введите текст...",
                    newMemoryLimit = this.memoryLimitKB - this._byteSizeKB(title + body);
                console.log("Byte size: ", this._byteSize(title + body));
                console.log("Byte size (KB): ", this._byteSizeKB(title + body));
                console.log(this.memoryLimitKB);
                if(newMemoryLimit < 0) alert (`Лимит памяти превышен на ${Math.abs(newMemoryLimit)} КБ. Изменения не будут сохранены.`);
                else {
                    // this.memoryLimitGB
                    const lastId = NotesAPI.noteSave(-1, "Новая заметка", "Введите текст...",
                        this.username, newMemoryLimit);
                    // console.log("onNoteAdd, id to add: ", lastId);
                    const currDate = NotesView.getCurrentDateString();
                    this.view.createListItemHTML(lastId, "Новая заметка", "Введите текст...",
                        currDate);
                    this.notesMatrix.push({id: lastId, name: "Новая заметка", note_text: "Введите текст...",
                        creation_date: currDate});
                    this.memoryLimitKB = newMemoryLimit;
                    console.log(`Memory limit post change: ${this.memoryLimitKB}`);
                    this.modalRakeWindowMemoryProgressBar.style.width = (this.memoryLimitKB? (App.KB*2-this.memoryLimitKB)/(App.KB*2)*100.0 + '%' : '0');
                    this.modalRakeWindowMemoryProgressBarLabel.innerText = `${this.memoryLimitKB ? (this.memoryLimitKB/App.KB).toFixed(2) : 0} ГБ / 2.00 ГБ свободно`;
                    // console.log(this.notesMatrix);
                }
            },

            onNoteEdit: () => {
                const newTitleText = this.view.inputTitle.value.trim(),
                    newBodyText = this.view.qlEditor.innerHTML.trim(),
                    newSmallBodyText = this.view.qlEditor.innerText.trim();
                const oldBodySize = this._byteSizeKB(this.view.displayBody.innerHTML),
                    oldTitleSize = this._byteSizeKB(this.view.displayTitle.innerText),
                    newBodySize = this._byteSizeKB(newBodyText),
                    newTitleSize = this._byteSizeKB(newTitleText);
                // console.log("Old data: ", this.view.displayBody.innerHTML, this.view.displayTitle.innerText);
                console.log("Old sizes: ", oldBodySize, oldTitleSize);
                // console.log("New data: ", newBodyText, newTitleText);
                console.log("New sizes: ", newBodySize, newTitleSize);
                const bodySizeDif = newBodySize - oldBodySize,
                    titleSizeDif = newTitleSize - oldTitleSize,
                    totalDif = bodySizeDif + titleSizeDif;
                console.log("Total difference: ", totalDif);
                const newMemoryLimit = this.memoryLimitKB - totalDif;
                let changesApplied = false;
                if(newMemoryLimit < 0) alert(`Лимит памяти превышен на ${Math.abs(newMemoryLimit)} КБ. Изменения не будут сохранены.`);
                else {
                    console.log(this.view.qlEditor);
                    const newSmallBodyHiddenHTML = this.view.qlEditor.innerHTML.trim();
                    console.log("onNoteEdit, activeNoteId: ", this.activeNoteId);
                    console.log(newMemoryLimit);
                    NotesAPI.noteSave(this.activeNoteId, newTitleText, newBodyText, this.username, newMemoryLimit);
                    const notesMatrixItem = this.notesMatrix.find(note => note['id'] == this.activeNoteId)
                    notesMatrixItem['note_text'] = newBodyText;
                    notesMatrixItem['name'] = newTitleText;
                    this.view.updateSmallActiveNote(newTitleText, newSmallBodyText, newSmallBodyHiddenHTML);
                    this.memoryLimitKB = newMemoryLimit;
                    console.log(this.memoryLimitKB);
                    changesApplied = true;
                    this.modalRakeWindowMemoryProgressBar.style.width = (this.memoryLimitKB? (1-this.memoryLimitKB)/App.KB*100.0 + '%' : '0');
                    this.modalRakeWindowMemoryProgressBarLabel.innerText = `${this.memoryLimitKB ? (this.memoryLimitKB/App.KB).toFixed(2) : 0} ГБ / 2.00 ГБ свободно`;
                }
                return changesApplied;
            },
            
            onNoteDelete: (idToRemove, username) => {
                const noteToDelete = this.view._searchHTMLCollection(this.notesMatrix, idToRemove),
                    noteSize = this._byteSizeKB(noteToDelete['note_text']);
                console.log(noteToDelete);
                console.log(`Memory limit before deletion: ${this.memoryLimitKB}`);
                this.memoryLimitKB += noteSize;
                this.modalRakeWindowMemoryProgressBar.style.width = (this.memoryLimitKB? (App.KB*2-this.memoryLimitKB)/(App.KB*2)*100.0 + '%' : '0');
                this.modalRakeWindowMemoryProgressBarLabel.innerText = `${this.memoryLimitKB ? (this.memoryLimitKB/App.KB).toFixed(2) : 0} ГБ / 2.00 ГБ свободно`;
                console.log(`Deleted note byte size: ${noteSize}`);
                console.log(`Memory limit after note deletion: ${this.memoryLimitKB}`);
                let updateUserMemoryLimitResponse = NotesAPI.updateUserMemoryLimit(username, this.memoryLimitKB);
                console.log(updateUserMemoryLimitResponse);
                if(!updateUserMemoryLimitResponse)
                    alert('Ай-ай-ай! Кажется, произошла ошибка при обновлении лимита памяти.');
                NotesAPI.noteDelete(idToRemove, username);
            }
        }
    }
    //this is meant to prevent the errors 
    //with the SQL-insert query
}
