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
define('DB_NAME', 'consultl_wp260');

/** MySQL database username */
define('DB_USER', 'consultl_wp260');

/** MySQL database password */
define('DB_PASSWORD', '2p1.e3FS2(');

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
define('AUTH_KEY',         'd3mmh0qkfrejzdxtmsk5txc4phcojvl1qkqwhlytgwsuocsbvhzanftgw3szzqqy');
define('SECURE_AUTH_KEY',  'uviou2fwljlg8ecqovav6fizlumtnlrv635vrergjtegvlyveb0xzpclknxxrwz8');
define('LOGGED_IN_KEY',    'gvof9fzffvskpifnp8vll4x1byzzphqlsu1eqq7uoeadyhojrqvnvxwl78e6korv');
define('NONCE_KEY',        'krhxksgqkwjdfiopuw420ff4zpwk8srizzyafyu28dzvze02kfdgv1w0w8iit6rp');
define('AUTH_SALT',        'hh6s6xlm2nxjd68yeqzxxnx4hudfflvo5mue3oxexwoctqb094yauzivpbmthktr');
define('SECURE_AUTH_SALT', 'ivmsd0oudeaepqhl2vzcixoyckk0ie7smpz6nxwreez6efqukmrz597ez090s7ri');
define('LOGGED_IN_SALT',   'vuxorldrdkj6t2fzdkv0kcee8yfinq7gitikjvyfghn7jooidfzafsmiezqkzct5');
define('NONCE_SALT',       'shchgpja4bh1eli5xflhax5qb7eapxmdzeofdaxm8zh55ypyouuwp1mzixy57fnp');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wpkd_';

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
