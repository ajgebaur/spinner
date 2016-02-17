<?php
/**
 * Plugin Name: Wheel Tabs
 * Plugin URI: http://codecanyon.net/item/wheelizate-tabs/9571519
 * Description: Using Wheelizate Tabs.
 * Version: 1.6.1
 * Author: Kirsten Larsen
 * Author URI: 
 * License: GPL2
 */


/**
 * CHECK FIRST!
 *  + Kiem tra plugin co chay trong wordpress -> kiem tra bien wpinc
 *  + Kiem tra wordpress co upgrading hay khong -> loai bo rubytabs loading
 */
if( !defined('WPINC') ) die();
if( defined('WP_INSTALLING') && WP_INSTALLING ) return;







/**
 * DANG KI VA LOAI BO PLUGIN
 */
/* ACTIVED */
function whtbs_activation() {

    $rubytabs = array(
        'info'          => array(
                            'version'       => '1.6.1',
                            'author'        => 'Kirsten',
                            'description'   => 'WheelTabs for wordpress' )
    );

    // DANG KI HOAC CAP NHAT OPTIONS CHINH RUBYTABS
    update_option('rubytabs', $rubytabs, true);
}

/* DEACTIVED */
function whtbs_deactivation() {

    // Xoa options
    delete_option('wheelizate-tabs');
}

register_activation_hook(__FILE__, 'whtbs_activation');
register_deactivation_hook(__FILE__, 'whtbs_deactivation');








/**
 * INSERT SCRIPTS & STYLES
 */
function whtbsregister_scripts() {

    // Register scripts and styles
    $version = get_option('wheelizate-tabs')['info']['version'];

    wp_register_style('whtbscss-core', plugins_url('/css/wheelizate.tab.min.css', __FILE__), array(), $version);
    wp_register_style('whtbscss-color', plugins_url('/css//theme.min.css', __FILE__), array(), $version);

    wp_register_script('whtbsjs-icons1', plugins_url('/js/raphael.min.js', __FILE__), array(), $version);
    wp_register_script('whtbsjs-icons2', plugins_url('/js/raphael.icons.min.js', __FILE__), array(), $version);
    wp_register_script('whtbsjs-wheelnav', plugins_url('/js/wheelnav.min.js', __FILE__), array(), $version);
    wp_register_script('whtbsjs-wheeltabs', plugins_url('/js/wheelizate.tab.min.js', __FILE__), array(), $version);    
}

// STYLE + SCRIPT  
function whtbsscripts_page_front() {
    global $post;

    if( !is_a($post, 'WP_Post') ) return;


    // Scripts & Style 
    wp_enqueue_style('whtbscss-core');
    wp_enqueue_style('whtbscss-color');  
    wp_enqueue_script('whtbsjs-icons1');
    wp_enqueue_script('whtbsjs-icons2');
    wp_enqueue_script('whtbsjs-wheelnav');
    wp_enqueue_script('whtbsjs-wheeltabs');
}

// STYLE + SCRIPT 
function whtbsscripts_page_wheelizatetabs() {

    wp_enqueue_style('whtbscss-core');
    wp_enqueue_style('whtbscss-color');
    wp_enqueue_script('whtbsjs-icons1');
    wp_enqueue_script('whtbsjs-icons2');
    wp_enqueue_script('whtbsjs-wheelnav');
    wp_enqueue_script('whtbsjs-wheeltabs');;
}

add_action('init', 'whtbsregister_scripts');
add_action('wp_enqueue_scripts', 'whtbsscripts_page_front', 11);
