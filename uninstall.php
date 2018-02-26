<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die( 'Silence is golden.' );
}

// Clean database after removing the plugin
delete_option( 'ugb_unregistered_blocks' );
