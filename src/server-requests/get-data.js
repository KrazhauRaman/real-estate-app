/* eslint-disable no-undef */
export function getListOfFlats(quantity, city, page) {
  return fetch(`https://cors.io/?https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name=${city}&number_of_results=${quantity}&page=${page}`,
    {
      method: 'GET',
      mode: 'cors',
    });
}
