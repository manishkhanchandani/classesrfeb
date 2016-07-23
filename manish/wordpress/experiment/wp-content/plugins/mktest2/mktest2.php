<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://horo.wc5.org
 * @since             1.0.0
 * @package           Mktest2
 *
 * @wordpress-plugin
 * Plugin Name:       MkGalaxy Test 2
 * Plugin URI:        http://mkgalaxy.com
 * Description:       Coming soon description
 * Version:           1.0.0
 * Author:            Manish Khanchandani
 * Author URI:        http://horo.wc5.org
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       mktest2
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-mktest2-activator.php
 */
function activate_mktest2() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-mktest2-activator.php';
	Mktest2_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-mktest2-deactivator.php
 */
function deactivate_mktest2() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-mktest2-deactivator.php';
	Mktest2_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_mktest2' );
register_deactivation_hook( __FILE__, 'deactivate_mktest2' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-mktest2.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_mktest2() {

	$plugin = new Mktest2();
	$plugin->run();

}
run_mktest2();
