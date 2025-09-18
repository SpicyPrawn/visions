document.addEventListener("DOMContentLoaded", function() {

    loadContent('bagwin');


const languageElements = document.getElementsByClassName('generalLanguage');

Array.from(languageElements).forEach(element => {
    element.addEventListener('change', function() {

        // Get the closest form for the changed element
        const form = this.closest('form');
        if (!form) {
            console.error("No form found for the language selector");
            return;
        }

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Reload the page after a successful language change
                window.location.reload();
            } else {
                console.error('Language change failed');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});


    
    



    const sidebar = document.querySelector(".sidebar");
    const toggleIcon = document.getElementById("sidebarToggleIcon");

    // Sidebar toggle for mobile view
    toggleIcon.addEventListener("click", function() {
        sidebar.classList.toggle("visible");
        toggleIcon.classList.toggle("bx-menu");
        toggleIcon.classList.toggle("bx-menu-alt-right");
    });

    // Function to load content dynamically via AJAX
    function loadContent(path, script = null) {
        fetch(`partners/${path}`)
            .then(response => response.text())
            .then(data => {
                document.querySelector("#content").innerHTML = data;
    

                window.scrollTo(0, 0);
                setupNavRectangleLinks();

                // Load additional JavaScript if a script is specified
                if (script) {
                    loadScript(script);
                }
            })
            .catch(error => console.error('Error loading content:', error));
    }


    function setupNavRectangleLinks() {
        const navRectangles = document.querySelectorAll(".nav-rectangle");

        navRectangles.forEach(rectangle => {
            rectangle.addEventListener("click", function(event) {
                event.preventDefault();
                const path = this.getAttribute("data-path");

                // Use data-path to load content
                if (path) {
                    loadContent(path); // Load content dynamically based on data-path
                }
            });
        });
    }

    // Call this function after loading the initial content
    setupNavRectangleLinks();


    function loadScript(scriptName) {
        // Check if the script is already loaded to avoid duplicates
        if (!document.querySelector(`script[src="assets/js/partners/${scriptName}"]`)) {
            const script = document.createElement('script');
            script.src = `assets/js/partners/${scriptName}`;
            script.type = 'text/javascript';
            document.head.appendChild(script);
        }
    }

    

    // Function to collapse all submenus
    function collapseAllSubmenus() {
        const submenus = document.querySelectorAll(".submenu");
        submenus.forEach(submenu => {
            submenu.style.display = "none"; // Hide each submenu
            submenu.previousElementSibling.classList.remove("show_submenu");
        });
    }

    // Function to clear active states of main and sub menu items
    function clearActiveStates() {
        document.querySelectorAll(".nav_link").forEach(nav => nav.classList.remove("active"));
    }

    // Function to collapse the sidebar on mobile view
    function collapseSidebar() {
        if (window.innerWidth <= 768) { // Adjust width as needed for your mobile breakpoint
            sidebar.classList.remove("visible");
            toggleIcon.classList.add("bx-menu");
            toggleIcon.classList.remove("bx-menu-alt-right");
        }
    }

    // Handle submenu toggling
    const submenuItems = document.querySelectorAll(".submenu_item");
    submenuItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent triggering parent menu actions
            const submenu = this.nextElementSibling;

            // Collapse all other submenus first
            collapseAllSubmenus();

            // Toggle the selected submenu
            if (submenu && submenu.classList.contains("submenu")) {
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
                this.classList.toggle("show_submenu");

                // Set the active state for main item with submenus
                clearActiveStates();
                this.classList.add("active");

                // Collapse the sidebar if on mobile
                collapseSidebar();
            }
        });
    });

    // Handle main menu item selection (for single-level items only)
    const navLinks = document.querySelectorAll(".nav_link.single-level");
navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        clearActiveStates();
        this.classList.add("active");
        collapseAllSubmenus();

        // Load content and optional script
        const path = this.getAttribute("data-path");
        const script = this.getAttribute("data-script"); // Get script attribute
        if (path) {
            loadContent(path, script); // Pass script to loadContent
        }

        collapseSidebar();
    });
});

const subLinks = document.querySelectorAll(".sublink");
subLinks.forEach(sublink => {
    sublink.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        clearActiveStates();
        this.classList.add("active");

        const parentMainLink = this.closest(".submenu").previousElementSibling;
        parentMainLink.classList.add("active");

        // Load content and optional script
        const path = this.getAttribute("data-path");
        const script = this.getAttribute("data-script"); // Get script attribute
        if (path) {
            loadContent(path, script); // Pass script to loadContent
        }

        collapseSidebar();
    });
});
});
