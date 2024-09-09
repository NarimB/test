import logo from '../../assets/icons/Layer_x0020_1.svg';
import notifications from '../../assets/icons/notifications.svg';
import balance from '../../assets/icons/balance.svg';
import user_name from '../../assets/icons/user_name.svg';
import './Header.scss';

export function Header() {

    return (
        <header className="header">
            <div className='logo'>
                <img src={logo}></img>
                <span className='logo-text'>Консоль управления</span>
            </div>
            <input type='checkbox' name='menu' id='menu'></input>
            <label htmlFor='menu'>
                ☰
            </label>
            <nav className='user-account'>
                <img src={notifications} className='notifications'></img>
                <img src={balance} className='balance'></img>
                <img src={user_name} className='user_name'></img>
            </nav>
        </header>
    )
}