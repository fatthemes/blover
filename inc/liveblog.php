<?php
/**
 * Adding changes to Liveblog plugin.
 *
 * @package blover
 */

if ( ! function_exists( 'blover_liveblog_settings_array' ) ) :

function blover_liveblog_settings_array( $array ) {
	$title = esc_html( get_the_title( get_the_ID() ) );
	$array['new_update'] = $title . __( ': {number} new update' , 'kawowo-sports' );
	$array['new_updates'] = $title . __( ': {number} new updates' , 'kawowo-sports' );
	return $array;
}
add_filter( 'liveblog_settings', 'blover_liveblog_settings_array' );

endif;

if ( ! function_exists( 'blover_googl_api_key' ) ) :

function blover_googl_api_key( $api_key ) {
	$api_key = 'AIzaSyA5QcKno2ciW8FIwKLZH98Ym3PV3NyzpPA';
	return $api_key;
}
add_filter( 'googl_api_key', 'blover_googl_api_key' );

endif;

if ( ! function_exists( 'blover_entry_content' ) ) :

function blover_entry_content( $entry_id, $content ) {
	return new MBULiveblogSharing( $entry_id, $content );
}

endif;

if ( ! class_exists( 'MBULiveblogSharing' ) ) :

class MBULiveblogSharing {

		private $entry_id = null;
		private $content = null;
		private $post_id = null;
		private $title = null;
		private $googl = null;

		public function __construct( $entry_id, $content ) {
			$this->entry_id = $entry_id;
			$this->content = $content;
			$this->post_id = get_the_ID();
			$this->title = get_the_title( $this->post_id );
			$this->googl = get_post_meta( $this->post_id, '_liveblog_entry_googl_url_' . $this->entry_id, true );
			$this->add_meta();
			$this->html();
	  }

		private function add_meta() {
			if ( empty( $this->googl ) ) {
				$shorturl = $this->googl_shortlink();
				add_post_meta( get_the_ID(), '_liveblog_entry_googl_url_' . $this->entry_id, $shorturl );
			}
		}

		private function html() {
			$output = '';
			$output .= '<div class="liveblog-entry-text" data-original-content="' . esc_attr( $this->content ) . '">';
			$output .= $this->content;
			$output .= '</div>';
			$output .= '<div class="blover-jp-sharing"><div class="sharedaddy sd-sharing-enabled"><div class="robots-nocontent sd-block sd-social sd-social-icon sd-sharing"><div class="sd-content"><ul>';
			$output .= '<li class="share-facebook"><a rel="nofollow" class="share-facebook sd-button share-icon no-text" href="https://www.facebook.com/sharer/sharer.php?u=' . esc_url( $this->googl ) . '" target="_blank" title="Click to share on Facebook"><span></span><span class="sharing-screen-reader-text">Click to share on Facebook (Opens in new window)</span></a></li>';
			$output .= '<li class="share-twitter"><a rel="nofollow" class="share-twitter sd-button share-icon no-text" href="https://twitter.com/intent/tweet?text=' . esc_html( $this->title ) . '&url=' . esc_url( $this->googl ) . '" target="_blank" title="Click to share on Twitter"><span></span><span class="sharing-screen-reader-text">Click to share on Twitter (Opens in new window)</span></a></li>';
			$output .= '<li class="share-google-plus-1"><a rel="nofollow" class="share-google-plus-1 sd-button share-icon no-text" href="https://plus.google.com/share?url=' . esc_url( $this->googl ) . '" target="_blank" title="Click to share on Google+"><span></span><span class="sharing-screen-reader-text">Click to share on Google+ (Opens in new window)</span></a></li>';
			$output .= '<li class="share-jetpack-whatsapp"><a rel="nofollow" class="share-jetpack-whatsapp sd-button share-icon no-text" href="whatsapp://send?text=' . esc_html( $this->title ) . '&url=' . esc_url( $this->googl ) . '" target="_blank" title="Click to share on WhatsApp"><span></span><span class="sharing-screen-reader-text">Click to share on WhatsApp (Opens in new window)</span></a></li>';
			$output .= '<li class="share-end"></li>';
			$output .= '</ul></div></div></div></div>';
			echo $output;
		}

		private function googl_shortlink() {
		$permalink = get_permalink();
		$url = $permalink . '#liveblog-entry-' . absint( $this->entry_id );
		if ( ! function_exists( 'googl_shorten' ) ) {
		return $url;
		}
		$shorturl = googl_shorten( $url );
		return $shorturl;
		}
}

endif;
