{
    const list = [];

    const addItem = (newItem) => {
        list.push({content: newItem});
        display();                
    };

    // const removeItem = (index) => {
    //     list.splice(index, 1);
    //     display();
    // };

    const display = () => {
        let yetDisplay = "";

        for (const item of list) {
            yetDisplay += `
            <li class="list__item js-task">
                <button class="list__button list__button--toggleDone js-toggleDone">
                    ${item.done ? "<img src='../images/008-checked-1.svg'>" : ""}
                </button>

                <span class="list__content">
                    ${item.content}
                </span>

                <button class="list__button list__button--remove js-remove"><img src="../images/005-garbage.svg">
                </button>
            </li>
            `;
        };

        document.querySelector(".js-list").innerHTML = yetDisplay;
    };
    
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newItem = document.querySelector(".js-input").value.trim();

        if (newItem !== "") {
            addItem(newItem);
            // newItem.value = "";             
        }     
        
        // newItem.focus();
    };
    
    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}