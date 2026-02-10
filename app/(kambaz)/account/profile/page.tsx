import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            <FormControl id="wd-username" defaultValue="alice" className="mb-2" />
            <FormControl id="wd-password" defaultValue="123" className="mb-2" />
            <FormControl id="wd-first-name" defaultValue="Alice" className="mb-2" />
            <FormControl id="wd-last-name" defaultValue="Wonderland" className="mb-2" />
            <FormControl id="wd-dob" type="date" placeholder="mm/dd/yyyy" className="mb-2" />
            <FormControl id="wd-email" type="email" defaultValue="alice@wonderland.com" className="mb-2" />
            <FormSelect id="wd-role" className="mb-3" defaultValue="User">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
            </FormSelect>
            <Button variant="danger" className="w-100">
                Signout
            </Button>
        </div>
    );
}
