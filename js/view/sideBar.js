var SideBar = function (container,model) {


    model.addObserver(this);  
    var guests = 2; //Gonna use this as the default value for guests.
    var totalMenuPrice = 0;
    var allMenuDishes = [];
    var totalPendingDishPrice = 0;



    this.update = function (obj) {
    	guests = model.getNumberOfGuests();
    	totalMenuPrice = model.getTotalMenuPrice();
    	allMenuDishes = model.getFullMenu();
    	console.log(allMenuDishes);
    	//totalPendingDishPrice = getTotalDishPrice(model.getDish(model.getDishToShow()), guests);
    	rePopSideBar();
    } 
    model.setNumberOfGuests(guests); //invokes update

    function rePopSideBar () {

    	//document.getElementById("sideBarDiv").innerHTML = "";

    	var sideBar = document.createElement("div");
	    sideBar.className += " col-md-2 nav nav-pills nav-stacked";
	    sideBar.id = "sidebar";
	    container.append(sideBar);


	    var header4 = document.createElement("div");
	    header4.className += " row";
	    header4.innerHTML = "<h3>My Dinner</h3>";
	    header4.style.fontWeight = "bold";
	    sideBar.append(header4);

	    var numberOfGuests = document.createElement("div");
	    numberOfGuests.className += " row";
	    numberOfGuests.id = "ppl";
	    numberOfGuests.style.height = "30px";
	    sideBar.append(numberOfGuests);

	    var people = document.createElement("p");
	    people.style.float = "left";
	    people.style.paddingTop = "5px";
	    people.style.paddingRight = "5px";
	    people.innerHTML = "People";
	    numberOfGuests.append(people);

	    var textbox = document.createElement("input");
	    textbox.id = "textbox";
	    textbox.setAttribute("type", "text");
	    textbox.setAttribute("readonly", "readonly");
	    textbox.setAttribute("value", guests);
	    numberOfGuests.append(textbox);

	    var incrementor = document.createElement("div");
	    incrementor.className += " btn-group-vertical";
	    incrementor.id = "incrementor";
	    numberOfGuests.append(incrementor);

	    var buttonUp = document.createElement("button");
	    buttonUp.className += " glyphicon glyphicon-chevron-up";
	    buttonUp.setAttribute("type", "button");
	    buttonUp.onclick = function(e){
	        incrementValue(model);
	    }
	    incrementor.append(buttonUp);

	    var buttonDown = document.createElement("button");
	    buttonDown.className += " glyphicon glyphicon-chevron-down";
	    buttonDown.setAttribute("type", "button");
	    buttonDown.onclick = function(e){
	        decrementValue(model);
	    }
	    incrementor.append(buttonDown);

	    var dishName = document.createElement("div");
	    dishName.className += " row";
	    dishName.id = "dishName";
	    sideBar.append(dishName);

	    var dishText = document.createElement("p");
	    dishText.style.float = "left";
	    dishText.innerHTML = "Dish Name";
	    dishName.append(dishText);

	    var dishCost = document.createElement("p");
	    dishCost.style.float = "right";
	    dishCost.innerHTML = "Cost";
	    dishName.append(dishCost);

	    //populate w dishes already added to menu
    	for (var i = 0; i < allMenuDishes.length; i++){

	    	
    		var dishRow = document.createElement("div");
    		dishRow.className = "row";
    		dishRow.id = "dishRow";
    		sideBar.append(dishRow);

    		var addRemoveDiv = document.createElement("div");
    		addRemoveDiv.className = "col col-md-1";
	    	dishRow.append(addRemoveDiv);

	    	var removeButton = document.createElement("button");
	    	removeButton.type = "button";
	    	removeButton.innerHTML = "x";
	    	removeButton.id = "removeButton";
	    	addRemoveDiv.append(removeButton);

    		var addGuests = document.createElement("div");
    		addGuests.className = "col col-md-1";
    		addGuests.innerHTML = guests;
    		dishRow.append(addGuests);

    		var addName = document.createElement("div");
    		addName.className = "col col-md-8";
    		addName.innerHTML = allMenuDishes[i].name;
    		dishRow.append(addName);

    		var addPrice = document.createElement("div");
    		addPrice.className = "col col-md-2";
    		addPrice.style.textAlign = "right";
	    	addPrice.innerHTML = getTotalDishPrice(allMenuDishes[i], guests);
	    	dishRow.append(addPrice);

	    	

		}

	    var products = document.createElement("div");
	    products.className += " row";
	    products.id = "products";
	    sideBar.append(products);

    	var pending = document.createElement("p");
    	pending.style.float = "left";
    	pending.innerHTML = "Pending";
    	products.append(pending);

    	var pendingSum = document.createElement("p");
    	pendingSum.style.float = "right";
	    pendingSum.innerHTML = totalPendingDishPrice;
	    products.append(pendingSum);

	    var totalSum = document.createElement("div");
	    totalSum.id = "totalSum";
	    sideBar.append(totalSum);

	    var pendingSum = document.createElement("p");
	    pendingSum.style.float = "right";
	    var totalPrice = totalMenuPrice + totalPendingDishPrice;
	    pendingSum.innerHTML = 'SEK ' + totalPrice;
	    totalSum.append(pendingSum);

	    var confirmButton = document.createElement("div");
	    confirmButton.id = "confirmButton";
	    sideBar.append(confirmButton);

	    var confButton = document.createElement("button");
	    confButton.className += " btn-default"
	    confButton.setAttribute("type", "button");
	    confButton.innerHTML = "Confirm Dinner";
	    confirmButton.append(confButton);

	    confButton.onclick = confirmDinner;
	}

	rePopSideBar();

}



function confirmDinner(){

    $('#sideBarDiv').hide();
    $('#selectDish').hide();
    $('#page3').hide();
    $('#overview_page').show();
}

function incrementValue(model){
    var guests = model.getNumberOfGuests();
    model.setNumberOfGuests(guests + 1);
    var value = parseInt(document.getElementById('textbox').value, 10);
    value++;
    document.getElementById('textbox').value = value;

}

function decrementValue(model){
    var guests = model.getNumberOfGuests();
    console.log(guests);
    if(guests > 1){
        model.setNumberOfGuests(guests - 1);
        var value = parseInt(document.getElementById('textbox').value, 10);
        value--;
        document.getElementById('textbox').value = value;
    }
}

function getTotalDishPrice(dish, guests){
	var ingredients = dish.ingredients;
	var price = 0;
	for(var i = 0; i < ingredients.length; i++){
		price += ingredients[i].price;
	}
	return price * guests;
}
