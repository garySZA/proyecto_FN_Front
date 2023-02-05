import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    
    const onLogin = () => {
        console.log('clicando')
        navigate('/admin/users', {
            replace: true
        });
    }
    
    return (
        <div className='container mt-5'>
            <h2>Login</h2>
            <hr />

            <button 
                className='btn btn-primary'
                onClick={ onLogin }
            >
                Login
            </button>
        </div>
    )
}
