/* eslint-disable no-undef */
export function getListOfFlats(flatsQuantity, flatsLocation) {
  // console.log('4');
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name=${flatsLocation}&number_of_results=${flatsQuantity}`,
    {
      method: 'GET',
      mode: 'cors',

    });
  // .then(
  //   res => res.json(),
  // )
  // .then(
  //   (res) => {
  //     console.log(res.response.listings);
  //     console.log(res.response.locations);
  //   },
  // )
  // .catch(
  //   err => console.log(err),
  // );
}
