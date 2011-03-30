$(document).ready(function() {
    $("body").click(function() {
        $("body").unbind('click');
        $("#splash").fadeOut(700, function() {
            
        });
    });
});