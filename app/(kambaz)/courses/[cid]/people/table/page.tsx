"use client"
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaUserCircle, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as usersClient from "../../../../users/client";
import * as enrollmentsClient from "../../../../enrollments/client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";

export default function PeopleTable() {
	const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
	const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [data, setData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "STUDENT",
  });
  const isFaculty =
    (currentUser as any)?.role === "FACULTY" || (currentUser as any)?.role === "ADMIN";

  const fetchUsers = async () => {
    try {
      const data = await usersClient.findUsersInCourse(cid as string);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };
  useEffect(() => {
    if (cid) fetchUsers();
  }, [cid]);

  const handleAddUser = async () => {
    try {
      const newUser = await usersClient.createUser(data);
      await enrollmentsClient.enrollUserInCourse(cid as string, newUser._id);
      fetchUsers();
      setShowModal(false);
      setData({ username: "", password: "", firstName: "", lastName: "", role: "STUDENT" });
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };
  const handleUpdateUser = async () => {
    try {
      await usersClient.updateUser(editingUser._id, data);
      fetchUsers();
      setShowModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await usersClient.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };
  const openEditModal = (user: any) => {
    setEditingUser(user);
    setData({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
    setShowModal(true);
  };
  const openAddModal = () => {
    setEditingUser(null);
    setData({ username: "", password: "", firstName: "", lastName: "", role: "STUDENT" });
    setShowModal(true);
  };

	return (
    <div id="wd-people-table">
      <h2>People</h2>
      {isFaculty && (
        <Button variant="primary" className="mb-3" onClick={openAddModal}>
          <FaPlus className="me-2" /> Add User
        </Button>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.username}</td>
              <td className="wd-role">{user.role}</td>
              {isFaculty && (
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(user)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Form.Group>
            {!editingUser && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
                <option value="TA">TA</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editingUser ? handleUpdateUser : handleAddUser}>
            {editingUser ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}