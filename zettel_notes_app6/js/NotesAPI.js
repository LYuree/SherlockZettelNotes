export default class NotesAPI{
    static url = './php/get_all_notes_handler.php';
    static registerUrl = './php/register.php';
    static rakeUrl = './php/RAKE.php';
    static pushKeywordsUrl = './php/push_keywords.php';
    static getKeywordsUrl = './php/get_keywords.php';
    static getUserEntryUrl = './php/get_user.php';
    static sendEmailUrl = './php/email_send.php'


    static sendEmail(email, activationCode){
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
                // response = JSON.parse(xhr.response);
                // console.log("Response inside of the onreadystatechange callback: ", response);
            }
        }
        xhr.send(params);
    }


    static createUser(username, email, password){
        const xhr = new XMLHttpRequest(),
            params = "username=" + username + "&email=" + email + "&password=" + password;
        xhr.open('POST', this.registerUrl, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let response = null;
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                //?
                console.log('query for user creation processed');
                // console.log(xhr.response);
                console.log(xhr.response);
                response = JSON.parse(xhr.response);
                console.log("Response inside of the onreadystatechange callback: ", response);
            }
        }
        xhr.send(params);
        console.log("Response OUTSIDE of the onreadystatechange callback: ", response);
        return response;
    }

    static getUserEntry(username, password){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password;
        xhr.open('POST', this.getUserEntryUrl, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        let userEntry = new Object(); 
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.response);
                userEntry = JSON.parse(xhr.response);
            }
        }        
        xhr.send(params);
        // console.log(xhr.response);
        return userEntry;
    }
    
    static getNotes(username, password){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password;
        xhr.open('POST', this.url, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        let notesMatrix = []; 
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                // console.log(xhr.response);
                notesMatrix = JSON.parse(xhr.response);
            }
        }        
        xhr.send(params);
        // console.log(xhr.response);
        return notesMatrix;
    }


    static getKeywords(username){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username;
        xhr.open('POST', this.getKeywordsUrl, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        let keywords = [];
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.response);
                keywords = JSON.parse(xhr.response);
            }
        }        
        xhr.send(params);
        // console.log(xhr.response);
        return keywords;
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

    static noteSave(idToSave = -1, inputTitle, inputBody, username){
        console.log("NotesAPI, notesave, username: ", username);
        inputTitle = this.shieldApostrophes(inputTitle);
        inputBody = this.shieldApostrophes(inputBody);
        const xhr = new XMLHttpRequest(),
            noteId = idToSave,
            noteTitle = inputTitle,
            noteText = inputBody,
            params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText=" + noteText + "&username=" + username;
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
        console.log(this);
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
                // console.log(xhr.responseText);
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
