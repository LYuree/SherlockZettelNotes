export default class NotesView{
    static initialDisplay = 'inline-block';

    constructor(appObj, root, {onNoteSearch, onNoteSelect,  onNoteAdd,  onNoteEdit, onNoteDelete},
        marginTopShifted, marginTopUnshifted = {}){

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
        this.activeSmallBodyHidden = null;
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

        this.marginTopShifted = marginTopShifted;
        this.marginTopUnshifted = marginTopUnshifted;

        this.quill = new Quill('.notes__body__editor', {
            theme: 'snow'
        });
        this.quillToolbar = this.root.querySelector('.ql-toolbar');
        this.quillContainer = this.root.querySelector('.ql-container');
        this.qlEditor = this.quillContainer.querySelector('.ql-editor');
        this.qlTooltip = this.root.querySelector(".ql-tooltip");
        this.qlLinkInput = this.qlTooltip.querySelector('input');

        this.qlTooltip.tabIndex = "0";
        // this.qlEditor.innerHTML = `
        //     <div class="notes__body__editor__drop_down_menu" tabindex="0">
        //         <ul class="notes__body__editor__drop_down_menu__list" tabindex="0">
        //         </ul>
        //     </div>`;

        this.qlDropDownMenu = this.root.querySelector('.notes__body__editor__drop_down_menu');
        console.log(this.qlDropDownMenu);
        this.qlDropDownMenuList = this.qlDropDownMenu.querySelector('.notes__body__editor__drop_down_menu__list');

        this.editMode = false;

        
        this.qlActionBtn = this.qlTooltip.querySelector('.ql-action');
        this.qlActionBtn.addEventListener('click', () =>{
            setTimeout(console.log(document.currentScript));
        });
        
        this.qlDropDownMenuList.addEventListener('click', clickEvent => {
            var item = clickEvent.target;
            // console.log("Item: ", item.classList.contains('notes__body__editor__drop_down_menu__list__item'));
            while (!item.classList.contains('notes__body__editor__drop_down_menu__list__item')){
                item = item.parentNode;
                console.log(item);
            }
            this.qlLinkInput.value = window.location.href +
                "?linkedNoteId=" + item.dataset.linkedNoteId;
            const event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            // the reason why the decision was made to
            // manually invoke the 'input' event
            // is it seems like unless such an event
            // is fired on the link-input field,
            // the ql-action (save) button just doesn't
            // save the changes to href;
            // and here the value for the input is set not
            // through users input, but rather via js
            // (hence the 'input' even doesn't occur)
            this.qlLinkInput.dispatchEvent(event);
            this.qlDropDownMenu.style.display = 'none';
            this.qlTooltip.classList.remove('active');
        });

        this.qlLinkInput.addEventListener('input', () => {
            let dropDownNotesListCoords = this.qlDropDownMenu.getBoundingClientRect();
            console.log(dropDownNotesListCoords.top, dropDownNotesListCoords.left);
            // this._initiateDropDownList(this.App.notesMatrix);
            this._fillDropDown();
            const qlLinkInputCoords = this.qlLinkInput.getBoundingClientRect();
            // console.log(linkInputCoords.top, linkInputCoords.right,
            //     linkInputCoords.bottom, linkInputCoords.left);
            const newTop = (+qlLinkInputCoords.bottom),
                newLeft = (+qlLinkInputCoords.left + (+this.qlLinkInput.style.width));
            // console.log(newTop, newLeft);
            this.qlDropDownMenu.style.top = newTop + 'px';
            this.qlDropDownMenu.style.left = newLeft + 'px';
            dropDownNotesListCoords = this.qlDropDownMenu.getBoundingClientRect();
            // console.log(this.qlDropDownMenu.style.top, this.qlDropDownMenu.style.left);
            this.qlDropDownMenu.style.display = 'initial';
            // this.qlDropDownMenu.classList.add('active');
            this.qlDropDownMenu.style.zIndex = 999;
            // this.qlDropDownMenu.focus();
        });

        this.qlEditor.addEventListener('scroll', scrollEvent => {
            const scrollTop = scrollEvent.target.scrollTop;
            this.qlDropDownMenu.style.marginTop = 0 - scrollTop + 'px';
        });

        this.qlLinkInput.addEventListener('focus', () => {
            this.qlDropDownMenu.display = 'none';
        })

        this.qlLinkInput.addEventListener('blur', blurEvent => {
            console.log(blurEvent.relatedTarget);
            const blurRelatedTarget = blurEvent.relatedTarget;
            if(blurRelatedTarget == null || (!blurRelatedTarget.classList.contains("notes__body__editor__drop_down_menu__list__item")
                && !blurRelatedTarget.classList.contains("notes__body__editor__drop_down_menu__list")
                && !blurRelatedTarget.classList.contains("notes__body__editor__drop_down_menu")
                && !blurRelatedTarget.classList.contains("ql-tooltip")
                || blurRelatedTarget.classList.contains("notes__preview__top_section__button")
                || blurRelatedTarget.classList.contains("ql-action"))){
                this.qlDropDownMenu.style.display = 'none';
                console.log(this.qlDropDownMenu.style.display);
                this.qlTooltip.classList.remove('active');
            }
            else this.qlTooltip.classList.add('active');
        });

        this.qlActionBtn.addEventListener('click', () => {
            this.qlDropDownMenu.style.display = 'none';
            // console.log(this.qlDropDownMenu.style.display);
            this.qlTooltip.classList.remove('active');
        });
        
        this.notePreview.addEventListener('click', clickEvent => {
            clickEvent.preventDefault();
            const eventTarget = clickEvent.target,
                targetClassList = clickEvent.target.classList,
                targetTagName = eventTarget.tagName.toLowerCase();
                // targetParentClassList = eventTarget.parentNode.classList;
                // console.log(eventTarget);
            let eventTargetLinkElement = eventTarget;
            while(eventTargetLinkElement && eventTargetLinkElement.tagName &&
                    eventTargetLinkElement.tagName.toLowerCase() != "a"){
                eventTargetLinkElement = eventTargetLinkElement.parentNode;
                // console.log(eventTargetLinkElement.tagName.toLowerCase());
            }
            // console.log(eventTargetLinkElement);
            if(targetTagName == "a"){
                if(this.editMode == true){
                    if(targetClassList.contains("ql-preview")){
                        const appsHref = window.location.href,
                        eventTargetURL = new URL(eventTarget.href),
                        eventTargetURLHref = eventTargetURL.href;
                        // console.log(eventTargetURLHref);
                        if(eventTargetURLHref.indexOf(appsHref) != -1){
                            this._confirmSavingChanges();
                            this._visitLinkedNote(eventTargetURL);
                        }
                        else this._visitExternalWebSite(eventTargetURL);
                    }
                    else if (targetClassList.contains("ql-action")){
                        // ???
                    }
                }
                else{
                    const appsHref = window.location.href,
                        eventTargetURL = new URL(eventTarget.href),
                        eventTargetURLHref = eventTargetURL.href;
                        console.log(eventTargetURLHref, appsHref);
                    console.log(eventTargetURLHref.indexOf(appsHref));
                    console.log(eventTargetURLHref.indexOf(appsHref));
                    if(eventTargetURLHref.indexOf(appsHref) != -1)
                        this._visitLinkedNote(eventTargetURL);
                    else
                        this._visitExternalWebSite(eventTargetURL);
                }
            }
            else if (eventTargetLinkElement != null &&
                eventTargetLinkElement.tagName != null &&
                eventTargetLinkElement.tagName.toLowerCase() == "a" &&
                this.editMode != true){
                const appsHref = window.location.href,
                    eventTargetLinkElementURL = new URL(eventTargetLinkElement.href),
                    eventTargetLinkElementHref = eventTargetLinkElementURL.href;
                    console.log(eventTargetLinkElementHref, appsHref);
                // console.log(eventTargetURLHref.indexOf(appsHref));
                // console.log(eventTargetURLHref.indexOf(appsHref));
                if(eventTargetLinkElementHref.indexOf(appsHref) != -1)
                    this._visitLinkedNote(eventTargetLinkElementURL);
                else
                    this._visitExternalWebSite(eventTargetLinkElementURL);
            }
        });

        const _sidebarClickHandler = clickEvent => {
            // console.log(this);
            if(this.editMode == true){
                const save = confirm("Save changes to the current note?");
                if(save) {
                    this.onNoteEdit();
                    this.displayTitle.innerHTML = this.inputTitle.value;
                    this.displayBody.innerHTML = this.qlEditor.innerHTML;
                    this.editBtn.innerHTML = "Править";

                    this.inputTitle.style.display = "none";
                    this.quillContainer.style.display = "none";
                    this.quillToolbar.style.display = "none";
                    // this.displayTitle.style.display = "initial";
                    // this.displayBody.style.display = "initial";
                    this.displayTitle.style.display = "inline-block";
                    this.displayBody.style.display = "initial";
                }
                else {
                    this.editBtn.innerHTML = "Править";

                    this.inputTitle.style.display = "none";
                    this.quillContainer.style.display = "none";
                    this.quillToolbar.style.display = "none";

                    // this.onNoteEdit();

                    this.displayTitle.style.display = "inline-block";
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
                const confirmDeletion = confirm('Are you sure you want to delete this note?');
                const idToRemove = eventTarget.parentNode.id;                    
                if(confirmDeletion){
                    console.log(this.App.username);
                    this.onNoteDelete(idToRemove, this.App.username);
                    eventTarget.parentNode.remove();
                    this.updatePreviewVisibility(false);
                }        
            }
            else{
                    const currActiveNote = this.App.activeNoteId ? this._searchHTMLCollection(this.noteListItemsArray, this.App.activeNoteId) : null;
                    console.log(currActiveNote);
                    if(currActiveNote){
                        currActiveNote.classList.remove('active');
                        currActiveNote.classList.remove('selected');
                        // const nextNote = NotesView._getNextNoteItem(targetNote);
                        // if(nextNote){
                        //     nextNote.classList.add('shifted');
                        //     nextNote.style.marginTop = 0;
                        // }
                    }
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
                        // const previousActiveNote = NotesView.activeNoteId ? NotesView.view._searchHTMLCollection(this.view.noteListItemsArray, this.activeNoteId) : null;
                        // console.log(previousActiveNote);
                        // if(previousActiveNote){
                        //     previousActiveNote.classList.remove('active');
                        //     previousActiveNote.classList.remove('selected');
                        // }
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
                console.log('add btn click');
                console.log(this);
                this.onNoteAdd();
                // this.updateActiveNote();
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
            
            this.notesContainer.addEventListener('mouseover', event => {
                const eventTarget = event.target;
                // console.log(eventTarget);
                if(!eventTarget.classList.contains('notes__list-items__container')){
                    try{
                        const targetNote = NotesView._getNoteItem(eventTarget);
                        const nextNote = NotesView._getNextNoteItem(targetNote);
                        targetNote.classList.add('active');
                        if(nextNote){
                            nextNote.classList.add('shifted');
                            nextNote.style.marginTop = this.marginTopShifted;
                            console.log(this.marginTopShifted);
                        }
                    }
                    catch (err) {
                        console.log(eventTarget);
                    }
                }
            });

            this.notesContainer.addEventListener('mouseout', event => {
                console.log(this);
                const eventTarget = event.target;
                if(!eventTarget.classList.contains('notes__list-items__container')){
                    const targetNote = NotesView._getNoteItem(eventTarget);
                    if(!targetNote.classList.contains('selected')){
                        const nextNote = NotesView._getNextNoteItem(targetNote);
                        targetNote.classList.remove('active');
                        if(nextNote){
                            nextNote.classList.remove('shifted');
                            nextNote.style.marginTop = this.marginTopUnshifted;
                            console.log(this.marginTopUnshifted);
                        }
                    }
                }
            });

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
                    // console.log(this.displayTitle, this.displayBody);
                    this.inputTitle.value = this.displayTitle.innerHTML;
                    this.qlEditor.innerHTML = this.displayBody.innerHTML;
                    this.editBtn.innerHTML = "Сохранить";
                    this._toggleEditMode(true);
                }
                else {
                    const changesApplied = this.onNoteEdit();
                    if(changesApplied){
                        this.displayTitle.innerHTML = this.inputTitle.value;
                        this.displayBody.innerHTML = this.qlEditor.innerHTML;
                        this._toggleEditMode(false);
                    }
                }
            });
    }


    static _getNoteItem(eventTarget){
        const targetClassList = eventTarget.classList;
        let nextNote = null;
        if (targetClassList.contains("notes__small-title")
            || targetClassList.contains("notes__small-body")
            || targetClassList.contains("notes__small-updated")
            || targetClassList.contains("notes__delete"))
            {
                return eventTarget.parentNode;
            }
            else if(targetClassList.contains("note__list-item"))
            {
                return eventTarget;
            }
        return nextNote;
    }

    static _getNextNoteItem(targetNote){
        return targetNote.nextSibling ?? null;
    }


    toggleNotesSidebar(active){
        if(active){
            this.notesSidebar.classList.add('active');
            this._toggleMinMaximizeBtn();
        }
        else{
            this.notesSidebar.classList.remove('active');
            this._toggleMinMaximizeBtn();
        }
    }

    _toggleMinMaximizeBtn(){
        console.log(this);
        if(this.App.minMaximizeBtn.classList.contains('fa-arrow-left')){
            this.App.minMaximizeBtn.classList.remove('fa-arrow-left');
            this.App.minMaximizeBtn.classList.add('fa-arrow-right');
        }
        else {
            this.App.minMaximizeBtn.classList.remove('fa-arrow-right');
            this.App.minMaximizeBtn.classList.add('fa-arrow-left');
        }
    }

    _fillDropDown(){
        this.App._clearChildNodes(this.qlDropDownMenuList);
        const inputValue = this.qlLinkInput.value;
        for (const note of this.App.notesMatrix){
            const substrTitleIndex = note['name'].toLowerCase().indexOf(inputValue),
                substrBodyIndex = note['note_text'].toLowerCase().indexOf(inputValue);
            if(substrBodyIndex != -1 || substrTitleIndex != -1)
            {
                const inputLength = inputValue.length;
                let bodyExtract = null,
                    titleExtract = null;
                if(substrBodyIndex != -1) bodyExtract = note['note_text'].substring(substrBodyIndex, substrBodyIndex + 52);
                else bodyExtract = this.App._stripHTMLTags(note['note_text']).substring(0, 52); //default substring starts from the beginning of the note's text

                if(substrTitleIndex != -1) titleExtract = note['name'].substring(substrTitleIndex, substrTitleIndex + 52);
                else titleExtract = note['name'].substring(0, 52); //default substring starts from the beginning of the note's title
                
                // const dropDownItem = this._createDropDownItem(note['id'], note['name'], bodyExtract);
                const dropDownItem = this._createDropDownItem(note['id'], titleExtract, bodyExtract);
                // this.qlDropDownMenu.appendChild(dropDownItem);
                this.qlDropDownMenuList.appendChild(dropDownItem);
                // console.log(this.qlDropDownMenu);
            }
        }        
    }

    // obsolete?
    // _getDropDownSubstring = (str, start, end, maxLength) => {
    //     const substrLength =  end - start;
    //     if(substrLength < maxLength) {
    //         const spareLength = maxLength - substrLength;
    //         start = start - Math.floor(spareLength/2.0);
    //         end = start + Math.ceil(spareLength/2.0);
    //     }
    //     return str.substring(start, end+1);
    // };


    _createDropDownItem(noteId, title, bodyExtract){
        const listItem = document.createElement("li"),
            heading = document.createElement("p"),
            body = document.createElement("p");

        listItem.classList += "notes__body__editor__drop_down_menu__list__item";
        heading.classList += "notes__body__editor__drop_down_menu__list__item__heading bold";
        body.classList += "notes__body__editor__drop_down_menu__list__item__text";

        heading.innerText = title;
        body.innerText = this.App._stripHTMLTags(bodyExtract);

        listItem.appendChild(heading);
        listItem.appendChild(body);
        listItem.dataset.linkedNoteId = noteId;

        // tabIndex is needed for a li-element to
        // be able to receive focus
        // (is checked upon the blur event occurring
        // on the qlLinkInput element
        // when the .relatedTarget is accessed)
        
        listItem.tabIndex="0";
        // console.log(listItem);
        return listItem;
    }

    // this.searchField.addEventListener("keypress", (event) => {
    //     if (event.key == "Enter"){
    //         const substringToSearch = this.searchField.value.toLowerCase();
    //         this.onNoteSearch(substringToSearch, this.noteListItemsArray);
    //     }
    // });      


    _searchHTMLCollection(collection, id){
        for (const element of collection){
            if(element.id == id) return element;
        }
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
    

    _visitExternalWebSite(clickTargetURL){
        window.open(clickTargetURL.href, '_blank').focus();
    }

    _visitLinkedNote(clickTargetURL){
        const urlParams = new URLSearchParams(clickTargetURL.search),
        linkedNoteId = urlParams.get('linkedNoteId');
        // console.log("Params: ", urlParams);
        // console.log("URL: ", clickTargetURL);
        // console.log("ID: ", linkedNoteId);
        if(linkedNoteId != null && linkedNoteId != undefined){
            if(!this.App.noteExists(linkedNoteId)){
                alert('Error: the referred note does not seem to exist.');
            }
            else {
                this.activeNoteId = linkedNoteId;
                const linkedNote = this._searchHTMLCollection(this.noteListItemsArray, linkedNoteId);
                // const linkedNote = this.noteListItemsArray.find(element => element.id == linkedNoteId);
                console.log(linkedNote);
                this.activeSmallTitle = linkedNote.querySelector('.notes__small-title');
                this.activeSmallBody = linkedNote.querySelector('.notes__small-body');
                this.activeSmallBodyHidden = linkedNote.querySelector('.notes__small-body-hidden');      
                this.activeSmallUpdated = linkedNote.querySelector('.notes__small-updated');
                const smallTitleText = this.activeSmallTitle.innerHTML,
                    smallBodyHiddenText = this.activeSmallBodyHidden.innerHTML;
                // console.log(this);
                this.onNoteSelect(this.activeNoteId);
                this.updateActiveNote(smallTitleText, smallBodyHiddenText);
            }
        }
    }

    _saveChanges(){
        this.onNoteEdit();
        this.displayTitle.innerHTML = this.inputTitle.value;
        this.displayBody.innerHTML = this.qlEditor.innerHTML;
    }
    
    _confirmSavingChanges(){
        const save = confirm("Save changes to the current note?");
                if(save) {
                    this._saveChanges();
                    this.editBtn.innerHTML = "Edit";

                    this.inputTitle.style.display = "none";
                    this.quillContainer.style.display = "none";
                    this.quillToolbar.style.display = "none";
                    this.displayTitle.style.display = "inline-block";
                    this.displayBody.style.display = "initial";
                }
                else {
                    this.editBtn.innerHTML = "Edit";

                    this.inputTitle.style.display = "none";
                    this.quillContainer.style.display = "none";
                    this.quillToolbar.style.display = "none";

                    // this.onNoteEdit();

                    this.displayTitle.style.display = "inline-block";
                    this.displayBody.style.display = "initial";
                }
                this.editMode = false;
    }

    _toggleEditMode(enable){
        this.qlTooltip.classList.remove('active');
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
            this.displayTitle.style.display = "inline-block";
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
        
        // const newNoteCoords = document.getBoundingClientRect(newNote);
        // newNote.style.top = newNoteCoords.top
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
        console.log("initiating the notes list");
        //this method is only used for the initial client-side note items list load,
        //when the user gets authorized and the browser sends a query to get all the notes from the user's collection;
        //further updates to the client-side display of the notes list are acomplished without using this method;
        //again: this is only for the INITIAL list upload.
        const m = notesMatrix.length;
        // console.log(notesMatrix.length);
        if(m > 0){
            for(let note of notesMatrix){
                // console.log(notesMatrix);
                this.createListItemHTML(note['id'], note['name'], note['note_text'], note['creation_date']);
            }
        }
    }

}