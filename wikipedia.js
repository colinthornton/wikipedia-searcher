// var json = {
//     "batchcomplete": "",
//     "continue": {
//         "sroffset": 10,
//         "continue": "-||"
//     },
//     "query": {
//         "searchinfo": {
//             "totalhits": 2145
//         },
//         "search": [
//             {
//                 "ns": 0,
//                 "title": "Reddit",
//                 "snippet": "see Redditt. <span class=\"searchmatch\">Reddit</span> (stylized as <span class=\"searchmatch\">reddit</span>, /\u02c8r\u025bd\u026at/) is an American social news aggregation, web content rating, and discussion website. <span class=\"searchmatch\">Reddit</span>'s registered",
//                 "titlesnippet": "<span class=\"searchmatch\">Reddit</span>"
//             },
//             {
//                 "ns": 0,
//                 "title": "The Button (Reddit)",
//                 "snippet": "The Button was a meta-game and social experiment hosted by <span class=\"searchmatch\">Reddit</span> that featured an online button and 60 second countdown timer that would reset each time",
//                 "titlesnippet": "The Button (<span class=\"searchmatch\">Reddit</span>)"
//             },
//             {
//                 "ns": 0,
//                 "title": "Controversial Reddit communities",
//                 "snippet": "See also: <span class=\"searchmatch\">Reddit</span> \u00a7\u00a0Controversies The social news site <span class=\"searchmatch\">Reddit</span> has occasionally been the topic of controversy due to the presence of communities on the site",
//                 "titlesnippet": "Controversial <span class=\"searchmatch\">Reddit</span> communities"
//             },
//             {
//                 "ns": 0,
//                 "title": "Timeline of Reddit",
//                 "snippet": "This is a timeline of <span class=\"searchmatch\">Reddit</span>, an entertainment, social networking, and news website where registered community members can submit content, such as text",
//                 "titlesnippet": "Timeline of <span class=\"searchmatch\">Reddit</span>"
//             },
//             {
//                 "ns": 0,
//                 "title": "Reddit Enhancement Suite",
//                 "snippet": "<span class=\"searchmatch\">Reddit</span> Enhancement Suite, commonly abbreviated as RES, is a suite of extensions for <span class=\"searchmatch\">Reddit</span>. It is distributed as a browser extension for numerous browsers",
//                 "titlesnippet": "<span class=\"searchmatch\">Reddit</span> Enhancement Suite"
//             },
//             {
//                 "ns": 0,
//                 "title": "/r/The Donald",
//                 "snippet": "/r/The_Donald is an Internet forum hosted on <span class=\"searchmatch\">Reddit</span> (a &quot;subreddit&quot;) created in support of Donald Trump, the current President of the United States. Initially",
//                 "titlesnippet": ""
//             },
//             {
//                 "ns": 0,
//                 "title": "Alien Blue",
//                 "snippet": "AlienBlue, was an iOS application for browsing <span class=\"searchmatch\">Reddit</span>. It was the official and the most popular <span class=\"searchmatch\">Reddit</span> client on the App Store. The app features a wealth",
//                 "titlesnippet": ""
//             },
//             {
//                 "ns": 0,
//                 "title": "Unidan",
//                 "snippet": "Ben Eisenkop, better known by his <span class=\"searchmatch\">Reddit</span> pseudonym Unidan, is an ecosystem ecologist and doctoral candidate in biology at Binghamton University, who became",
//                 "titlesnippet": ""
//             },
//             {
//                 "ns": 0,
//                 "title": "Steve Huffman",
//                 "snippet": "developer and the co-founder and current CEO of the social networking website <span class=\"searchmatch\">Reddit</span>. More recently, he also participated in co-founding the airfare search-engine",
//                 "titlesnippet": ""
//             },
//             {
//                 "ns": 0,
//                 "title": "George Mason University's historical hoaxes",
//                 "snippet": "past&quot;, have created two popular hoaxes: the &quot;Edward Owens hoax,&quot; and the &quot;<span class=\"searchmatch\">Reddit</span> serial killer hoax.&quot; It is a goal of the course to create a sweeping internet",
//                 "titlesnippet": ""
//             }
//         ]
//     }
// };


$("input").on("keypress", function(event){
  if(event.which === 13){
    var search = $(this).val();
    if(search !== undefined && search !== ""){
      $(this).val("");
      $("ul").fadeOut(500, function(){
      	$("li").remove();
      	var apiURL = buildURL(search);
      	$.getJSON(apiURL, function(json){            	
      	//$("div").first().css("margin", "20px auto");
      	// $("input").css("float","right");
      	// $("div button").css("float", "left", function(){
    		for(var i in json.query.search){
    			if(json.query.search[i].title){
    				$("ul").append(buildListItem(json, i));
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

// $("div button").on("click", function(){
//   window.open("https://en.wikipedia.org/wiki/Special:Random");
// });

function buildURL(query){
  var baseURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srprop=titlesnippet%7Csnippet&origin=*&srsearch=";
  return baseURL + query;
}

function buildListItem(json, i){
	return "<li><h3>" + json.query.search[i].title + "</h3><p>" + json.query.search[i].snippet + "</p></li>";
}