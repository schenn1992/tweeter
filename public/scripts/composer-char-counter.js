$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charsLength = $(this).val().length;
    let output = $(this).parent().children().children(".counter");
    output.val(140 - charsLength);
    
    //if output is less than 0, change text color to red
    output.val() < 0 ? output.css("color", 'red'): output.css("color", 'black');
  });
});


