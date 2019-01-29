// import { ADD_TODO } from './_action-types';

// const initialState = {
//   allIds: [],
//   byIds: {},
// };

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case ADD_TODO: {
//       const { id, content } = action.payload;
//       return {
//         ...state,
//         allIds: [...state.allIds, id],
//         byIds: {
//           ...state.byIds,
//           [id]: {
//             content,
//             completed: false,
//           },
//         },
//       };
//     }

//     default:
//       return state;
//   }
// }
