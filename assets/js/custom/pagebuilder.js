(function($){
	
	jQuery.noConflict(); 
	
	var styleArr = [
		{type:'column', value: 'hide-mobile', label: 'Hide Mobile'},
		{type:'column', value: 'vertical-align', label: 'Vertical Align'},		
		{type:'column', value: 'text-white', label: 'White Text'},
		{type:'both', value: 'border-bottom', label: 'Border Bottom'},
		{type:'column', value: 'fade-up', label: 'Vertical Align'},
		{type:'column', value: 'fade-up', label: 'Fade Up'},
		{type:'column', value: 'fade-right', label: 'Fade Right'},
		{type:'column', value: 'fade-left', label: 'Fade Left'},
		{type:'column', value: 'fade-down', label: 'Fade Down'},
		{type:'section', value: 'no-fade', label: 'No Fade'},
		{type:'section', value: 'lg-pad', label: 'Large Padding'},
		{type:'section', value: 'grey-bg', label: 'Grey BG'},
		{type:'section', value: 'parallax', label: 'Parallax'},
	],
	$columnstyles = '',
	$sectionstyles = '';
	
	styleArr.forEach(function (arrayItem) {
		if(arrayItem.type == 'column') {
			$columnstyles = $columnstyles + '<li><input type="checkbox" value="'+arrayItem.value+'"><label for="'+arrayItem.value+'">'+arrayItem.label+'</label></li>';
		} else if(arrayItem.type == 'both') {
			$columnstyles = $columnstyles + '<li><input type="checkbox" value="'+arrayItem.value+'"><label for="'+arrayItem.value+'">'+arrayItem.label+'</label></li>';
			$sectionstyles = $sectionstyles + '<li><input type="checkbox" value="'+arrayItem.value+'"><label for="'+arrayItem.value+'">'+arrayItem.label+'</label></li>';
		} else {
			$sectionstyles = $sectionstyles + '<li><input type="checkbox" value="'+arrayItem.value+'"><label for="'+arrayItem.value+'">'+arrayItem.label+'</label></li>';
		}
		//console.log("Type: "+arrayItem.type+" Value: "+arrayItem.value+ " Label: "+ arrayItem.label);
	});
	
	var $classdiv = '<div class="white-popup mfp-hide" id="page-builder-popup" data-id="" data-scrollpos=""><form name="page-builder-popup-form" id="page-builder-popup-form"><div class="container page-builder-form-container"><div class="row"><div class="col-12 col-sm-6 col-md-3 mb-4 hide-on-sections"><h3>Column width</h3><p class="mb-0 mt-3">Width</p><select class="custom-select" name="size-xs"><option selected value="col-12">12/12</option><option value="col-11">11/12</option><option value="col-10">10/12</option><option value="col-9">9/12</option><option value="col-8">8/12</option><option value="col-7">7/12</option><option value="col-6">6/12</option><option value="col-5">5/12</option><option value="col-4">4/12</option><option value="col-3">3/12</option><option value="col-2">2/12</option><option value="col-1">1/12</option></select><p class="mb-0 mt-3">Sm Width <span class="small">(576px)</span></p><select class="custom-select" name="size-sm"><option value="">-- none --</option><option value="col-sm-12">12/12</option><option value="col-sm-11">11/12</option><option value="col-sm-10">10/12</option><option value="col-sm-9">9/12</option><option value="col-sm-8">8/12</option><option value="col-sm-7">7/12</option><option value="col-sm-6">6/12</option><option value="col-sm-5">5/12</option><option value="col-sm-4">4/12</option><option value="col-sm-3">3/12</option><option value="col-sm-2">2/12</option><option value="col-sm-1">1/12</option></select><p class="mb-0 mt-3">Md Width <span class="small">(768px)</span></p><select class="custom-select" name="size-md"><option value="">-- none --</option><option value="col-md-12">12/12</option><option value="col-md-11">11/12</option><option value="col-md-10">10/12</option><option value="col-md-9">9/12</option><option value="col-md-8">8/12</option><option value="col-md-7">7/12</option><option value="col-md-6">6/12</option><option value="col-md-5">5/12</option><option value="col-md-4">4/12</option><option value="col-md-3">3/12</option><option value="col-md-2">2/12</option><option value="col-md-1">1/12</option></select><p class="mb-0 mt-3">Lg Width <span class="small">(992px)</span></p><select class="custom-select" name="size-lg"><option value="">-- none --</option><option value="col-lg-12">12/12</option><option value="col-lg-11">11/12</option><option value="col-lg-10">10/12</option><option value="col-lg-9">9/12</option><option value="col-lg-8">8/12</option><option value="col-lg-7">7/12</option><option value="col-lg-6">6/12</option><option value="col-lg-5">5/12</option><option value="col-lg-4">4/12</option><option value="col-lg-3">3/12</option><option value="col-lg-2">2/12</option><option value="col-lg-1">1/12</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3>Column Offsets</h3><p class="mb-0 mt-3">Offset</p><select class="custom-select" name="offset-xs"><option value="">-- none --</option><option value="offset-1">1</option><option value="offset-2">2</option><option value="offset-3">3</option><option value="offset-4">4</option><option value="offset-5">5</option><option value="offset-6">6</option><option value="offset-7">7</option><option value="offset-8">8</option><option value="offset-9">9</option><option value="offset-10">10</option><option value="offset-11">11</option></select><p class="mb-0 mt-3">Sm Offset <span class="small">(576px)</span></p><select class="custom-select" name="offset-sm"><option value="">-- none --</option><option value="offset-sm-1">1</option><option value="offset-sm-2">2</option><option value="offset-sm-3">3</option><option value="offset-sm-4">4</option><option value="offset-sm-5">5</option><option value="offset-sm-6">6</option><option value="offset-sm-7">7</option><option value="offset-sm-8">8</option><option value="offset-sm-9">9</option><option value="offset-sm-10">10</option><option value="offset-sm-11">11</option></select><p class="mb-0 mt-3">Md Offset <span class="small">(768px)</span></p><select class="custom-select" name="md"><option value="">-- none --</option><option value="offset-md-1">1</option><option value="offset-md-2">2</option><option value="offset-md-3">3</option><option value="offset-md-4">4</option><option value="offset-md-5">5</option><option value="offset-md-6">6</option><option value="offset-md-7">7</option><option value="offset-md-8">8</option><option value="offset-md-9">9</option><option value="offset-md-10">10</option><option value="offset-md-11">11</option></select><p class="mb-0 mt-3">Lg Offset <span class="small">(992px)</span></p><select class="custom-select" name="offset-lg"><option value="">-- none --</option><option value="offset-lg-1">1</option><option value="offset-lg-2">2</option><option value="offset-lg-3">3</option><option value="offset-lg-4">4</option><option value="offset-lg-5">5</option><option value="offset-lg-6">6</option><option value="offset-lg-7">7</option><option value="offset-lg-8">8</option><option value="offset-lg-9">9</option><option value="offset-lg-10">10</option><option value="offset-lg-11">11</option></select></div><div class="col-12 col-sm-6 col-md-6 mb-4 show-sections"><h3>Formatting</h3><ul class="list-unstyled mb-0 mt-3">'+$sectionstyles+'</ul></div><div class="col-12 col-sm-6 col-md-6 mb-4 show-columns"><h3>Formatting</h3><ul class="list-unstyled mb-0 mt-3">'+$columnstyles+'</ul></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3>Top Margin</h3><p class="mb-0 mt-3">Top Marg</p><select class="custom-select" name="mt-xs"><option value="">-- none --</option><option value="mt-1">1</option><option value="mt-2">2</option><option value="mt-3">3</option><option value="mt-4">4</option><option value="mt-5">5</option></select><p class="mb-0 mt-3">Sm Top Marg <span class="small">(576px)</span></p><select class="custom-select" name="mt-sm"><option value="">-- none --</option><option value="mt-sm-1">1</option><option value="mt-sm-2">2</option><option value="mt-sm-3">3</option><option value="mt-sm-4">4</option><option value="mt-sm-5">5</option></select><p class="mb-0 mt-3">Md Top Marg <span class="small">(768px)</span></p><select class="custom-select" name="mt-md"><option value="">-- none --</option><option value="mt-md-1">1</option><option value="mt-md-2">2</option><option value="mt-md-3">3</option><option value="mt-md-4">4</option><option value="mt-md-5">5</option></select><p class="mb-0 mt-3">Lg Top Marg <span class="small">(992px)</span></p><select class="custom-select" name="mt-lg"><option value="">-- none --</option><option value="mt-lg-1">1</option><option value="mt-lg-2">2</option><option value="mt-lg-3">3</option><option value="mt-lg-4">4</option><option value="mt-lg-5">5</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3>Bottom Margin</h3><p class="mb-0 mt-3">Bot Marg</p><select class="custom-select" name="mb-xs"><option value="">-- none --</option><option value="mb-1">1</option><option value="mb-2">2</option><option value="mb-3">3</option><option value="mb-4">4</option><option value="mb-5">5</option></select><p class="mb-0 mt-3">Sm Bot Marg <span class="small">(576px)</span></p><select class="custom-select" name="mb-sm"><option value="">-- none --</option><option value="mb-sm-1">1</option><option value="mb-sm-2">2</option><option value="mb-sm-3">3</option><option value="mb-sm-4">4</option><option value="mb-sm-5">5</option></select><p class="mb-0 mt-3">Md Bot Marg <span class="small">(768px)</span></p><select class="custom-select" name="mb-md"><option value="">-- none --</option><option value="mb-md-1">1</option><option value="mb-md-2">2</option><option value="mb-md-3">3</option><option value="mb-md-4">4</option><option value="mb-md-5">5</option></select><p class="mb-0 mt-3">Lg Bot Marg <span class="small">(992px)</span></p><select class="custom-select" name="mb-lg"><option value="">-- none --</option><option value="mb-lg-1">1</option><option value="mb-lg-2">2</option><option value="mb-lg-3">3</option><option value="mb-lg-4">4</option><option value="mb-lg-5">5</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3>Top Padding</h3><p class="mb-0 mt-3">Top Pad</p><select class="custom-select" name="pt-xs"><option value="">-- none --</option><option value="pt-1">1</option><option value="pt-2">2</option><option value="pt-3">3</option><option value="pt-4">4</option><option value="pt-5">5</option></select><p class="mb-0 mt-3">Sm Top Pad <span class="small">(576px)</span></p><select class="custom-select" name="pt-sm"><option value="">-- none --</option><option value="pt-sm-1">1</option><option value="pt-sm-2">2</option><option value="pt-sm-3">3</option><option value="pt-sm-4">4</option><option value="pt-sm-5">5</option></select><p class="mb-0 mt-3">Md Top Pad <span class="small">(768px)</span></p><select class="custom-select" name="pt-md"><option value="">-- none --</option><option value="pt-md-1">1</option><option value="pt-md-2">2</option><option value="pt-md-3">3</option><option value="pt-md-4">4</option><option value="pt-md-5">5</option></select><p class="mb-0 mt-3">Lg Top Pad <span class="small">(992px)</span></p><select class="custom-select" name="pt-lg"><option value="">-- none --</option><option value="pt-lg-1">1</option><option value="pt-lg-2">2</option><option value="pt-lg-3">3</option><option value="pt-lg-4">4</option><option value="pt-lg-5">5</option></select></div><div class="col-12 col-sm-6 col-md-3 mb-4"><h3>Bottom Padding</h3><p class="mb-0 mt-3">Mobile BP</p><select class="custom-select" name="pb-xs"><option value="">-- none --</option><option value="pb-1">1</option><option value="pb-2">2</option><option value="pb-3">3</option><option value="pb-4">4</option><option value="pb-5">5</option></select><p class="mb-0 mt-3">Small BP <span class="small">(576px)</span></p><select class="custom-select" name="pb-sm"><option value="">-- none --</option><option value="pb-sm-1">1</option><option value="pb-sm-2">2</option><option value="pb-sm-3">3</option><option value="pb-sm-4">4</option><option value="pb-sm-5">5</option></select><p class="mb-0 mt-3">Medium BP <span class="small">(768px)</span></p><select class="custom-select" name="pb-md"><option value="">-- none --</option><option value="pb-md-1">1</option><option value="pb-md-2">2</option><option value="pb-md-3">3</option><option value="pb-md-4">4</option><option value="pb-md-5">5</option></select><p class="mb-0 mt-3">Large BP <span class="small">(992px)</span></p><select class="custom-select" name="pb-lg"><option value="">-- none --</option><option value="pb-lg-1">1</option><option value="pb-lg-2">2</option><option value="pb-lg-3">3</option><option value="pb-lg-4">4</option><option value="pb-lg-5">5</option></select></div></div><div class="row mt-3"><div class="col-12"><a href="#" class="btn btn-primary" id="submit-styles-btn">Apply Styles</a><a href="#" class="btn btn-outline-primary ml-3" id="reset-styles-btn">Reset</a></div></div></div></form></div>';
		
	
	var $window = jQuery(window),
		$fieldid,
		$scrollpos,
		$stylepopup = jQuery('#page-builder-popup'),
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

		//submitStyles();			
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
		jQuery('#'+$fieldid).closest('tr').removeClass().addClass('acf_row '+$styles);
		
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
		//submitStyles();
	}
	
	function addClasses() {
		jQuery('.page_section_class').each(function() {
			var $fieldid = jQuery(this).find('input').attr('id');
			jQuery(this).append('<a href="#page-builder-popup" class="btn btn-primary mt-2 open-popup-link section-class" id="btn-'+$fieldid+'">Add Classes</a>');
			
			var $colwidth = jQuery(this).find('input').val();
			jQuery(this).closest('tr').addClass($colwidth);
		});
		
		jQuery('.page_column_class').each(function() {
			var $fieldid = jQuery(this).find('input').attr('id');
			jQuery(this).append('<a href="#page-builder-popup" class="btn btn-primary mt-2 open-popup-link column-class" id="btn-'+$fieldid+'">Add Classes</a>');
			
			var $colwidth = jQuery(this).find('input').val();
			jQuery(this).closest('tr').addClass($colwidth);
		});
		
	}
	
	$window.load(function() {
		$window.trigger('scroll');
	});
	
	jQuery( document ).ready( function() {
		
		//jQuery('div[data-name="section_column"]').addClass('section_column');
		
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
		
		
		jQuery('.page_column_class input[type=text]').on('keydown', function(e) {
			if (e.which == 13) {
				e.preventDefault();
				var $val = jQuery(this).val();		
				jQuery(this).closest('tr').removeClass().addClass('acf_row '+$val);				
			}
		});
		
				
		$window.trigger('scroll');
		jQuery('#wpwrap').append($classdiv);		

	});	
	
})(jQuery);
