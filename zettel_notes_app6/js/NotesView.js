export default class NotesView{
    constructor(root, {onNoteSearch, onNoteSelect,  onNoteAdd,  onNoteEdit, onNoteDelete} = {}){
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
        this.notesContainer = this.root.querySelector('.notes__list-items__container');
        this.noteAddBtn = this.root.querySelector('.notes__add');
        this.searchField = this.root.querySelector('.search__note');
        const _sidebarClickHandler = clickEvent => {
            const eventTarget = clickEvent.target,
                targetClassList = clickEvent.target.classList;
            let eventTargetParent = null,
                activeNoteId = null,
                smallTitle = null,
                smallBody = null;
    
            if(targetClassList.contains("notes__delete")){
                console.log("Note deletion event...");
                const confirmDeletion = confirm('Вы действительно хотите удалить эту заметку?');
                const idToRemove = eventTarget.parentNode.id;                    
                if(confirmDeletion){
                    this.onNoteDelete(idToRemove);
                    eventTarget.parentNode.remove();
                }        
            }
            else{
                    if (targetClassList.contains("notes__small-title") || targetClassList.contains("notes__small-body") || targetClassList.contains("notes__small-updated"))
                    {
                        eventTargetParent = eventTarget.parentNode;
                        activeNoteId = eventTargetParent.id;        
                        this.smallTitle = eventTargetParent.querySelector('.notes__small-title');
                        this.smallBody = eventTargetParent.querySelector('.notes__small-body');          
                    }
                    else if(targetClassList.contains("note__list-item"))
                    {
                        activeNoteId = eventTarget.id;
                        this.smallTitle = eventTarget.querySelector('.notes__small-title');
                        this.smallBody = eventTarget.querySelector('.notes__small-body');       
                    }
                    
                    const smallTitleText = this.smallTitle.innerHTML,
                        smallBodyText = this.smallBody.innerHTML;
                    // console.log(this);
                    this.onNoteSelect(activeNoteId);
                    this.updateActiveNote(smallTitleText, smallBodyText);
                }            
            }

            this.noteAddBtn.addEventListener('click', () => {
                this.onNoteAdd();
                // this.activeNoteId = 999;
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

    createListItemHTML(id, title, body){
        const today = new Date();
        const date = today.getFullYear()+ '-' +(today.getMonth() + 1) + '-' +today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

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
        newNoteSmallUpdated.innerHTML = `${dateTime}`;
        newNote.appendChild(newNoteSmallTitle);
        newNote.appendChild(newNoteDeleteBtn);
        newNote.appendChild(newNoteSmallBody);
        newNote.appendChild(newNoteSmallUpdated);
        this.notesContainer.appendChild(newNote);
    }

    updateActiveNote(smallTitleText, smallBodyText){
        // const today = new Date();
        // const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        // const time = today.getHours()+ ':' + today.getMinutes() + today.getSeconds();
        // const dateTime = date + time;
        this.inputTitle.value = smallTitleText;
        this.inputBody.value = smallBodyText;
        // this.activeSmallTitle.value = smallTitleText;
        // this.activeSmallBody.value = smallBodyText;
        // this.activeSmallUpdated.value = dateTime;
        this.updatePreviewVisibility(true);
    }

    updatePreviewVisibility(visible){
        visible ? this.notePreview.style.display = 'flex' : this.notePreview.style.display = 'none';
    }

    updateNotesList(notesArray){
        
    }

}