{
    let list = [];

    const addNewItem = (newItem) => {
        list.push({ content: newItem });
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

    const toggleNoDisplayClass = (element) => {
        element.classList.toggle("noDisplay");
    };

    const onEditNameListButton = () => {
        const nameListElement = document.querySelector(".js-nameList");
        nameListElement.contentEditable = true;

        nameListElement.style.backgroundColor = "rgb(215, 219, 221)";
        nameListElement.focus();

        toggleNoDisplayClass(document.querySelector(".js-editListNameImage"));
        toggleNoDisplayClass(document.querySelector(".js-saveListNameImage"));
    };

    const onSaveNameListButton = () => {
        const nameListElement = document.querySelector(".js-nameList");



        nameListElement.contentEditable = false;
        nameListElement.style.backgroundColor = "white";
        
        toggleNoDisplayClass(document.querySelector(".js-editListNameImage"));
        toggleNoDisplayClass(document.querySelector(".js-saveListNameImage"));
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
                <button class="buttonImage js-toggleDone">
                    ${item.done ? "<img src='images/checked.svg'>" : "<img src='images/square.svg'>"}
                </button>

                <span class="list__content">
                    ${item.content}
                </span>

                <button class="buttonImage buttonImage--remove js-remove">
                    <img src="images/garbage.svg">
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

    const onClearAllButton = () => {
        list = [];
        display();
        return list;
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);

        document.querySelector(".js-editListNameImage").addEventListener("click", onEditNameListButton);
        document.querySelector(".js-saveListNameImage").addEventListener("click", onSaveNameListButton);

        const clearAllListButton = document.querySelector(".js-clearAllListButton");
        clearAllListButton.addEventListener("click", onClearAllButton);
    };

    init();
}