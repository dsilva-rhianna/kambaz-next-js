"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./table";
import * as client from "../../client";

export default function PeoplePage() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const enrolledUsers = await client.findUsersForCourse(cid);
    setUsers(enrolledUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-people-page">
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}