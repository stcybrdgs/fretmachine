<div class="apsc-boards-tabs" id="apsc-board-display-settings" style="display: none">
    <div class="apsc-tab-wrapper">
        <div class="apsc-option-inner-wrapper">
            <label><?php _e('Social Profile Order', 'aps-counter'); ?></label>
            <div class="apsc-option-field">
                <ul class="apsc-sortable">
                    <?php
                    $social_profiles_ref = array('facebook' => 'Facebook',
                        'twitter' => 'Twitter',
                        'googlePlus' => 'Google Plus',
                        'instagram' => 'Instagram',
                        'soundcloud' => 'SoundCloud',
                        'dribbble' => 'Dribbble',
                        'youtube' => 'Youtube',
                        'posts' => 'Posts',
                        'comments' => 'Comments',
                        );
            //$social_profiles = array('facebook','twitter','googlePlus','instagram','soundcloud','dribbble','youtube','posts','comments');
                    $social_profiles = $apsc_settings['profile_order'];
                    foreach ($social_profiles as $social_profile) {
                        ?>
                        <li><span class="left-icon"><i class="fa fa-arrows"></i></span><span class="social-name"><?php _e($social_profiles_ref[$social_profile], 'aps-counter'); ?></span>
                            <input type="hidden" name="profile_order[]" value="<?php echo $social_profile; ?>"/>
                        </li>
                        <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
        <div class="apsc-option-inner-wrapper">
            <label><?php _e('Choose Theme', 'aps-counter'); ?></label>
            <div class="apsc-option-field">
                <label>
                    <input type="radio" name="social_profile_theme" value="theme-1" <?php if($apsc_settings['social_profile_theme']=='theme-1'){?>checked="checked"<?php }?>/><?php _e('Theme 1', 'aps-counter'); ?>
                    <div class="apsc-theme-image"><img src="<?php echo SC_IMAGE_DIR.'/themes/theme-1.jpg';?>"/></div>
                </label>
                <label>
                    <input type="radio" name="social_profile_theme" value="theme-2" <?php if($apsc_settings['social_profile_theme']=='theme-2'){?>checked="checked"<?php }?>/><?php _e('Theme 2', 'aps-counter'); ?>
                    <div class="apsc-theme-image"><img src="<?php echo SC_IMAGE_DIR.'/themes/theme-2.jpg';?>"/></div>
                </label>
                <label>
                    <input type="radio" name="social_profile_theme" value="theme-3" <?php if($apsc_settings['social_profile_theme']=='theme-3'){?>checked="checked"<?php }?>/><?php _e('Theme 3', 'aps-counter'); ?>
                    <div class="apsc-theme-image"><img src="<?php echo SC_IMAGE_DIR.'/themes/theme-3.jpg';?>"/></div>
                </label>
                <label>
                    <input type="radio" name="social_profile_theme" value="theme-4" <?php if($apsc_settings['social_profile_theme']=='theme-4'){?>checked="checked"<?php }?>/><?php _e('Theme 4', 'aps-counter'); ?>
                    <div class="apsc-theme-image"><img src="<?php echo SC_IMAGE_DIR.'/themes/theme-4.jpg';?>"/></div>
                </label>
                <label>
                    <input type="radio" name="social_profile_theme" value="theme-5" <?php if($apsc_settings['social_profile_theme']=='theme-5'){?>checked="checked"<?php }?>/><?php _e('Theme 5', 'aps-counter'); ?>
                    <div class="apsc-theme-image"><img src="<?php echo SC_IMAGE_DIR.'/themes/theme-5.jpg';?>"/></div>
                </label>
            </div>
        </div>
        <div class="apsc-option-inner-wrapper">
          <label><?php _e('Counter Format','aps-counter');?></label>
          <div class="apsc-option-field">
            <label>
              <input type="radio" name="counter_format" value="default" <?php if(isset($apsc_settings['counter_format'])){checked($apsc_settings['counter_format'],'default');}?> checked="checked"/>12200
            </label>
            <label>
              <input type="radio" name="counter_format" value="comma" <?php if(isset($apsc_settings['counter_format'])){ checked($apsc_settings['counter_format'],'comma');}?>/>12,200
            </label>
            <label>
              <input type="radio" name="counter_format" value="short" <?php if(isset($apsc_settings['counter_format'])){ checked($apsc_settings['counter_format'],'short');}?>/>12.2K
            </label>
          </div>  
        </div>
    </div>
</div>