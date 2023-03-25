import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./navbar.css";

const NavBar = () => {
    const navigate = useNavigate();
    const checkLogIn = () => {
        axios.get("http://localhost:8000/check", { withCredentials: true }).then(response => {
            console.log(response.data)
            if (response.data.msg === "UnAuthorized or Session Expired") {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: response.data.msg,
                    timer: 1000,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/");
                })
            }
        })
    }
    useEffect(checkLogIn, []);
    return <header id="NavBar">
        <div onClick={() => {
            navigate("/home")
        }}>
            <img src="/images/home.png" alt="homeLogo" />
            <p>Home</p>
        </div>
        <div onClick={() => {
            navigate("/add");
        }}>
            <img src="/images/add.png" alt="addLogo" />
            <p>Add Note</p>
        </div>
        <div onClick={() => {
            axios.get("http://localhost:8000/notes/delete/all", { withCredentials: true }).then((response) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.data.msg,
                    timer: 500,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/add");
                })
            })
        }}>
            <img src="/images/delete.png" alt="deleteLogo" />
            <p>Delete All Notes</p>
        </div>
        <div>
            <img src="./images/export.png" alt="exportLogo" />
            <p>Export</p>
        </div>
        <div onClick={() => {
            console.log("clicked logout")
            axios.get("http://localhost:8000/users/logout", { withCredentials: true }).then((response) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.data.msg,
                    timer: 500,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/");
                })
            })
        }}>
            <img src="/images/logout.png" alt="logoutLogo" />
            <p>LogOut</p>
        </div>
    </header>
}

export default NavBar;