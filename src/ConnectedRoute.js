import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { onRouteMatched } from './actions'

const createConnectedRoute = (structure) => {
  const { getIn, toJS } = structure
  /*
   * ConnectedRoute watches for a change in the `match` prop
   * when the `match` prop changes it dispatches onRouteMatched
   */

  class ConnectedRoute extends Route {
    constructor(props, context) {
      super(props, context);

      const match = this.computeMatch(props, context.router)

      if (match) {
        props.onRouteMatched({...match, name: props.name})
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (super.componentWillUpdate) {
        super.componentWillUpdate(nextProps, nextState);
      }

      if (nextState.match) {
        this.props.onRouteMatched({...nextState.match, name: nextProps.name})
      }
    }
  }

  ConnectedRoute.defaultProps = {
    ...(Route.defaultProps || {}),
    name: null
  }

  ConnectedRoute.contextTypes = {
    ...(Route.contextTypes || {}),
  }

  ConnectedRoute.propTypes = {
    ...(Route.propTypes || {}),
    name: PropTypes.string,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    action: PropTypes.string.isRequired,
    onRouteMatched: PropTypes.func.isRequired,
  }

  const mapStateToProps = state => ({
    action: getIn(state, ['router', 'action']),
    location: getIn(state, ['router', 'location']),
  })

  const mapDispatchToProps = dispatch => ({
    onRouteMatched: (match) => dispatch(onRouteMatched(match))
  })

  return connect(mapStateToProps, mapDispatchToProps)(ConnectedRoute)
}

export default createConnectedRoute
