'use script';

addEventListener('DOMContentLoaded', () => {


// unchangable global variables
    const tableSelector = document.querySelector('.main-table');
    const trRowFragment = document.createDocumentFragment();

function addTask() {

    // form values
    const nameValue = document.querySelector('#task-name').value;
    const creatDateValue = new Date().toLocaleDateString('en-us', { month:"long", day:"numeric", year: "numeric" });
    const categoryValue = document.querySelector('#choose-category').value;
    const noteValue = document.querySelector('#note-text').value;
    const plannedDateValue = document.querySelector('#date-id').value;

    // object from form values
    const tdCellsValues = {
        taskName: nameValue,
        dateCreate: creatDateValue,
        category: categoryValue,
        note: noteValue,
        datePlan: plannedDateValue
    };

    // creating tr tag with class name
    const trSelector = document.createElement('tr');
    trSelector.className = 'table-task-row';

    // creating td tag with class name
    const neon = document.createElement('td');
    neon.className = 'td-item-neon';
    
    // nesting tr tag inside fragmant and nesting td tag inside tr tag
    trRowFragment.appendChild(trSelector).appendChild(neon);

    // creating td elements with values from form
    Object.keys(tdCellsValues).forEach(key => {
        const td = document.createElement('td');
        td.className = 'td-item';

        if(key === 'note') {
            td.className = 'td-item cell-width'
        }

        td.textContent = tdCellsValues[key];
        trRowFragment.appendChild(trSelector).appendChild(td);
    });

    // creating td wrapper for buttons
    const tdButtonsWrap = document.createElement('td');
    tdButtonsWrap.className = 'td-item';

    // creating delete/accent buttons
    const tdButtonDelete = document.createElement("button");
    tdButtonDelete.className = 'btn-style';
    tdButtonDelete.textContent = 'Delete';

    const tdButtonAccent = document.createElement("button");
    tdButtonAccent.className = 'btn-style';
    tdButtonAccent.textContent = 'Accent';

    // adding event lisner on our delete/accent buttons
    tdButtonDelete.addEventListener('click', () => trSelector.remove());
    tdButtonAccent.addEventListener('click', () => trSelector.classList.toggle('accent'));
    
    // nesting our tr wrapper and buttons inside of it
    trRowFragment.appendChild(trSelector).appendChild(tdButtonsWrap).appendChild(tdButtonDelete);
    trRowFragment.appendChild(trSelector).appendChild(tdButtonsWrap).appendChild(tdButtonAccent);

    // nesting our full html block in our html table tag
    tableSelector.appendChild(trRowFragment);
}

const addTaskBtn = document.querySelector('#add-task');

addTaskBtn.addEventListener('click', addTask);








});


  


