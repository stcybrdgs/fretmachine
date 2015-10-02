<?php
defined('ABSPATH') or die( 'No script kiddies please!' );
$apccss_settings = array();
$apccss_textarea = $_POST['apccss_textarea'];
if ( $_POST['action'] == 'apccss_save_options' ) {
	$apccss_settings['css'] = $apccss_textarea;
	update_option( APCCSS_SETTINGS, $apccss_settings);
	$_SESSION['apccss_message'] = __( 'Custom CSS Saved Successfully.', APCCSS_TEXT_DOMAIN );
    wp_redirect( admin_url() . 'admin.php?page='.APCCSS_TEXT_DOMAIN );
    exit;
}
 ?>