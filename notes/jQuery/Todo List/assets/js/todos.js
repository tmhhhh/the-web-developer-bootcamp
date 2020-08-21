// Check off Specific Todos By Clicking
// the first time the code runs will add a listener to ul
// when click the li inside of the ul run the function
// if we add listener to li, it will only add a listener to the exsiting lis
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

// Click on X to delete Todo
$("ul").on("click", "span", function(event){
	// fadeOut = display none
	// remove = none 
	// ($this):span $(this).parent():li
	$(this).parent().fadeOut(500, function(){
		// here this refers to the li
		$(this).remove();
	});
	// click on X = click on li
	// stop the next event function/
	event.stopPropagation(); 
});

$("input[type='text']").keypress(function(event) {
	if(event.which === 13) {
		// grabbing new todo text from input
		var todoText = $(this).val();
		// clear
		$(this).val("");
		// create a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});