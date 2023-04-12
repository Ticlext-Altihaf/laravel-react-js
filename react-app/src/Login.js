import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {login, parseErrors} from "./lib";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRoleChange(event) {
        setRole(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        login(username, password, role).then(response => {
            if (response && response.data) {
                if(response.data.user) {
                    navigate('/')
                }else {
                    setErrors(parseErrors(response))
                }
            }

        }).catch(error => {
            setErrors(parseErrors(error))
            console.log(error)
            console.log(errors)
        })
    }

    return (
        <div
            className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">

            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                { errors.message ? <div className="text-red-500 text-sm">{errors.message}</div> : '' }
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        { errors.username ? <div className="text-red-500 text-sm">{errors.username}</div> : '' }
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            username</label>
                        <input type="text" name="username" id="username"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               placeholder="Username" required=""
                               value={username}
                               onChange={handleUsernameChange}/>
                    </div>
                    <div>
                        { errors.password ? <div className="text-red-500 text-sm">{errors.password}</div> : '' }
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               required=""
                                 value={password}
                                    onChange={handlePasswordChange}/>

                    </div>
                    <div>
                        <label htmlFor="role"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            role</label>
                        <select name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={role}
                                onChange={handleRoleChange}>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>

                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Login
                    </button>


                </form>
            </div>
        </div>
    );
};
export default Login;
