// Load WOW.js on non-touch devices
var isPhoneDevice = "ontouchstart" in document.documentElement;
$(document).ready(function () {
    if (isPhoneDevice) {
    } else {
        wow = new WOW({
            offset: 50
        })
        wow.init();
    }
});

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 69)
                }, 500, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    //Close responsive menu when user scrolls away from navbar
    $(window).scroll(function () {
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').collapse('hide');
        }
    })


    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 70
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });

    // Activates floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    //Modal Information stored in an Object
    var portfolioInfo = {
        artisanDate: {
            title: 'Artisan Date',
            image: 'img/creative/artisan-modal.png',
            description: `<p>Artisan Date generates great date ideas with just a few touches of your fingertips.  The application provides a great variety of events, restaurants, and drink options to choose from so that your dates will never grow stale.</p><p>I was responsible for developing the frontend for Artisan Date using React and Redux.  My primary contribution to the app was the summary page and implementation of the Google Maps API using React.  In addition, I contributed to every page on the application whether it was writing Javascript, designing and styling each page, or making sure each page was fully mobile responsive.</p>`,
            links: ["http://www.artisandate.com", "https://github.com/wrongeric/Artisan-Date.git"]
        },
        surfsUp: {
            title: 'Surfs Up',
            image: 'img/creative/surfs-up-modal.png',
            description: `<p>Surfs Up is an application designed for the surfer enthusiast who wants to get the surf conditions at a local beach quickly and conveniently.  Our first version of the project was created during a 48 Hour Hackathon during which my primary contribution was implementing the Flickr API and creating the photo modal.</p><p>After the Hackathon, I took up the project lead role and continued working on the application to make it fully mobile responsive and dynamic in terms of the data that is displayed on the data results page.</p>`,
            links: ["http://surfsup.ericwong.us", "https://github.com/Fedrius/c12.17Hackathon2"]
        },
        mBoutique: {
            title: 'mBoutique',
            image: 'img/creative/mboutique-modal.png',
            description: `<p>MBoutique is a demo storefront website designed for those who love everything related to Macarons.</p><p>The site is developed and created in React and fully mobile responsive, and also utilizes React Router to route user to various pages.</p>`,
            links: ["http://mboutique.ericwong.us", "https://github.com/wrongeric/react_mboutique"]
        }
    }

    function presentModalInformation() {
        var projectInfo = $(this).closest('.portfolio-div').attr('data-title');
        var projectTitle = portfolioInfo[projectInfo].title;
        var projectDescription = portfolioInfo[projectInfo].description;
        var projectImage = portfolioInfo[projectInfo].image;
        var liveLink = portfolioInfo[projectInfo].links[0];
        var gitHubLink = portfolioInfo[projectInfo].links[1];
        $("#portfolioModal").find('.modal-title').text(projectTitle);
        $("#portfolioModal").find('.modal-body .description').html(projectDescription);
        $("#portfolioModal").find('.modal-body img').attr('src', projectImage);
        $("#portfolioModal").find('.modal-body .live').attr('href', liveLink);
        $("#portfolioModal").find('.modal-body .github').attr('href', gitHubLink);
        $('#portfolioModal').modal('show');
    }
    // Portfolio Modal Click Handler
    $('.portfolio-wrapper').on('click', presentModalInformation);

})(jQuery); // End of use strict
