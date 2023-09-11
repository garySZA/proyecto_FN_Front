import { imageExtensionsAllowed } from "./whitelists";

export const getFileExtension = ( fileName = 'filename.jpeg', parameter = '.' ) => {
    const nameFormated = fileName.split(parameter);

    return nameFormated[ nameFormated.length - 1 ];
}

export const isImageExtensionAllowed = ( fileExtension = 'jpeg' ) => {
    return imageExtensionsAllowed.includes( fileExtension );
}

export const getImageExtensionsAllowed = () => {
    let extensionsAllowed = '';

    for (let i = 0; i < imageExtensionsAllowed.length; i++) {
        if( i === imageExtensionsAllowed.length -1 ){
            extensionsAllowed += imageExtensionsAllowed[i];
        } else {
            extensionsAllowed += imageExtensionsAllowed[i] + ', ';
        }
    }

    return extensionsAllowed;
}