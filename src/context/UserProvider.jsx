import { UserContext } from './User.Context'

export const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider>
            { children }
        </UserContext.Provider>
    )
}
