// Select all menu links in the sidebar
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li > a');

// Get the current URL from the window's location
const currentUrl = window.location.pathname.split('/').pop();
console.log("currentUrl:", currentUrl);

// Loop through each sidebar link to set the active state based on the current URL
allSideMenu.forEach(item => {
    const li = item.parentElement;

    // Extract the last part of the link's href for comparison
    const linkUrl = item.getAttribute('href').split('/').pop();
    console.log("linkUrl:", linkUrl);

    // Check if the link's last part matches the current URL's last part
    if (currentUrl === linkUrl) {
        li.classList.add('active');

        // Show the dropdown if it has options
        const options = li.querySelector('.options');
        if (options) {
            options.classList.add('show');
            options.style.maxHeight = options.scrollHeight + 'px'; // Expand to fit content
            options.style.opacity = '1'; // Fade in the dropdown
        }

        // Ensure the main link is expanded
        const mainLink = li.querySelector('.menu-link');
        if (mainLink) {
            mainLink.setAttribute('aria-expanded', 'true');
        }
    }

    // Check if the link is within an options menu and handle accordingly
    const options = li.querySelector('.options');
    if (options) {
        options.querySelectorAll('a').forEach(option => {
            const optionUrl = option.getAttribute('href').split('/').pop();
            // If the current URL matches any option's URL, set the option to active
            if (currentUrl === optionUrl) {
                option.classList.add('active');
                li.classList.add('active'); // Keep the parent li active
                options.classList.add('show'); // Ensure options are shown
                options.style.maxHeight = options.scrollHeight + 'px'; // Expand to fit content
                options.style.opacity = '1'; // Fade in the dropdown
            }
        });
    }

    // Add click event listener for dropdown behavior
    item.addEventListener('click', function (event) {
        const options = li.querySelector('.options');

        // If options exist, toggle the dropdown
        if (options) {
            event.preventDefault(); // Prevent default behavior if there are options
            const isActive = li.classList.contains('active');

            // Close all dropdowns and remove active state
            allSideMenu.forEach(i => {
                const parentLi = i.parentElement;
                parentLi.classList.remove('active');
                const innerOptions = parentLi.querySelector('.options');
                if (innerOptions) {
                    innerOptions.classList.remove('show');
                    innerOptions.style.maxHeight = '0'; // Collapse the dropdown
                    innerOptions.style.opacity = '0'; // Fade out the dropdown
                }
            });

            // If the clicked item was not active, activate it and show its dropdown
            if (!isActive) {
                li.classList.add('active');
                options.classList.add('show');
                options.style.maxHeight = options.scrollHeight + 'px'; // Expand to fit content
                options.style.opacity = '1'; // Fade in the dropdown
            }
        }
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
});

// Search functionality
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if (window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if (searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
});

// Responsive sidebar and search behavior
if (window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if (this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
});

