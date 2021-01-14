$(document).ready(() => {

	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});

});


function getMovies(searchText) {
	
	axios.get('http://www.omdbapi.com/?apikey=aa927e6a&s='+searchText).then((response) => {
		
		let movies = response.data.Search;
		let output = '';
		$.each(movies, (index, movie) => {
			let title= movie.Title;
			output+= ` 
			<div class="col-md-3">
				<div class="well text-center">
					<img class="poster" src=  "${movie.Poster}">
					<h6>${movie.Title}  (${movie.Year})</h6>
					<a onclick="movieNominated('${movie.imdbID}')" class="button">Nominate</a>
				</div>
			</div>
			`;
		});
		$('#movies').html(output);
	})
	.catch((err) => {
		console.log(err);
	});
}
	


var dateArray = [];
var tittleArray = [];
var posterArray = [];

var array = [];

function movieNominated(id) {
	if(array.length<5){	
		console.log(id);
		axios.get('http://www.omdbapi.com/?apikey=aa927e6a&i='+id).then((response) => {	
		let y= response.data.Year
		
		let t=response.data.Title
		let p=response.data.Poster
		console.log('debug');
		console.log(y)
		console.log(t)
		console.log(p)
		if (!array.includes(id)) {
			array.push(id);
			dateArray.push(y);
			tittleArray.push(t);
			posterArray.push(p);
			print.call();

		} else {
			alert("The movie is already nominated")
		}

		})
		.catch((err) => {
			console.log(err);
		});
	}else{
		alert("Five movies have been nominated")
	}
}


function print (){
	var output = ' '; 
	var i = 0;
	if (array.length != 0) {
		for  (i = 0; i < array.length; i++){
			var a = posterArray[i];
			
				output+= ` 
						<img class="poster" id="posterNomination" src="${a}">
						<h6 class=text-center>${tittleArray[i]}  (${(dateArray[i])})</h6>
						<a onclick="remove(${i})" class="button2">Remove</a>
				
				</div>
				`;
				$('#movie').html(output);
		} 
	} else {
						output+= ` 
				<div class="col-md-3">
		
				</div>
				`;
				$('#movie').html(output);
	}
}


//console.log(array.toString());
var nominated = []
function remove (id) {
	delete array[id];
	delete tittleArray[id];
	delete posterArray[id];
	delete dateArray[id];

	posterArray = posterArray.filter(function( element ) {
   return element !== undefined;
});
		tittleArray = tittleArray.filter(function( element ) {
   return element !== undefined;
});
			array = array.filter(function( element ) {
   return element !== undefined;
});
		dateArray = dateArray.filter(function( element ) {
   return element !== undefined;
});

	print.call(); 
}

function show_image(src) {
    var img = document.createElement("img");
    img.src = src;
    document.body.appendChild(img);
}


function openNav() {
  document.getElementById("mySidebar").style.width = "400px";
  document.getElementById("sidebutton").style.marginLeft = "0";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("sidebutton").style.marginLeft= "0";
}

