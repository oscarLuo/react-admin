import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils';

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if (!user || !user._id) {
            //自动跳转到登陆（在render()中）
            return <Redirect to="/login" />
        }
        return (
            <div>
                Hello {user.username}
            </div>
        )
    }
}
