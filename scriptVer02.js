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
        // nest td elements with values in tr element
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
        // add event listner in delete/accent buttons with functionality
        deleteBtn.addEventListener('click', () => {
            trRowTemplate.remove();
        });

        accentBtn.addEventListener('click', () => {
            trRowTemplate.classList.toggle('accent');
        });
        // nest delete/accent buttons in td element
        tdBtnsWrap.appendChild(deleteBtn);
        tdBtnsWrap.appendChild(accentBtn);
        // nest all elements in document fragment
        trRowFragment.appendChild(trRowTemplate).appendChild(tdBtnsWrap);
        // nest fully ready document fragments in HTML main table element
        tableSelector.appendChild(trRowFragment);
    }
    // add new task button
    addTaskBtn.addEventListener('click', addNewTask);
});