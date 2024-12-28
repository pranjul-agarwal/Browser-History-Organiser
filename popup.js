document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
    const searchInput = document.getElementById('search');

    // Function to fetch and categorize history
    function fetchHistory() {
        chrome.history.search({ text: '', maxResults: 100 }, (data) => {
            const categorizedHistory = categorizeHistory(data);
            displayHistory(categorizedHistory);
        });
    }

    // Function to categorize history based on URL
    function categorizeHistory(historyItems) {
        const categories = {
            'Social Media': [],
            'News': [],
            'Shopping': [],
            'Job Portal': [],
            'Others': []
        };

        historyItems.forEach(item => {
            if (item.url.includes('facebook.com') || item.url.includes('twitter.com') || item.url.includes('linkedin.com') || item.url.includes('instagram.com') || item.url.includes('whatsapp.com') || item.url.includes('youtube.com') || item.url.includes('snapchat.com')) {
                categories['Social Media'].push(item);
            } else if (item.url.includes('ndtv.com') || item.url.includes('thehindu.com') || item.url.includes('indiatoday.com') || item.url.includes('timesofindia.com') || item.url.includes('hindustantimes.com') || item.url.includes('news18.com') || item.url.includes('indiatv.com') || item.url.includes('zeenews.com') || item.url.includes('aajtak.com') || item.url.includes('mint.com')) {
                categories['News'].push(item);
            } else if (item.url.includes('amazon.com') || item.url.includes('ebay.com') || item.url.includes('flipkart.com') || item.url.includes('shopsy.com') || item.url.includes('indiamart.com') || item.url.includes('meesho.com') || item.url.includes('snapdeal.com')) {
                categories['Shopping'].push(item);
            } else if (item.url.includes('cuvette.tech') || item.url.includes('naukri.com') || item.url.includes('hirist.com') || item.url.includes('indeed.com') || item.url.includes('foundit.com')) {
                categories['Job Portal'].push(item);
            } else {
                categories['Others'].push(item);
            }
        });

        return categories;
    }

    // Function to display categorized history
    function displayHistory(categorizedHistory) {
        historyList.innerHTML = '';
        for (const [category, items] of Object.entries(categorizedHistory)) {
            if (items.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.innerHTML = `<strong>${category}</strong>`;
                items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
                    categoryDiv.appendChild(itemDiv);
                });
                historyList.appendChild(categoryDiv);
            }
        }
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const historyItems = historyList.querySelectorAll('div > div');
        historyItems.forEach(item => {
            const title = item.innerText.toLowerCase();
            item.style.display = title.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Fetch history on load
    fetchHistory();
});