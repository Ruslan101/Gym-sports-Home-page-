sessionStorage.setItem("stateMenu", "true");
sessionStorage.setItem("stateMobile", "false");

$(window).on("load", () => {
	$(".menuContainer > p").on("click", (event) => dropMenu(event));
	$("#menu_but").on("click", () => dropMenuMobile());
});

function dropMenuMobile () {
	$(".menuContainer").slideToggle(600);
	$(".menuContainer").css('display', 'flex');
	sessionStorage.setItem("stateMobile", "true");
}

function dropMenu (element) {
	switch (element.currentTarget.innerText) {
		case "HOME": location.reload(true); break;
		case "ABOUT": console.log('Go to about page'); break;
		case "TRAINERS": console.log('Go to trainers page'); break;
		case "CLASSES": classesDrop(element.currentTarget); break;
		case "BLOG": console.log('Go to blog page'); break;
		case "PRICING": console.log('Go to pricing page'); break;
		case "CONTACTS": console.log('Go to contacts page'); break;
	}
	function classesDrop (payload) {
		if (sessionStorage.getItem("stateMobile") == "true") {
			$(".dropMenu").css({ "background": 'none', "position": 'initial', "width": '230px' });
			$(".dropMenu > p").css({ "color": 'white', "margin-left": '25px', "width": "85%" });
			$(".dropMenu").slideToggle(600);
		}
		else if (sessionStorage.getItem("stateMenu") == "true") {
			$(".dropMenu").slideToggle(600);
			$(payload).css({ color: '#72d0f4', background: 'white' });		
			sessionStorage.setItem("stateMenu", "false");
			$("#drpe_x64").attr("src", "img/dropBack.png");
		}
		else {
			$(".dropMenu").slideToggle(600);
			$(payload).css({ color: 'white', background: 'inherit' });
			sessionStorage.setItem("stateMenu", "true");
			$("#drpe_x64").attr("src", "img/dropBackWhite.png");
		}
	}
}