'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const newState = { ...currentState };
      const keys = action.keysToRemove || [];

      for (const key of keys) {
        delete newState[key];
      }
      currentState = newState;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
