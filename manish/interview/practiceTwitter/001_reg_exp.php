<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<script>
const isMatch = (s, p) => {
	console.log('s is ', s);
	console.log('p is ', p);
	let sLen = s.length;
	let pLen = p.length;
	
	console.log('sLen is ', sLen);
	console.log('pLen is ', pLen);
	
	let dp = [];
	for (let i = 0; i < sLen; i++) {
		console.log('i is ', i, ' and value is ', s[i]);
		
		let tmp = [];
		for (let j = 0; j < pLen; j++) {
			tmp.push(false);
		}
		
		console.log('tmp is ', tmp);
		
		dp.push(tmp);
	}
	console.log('dp is ', dp);

	dp[0][0] = true;

	console.log('dp2 is ', dp);
	
	for (let i = 0; i < sLen; i++) {
		for (let j = 0; j < pLen; j++) {
			console.log('x is ', i, ':', s[i], ', y is ', j, ': ', p[j], ': ', dp[i][j]);
			console.log('p[j - 1] : ', p[j - 1]);
			if (p[j - 1] !== '.' && p[j - 1] !== '*') {
				console.log('one');
				if (i > 0 && p[j - 1] === s[i - 1] && dp[i - 1][j - 1]) {
					dp[i][j] = true;
				}
			} else if (p[j - 1] === '.') {
				console.log('two');
				if (i > 0 && dp[i - 1][j - 1]) {
					dp[i][j] = true;
				}
			} else if (j > 1) { //* cannot be first element
				console.log('three');
				if (dp[i][j-2]) {
					dp[i][j] = true;
				} else if (i > 0 && (p[j - 2] === s[i - 1] || p[j - 2] === '.') && dp[i - 1][j]) {
					// example
                  // xa and xa* 
                  // s[i-1] === a
                  // p[j-2] === a
                  // a === a
                  // so we can now compare x, xa*
                  // and x here is dp[i-1][j]
                    dp[i][j] = true;
				}
			}
		}
		
		console.log('final: ', dp[sLen][pLen]);
		return dp[sLen][pLen];
	}
	
	console.log('');
	console.log('');
	console.log('----------------------------');
	console.log('');
	console.log('');
};
isMatch("aa","aa");
/*isMatch("aa","a");// false
isMatch("aa","aa");// true
isMatch("aaa","aa");// false
isMatch("aa", "a*");// true
isMatch("aa", ".*");// true
isMatch("ab", ".*");// true
isMatch("aab", "c*a*b");// true*/
</script>
</head>

<body>
</body>
</html>
