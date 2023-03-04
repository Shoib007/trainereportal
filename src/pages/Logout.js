import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authFolder/AuthContext';

export default function Logout() {
    const auth = useContext(AuthContext);
    const redirect = useNavigate();
    const logout = async () => {
        await axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:8000/logout',
        }).then((res) => {
            console.log(res.data);
            localStorage.clear();
            auth.updateAuth();
            redirect('/');
        }).catch((error) => {
            console.log(error.response.status);
        })
    }

    useEffect(() => {
        logout();
    })


    return (
        <div className='container'>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <h1 className='text-danger'>Loging Out ....</h1>
            </div>
        </div>
    )
}
