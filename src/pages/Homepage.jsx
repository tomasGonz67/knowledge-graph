import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to Gutenberg</h1>
            <div className="flex space-x-4">
                <Link to="/login">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
        </div>
    );
}

export default Homepage;
