export default class NotesAPI{
    static url = './php/get_all_notes_handler.php';
    static registerUrl = './php/register.php';
    static rakeUrl = './php/RAKE.php';
    static pushKeywordsUrl = './php/push_keywords.php';
    static getClientsKeywordsUrl = './php/get_clients_keywords.php';
    static getKeywordsByUsersUrl = './php/get_keywords_by_users.php';
    static getUserEntryUrl = './php/get_user.php';
    static sendEmailUrl = './php/email_send.php'
    static toggleAccountPublicityUrl = './php/toggle_user_publicity.php';
    static updateUserMemoryLimitUrl = './php/update_user_memory_limit.php';


    static sendEmail(email, activationCode, appObj){
        const xhr = new XMLHttpRequest(),
            params = "email=" + email + "&activationCode=" + activationCode;
        console.log(params);
        xhr.open('POST', this.sendEmailUrl, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                //?
                console.log('query for VERIFICATION EMAIL processed');
                // console.log(xhr.response);
                console.log(xhr.response);
                appObj.callVerificationWindow();
                // response = JSON.parse(xhr.response);
                // console.log("Response inside of the onreadystatechange callback: ", response);
            }
        }
        xhr.send(params);
    }


    static createUser(username, email, password, appObj){
        const xhr = new XMLHttpRequest(),
            params = "username=" + username + "&email=" + email + "&password=" + password;
        xhr.open('POST', this.registerUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let response = null;
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(xhr.response);
                response = JSON.parse(xhr.response);
                console.log(response);
                
                // move this to async NotesAPI method?
                if(response.usernameExists == true){
                    console.log("Username already occupied");
                    appObj.toggleLoader(appObj.mainLoader, false);
                    appObj.setErrorFor(appObj.modalSignUpLogin, "Пользователь с таким именем уже существует");
                    inputError = true;
                }
                
                if(response.emailExists == true){
                    console.log("Email already occupied");
                    appObj.toggleLoader(appObj.mainLoader, false);
                    appObj.setErrorFor(appObj.modalSignUpEmail, "На этот адрес уже зарегистрирован другой аккаунт");
                    inputError = true;
                }                
                // if(inputError != true && response.activationCode != null) {
                if(response.activationCode != null) {
                    appObj.toggleLoader(appObj.mainLoader, false);
                    NotesAPI.sendEmail(email, response.activationCode, appObj);
                }
                else console.log("ERROR: email verification code might be undefined...");
            }
        }
        xhr.send(params);
        appObj.toggleLoader(appObj.mainLoader, true);
        // console.log("Response OUTSIDE of the onreadystatechange callback: ", response);
        // return response;
    }

    // static getUserEntry(username, password){
    //     const xhr = new XMLHttpRequest();
    //     const params = "username=" + username + "&password=" + password;
    //     xhr.open('POST', this.getUserEntryUrl, false);
    //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
    //     let userEntry = new Object(); 
    //     xhr.onreadystatechange = () => {
    //         if(xhr.readyState == 4 && xhr.status == 200) {
    //             userEntry = JSON.parse(xhr.response);
    //         }
    //     }        
    //     xhr.send(params);
    //     // console.log(xhr.response);
    //     return userEntry;
    // }

    // static getUserEntry(username, password, appObj){

    static setUserData(username, password, appObj){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password;
        xhr.open('POST', this.getUserEntryUrl, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        // let userEntry = new Object();
        console.log('Hey there!');
        xhr.onreadystatechange = async () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log('response ready');
                const userEntry = JSON.parse(xhr.response);
                console.log(xhr.response);
                appObj.publicity = userEntry['public'];
                console.log(appObj.publicity);
                console.log(userEntry);
                if(userEntry != null && userEntry['active'] == true){
                    const response = await NotesAPI.getNotesNew(username, password);
                    const responseJson = await response.json();
                    if(responseJson['verified'] == true){
                        appObj.setUserName(username);
                        appObj.setUserPublicity(userEntry['public']);
                        appObj.setUserMemoryLimit(+userEntry['memoryLimitKB']);
                        appObj.setUserRegDate(userEntry['regDate']);
                        appObj.setUserCookies(username, password, appObj.publicity);
                        appObj.toggleModalSignInWindow(false);
                        console.log(appObj.memoryLimitKB);
                        appObj.initiateNotesView();
                        appObj.setNotes(responseJson['notes']);                            
                        appObj.initiateKeywords();
                        appObj.view.toggleNotesSidebar(true);   
                    }
                    else {
                        appObj.setSignInErrors();
                    }
                }
                else appObj.setSignInErrors();
                appObj.toggleLoader(appObj.mainLoader, false);
            }
        }        
        xhr.send(params);
        appObj.toggleLoader(appObj.mainLoader, true);
    }


    // static getUserEntry(username, password, appObj){
    //     const xhr = new XMLHttpRequest();
    //     const params = "username=" + username + "&password=" + password;
    //     xhr.open('POST', this.getUserEntryUrl, true);
    //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
    //     let userEntry = new Object(); 
    //     xhr.onreadystatechange = () => {
    //         if(xhr.readyState == 4 && xhr.status == 200) {
    //             userEntry = JSON.parse(xhr.response);
    //             console.log(xhr.response);
    //             appObj.publicity = userEntry['public'];
    //             console.log(appObj.publicity);
    //         }
    //     }        
    //     xhr.send(params);
    // }

   
    static getNotes(username, password){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password;
        xhr.open('POST', this.url, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        let response = undefined; 
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                response = JSON.parse(xhr.response);
            }
        }        
        xhr.send(params);
        // console.log(xhr.response);
        return response;
    }

    static getNotesNew(username, password){        
        const reqObj = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                // the JSON.stringify thing
                // is accepted by the server in
                // another way: json_decode,
                // not $_POST

                // body: JSON.stringify({
                //     name: myName,
                //     password: myPassword
                //   })
                body: "username=" + username +
                "&password=" + password
            };
        console.log(reqObj);
        return fetch(this.url, reqObj);
    }


    static getClientsKeywords(username){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username;
        xhr.open('POST', this.getClientsKeywordsUrl, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        let keywords = [];
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                keywords = JSON.parse(xhr.response);
            }
        }        
        xhr.send(params);
        // console.log(xhr.response);
        return keywords;
    }

    static refreshUsersCoworkCandidates(appObj){       
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.getKeywordsByUsersUrl, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        
        let usersWithKeywords = [];
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                // console.log(xhr.response);
                usersWithKeywords = JSON.parse(xhr.response);
                const index = usersWithKeywords.findIndex(user => user.username == appObj.username);
                const clientWithKeywords = usersWithKeywords[index];
                usersWithKeywords.splice(index, 1);
                console.log(clientWithKeywords, usersWithKeywords);
                appObj._setCoworkersTable(clientWithKeywords, usersWithKeywords);
                appObj.toggleLoader(appObj.coworkCandidatesLoader, false);
            }
        }
        xhr.send();
        appObj.toggleLoader(appObj.coworkCandidatesLoader, true);
        // return usersAndKeywords;
    }

    static toggleAccountPublicity(username){
        const xhr = new XMLHttpRequest(),
            params = `username=${username}`;
        xhr.open('POST', this.toggleAccountPublicityUrl, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // possible result values:
        // null (failed to proceed);
        //  true (account is public);
        //  false (account is private);
        let accessOpen = null;
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText);
                accessOpen = JSON.parse(xhr.response);
            }
        }
        xhr.send(params);
        return accessOpen;
    }

    // static getAllNotes(username, password){
    //     const xhr = new XMLHttpRequest();
    //     const params = "username=" + username + "&password=" + password;
    //     xhr.open('POST', this.url, false);
    //     xhr.setRequestHeader = ('Content-Type', 'application/x-www-form-urlencoded');
    //     let notesMatrix = [];
    //     xhr.onreadystatechange = () => {
    //         if(xhr.readyState === 4 && xhr.status === 200){
    //             notesMatrix = JSON.parse(xhr.response);
    //             console.log(xhr.response);
    //         }
    //     }
    //     xhr.send(params);
    //     return notesMatrix;
    // }

    static noteSave(idToSave = -1, inputTitle, inputBody, username, newMemoryLimit){
        console.log("NotesAPI, notesave, username: ", username);
        inputTitle = this.shieldApostrophes(inputTitle);
        inputBody = this.shieldApostrophes(inputBody);
        const xhr = new XMLHttpRequest(),
            noteId = idToSave,
            noteTitle = inputTitle,
            noteText = inputBody,
            params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText="
                + noteText + "&username=" + username + "&newMemoryLimit=" + newMemoryLimit;
        xhr.open('POST', this.url, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        let lastNoteId = null;
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log("Updating the note...");
                console.log(xhr.response);
                lastNoteId = JSON.parse(xhr.response);
                console.log(lastNoteId);
            }
        }        
        xhr.send(params);
        return lastNoteId;
    }


    
    static noteSaveMalfunctioned(activeNoteId, inputTitle, inputBody, username){
        const xhr = new XMLHttpRequest(),
            noteId = activeNoteId,
            noteTitle = inputTitle,
            noteText = inputBody,
            params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText=" + noteText + "&username=" + username;
        xhr.open('POST', this.url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log("Updating the note...");
            }
        }        
        xhr.send(params);
    }
    static noteDelete(idToRemove, username){
        // console.log("NotesAPI.noteDelete, idToRemove: ", idToRemove);
        const xhr = new XMLHttpRequest(),
            noteId = idToRemove,
            params = "idToDelete=" + noteId + "&username=" + username;
        console.log(params);
        // console.log(this);
        console.log(this.url);
        xhr.open('POST', NotesAPI.url, true);    
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log("Deleting a note from a database...");
                console.log(xhr.responseText);
            }
        }
        xhr.send(params);
        // eventTarget.parentNode.remove();
    }

    static updateUserMemoryLimit(username, memoryLimitKB){
        const xhr = new XMLHttpRequest(),
            params = "username=" + username + "&newMemoryLimit=" + memoryLimitKB;
        xhr.open('POST', this.updateUserMemoryLimitUrl, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let updateUserMemoryLimitResponse = null;
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                updateUserMemoryLimitResponse = JSON.parse(xhr.response);
            }
        }
        xhr.send(params);
        console.log(updateUserMemoryLimitResponse);
        return updateUserMemoryLimitResponse;
    }

    // static refreshUsersKeywords(){
    // }

    // static getUsersKeywords(notesMatrix){
    //     let usersKeywordsArray = new Array();
    //     for (note of notesMatrix){
    //         const noteBodyKeywordsArray = this._extractKeywords(note['name']);
    //         usersKeywordsArray.push(note['name']);
    //         usersKeywordsArray.concat(usersKeywordsArray, noteBodyKeywordsArray);
    //     }
    //     return usersKeywordsArray;
    // }

    
    static extractKeywords(noteBody){ //this is sync
        const xhr = new XMLHttpRequest();
        const params = "noteText=" + noteBody;
        xhr.open('POST', this.rakeUrl, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let noteBodyKeywords = new Array();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                noteBodyKeywords = JSON.parse(xhr.response);
                noteBodyKeywords = NotesAPI._cutInternalWhitespace(noteBodyKeywords);
                noteBodyKeywords.forEach(string => {
                    return string.trim();
                });
                // toggle loader visibility: OFF
                // console.log("NotesAPI, extractKeywords:\n", noteBodyKeywords); //works fine
            }
        }
        // toggle loader visibility: ON
        xhr.send(params);
        console.log(xhr.response);
        console.log("NotesAPI, extractKeywords:\n", noteBodyKeywords); //empty... why?
        return noteBodyKeywords; //this function shouldn't return a value earlier than
                                // then request gets ready
    }

    // static async extractKeywords(noteBody){ //this is an attempt of async programming
    //     const xhr = new XMLHttpRequest();
    //     const params = "noteText=" + noteBody;
    //     xhr.open('POST', this.rakeUrl);
    //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     let noteBodyKeywords = new Array();
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState === 4 && xhr.status === 200){
    //             noteBodyKeywords = JSON.parse(xhr.response);
    //             noteBodyKeywords = NotesAPI._cutInternalWhitespace(noteBodyKeywords);
    //             noteBodyKeywords.forEach(string => {
    //                 return string.trim();
    //             });
    //             console.log("NotesAPI, extractKeywords:\n", noteBodyKeywords); //works fine
    //         }
    //     }
    //     xhr.send(params);
    //     console.log(xhr.response);
    //     console.log("NotesAPI, extractKeywords:\n", noteBodyKeywords); //empty... why?
    //     return noteBodyKeywords; //this function shouldn't return a value earlier than
    //                             // then request gets ready
    // }



    static _cutInternalWhitespace(strings){
        const result = strings.map(str => str.replace(/\s+/g, " "));
        // console.log("Cut internal whitespace: ", result); //works fine
        return result;
        // return strings.map(str => str.replace(/\s+/g, " "));
        // console.log(strings);
        // const trimmedStrings = strings;
        // for (let str of trimmedStrings){
        //     console.log(str);
        //     str.trim();
        //     // str = str.replace(/\s+/g, " ");
        //     str = "0";
        //     console.log(str);
        // }
        // return trimmedStrings;
    }
    
    // extracts keywords from a single note's body
    // static _extractKeywordsGET_obsolete(noteBody){
    //     // let url = new URL(this.rakeUrl);
    //     // url.searchParams.set()
    //     const xhr = new XMLHttpRequest();
    //     const url = this.rakeUrl + "?noteBody=" + noteBody;
    //     console.log("Rake query url: ", url);
    //     xhr.open('GET', this.rakeUrl);
    //     let noteBodyKeywordsArray = new Array();
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState === 4 && xhr.status === 200){
    //             noteBodyKeywordsArray = JSON.parse(xhr.response);
    //         }
    //     }
    //     xhr.send();
    //     return noteBodyKeywordsArray;
    // }


    
    // static pushKeywords(username, noteId, keywordsStr){
        static pushKeywords(username, noteId, keywordsStr){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username
            + "&noteId=" + noteId
            + "&keywordsStr=" + keywordsStr;
        // const url = this.pushKeywordsURL;
        console.log(this.pushKeywordsUrl);
        // console.log(url);
        xhr.open('POST', this.pushKeywordsUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                // console.log("Keywords insertion query successfully processed!");
                console.log(xhr.responseText);
                // const response = JSON.parse(xhr.response);
                // console.log(response);
            }
        };
        xhr.send(params);
    }

    // prevents sql-insert mistakes with
    //different kinds of apostrophes from happening
    static shieldApostrophes(text){
        // console.log("Text BEFORE mutation: ", text);
        text = text.replace(/'/g, "''");
        text = text.replace(/`/g, "\`");
        text = text.replace(/"/g, "\"");
        // console.log("Text AFTER mutation: ", text);
        return text;
    }
}
