Feed={
	view: function(url,cb) {
		var MyFeed=[];
		var FeedParser=Feed.using('feedparser');
		var feedparser = new FeedParser();
		var req=Request(url,{encoding: 'binary'});
		req.on('response',function(res) {
			res.pipe(feedparser);	
		});
		feedparser.on('readable', function () {
		  // This is where the action is!
		  var stream = this;
		  var meta = this.meta;
		  var item;

		  while (item = stream.read()) {
			MyFeed.push(item);
		  }
		});
		feedparser.on('end',function() {
			cb(MyFeed);
		});
	},
	import: function(url,cb) {
		
	}
};

module.exports=Feed;