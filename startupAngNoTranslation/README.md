# yatai-healthprint

git clone https://manish-shaklee@github.com/shaklee/yatai-healthprint.git

it will ask your password, once you provide the password, it will install all files.

edit /usr/local/zend/apache2/conf/extra/httpd-vhosts.conf



<VirtualHost *:80>
    ServerAdmin mkhancha-contractor@shaklee.com
    DocumentRoot "/Users/mkhancha/web/shakleegit/yatai-healthprint"
    ServerName yatai-healthprint
	SetEnv HOSTNAME yatai-healthprint
    <Directory "/Users/mkhancha/web/shakleegit/yatai-healthprint">
        Options FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>


/etc/hosts
127.0.0.1 yatai-healthprint

Go to URL
http://yatai-healthprint/

