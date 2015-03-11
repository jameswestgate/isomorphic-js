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

	//Create a context from the model 
	var context = new Mustache.Context(model);

	//Render markup
	var html = writer.renderTokens(tokens, context);

	//Replace html
	element.innerHTML = html;

})();
