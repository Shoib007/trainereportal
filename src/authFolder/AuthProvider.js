import { BASE_URL } from "../BaseUrl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function AuthProvider(prop) {
    const jwt = Cookies.get('jwt');
    const [networkError, setNetworkError] = useState(false)
    const [is_Authenticated, setAuthentication] = useState(jwt ? true : false)

    const updateAuth = async () => {
        await axios.get(`${BASE_URL}/login`, { withCredentials: true })
            .then((res) => {
                if (res.data.is_staff) {
                    setAuthentication(false);
                    console.log(is_Authenticated);
                } else {
                    setAuthentication(true);
                }
            }).catch((e) => {
                if (e.message === 'Network Error') {
                    setNetworkError(true);
                } else {
                    setAuthentication(false);
                    console.log(e.message);
                }
            })
    }

    useEffect(() => {
        updateAuth();
    },[])

    return (
        <AuthContext.Provider value={{ is_Authenticated, updateAuth, networkError }}>
            {prop.children}
        </AuthContext.Provider>
    )
}