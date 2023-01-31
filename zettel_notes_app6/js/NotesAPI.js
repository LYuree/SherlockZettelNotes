export default class NotesAPI{
    static getAllNotes(username, password){
        const xhr = new XMLHttpRequest();
        const params = `username=${username}&password=${password}`,
            url = "index.php";
        xhr.open('POST', url, true);
        xhr.setRequestHeader = ('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 2){
                const notesArray = JSON.parse(xhr.response);
                console.log(xhr.response);
                console.log(xhr.responseText);
            }
        }
        return notesArray;
    }

    static noteSearch(substringToSearch, notesArray){
        for (item of notesArray){
            const itemSmallTitle = item.querySelector('.notes__small-title'),
                    itemSmallBody = item.querySelector('.notes__small-body');
            if(itemSmallTitle.innerHTML.toLowerCase().indexOf(substringToSearch) == -1 && itemSmallBody.innerHTML.toLowerCase().indexOf(substringToSearch) == -1){
                item.style.display = 'none';
            }
            else item.style.display = 'block';
        }
    }

    static noteSave(activeNoteId, inputTitle, inputBody){
        const xhr = new XMLHttpRequest(),
            url = 'index.php',
            noteId = activeNoteId,
            noteTitle = inputTitle,
            noteText = inputBody,
            params = "idToSave="+ noteId + "&noteTitle=" + noteTitle + "&noteText=" +  noteText;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log("Updating the note...");
            }
        }        
        xhr.send(params);
    }

    static noteDelete(idToRemove){
        const xhr = new XMLHttpRequest(),
            url = 'index.php',
            noteId = idToRemove,
            params = "idToDelete=" + noteId;
        xhr.open('POST', url, true);    
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log("Deleting a note from a database...");
            }
        }
        xhr.send(params);
        // eventTarget.parentNode.remove();
    }
}