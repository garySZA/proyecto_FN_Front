import React from 'react'

import { Oval } from 'react-loader-spinner'

import './LoaderScreen.css'

export default function LoaderScreen() {
    
    return (
        <div
            className='fixed d-flex justify-content-center align-items-center vh-100 vw-100 modal container-loader'
        >
            <Oval 
                height={ 64 }
                width={ 64 }
                color="#00E0C6"
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#ffffff'
                strokeWidth={ 4 }
                strokeWidthSecondary={ 4 }
            />
        </div>
    );
}
