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

      if (this.state.match) {
        props.onRouteMatched({...this.state.match, name: props.name})
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (super.componentWillUpdate) {
        super.componentWillUpdate(nextProps, nextState);
      }

      if (nextState.match && JSON.stringify(this.state.match) !== JSON.stringify(nextState.match)) {
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
    onRouteMatched: PropTypes.func.isRequired,
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
  }

  const mapStateToProps = state => ({
    location: getIn(state, ['router', 'location']),
  })

  const mapDispatchToProps = dispatch => ({
    onRouteMatched: (match) => dispatch(onRouteMatched(match))
  })

  return connect(mapStateToProps, mapDispatchToProps)(ConnectedRoute)
}

export default createConnectedRoute
