import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App{
    constructor(root){
        this.notes = [];
        this.activeNoteId = null;
        this.activeSmallBody = null;
        this.activeSmallTitle = null;
        this.view = new NotesView(root, this._handlers());
    }

    _setActiveNote(noteId){
        this.activeNoteId = noteId;
        this.view.updateActiveNote(noteId);
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this._setNotes(notes);
    }

    _setNotes(notesArray){
        this.notes = notesArray;
        this.view.updateNotesList(notesArray);
        this.view.updatePreviewVisibility(notes.length > 0);
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
                this.activeNoteId = +this.view.notesContainer.lastElementChild.id + 1;
                //set selected note
                this.view.createListItemHTML(this.activeNoteId, "Новая заметка", "Введите текст...");
                NotesAPI.noteSave(this.activeNoteId, "Новая заметка", "Введите текст...");
            },

            onNoteEdit: () => {
                const newTitleText = this.view.inputTitle.value.trim(),
                    newBodyText = this.view.inputBody.value.trim();
                NotesAPI.noteSave(this.activeNoteId, newTitleText, newBodyText);
            },
            
            onNoteDelete: NotesAPI.noteDelete
        }
    }
}