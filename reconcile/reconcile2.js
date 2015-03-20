(function() {

	var model = {
		flights: [
			{
				firstName: 'Robert',
				initial: 'M',
				lastName: 'White',
				flight: 62,
				date: '17 July 1962',
				altitude: 59.6
			},
            {
                firstName: 'Joseph',
			    initial: 'A',
			    lastName: 'Walker',
			    flight: 77,
			    date: '17 January 1963',
			    altitude: 41.4
		    },
            {
                firstName: 'Joseph',
				initial: 'A',
				lastName: 'Walker',
				flight: 91,
				date: '22 August 1963',
				altitude: 67.0
            }
		]
	};
	
	//Get the tokens from the inline template
	var element = document.getElementById('test-flight-table'),
		template = element.outerHTML,
		writer = new Mustache.Writer(),
		tokens = writer.parse(template);

	//Create a context from the model 
	var context = new Mustache.Context(model);

	//Render markup
	var html = writer.renderTokens(tokens, context);

	//Replace html
	element.outerHTML = html;

	//When the button is clicked, render the new model and overwrite the DOM
	var button = document.getElementsByTagName('button')[0];

	button.addEventListener('click', function() {

		//Modify the model slightly
		model.flights[1].altitude = 51.4;

		//Create a new context and re-render the markup into a temp div
        var context = new Mustache.Context(model),
			div = document.createElement('div'),
			element = document.getElementById('test-flight-table');

		//Render the context containing the updated model into the div
		div.innerHTML = writer.renderTokens(tokens, context);
		
		//Now merge the contents of the div into the existing dom (view changes in console)
		iso.mergeNodes(div.firstChild, element, false);
	});

})();