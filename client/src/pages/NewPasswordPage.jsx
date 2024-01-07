import React, { useState } from 'react';

const NewPasswordPage = () => {


    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    return (
        <div>
            <form>
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />

                <input
                    type="newPassword"
                    placeholder='newPassword'
                    value={newPassword}
                    onChange={ev => setNewPassword(ev.target.value)} />

                <button className='primary'>Submit</button>

            </form>
        </div>
    );
};

export default NewPasswordPage;