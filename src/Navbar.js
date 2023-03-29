import React, { useContext } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './authFolder/AuthContext';
import axios from 'axios';

export default function Sidebar() {
    const auth = useContext(AuthContext);
    const redirect = useNavigate();

    const Logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userDetail');
        axios({
            method: 'post',
            withCredentials: true,
            url: 'http://localhost:8000/logout',
        }).then((res) => {
            auth.updateAuth();
            redirect("/");
        }).catch((error) => {
            console.log(error.response.status)
        })
    }


    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        <h1>Eduvate</h1>
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/profile" activeclassname="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink to="/dashboard" activeclassname="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/trainings" activeclassname="activeClicked">
                            <CDBSidebarMenuItem icon="table">Trainings</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/analytics" activeclassname="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>

                        <CDBSidebarMenuItem><button className='btn text-bg-info' onClick={Logout}>Logout</button></CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};