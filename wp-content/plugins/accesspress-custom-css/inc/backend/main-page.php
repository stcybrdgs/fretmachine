<?php defined( 'ABSPATH' ) or die( 'No script kiddies please!' ); ?>
<div class="wrap">
<div class="apccss-backend-wrapper clearfix">
	<div class="apccss-form-wraper">
        <div class="apccss-head">
            <div class="apccss-setting-header clearfix">
                <h1><?php _e('AccessPress Custom CSS', APCCSS_TEXT_DOMAIN ); ?></h1>
                <div class="apccss-right-header-block">
                    <div class="apccss-header-icons">
                        <p>Follow us for new updates</p>
                        <div class="apccss-social-bttns">
                            <iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FAccessPress-Themes%2F1396595907277967&amp;width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35&amp;appId=1411139805828592" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:20px; width:50px " allowtransparency="true"></iframe>
                            &nbsp;&nbsp;
                            <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" src="http://platform.twitter.com/widgets/follow_button.5f46501ecfda1c3e1c05dd3e24875611.en.html#_=1421918256492&amp;dnt=true&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=apthemes&amp;show_count=false&amp;show_screen_name=true&amp;size=m" class="twitter-follow-button twitter-follow-button" title="Twitter Follow Button" data-twttr-rendered="true" style="width: 126px; height: 20px;"></iframe>
                            <script>!function (d, s, id) {
                                    var js, fjs = d.getElementsByTagName(s)[0];
                                    if (!d.getElementById(id)) {
                                        js = d.createElement(s);
                                        js.id = id;
                                        js.src = "//platform.twitter.com/widgets.js";
                                        fjs.parentNode.insertBefore(js, fjs);
                                    }
                                }(document, "script", "twitter-wjs");</script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        $options = get_option( APCCSS_SETTINGS );
        if (isset($_SESSION['apccss_message'])) { ?>
            <div class="apccss-message">
                <p>
                <?php
        	        echo $_SESSION['apccss_message'];
        	        unset($_SESSION['apccss_message']);
                ?>
                </p>
            </div>
        <?php } ?>
		<form action="<?php echo admin_url() . 'admin-post.php' ?>" method='post'>
				<ul class="apccss-setting-tabs">
				    <li class="apccss-active-tab"><a href="javascript:void(0)" id="apccss-custom-css-settings" class="apccss-tabs-trigger"><?php _e('Custom CSS settings', APCCSS_TEXT_DOMAIN); ?></a></li>
				    <li><a href="javascript:void(0)" id="apccss-about" class="apccss-tabs-trigger"><?php _e('About', APCCSS_TEXT_DOMAIN); ?></a></li>
				</ul>
        		<div class='apccss-tab-contents apccss-active-tab' id='tab-apccss-custom-css-settings'>
        			<p class="apccss-info"><?php _e('Please write your custom css here:', APCCSS_TEXT_DOMAIN); ?> </p>
        			<input type="hidden" name="action" value="apccss_save_options" />
        			<p> <input type="submit" class="apccss-submit-css" name='apccss_save_settings' value="<?php _e( 'Save', APCCSS_TEXT_DOMAIN ); ?>"/> </p>
        			<textarea name="apccss_textarea" id="apccss_textarea" dir="ltr" style="width:100%;height:350px;"><?php if(isset($options['css'])){ echo $options['css']; } ?></textarea>
        			<script type="text/javascript">var editor = CodeMirror.fromTextArea(document.getElementById("apccss_textarea"), { lineNumbers: true });</script>
        			<input type="button" class="apccss-top-button" value="<?php _e( 'Top^', APCCSS_TEXT_DOMAIN ); ?>" />

        	        <div class="apccss-actions">
        	    		<input type="submit" class="apccss-bottom-submit" name='apccss_save_settings' value="<?php _e( 'Save', APCCSS_TEXT_DOMAIN ); ?>" />
        	    		<?php wp_nonce_field('apccss_nonce_save_settings', 'apccss_add_nonce_save_settings'); ?>
        	    		<?php $nonce = wp_create_nonce('apccss-restore-default-settings-nonce'); ?>
        	    		<a class="apccss-btn-wrap" href="<?php echo admin_url() . 'admin-post.php?action=apccss_restore_default_settings&_wpnonce=' . $nonce; ?>" onclick="return confirm('<?php _e('Are you sure you want to clear the editor?', APCCSS_TEXT_DOMAIN ); ?>')"><input type="button" value="<?php _e('Clear Editor',APCCSS_TEXT_DOMAIN);?>" class="apccss-reset-button"/></a>
        	        </div>
        		</div>

                <div class='apccss-tab-contents' id='tab-apccss-about' style="display:none">
                	<?php include('apccss-about.php'); ?>
                </div>
		</form>
	</div><!-- apccss-form-wraper -->
</div> <!--  apccss backend wrapper -->
</div> <!-- wrap -->