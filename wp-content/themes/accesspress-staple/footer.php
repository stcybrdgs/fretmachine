	<?php
	/**
	 * The template for displaying the footer.
	 *
	 * Contains the closing of the #content div and all content after
	 *
	 * @package AccessPress Staple
	 */
	?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
		        <?php
				if ( is_active_sidebar( 'footer-1' ) ||  is_active_sidebar( 'footer-2' )  || is_active_sidebar( 'footer-3' )  || is_active_sidebar( 'footer-4' )) : ?>
				<div class="top-footer footer-column-<?php echo accesspress_footer_count(); ?>">
    				<div class="ak-container">
    					<div class="footer-block-1 footer-block">
    						<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
    							<?php dynamic_sidebar( 'footer-1' ); ?>
    						<?php endif; ?>	
    					</div>
    
    					<div class="footer-block-2 footer-block">
    						<?php if ( is_active_sidebar( 'footer-2' ) ) : ?>
    							<?php dynamic_sidebar( 'footer-2' ); ?>
    						<?php endif; ?>	
    					</div>

                        <div class="staple-hide clearfix"></div>
    
    					<div class="footer-block-3 footer-block">
    						<?php if ( is_active_sidebar( 'footer-3' ) ) : ?>
    							<?php dynamic_sidebar( 'footer-3' ); ?>
    						<?php endif; ?>	
    					</div>
    
    					<div class="footer-block-4 footer-block">
    						<?php if ( is_active_sidebar( 'footer-4' ) ) : ?>
    							<?php dynamic_sidebar( 'footer-4' ); ?>
    		                <?php endif; ?>
    		            </div>
    		            </div>
                    </div>
		            <?php endif; ?>
		         
				<div class="site-info">
					<div id="bottom-footer">
        				<div class="ak-container">
        					<div class="copyright">
        						<?php _e('copyright', 'accesspress-staple'); ?> &copy; <?php echo date('Y') ?> 
        						<a href="<?php echo home_url(); ?>"><?php
        		                $copyright = of_get_option('copyright');
        		                 if(!empty($copyright)){
        							    echo "stacy bridges"; 
        							}else{
        								echo "stacy bridges";
        							} ?></a>    
        		                <span class="free-credit"> | <?php _e('wordpress theme:', 'accesspress-staple')?> <a href="<?php esc_url('http://accesspressthemes.com/')?>" target="_blank">accesspress staple</a></span>
        					</div>
        		            <?php if(of_get_option('social_footer')==1){ ?>
        		            <div class="ak_footer_social">
        		              <?php do_action('accesspress_social'); ?>
        		            </div>
        		            <?php } ?>
        				</div>
				    </div>
				</div><!-- .site-info -->
			</footer><!-- #colophon -->
		</div> <!-- #inner wrap -->
	</div> <!-- #outer-wrap -->
</div><!-- #page -->
<div id="ak-top"><i class="fa fa-angle-up"></i><?php _e('top', 'accesspress-staple'); ?></div>
<?php wp_footer(); ?>
</body>
</html>