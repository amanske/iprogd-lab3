var TopBanner = function (container) {

    var navBar = document.createElement("nav");
    navBar.className += " navbar navbar-default navbar-fixed-top";
    container.append(navBar);

    var navContainer = document.createElement("div");
    navContainer.className += " container";
    navContainer.id = "navContainer";
    navBar.append(navContainer);

    var navHeader = document.createElement("button");
    navHeader.style.background = "transparent";
    navHeader.style.border = "none";
    navHeader.setAttribute("type", "link");
    navHeader.id = "myHeader";
    navHeader.onclick = setStartScreen;
    navHeader.innerHTML = "HOMELETTE";
    navContainer.append(navHeader);

    var navQuote = document.createElement("p");
    navQuote.id = "quote";
    navQuote.innerHTML = "From the best chefs in the world directly into your kitchen";
    navContainer.append(navQuote);
    
	function setStartScreen(){
	    $("#mainStart").show();
	    $("#page3").hide();
	    $("#selectDish").hide();
	    $("#sideBarDiv").hide();
	    $("#print_page").hide();
	    $("#overview_page").hide();
	    $("body").css("background-image", "url(images/background_tomato_eating.jpg)");
	}
}


 
