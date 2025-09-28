import React from "react";

type Props = {
  params: { id: string };
};

async function UserDetails({ params }: Props) {
  const { id } = await params;
  const data = await fetch(`http://localhost:3000/users/${id}`);
  const user = await data.json();

  return (
    <div>
      UserDetails
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
    </div>
  );
}

export default UserDetails;
