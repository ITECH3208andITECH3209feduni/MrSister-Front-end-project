import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IndividualUser from "./IndividualUser";
import axios from "axios";
import { toast } from "react-toastify";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserData();
  });
  const fetchUserData = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    // console.log("Data from server", res.data);
    setUsers(res.data);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/users/${userId}`
      );
      toast.success("User Delete Success");
    } catch (e) {
      toast.error("Error Deleting User");
    }
  };

  return (
    <div>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">User Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <IndividualUser {...user} handleDelete={handleDeleteUser} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

UsersList.propTypes = {};

export default UsersList;
