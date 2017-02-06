var SelectDish = function (container, dinnermodel) {

    dinnermodel.addObserver(this);
    //WHOLE VIEW CONTAINER
    var viewContainer = document.createElement("div");
    viewContainer.className += " container";
    viewContainer.style.height = "100%";
    container.append(viewContainer);

    //THE BAR WHERE YOU SELECT DISHES
    var dishSelectBar = document.createElement("div");
    dishSelectBar.className += "row";
    dishSelectBar.style.border = "2px solid";
    dishSelectBar.style.backgroundColor = "#FFE599";
    viewContainer.append(dishSelectBar);


    //TITLE

    var col1 = document.createElement("div");
    col1.className += "col-md-10";
    col1.style.paddingLeft = "50px";

    var selectDishTitle = document.createElement("h3");
    selectDishTitle.innerHTML = "SELECT DISH";
    col1.append(selectDishTitle);
    dishSelectBar.append(col1);

    //SEPERATION LINE
    dishSelectBar.append(document.createElement("hr"));

    //SEARCH BAR (container)
    var searchContainer = document.createElement("div");
    searchContainer.className += "col col-md-3";
    searchContainer.style.paddingLeft = "50px";
    dishSelectBar.append(searchContainer);

    var searchForm = document.createElement("input");
    searchForm.setAttribute("type", "text");
    searchForm.className += " form-control";
    searchForm.placeholder = "Enter key words";
    searchForm.id = "selectedDishSearch";
    searchContainer.append(searchForm);

    //SEARCH BUTTON 

    var searchButton = document.createElement("button");
    searchButton.innerHTML = "SEARCH";
    searchButton.setAttribute("type", "button");
    searchButton.className += " btn button-default";
    searchButton.id = "selectedDishSearchButton";
    searchContainer.append(searchButton);

    


    //COURSE MENU (container)
    var courseMenu = document.createElement("div");
    courseMenu.style.display = "inline-block";
    courseMenu.className += "col col-md-3";
    dishSelectBar.append(courseMenu);

    // course form
    var courseForm = document.createElement("div");
    courseForm.className += " form-group";
    courseMenu.append(courseForm);

    var courseSelector = document.createElement("select");
    courseSelector.className += " form-control";
    courseSelector.id = "chosenCourse";
    courseForm.append(courseSelector);

    var option = document.createElement("option");
    option.innerHTML = "starter";
    option.setAttribute("value", "main dish");
    courseSelector.append(option);
    var option2 = document.createElement("option");
    option2.innerHTML = "main dish";
    option2.setAttribute("value", "main dish");
    courseSelector.append(option2);
    var option3 = document.createElement("option");
    option3.innerHTML = "dessert";
    option3.setAttribute("value", "dessert");
    courseSelector.append(option3);


    //LIST AND PICTURES OF FOOD
    var foodList = document.createElement("div");
    foodList.className += "row";
    foodList.id = "foodList";
    viewContainer.append(foodList);


    var menu = dinnermodel.getAllDishes(courseSelector.value);
    console.log(menu.length);
    console.log(courseSelector.value);


    var counter = 0;
    for(var i = 0; i < menu.length; i++){
        var dish = menu[i];

        //FOOD CONTAINER 1
        var foodContainer = document.createElement("div");
        foodContainer.className += "col col-md-2 foodContainer";
        if(!counter){ //HOT FIX MOTHERFUCKERS
            foodContainer.id = "firstFood";
        }
        counter++;
        foodList.append(foodContainer);

        //FOOD PICTURE 2
        var pictureOfFood = document.createElement("img");
        pictureOfFood.setAttribute("src", "images/" + dish.image);
        pictureOfFood.className += " selectDishFoodPicture";
        foodContainer.append(pictureOfFood);

        //FOOD TITLE 3 (button)
        var foodTitle = document.createElement("button");
        foodContainer.append(foodTitle);
        foodTitle.className += "btn button-default selectDishFoodTitle";
        foodTitle.innerHTML = dish.name;
        foodTitle.setAttribute("type", "button");

        //FOOD DESCRIPTION 4 (text)
        var foodDescription = document.createElement("p");
        foodDescription.innerHTML = dish.description;
        foodContainer.append(foodDescription);
    }

    this.update = function (obj) {
    }



}

