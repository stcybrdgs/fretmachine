(function ($) {
    $(function () {
        $('.apccss-top-button').click(function(){
            $('body').animate({
                scrollTop:0
            },200);
        });

	    $( '.apccss-tabs-trigger' ).click(function(){
		    $( '.apccss-tabs-trigger' ).parent().removeClass( 'apccss-active-tab' );
		    $(this).parent().addClass( 'apccss-active-tab' );
		    var board_id = 'tab-'+$(this).attr('id');
		    $('.apccss-tab-contents').hide();
		    $('#'+board_id).show();
	   	});
       
        });
}(jQuery));