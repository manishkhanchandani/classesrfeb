<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>display</title>
<script>
function add(val) {
	var result;
	var total = 0;
	var step = function(val) {
		if (val === undefined) {
			return total;
		} else {
			total += val;
			return step;
		}
	};
	
	result = step(val);
	return result;
}

var tot = add(1)(2)();
console.log('tot is ', tot);
</script>
</head>

<body>
</body>
</html>