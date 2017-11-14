<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Two Sums</title>
<script language="javascript">
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = (nums, target) => {
    console.log('nums are ', nums);
    console.log('target are ', target);
	let result = [];
	
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[j] === target - nums[i]) {
				result.push([nums[i], nums[j]]);
				result.push([i, j]);
			}
		}
	}
	
	return result;
};//complexity of O(n²)


//correct solution, max of o(n), 

var twoSum2 = (nums, target) => {
    console.log('nums are ', nums);
    console.log('target are ', target);
	
	var map = {};
	var i, value, neededValue;
	var result = [];
	var len = nums.length;
	
	console.log("len is ", len);
	
	for (i = 0; i < len; i++) {
		value = nums[i];
		console.log('value is ', value);
		neededValue = target - value;
		console.log('neededValue is ', neededValue);
		if (neededValue in map) {
			result.push(map[neededValue]);
			result.push(i);
			break;
		} else {
			map[value] = i;
		}
	}
	
	return result;
};

console.log(twoSum2([7, 11, 2, 15], 9));

/*
though process
Here is my thought process upon first look…
Step 1 Take first number in array, which in this case is -4
Step 2 Look through the rest of the array for any number that, when added to -4, gives us the target, 3
Step 3 If I find a number that satisfies the above condition, I will jot down the two numbers as a pair
Step 4 Repeat steps 1 to 3 for the rest of the numbers in the array


*/
</script>
</head>

<body>
<p>Two Sums</p>
<p>Given an array of integers, return&nbsp;<strong>indices</strong>&nbsp;of the two numbers such that they add up to a specific target.</p>
<p>You may assume that each input would have&nbsp;<strong><em>exactly</em></strong>&nbsp;one solution, and you may not use the&nbsp;<em>same</em>&nbsp;element twice.</p>
<p><strong>Example:</strong><br />
</p>
<pre>Given nums = [2, 7, 11, 15], target = 9,    
Because nums[<strong>0</strong>] + nums[<strong>1</strong>] = 2 + 7 = 9,  
return [<strong>0</strong>, <strong>1</strong>].</pre>
<p>Solution:</p>
<p>&nbsp;</p>
</body>
</html>
