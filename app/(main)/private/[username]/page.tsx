const UsernamePage = ({ params }: { params: { username: string } }) => {
  return <div>{params.username}</div>;
};

export default UsernamePage;
