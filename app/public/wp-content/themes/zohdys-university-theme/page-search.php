<?php
get_header();

while(have_posts()){
	the_post();
	pageBanner(array(
		'title' => 'Search',
		'photo' => 'https://images3.alphacoders.com/853/85305.jpg'
	));
	?>

	<div class="container container--narrow page-section">

		<?php
		$parentID = wp_get_post_parent_id(get_the_ID());
		if($parentID){ ?>
			<div class="metabox metabox--position-up metabox--with-home-link">
				<p><a class="metabox__blog-home-link" href="<?php echo get_permalink($parentID); ?>"><i class="fa fa-home" aria-hidden="true"></i>
						<?php echo get_the_title($parentID); ?>
					</a> <span class="metabox__main"><?php the_title(); ?></span></p>
			</div>
		<?php }
		?>

		<?php
		$isParent = get_pages(array(
			'child_of' => get_the_ID()
		));
		if($parentID or $isParent) { ?>
			<div class="page-links">
				<h2 class="page-links__title"><a href="<?php echo get_permalink($parentID); ?>"><?php echo get_the_title($parentID) ?></a></h2>
				<ul class="min-list">
					<?php
					if($parentID){
						$findChildrenOf = $parentID;
					} else {
						$findChildrenOf = get_the_ID();
					}
					wp_list_pages(array(
						'title_li' => NULL,
						'child_of' => $findChildrenOf,
						'sort_column' => 'menu-order'

					));
					?>
				</ul>
			</div>
		<?php } ?>

		<div class="generic-content">
			<?php get_search_form(); ?>
		</div>

	</div>

	<?php
}
get_footer();
?>
