const loadPhone = async (searchText, isShowAll = false) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    console.log(phones);
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent text-white font-bold">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <figure class="px-10 pt-10 flex justify-center">
            <img src="${phone.image}" alt="Phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title font-bold text-3xl">${phone.name}</h2>
            <h2 class=""><b>Storage:</b> ${phone.mainFeatures?.storage || 'N/A'}</h2>
            <h2 class=""><b>Display Size:</b>${phone.mainFeatures?.displaySize || 'N/A'}</h2>
            <h2 class=""><b>Chipset:</b>${phone.mainFeatures?.chipSet || 'N/A'}</h2>
            <h2 class=""><b>Memory:</b>${phone.mainFeatures?.memory || 'N/A'}</h2>
            <h2 class=""><b>Sensors:</b>${phone.mainFeatures?.sensors?.join(', ') || 'N/A'}</h2>
            <h2 class=""><b>Release Date:</b> ${phone.releaseDate || 'N/A'}</h2>
        </div>
    `;

    show_details_modal.showModal();
}

const handleSearch = (isShowAll = false) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-filed');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

// Initial load (you can remove this or keep it as per your need)
loadPhone('iphone');
