<div class="apsc-boards-tabs" id="apsc-board-social-profile-settings">
    <div class="apsc-tab-wrapper">
        <!---Facebook-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Facebook', 'aps-counter') ?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[facebook][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['facebook']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Facebook Page ID', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[facebook][page_id]" value="<?php echo esc_attr($apsc_settings['social_profile']['facebook']['page_id']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the page ID or page name.For example:If your page url is https://www.facebook.com/AccessPressThemes then your page ID is AccessPressThemes.', 'aps-counter'); ?></div>
                        
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Facebook Default Count', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[facebook][default_count]" value="<?php echo isset($apsc_settings['social_profile']['facebook']['default_count'])?esc_attr($apsc_settings['social_profile']['facebook']['default_count']):'';?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the default count for facebook to show whenever the API is unavailable.', 'aps-counter'); ?></div>
                        
                    </div>
                </div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="facebook"] to get the Facebook Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!---Facebook-->
        
        <!--Twitter-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Twitter', 'aps-counter') ?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[twitter][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['twitter']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Twitter Username', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[twitter][username]" value="<?php echo esc_attr($apsc_settings['social_profile']['twitter']['username']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the twitter username.For example:apthemes', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Twitter Consumer Key', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[twitter][consumer_key]" value="<?php echo esc_attr($apsc_settings['social_profile']['twitter']['consumer_key']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please create an app on Twitter through this link:', 'aps-counter'); ?><a href="https://dev.twitter.com/apps" target="_blank">https://dev.twitter.com/apps</a><?php _e(' and get this information.'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Twitter Consumer Secret', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[twitter][consumer_secret]" value="<?php echo esc_attr($apsc_settings['social_profile']['twitter']['consumer_secret']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please create an app on Twitter through this link:', 'aps-counter'); ?><a href="https://dev.twitter.com/apps" target="_blank">https://dev.twitter.com/apps </a><?php _e(' and get this information.'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Twitter Access Token', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[twitter][access_token]" value="<?php echo esc_attr($apsc_settings['social_profile']['twitter']['access_token']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please create an app on Twitter through this link:', 'aps-counter'); ?><a href="https://dev.twitter.com/apps" target="_blank">https://dev.twitter.com/apps </a><?php _e(' and get this information.'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Twitter Access Token Secret', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[twitter][access_token_secret]" value="<?php echo esc_attr($apsc_settings['social_profile']['twitter']['access_token_secret']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please create an app on Twitter through this link:', 'aps-counter'); ?><a href="https://dev.twitter.com/apps" target="_blank">https://dev.twitter.com/apps </a><?php _e(' and get this information.'); ?></div>
                    </div>
                </div>

            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="twitter"] to get the Twitter Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Twitter-->
        
        <!--Google Plus-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Google Plus', 'aps-counter'); ?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[googlePlus][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['googlePlus']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Google Plus Page Name or Profile ID', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[googlePlus][page_id]" value="<?php echo esc_attr($apsc_settings['social_profile']['googlePlus']['page_id']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the page name or profile ID.For example:If your page url is https://plus.google.com/+BBCNews then your page name is +BBCNews', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Google API Key', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[googlePlus][api_key]" value="<?php echo esc_attr($apsc_settings['social_profile']['googlePlus']['api_key']);?>"/>
                        <div class="apsc-option-note"><?php _e('To get your API Key, first create a project/app in <a href="https://console.developers.google.com/project" target="_blank">https://console.developers.google.com/project</a> and then turn on Google+ API from "APIs & auth >APIs inside your project.Then again go to "APIs & auth > APIs > Credentials > Public API access" and then click "CREATE A NEW KEY" button, select the "Browser key" option and click in the "CREATE" button, and then copy your API key and paste in above field.', 'aps-counter'); ?></div>
                    </div>
                </div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="googlePlus"] to get the Google Plus Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Google Plus-->
        
        <!--Instagram-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Instagram', 'aps-counter') ?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[instagram][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['instagram']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Instagram Username', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[instagram][username]" value="<?php echo esc_attr($apsc_settings['social_profile']['instagram']['username']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the instagram username', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Instagram User ID', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[instagram][user_id]" value="<?php  echo esc_attr($apsc_settings['social_profile']['instagram']['user_id']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the instagram user ID.You can get this information from <a href="http://www.pinceladasdaweb.com.br/instagram/access-token/" target="_blank">http://www.pinceladasdaweb.com.br/instagram/access-token/</a>', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Instagram Access Token', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[instagram][access_token]" value="<?php echo esc_attr($apsc_settings['social_profile']['instagram']['access_token']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the instagram Access Token.You can get this information from <a href="http://www.pinceladasdaweb.com.br/instagram/access-token/" target="_blank">http://www.pinceladasdaweb.com.br/instagram/access-token/</a>', 'aps-counter'); ?></div>
                    </div>
                </div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="instagram"] to get the Instagram Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Instagram-->
        
        <!--Youtube-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Youtube', 'aps-counter') ?></h4>
            <div class="apsc-extra-note">
          <p><?php _e('Note: Youtube has recently deprecated its gdata API and updated its API to v3 which needs authentication and complicated mechanism to get the simple count.So we are working on the easier solution.Till then please use the Youtube Subscribers Count for displaying the count in frontend.','aps-counter')?></p>
        </div>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[youtube][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['youtube']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Youtube Username', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[youtube][username]" value="<?php echo esc_attr($apsc_settings['social_profile']['youtube']['username']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the youtube username.For example:accesspressthemes', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Youtube Channel URL', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[youtube][channel_url]" value="<?php echo esc_attr($apsc_settings['social_profile']['youtube']['channel_url']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the youtube channel URL.For example:https://www.youtube.com/user/accesspressthemes', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Youtube Subscribers Count', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[youtube][subscribers_count]" value="<?php echo isset($apsc_settings['social_profile']['youtube']['subscribers_count'])?esc_attr($apsc_settings['social_profile']['youtube']['subscribers_count']):0;?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter total number of subscribers that your youtube channel has.', 'aps-counter'); ?></div>
                    </div>
                </div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="youtube"] to get the Youtube Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Youtube-->
        
        <!--Sound Cloud-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Sound Cloud', 'aps-counter') ?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[soundcloud][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['soundcloud']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('SoundCloud Username', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[soundcloud][username]" value="<?php echo $apsc_settings['social_profile']['soundcloud']['username'];?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the SoundCloud username.For example:bchettri', 'aps-counter'); ?></div>
                    </div>
                </div>
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('SoundCloud Client ID', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[soundcloud][client_id]" value="<?php echo esc_attr($apsc_settings['social_profile']['soundcloud']['client_id']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter the SoundCloud APP Client ID.You can get this information from <a href="http://soundcloud.com/you/apps/new">http://soundcloud.com/you/apps/new</a> after creating a new app', 'aps-counter'); ?></div>
                    </div>
                </div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="soundcloud"] to get the SoundCloud Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Sound Cloud-->
        
        <!--Dribbble-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e('Dribbble', 'aps-counter') ?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter', 'aps-counter') ?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[dribbble][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['dribbble']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-option-extra">
                <div class="apsc-option-inner-wrapper">
                    <label><?php _e('Dribbble Username', 'aps-counter'); ?></label>
                    <div class="apsc-option-field">
                        <input type="text" name="social_profile[dribbble][username]" value="<?php echo esc_attr($apsc_settings['social_profile']['dribbble']['username']);?>"/>
                        <div class="apsc-option-note"><?php _e('Please enter your dribbble username.For example:Creativedash', 'aps-counter'); ?></div>
                    </div>
                </div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="dribbble"] to get the Dribbble Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Dribbble-->
        
        <!--Posts-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e("Posts",'aps-counter')?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter','aps-counter');?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[posts][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['posts']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="posts"] to get the Posts Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Posts-->
        
        <!--Comments-->
        <div class="apsc-option-outer-wrapper">
            <h4><?php _e("Comments",'aps-counter');?></h4>
            <div class="apsc-option-inner-wrapper">
                <label><?php _e('Display Counter','aps-counter');?></label>
                <div class="apsc-option-field"><label><input type="checkbox" name="social_profile[comments][active]" value="1" class="apsc-counter-activation-trigger" <?php if(isset($apsc_settings['social_profile']['comments']['active'])){?>checked="checked"<?php } ?>/><?php _e('Show/Hide', 'aps-counter'); ?></label></div>
            </div>
            <div class="apsc-extra-note"><?php _e('Please use: [aps-get-count social_media="comments"] to get the Comments Count only.You can also pass count_format parameter too in this shortcode to format your count.Formats are "short" for abbreviated format and "comma" for comma separated formats.');?></div>
        </div>
        <!--Comments-->
        
      </div>

</div>
