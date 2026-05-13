import Login from "../components/auth/Login";

function LoginPage({ setIsLoggedIn }){
    return(
        <Login setIsLoggedIn={setIsLoggedIn} />
    );
}

export default LoginPage;