var Message = (function() {
    return {
        hide: function(cb) {
            $(document).unbind('click');
            $("#splash").fadeOut(300, cb);
        },
        set: function(html) {
            $("#splash").html(html);
        },
        show: function(html, cb, clickDismiss) {
            if (html) Message.set(html);
            if (clickDismiss) {
                $(document).click(function() {
                    Message.hide(cb);
                });
            }
            $("#splash").fadeIn(300);
        }
    };
})();


$(document).ready(function() {
    Message.show(
        $('<p>This is a little tiny <a href="https://apps.mozillalabs.com">open web application</a>: it can ' +
          'store photos for you.  Once you install the app, other sites that produce photos (like the ' + 
          '<a href="https://photobooth.mozillalabs.com">Photo Booth</a>) will be able to store images ' +
          'here.</p><p>' +
          'Click anywhere to begin.</p>'),
        function() {
            navigator.apps.amInstalled(function(r) {
                if (r) {
                    alert("you're installed!");
                } else {
                    var html = $("<p><strong>Step 1:</strong>  You should <a href='#'>click here</a> to install this site into your " +
                                 "browser.</p>");
                    html.find("a").click(function(ev) {
                        ev.preventDefault();
                        Message.hide(function() {
                            navigator.apps.install(
                                {
                                    url: "/manifest.webapp",
                                    onsuccess: function (rv) {
                                        console.log("awesome");
                                    },
                                    onerror: function (errObj) {
                                        var html = $("<p><strong class='sucks'>DAMN!</strong>  Something went horribly wrong [" +
                                                     errObj.code + "]: " + errObj.message + "</p>");
                                        Message.show(html, undefined, true);
                                    }
                                }
                            );
                        });
                        return false;
                    });
                    Message.show(html);
                }
            });
        },
        true
    );
});
