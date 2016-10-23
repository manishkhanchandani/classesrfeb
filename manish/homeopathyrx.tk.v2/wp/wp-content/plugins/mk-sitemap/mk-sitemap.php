<?php

/**

* Plugin Name: MK Sitemap Modified

* Plugin URI: http://www.wedesin.cz/en/plugin/wedesin-html-sitemap/

* Description: WeDesIn HTML Sitemap creates sitemap of your website. To generate the sitemap use the shortcode [mk-sitemap]. See http://www.wedesin.cz/en/plugin/wedesin-html-sitemap for more details. 

* Version: 1.03

* Author: WeDesIn

* Author URI: http://www.wedesin.cz/

* Requires at least: 4.0

* Tested up to: 4.6.1

* License: GPL2 or higher

*/



defined( 'ABSPATH' ) or die( "No direct access please." );



/**

 * Create pages list

 * @since 1.0

 * @param none

 * @return string

 */



function return_pages_mk_sitemap() {



	//get the exclude posts setting

	$exclude = "";

	$excluded_posts_mk_sitemap = str_replace(' ', '', get_option('_html_sitemap_setting_mk_sitemap'));

	$exclude = $excluded_posts_mk_sitemap;



	$args = array(

		'post_status'  => 'publish',

		'echo'         => 0,

		'exclude'      => "",

		'title_li'     => '', 

	);

	

	$result = wp_list_pages($args);



	return $result;

}



/**

 * Creates list of post types

 * @since 1.02

 * @param post type => string

 * @return array

 */



function options_to_array_mk_sitemap( $string ){

	

	//get the exclude posts setting

	$array_data = get_option('_html_sitemap_setting_mk_sitemap');

	$array_data = str_replace(' ', '', $array_data);



    if ( !empty($array_data) ) { 

    	$array_data =  explode ( ",", $array_data[$string] );

    }



    return $array_data;

}



/**

 * Creates list of post types

 * @since 1.0

 * @param post type => string

 * @return string

 */



function return_post_type_posts_mk_sitemap($post_type) {



	global $post;



    //get options array

    $excluded_posts_mk_sitemap = options_to_array_mk_sitemap( 'exclude' );

	

	$return = ''; $content = '';

	$args = array( 'post_type' => $post_type, 'posts_per_page' => -1, 'post_status' => 'any','orderby' => 'title', 'order' => 'ASC',  );

	$the_query = new WP_Query( $args );

	$posts = $the_query->posts;



	//if array is set

	if( !is_wp_error($posts) && !empty($posts) ){



		foreach ( $posts as $post) {

			

			//get the post values

			$the_title = $post ->post_title;

			$the_url= get_the_permalink( $post->ID );



			//check if the post type is not attachement 

			if( $post_type != 'attachment' ){



				if ( !in_array($post->ID, $excluded_posts_mk_sitemap ) ) {



					$return .= '<li><a href="'.$the_url.'">'.$the_title.'</a></li>';



				}

			

			} else {



				$return .= '<li><a href="'.$the_url.'">'.$the_title.'</a></li>';



			}

		}



	}

	wp_reset_query();	

	return $return;

}



/**

 * Feed all post types

 * @since 1.0

 * @param none

 * @return array

 */

function feed_post_types_mk_sitemap(){

	$args = array( 'public' => true,

	'publicly_queryable' => true );



	$post_types = get_post_types( $args );



	//remove attachments

	unset($post_types["attachment"]);



	//unset custom post type

	$exclude_post_type = options_to_array_mk_sitemap( 'exclude_type' );



	//unset from feed

	if ( isset( $exclude_post_type ) && !is_wp_error($exclude_post_type) ) {



		foreach ($exclude_post_type as $key => $type ) {



			unset( $post_types[$type] );



		}

	}

	

	return $post_types;

}





/**

 * Create final content

 * @since 1.0

 * @param none

 * @return string

 */



function create_shortcode_mk_sitemap( $atts ){



	$param = shortcode_atts( array(

        'exclude' => '',

        'exclude_type' => '',

    ), $atts );

    

    array_map("htmlspecialchars",$param );

	//set excluded posts

    update_option('_html_sitemap_setting_mk_sitemap', $param );



	$return = "";

	$content = "";

	$before = '<div class="whs-wrap" style="clear: both;">';

	$after = "</div>";

	//input pages

	$post_type_page = get_post_type_object("page");

	$content .= '<h2>'.$post_type_page->labels->name.'</h2><ul>'.return_pages_mk_sitemap(). '</ul>';

	

	//get all post types

	$post_types = feed_post_types_mk_sitemap();

	foreach ($post_types as $type) {



		$ct = wp_count_posts( $type );



		if ( $ct->publish > 0 ) { 

	

			$post_type_object = get_post_type_object($type);

			if ( !empty( $post_type_object->labels->name) ){

				$name =  $post_type_object->labels->name;

			}	else {

				$name = ucfirst( $type );

			}



			//feed in custom post types

			$content .= '<h2>'.$name.'</h2><ul>'.return_post_type_posts_mk_sitemap($type).'</ul>';



		}	

			

	}



	$result = $before . $content . $after;



return $result;

}



/**

 * Create Attachment List

 * @since 1.03

 * @param none

 * @return string

 */



function create_attachment_shortcode_mk_sitemap(){

    

	$return = "";

	$content = "";

	$before = '<div class="whs-wrap" style="clear: both;">';

	$after = "</div>";



	foreach (array('attachment' => 'attachment') as $type) {



		$ct = wp_count_posts( 'attachment' );

		$post_type_object = get_post_type_object('attachment');

				

		if ( !empty( $post_type_object->labels->name) ){

			$name =  $post_type_object->labels->name;

		}	else {

			$name = ucfirst( $type );

		}



		//feed in custom post types

		$content .= '<h2>'.$name.'</h2><ul>'.return_post_type_posts_mk_sitemap('attachment').'</ul>';

		

	}



	$result = $before . $content . $after;



return $result;

}



//create shortcodes for the sitemap

add_shortcode( 'mk-sitemap', 'create_shortcode_mk_sitemap' );

add_shortcode( 'mk-attachment-sitemap', 'create_attachment_shortcode_mk_sitemap' );