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
		//require_once plugin_dir_path( __FILE__ ) . 'includes/functions.php';
	}

	/**
	 * Action/filter hooks
	 */
	public function hooks() {

		register_activation_hook( ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_FILE, array( $this, 'activate' ) );

		add_action( 'plugins_loaded', array( $this, 'loaded' ) );

		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_links' ), 10, 2 );
		
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueues' ) );
		
		add_action('acf/save_post', array( $this, 'clear_acfbs_transient' ), 20);
		
		//add_action( 'admin_menu', array( $this, 'acfbs_settings_page' ) );		
		
		add_filter('acf/settings/load_json', array( $this, 'acfbs_load_acf_json' ));

		//add_filter( 'plugin_action_links_' . ACF_BOOTSTRAP_PAGE_BUILDER_PLUGIN_BASENAME, array( $this, 'action_links' ) );		
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

		$links[] = sprintf( '<a href="%s" aria-label="%s">%s</a>', 'https://github.com/murkenmedia/acf-bootstrap-page-builder', __( 'Plugin Documentation', 'acf-bootstrap-page-builder' ), __( 'Plugin Documentation', 'acf-bootstrap-page-builder' ) );

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
		wp_register_style( 'bootstrap_acf_page_builder_css', plugin_dir_url( __FILE__ ) . 'assets/css/pagebuilder.css', array(),  '1.1.0' );
		wp_enqueue_style( 'bootstrap_acf_page_builder_css' );
		wp_enqueue_script('bootstrap_acf_page_builder_js', plugin_dir_url( __FILE__ ) . 'assets/js/pagebuilder.min.js',array( 'jquery' ), 1.0);	
		
		add_action( 'admin_notices', array( $this, 'add_class_popup' ) );
	}
	
	
	public function acfbs_settings_page($hook) {
		add_options_page( 'ACF Bootstrap Options', 'ACF Bootstrap Page Builder', 'manage_options', 'acfbs-settings',  array( $this, 'acfbs_plugin_options' ) );
	}
	
	public function acfbs_plugin_options() {
		
		if ( !current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		echo '
		<div class="wrap">
			<h1>ACF Bootstrap Page Builder Settings</h1>
			<p>To add new custom fields, enter the fields below</p>
		</div>
		';
		
	}
	
	
	public function add_class_popup($hook) {
		$class1 = '<div class="white-popup mfp-hide" id="page-builder-popup" data-id="" data-scrollpos=""><form name="page-builder-popup-form" id="page-builder-popup-form"><div class="container page-builder-form-container"><div class="row"><div class="col-12 col-sm-6 col-md-3 mb-4 hide-on-sections"><h3 class="acfbs-width">Column width</h3><p class="mb-0 mt-3 i-mobile">Width</p><select class="custom-select" name="size-xs"><option selected value="col-12">12/12</option><option value="col-11">11/12</option><option value="col-10">10/12</option><option value="col-9">9/12</option><option value="col-8">8/12</option><option value="col-7">7/12</option><option value="col-6">6/12</option><option value="col-5">5/12</option><option value="col-4">4/12</option><option value="col-3">3/12</option><option value="col-2">2/12</option><option value="col-1">1/12</option></select><p class="mb-0 mt-3 i-tablet">Sm Width <span class="small">(576px)</span></p><select class="custom-select" name="size-sm"><option value="">-- none --</option><option value="col-sm-12">12/12</option><option value="col-sm-11">11/12</option><option value="col-sm-10">10/12</option><option value="col-sm-9">9/12</option><option value="col-sm-8">8/12</option><option value="col-sm-7">7/12</option><option value="col-sm-6">6/12</option><option value="col-sm-5">5/12</option><option value="col-sm-4">4/12</option><option value="col-sm-3">3/12</option><option value="col-sm-2">2/12</option><option value="col-sm-1">1/12</option></select><p class="mb-0 mt-3 i-laptop">Md Width <span class="small">(768px)</span></p><select class="custom-select" name="size-md"><option value="">-- none --</option><option value="col-md-12">12/12</option><option value="col-md-11">11/12</option><option value="col-md-10">10/12</option><option value="col-md-9">9/12</option><option value="col-md-8">8/12</option><option value="col-md-7">7/12</option><option value="col-md-6">6/12</option><option value="col-md-5">5/12</option><option value="col-md-4">4/12</option><option value="col-md-3">3/12</option><option value="col-md-2">2/12</option><option value="col-md-1">1/12</option></select><p class="mb-0 mt-3 i-desktop">Lg Width <span class="small">(992px)</span></p><select class="custom-select" name="size-lg"><option value="">-- none --</option><option value="col-lg-12">12/12</option><option value="col-lg-11">11/12</option><option value="col-lg-10">10/12</option><option value="col-lg-9">9/12</option><option value="col-lg-8">8/12</option><option value="col-lg-7">7/12</option><option value="col-lg-6">6/12</option><option value="col-lg-5">5/12</option><option value="col-lg-4">4/12</option><option value="col-lg-3">3/12</option><option value="col-lg-2">2/12</option><option value="col-lg-1">1/12</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3 class="acfbs-offsets">Column Offsets</h3><p class="mb-0 mt-3 i-mobile">Offset</p><select class="custom-select" name="offset-xs"><option value="">-- none --</option><option value="offset-1">1</option><option value="offset-2">2</option><option value="offset-3">3</option><option value="offset-4">4</option><option value="offset-5">5</option><option value="offset-6">6</option><option value="offset-7">7</option><option value="offset-8">8</option><option value="offset-9">9</option><option value="offset-10">10</option><option value="offset-11">11</option></select><p class="mb-0 mt-3 i-tablet">Sm Offset <span class="small">(576px)</span></p><select class="custom-select" name="offset-sm"><option value="">-- none --</option><option value="offset-sm-1">1</option><option value="offset-sm-2">2</option><option value="offset-sm-3">3</option><option value="offset-sm-4">4</option><option value="offset-sm-5">5</option><option value="offset-sm-6">6</option><option value="offset-sm-7">7</option><option value="offset-sm-8">8</option><option value="offset-sm-9">9</option><option value="offset-sm-10">10</option><option value="offset-sm-11">11</option></select><p class="mb-0 mt-3 i-laptop">Md Offset <span class="small">(768px)</span></p><select class="custom-select" name="md"><option value="">-- none --</option><option value="offset-md-1">1</option><option value="offset-md-2">2</option><option value="offset-md-3">3</option><option value="offset-md-4">4</option><option value="offset-md-5">5</option><option value="offset-md-6">6</option><option value="offset-md-7">7</option><option value="offset-md-8">8</option><option value="offset-md-9">9</option><option value="offset-md-10">10</option><option value="offset-md-11">11</option></select><p class="mb-0 mt-3 i-desktop">Lg Offset <span class="small">(992px)</span></p><select class="custom-select" name="offset-lg"><option value="">-- none --</option><option value="offset-lg-1">1</option><option value="offset-lg-2">2</option><option value="offset-lg-3">3</option><option value="offset-lg-4">4</option><option value="offset-lg-5">5</option><option value="offset-lg-6">6</option><option value="offset-lg-7">7</option><option value="offset-lg-8">8</option><option value="offset-lg-9">9</option><option value="offset-lg-10">10</option><option value="offset-lg-11">11</option></select></div><div class="col-12 col-sm-6 col-md-6 mb-4"><h3 class="acfbs-custom">Custom Styles</h3><ul class="list-unstyled mb-0 mt-3">';
		
		
		$class3 = '</ul></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3 class="acfbs-top-margin">Top Margin</h3><p class="mb-0 mt-3 i-mobile">Top Marg</p><select class="custom-select" name="mt-xs"><option value="">-- none --</option><option value="mt-1">1</option><option value="mt-2">2</option><option value="mt-3">3</option><option value="mt-4">4</option><option value="mt-5">5</option></select><p class="mb-0 mt-3 i-tablet">Sm Top Marg <span class="small">(576px)</span></p><select class="custom-select" name="mt-sm"><option value="">-- none --</option><option value="mt-sm-1">1</option><option value="mt-sm-2">2</option><option value="mt-sm-3">3</option><option value="mt-sm-4">4</option><option value="mt-sm-5">5</option></select><p class="mb-0 mt-3 i-laptop">Md Top Marg <span class="small">(768px)</span></p><select class="custom-select" name="mt-md"><option value="">-- none --</option><option value="mt-md-1">1</option><option value="mt-md-2">2</option><option value="mt-md-3">3</option><option value="mt-md-4">4</option><option value="mt-md-5">5</option></select><p class="mb-0 mt-3 i-desktop">Lg Top Marg <span class="small">(992px)</span></p><select class="custom-select" name="mt-lg"><option value="">-- none --</option><option value="mt-lg-1">1</option><option value="mt-lg-2">2</option><option value="mt-lg-3">3</option><option value="mt-lg-4">4</option><option value="mt-lg-5">5</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3 class="acfbs-bot-margin">Bottom Margin</h3><p class="mb-0 mt-3 i-mobile">Bot Marg</p><select class="custom-select" name="mb-xs"><option value="">-- none --</option><option value="mb-1">1</option><option value="mb-2">2</option><option value="mb-3">3</option><option value="mb-4">4</option><option value="mb-5">5</option></select><p class="mb-0 mt-3 i-tablet">Sm Bot Marg <span class="small">(576px)</span></p><select class="custom-select" name="mb-sm"><option value="">-- none --</option><option value="mb-sm-1">1</option><option value="mb-sm-2">2</option><option value="mb-sm-3">3</option><option value="mb-sm-4">4</option><option value="mb-sm-5">5</option></select><p class="mb-0 mt-3 i-laptop">Md Bot Marg <span class="small">(768px)</span></p><select class="custom-select" name="mb-md"><option value="">-- none --</option><option value="mb-md-1">1</option><option value="mb-md-2">2</option><option value="mb-md-3">3</option><option value="mb-md-4">4</option><option value="mb-md-5">5</option></select><p class="mb-0 mt-3 i-desktop">Lg Bot Marg <span class="small">(992px)</span></p><select class="custom-select" name="mb-lg"><option value="">-- none --</option><option value="mb-lg-1">1</option><option value="mb-lg-2">2</option><option value="mb-lg-3">3</option><option value="mb-lg-4">4</option><option value="mb-lg-5">5</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3 class="acfbs-top-pad">Top Padding</h3><p class="mb-0 mt-3 i-mobile">Top Pad</p><select class="custom-select" name="pt-xs"><option value="">-- none --</option><option value="pt-1">1</option><option value="pt-2">2</option><option value="pt-3">3</option><option value="pt-4">4</option><option value="pt-5">5</option></select><p class="mb-0 mt-3 i-tablet">Sm Top Pad <span class="small">(576px)</span></p><select class="custom-select" name="pt-sm"><option value="">-- none --</option><option value="pt-sm-1">1</option><option value="pt-sm-2">2</option><option value="pt-sm-3">3</option><option value="pt-sm-4">4</option><option value="pt-sm-5">5</option></select><p class="mb-0 mt-3 i-laptop">Md Top Pad <span class="small">(768px)</span></p><select class="custom-select" name="pt-md"><option value="">-- none --</option><option value="pt-md-1">1</option><option value="pt-md-2">2</option><option value="pt-md-3">3</option><option value="pt-md-4">4</option><option value="pt-md-5">5</option></select><p class="mb-0 mt-3 i-desktop">Lg Top Pad <span class="small">(992px)</span></p><select class="custom-select" name="pt-lg"><option value="">-- none --</option><option value="pt-lg-1">1</option><option value="pt-lg-2">2</option><option value="pt-lg-3">3</option><option value="pt-lg-4">4</option><option value="pt-lg-5">5</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3 class="acfbs-bot-pad">Bottom Padding</h3><p class="mb-0 mt-3 i-mobile">Mobile BP</p><select class="custom-select" name="pb-xs"><option value="">-- none --</option><option value="pb-1">1</option><option value="pb-2">2</option><option value="pb-3">3</option><option value="pb-4">4</option><option value="pb-5">5</option></select><p class="mb-0 mt-3 i-tablet">Small BP <span class="small">(576px)</span></p><select class="custom-select" name="pb-sm"><option value="">-- none --</option><option value="pb-sm-1">1</option><option value="pb-sm-2">2</option><option value="pb-sm-3">3</option><option value="pb-sm-4">4</option><option value="pb-sm-5">5</option></select><p class="mb-0 mt-3 i-laptop">Medium BP <span class="small">(768px)</span></p><select class="custom-select" name="pb-md"><option value="">-- none --</option><option value="pb-md-1">1</option><option value="pb-md-2">2</option><option value="pb-md-3">3</option><option value="pb-md-4">4</option><option value="pb-md-5">5</option></select><p class="mb-0 mt-3 i-desktop">Large BP <span class="small">(992px)</span></p><select class="custom-select" name="pb-lg"><option value="">-- none --</option><option value="pb-lg-1">1</option><option value="pb-lg-2">2</option><option value="pb-lg-3">3</option><option value="pb-lg-4">4</option><option value="pb-lg-5">5</option></select></div></div><div class="row mt-3"><div class="col-12"><a href="#" class="btn btn-primary" id="submit-styles-btn">Apply Styles</a><a href="#" class="btn btn-outline-primary ml-3" id="reset-styles-btn">Reset</a></div></div></div></form></div>';
		
		$class2 = '';		
		
		if ( false === ( $content = get_transient( 'acfbs_classes'))) {		
		
			if( have_rows('acfbs_classes','option') ):
			
				$stylenum = 0;
				$class2 .= '<div class="row"><div class="col-12 col-sm-4">';
			
				while ( have_rows('acfbs_classes','option') ) : the_row();
					$class = get_sub_field('class');
					$label = get_sub_field('label');
					$type = get_sub_field('type');
			
					if ($stylenum == 11 || $stylenum == 22) {
						$class2 .= '</div><div class="col-12 col-sm-4">';				
					}
								
					$class2 .= '<li class="show-'.$type.'"><input type="checkbox" value="'.$class.'"><label for="'.$class.'">'.$label.'</label></li>';
			
					$stylenum++;
					
				endwhile;
			
				$class2 .= '</div></div>';
			
			else: 
				$class2 = '<li>Enter custom classes on the <a href="'.get_home_url().'/wp-admin/admin.php?page=acf-options-page-builder" target="_blank">'.get_bloginfo('name').' Settings</a> page</li>';
			endif;

			$content = $class1.$class2.$class3;
			
			if ( ! empty( $content ) ) {
				set_transient( 'acfbs_classes', $content, 1 * YEAR_IN_SECONDS );
			}		
		} 
		if ( ! empty( $content ) ) {
			echo $content;
		}
	}	
	
	
	public function clear_acfbs_transient() {
		$screen = get_current_screen();
		if (strpos($screen->id, "acf-options-page-builder") == true) {
			delete_transient('acfbs_classes');
		}
	}
	
	public function acfbs_load_acf_json( $paths ) {
		// remove original path (optional)
		//unset($paths[0]);
		$paths[] = plugin_dir_url( __FILE__ ) . 'acf-json';
		// return
		return $paths;
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
