(function(){ 
	jQuery.noConflict();  
		
	
	var $window = jQuery(window),
		$fieldid,
		$scrollpos,
		$styletype;
	
	
	function loadStyles($stylestring) {
		var $styleArr = $stylestring.split(" ");			
		jQuery("#page-builder-popup-form option").each(function(){
			var $val = jQuery(this).val();
			if(jQuery.inArray( $val, $styleArr ) !== -1) {
				jQuery(this).prop('selected',true);
			} else {
				jQuery(this).prop('selected',false);
			}
		});

		jQuery("#page-builder-popup-form input[type=checkbox]").each(function(){
			var $val = jQuery(this).val();
			if(jQuery.inArray( $val, $styleArr ) !== -1) {
				jQuery(this).prop('checked',true);
			} else {
				jQuery(this).prop('checked',false);
			}
		});		
	}
	
	
	function submitStyles() {
		var $styles = '',
		$num = 0;
		jQuery("#page-builder-popup-form option:selected").each(function(){
			if (jQuery(this).val() != '') {
				if ($num == 0) {
					$styles = jQuery(this).val();
				} else {
					$styles = $styles + ' '+jQuery(this).val(); 
				}
				$num++;
			}
		});		

		jQuery('#page-builder-popup-form input:checked').each(function() {
			if (jQuery(this).val() != '') {
				$styles = $styles + ' '+jQuery(this).val();
			}
		});	
		
		if ($styles == '') {
			$styles = 'col-12';
		}
		if($styletype == 'section') {
			if ($styles.includes("col-12 ")) {
				$styles = $styles.split('col-12 ').pop();
			} else if($styles.includes("col-12")) {
				$styles = $styles.split('col-12').pop();
			}			
		}
		
		jQuery('#'+$fieldid).val($styles);		
		jQuery('#'+$fieldid).closest('tr').attr('data-bsacf', $styles);
		
		var magnificPopup = jQuery.magnificPopup.instance;		
		magnificPopup.close();
		$window.scrollTop($scrollpos);
		
		setTimeout(function(){ 
			$window.scrollTop($scrollpos); 
		}, 10);

	}
	
	
	function resetStyles() {
		jQuery("#page-builder-popup-form option:selected").each(function(){
			jQuery(this).prop('selected',false);
		});			
		jQuery('#page-builder-popup-form input:checkbox').removeAttr('checked');
	}
	
	function addClasses() {
		jQuery('.page_section_class').each(function() {
			var $fieldid = jQuery(this).find('input').attr('id');
			jQuery(this).append('<a href="#page-builder-popup" class="btn btn-primary mt-2 open-popup-link section-class" id="btn-'+$fieldid+'">Add Classes</a>');
			
			var $colwidth = jQuery(this).find('input').val();
			jQuery(this).closest('tr').attr('data-bsacf', $colwidth);
		});
		
		jQuery('.page_column_class').each(function() {
			var $fieldid = jQuery(this).find('input').attr('id');
			jQuery(this).append('<a href="#page-builder-popup" class="btn btn-primary mt-2 open-popup-link column-class" id="btn-'+$fieldid+'">Add Classes</a><a href="#" class="d-none ml-1 btn btn-outline-primary mt-2 apply-column-class" id="apply-'+$fieldid+'">Apply</a>');
			
			var $colwidth = jQuery(this).find('input').val();
			jQuery(this).closest('tr').attr('data-bsacf', $colwidth);
		});
	}
	
	$window.load(function() {
		$window.trigger('scroll');
	});

	
	jQuery( document ).ready( function() {
		
		addClasses();
		$window.trigger('scroll');
		
		jQuery(document).on('click', '#submit-styles-btn', function(e){
			e.preventDefault;
			submitStyles();
		});
		
		jQuery(document).on('click', '#reset-styles-btn', function(e){
			e.preventDefault;
			resetStyles();
		});

		jQuery(document).on('click', 'a.open-popup-link', function(e){
			e.preventDefault;
			
			var $linkid = e.target.id,
				$classes;			
			
			if (jQuery(e.target).hasClass('section-class')) {
				jQuery('#page-builder-popup').addClass('section-styles').removeClass('column-styles');
				$styletype = 'section';
			}  else {
				jQuery('#page-builder-popup').addClass('column-styles').removeClass('section-styles');
				$styletype = 'column';
			}
			
			$scrollpos = $window.scrollTop();			
			$fieldid = $linkid.split('btn-').pop();
			jQuery('#page-builder-popup').attr('data-id', $fieldid);
			$classes = jQuery('#'+$fieldid).val();
			loadStyles($classes);
			
			jQuery(this).magnificPopup({
				type:'inline',
				autoFocusLast:false
			}).magnificPopup('open');
		});
		
		jQuery(document).on('click', 'a.apply-column-class', function(e){
			e.preventDefault();
			var $linkid = e.target.id;
			$fieldid = $linkid.split('apply-').pop();			
			var $val = jQuery('#'+$fieldid).val();		
			jQuery(this).closest('tr').attr('data-bsacf', $val);
			jQuery(this).addClass('d-none');
		});
		
		jQuery(document).on('click', '.page_column_class input[type=text]', function(e){
			var $linkid = e.target.id;
			//if buttons exist
			if(jQuery('#apply-'+$linkid).length) {
				jQuery('#apply-'+$linkid).removeClass('d-none');
			} else {
				addClasses();
				jQuery('#apply-'+$linkid).removeClass('d-none');		
			}
		});
			
		$window.trigger('scroll');

	});	
	
})(jQuery);
