function share(dest)
{
	var url = $('#share_'+dest).attr('href');
	switch (dest) {
	case 'ff':
		window.open(url, 'ff','toolbar=no,width=500,height=350');
		break;
	case 'fb':
		//var url = $('#share_fb').attr('href');
		window.open( url, 'fb','toolbar=no,width=1000,height=550');
		break;
	case 'tw':
		//var url = $('#share_tw').attr('href');
		window.open(url, 'tw','toolbar=no,width=800,height=550');
		break;
	case 'gp':
		//var url = $('#share_tw').attr('href');
		window.open(url, 'gp','toolbar=no,width=800,height=550');
		break;	
	}
	return false;
} 