export const setFormErrorsFromServer = ( reason, setError, setFocus ) => {

    let inputFocus = null;

    for( let message of reason.response.data.errors ){

        let input = message.param;
        setError( input, {message} );

        if( inputFocus == null ) inputFocus = input;
    }

    if( inputFocus ) setFocus( inputFocus );

}