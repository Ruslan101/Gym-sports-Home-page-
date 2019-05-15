sessionStorage.setItem("stateMenu", "true");
sessionStorage.setItem("stateMobile", "false");
var users = new Array();
var pointer = 0; // Указывает на левый элемент

$(window).on("load", () => {
	$(".menuContainer > p").on("click", (event) => dropMenu(event));
	$("#menu_but").on("click", () => dropMenuMobile());
	if (window.innerWidth > 480) initMap();
	$("#left_but").on("click", () => generateRandomUser(0));
	$("#right_but").on("click", () => generateRandomUser(1));
	generateRandomUser();
});

function initMap() {
	var uluru = {lat: 34.054901, lng: -118.248936};
	var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: uluru});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		icon: {
			url: "img/map-marker.png",
			scaledSize: new google.maps.Size(95, 144)
		}
	});
}

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
function sendRequest (func) { 
	$.ajax({
		method: 'GET',
		url: 'https://randomuser.me/api/?inc=name,picture&noinfo',
		dataType: 'json',
		error: (jqXHR, textStatus) => console.log({ jqXHR, textStatus }),
		success: func
	});
}

function generateRandomUser (state = -1) {
	sendRequest((data) => drawUsers(data, state));
}
function drawUsers (response, state) {
		if(state == 0) { // then lefft 
			$("#avatar_1").attr("src", $("#avatar_2")[0].currentSrc);
			$("#name_1").text($("#name_2")[0].textContent);
			$("#avatar_2").attr("src", response.results[0].picture.large);
			$("#name_2").text([`${response.results[0].name.first} ${response.results[0].name.last}`]);
		}
		else if (state == 1) { //then right
			$("#avatar_1").attr("src", response.results[0].picture.large);
			$("#name_1").text([`${response.results[0].name.first} ${response.results[0].name.last}`]);
			$("#avatar_2").attr("src", $("#avatar_1")[0].currentSrc);
			$("#name_2").text($("#name_1")[0].textContent);
		}
		return 0;
	}
