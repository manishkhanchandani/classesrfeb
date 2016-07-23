<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://horo.wc5.org
 * @since      1.0.0
 *
 * @package    Mktest2
 * @subpackage Mktest2/admin/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="wrap">

    <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
    <form method="post" name="cleanup_options" action="options.php">
        <!-- remove some meta and generators from the <head> -->
        <?php
            //Grab all options
                $options = get_option($this->plugin_name);

            // Cleanup
            $field1 = $options['field1'];
            $field2 = $options['field2'];
        ?>

        <?php
            settings_fields($this->plugin_name);
            do_settings_sections($this->plugin_name);
        ?>
        <fieldset>
            <legend class="screen-reader-text">
                <span>Field 1</span>
            </legend>
            <label for="<?php echo $this->plugin_name; ?>-field1">
                <input type="checkbox" id="<?php echo $this->plugin_name; ?>-field1" name="<?php echo $this->plugin_name; ?>[field1]" value="1" <?php checked($field1, 1); ?> />
                <span><?php esc_attr_e('Field 1', $this->plugin_name); ?></span>
            </label>
        </fieldset>
        <fieldset>
            <legend class="screen-reader-text">
                <span>Field 2</span>
            </legend>
            <label for="<?php echo $this->plugin_name; ?>-field2">
                <span><?php esc_attr_e('Field 2', $this->plugin_name); ?></span><br>
                <input type="text" id="<?php echo $this->plugin_name; ?>-field2" name="<?php echo $this->plugin_name; ?>[field2]" value="<?php echo $field2; ?>" />
                
            </label>
        </fieldset>
        <?php submit_button('Save all changes', 'primary','submit', TRUE); ?>
    </form>
</div>