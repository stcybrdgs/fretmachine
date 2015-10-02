<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package AccessPress Staple
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/fretMachine.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/fretMachine_dropMenus.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/fretMachine_data.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/fretMachine_createScaleFunctions.js"></script>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">



<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
    <div id="outer-wrap">
        <div id="inner-wrap">            
            <?php 
                $ak_logo_alignment = '';
                $ak_nav_alignment = '';
                $no_slider = '';
                $header_style_class = '';
                $ak_social_header = of_get_option('social_footer_header');
                $header_style = of_get_option('header_type');
                $ak_nav = of_get_option('logo_alignment');
                $ak_search_placeholder = of_get_option('search_placeholder');
                $ak_search_button_text = of_get_option('search_button');
                if($ak_nav=='center'){
                    $ak_logo_alignment = 'logo-center';
                    $ak_nav_alignment = 'menu-center';
                }
                elseif($ak_nav=='right'){
                    $ak_logo_alignment = 'logo-right';
                    $ak_nav_alignment = 'menu-right';
                }else{
                    $ak_logo_alignment = 'logo-left';
                }
               if(of_get_option('enable_slider') == 0){ $no_slider="no_slider"; }
               if($header_style == 'classic'){ 
                    $header_style_class = 'classic'; 
                }else{
                    $header_style_class = 'no-classic'; 
                }   
            ?>
            
            <header id="masthead" class="site-header <?php echo esc_attr($no_slider)." ".esc_attr($header_style_class); ?>" role="banner">
                
            <?php 
                if($ak_social_header == 1){ ?>
                <div class="header-social">
                    <div class="ak-container">
                    <div class="ak_header_social">
                        <?php do_action('accesspress_social'); ?>
                    </div> 
                    </div>
                </div>
            <?php
                } ?>
                
                <div class="ak-container" id="main-header">
                    <div class="site-branding <?php echo esc_attr($ak_logo_alignment) ?>">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"> 
                           <?php
                           $header_image = of_get_option('logo');
                            if(!empty($header_image)): ?>       
                            <img src="<?php echo esc_url(of_get_option('logo')); ?>" alt="staple-logo" />
                            <?php else:
                            ?>
                            <h1><?php echo bloginfo('title'); ?></h1>
                            <div class="tagline"><?php echo bloginfo('description'); ?></div>
                            <?php endif; ?>
                        </a>
                    </div>
                    <div class="menu-wrap <?php echo esc_attr($ak_nav_alignment); ?>">
                                    
                        <nav id="site-navigation" class="main-navigation" role="navigation">
                            
                            <div class="clearfix"> </div>
                                <?php wp_nav_menu( array( 
                                    'theme_location' => 'primary', 
                                    'container_class' => 'staple-menu',
                                    'fallback_cb' => 'accesspress_wp_page_menu'
                                 ) ); ?>  
                        </nav><!-- #site-navigation -->
                          
                    </div>

                    <div class="responsive-header">
                        <a class="nav-btn" id="nav-open-btn" href="#nav">
                        <span></span>
                        <span></span>
                        <span></span>
                        </a>
                    </div>   
                </div>
 
            </header><!-- #masthead -->

            <nav id="nav">
                <div class="block">
                    <div class="menu-responsive-header-container">
                        <?php wp_nav_menu( array( 
                        'theme_location' => 'primary', 
                        'container_class' => 'staple-menu',
                        'fallback_cb' => 'accesspress_wp_page_menu'
                        ) ); ?>  
                    </div>
                    <a class="close-btn" id="nav-close-btn" href="#top"><i class="fa fa-close"> </i> </a>
                </div>
            </nav><!-- #site-navigation -->

            <?php 
            $accesspress_show_slider = of_get_option('show_slider') ;
            if(empty($accesspress_show_slider) || $accesspress_show_slider == "no"):
            endif;
            ?>
            <div id="content" class="site-content">
            
            <?php 
            if(is_front_page()) :
                $ed_slider = of_get_option('enable_slider');
                if($ed_slider==1):?>
                <section class="slider-wrapper">
                  <?php do_action('accesspress_bxslider');?>
                </section>
                  <?php
                endif;
            endif;
            ?>