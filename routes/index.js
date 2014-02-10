//index page will render search page to search page
exports.index = function(req, res){
  res.render('search');
};
// search page
exports.search = function(req, res){
  res.render('search');
};
// page to add content to database
exports.paragraph = function(req, res){
  res.render('paragraph');
};
// page to display result and search again
exports.searchresult = function(db1) {
	// db1 is used for mongojs which enables running mongo-shell commands in js
    return function(req, res) {
    	var url = require('url');
    	var url_part = url.parse(req.url,true);
    	var query = url_part.query.q; // to get query from url

    	//console.log(query); // for debugging
    	if(query === '' || typeof query == 'undefined' )
    		res.redirect('search'); // blank search guard will redirect to search page
       
	    var collection = db1.collection('tfi');
        // runCommand is mongo-shell's command. But MongoJS allows to run shell commands
        // this search query gathers ALL relevant results using indexes according to rank.
	    collection.runCommand('text' , {search : query}, function(err,docs) {
		//if(!err && res.ok) 
		res.render('searchresult',{
							"srchlist" : docs , q : query
                            //passing json response and query to searchresult.jade for display
		});
	});
    };
};

exports.addcontent = function(db) {
    return function(req, res) {

        // Get our form values. 
        var title = req.body.title;
        var content = req.body.content;

        // Set our collection
        var tfi = db.get('tfi');

        // Submit to the DB
        tfi.insert({
            "title" : title,
            "content" : content
        }, function (err, doc) {
            if (err) {
                /* If it failed, return error
                 
                   I am using MongoDB with 1 dyno, which sometimes goes to sleep.
                   Please keep refreshing when messages of these type appear, or page crashes
                 */
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /addcontent
                res.location("paragraph");
                // And forward to success page
                res.redirect("paragraph");
            }
        });

    }
}