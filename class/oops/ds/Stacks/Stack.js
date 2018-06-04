function Stack() {
	
	let items = [];//array
	
	//add new item in the Stack
	this.push = function(element) {
		items.push(element);
	};
	
	//remove the item from the stack
	this.pop = function() {
		return items.pop();
	};
	
	//this is the last item which went in my Stack
	this.peek = function() {
		return items[items.length - 1]
	};
	
	this.isEmpty = function() {
		return items.length === 0;
	};
	
	this.size = function() {
		return items.length;
	};
	
	this.clear = function() {
		items = [];
	};
	
	this.print = function() {
		console.log('items are ', items);
	};
	
	
}


/*
Table
Book1
Book2
Book3
Book4

Small Code
BalancedParenthesis
*/