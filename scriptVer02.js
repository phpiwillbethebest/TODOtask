'use strict';
// wait till dom loads
addEventListener('DOMContentLoaded', () => {
    // unchangable values
    const tableSelector = document.querySelector('.main-table');
    const trRowFragment = document.createDocumentFragment();
    const addTaskBtn = document.querySelector('#add-task');
    // add task function
    function addNewTask() {
        // values from input form
        const nameValue = document.querySelector('#task-name').value;
        const creatDateValue = new Date().toLocaleDateString('en-us', { month:"long", day:"numeric", year: "numeric" });
        const categoryValue = document.querySelector('#choose-category').value;
        const noteValue = document.querySelector('#note-text').value;
        const plannedDateValue = document.querySelector('#date-id').value;
        // create empty tr element with a class name
        const trRowTemplate = document.createElement('tr');
        trRowTemplate.className = 'table-task-row';
        // nest inside of tr element our td elements with values
        trRowTemplate.innerHTML = `
        <td class="td-item-neon"></td>
        <td class="td-item">${nameValue}</td>
        <td class="td-item">${creatDateValue}</td>
        <td class="td-item">${categoryValue}</td>
        <td class="td-item cell-width">${noteValue}</td>
        <td class="td-item">${plannedDateValue}</td>`;
        // create empty td element for buttons
        const tdBtnsWrap = document.createElement('td');
        tdBtnsWrap.className = 'td-item';
        // create delete/accent buttons
        const deleteBtn = document.createElement("button");
        deleteBtn.className = 'btn-style';
        deleteBtn.textContent = 'Delete';

        const accentBtn = document.createElement("button");
        accentBtn.className = 'btn-style';
        accentBtn.textContent = 'Accent';
        // add event listner or delete/accent buttons with functionality
        deleteBtn.addEventListener('click', () => {
            trRowTemplate.remove();
        });

        accentBtn.addEventListener('click', () => {
            trRowTemplate.classList.toggle('accent');
        });
        // nest delete/accent buttons inside td element
        tdBtnsWrap.appendChild(deleteBtn);
        tdBtnsWrap.appendChild(accentBtn);
        // nest all elements inside our document fragment
        trRowFragment.appendChild(trRowTemplate).appendChild(tdBtnsWrap);
        // nest our fully ready document fragments inside HTML main table
        tableSelector.appendChild(trRowFragment);
    }
    // add new task button
    addTaskBtn.addEventListener('click', addNewTask);
});