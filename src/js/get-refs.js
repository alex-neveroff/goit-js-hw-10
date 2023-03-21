export default function getRefs() {
  return {
    formInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    placeholder: 'Please, enter name of country',
  };
}
