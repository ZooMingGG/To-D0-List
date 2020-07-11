'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const addToDoBtn = document.querySelector('#add-button'),
          addToDoInput = document.querySelector('#input'),
          outField = document.querySelector('#output');
    
    let toDoList = [];

    const removeTask = (event) => {
        let index;

        toDoList.forEach((item, i) => {
            if (item === index) {
                index = i;
            }
        });

        event.target.closest('.to-do-item').remove();
        toDoList.splice(index, 1);
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    };

    const addhandler = () => {
        const deleteButtons = document.querySelectorAll('.trash-icon');

        deleteButtons.forEach((item) => {
            item.addEventListener('click', removeTask);
        });
    };

    const showTask = (value) => {
        outField.insertAdjacentHTML('beforeEnd', `
            <div class="to-do-item">
                <input class="to-do-item-checkbox" type="checkbox">
                <div class="to-do-item-text">${value}</div>
                <div class="trash">
                    <img class="trash-icon" src="./images/trash.svg" alt="Trash icon">
                </div>
            </div>
        `);
        
        addhandler();
    };

    const showSavedTasks = () => {
        if (localStorage.getItem('toDoList') !== null) {
            toDoList = JSON.parse( localStorage.getItem('toDoList') );
    
            toDoList.forEach((item) => {
                showTask(item.value);
            });
        }
    };

    showSavedTasks();

    const addTask = () => {
        if (addToDoInput.value === '') return;

        showTask(addToDoInput.value);

        toDoList.push({checked: false, value: addToDoInput.value});
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    };

    addToDoBtn.addEventListener('click', addTask); 
});