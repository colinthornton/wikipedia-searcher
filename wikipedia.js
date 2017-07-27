$("input").on("keypress", function(event){
  if(event.which === 13){
    var search = $(this).val();
    if(search !== undefined && search !== ""){
      $(this).val("");
      $("ul").fadeOut(500, function(){
      	$("li").remove();
      	var apiURL = buildURL(search);
      	$.getJSON(apiURL, function(json){
      		if(json.query.searchinfo.totalhits === 0){
            $("ul").append('<li id="noResults"><h3>No Results</h3><p>Try a different <span class="searchmatch">search</span> term</p></li>');
          } else {
            for(var i in json.query.search){
        			if(json.query.search[i].title){
        				$("ul").append(buildListItem(json, i));
        			}        		
          	}
          }
        	$("ul").fadeIn(500);      	      	
      	});
    	});
    }
  }
});

$("#landing").on("click", function(event){
	event.stopPropagation();
});

$("#randomPage").on("click", function(event){
	window.open("https://en.wikipedia.org/wiki/Special:Random");
	event.stopPropagation();
});

$("ul").on("click", "li", function(){
	window.open("https://en.wikipedia.org/wiki/" + encodeURIComponent($(this).children("h3").text()));
});

function buildURL(query){
  var baseURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srprop=titlesnippet%7Csnippet&origin=*&srsearch=";
  return baseURL + query;
}

function buildListItem(json, i){
	return "<li><h3>" + json.query.search[i].title + "</h3><p>" + json.query.search[i].snippet + "</p></li>";
}