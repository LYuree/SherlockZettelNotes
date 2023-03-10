export default class NotesView{
    constructor(appObj, root, {onNoteSearch, onNoteSelect,  onNoteAdd,  onNoteEdit, onNoteDelete} = {}){
        this.App = appObj;
        this.root = root;
        this.onNoteSearch = onNoteSearch;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.noteListItemsArray = this.root.getElementsByClassName('note__list-item');
        this.activeSmallTitle = null;
        this.activeSmallBody = null;
        this.activeSmallUpdated = null;
        this.inputTitle = this.root.querySelector('.notes__title');
        this.inputBody = this.root.querySelector('.notes__body');
        this.notePreview = this.root.querySelector('.notes__preview');
        this.notesSidebar = this.root.querySelector('.notes__sidebar');
        this.notesContainer = this.root.querySelector('.notes__list-items__container');
        this.noteAddBtn = this.root.querySelector('.notes__add');
        this.searchField = this.root.querySelector('.search__note');
        const _sidebarClickHandler = clickEvent => {
            const eventTarget = clickEvent.target,
                targetClassList = clickEvent.target.classList;
            let eventTargetParent = null,
                activeNoteId = null;
    
            if(targetClassList.contains("notes__delete")){
                console.log("Note deletion event...");
                const confirmDeletion = confirm('Вы действительно хотите удалить эту заметку?');
                const idToRemove = eventTarget.parentNode.id;                    
                if(confirmDeletion){
                    console.log(this.App.username);
                    this.onNoteDelete(idToRemove, this.App.username);
                    eventTarget.parentNode.remove();
                    this.updatePreviewVisibility(false);
                }        
            }
            else{
                    if (targetClassList.contains("notes__small-title") || targetClassList.contains("notes__small-body") || targetClassList.contains("notes__small-updated"))
                    {
                        eventTargetParent = eventTarget.parentNode;
                        activeNoteId = eventTargetParent.id;        
                        this.activeSmallTitle = eventTargetParent.querySelector('.notes__small-title');
                        this.activeSmallBody = eventTargetParent.querySelector('.notes__small-body');
                        this.activeSmallUpdated = eventTargetParent.querySelector('.notes__small-updated');
                    }
                    else if(targetClassList.contains("note__list-item"))
                    {
                        activeNoteId = eventTarget.id;
                        this.activeSmallTitle = eventTarget.querySelector('.notes__small-title');
                        this.activeSmallBody = eventTarget.querySelector('.notes__small-body');       
                        this.activeSmallUpdated = eventTarget.querySelector('.notes__small-updated');
                    }
                    
                    const smallTitleText = this.activeSmallTitle.innerHTML,
                        smallBodyText = this.activeSmallBody.innerHTML;
                    // console.log(this);
                    this.onNoteSelect(activeNoteId);
                    this.updateActiveNote(smallTitleText, smallBodyText);
                }            
            }

            this.noteAddBtn.addEventListener('click', () => {
                this.onNoteAdd();
            });

            this.inputTitle.addEventListener('blur', () => {
                this.onNoteEdit();
            });

            this.inputBody.addEventListener('blur', () => {
                this.onNoteEdit();
            });

            this.searchField.addEventListener("keypress", (event) => {
                if (event.key == "Enter"){
                    const substringToSearch = this.searchField.value.toLowerCase();
                    this.onNoteSearch(substringToSearch, this.noteListItemsArray);
                }
            });               

            this.notesContainer.addEventListener('click', _sidebarClickHandler);
    }


    static getCurrentDateString(){
        const today = new Date();
        const month = `${(today.getMonth()+1) < 10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)}`;
        const day = `${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
        const date = today.getFullYear() + '-' + month + '-' + day;
        const time = today.getHours()+ ':' + today.getMinutes() + ':' + today.getSeconds();
        const dateTime = date + ' ' + time;
        return dateTime;
    }

    createListItemHTML(id, title, body, lastUpdatedString){
        console.log(id);
        console.log(title);
        console.log(body);
        console.log(lastUpdatedString);

        const newNote = document.createElement("div"),
        newNoteSmallTitle = document.createElement("div"),
        newNoteDeleteBtn = document.createElement("button"),
        newNoteSmallBody = document.createElement("div"),
        newNoteSmallUpdated = document.createElement("div");

        newNote.classList += "note__list-item";
        newNote.id = id;
        newNoteSmallTitle.classList += "notes__small-title";
        newNoteDeleteBtn.classList += "notes__delete";
        newNoteSmallBody.classList += "notes__small-body";
        newNoteSmallUpdated.classList += "notes__small-updated";

        newNoteSmallTitle.innerHTML = title;
        newNoteDeleteBtn.innerHTML = " X ";
        newNoteSmallBody.innerHTML = body;
        newNoteSmallUpdated.innerHTML = lastUpdatedString;
        newNote.appendChild(newNoteSmallTitle);
        newNote.appendChild(newNoteDeleteBtn);
        newNote.appendChild(newNoteSmallBody);
        newNote.appendChild(newNoteSmallUpdated);
        this.notesContainer.appendChild(newNote);
    }

    updateActiveNote(smallTitleText, smallBodyText){
        this.inputTitle.value = smallTitleText;
        this.inputBody.value = smallBodyText;
        this.updatePreviewVisibility(true);
    }

    updateSmallActiveNote(smallTitleText, smallBodyText){
        this.activeSmallTitle.innerHTML = smallTitleText;
        this.activeSmallBody.innerHTML= smallBodyText;
        this.activeSmallUpdated.innerHTML = NotesView.getCurrentDateString();
    }

    updatePreviewVisibility(visible){
        visible ? this.notePreview.style.display = 'flex' : this.notePreview.style.display = 'none';
    }

    initiateNotesList(notesMatrix){
        //this method is only used for the initial client-side note items list load,
        //when the user gets authorized and the browser sends a query to get all the notes from the user's collection;
        //further updates to the client-side display of the notes list are acomplished without using this method;
        //again: this is only for the INITIAL list upload.
        const m = notesMatrix.length;
        console.log(notesMatrix.length);
        if(m > 0){
            for(let note of notesMatrix){
                console.log(note);
                this.createListItemHTML(note['id'], note['name'], note['note_text'], note['creation_date']);
            }
        }
    }

}