import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {getUser, axios, parseErrors, logout} from "./lib";

/**
 *  "current_page": 2,
 *     "first_page_url": "http://localhost:9884/backend/api/leave-history?page=1",
 *     "from": 16,
 *     "last_page": 1289,
 *     "last_page_url": "http://localhost:9884/backend/api/leave-history?page=1289",
 *         "links": [
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=1",
 *             "label": "&laquo; Previous",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=1",
 *             "label": "1",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=2",
 *             "label": "2",
 *             "active": true
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=3",
 *             "label": "3",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=4",
 *             "label": "4",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=5",
 *             "label": "5",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=6",
 *             "label": "6",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=7",
 *             "label": "7",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=8",
 *             "label": "8",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=9",
 *             "label": "9",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=10",
 *             "label": "10",
 *             "active": false
 *         },
 *         {
 *             "url": null,
 *             "label": "...",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=1288",
 *             "label": "1288",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=1289",
 *             "label": "1289",
 *             "active": false
 *         },
 *         {
 *             "url": "http://localhost:9884/backend/api/leave-history?page=3",
 *             "label": "Next &raquo;",
 *             "active": false
 *         }
 *     ],
 *     "next_page_url": "http://localhost:9884/backend/api/leave-history?page=3",
 *     "path": "http://localhost:9884/backend/api/leave-history",
 *     "per_page": 15,
 *     "prev_page_url": "http://localhost:9884/backend/api/leave-history?page=1",
 *     "to": 30,
 *     "total": 19323
 */
const Pagination = ({pagination, onPageChange}) => {
    if (!pagination || !pagination.links) {
        //skeleton
        return (
            <nav className="flex items-center justify-between p-4" aria-label="Table navigation">

                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <span className="sr-only">Loading...</span>
                </div>

            </nav>
        )
    }
    return (<nav className="flex items-center justify-between p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
            className="font-semibold text-gray-900 dark:text-white">{pagination.from}-{pagination.to}</span> of <span
            className="font-semibold text-gray-900 dark:text-white">{pagination.total}</span></span>
        <ul className="inline-flex items-center -space-x-px">
            {pagination.prev_page_url && (
                <li>
                    <button onClick={() => onPageChange(pagination.prev_page_url)}
                       className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </li>
            )}


            {pagination.links.filter(link => link.label.match(/^[0-9]+$/)).map((link, index) => {
                return (<li key={index}>
                    <button onClick={() => onPageChange(link.url)}
                            disabled={link.active}
                       className={link.active ? "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}>
                        {link.label}
                    </button>
                </li>)
            })}

            {pagination.next_page_url && (
                <li>
                    <button onClick={() => onPageChange(pagination.next_page_url)}
                       className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </li>
            )}
        </ul>
    </nav>)
}
const Login = () => {
    const [user, setUser] = useState(getUser());
    const [histories, setHistories] = useState([]);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        first_page_url: null,
        from: null,
        last_page: null,
        last_page_url: null,
        links: null,
        next_page_url: null,
        per_page: null,
        prev_page_url: null,
        to: null,
        total: null
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState(null);

    function hideBanner() {
        sessionStorage.setItem('bannerAlreadyShown', 'true');
        const banner = document.getElementById('sticky-banner');
        banner.classList.add('hidden');
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        getUser(setUser, user)
    }, [user, navigate]);

    function setNewData(response) {
        setHistories(response.data.data);
        setPagination({
            current_page: response.data.current_page,
            first_page_url: response.data.first_page_url,
            from: response.data.from,
            last_page: response.data.last_page,
            last_page_url: response.data.last_page_url,
            links: response.data.links,
            next_page_url: response.data.next_page_url,
            per_page: response.data.per_page,
            prev_page_url: response.data.prev_page_url,
            to: response.data.to,
            total: response.data.total,
        });
        setPage(response.data.current_page);
    }

    function fetchData(url, page, search) {
        if (url.startsWith('http')) {
            //replace origin with none
            url = url = url.replace(new URL(url).origin, "")

        }
        if (url.startsWith("/backend/api")) {
            url = url.replace("/backend/api", "");
        }
        setLoading(true)
        let params = {}
        if (page) {
            params.page = page;
        }
        if (search) {
            params.search = search;
        }
        axios.get(url, {
            params: params
        }).then(response => {
            setLoading(false);
            if (!response.data.data) {
                const errors = parseErrors(error);
                if (errors.message) {
                    setError(errors.message);
                }
                return
            }
            setNewData(response);
        }).catch(error => {
            const errors = parseErrors(error);
            if (errors.message) {
                setError(errors.message);
            }
        })
    }

    useEffect(() => {
        fetchData('/leave-history', page, search);
    }, [search]);
    if (!user) {
        return (
            <div
                className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
                Loading...
            </div>
        )
    }

    function logoutAction() {
        logout().then(r => {
            setUser(null);
        });

    }

    return (
        <div
            className="flex flex-col items-center justify-center px-6 pt-4 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">

            <div id="sticky-banner" tabIndex="-1"
                 className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center mx-auto">
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        Welcome {user.role === 'admin' ? 'Administrator' : 'Staff'}, you have successfully logged in.
                    </p>
                </div>
                <div className="flex items-center">
                    <button data-dismiss-target="#sticky-banner" type="button" onClick={hideBanner}
                            className="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close banner</span>
                    </button>
                </div>
            </div>
            <div id="main-content" class="relative w-full h-full bg-gray-50 dark:bg-gray-900">
                <main>
                    <div
                        class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                        <div class="w-full mb-1">
                            <div class="mb-4">
                                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Leave
                                    History</h1>
                            </div>
                            <div
                                class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">

                                <button type="button" onClick={logoutAction}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout
                                </button>

                            </div>
                        </div>
                    </div>
                    <Pagination pagination={pagination} onPageChange={fetchData}/>
                    <div className="flex flex-col">
                        <div className="overflow-y-show">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden shadow">
                                    <table
                                        className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                ID
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                User Outlet ID
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                User Manager ID
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                User Message
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Leave Type
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Start Date
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                End Date
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                No. of Days
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody
                                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {loading && (//show skeleton
                                            Array(10).fill().map((item, index) => (
                                                <tr key={index}>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"/>
                                                        <div
                                                            className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"/>
                                                    </td>

                                                </tr>
                                            ))
                                        )}
                                        {!loading && (//show data
                                            histories.map((leave, index) => (
                                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="text-base font-semibold text-gray-900 dark:text-white">
                                                            {leave.id}
                                                        </div>

                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        <div
                                                            className="text-base font-semibold text-gray-900 dark:text-white">
                                                            {leave.user_outlet_id}
                                                        </div>

                                                    </td>
                                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{leave.user_manager_id}</td>
                                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{leave.user_message}</td>
                                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{leave.leave_type.name}</td>
                                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{leave.start_date}</td>
                                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{leave.end_date}</td>
                                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{leave.no_of_days}</td>
                                                    <td className="p-4 space-x-2 whitespace-nowrap">
                                                        <button type="button" onClick={() => {
                                                            setModalData(leave)
                                                        }}
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">More
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}

                                        </tbody>
                                    </table>
                                    {modalData && (
                                        <div hidden="" aria-hidden="false" data-testid="modal" role="dialog"
                                             className="fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
                                            <div className="relative h-full w-full p-4 md:h-auto max-w-2xl">
                                                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                                                    <div
                                                        className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5">
                                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">ID {modalData.user_outlet_id}</h3>

                                                    </div>

                                                    <div className="p-6 space-y-6 ">
                                                        <div className="flex flex-row justify-between">
                                                            <div className="flex flex-col space-y-1">
                                                                <label
                                                                    className="text-sm font-medium text-gray-500 dark:text-gray-400">User
                                                                    Manager ID</label>
                                                                <div
                                                                    className="text-base font-medium text-gray-900 dark:text-white">{modalData.user_manager_id}</div>
                                                            </div>
                                                            <div className="flex flex-col space-y-1">
                                                                <label
                                                                    className="text-sm font-medium text-gray-500 dark:text-gray-400">User
                                                                    Message</label>
                                                                <div
                                                                    className="text-base font-medium text-gray-900 dark:text-white">{modalData.user_message}</div>
                                                            </div>
                                                            <div className="flex flex-col space-y-1">
                                                                <label
                                                                    className="text-sm font-medium text-gray-500 dark:text-gray-400">Leave
                                                                    Type</label>
                                                                <div
                                                                    className="text-base font-medium text-gray-900 dark:text-white">{modalData.leave_type.name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>

                                                    <div className="p-6 space-y-6">
                                                        <p className="text-xl font-medium text-gray-900 dark:text-white">Leave
                                                            Activities</p>
                                                        {modalData.leave_activities.map((activity) => (
                                                            <div className="flex flex-row items-stretch">
                                                                <div className="basis-1/4">
                                                                    <label
                                                                        className="text-sm font-medium text-gray-500 dark:text-gray-400">Team
                                                                        User ID</label>
                                                                    <div
                                                                        className="text-base font-medium text-gray-900 dark:text-white">{activity.team_user_id}</div>
                                                                </div>
                                                                <div className="basis-1/4">
                                                                    <label
                                                                        className="text-sm font-medium text-gray-500 dark:text-gray-400">Action</label>
                                                                    <div
                                                                        className="text-base font-medium text-gray-900 dark:text-white">{activity.action}</div>
                                                                </div>
                                                                <div className="basis-1/4">
                                                                    <label
                                                                        className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                                                    <div
                                                                        className="text-base font-medium text-gray-900 dark:text-white">{activity.status}</div>
                                                                </div>
                                                                <div className="basis-1/4">
                                                                    <label
                                                                        className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</label>
                                                                    <div
                                                                        className="text-base font-medium text-gray-900 dark:text-white">{activity.created}</div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <hr/>
                                                    <div className="p-6 space-y-6">
                                                        <p className="text-xl font-medium text-gray-900 dark:text-white">Leave
                                                            Dates</p>
                                                        <div className="flex flex-col space-y-4">
                                                            {modalData.leave_dates.map((date) => (

                                                                <div
                                                                    className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    {date.dates}
                                                                </div>

                                                            ))}
                                                            {modalData.leave_dates.map((date) => (

                                                                <div
                                                                    className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    {date.dates}
                                                                </div>

                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t">
                                                        <button type="button" onClick={() => {
                                                            setModalData(null)
                                                        }}
                                                                className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg">
                                                            <span
                                                                className="flex items-center rounded-md text-sm px-4 py-2">Close</span>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </main>

            </div>
        </div>
    )
}
export default Login;
