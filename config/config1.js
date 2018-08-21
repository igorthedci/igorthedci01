//used as: ?config=config1
var numShoot = 10; //Shoots

// Bingo config
window.BallsCount = 75;
window.SelectedBallsCount = 10;
window.NextBallsCount = 3;
window.LastBallsCount = 3;
window.BingoVariant = 4;

window.FieldBalls = [
  [3,6,12,14,15], //  1-15
  [17,19,22,25,28], // 16-30
  [33,36,39,44,45], // 31-45
  [49,51,53,55,57], // 46-60
  [63,66,72,74,75]  // 61-75
];


var randomBalls = window.scope && scope.random;

window.SelectedBalls = [3,22,39,57];
window.NextBalls = [72,12,53];
window.WinningSequence = [12,22,39,53,72];




if (randomBalls) {
    window.SelectedBalls = [];
    for(var ndx=0; ndx<SelectedBallsCount; ++ndx ) {
      var num = ((Math.random() * BallsCount) | 0) + 1;
      if (SelectedBalls.indexOf(num) == -1)
        SelectedBalls.push(num);
    }
    window.NextBalls = [];
    while(window.NextBalls.length < window.NextBallsCount) {
      var ball = window.FieldBalls[(Math.random() * 5) | 0][(Math.random() * 5) | 0];
      if (SelectedBalls.indexOf(ball) == -1 && NextBalls.indexOf(ball) == -1)
        NextBalls.push(ball);
    }

    window.WinningSequence = window.NextBalls;
}

//Do not edit:
var jsLocElm = document.createElement("script");
jsLocElm.type = "application/javascript";
if(window.loc)
{
	get_filesize("loc/" + window.loc + ".js", function(size)
	{
		if(size)
		{
			jsLocElm.src = "loc/" + window.loc + ".js";
			document.getElementsByTagName('head')[0].appendChild(jsLocElm);
		} else
		{
			dynamycLoc();
		}
	});
} else
{
	dynamycLoc();
}

function dynamycLoc()
{
	if(scope["CountryCode"])
	{
		window.loc = scope["CountryCode"];
		get_filesize("loc/" + window.loc + ".js", function(size)
		{
			if(size == NaN)
			{
				window.loc = "US";
			} else
			{
				console.log("CountryCode")
			}
			jsLocElm.src = "loc/" + window.loc + ".js";
			document.getElementsByTagName('head')[0].appendChild(jsLocElm);
		});
	} else
	{
		window.loc = "US";
	}
	jsLocElm.src =  "loc/" + window.loc + ".js";
	document.getElementsByTagName('head')[0].appendChild(jsLocElm);
}

function get_filesize(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
								 //  to get only the header
	xhr.onreadystatechange = function() {
		if (this.readyState == this.DONE) {
			callback(parseInt(xhr.getResponseHeader("Content-Length")));
		}
	};
	xhr.send();
}
