/* eslint-disable func-names */
import { TOGGLE_TODO, GET_FLATS, SET_FLATS } from './_action-types';
import { getListOfFlats } from '../server-requests/get-data';


export const setFlats = city => ({
  type: GET_FLATS,
  payload: { city },
});

export const getFlats = (quantity, city, page) => function (dispatch) {
  console.log("2");
  return getListOfFlats(quantity, city, page)
    .then(
      res => res.json(),
      //  res => console.log('ass'),
    )
    .then(
      (res) => {
        console.log(res.response.listings);
        console.log(res.response.locations);
        dispatch(setFlats(res));
      },
    )
    .catch(
      err => console.log(err),
    );
};


// export const createNewTaskFullCycle = (newTaskTitle) => {  //++
//   return function (dispatch, getState) {

//       dispatch(setIsLoadingValue(true));
//       dispatch(setOperationCounter(1));

//       return createTask(newTaskTitle, getState().get("widgetId"))
//           .then(
//               data => {
//                   const newTask = {
//                       title: data.task.title,
//                       isDone: data.task.done,
//                       id: data.task.id,
//                       isWaiting: false,
//                       isInEditMode: false,
//                   };
//                   dispatch(putTask(newTask));
//                   dispatch(setOperationCounter(-1));

//                   if (getState().get("operationsCounter") === 0) {
//                       dispatch(setIsLoadingValue(false));
//                   }
//               },
//               error => {
//                   (console.log("Error on sending new task"));
//                   if (getState().get("operationsCounter") === 0) {
//                       dispatch(setIsLoadingValue(false));
//                   }
//               }
//           );
//   };
// };


// function makeASandwichWithSecretSauce(forPerson) {

//     // Invert control!
//     // Return a function that accepts `dispatch` so we can dispatch later.
//     // Thunk middleware knows how to turn thunk async actions into actions.

//     return function (dispatch) {
//       return fetchSecretSauce().then(
//         sauce => dispatch(makeASandwich(forPerson, sauce)),
//         error => dispatch(apologize('The Sandwich Shop', forPerson, error))
//       );
//     };
//   }


// function makeASandwich(forPerson, secretSauce) {
//     return {
//       type: 'MAKE_SANDWICH',
//       forPerson,
//       secretSauce
//     };
//   }
