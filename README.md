# Unregister Gutenberg Blocks

'Unregister Gutenberg Blocks' plugin provides you with an option to globally unregister default Gutenberg Blocks and keep only those you really need.

![preview](https://raw.github.com/wpjsio/unregister-gutenberg-blocks/master/assets/screenshot-1.png)

## FAQ

### Installation instructions
 
1. Install using the WordPress built-in Plugin installer, or Extract the zip file and drop the contents in the wp-content/plugins/ directory of your WordPress installation.
2. Make sure thaty you have 'Gutenberg' plugin installed.
2. Activate the plugin through the ‘Plugins’ menu in WordPress.
3. In Dashboard go to Settings > Unregister Gutenberg Blocks and unregister blocks that you don't need
4. Go to Gutenberg editor and have fun.
 
### Can I restrict plugin options panel visibility?
 
Of course you can! Default capability for seeing the plugin's option panel is 'edit_posts', but you can easily change it to whatever you like using filters. Just drop the line below into your functions.php:

```php
add_filter( 'ugb_capability_filter', 'your_prefix_change_ugb_plugin_capability' );

function your_prefix_change_ugb_plugin_capability() {
	return 'manage_options'; // or a custom capability of your choice
}
```
 
## Changelog
 
### 1.0.0
Initial Release
