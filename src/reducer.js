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
        case 'IS_OPENED':
          return {
            ...state,
            tilesOnTheBoard: action.payload.tile,
            pairOpenedTiles: action.payload.pairOpenedTiles
          }
        case 'COMPARE_TRUE':
          return {
            ...state,
            pairOpenedTiles: [],
            pairCounter: state.pairCounter+1,
          }
        case 'COMPARE_FALSE':
          return {
            ...state,
            pairOpenedTiles: [],
          }
      default:
        return state;
    }
  }