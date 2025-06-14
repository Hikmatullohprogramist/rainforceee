/***
Name: kfh-services.js
Date: May 11, 2017
Written by KFH: karshi.hasanov@utoronto.ca
Description: The function manipulate the dipslay of the Services Menu.
                    If the screen size gets smaller then 480 pixels, it will change the locacion
                    and size of the services items.
Requires:  The "kfh_services.css" file to work
***/

jQuery(document).ready(function() {

	jQuery(".kfh-trigger").click(function () {
		jQuery("#kfh-nav").slideToggle(400, function() {
			jQuery(this).toggleClass("kfh-expanded").css('display', ' ');
		});		
	});
	


  
  // On Windows resize
/*** 
  jQuery(window).resize(function() {
  if (jQuery(window).width()  < 480)  {
  		
       jQuery("#building_envelope").html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BUILDING ENVELOPE&nbsp;&nbsp;&nbsp; &nbsp;');
       jQuery("#balcony_restoration").html('&nbsp;&nbsp;&nbsp;BALCONY RESTORATION&nbsp;&nbsp');
       jQuery("#waterproofing").html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;WATERPROOFING &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
       jQuery("#emergency_services").html('&nbsp;&nbsp;&nbsp;EMERGENCY SERVICES&nbsp;&nbsp;&nbsp;&nbsp;');
       
    }
  else if (jQuery(window).width()  > 480)  {
       jQuery("#building_envelope").html('BUILDING ENVELOPE');
       jQuery("#balcony_restoration").html('BALCONY RESTORATION');	
       jQuery("#waterproofing").html('WATERPROOFING');	
       jQuery("#emergency_services").html('EMERGENCY SERVICES');
  }
});
***/
   });  // End Document Ready 
	


