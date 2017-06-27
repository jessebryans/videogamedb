var gameApp = {};

gameApp.key = 'CAvRsvGUq3mshxsNRl6Zm0kevOjnp1whw1jjsnVfiRVz5qvzd5';

gameApp.init = function() {
	gameApp.events();

	
};

let userInput = document.querySelector('.userInput');
let inputValue = "";

// console.log(userInput);

userInput.addEventListener('click', function(e) {
	e.preventDefault();
	inputValue = $( ".123" ).val();
	console.log(inputValue)
	gameApp.getGames();
});

gameApp.events = function() {
	$('.showSearch').on('click', '.game', function() {
		var userChoice = $(this).attr('data-id');
		var userGame = gameApp.games.filter(function(game){
			return game.id === Number(userChoice);
		});
		 	gameApp.cover = "https:" + userGame[0].cover['url'];
		 	gameApp.dev = userGame[0].developers[0];
		 	pub = userGame[0].publishers[0];
		 	gameApp.site = userGame[0].url;
		 	gameApp.summary = userGame[0].summary;
		 	gameApp.name = userGame[0].name;
		 	gameApp.rating = userGame[0].rating;
		 	gameApp.release = userGame[0].release_dates[0].human;
		 	gameApp.getCompany(pub);
		
		console.log(gameApp.site);
	});
}

$('.game').on('click', function(e){
	e.preventDefault()
	$(this).makeArray("#data-publisher")
	gameApp.getCompany() = gameApp.dev
})
console.log()
gameApp.getCompany = function(companyId) {
   $.ajax({
   		url: "https://igdbcom-internet-game-database-v1.p.mashape.com/companies/" + companyId,
   		method: 'GET',
   		dataType: 'json',
   		beforeSend: function(xhr){
			xhr.setRequestHeader('X-Mashape-Key', 'CAvRsvGUq3mshxsNRl6Zm0kevOjnp1whw1jjsnVfiRVz5qvzd5');
		},
		data: { 
		key: gameApp.key,
		format: 'json',
		fields: 'name,logo,country'
		}
   	 }) .then(function(res){
   	 	gameApp.company = res.name;
   		console.log(res);
   		$('.showSearch').html('<span>'+ "Game Cover:   " +'</span>' + '<img src="'+ gameApp.cover +'">'+ '' + '<p>'+ '<span>'+ "Game Name:   " +'</span>' + gameApp.name + '</p>' + '<p>'+ '<span>' + "Summary:   " + '</span>' + gameApp.summary + '</p>'  + '<p>' + '<span>' + "URL:   " + '</span>' +gameApp.site + '</p>' + '</a>' +  '<p>' + '<span>' + "Rating:   " + '</span>' +gameApp.rating + '</p>'+ '<p>'+ '<span>' + "Release Date:   " + '</span>' + gameApp.release + '</p>'	)
   });

}	
// hit the endpoint that grabs the publisher by id
   	// console.log the publisher to the page


gameApp.getGames = function() {
	 $.ajax({ 
		url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/',
		method: 'GET',
		dataType: 'json',
		beforeSend: function(xhr){
			xhr.setRequestHeader('X-Mashape-Key', 'CAvRsvGUq3mshxsNRl6Zm0kevOjnp1whw1jjsnVfiRVz5qvzd5');
		},
		data: {
			key: gameApp.key,
			format: 'json',
			fields: 'name,cover,url,rating,developers,publishers,category,summary,release_dates', 
			search: inputValue,
			// order: 're//lease_dates.date:desc',
			limit: 10
		}

	}).then(function(res){
		gameApp.games = res;
		gameApp.displayGame(res);
		// gameApp.displayCompanies(res);
		
	});
	$.ajax({
	url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/companies/',
	method: 'GET',
	dataType: 'json',
	beforeSend: function(xhr){
			xhr.setRequestHeader('X-Mashape-Key', 'CAvRsvGUq3mshxsNRl6Zm0kevOjnp1whw1jjsnVfiRVz5qvzd5');
		},
	data: {
		key: gameApp.key,
		format: 'json',
		fields: 'name,url,logo,country',
		search: inputValue
	}	

	}).then(function(res){
		console.log(res);
	});
};	

gameApp.displayGame = function(games) {
	games.forEach(function(game){
		var name = game.name
		var gameId = game.id
		var cover = game.cover['url']
		var summary = game.summary
		var developers = game.developers;
		var publishers = game.publishers;
		cover = "https:" + cover;
		$('.showSearch').append('<div class="game" data-developers=' + developers + ' data-publishers=' + publishers + ' data-id=' + game.id +'><h2>'+ game.name + '</h2>' + '<img src="'+ cover +'"></div>');
		
	})
	
	console.log(games)
}

// gameApp.displayCompanies = function(games) {

// 	var company_ids = [];
// 	games.forEach(function(game){
// 		var developers = game.developers;
// 		var publishers = game.publishers;
// 		// console.log(developers)
// 		// console.log(publishers)

// 		developers.forEach(function(developer){
// 			company_ids.push(developer)
// 		})
	
// 		publishers.forEach(function(publisher){
// 			company_ids.push(publisher)
// 		})
// 		// console.log(company_ids)
// 	});
// }

$(function(){
	gameApp.init();
	
})