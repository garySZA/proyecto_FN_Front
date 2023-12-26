import { backupExtensionsAllowed, imageExtensionsAllowed } from "./whitelists";

export const getFileExtension = ( fileName = 'filename.jpeg', parameter = '.' ) => {
    const nameFormated = fileName.split(parameter);
    
    return nameFormated[ nameFormated.length - 1 ];
}

export const isImageExtensionAllowed = ( fileExtension = 'jpeg' ) => {
    return imageExtensionsAllowed.includes( fileExtension );
}

export const isBackupExtensionAllowed = ( fileExtension = 'jpeg' ) => {
    return backupExtensionsAllowed.includes( fileExtension );
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

export const getBackupExtensionsAllowed = () => {
    let extensionsAllowed = '';

    for (let i = 0; i < backupExtensionsAllowed.length; i++) {
        if( i === backupExtensionsAllowed.length -1 ){
            extensionsAllowed += backupExtensionsAllowed[i];
        } else {
            extensionsAllowed += backupExtensionsAllowed[i] + ', ';
        }
    }

    return extensionsAllowed;
}