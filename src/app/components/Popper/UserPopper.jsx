import React, { useState } from 'react';
import PopperWrapper from './index';
import { Link } from 'react-router-dom';
import { IMAGE_PATH } from '../../appConfig';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function UserPopper() {
    let [popper, setPopper] = useState(false);
    let [key, setKey] = useState(1);

    const show = () => {
        setPopper(true);
        setKey((key += 1));
    };
    const hide = () => {
        setPopper(false);
        setKey((key += 1));
    };

    return (
        <Tippy
            interactive
            visible={popper}
            key={key}
            render={(attrs) => (
                <div className="user-popper" tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <ul>
                            <li className="text-center">
                                <Link
                                    to="/"
                                    className="w-100 d-block p-3"
                                    onClick={hide}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="text-center">
                                <Link
                                    to="/user-profile"
                                    className="w-100 d-block p-3"
                                    onClick={hide}
                                >
                                    User Profile
                                </Link>
                            </li>
                            <li className="text-center">
                                <button className="p-3 w-100">Logout</button>
                            </li>
                        </ul>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={hide}
        >
            <div className="avatar__wrapper ml-4">
                <button
                    className="w-100 h-100 p-0"
                    onClick={popper ? hide : show}
                >
                    <img
                        src={IMAGE_PATH + '/user.jpg'}
                        alt=""
                        className="object-fit-contain rounded-circle border"
                    />
                </button>
            </div>
        </Tippy>
    );
}

export default UserPopper;
