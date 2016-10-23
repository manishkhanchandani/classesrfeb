<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('WP_CACHE', true); //Added by WP-Cache Manager
define( 'WPCACHEHOME', '/home/consultlawyers/public_html/projects/classesrfeb/manish/homeopathyrx.tk.v2/wp/wp-content/plugins/wp-super-cache/' ); //Added by WP-Cache Manager
define('DB_NAME', 'consultl_wp94');

/** MySQL database username */
define('DB_USER', 'consultl_wp94');

/** MySQL database password */
define('DB_PASSWORD', 'q9k(8]pSN3');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '5pdar9zzf8rr8qe8ty9bzgqpvfrtwcy2edqdpquu9mwbxta2f3p6hexcpnvqovxq');
define('SECURE_AUTH_KEY',  'oajr40cdohr7k49nfkgm7aqkjcc1gskfh0lpx9lumugxkrlydpagdrntfeav6nsg');
define('LOGGED_IN_KEY',    'kutxkoplkyokt1kj3vvd9q7dyzr9ksxedxyu8fwamb9xhz5sqsdij7wiuoel4vrq');
define('NONCE_KEY',        'sye2kcjtpfezxi7gomdijhp2iwmyf8gqhresx2rgzqeqcusytxzagwksahyyfvar');
define('AUTH_SALT',        'zcfsrx0mu68kuyjou6peq5hyt1yjqorqyivth3brvdya1ypj30xccmdy9mtldyum');
define('SECURE_AUTH_SALT', 'edotye9hmewn1xuqkfuhe1lpfty7xylaoecosme82qhwa9rcbfbqg3g5sjaywkar');
define('LOGGED_IN_SALT',   'jfcpxw4dggyp4rmprke7zroc8ilirceuxfanuggq5hmgkautd5qicakxjikjrvis');
define('NONCE_SALT',       'puhz0tmzfkbsstaphlxkijdwwswjhlyyo1vihqwsls7tj8sjukhyhxxloaw2xger');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wpmb_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
