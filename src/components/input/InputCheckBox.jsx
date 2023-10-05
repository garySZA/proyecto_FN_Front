import React from 'react';

export const InputCheckBox = ({ isChecked, setIsChecked, label }) => {
    
    const handleCheckboxChange = () => {
        setIsChecked( !isChecked );
    }
    return (
        <>
            <label 
                htmlFor="checkbox"
                className='form-check-label text-letters my-3'
            >
                <input 
                    type="checkbox" 
                    id="checkbox" 
                    className='form-check-input'
                    
                    checked={ isChecked }
                    onChange={ handleCheckboxChange }
                />
                { label }
            </label>
        </>
    )
}
