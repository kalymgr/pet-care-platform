/**
 * Created by kalymgr on 3/1/2020.
 */


$(document).ready(function(){

    /**
     * Actions happening when selecting shelter or petowner radio boxes
     */
    $("#shelterOrPetOwner").click(function(){
        // if shelter is selected, enable the form field about the shelter name, else disable
        //TODO: complete the function content

    });


    /**
     * Code for the home page carousel button
     */
    // start the carousel, setting each slide duration
    $("#homePageCarousel").carousel({
        interval: 5000
    });

    // set the carousel button functionality
    $("#carouselButton").click(function() {
        if ($("#carouselButton").children("span").hasClass("fa-pause")) {
            // Case the carousel button shows the pause icon.
            // Pause the carousel and change the icon
            $("#homePageCarousel").carousel("pause");
            $("#carouselButton").children("span").removeClass("fa-pause");
            $("#carouselButton").children("span").addClass("fa-play");
        }
        else if ($("#carouselButton").children("span").hasClass("fa-play")) {
            // Case the carousel button shows the play icon
            // Play the carousel and change the icon
            $("#homePageCarousel").carousel("cycle");
            $("#carouselButton").children("span").removeClass("fa-play");
            $("#carouselButton").children("span").addClass("fa-pause");
        }
    })

    /**
     * Code for login button
     */
    $("#loginButton").click(function() {
        $("#loginModal").modal("toggle");
    })


})
