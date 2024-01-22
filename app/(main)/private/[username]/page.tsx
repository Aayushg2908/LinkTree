const UsernamePage = ({ params }: { params: { username: string } }) => {
  return <div className="mt-10">{params.username}</div>;
};

export default UsernamePage;
