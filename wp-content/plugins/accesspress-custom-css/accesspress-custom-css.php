<?php
defined( 'ABSPATH' ) or die( "No script kiddies please!" );
/*
Plugin name: AccessPress Custom CSS
Plugin URI: https://accesspressthemes.com/wordpress-plugins/accesspress-custom-css/
Description: A plugin to add custom css to a site.
Version: 1.0.3
Author: AccessPress Themes
Author URI: http://accesspressthemes.com
Text Domain:apccss
Domain Path: /languages/
License: GPLv2 or later
*/

//Decleration of the necessary constants for plugin
if(!defined( 'APCCSS_VERSION' ) ) {
	define( 'APCCSS_VERSION', '1.0.3' );
}

if( !defined( 'APCCSS_IMAGE_DIR' ) ) {
	define( 'APCCSS_IMAGE_DIR', plugin_dir_url( __FILE__ ) . 'images' );
}

if( !defined( 'APCCSS_JS_DIR' ) ) {
	define( 'APCCSS_JS_DIR', plugin_dir_url( __FILE__ ) . 'js/' );
}

if( !defined( 'APCCSS_CSS_DIR' ) ) {
	define( 'APCCSS_CSS_DIR', plugin_dir_url( __FILE__ ) . 'css/' );
}

if(!defined('APCCSS_TEXT_DOMAIN')){
	define( 'APCCSS_TEXT_DOMAIN', 'apccss' );
}

if(!defined('APCCSS_LANG_DIR')){
	define( 'APCCSS_LANG_DIR', basename( dirname( __FILE__ ) ). '/languages/' );
}

if(!defined('APCCSS_SETTINGS')){
	define('APCCSS_SETTINGS', 'apccss-settings');
}

//Declaration of the class for necessary configuration of a plugin
if ( !class_exists( 'APC_Css_free' ) ){
	class APC_Css_free{
		var $apcss_settings;
		function __construct(){
			$this->apcss_settings = get_option( APCCSS_SETTINGS );
			add_action('init', array($this, 'session_init')); //start the session if not started yet.
            add_action( 'init', array( $this, 'plugin_text_domain' ) ); //load the plugin text domain
            register_activation_hook(__FILE__, array($this, 'plugin_activation')); //load the default setting for the plugin while activating
			add_action( 'admin_menu', array( $this, 'add_apccss_menu' )); //register the plugin menu in backend
            add_action('admin_enqueue_scripts', array($this, 'register_admin_assets')); //registers all the assets required for wp-admin
			add_action('admin_post_apccss_save_options', array($this, 'apccss_save_options')); //save the options in the wordpress options table.
			add_action('admin_post_apccss_restore_default_settings', array($this, 'apccss_restore_default_settings')); //save the options in the wordpress options table.
			add_action('wp_head', array($this, 'add_my_custom_css'), 999); //enqueue the custom css script to head
		}

		//starts the session with the call of init hook
        function session_init() {
            if (!session_id()) {
                session_start();
            }
        }

		//loads the text domain for translation
		function plugin_text_domain(){
			load_plugin_textdomain( APCCSS_TEXT_DOMAIN, false, APCCSS_LANG_DIR );
		}

		//load the default settings of the plugin
		function plugin_activation(){
			if( !get_option( APCCSS_SETTINGS ) ){
				include('inc/backend/activation.php');
			}
		}

		//register the plugin menu in the backend
		function add_apccss_menu(){
			add_options_page( 'AccessPress Custom CSS', 'AccessPress Custom CSS', 'manage_options', APCCSS_TEXT_DOMAIN , array( $this, 'main_page' ) );
		}
		
		//registration of the admin assets
		function register_admin_assets(){
			if (isset($_GET['page']) && $_GET['page'] == 'apccss') {
			//backend css
			wp_enqueue_style( 'apsp-frontend-css', APCCSS_CSS_DIR . 'backend.css', '', APCCSS_VERSION );
			wp_enqueue_style( 'apcss-codemirror-css', APCCSS_CSS_DIR . 'syntax/codemirror.css', '',  APCCSS_VERSION );
			wp_enqueue_style('apcss-fontawesome-css', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css', APCCSS_VERSION );
			
			//backend js
			wp_enqueue_script( 'apccss-codemirror-js', APCCSS_JS_DIR . 'syntax/codemirror.js', array('jquery'),  APCCSS_VERSION );
			wp_enqueue_script( 'apccss-codemirror-css-js', APCCSS_JS_DIR . 'syntax/css.js', array('jquery', 'apccss-codemirror-js'),  APCCSS_VERSION );
			wp_enqueue_script( 'apcss-backend-js', APCCSS_JS_DIR . 'backend.js', array('jquery', 'apccss-codemirror-css-js'),  APCCSS_VERSION );
			}
			
			if ( is_plugin_active("wp-editor/wpeditor.php") && $_SERVER['QUERY_STRING'] == 'page='.APCCSS_TEXT_DOMAIN )
				{
					function remove_wpeditor_header_info(){
						// Wp Editor Style
						wp_deregister_style('wpeditor');
						wp_deregister_style('fancybox');
						wp_deregister_style('codemirror');
						wp_deregister_style('codemirror_dialog');
						wp_deregister_style('codemirror_themes');
						
						// Wp Editor Script
						wp_deregister_script('wpeditor');
						wp_deregister_script('wp-editor-posts-jquery');
						wp_deregister_script('fancybox');
						wp_deregister_script('codemirror');
						wp_deregister_script('codemirror_php');
						wp_deregister_script('codemirror_javascript');
						wp_deregister_script('codemirror_css');
						wp_deregister_script('codemirror_xml');
						wp_deregister_script('codemirror_clike');
						wp_deregister_script('codemirror_dialog');
						wp_deregister_script('codemirror_search');
						wp_deregister_script('codemirror_searchcursor');
						wp_deregister_script('codemirror_mustache');
					}
					add_action('admin_init', 'remove_wpeditor_header_info', 20);
				}
		}

		//function to save the settings of a plugin
		function apccss_save_options(){
			if(isset($_POST['apccss_add_nonce_save_settings']) && isset($_POST['apccss_save_settings']) && wp_verify_nonce($_POST['apccss_add_nonce_save_settings'], 'apccss_nonce_save_settings') ){
			include( 'inc/backend/save-settings.php' );
			}
		}

		//function to restore the default settings of a plugin
		function apccss_restore_default_settings(){
			$nonce = $_REQUEST['_wpnonce'];
			if (!empty($_GET) && wp_verify_nonce($nonce, 'apccss-restore-default-settings-nonce')) {
                //restore the default plugin activation settings from the activation page.
                include( 'inc/backend/activation.php' );
                $_SESSION['apccss_message'] = __('Editor Cleared Successfully.', APCCSS_TEXT_DOMAIN);
                wp_redirect( admin_url() . 'admin.php?page='.APCCSS_TEXT_DOMAIN );
                exit;
            } else {
                die('No script kiddies please!');
            }
		}

		//plugins backend admin page
		function main_page() {
			include('inc/backend/main-page.php');
		}

		// Thanks to https://wordpress.org/plugins/simple-custom-css/ (functions used from)
		function mycustomcss()
			{
				// Strip tag for security reason!
				$options = get_option( APCCSS_SETTINGS );
				$mycustomcss = strip_tags($options['css']);
				return $mycustomcss;
			}

		function css_path()
			{
				global $blog_id; $cssid = ( $blog_id > "1" ) ? $cssid = "_id-".$blog_id : $cssid = null;
				$css_path = plugin_dir_path(__FILE__)."css/frontend/"."apccss".$cssid.".css";
				return $css_path;
			}

		function css_url()
			{
				global $blog_id; $cssid = ( $blog_id > "1" ) ? $cssid = "_id-".$blog_id : $cssid = null;
				$css_url = plugin_dir_url(__FILE__)."css/frontend/"."apccss".$cssid.".css";
				return $css_url;
			}

		function makecss()
			{
				// make apccss.css file and write css code
				$makecss = file_put_contents($this->css_path(), "/********* Do not edit this file *********/\n/*\n Accesspress Custom CSS - plugin by https://accesspressthemes.com\n*/\n\n".$this->mycustomcss());
				return $makecss;
			}

		function add_my_custom_css()
			{
				$mycustomcss = $this->mycustomcss();
				if (!empty($mycustomcss))
				{
					$this->makecss();
					// Write in source!
					echo "\n<!-- AccessPress Custom CSS Starts -->\n<style type=\"text/css\">\n/* AccessPress Custom CSS : AccessPress Themes team */\n@import url('".$this->css_url()."?".filemtime($this->css_path())."');\n/* AccessPressThemes: https://accesspressthemes.com */\n</style>\n<!-- AccessPress Custom CSS Ends -->\n";
				}else if(empty($mycustomcss)){
					$this->makecss();
				}
			}
	}
	$apccss_object = new APC_Css_free();
}
