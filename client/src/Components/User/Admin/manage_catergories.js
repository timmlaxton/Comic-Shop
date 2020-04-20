import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageCharacters from './manage_characters';
import ManagePublishers from './manage_publishers'
import ManageShirts from './manage_shirts'


const MangageCatergories = () => {
    return (
        <UserLayout>
            <ManageCharacters/>
            <ManagePublishers/>
            <ManageShirts/>
        </UserLayout>
    );
};

export default MangageCatergories;