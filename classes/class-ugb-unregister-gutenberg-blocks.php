<?php 

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

if ( ! class_exists( 'UGB_Unregister_Gutenberg_Blocks' ) ) {

	class UGB_Unregister_Gutenberg_Blocks {

		private $admin_title;
		private $version = '1.0.0';
		private static $instance = null;
		
		public static function get_instance() {
			
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}
			
			return self::$instance;
		}

		private function __construct() {
			$this->admin_title = __( 'Unregister Gutenberg Blocks', 'unregister-gutenberg-blocks' );
			add_action( 'admin_init', [ $this, 'set_default_values' ] );
			add_action( 'admin_menu', [ $this, 'add_options_page' ] );
			add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts_and_styles' ] );
			add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_scripts' ] );
			add_action( 'wp_ajax_ugb_update_options', [ $this, 'update_plugin_options' ] );
		}

		public function set_default_values() {
			$defaults = [];
			add_option( 'ugb_unregistered_blocks', $defaults );
		}

		public function add_options_page() {
			$capability = apply_filters( 'ugb_capability_filter', 'edit_posts' );

			add_submenu_page(
				'gutenberg',
				$this->admin_title,
				$this->admin_title,
				$capability,
				'unregister-gutenberg-blocks',
				[ $this, 'render_options_page' ]
			);
		}

		public function render_options_page() { ?>
			<div class="ugb-admin">
				<h2 class="ugb-admin-title"><?php echo esc_html( get_admin_page_title() ); ?></h2>
				<div id="ugb-unregister-gutenberg-blocks"> <!-- React content --> </div>            
			</div>
			<?php
		}

		public function admin_enqueue_scripts_and_styles() {
			// Enqueue only where needed
			$screen = get_current_screen();
			if ( $screen->id !== 'gutenberg_page_unregister-gutenberg-blocks' ) {
				return;
			}
			
			// Adding CSS 
			wp_enqueue_style( 
				'ugb-admin-css',
				plugins_url( 'dist/css/ugb-style.css', __DIR__ ),
				[],
				$this->get_version() 
			);

			// Adding JS file for options page
			wp_enqueue_script(
				'ugb-options-page-js',
				plugins_url( 'dist/js/options-page.js', __DIR__ ),
				[ 'wp-i18n', 'wp-components', 'react', 'react-dom' ],
				$this->get_version(), 
				true 
			);
			
			// Passing options to JS 
			wp_localize_script( 'ugb-options-page-js', 'ugbGlobals', $this->get_php_params_for_js() );
		}

		public function enqueue_editor_scripts() {
			wp_enqueue_script(
				'ugb-bundle-js',
				plugins_url( 'dist/js/bundle.js', __DIR__ ),
				[ 'wp-blocks' ],
				$this->get_version(), 
				true 
			);

			// Passing options to JS 
			wp_localize_script( 'ugb-bundle-js', 'ugbGlobals', $this->get_php_params_for_js() );

		}

		private function get_php_params_for_js() {
			return [
				'unregisteredBlocks' => get_option('ugb_unregistered_blocks'),
				'ajaxURL' => admin_url('admin-ajax.php'),
			];
		}

		public function update_plugin_options() {
			if ( ! isset( $_POST['block'] ) ) {
				return wp_send_json_error();
			} 

			// Get variables
			$unregistered_blocks = get_option( 'ugb_unregistered_blocks' );
			$block_to_check = sanitize_text_field( $_POST['block'] );

			if ( ! is_array( $unregistered_blocks ) ) {
				$unregistered_blocks = [];
			}
				
			// If current block is in the array - remove it 
			if ( in_array( $block_to_check, $unregistered_blocks ) ) {
				$index = array_search( $block_to_check, $unregistered_blocks );
				if ( false !== $index ) {
					unset( $unregistered_blocks[$index] );
				}
			// if current block is not in the array - add it
			} else {
				array_push( $unregistered_blocks, $block_to_check );
			}

			update_option( 'ugb_unregistered_blocks', $unregistered_blocks );
			return wp_send_json_success();
			die();
		}

		private function get_version() {
			return $this->version;
		}
	}
}