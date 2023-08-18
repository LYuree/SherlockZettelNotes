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
        this.displayTitle = this.root.querySelector('.notes__title_div');
        this.inputTitle = this.root.querySelector('.notes__title_input');
        this.displayBody = this.root.querySelector('.notes__body_div');
        this.inputBody = this.root.querySelector('.notes__body_input');
        this.notePreview = this.root.querySelector('.notes__preview');
        this.notesSidebar = this.root.querySelector('.notes__sidebar');
        this.notesContainer = this.root.querySelector('.notes__list-items__container');
        this.noteAddBtn = this.root.querySelector('.notes__add');
        this.searchField = this.root.querySelector('.search__note');
        this.editBtn = this.root.querySelector('.notes__preview__top_section__button');
        this.quill = new Quill('.notes__body__editor', {
            theme: 'snow'
        });
        this.quillToolbar = this.root.querySelector('.ql-toolbar');
        this.quillContainer = this.root.querySelector('.ql-container');
        this.qlEditor = this.quillContainer.querySelector('.ql-editor');

        this.editMode = false;
        const _sidebarClickHandler = clickEvent => {
            if(this.editMode == true){
                const save = confirm("Сохранить изменения в текущей заметке?");
                if(save) {
                    this.onNoteEdit();
                    this.displayTitle.innerHTML = this.inputTitle.value;
                    this.displayBody.innerHTML = this.qlEditor.innerHTML;
                    this.editBtn.innerHTML = "Править";
                    console.log(this.displayTitle, this.displayBody);

                    this.inputTitle.style.display = "none";
                    this.quillContainer.style.display = "none";
                    this.quillToolbar.style.display = "none";
                    this.displayTitle.style.display = "initial";
                    this.displayBody.style.display = "initial";
                }
                else {
                    this.editBtn.innerHTML = "Править";
                    console.log(this.displayTitle, this.displayBody);

                    this.inputTitle.style.display = "none";
                    this.quillContainer.style.display = "none";
                    this.quillToolbar.style.display = "none";

                    // this.onNoteEdit();

                    this.displayTitle.style.display = "initial";
                    this.displayBody.style.display = "initial";
                }
                this.editMode = false;
            }
            const eventTarget = clickEvent.target,
                targetClassList = clickEvent.target.classList;
            console.log(eventTarget);
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
                        this.activeSmallBodyHidden = eventTargetParent.querySelector('.notes__small-body-hidden');
                        this.activeSmallUpdated = eventTargetParent.querySelector('.notes__small-updated');
                    }
                    else if(targetClassList.contains("note__list-item"))
                    {
                        activeNoteId = eventTarget.id;
                        this.activeSmallTitle = eventTarget.querySelector('.notes__small-title');
                        this.activeSmallBody = eventTarget.querySelector('.notes__small-body');
                        this.activeSmallBodyHidden = eventTarget.querySelector('.notes__small-body-hidden');      
                        this.activeSmallUpdated = eventTarget.querySelector('.notes__small-updated');
                    }
                    
                    const smallTitleText = this.activeSmallTitle.innerHTML,
                        smallBodyHiddenText = this.activeSmallBodyHidden.innerHTML;
                    // console.log(this);
                    this.onNoteSelect(activeNoteId);
                    this.updateActiveNote(smallTitleText, smallBodyHiddenText);
                }            
            }

            this.noteAddBtn.addEventListener('click', () => {
                this.onNoteAdd();
            });

            // this.inputTitle.addEventListener('blur', () => {
            //     this.onNoteEdit();
            // });

            // this.inputBody.addEventListener('blur', () => {
            //     this.onNoteEdit();
            // });

            this.searchField.addEventListener("keypress", (event) => {
                if (event.key == "Enter"){
                    const substringToSearch = this.searchField.value.toLowerCase();
                    this.onNoteSearch(substringToSearch, this.noteListItemsArray);
                }
            });               

            this.notesContainer.addEventListener('click', _sidebarClickHandler);

            // this.quill = new Quill('.notes__body__editor', {
            //     theme: 'snow'
            // });
            // this.quill_toolbar = this.root.querySelector('.ql-toolbar');
            // this.quill_container = this.root.querySelector('.ql-container');
            // this.ql_editor = this.quill_container.querySelector('.ql-editor');

            // this.editMode = false;

            this.editBtn.addEventListener('click', () => {
                // if(this.inputBody.type == "textarea") this.inputBody.type == "div";
                // console.log(this.quill);
                // this.bodyEditor.innerHTML = this.inputBody.innerHTML;
                if(this.editMode == false){
                    console.log(this.displayTitle, this.displayBody);
                    this.inputTitle.value = this.displayTitle.innerHTML;
                    this.qlEditor.innerHTML = this.displayBody.innerHTML;
                    this.editBtn.innerHTML = "Сохранить";
                    this._toggleEditMode(true);
                }
                else {
                    this.onNoteEdit();
                    this.displayTitle.innerHTML = this.inputTitle.value;
                    this.displayBody.innerHTML = this.qlEditor.innerHTML;
                    this._toggleEditMode(false);
                }
            });
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

    _toggleEditMode(enable){
        // activate edit mode
        if(enable){
            this.editBtn.innerHTML = "Сохранить";
            this.displayTitle.style.display = "none";
            this.displayBody.style.display = "none";            
            this.inputTitle.style.display = "initial";
            this.quillContainer.style.display = "initial";
            this.quillToolbar.style.display = "initial";
            this.editMode = true;
        }
        // deactivate edit mode
        else {
            this.editBtn.innerHTML = "Править";
            this.inputTitle.style.display = "none";
            this.quillContainer.style.display = "none";
            this.quillToolbar.style.display = "none";
            this.displayTitle.style.display = "initial";
            this.displayBody.style.display = "initial";
            this.editMode = false;
        }
    }

    createListItemHTML(id, title, body, lastUpdatedString){
        // console.log(id);
        // console.log(title);
        // console.log(body);
        // console.log(lastUpdatedString);

        const newNote = document.createElement("div"),
        newNoteSmallTitle = document.createElement("div"),
        newNoteDeleteBtn = document.createElement("button"),
        newNoteSmallBody = document.createElement("div"),
        newNoteSmallUpdated = document.createElement("div"),
        newNoteSmallBodyHidden = document.createElement("div");
        // the smallBody div will contain the note's text without tags
        // ("innerText-version" of it),

        // whereas the newNoteSmallBodyHidden will hold the full version
        // of the text with tags (the info to be displayed in the main
        // window upon clicking on the note's preview)

        newNote.classList += "note__list-item";
        newNote.id = id;
        newNoteSmallTitle.classList += "notes__small-title";
        newNoteDeleteBtn.classList += "notes__delete";
        newNoteSmallBody.classList += "notes__small-body";
        newNoteSmallUpdated.classList += "notes__small-updated";
        newNoteSmallBodyHidden.classList += "notes__small-body-hidden";

        newNoteSmallTitle.innerHTML = title;
        newNoteDeleteBtn.innerHTML = " X ";
        newNoteSmallBody.innerHTML = this.App._stripHTMLTags(body);
        newNoteSmallBodyHidden.innerHTML = body;
        newNoteSmallUpdated.innerHTML = lastUpdatedString;
        newNote.appendChild(newNoteSmallTitle);
        newNote.appendChild(newNoteDeleteBtn);
        newNote.appendChild(newNoteSmallBody);
        newNote.appendChild(newNoteSmallBodyHidden);
        newNote.appendChild(newNoteSmallUpdated);

        this.notesContainer.appendChild(newNote);
    }

    stripHTMLTags(html){
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.innerText; 
    }

    updateActiveNote(smallTitleText, smallBodyText){
        // this.inputTitle.value = smallTitleText;
        // this.inputBody.value = smallBodyText;
        this.displayTitle.innerHTML = smallTitleText;
        this.displayBody.innerHTML = smallBodyText;
        this.updatePreviewVisibility(true);
    }

    updateSmallActiveNote(smallTitleText, smallBodyText, smallBodyHiddenHTML){
        this.activeSmallTitle.innerHTML = smallTitleText;
        this.activeSmallBody.innerHTML= smallBodyText;
        this.activeSmallBodyHidden.innerHTML = smallBodyHiddenHTML;
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
        // console.log(notesMatrix.length);
        if(m > 0){
            for(let note of notesMatrix){
                // console.log(note);
                this.createListItemHTML(note['id'], note['name'], note['note_text'], note['creation_date']);
            }
        }
    }

}