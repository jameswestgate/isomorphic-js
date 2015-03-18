(function() {

	//When the button is clicked, render the new model and apply the changes to the DOM
	var button = document.getElementsByTagName('button')[0];

	button.addEventListener('click', function() {

		//Define the model to replace the existing info on the page
		var model = {
			firstName: 'Joseph',
			initial: 'A',
			lastName: 'Walker',
			flight: 77,
			date: '17 January 1963',
			altitude: 51.4,
			roundAltitude: function() {
				return Math.round(this.altitude);
			}
		}

		//Template tokens could be passed to the client from the server as json
		var tokens = '[["text","<dt>Name:</dt><dd>",0,21],["name","firstName",21,34],["text"," ",34,35],["name","initial",35,46],["text"," ",46,47],["name","lastName",47,59],["text","</dd><dt>Flight No:</dt><dd>",59,90],["name","flight",90,100],["text","</dd><dt>Date:</dt><dd>",100,126],["name","date",126,134],["text","</dd><dt>Altitude:</dt><dd>",134,164],["name","roundAltitude",164,181],["text"," mi</dd>",181,191]]';
		
		//Instead of overwriting the inner html, use a reconciliation algorithm to perform intelligent updates
		//Changes are logged in the console
		var element = document.getElementById('test-flight'),
			context = new Mustache.Context(model),
			writer = new Mustache.Writer();

		//Create a container element as we need to construct a document fragment for comparison
		var div = document.createElement('div');
		div.innerHTML = writer.renderTokens(JSON.parse(tokens), context);

		//Now merge into the existing dom by providing the two parent dom nodes
		iso.mergeNodes(div, element);
	});

})();
