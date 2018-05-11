jQuery(document).ready(function($) {
	firebase.database().ref("lojas")
  .on("value", function(lojas){
});