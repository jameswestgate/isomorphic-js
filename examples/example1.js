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
	var template = document.getElementById('test-flight'),
		writer = new Mustache.Writer(),
		tokens = writer.parse(template.outerHTML);

	//Create a context from the model 
	var context = new Mustache.Context(model);

	//Render markup and apply to target element
	var html = writer.renderTokens(tokens, context, null, template.outerHTML);

	//Replace html
	template.outerHTML = html;

})();
