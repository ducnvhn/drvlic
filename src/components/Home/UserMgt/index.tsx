import React from 'react'
import {
    gql,
    useLazyQuery,
    useMutation
} from '@apollo/client'
import UsersList from './MainComps/UsersList'
import LoadinCenter from '../../common/LoadingCenter'
import Header from './MainComps/Header'
import { Modal } from 'antd'

const LOAD_USERS = gql `
    query loadUsers($filter: UserFilter, $page: Int, $limit: Int) {
        loadUsers(filter: $filter, page: $page, limit: $limit) {
            _id
            name
            email
            role
            disabled
            shouldChangePwd
        }
    }
`
const CREATE_USER = gql `
    mutation createUser($userInput: UserInput) {
        createUser(userInput: $userInput) {
            name
        }
    }
`
const DELETE_USER = gql`
    mutation deleteUser($_id: String!) {
        deleteUser(_id: $_id)
    }
`
const UserMgt = () => {
    const [filter, setFilter] = React.useState<Record<string,any>>({
        name: null,
        email: null,
        role: null
    })
    const limit = 100
    const [loadUsers, { loading, data: loadUsersR }] = useLazyQuery(LOAD_USERS)
    const [createUser] = useMutation(CREATE_USER, {refetchQueries: [LOAD_USERS]})
    const [deleteUser] = useMutation(DELETE_USER, { refetchQueries: [LOAD_USERS]})

    React.useEffect(() => {
        const load = async () => {
            await loadUsers({
                variables: {
                    filter,
                    page: 1,
                    limit
                }
            })
        }
        load()
    }, [loadUsers, filter])

    return (
        <div>
            <Header
                filter={filter}
                createUser={createUser}
                setFilter={setFilter}
            />
            {loading && (
                <LoadinCenter />
            )}
            {!loading && loadUsersR && (
                <UsersList
                    users={loadUsersR.loadUsers}
                    deleteUser={deleteUser}
                />
            )}
            
        </div>
    )
}
export default UserMgt