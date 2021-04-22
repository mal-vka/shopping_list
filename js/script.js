{
    let userLists = [{ listName: "My shopping list", listItems: [] },
    { listName: "My shopping list", listItems: [] }
    ];

    let currentListIndex = 0;

    const addNewItem = (newItem) => {
        userLists[currentListIndex].listItems.push({ content: newItem });
        display();
    };

    const removeItem = (index) => {
        userLists[currentListIndex].listItems.splice(index, 1);
        display();
    };

    const toggleDoneItem = (index) => {
        userLists[currentListIndex].listItems[index].checked = !userLists[currentListIndex].listItems[index].checked;
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
        const newListName = nameListElement.innerText;
        userLists[currentListIndex].listName = newListName;

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

        for (const item of userLists[currentListIndex].listItems) {
            yetDisplay += `
            <li class="list__item js-task">
                <button class="buttonImage js-toggleDone">
                    ${item.checked ? "<img src='images/checked.svg'>" : "<img src='images/square.svg'>"}
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

    const onClearCheckedButton = () => {
        for (const [index, item] of userLists[currentListIndex].listItems.entries()) {
            if (item.checked) {
                userLists[currentListIndex].listItems.splice(index, 1);
            }
        };
        display();
    };

    const onClearAllButton = () => {
        userLists[currentListIndex] = {
            listname: "My shopping list",
            listItems: []
        };
        display();
    };

    const onAddNewListButton = () => {
        userLists.push({ listName: "My shopping list", listItems: [] });

        console.log(userLists);
        display();
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);

        document.querySelector(".js-editListNameImage").addEventListener("click", onEditNameListButton);
        document.querySelector(".js-saveListNameImage").addEventListener("click", onSaveNameListButton);

        const clearCheckedButton = document.querySelector(".js-clearCheckedListButton");
        clearCheckedButton.addEventListener("click", onClearCheckedButton);

        const clearAllListButton = document.querySelector(".js-clearAllListButton");
        clearAllListButton.addEventListener("click", onClearAllButton);

        const addNewListButton = document.querySelector(".js-addNewListButton");
        addNewListButton.addEventListener("click", onAddNewListButton);
    };

    init();
}