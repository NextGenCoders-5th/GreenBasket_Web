import CreateUserForm from "../_components/create.user.form"

const page = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Create User</h2>
                {/* <CreateUserForm /> */}
            </div>
        </div>
    )
}

    export default page;