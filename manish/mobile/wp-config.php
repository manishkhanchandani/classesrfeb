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
define('DB_NAME', 'consultl_wp284');

/** MySQL database username */
define('DB_USER', 'consultl_wp284');

/** MySQL database password */
define('DB_PASSWORD', '[-2iS4slp1');

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
define('AUTH_KEY',         '6akpxiyxwday1tpnndvakpzvm8tnrizq6vrr9uf6xwgppeilayd4l8uwov0de4q7');
define('SECURE_AUTH_KEY',  'vxqoebudyombtvnsxsdtkirbpi3makxupq9cn6myv0p05efqn4kkidhwfght0wrl');
define('LOGGED_IN_KEY',    'fhlaetadzh1m6asx0gqzhabw3d4pel4ou7ptcsvl9gw48x2ukyp9bwpz7lvdekvj');
define('NONCE_KEY',        'wwlftxh8w19avp1s1o96y8u7oyteupqdcrbydjxtgbmdwb3lpbu9ddiumut7yjld');
define('AUTH_SALT',        'hyg6ruyqktgdykqcct2u6vkeo5mpqp7s7xldnzpn7ua0su8n9nmkhdestx9fuzaa');
define('SECURE_AUTH_SALT', 'zbidhypzgb55g6cxfrjsdctpqqvbh2ne6wjbavi8uja4hdkewuhwqrngbge5pudi');
define('LOGGED_IN_SALT',   '80klqjlyngg5u3msa0p9ohov2r5blj1bbbhsbir0zkgia1euffz2yawbwbaiq0qr');
define('NONCE_SALT',       '6bwqnebjvjerq3krgmabwkitqokiojxyi3duj9xjioc71ymsa4jdv2r36cs07gsj');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wplq_';

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
