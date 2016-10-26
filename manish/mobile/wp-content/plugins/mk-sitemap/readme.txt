=== WeDesIn HTML Sitemap ===

Contributors: Josif201

Author: Josef Antos

Author URI: http://www.wedesin.cz/

Plugin URI: http://www.wedesin.cz/en/plugin/wedesin-html-sitemap/

Tags: sitemap, html sitemap, website sitemap

Requires at least: 4.0

Tested up to: 4.6.1

Stable tag: 4.6.1

License: GPLv2 or later

License URI: http://www.gnu.org/licenses/gpl-2.0.html



WeDesIn HTML Sitemap adds list of all the pages, posts and custom post types to any webpage using a shortcode [mk-sitemap]. To list attachments use the [mk-attachment-sitemap] shortcode.



== Description ==



WeDesIn HTML Sitemap adds list of all the pages, posts and custom post types to any webpage using the shortcode [mk-sitemap]. This is a very simple plugin without any settings page. The idea behind the plugin is that you add the shortcode to your page, exclude any posts you don't want included and that is it.



Note: Only public custom post types are included.



To exclude a post or posts from the sitemap, use the "exclude" parameter with a post ID as a value and comma to separate them.



Example: [mk-sitemap exclude="42, 503"]



To exclude post types, use the “exclude_type” parameter with a post ID as a value and comma to separate them.



Example: [mk-sitemap exclude_type=”book, product”]



Since 1.03 

Now the plugin has the option to list all attachments. To do so, use the [attachment-sitemap] shortcode. It is not possible to use the "exclude" attribute with this shortcode. 



Note: It is not possible to exclude pages.



Note 2: No styling is added to the code apart from style="clear: both;" and the "whs-wrap" class wrapping the list of posts and pages. You can use this class if you wish to style the sitemap specifically.



== Installation ==



This section describes how to install the plugin and get it working.



e.g.



1. Upload the plugin files to the `/wp-content/plugins/wedesin-html-sitemap` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress

3. Add the [mk-sitemap] shortcode to the page where you want to display your sitemap

4. If required, exclude posts by adding the exclude="xyz" parameter and the "xyz" change for your posts ID. To exclude more posts separate them by comma.



== Frequently Asked Questions ==



= Where is the settings page? =



There is no settings page.



== Changelog ==



= 1.03 (2016-10-27) =

Added the option to add Attachement list with the [attachment-sitemap] shortode. 

The return_post_type_posts_WHS_wedesin function updated to feed the attachments.

Posts are now listed by date.

Fixed bug in the options_to_array_WHS_wedesin function.



= 1.02 (2016-09-12) =

Added the option to exclude post types.



= 1.01 (2016-07-31) =

Class updated to whs-wrap.



= 1.0 (2016-07-31) =

Plugin published