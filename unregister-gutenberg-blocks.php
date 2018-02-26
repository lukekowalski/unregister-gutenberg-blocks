<?php
/**
 * Plugin Name: Unregister Gutenberg Blocks
 * Description: Provides an option to globally unregister default Gutenberg blocks
 * Version: 1.0.0
 * License: GPL2+
 * Author: Luke Kowalski
 * Author URI: https://wpjs.io
 * License: GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: unregister-gutenberg-blocks
 * Domain Path: /languages
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

add_action( 'plugins_loaded', 'ugb_unregister_gutenberg_blocks_init' );

function ugb_unregister_gutenberg_blocks_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		add_action( 'admin_notices', 'ugb_required_plugins_notice' );
		return;
	}

	require_once dirname(__FILE__) . '/classes/class-ugb-unregister-gutenberg-blocks.php';
	UGB_Unregister_Gutenberg_Blocks::get_instance();
}

function ugb_required_plugins_notice() {
	echo '<div class="error"><p>';
	echo __(' "Unregister Gutenberg Blocks" requires Gutenberg plugin (or WordPress >= 5.0) to work. Please make sure that you have all dependencies installed.', 'unregister-gutenberg-blocks' );
	echo '</p></div>';
}
