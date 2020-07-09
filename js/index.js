'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const addToDoBtn = document.querySelector('#add-button'),
          addToDoInput = document.querySelector('#input'),
          outField = document.querySelector('#output');
    
    let toDoList = [];

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
    };

    if (localStorage.getItem('toDoList') !== null) {
        toDoList = JSON.parse( localStorage.getItem('toDoList') );

        toDoList.forEach((item) => {
            showTask(item.value);
        });
    }

    const addTask = () => {
        if (addToDoInput.value === '') return;

        showTask(addToDoInput.value);
        
        toDoList.push({checked: false, value: addToDoInput.value});
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    };

    addToDoBtn.addEventListener('click', addTask); 
});

  // const deleteToDoBtn = document.querySelectorAll('.trash-icon');

        // toDoList.push({checked: false, value: addToDoInput.value});

        // localStorage.setItem('toDoList', JSON.stringify(toDoList));


        // deleteToDoBtn.forEach((item, index) => {
        //     item.addEventListener('click', (event) => {
        //         event.target.closest('.to-do-item').remove();
        //         toDoList.splice(index, 1);
        //         console.log(index);
        //         localStorage.setItem('toDoList', JSON.stringify(toDoList));
        //     });
        // });