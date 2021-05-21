{
    let userLists = [{ listName: "Everyday Shopping List", listItems: [{ content: "wholemeal grain bread", checked: true }, { content: "cheese" }, { content: "ripe soft red tomatoes, not too big but also not small, without stalks" }, { content: "black olives x one jar" }, { content: "zucchini" }, { content: "eggplant" }, { content: "yeast", checked: true }, { content: "flour", checked: true }, { content: "pepper" }, { content: "lemons x 1kg" }] },
    { listName: "Cosmetics and Household Chemicals", listItems: [{ content: "toothpaste" }, { content: "showergel" }, { content: "color washing powder", checked: true }] },
    { listName: "My Plants", listItems: [{ content: "fertilizer" }, { content: "herb seeds" }] }
    ];

    let currentListIndex = 0;

    let menu = 0;

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

    const toggleList = (index) => {
        currentListIndex = index;
        display();
    };

    const closeModal = () => {
        if (!document.querySelector(".js-modalTooManyLists").classList.contains("noDisplay")) {
            document.querySelector(".js-modalTooManyLists").classList.add("noDisplay");
        } else {
            document.querySelector(".js-modalAtLeastOneList").classList.add("noDisplay");
        };
        document.querySelector(".js-overlay").classList.add("noDisplay");
    };

    const toggleNoDisplayClass = (element) => {
        element.classList.toggle("noDisplay");
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

    const bindListEvent = (place) => {

        const toggleListButtons = document.querySelectorAll(`.js-${place}ListButton`);

        toggleListButtons.forEach((toggleListButton, index) => {

            toggleListButton.addEventListener("click", () => {
                toggleList(index);
                onCloseMenuButton();
            });
        });
    };

    const display = () => {
        displayList();
        displayListOfLists();
    };

    const displayList = () => {

        document.querySelector(".js-nameList").innerHTML = userLists[currentListIndex].listName;

        let yetDisplayItems = "";

        for (const item of userLists[currentListIndex].listItems) {
            yetDisplayItems += `
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

        document.querySelector(".js-list").innerHTML = yetDisplayItems;

        bindRemoveEvent();
        bindToggleDoneEvent();
    };

    const displayListOfLists = () => {

        yetDisplayLists = "";
        const place = menu ? "menu" : "switch";

        for (const [index, shoppingList] of userLists.entries()) {

            yetDisplayLists += `
                <li class="js-${place}ListButton">
                    <button class="button 
                        ${index === currentListIndex ? "currentListHighlight" : ""}
                        button--${place}List">${shoppingList.listName}
                    </button>
                </li>
            `;
        };

        document.querySelector(`.js-${place}ListOfLists`).innerHTML = yetDisplayLists;

        bindListEvent(place);
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
        userLists[currentListIndex].listItems = [];
        display();
    };

    const onAddNewListButton = () => {
        if (userLists.length > 4) {
            document.querySelector(".js-modalTooManyLists").classList.remove("noDisplay");
            document.querySelector(".js-overlay").classList.remove("noDisplay");
        } else {
            userLists.push({ listName: "My shopping list", listItems: [] });
            currentListIndex = userLists.length - 1;
            display();
        };
    };

    const onDeleteListButton = () => {
        if (userLists.length < 2) {
            document.querySelector(".js-modalAtLeastOneList").classList.remove("noDisplay");
            document.querySelector(".js-overlay").classList.remove("noDisplay");
        } else {
            userLists.splice(currentListIndex, 1);
            currentListIndex = 0;
            display();
        };
    };

    const onEditNameListButton = () => {
        const nameListElement = document.querySelector(".js-nameList");
        nameListElement.contentEditable = true;

        nameListElement.style.backgroundColor = "#eee";
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

        displayListOfLists();
    };

    const onMenuButton = () => {
        menu = 1;
        document.querySelector(".js-menu").classList.toggle("menu--active");
        toggleNoDisplayClass(document.querySelector(".js-menuImage"));
        displayListOfLists();
    };

    const onCloseMenuButton = () => {
        menu = 0;
        document.querySelector(".js-menu").classList.toggle("menu--active");
        toggleNoDisplayClass(document.querySelector(".js-menuImage"));
    };

    const init = () => {

        document.querySelector(".js-menuButton").addEventListener("click", onMenuButton);
        document.querySelector(".js-closeMenuButton").addEventListener("click", onCloseMenuButton);

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);

        document.querySelector(".js-editListNameImage").addEventListener("click", onEditNameListButton);
        document.querySelector(".js-saveListNameImage").addEventListener("click", onSaveNameListButton);

        const addNewListButtons = document.querySelectorAll(".js-addNewListButton");
        addNewListButtons.forEach((addNewListButton) => {
            addNewListButton.addEventListener("click", onAddNewListButton);
        });

        const clearCheckedButton = document.querySelector(".js-clearCheckedListButton");
        clearCheckedButton.addEventListener("click", onClearCheckedButton);

        const clearAllListButton = document.querySelector(".js-clearAllListButton");
        clearAllListButton.addEventListener("click", onClearAllButton);

        const deleteListButton = document.querySelector(".js-deleteListButton");
        deleteListButton.addEventListener("click", onDeleteListButton);

        const closeModalButtons = document.querySelectorAll(".js-modalClose");
        closeModalButtons.forEach((closeModalButton) => {
            closeModalButton.addEventListener("click", closeModal);
        });

        document.querySelector(".js-overlay").addEventListener("click", closeModal);

        display();
    };

    init();
}