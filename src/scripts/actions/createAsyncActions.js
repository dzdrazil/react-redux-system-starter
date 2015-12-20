
/**
 * This function generates three action names, and an action creator
 * for each.  The actionCreator argument is the publicly exposed action
 * which in turn is able to invoke the three states of an asynchronous operation.
 *
 * The return value of `actionCreator` must be a redux-thunk middleware-compatible function.
 *
 * @param  {String} nameBase        The name prefix for each of the three triggered actions
 * @param  {Function} actionCreator A function which returns a redux-thunk compatible action creator function
 * @return {Function}               The result of `actionCreator`
 */
export default function createAsyncAction(nameBase, actionCreator) {
    const STARTED = `${nameBase}_STARTED`;
    const SUCCEEDED = `${nameBase}_SUCCEEDED`;
    const FAILED = `${nameBase}_FAILED`;

    const dispatchStarted = (dispatch, options) => {
        dispatch({
            type: STARTED,
            ...options
        });
    };

    const dispatchSucceeded = (dispatch, options) => {
        dispatch({
            type: SUCCEEDED,
            ...options
        });
    };

    const dispatchFailed = (dispatch, options) => {
        dispatch({
            type: FAILED,
            ...options
        });
    };

    return actionCreator(dispatchStarted, dispatchSucceeded, dispatchFailed);
}
