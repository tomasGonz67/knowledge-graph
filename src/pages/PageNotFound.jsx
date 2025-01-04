import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-2xl font-semibold mt-4">Page Not Found</p>
            <p className="text-gray-600 mt-2">Sorry, the page you are looking for is yet to be developed or does not exist.</p>
            <button onClick={() => window.history.back()} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go Back
            </button>
        </div>
    );
}

export default PageNotFound;
