'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const addToDoBtn = document.querySelector('#add-button'),
          addToDoInput = document.querySelector('#input'),
          outField = document.querySelector('#output');
    
    const toDoList = [];     

    addToDoBtn.addEventListener('click', () => {
        if (addToDoInput.value === '') return;

        outField.insertAdjacentHTML('beforeEnd', `
            <div class="to-do-item">
                <input class="to-do-item-checkbox" type="checkbox">
                <div class="to-do-item-text">${addToDoInput.value}</div>
                <div class="trash">
                    <img class="trash-icon" src="./images/trash.svg" alt="Trash icon">
                </div>
            </div>
        `);

        toDoList.push({checked: false, value: addToDoInput.value});

        localStorage.setItem('toDoList', JSON.stringify(toDoList));

        const deleteToDoBtn = document.querySelectorAll('.trash-icon');

        deleteToDoBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.target.closest('.to-do-item').remove();
            });
        });
    }); 
});
