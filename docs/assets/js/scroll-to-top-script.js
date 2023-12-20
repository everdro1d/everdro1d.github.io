document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scrollToTopButton");
    let lastScrollTop = 0;
    const navBarOffset = 75;
    let isVisible = false; // Flag to track button visibility
    let isHovered = false; // Flag to track button hover state
    let timeoutId; // Variable to store the setTimeout ID
    const timoutLengthMS = 2000;

    function showButton() {
        scrollToTopButton.classList.add("show");
        isVisible = true;
        clearTimeout(timeoutId);
    }

    function hideButton() {
        if (!isHovered) {
            scrollToTopButton.classList.remove("show");
            isVisible = false;
        }
    }

    // Show or hide the button based on scroll direction and position
    window.onscroll = function () {
        const currentScrollTop = Math.round(window.scrollY) || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop || currentScrollTop <= navBarOffset) {
            // Scrolling down
            hideButton();
        } else {
            // Scrolling up
            if (currentScrollTop > navBarOffset) {
                showButton();
                // Set a timeout to hide the button after 3 seconds
                timeoutId = setTimeout(hideButton, timoutLengthMS);
            }
        }

        lastScrollTop = currentScrollTop;
    };

    // Scroll to the top when the button is clicked, and reset the timeout
    scrollToTopButton.addEventListener("click", function () {
        hideButton();
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });

    // Handle hover state
    scrollToTopButton.addEventListener("mouseenter", function () {
        isHovered = true;
    });

    scrollToTopButton.addEventListener("mouseleave", function () {
        isHovered = false;
        // If not visible, start the timeout to hide the button
        if (isVisible) {
            timeoutId = setTimeout(hideButton, 3000);
        }
    });

    // Set an initial timeout to hide the button after 3 seconds
    timeoutId = setTimeout(hideButton, timoutLengthMS);
});
