export default function(state, action) {
    switch (action.type) {
      case 'NEW_GAME':
        return {
          column: 4,
          row: 4,
          isStart: false,
          tilesOnTheBoard: [],
          pairOpenedTiles: [],
          pairCounter: 0,
        };
      case 'START_GAME':
        return {
          ...state,
          isStart: true
        };
      case 'CHANGE_COLUMN':
        return {
          ...state,
          column: action.payload,
        }
      case 'CHANGE_ROW':
        return {
          ...state,
          row: action.payload,
        }
        case 'INIT_TILES':
          return {
            ...state,
            tilesOnTheBoard: action.payload,
          }
      default:
        return state;
    }
  }