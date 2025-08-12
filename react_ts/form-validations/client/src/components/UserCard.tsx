interface UserProps{
    firstName: string;
    lastName: string;
    email: string;
}

function UserCard({ firstName, lastName, email }: UserProps){
    return(
        <div>
            <p>Username: {firstName}.{lastName}@123</p>
            <p>Email: {email}</p>
        </div>
    )
}

export default UserCard;