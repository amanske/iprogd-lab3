var SideBar = function (container,model) {


	model.addObserver(this);  
	var guests = model.getNumberOfGuests();
	var totalMenuPrice = 0;
	var allMenuDishes = [];
	var totalPendingDishPrice = 0;
	var starter;
	var main;
	var dessert;

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

	var dishRow1 = document.createElement("div");
	dishRow1.className = "row";
	dishRow1.id = "dishRow1";
	sideBar.append(dishRow1);

	var dishRow2 = document.createElement("div");
	dishRow2.className = "row";
	dishRow2.id = "dishRow2";
	sideBar.append(dishRow2);

	var dishRow3 = document.createElement("div");
	dishRow3.className = "row";
	dishRow3.id = "dishRow3";
	sideBar.append(dishRow3);

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
	pendingSum.id = "pendingSum";
	pendingSum.innerHTML = totalPendingDishPrice;
	products.append(pendingSum);

	var totalSum = document.createElement("div");
	totalSum.id = "totalSum";
	sideBar.append(totalSum);

	var pendingSum1 = document.createElement("p");
	pendingSum1.style.float = "right";
	var totalPrice = totalMenuPrice + totalPendingDishPrice;
	pendingSum1.innerHTML = 'SEK ' + totalPrice;
	totalSum.append(pendingSum1);

	var confirmButton = document.createElement("div");
	confirmButton.id = "confirmButton";
	sideBar.append(confirmButton);

	var confButton = document.createElement("button");
	confButton.className += " btn-default"
	confButton.setAttribute("type", "button");
	confButton.innerHTML = "Confirm Dinner";
	confirmButton.append(confButton);

	confButton.onclick = confirmDinner;




	this.update = function (obj) {
		guests = model.getNumberOfGuests();
		totalMenuPrice = model.getTotalMenuPrice();
		allMenuDishes = model.getFullMenu();
		starter = model.getSelectedDish("starter");
		main = model.getSelectedDish("main dish");
		dessert = model.getSelectedDish("dessert");
		var dishToShow = model.getDish(model.getDishToShow());
		if(!(typeof(dishToShow) == 'undefined')){
			totalPendingDishPrice = getTotalDishPrice(dishToShow, guests);
		}else{

		}
		pendingSum.innerHTML = totalPendingDishPrice; 
		pendingSum1.innerHTML = 'SEK ' + (totalMenuPrice + totalPendingDishPrice);
		rePopSideBar(starter,main,dessert);
		if(!(typeof(obj) == 'undefined') && obj.dishId == -1){
			pendingSum.innerHTML = 0;
			totalPendingDishPrice = 0;
			pendingSum1.innerHTML = 'SEK ' + (totalMenuPrice + totalPendingDishPrice);

		}

	} 
    //model.setNumberOfGuests(guests); //invokes update

    function rePopSideBar (starter,main,dessert) {
    	if(!(typeof(starter) == 'undefined')){ 
    		dishRow1.innerHTML = '';
    		var addRemoveDiv = document.createElement("div");
    		addRemoveDiv.className = "col col-md-1";
    		dishRow1.append(addRemoveDiv);

    		var removeButton = document.createElement("button");
    		removeButton.type = "button";
    		removeButton.innerHTML = "x";
    		removeButton.id = "removeButton";
    		removeButton.onclick = function (e){
    			model.removeDishFromMenu(starter.id);
    			dishRow1.innerHTML = '';
    		}

    		addRemoveDiv.append(removeButton);

    		var addGuests = document.createElement("div");
    		addGuests.className = "col col-md-1";
    		addGuests.innerHTML = guests;
    		dishRow1.append(addGuests);

    		var addName = document.createElement("div");
    		addName.className = "col col-md-8";
    		addName.innerHTML = starter.name;
    		dishRow1.append(addName);

    		var addPrice = document.createElement("div");
    		addPrice.className = "col col-md-2";
    		addPrice.style.textAlign = "right";
    		addPrice.innerHTML = getTotalDishPrice(starter, guests);
    		dishRow1.append(addPrice);
    	}

    	if(!(typeof(main) == 'undefined')){
    		dishRow2.innerHTML = '';
    		var addRemoveDiv = document.createElement("div");
    		addRemoveDiv.className = "col col-md-1";
    		dishRow2.append(addRemoveDiv);

    		var removeButton = document.createElement("button");
    		removeButton.type = "button";
    		removeButton.innerHTML = "x";
    		removeButton.id = "removeButton";
    		removeButton.onclick = function (e){
    			model.removeDishFromMenu(main.id);
    			dishRow2.innerHTML = '';
    		}

    		addRemoveDiv.append(removeButton);

    		var addGuests = document.createElement("div");
    		addGuests.className = "col col-md-1";
    		addGuests.innerHTML = guests;
    		dishRow2.append(addGuests);

    		var addName = document.createElement("div");
    		addName.className = "col col-md-8";
    		addName.innerHTML = main.name;
    		dishRow2.append(addName);

    		var addPrice = document.createElement("div");
    		addPrice.className = "col col-md-2";
    		addPrice.style.textAlign = "right";
    		addPrice.innerHTML = getTotalDishPrice(main, guests);
    		dishRow2.append(addPrice);
    	}

    	if(!(typeof(dessert) == 'undefined')){
    		dishRow3.innerHTML = '';
    		var addRemoveDiv = document.createElement("div");
    		addRemoveDiv.className = "col col-md-1";
    		dishRow3.append(addRemoveDiv);

    		var removeButton = document.createElement("button");
    		removeButton.type = "button";
    		removeButton.innerHTML = "x";
    		removeButton.id = "removeButton";
    		removeButton.onclick = function (e){
    			model.removeDishFromMenu(dessert.id);
    			dishRow3.innerHTML = '';
    		}

    		addRemoveDiv.append(removeButton);

    		var addGuests = document.createElement("div");
    		addGuests.className = "col col-md-1";
    		addGuests.innerHTML = guests;
    		dishRow3.append(addGuests);

    		var addName = document.createElement("div");
    		addName.className = "col col-md-8";
    		addName.innerHTML = dessert.name;
    		dishRow3.append(addName);

    		var addPrice = document.createElement("div");
    		addPrice.className = "col col-md-2";
    		addPrice.style.textAlign = "right";
    		addPrice.innerHTML = getTotalDishPrice(dessert, guests);
    		dishRow3.append(addPrice);
    	}

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
}





