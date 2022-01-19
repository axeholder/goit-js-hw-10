import './css/styles.css';
import fetchCountries from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
// fetchCountries(['japan',"ukraine",'canada','usa','france', 'austria','sweden', 'norway', 'england','italy', 'spain', 'moldova','poland']);

const input = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const cb = (event) => {
    listCountries.innerHTML = '';
    countryInfo.innerHTML = '';
    const inputValue = input.value.trim();

    if (inputValue === '') return;
    fetchCountries(inputValue)
        .then(data => {
            console.log(data);
            createMarkup(data);
        })
        .catch(error => {
            catchError(error);
        })
};

function catchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function createMarkup(countries) {
    if (countries.length === null) {
        return;
    } else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 2 && countries.length < 10) {
         const markup = countries
             .map((country) => {
                 console.log(country);
            return `<li class="list-item"><img src="${country.flags.svg}" width="50"> ${country.name.common}</li>`;
         })
        .join("");
        listCountries.innerHTML = markup;
    } else if (countries.length === 1) {
        const markup = countries
             .map((country) => {
                 console.log(country);
                 return `<span class="name"><img src="${country.flags.svg}" width="50"><b> ${country.name.common}</b></span>
                 <p><b>Capital:</b> ${country.capital}</p>
                 <p><b>Population:</b> ${country.population}</p>
                 <p><b>Languages:</b> ${Object.values(country.languages)}</p>
            `;
         })
            .join("");
        listCountries.innerHTML = '';
        countryInfo.innerHTML = markup;
    }
};

input.addEventListener('input', debounce(cb, DEBOUNCE_DELAY));