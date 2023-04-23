import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BsTrash } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import ChangeRole from '../../components/changeRole/ChangeRole';
import { Spinner } from '../../components/loader/Loader';
import Search from '../../components/search/Search';
import UserStats from '../../components/userStats/UserStats';
import useRedirectLoggedOutUser from '../../customHooks/useRedirectLoggedOutUser';
import { deleteUser, getUsers } from '../../redux/features/auth/authSlice';
import {
  FILTER_USERS,
  selectorUser,
} from '../../redux/features/auth/filterSlice';
import './UserList.scss';

function UserList() {
  const [search, setSearch] = useState('');
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, users } = useSelector(
    (state) => state.auth
  );
  const filteredUsers = useSelector(selectorUser);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete user',
      message: 'Are you sure to delete this user?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeUser(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  // ! Pagination --------
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  // ! -------------------

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  return (
    <section>
      <div className='container'>
        <UserStats />
        <div className='user-list'>
          {isLoading && <Spinner />}
          <div className='table'>
            <div className='--flex-between'>
              <span>
                <h3>All users</h3>
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
            {/* table ends */}
            {!isLoading && users.length === 0 ? (
              <h2>No user found...</h2>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id, name, email, role } = user;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          <ChangeRole id={_id} email={email} />
                        </td>
                        <td>
                          <span>
                            <BsTrash
                              size={20}
                              color='red'
                              onClick={() => confirmDelete(_id)}
                              style={{ cursor: 'pointer' }}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <ReactPaginate
            breakLabel='...'
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='<'
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageLinkClassName='page-num'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='activePage'
          />
        </div>
      </div>
    </section>
  );
}

export default UserList;
