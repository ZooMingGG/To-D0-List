'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const addToDoBtn = document.querySelector('#add-button'),
          addToDoInput = document.querySelector('#input'),
          outField = document.querySelector('#output');
    
    let toDoList = [];

    const addHandlers = () => {
        const deleteButtons = document.querySelectorAll('.trash-icon');
        const checkboxList = document.querySelectorAll('.to-do-item-checkbox');

        const removeTask = (event) => {
            const deleteButtons = document.querySelectorAll('.trash-icon');
            let index;
            
            deleteButtons.forEach((item, i) => {
                if (item === event.target) {
                    index = i;
                }
            });

            event.target.closest('.to-do-item').remove();
            toDoList.splice(index, 1);
            localStorage.setItem('toDoList', JSON.stringify(toDoList));
        };

        const checkTask = (event) => {
            const checkboxList = document.querySelectorAll('.to-do-item-checkbox');
            let index;

            checkboxList.forEach((item, i) => {
                if (item === event.target) {
                    index = i;
                }
            });

            toDoList[index].checked = checkboxList[index].checked;

            localStorage.setItem('toDoList', JSON.stringify(toDoList));
        };

        deleteButtons.forEach((item) => {
            item.onclick = removeTask;
        });

        checkboxList.forEach((item) => {
            item.onclick = checkTask;
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

        addHandlers();
    };

    const showSavedTasks = () => {
        if (localStorage.getItem('toDoList') !== null) {
            toDoList = JSON.parse( localStorage.getItem('toDoList') );
    
            toDoList.forEach((item) => {
                showTask(item.value);
            });

            if (toDoList.length > 0) {
                const checkbox = document.querySelectorAll('.to-do-item-checkbox');

                toDoList.forEach((item, index) => {
                    checkbox[index].checked = item.checked;
                });
            }
        }
    };

    showSavedTasks();

    const addTask = () => {
        if (addToDoInput.value === '') return;

        showTask(addToDoInput.value);

        toDoList.push({checked: false, value: addToDoInput.value});
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    };

    addToDoInput.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
            addTask();
        }
    });
    addToDoBtn.addEventListener('click', addTask); 
});