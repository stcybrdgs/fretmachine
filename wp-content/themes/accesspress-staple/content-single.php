<?php
/**
 * @package AccessPress Staple
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="main-title"><span>', '</span></h1>' ); ?>
		<div class="entry-meta">
			<?php accesspress_staple_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
        <?php the_post_thumbnail(); ?>
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'accesspress-staple' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php accesspress_staple_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->