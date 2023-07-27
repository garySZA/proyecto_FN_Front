export const setFormErrorsFromServer = ( reason, setError, setFocus ) => {

    let inputFocus = null;
    
    console.log(reason.response.data.errors, 'data')

    for( let message of reason.response.data.errors ){

        let input = message.param;
        setError( input, {message} );

        if( inputFocus == null ) inputFocus = input;
    }

    console.log(inputFocus, 'focus')

    if( inputFocus ) setFocus( inputFocus );

}