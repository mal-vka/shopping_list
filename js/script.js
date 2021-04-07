{
    let list = [];

    const addNewItem = (newItem) => {
        list.push({content: newItem});
        display();                
    };

    const removeItem = (index) => {   
        list.splice(index, 1);
        display();
    };

    const toggleDoneItem = (index) => {
        list[index].done = !list[index].done;
        display();
    };    

    const bindRemoveEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");   
        
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeItem(index);
            });            
        });
    };

    const bindToggleDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");   
        
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDoneItem(index);
            });            
        });
    };   

    const display = () => {
        let yetDisplay = "";

        for (const item of list) {
            yetDisplay += `
            <li class="list__item js-task">
                <button class="list__button list__button--toggleDone js-toggleDone">
                    ${item.done ? "<img src='images/008-checked-1.svg'>" : ""}
                </button>

                <span class="list__content">
                    ${item.content}
                </span>

                <button class="list__button list__button--remove js-remove"><img src="images/005-garbage.svg">
                </button>
            </li>
            `;
        };

        document.querySelector(".js-list").innerHTML = yetDisplay;

        bindRemoveEvent();
        bindToggleDoneEvent();
    };
    
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newItemElement = document.querySelector(".js-input");
        const newItem = newItemElement.value.trim();

        if (newItem !== "") {
            addNewItem(newItem);
            newItemElement.value = "";             
        }     
        
        newItemElement.focus();
    };
    
    const onClearButton = () => {
        list = [];        
        display();
        return list;
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

        const clearListButton = document.querySelector(".js-clearListButton");
        clearListButton.addEventListener("click", onClearButton);
    };

    init();
}