var SideBarController = function (view, model, sc) {

	view.buttonUp.onclick = function (e) {
		view.incrementValue();
	}

	view.buttonDown.onclick = function (e) {
		view.decrementValue();
	}

	view.confButton.onclick = function (e) {
		sc.confirmDinner();
	}
}