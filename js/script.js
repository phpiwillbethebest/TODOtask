'use strict';

addEventListener('DOMContentLoaded', () => {

    // some global variables
    const mainTabSel = document.querySelector('.main-tab');
    const opnTskBarBtn = document.querySelector('.opn-tsk-bar');
    const clsTskBarBtn = document.querySelector('.cls-tsk-bar');
    const crtNewTskBtn = document.querySelector('.crt-new-tsk');
    const tskBarForm = document.querySelector('.tsk-bar-form');
    const trFragsCont = document.createDocumentFragment();

    // ID counters for td cells
    let idCont = 0;
    let idContEdt = 0;

    // main function to add/edit/delete/accent tr rows
    function addTask() {

        // input vals from task bar
        const tskName = document.querySelector('.tsk-name').value;
        const tskCrtDate = new Date().toLocaleDateString('en-us', { month:"long", day:"numeric", year: "numeric" });
        const tskCategory = document.querySelector('.tsk-cat').value;
        const tskNote = document.querySelector('.tsk-note').value;
        const tskDate = document.querySelector('.tsk-date').value;

        // create empty tr element
        const trElem = document.createElement('tr');
        trElem.className = 'tab-row';

        // create empty td element for hover visuals from left side
        const tdElemNeon = document.createElement('td');
        tdElemNeon.className = 'tab-row-itm-neon';
        trElem.appendChild(tdElemNeon);

        // func for creating buttons DRY
        function createButton(btnClass, btnName) {
            const btn = document.createElement('button');
            btn.className = btnClass;
            btn.textContent = btnName;
            return btn;
        }

        // creating all buttons
        const editBtn = createButton('edit-btn btn-stl-small', 'Edit');
        const accentBtn = createButton('accent-btn btn-stl-small', 'Accent');
        const deleteBtn = createButton('delete-btn btn-stl-small', 'Delete');
        const saveBtn = createButton('save-btn btn-stl-small', 'Save');
        const cancelBtn = createButton('cancel-btn btn-stl-small', 'Cancel');

        // collect all vals in one object
        const tdCellVals = {
            name: tskName,
            crtDate: tskCrtDate,
            category: tskCategory,
            note: tskNote,
            date: tskDate,
            btns: {
                edit: editBtn,
                accent: accentBtn,
                delete: deleteBtn
            }
        };

        // loop through the object to create full tr element 
        Object.keys(tdCellVals).forEach(key => {

            if(key !== 'btns') {
                const tdElem = document.createElement('td');
                tdElem.className = 'tab-row-itm';
                tdElem.id = `id${idCont += 1}`;
                tdElem.textContent = tdCellVals[key];

                trFragsCont.appendChild(trElem).appendChild(tdElem);
            } else {
                const tdElemBtn = document.createElement('td');
                tdElemBtn.className = 'tab-row-itm conf';

                Object.keys(tdCellVals.btns).forEach(key => {
                    trFragsCont.appendChild(trElem).appendChild(tdElemBtn).appendChild(tdCellVals.btns[key]);
                });
            }
        });

        // nest document fragment in main table
        mainTabSel.appendChild(trFragsCont);

        // select td cells by id to edit them
        const nameEdt = document.querySelector(`#id${idContEdt += 1}`);
        const categoryEdt = document.querySelector(`#id${idContEdt += 2}`);
        const noteEdt = document.querySelector(`#id${idContEdt += 1}`);
        const dateEdt = document.querySelector(`#id${idContEdt += 1}`);

        // object to keep values for cancel return
        const objCancel = {
            cancelName: null,
            cancelCategory: null,
            cancelNote: null,
            cancelDate: null
        };

        // function that'll create input, textarea, select HTML elems only!!!
        // tagName = name of HTML tag that we want to create (Important)
        // className = add a class name to created element (Not important)
        // inputType = add type to input tag (Important for input tag only)
        // arrForSelectTag = add options vals to select tag (Important for select tag only)
        function createInput(tagName, className, inpType, arrForSelectTag) {
            const newElem = document.createElement(tagName);

            if(tagName === 'input') {
                newElem.type = inpType;

                if(className) {
                    newElem.className = className;
                }

                return newElem;
            }

            if(tagName === 'textarea') {
                if(className) {
                    newElem.className = className;
                }
                return newElem;
            }

            if(tagName === 'select') {

                arrForSelectTag.forEach(item => {
                    const optElem = document.createElement('option');
                    optElem.textContent = item;
                    newElem.appendChild(optElem);
                });

                if(className) {
                    newElem.className = className;
                }

                return newElem;
            }
        };

        // create edit inputs, textarea, select
        const nameInputEdit = createInput('input', 'edt-tsk-stl', 'text')
        const categorySelectEdit = createInput('select', 'edt-tsk-stl', null, ['Task', 'Idea', 'Important', 'Random Thought', 'Other']);
        const noteTextareaEdit = createInput('textarea', 'edt-tsk-stl txt-area');
        const dateInputEdit = createInput('input', 'edt-tsk-stl', 'date');

        // add edit event on edit button
        editBtn.addEventListener('click', () => {
            // send values that were before editing to object in case if we want to cancel changes
            objCancel.cancelName = nameEdt.textContent;
            objCancel.cancelCategory = categoryEdt.textContent;
            objCancel.cancelNote = noteEdt.textContent;
            objCancel.cancelDate = dateEdt.textContent;

            // turn text content into input values
            nameInputEdit.value = nameEdt.textContent;
            categorySelectEdit.value = categoryEdt.textContent;
            noteTextareaEdit.value = noteEdt.textContent;
            dateInputEdit.value = dateEdt.textContent;

            // delete text content from td cellc
            nameEdt.textContent = '';
            categoryEdt.textContent = '';
            noteEdt.textContent = '';
            dateEdt.textContent = '';

            // add input, textarea, select elements into td cells
            nameEdt.appendChild(nameInputEdit);
            categoryEdt.appendChild(categorySelectEdit);
            noteEdt.appendChild(noteTextareaEdit);
            dateEdt.appendChild(dateInputEdit);

            // replace btns edit with save and accent with cancel
            editBtn.replaceWith(saveBtn);
            accentBtn.replaceWith(cancelBtn);
        });

        // add delete event on delete button
        deleteBtn.addEventListener('click', () => {
            trElem.remove();
        });

        // add cancel event on cancel button
        cancelBtn.addEventListener('click', () => {
            // remove input, textarea, select elements from td cells
            nameInputEdit.remove();
            categorySelectEdit.remove();
            noteTextareaEdit.remove();
            dateInputEdit.remove();
    
            // return text content same as it was before editing
            nameEdt.textContent = objCancel.cancelName;
            categoryEdt.textContent = objCancel.cancelCategory;
            noteEdt.textContent = objCancel.cancelNote;
            dateEdt.textContent =  objCancel.cancelDate;
    
            // change btns cancel with accent and save with edit
            cancelBtn.replaceWith(accentBtn);
            saveBtn.replaceWith(editBtn);
        });

        // add save event on save button
        saveBtn.addEventListener('click', () => {
            // get text values from inputs 
            const nameVal = nameInputEdit.value;
            const catVal = categorySelectEdit.value;
            const notVal = noteTextareaEdit.value;
            const datVal = dateInputEdit.value;
    
            // remove input, textarea, select elements from td cells
            nameInputEdit.remove();
            categorySelectEdit.remove();
            noteTextareaEdit.remove();
            dateInputEdit.remove();
    
            // add text content in td cells from input, textarea, select elements
            nameEdt.textContent = nameVal;
            categoryEdt.textContent = catVal;
            noteEdt.textContent = notVal;
            dateEdt.textContent = datVal;
    
            // change btns save with edit and cancel with accent
            saveBtn.replaceWith(editBtn);
            cancelBtn.replaceWith(accentBtn);
        });

        // add accent event on sccent button
        accentBtn.addEventListener('click', () => {
            trElem.classList.toggle('accent');
        });

    }

    // open task bar form
    opnTskBarBtn.addEventListener('click', () => {
        tskBarForm.classList.toggle('open');
        opnTskBarBtn.classList.toggle('hide');
        clsTskBarBtn.classList.toggle('hide');
    });

    // close task bar form
    clsTskBarBtn.addEventListener('click', () => {
        tskBarForm.classList.toggle('open');
        opnTskBarBtn.classList.toggle('hide');
        clsTskBarBtn.classList.toggle('hide');
    });

    // create new task row
    crtNewTskBtn.addEventListener('click', addTask);

});