(function() {
	
	module('reconcile tests');

	test('simple dom update', function() {
		
		var template = '<div id="template"><ul><li>{{name}}</li></ul></div>',
			modelA = {name: 'one'},
			modelB = {name: 'two'};

		runTest(template, modelA, modelB);
	});

	test('parent node updates', function() {
		
		var template = '<div id="template" data-test="{{test}}"><ul><li>{{name}}</li></ul></div>',
			modelA = {name: 'one',test:'ok'},
			modelB = {name: 'two',test:'computer'};

		runTest(template, modelA, modelB);
	});

	test('section re-ordered', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li>{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:2, name: 'two'}, {id:1, name: 'one'}]};

		runTest(template, modelA, modelB);
	});

	test('section order and update', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li>{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:2, name: 'two updated'}, {id:1, name: 'one updated'}]};

		runTest(template, modelA, modelB);
	});

	test('section insert', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li>{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}, {id:3, name: 'three'}]};

		runTest(template, modelA, modelB);
	});

	test('section remove', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:1, name: 'one'}]};

		runTest(template, modelA, modelB);
	});

	test('nested sections', function() {
		
		var template = '<div id="template"><ul>{{#people}}{{#include}}<li>{{name}}</li>{{/include}}{{/people}}</ul></div>',
			modelA = {people: [{id:0, name: 'zero', include: true}, {id:1, name: 'one', include: true}, {id:2, name: 'two', include: true}, {id:3, name: 'three', include: true}]},
			modelB = {people: [{id:0, name: 'zero', include: true}, {id:1, name: 'one', include: false}, {id:2, name: 'two', include: true}, {id:3, name: 'three', include: false}]};

		runTest(template, modelA, modelB);
	});

	test('id elements with sort', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:2, name: 'two'}, {id:1, name: 'one'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements with sort and update', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:2, name: 'two updated'}, {id:1, name: 'one updated'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements with insert', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}, {id:3, name: 'three'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements with prepend', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:0, name: 'zero'}, {id:1, name: 'one'}, {id:2, name: 'two'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements with remove', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}]},
			modelB = {people: [{id:1, name: 'one'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements add and remove', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}, {id:3, name: 'three'}]},
			modelB = {people: [{id:0, name: 'zero'}, {id:1, name: 'one'}, {id:2, name: 'two'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements add and remove with edits', function() {
		
		var template = '<div id="template"><ul>{{#people}}<li id="{{id}}">{{name}}</li>{{/people}}</ul></div>',
			modelA = {people: [{id:1, name: 'one'}, {id:2, name: 'two'}, {id:3, name: 'three'}]},
			modelB = {people: [{id:0, name: 'zero'}, {id:1, name: 'one updated'}, {id:2, name: 'two'}]};

		runTest(template, modelA, modelB);
	});

	test('id elements with nested section', function() {
		
		var template = '<div id="template"><ul>{{#people}}{{#include}}<li id="{{id}}">{{name}}</li>{{/include}}{{/people}}</ul></div>',
			modelA = {people: [{id:0, name: 'zero', include: true}, {id:1, name: 'one', include: true}, {id:2, name: 'two', include: true}, {id:3, name: 'three', include: true}]},
			modelB = {people: [{id:0, name: 'zero', include: true}, {id:1, name: 'one', include: false}, {id:2, name: 'two', include: true}, {id:3, name: 'three', include: false}]};

		runTest(template, modelA, modelB);
	});


	function runTest(template, modelA, modelB) {

		var writer = new Mustache.Writer(),
			tokens = writer.parse(template);

		//Create contexts around the two models provided
		var contextA = new Mustache.Context(modelA),
			contextB = new Mustache.Context(modelB);

		//Create two document fragments to render into
		var fragmentA = document.createDocumentFragment(),
			fragmentB = document.createDocumentFragment(),
			divA = document.createElement('div'),
			divB = document.createElement('div');

		//Document fragments require a parent node to use innerHTML
		fragmentA.appendChild(divA);
		fragmentB.appendChild(divB);

		//Now manually render both models into the document fragments
		divA.innerHTML = writer.renderTokens(tokens, contextA, null, template);
		divB.innerHTML = writer.renderTokens(tokens, contextB, null, template);
		
		//Now merge and test (the newer markup is the source)
		iso.mergeNodes(divB.firstChild, divA.firstChild);

		//If B has been applied successfuly to A, then the two nodes should be equal.
		ok(divA.isEqualNode(divB), 'Nodes match.');
	}
})();