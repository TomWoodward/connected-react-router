import createAll from './createAll'
import plainStructure from './structure/plain'

export const {
  LOCATION_CHANGE,
  ROUTE_MATCHED,
  CALL_HISTORY_METHOD,
  push,
  replace,
  go,
  goBack,
  goForward,
  routerActions,
  ConnectedRoute,
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
  getLocation,
  getAction,
  createMatchSelector,
} = createAll(plainStructure)
