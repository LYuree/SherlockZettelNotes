export default class NotesAPI{
    static url = './php/get_all_notes_handler.php';
    static registerUrl = './php/register.php';

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
    
    static getNotes(username, password){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password;
        xhr.open('POST', this.url, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');   
        let notesMatrix = []; 
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.response);
                notesMatrix = JSON.parse(xhr.response);
            }
        }        
        xhr.send(params);
        return notesMatrix;
    }



    static getAllNotes(username, password){
        const xhr = new XMLHttpRequest();
        const params = "username=" + username + "&password=" + password;
        xhr.open('POST', this.url, false);
        xhr.setRequestHeader = ('Content-Type', 'application/x-www-form-urlencoded');
        let notesMatrix = [];
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200){
                notesMatrix = JSON.parse(xhr.response);
                console.log(xhr.response);
            }
        }
        xhr.send(params);
        return notesMatrix;
    }

    static noteSave(activeNoteId, inputTitle, inputBody, username){
        inputTitle = this._shieldApostrophes(inputTitle);
        inputBody = this._shieldApostrophes(inputBody);
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
                console.log(xhr.response);
            }
        }        
        xhr.send(params);
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

    // prevents sql-insert mistakes with
    //different kinds of apostrophes from happening
    static _shieldApostrophes(text){
        text = text.replace(/'/g, "''");
        text = text.replace(/`/g, "\`");
        text = text.replace(/"/g, "\"");
        return text;
    }
}