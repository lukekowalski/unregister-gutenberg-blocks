=== Plugin Name ===
Contributors: lucaskowalski
Tags: gutenberg, block, unregister
Requires at least: 4.9
Tested up to: 4.9.4
Requires PHP: 5.6
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
 
Plugin that provides an option to unregister default Gutenberg Blocks.
 
== Description ==

'Unregister Gutenberg Blocks' plugin provides you with an option to globally unregister default Gutenberg Blocks and keep only those you really need.


== FAQ ==

= Installation instructions =
 
1. Install using the WordPress built-in Plugin installer, or Extract the zip file and drop the contents in the wp-content/plugins/ directory of your WordPress installation.
2. Make sure thaty you have 'Gutenberg' plugin installed.
2. Activate the plugin through the ‘Plugins’ menu in WordPress.
3. In Dashboard go to Settings > Unregister Gutenberg Blocks and unregister blocks that you don't need
4. Go to Gutenberg editor and have fun.
 
= Can I restrict plugin options panel visibility? =
 
Of course you can! Default capability for seeing the plugin's option panel is 'edit_posts', but you can easily change it to whatever you like using filters. Just drop the line below into your functions.php:

`if ( is_plugin_active( 'unregister-gutenberg-blocks/unregister-gutenberg-blocks.php' ) ) {
	add_filter( 'ugb_capability_filter', 'your_prefix_change_ugb_plugin_capability' );

	function your_prefix_change_ugb_plugin_capability() {
		return 'manage_options'; // or a custom capability of your choice
	}
}`
 
== Changelog ==
 
= 1.0.0 =
Initial Release