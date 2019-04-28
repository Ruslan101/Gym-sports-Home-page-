sessionStorage.setItem("stateMenu", "true");
sessionStorage.setItem("stateMobile", "false");
var users = new Array();
var pointer = 0; // Указывает на левый элемент

$(window).on("load", () => {
	$(".menuContainer > p").on("click", (event) => dropMenu(event));
	$("#menu_but").on("click", () => dropMenuMobile());
	//$("#left_but").on("click", () => generateRandomUser(1));
	//$("#right_but").on("click", () => generateRandomUser(2));
	//generateRandomUser(0);
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
function sendRequest (func) { 
	$.ajax({
		method: 'GET',
		url: 'https://randomuser.me/api/?inc=name,picture&noinfo',
		dataType: 'json',
		error: (jqXHR, textStatus) => console.log({ jqXHR, textStatus }),
		success: func
	});
}
/*
* The function generates a random user
* Parameters: Status - indicates where to move the counter
** 0 - Initialization (first call)
** 1 - Shift left
** 2 - Shift right 
*/
/*function generateRandomUser (state) {
	var responseArr = new Array(2);

	sendRequest((data) => responseArr[0] = data.results[0]);
	sendRequest((data) => responseArr[1] = data.results[0]);
	console.log(responseArr[0]);
	drawUsers(responseArr);

	function drawUsers (response) {
		globArr = response;
		console.log(typeof (globArr))
			if ("error" in response[0] || "error" in response[1]) 
				for (var i = 0; i < 2; i++)
					throw new Error(response.error);

		if (state == 0) { // Initialisation app
			for (var i = 0; i < 2; i++) {
				console.log(response)
				//console.log(response)
				$("#avatar_1").attr("src", response[i].results[0].picture.large);
				$("#name_1").text(response[i].results[0].name.first + ' ' + response[i].results[0].name.last);
				$("#avatar_1").attr('data-state', '1');
				users.push({ // один раз пишем в конец
					photo: response[i].results[0].picture.large, 
					name: response[i].results[0].name.first + ' ' + response[i].results[0].name.last 
				});
			}
		}
		else if(state == 1) { // Move left
			if(pointer == 0) { // Если последний
				for (var i = 0; i < 2; i++)
					users.unshift({ // 2 раза пишем в начало
						photo: response[i].results[0].picture.large, 
						name: response[i].results[0].name.first + ' ' + response[i].results[0].name.last 
					});
				$("#avatar_1").attr("src", response[0].results[0].picture.large); // из запроса
				$("#avatar_2").attr("src", response[1].results[0].picture.large); // из запроса
				$("#name_1").text(response[0].results[0].name.first + ' ' + response[0].results[0].name.last); // из запроса
				$("#name_2").text(response[1].results[0].name.first + ' ' + response[1].results[0].name.last); // из запроса
				return 0;
			}
			else { // Если не последний
				if((pointer--) == 0) { // если через одну будет последний
					users.unshift({ // один раз пишем в начало
						photo: response[0].results[0].picture.large, 
						name: response[0].results[0].name.first + ' ' + response[i].results[0].name.last 
					});
					$("#avatar_1").attr("src", response[0].results[0].picture.large); // из запроса
					$("#avatar_2").attr("src", users[pointer].photo);               // из массива
					$("#name_1").text(response[0].results[0].name.first + ' ' + response[0].results[0].name.last); // из запроса
					$("#name_2").text(users[pointer].photo);                                                       // из массива
					pointer = pointer--;
					return 0;
				}
				else { // если через одну не будет последний
					// записывать в массив не нужно	
					$("#avatar_1").attr("src", users[pointer].photo);   // из массива
					$("#avatar_2").attr("src", users[pointer--].photo); // из массива
					$("#name_1").text(users[pointer].name);             // из массива
					$("#name_2").text(users[pointer--].photo);          // из массива
					pointer = pointer--;
					return 0;
				}
			}
		}
		else if (state == 2) { // Move right
			if(pointer == users.length) { // если последний
				for (var i = 0; i < 2; i++) // 2 раза пишем в конец
					users.push({ 
						photo: response[i].results[0].picture.large, 
						name: response[i].results[0].name.first + ' ' + response[i].results[0].name.last 
					});
				$("#avatar_1").attr("src", response.results[0].picture.large); // из запроса
				$("#avatar_2").attr("src", response.results[0].picture.large); // из запроса
				$("#name_1").text(response.results[0].name.first + ' ' + response.results[0].name.last); // из запроса
				$("#name_2").text(response.results[0].name.first + ' ' + response.results[0].name.last); // из запроса
				pointer = pointer++;
				return 0;
			}
			else { // если не последний
				if ((pointer + 1) == users.length) { // если через одну будет последний
					users.push({ // один раз пишем в конец
						photo: response[i].results[0].picture.large, 
						name: response[i].results[0].name.first + ' ' + response[i].results[0].name.last 
					});
					$("#avatar_1").attr("src", users[pointer++].photo);            // из массива
					$("#avatar_2").attr("src", response.results[0].picture.large); // из запроса
					$("#name_1").text(users[pointer++].name);                                                // из массива 
					$("#name_2").text(response.results[0].name.first + ' ' + response.results[0].name.last); // из запроса
					pointer++;
					return 0;
				}
				else { // если через одну не будет последний
					// записывать в массив не нужно
					$("#avatar_1").attr("src", users[pointer++].photo); // из массива
					$("#avatar_2").attr("src", users[pointer+2].photo); // из массива
					$("#name_1").text(users[pointer++].name);           // из массива
					$("#name_2").text(users[pointer+2].photo);          // из массива
					pointer++;
					return 0;
				}
			}
		}
	}
}*/