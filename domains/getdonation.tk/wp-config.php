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
define('DB_NAME', 'consultl_wp492');

/** MySQL database username */
define('DB_USER', 'consultl_wp492');

/** MySQL database password */
define('DB_PASSWORD', '412SSp@VB(');

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
define('AUTH_KEY',         '9jpdugeukzqgughftmqbz54kgmlkpmvjcqgjg9lcxr1epozdf6rhmspw4nth7x7z');
define('SECURE_AUTH_KEY',  'xkpstookxe5gxfdhdimzxbtgs2uepmsb7e8ez2qhidecmemfckqewipok5k62oou');
define('LOGGED_IN_KEY',    '3igxeschvoavaw6cpyxnpswvcglhsjb4xu1liysphre00eadudo2va3aqorhooff');
define('NONCE_KEY',        'jssvyt7yiukpizuciodmdg7efc1syyp14kdjd331wmymowonwjzbv3mhvy46o5gn');
define('AUTH_SALT',        'jefgcoh4epxxvxpz6nrjf40uikqvgui2lnul8qk5hhglpe6spljfabc0jjo6zt7q');
define('SECURE_AUTH_SALT', '9wlgzjg5hirz5fsg7nu83ifb1xxj2zca95j5hm1lnqxmxrwyfszrkyzyvrhnup5z');
define('LOGGED_IN_SALT',   'ug1y3ijfe3aqb7nsfgxncvdo0e6er1hrwa01b60jmc7y0u85qu2lqchcoeyuvasx');
define('NONCE_SALT',       'l6apzaqaefyc7sgkujupr3mtzrmlvql3xkgsmhyu4vq6aepksop0ezxmifmgspdh');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wpgr_';

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
