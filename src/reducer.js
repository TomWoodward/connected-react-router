import { LOCATION_CHANGE, ROUTE_MATCHED } from './actions'

const createConnectRouter = (structure) => {
  const {
    filterNotRouter,
    fromJS,
    getIn,
    merge,
    setIn,
  } = structure
  /**
   * This reducer will update the state with the most recent location history
   * has transitioned to.
   */
  const routerReducer = (state, { type, payload } = {}) => {
    if (type === LOCATION_CHANGE) {
      return setIn(merge(state, payload), ['matches'], [])
    }
    if (type === ROUTE_MATCHED) {
      return setIn(state, ['matches', state.matches.length], payload)
    }

    return state
  }

  const connectRouter = (history, matches = []) => {
    const initialRouterState = fromJS({
      location: history.location,
      action: history.action,
      matches,
    })
    // Wrap a root reducer and return a new root reducer with router state
    return (rootReducer) => (state, action) => {
      let routerState = initialRouterState

      // Extract router state
      if (state) {
        routerState = getIn(state, ['router']) || routerState
        state = filterNotRouter(state)
      }
      const reducerResults = rootReducer(state, action)

      return setIn(reducerResults, ['router'], routerReducer(routerState, action))
    }
  }

  return connectRouter
}

export default createConnectRouter
