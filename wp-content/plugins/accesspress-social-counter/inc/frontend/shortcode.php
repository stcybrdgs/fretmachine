<?php
defined('ABSPATH') or die("No script kiddies please!");

$apsc_settings = $this->apsc_settings;
$cache_period = ($apsc_settings['cache_period'] != '') ? $apsc_settings['cache_period']*60*60 : 24 * 60 * 60;

$apsc_settings['social_profile_theme'] = isset($atts['theme'])?$atts['theme']:$apsc_settings['social_profile_theme']; 
$format = isset($apsc_settings['counter_format'])?$apsc_settings['counter_format']:'comma';
?>
<div class="apsc-icons-wrapper clearfix apsc-<?php echo $apsc_settings['social_profile_theme']; ?>" >
    <?php
    foreach ($apsc_settings['profile_order'] as $social_profile) {
        if (isset($apsc_settings['social_profile'][$social_profile]['active']) && $apsc_settings['social_profile'][$social_profile]['active'] == 1) {
            ?>
            <div class="apsc-each-profile">
                <?php
                switch ($social_profile) {
                    case 'facebook':
                        $facebook_page_id = $apsc_settings['social_profile']['facebook']['page_id'];
                        ?>
                <a  class="apsc-facebook-icon clearfix" href="<?php echo "http://facebook.com/" . $facebook_page_id; ?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="fa fa-facebook apsc-facebook"></i><span class="media-name">Facebook</span></span>
                            <?php
                            $facebook_count = get_transient('apsc_facebook');
                            if (false === $facebook_count) {
                                
                                $api_url = 'https://www.facebook.com/' . $facebook_page_id;
                                
                                    $count = $this->facebook_count($api_url);
                                    set_transient('apsc_facebook', $count, $cache_period);
                                
                            } else {
                                $count = $facebook_count;
                            }
                            $default_count = isset($apsc_settings['social_profile']['facebook']['default_count'])?$apsc_settings['social_profile']['facebook']['default_count']:0;
                            $count = ($count==0)?$default_count:$count;
                            if($count!=0 || $count!=''){
                                set_transient('apsc_facebook',$count,$cache_period);
                            }
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            
                            ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Fans</span></div></a>
                            <?php
                            break;
                        case 'twitter':
                            ?>
                <a  class="apsc-twitter-icon clearfix"  href="<?php echo 'http://twitter.com/'.$apsc_settings['social_profile']['twitter']['username'];?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="fa fa-twitter apsc-twitter"></i><span class="media-name">Twitter</span></span>
                        <?php
                        $twitter_count = get_transient('apsc_twitter');
                        if (false === $twitter_count) {
                            $count = ($this->get_twitter_count());
                            set_transient('apsc_twitter', $count, $cache_period);
                        } else {
                            $count = $twitter_count;
                        }
                        $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                        ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Followers</span></div></a><?php
                        break;
                    case 'googlePlus':
                        $social_profile_url = 'https://plus.google.com/' . $apsc_settings['social_profile']['googlePlus']['page_id'];
                        ?>
                        <a  class="apsc-google-plus-icon clearfix" href="<?php echo $social_profile_url; ?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-googlePlus fa fa-google-plus"></i><span class="media-name">google+</span></span>
                            <?php
                            $googlePlus_count = get_transient('apsc_googlePlus');
                            if (false === $googlePlus_count) {
                                $api_url = 'https://www.googleapis.com/plus/v1/people/' . $apsc_settings['social_profile']['googlePlus']['page_id'] . '?key=' . $apsc_settings['social_profile']['googlePlus']['api_key'];
                                $params = array(
                                    'sslverify' => false,
                                    'timeout' => 60
                                );
                                $connection = wp_remote_get($api_url, $params);
                                
                                if (is_wp_error($connection)) {
                                    $count = 0;
                                } else {
                                    $_data = json_decode($connection['body'], true);

                                    if (isset($_data['circledByCount'])) {
                                        $count = (intval($_data['circledByCount']));
                                        set_transient('apsc_googlePlus', $count,$cache_period);
                                    } else {
                                        $count = 0;
                                    }
                                }
                            } else {
                                $count = $googlePlus_count;
                            }
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Followers</span></div></a><?php
                            break;
                        case 'instagram':
                            $username = $apsc_settings['social_profile']['instagram']['username'];
                            $user_id = $apsc_settings['social_profile']['instagram']['user_id'];
                            $social_profile_url = 'https://instagram.com/' . $username;
                            ?>
                        <a  class="apsc-instagram-icon clearfix" href="<?php echo $social_profile_url; ?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-instagram fa fa-instagram"></i><span class="media-name">Instagram</span></span>
                            <?php
                            $instagram_count = get_transient('apsc_instagram');
                            if (false === $instagram_count) {
                                $access_token = $apsc_settings['social_profile']['instagram']['access_token'];

                                $api_url = 'https://api.instagram.com/v1/users/' . $user_id . '?access_token=' . $access_token;
                                $params = array(
                                    'sslverify' => false,
                                    'timeout' => 60
                                );
                                $connection = wp_remote_get($api_url, $params);
                                if (is_wp_error($connection)) {
                                    $count = 0;
                                } else {
                                    $response = json_decode($connection['body'], true);
                                    if (
                                            isset($response['meta']['code']) && 200 == $response['meta']['code'] && isset($response['data']['counts']['followed_by'])
                                    ) {
                                        $count = (intval($response['data']['counts']['followed_by']));
                                        set_transient('apsc_instagram',$count,$cache_period);
                                    } else {
                                        $count = 0;
                                    }
                                }
                            } else {
                                $count = $instagram_count;
                            }
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            ?>
                            <span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Followers</span></div></a>
                            <?php
                            break;
                        case 'youtube':
                            $social_profile_url = esc_url($apsc_settings['social_profile']['youtube']['channel_url']);
                            ?>
                        <a class="apsc-youtube-icon clearfix" href="<?php echo $social_profile_url; ?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-youtube fa fa-youtube"></i><span class="media-name">Youtube</span></span>
                        <?php
                        $youtube_count = $apsc_settings['social_profile']['youtube']['subscribers_count'];
                        $count = ($youtube_count!='')?$this->get_formatted_count($youtube_count,$format):0;
                        ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Subscriber</span></div></a><?php
                            break;
                        case 'soundcloud':
                            $username = $apsc_settings['social_profile']['soundcloud']['username'];
                            $social_profile_url = 'https://soundcloud.com/' . $username;
                            ?>
                        <a class="apsc-soundcloud-icon clearfix" href="<?php echo $social_profile_url; ?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-soundcloud fa fa-soundcloud"></i><span class="media-name">Soundcloud</span></span>
                            <?php
                            $soundcloud_count = get_transient('apsc_soundcloud');
                            if (false === $soundcloud_count) {
                                $api_url = 'https://api.soundcloud.com/users/' . $username . '.json?client_id=' . $apsc_settings['social_profile']['soundcloud']['client_id'];
                                $params = array(
                                    'sslverify' => false,
                                    'timeout' => 60
                                );

                                $connection = wp_remote_get($api_url, $params);
                                if (is_wp_error($connection)) {
                                    $count = 0;
                                } else {
                                    $response = json_decode($connection['body'], true);

                                    if (isset($response['followers_count'])) {
                                        $count = (intval($response['followers_count']));
                                        set_transient( 'apsc_soundcloud',$count,$cache_period );
                                    } else {
                                        $count = 0;
                                    }
                                }
                            } else {
                                $count = $soundcloud_count;
                            }
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Followers</span></div></a><?php
                            break;
                        case 'dribbble':
                            $social_profile_url = 'http://dribbble.com/'.$apsc_settings['social_profile']['dribbble']['username'];
                            ?>
                        <a class="apsc-dribble-icon clearfix" href="<?php echo $social_profile_url; ?>" target="_blank"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-dribbble fa fa-dribbble"></i><span class="media-name">dribble</span></span>
                            <?php
                            $dribbble_count = get_transient('apsc_dribbble');
                            if (false === $dribbble_count) {
                                $username = $apsc_settings['social_profile']['dribbble']['username'];
                                 $api_url = 'http://api.dribbble.com/' . $username;
                                $params = array(
                                    'sslverify' => false,
                                    'timeout' => 60
                                );
                                $connection = wp_remote_get($api_url, $params);
                                if (is_wp_error($connection)) {
                                    $count = 0;
                                } else {
                                    $response = json_decode($connection['body'], true);
                                    if (isset($response['followers_count'])) {
                                        $count = (intval($response['followers_count']));
                                        set_transient('apsc_dribbble',$count,$cache_period );
                                    } else {
                                        $count = 0;
                                    }
                                }
                            } else {
                                $count = $dribbble_count;
                            }
                            
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Followers</span></div></a><?php
                            break;
                        case 'posts':
                            ?>
                        <a class="apsc-edit-icon clearfix" href="javascript:void(0);"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-posts fa fa-edit"></i><span class="media-name">Post</span></span>
                            <?php
                            $posts_count = get_transient('apsc_posts');
                            if (false === $posts_count) {
                                $posts_count = wp_count_posts();
                                $count = $posts_count->publish;
                                set_transient('apsc_posts', $count, $cache_period);
                            } else {
                                $count = $posts_count;
                            }
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Post</span></div></a><?php
                            break;
                        case 'comments':
                            ?>
                        <a class="apsc-comment-icon clearfix" href="javascript:void(0);"><div class="apsc-inner-block"><span class="social-icon"><i class="apsc-comments fa fa-comments"></i><span class="media-name">Comment</span></span>
                            <?php
                            $comments_count = get_transient('apsc_comments');
                            if (false === $comments_count) {
                                $data = wp_count_comments();
                                $count = ($data->approved);
                                set_transient('apsc_comments', $count, $cache_period);
                            } else {
                                $count = $comments_count;
                            }
                            $count = ($count!='')?$this->get_formatted_count($count,$format):0;
                            ?><span class="apsc-count"><?php echo $count; ?></span><span class="apsc-media-type">Comments</span></div></a><?php
                            break;
                        default:
                            break;
                    }
                    ?>
            </div><?php
                }
            }
            ?>
</div>

