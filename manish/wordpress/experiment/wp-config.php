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
define('DB_NAME', 'consultl_wp602');

/** MySQL database username */
define('DB_USER', 'consultl_wp602');

/** MySQL database password */
define('DB_PASSWORD', '9SnPt8X-5.');

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
define('AUTH_KEY',         '1unlvil2x082aohb8aoqqczgybvqknejfeow7pyyiprrbo9xo6gkrhz04wfcszgr');
define('SECURE_AUTH_KEY',  'lymldo5cpj9rtpm8usrxdwkejkj0xmnalyhbkfadamybfkjlpt3do152lfdd0wxn');
define('LOGGED_IN_KEY',    'vh1ybpwc70nvgkxd8d5ia9jv7vk00ct9jge2iymhawt08j4zcsz6jocuvy0ewlt3');
define('NONCE_KEY',        'aozdgzfwf18sdorsmryaet7jfg0g9lcjlyojmjqmj7dpfvdrlanbk5ii1brapmhq');
define('AUTH_SALT',        'hhpbbt7ihmjpilonpwlmaq4qlfcpwlwt94or4jiwlpaaoz0bloeobn9gkpyd0qqy');
define('SECURE_AUTH_SALT', 'pd6f7atl3ziizyolj8urvgw32fbgc5tv6snk99a3zssdc8jfvsohdee60bhvxogf');
define('LOGGED_IN_SALT',   'weymlevbxqffd3vwm133udcj7odzewxu2jfxwbwaxw4ayepggebudnkwlaj2duph');
define('NONCE_SALT',       'ze7lspoz4fu3wlmhifgjhtbreoo1lncjzjoic5bx5n4e8au3wpam4aivhvlrwwum');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wpta_';

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
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
