import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button'

const UserDashboard = () => {
    return (
       <UserLayout>
           <div>
            <div className="user_nfo_panel">
                <h1>User Information</h1> 
            <div>
                <span>name</span>
                <span>surname</span>
                <span>email</span>
            </div>
            <MyButton
            type="default"
            title="Edit Account"
            link="/user/user_profile"
            />
        </div>

        <div className="user_nfo_panel">
            <h1>Purchase History</h1>
            <div className="user_product_block_wrapper">

            </div>

        </div>

    </div>

       </UserLayout>
    );
};

export default UserDashboard;