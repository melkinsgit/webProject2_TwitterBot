
var wqa = {};

var wikiUrl = "https://en.wikipedia.org/w/api.php";

var titles = "mark twain";  // for parameter in queryTitles

wqa.openSearch = function(titles, success, error) {
    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "opensearch",
        namespace: 0,
        suggest: "",
        search: titles
      },

      success: function(result, status){
        success(result[1]);
		console.log(result[1]);
      },
      error: function(xhr, result, status){
        error("Error with opensearch for " + titles);
      }
    });
  };