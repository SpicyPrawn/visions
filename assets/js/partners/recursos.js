// Function to open the modal with the enlarged image or video
function openModal(mediaUrl) {
    const extension = mediaUrl.split('.').pop().toLowerCase();
    const modalContent = document.getElementById("modalContent");
    const downloadButton = document.getElementById("downloadButton");

    // Clear existing content
    modalContent.innerHTML = '<button id="closeModal" onclick="closeModal()">&times;</button>';
    
    if (extension === 'mp4') {
        const video = document.createElement("video");
        video.src = mediaUrl;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = "100%";
        video.style.maxHeight = "100%";
        modalContent.appendChild(video);
    } else {
        const img = document.createElement("img");
        img.src = mediaUrl;
        img.alt = "Enlarged Resource";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        modalContent.appendChild(img);
    }

    downloadButton.href = mediaUrl;
    modalContent.appendChild(downloadButton);
    
    document.getElementById("imageModal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

document.getElementById("resourceContainers").addEventListener("click", function(event) {
    const clickedElement = event.target.closest('.thumbnail'); // Finds the closest .thumbnail element
    if (clickedElement && clickedElement.getAttribute("data-media-url")) {
        const mediaUrl = clickedElement.getAttribute("data-media-url");
        openModal(mediaUrl);
    }
});


//asd
function updateBanners(containerId, banners) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing thumbnails for the selected language

    banners.forEach(bannerUrl => {
        const extension = bannerUrl.split('.').pop().toLowerCase();
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'thumbnail';
        thumbnailDiv.setAttribute("data-media-url", bannerUrl);

        thumbnailDiv.onclick = () => openModal(bannerUrl);

        if (extension === 'mp4') {
            const img = document.createElement('img');
            img.src = 'assets/images/videoplaceholder.jpg';
            img.alt = 'Video Placeholder';
            const playIcon = document.createElement('div');
            playIcon.className = 'play-icon-overlay';
            playIcon.textContent = '▶';
            thumbnailDiv.appendChild(img);
            thumbnailDiv.appendChild(playIcon);
        } else {
            const img = document.createElement('img');
            img.src = bannerUrl;
            img.alt = 'Resource Thumbnail';
            thumbnailDiv.appendChild(img);
        }

        container.appendChild(thumbnailDiv);
    });
}

// Usage in the language selection event handler
document.getElementById("languageSelect").addEventListener("change", function() {
    const language = this.value;


    fetch(`partners/load_banners/${language}`)
        .then(response => response.json())
        .then(data => {
            // Access banners within the "data" wrapper from the server response
            if (data.data.banners1080x1920) updateBanners('grid1080x1920', data.data.banners1080x1920);
            if (data.data.banners1080x1080) updateBanners('grid1080x1080', data.data.banners1080x1080);
            if (data.data.banners600x600) updateBanners('grid600x600', data.data.banners600x600);
        })
        .catch(error => console.error('Error fetching banners:', error));
});

