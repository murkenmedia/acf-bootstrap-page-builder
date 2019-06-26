<?php
/**
 * Plugin Name: ACF Bootstrap Page Builder
 * Plugin URI: https://github.com/murkenmedia/acf-bootstrap-page-builder
 * Description: Advanced Custom Fields + Bootstrap 4 Page Builder
 * Version: 0.1.0
 * Author: Murken Media
 * Author URI: https://murkenmedia.com/
 * Text Domain: acf-bootstrap-page-builder
 * Domain Path: /languages/
 *
 * License: GPL-2.0+
 * License URI: http://www.opensource.org/licenses/gpl-license.php
 */

/*
	Copyright 2019  Murken Media (brian@murkenmedia.com)

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License, version 2, as
	published by the Free Software Foundation.

	Permission is hereby granted, free of charge, to any person obtaining a copy of this
	software and associated documentation files (the "Software"), to deal in the Software
	without restriction, including without limitation the rights to use, copy, modify, merge,
	publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
	to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or
	substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

namespace Acf_Bootstrap_Page_Builder;

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Acf_Bootstrap_Page_Builder' ) ) :

class Acf_Bootstrap_Page_Builder {

	private static $instance;

	public static function instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Acf_Bootstrap_Page_Builder ) ) {
			
			self::$instance = new Acf_Bootstrap_Page_Builder;

			self::$instance->constants();
			self::$instance->includes();
			self::$instance->hooks();
		}

		return self::$instance;
	}

	/**
	 * Constants
	 */
	public function constants() {

		// Plugin version
		if ( ! defined( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_VERSION' ) ) {
			define( 'ACF_BOOTSTRAP_PAGE_BUILDER_VERSION', '0.1.0' );
		}

		// Plugin file
		if ( ! defined( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE' ) ) {
			define( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE', __FILE__ );
		}

		// Plugin basename
		if ( ! defined( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_BASENAME' ) ) {
			define( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_BASENAME', plugin_basename( ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE ) );
		}

		// Plugin directory path
		if ( ! defined( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_DIR_PATH' ) ) {
			define( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_DIR_PATH', trailingslashit( plugin_dir_path( ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE )  ) );
		}

		// Plugin directory URL
		if ( ! defined( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_DIR_URL' ) ) {
			define( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_DIR_URL', trailingslashit( plugin_dir_url( ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE )  ) );
		}

		// Templates directory
		if ( ! defined( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_TEMPLATES_DIR_PATH' ) ) {
			define ( 'ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_TEMPLATES_DIR_PATH', ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_DIR_PATH . 'templates/' );
		}
	}

	/**
	 * Include/Require PHP files
	 */
	public function includes() {
		//
		//include_once('includes/functions.php');
	}

	/**
	 * Action/filter hooks
	 */
	public function hooks() {

		register_activation_hook( ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE, array( $this, 'activate' ) );

		add_action( 'plugins_loaded', array( $this, 'loaded' ) );

		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_links' ), 10, 2 );
		
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueues' ) );

		// add_filter( 'plugin_action_links_' . ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_BASENAME, array( $this, 'action_links' ) );		
	}

	/**
	 * Run on plugin activation
	 */
	public function activate() {}

	/**
	 * Load plugin text domain
	 */
	public function loaded() {

		$locale = is_admin() && function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
		$locale = apply_filters( 'plugin_locale', $locale, 'acf-bootstrap-page-builder' );
		
		unload_textdomain( 'acf-bootstrap-page-builder' );
		
		load_textdomain( 'acf-bootstrap-page-builder', WP_LANG_DIR . '/acf-bootstrap-page-builder/acf-bootstrap-page-builder-' . $locale . '.mo' );
		load_plugin_textdomain( 'acf-bootstrap-page-builder', false, dirname( ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_BASENAME ) . '/languages' );
	}

	/**
	 * Plugin action links (under plugin's Name)
	 *
	 * @param  array 	$links 	Current links
	 *
	 * @return array        New links
	 */
	public function action_links( $links ) {

		$links[] = sprintf( '<a href="%s" aria-label="%s">%s</a>', '#', __( 'Link Text', 'acf-bootstrap-page-builder' ), __( 'Link Text', 'acf-bootstrap-page-builder' ) );

		return $links;
	}

	/**
	 * Plugin info row links (under plugin's Description)
	 *
	 * @param  array 	$links 	Current links
	 * @param  string 	$file  	Plugin basename
	 *
	 * @return array        	New links
	 */
	public function plugin_row_links( $links, $file ) {

		if ( $file == plugin_basename( __FILE__ ) ) {
			$links[] = sprintf( '<a href="%s" target="_blank">%s</a>', 'https://murkenmedia.com', 'Murken Media' );
		}

		return $links;
	}
	
	
		public function enqueues($hook) {
			// Bail if user is logged out
			if( !in_array( $hook, array( 'post.php', 'post-new.php' ) ) ) {
				return;		
			}			
			wp_register_style( 'bootstrap_acf_page_builder_css', plugin_dir_url( __FILE__ ) . 'assets/css/pagebuilder.css', false, '1.0.0' );
			wp_enqueue_style( 'bootstrap_acf_page_builder_css' );
			wp_enqueue_script('bootstrap_acf_page_builderr_js', plugin_dir_url( __FILE__ ) . 'assets/js/pagebuilder.min.js');			
		}
	
}

endif;

/**
 * Main function
 * 
 * @return object 	Acf_Bootstrap_Page_Builder instance
 */
function acfbootstrappagebuilder() {
	return Acf_Bootstrap_Page_Builder::instance();
}

acfbootstrappagebuilder();
