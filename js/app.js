$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	
	//And create the needed controllers and views
    var topBanner = new TopBanner($("#topBanner1"));
    var topBannerController = new TopBannerController(topBanner, model);

    var startMessage = new StartMessage($("#mainStart"));
    var startMessageController = new StartMessageController(startMessage, model);

    var itemDescription = new ItemDescription($("#page3"), model);
    var itemDescriptionController = new ItemDescriptionController(itemDescription, model);

    var overview = new Overview($("#overview_page"), model);
    var overviewController = new OverviewController(overview, model);

    var print = new Print($("#print_page"), model);
    var printController = new PrintController(print, model);

    var selectDish = new SelectDish($("#selectDish"), model);
    var selectDishController = new SelectDishController(selectDish, model);

    var sideBar = new SideBar($("#sideBarDiv"), model);
    var sideBarController = new SideBarController(sideBar, model);

    $('#selectDish').hide();
    $('#page3').hide();
    $('#overview_page').hide();
    $('#print_page').hide();
    $('#sideBarDiv').hide();
   

});
