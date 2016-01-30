export default function createAsyncAction(definition) {
    const {
        types,
        invoke,
        metaData = []
    } = definition;

    const [START, SUCCESS, FAIL] = types;

    return (...args) => dispatch => {
        const meta = metaData.reduce((acc, key, i) => {
            acc[key] = args[i];
        }, {});
        meta._args = args;

        dispatch({
            type: START,
            payload: meta
        });

        invoke(...args)
            .then(r => dispatch({
                type: SUCCESS,
                payload: r,
                meta
            }))
            .catch(e => {
                console.info(e);
                console.error(e.stack);
                dispatch({
                    type: FAIL,
                    payload: e,
                    meta,
                    error: true
                });
            });
    };
}
