import { ArrowLeft } from "lucide-react"

interface LayoutProps {
    children: React.ReactNode
}

const AdminUserLayout = ({ children }: LayoutProps) => {

    return (
        <div className="min-h-screen  w-full flex flex-col bg-gray-100 p-6 gap-4 items-center justify-start">
            <div className="bg-white shadow-md rounded-lg p-6 w-full ">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-start gap-1.5">
                        <button className="flex items-center gap-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </button>
                        <h1 className="text-2xl font-bold mb-4">User Details</h1>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        View and manage user details here.
                    </p>
                </div>

                <div className="flex  w-full gap-2 items-center justify-end mb-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Edit User
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Delete User
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Reset Password
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                        Send Onboarding Email
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
                        View Activity Log
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        View Permissions
                    </button>
                </div>
            </div>
            <div className="bg-white flex-1 rounded-lg p-6 w-full ">
                {children}
            </div>
        </div>
    )
}

export default AdminUserLayout