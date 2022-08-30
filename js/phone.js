const loadPhones = async (searchText, dataLimit) => {
    // Phone Api Section
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // Show Only 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none')
    }

    const noPhoneFound = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }

    // Display All Phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                <button onclick ="getPhoneDetails('${phone.slug}')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // Stop Loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// Handle Search Button Click
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
})
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});
// Loader section
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}
// Not The Best Way to load Show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const getPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitel = document.getElementById('phoneDetailModalLabel');
    modalTitel.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="w-50 mx-auto">
            <img src = "${phone.image}">;
        </div>
        <p class="my-3">Brand: ${phone.brand ? phone.brand : 'No brand'}</p>
        <p class="my-3">Realese Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p class="my-3">Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'None'}</p>
        <p class="my-3">Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'None'}</p>
        <p class="my-3">Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'None'}</p>
        <p class="my-3">Bluttoth: ${phone.others ? phone.others.Bluetooth : 'None'}</p>
        <p class="my-3">GPS: ${phone.others ? phone.others.GPS : 'None'}</p>
        <p class="my-3">NFC: ${phone.others ? phone.others.NFC : 'None'}</p>
        <p class="my-3">USB: ${phone.others ? phone.others.USB : 'None'}</p>
        <p class="my-3">WLAN: ${phone.others ? phone.others.WLAN : 'None'}</p>
    `
}
// loadPhones('');