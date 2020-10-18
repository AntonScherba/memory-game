export const initialState = {
  column: 4,
  row: 4,
  isStart: false,
  tilesOnBoard: [],
  pairOpenedTiles: [],
  pairCounter: 0,
  isGameOver: false,
};

export default function (state, action) {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "START_GAME":
      return {
        ...state,
        tilesOnBoard: action.payload,
        isStart: true,
      };
    case "CHANGE_COLUMN":
      return {
        ...state,
        column: action.payload,
      };
    case "CHANGE_ROW":
      return {
        ...state,
        row: action.payload,
      };
    case "UPDATE_PAIR_OPENED_TILES":
      return {
        ...state,
        pairOpenedTiles: action.payload,
      };
    case "UPDATE_TILES_ON_BOARD":
      return {
        ...state,
        tilesOnBoard: action.payload,
      };
    case "INCREASE_PAIR_COUNTER":
      return {
        ...state,
        pairCounter: state.pairCounter + 1,
      };
    case "RESET_PAIR_OPENED_TILES":
      return {
        ...state,
        pairOpenedTiles: [],
      };
    case "CHECK_GAME_OVER":
      if (state.pairCounter < state.tilesOnBoard.length / 2) {
        return { ...state };
      } else {
        return {
          ...state,
          isGameOver: true,
        };
      }
    default:
      return state;
  }
}
