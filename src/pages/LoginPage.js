// import axios from 'axios'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authFolder/AuthContext';

export default function LoginPage() {
    const auth = useContext(AuthContext);
    const history = useNavigate()
    const [quest, setQuest] = useState({ author: '', text: '' });
    const [login, setLogin] = useState({ email: '', password: '' });
    const [staff, setStaff] = useState(false);

    //############################### Generating Random number #################################

    const randomNumber = () => {
        return Math.floor(Math.random() * 1600)
    }

    //################################ Fetching Qutes ###########################################

    useEffect(() => {
        if (staff) {
            // Hide the success message box after 3 seconds
            const timeoutId = setTimeout(() => {
                setStaff(false);
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
            };
        }

        let num = randomNumber();
        fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setQuest(data[num])
            });
    }, [staff])

    //################################## User Input Handling ##########################################

    const changeHandle = (e) => {
        e.preventDefault()
        setLogin({
            ...login, [e.target.name]: e.target.value
        })
    }

    //################################## Login Handling ##########################################

    const Login = async () => {
        const loginData = new FormData()
        loginData.append("email", login.email)
        loginData.append("password", login.password)

        //Sending the login credientials to the server
        // Have to this long method of axios in order to get the cookies in browser
        
        await axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:8000/login',
            data: loginData,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'csrfToken'
            }
        })
            .then(() => {
                axios.get('http://localhost:8000/login', { withCredentials: true }) // Here I'll get the user details from Django Server
                    .then(res => {
                        console.log(res.data);
                        if (res.data.is_staff) {
                            console.log("He is Staff");
                            setStaff(true);
                            Cookies.remove('jwt');
                            auth.updateAuth();
                        } else {
                            console.log("He is a Trainer");
                            setStaff(false);
                            localStorage.setItem('userDetail', JSON.stringify(res.data));
                            auth.updateAuth();
                            history("/dashboard")
                        }
                    }).catch(e => console.log(e.response.data))
            })
            .catch(e => console.log(e.response.data))
    }

    if (!staff && auth.is_Authenticated) {
        history("/dashboard");
    }
    return (
        <div>
            {/* <!-- Section: Design Block --> */}
            <section className="container mt-5" style={{ width: "100vw" }}>
                {/* <!-- Jumbotron --> */}
                <div className="px-5 py-5 text-center text-lg-start" style={{ backgroundColor: "rgb(153, 153, 255)", borderRadius: '10px' }}>
                    <div className="container">
                        <div className="row gx-lg-5 align-items-center">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <h5 className="my-5 fw-bold">
                                    {quest.text}
                                </h5>
                                <p style={{ color: "white" }}>
                                    Author : {quest.author}
                                </p>
                            </div>

                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body py-5 px-md-5">
                                        <h1 className='text-center'>Login</h1>
                                        {/* <!-- Email input --> */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                                            <input type="email" id="form3Example3" name='email' onChange={changeHandle} className="form-control" />
                                        </div>

                                        {/* <!-- Password input --> */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                            <input type="password" id="form3Example4" name='password' onChange={changeHandle} className="form-control" />
                                        </div>

                                        {/* <!-- Submit button --> */}
                                        <button type="submit" className="btn px-4 py-2 btn-primary" onClick={Login}>
                                            Sign In
                                        </button>


                                        {/* Warning for login or no */}

                                        {staff && (
                                            <div className="alert alert-danger" role="alert">
                                                Use Admin Link insted !!
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
