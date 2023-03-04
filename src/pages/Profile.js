import { Link } from 'react-router-dom';
import { BsCaretRightFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';


export default function Profile(prop) {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userDetail')))
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('userDetail')));
    }, [])

    return (
        <div>
            <div className="container bg-white">
                <div className='container d-flex shadow-sm align-items-center mt-3'>
                    <Link to="/dashboard" className='fs-4 mx-3 mt-3 mb-3 text-decoration-none'> Dashboard </Link>
                    <BsCaretRightFill className='mx-3' />
                    <span className='fs-4 mx-3'>Profile</span>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-start align-items-center mx-5 mt-3">
                        <h4 className="text-right">User Name</h4>
                    </div>
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3">
                            <img className="rounded-circle mt-5" width="150px" alt='profile' src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                            <button className='btn btn-success'>Add Image</button>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3">
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label className="labels">Full Name</label>
                                    <input type="text" value={userInfo.name} className="form-control" placeholder="first name" readOnly />
                                </div>
                                
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Mobile Number</label>
                                    <input type="text" className="form-control mb-3" value={userInfo.phoneNumber} placeholder="enter phone number" readOnly />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Email ID</label>
                                    <input type="text" value={userInfo.email} className="form-control mb-3" placeholder="enter email id" readOnly />
                                </div>
                            </div>

                            <button className='btn btn-danger'>Change Password</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
