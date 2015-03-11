(function() {

	var model = {
		firstName: 'Robert',
		initial: 'M.',
		lastName: 'White',
		flight: 62,
		date: '17 July 1962',
		altitude: 59.6,
		roundAltitude: function() {
			return Math.round(this.altitude);
		}
	}

	//Get the tokens from the inline template
	var element = document.getElementById('test-flight'),
		template = element.innerHTML,
		writer = new Mustache.Writer(),
		tokens = writer.parse(template);

	//Create a context from the first model 
	var context = new Mustache.Context(model);

	//Render markup and apply to target element
	var html = writer.renderTokens(tokens, context);

	//Replace html
	element.innerHTML = html;

	//Define new pilot data
	var modelB = {
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

	//When the button is clicked, render the new model and apply the changes to the DOM
	var button = document.getElementsByTagName('button')[0];

	button.addEventListener('click', function() {

		context = new Mustache.Context(modelB);
		html = writer.renderTokens(tokens, context);
		element.innerHTML = html;
	});

})();
