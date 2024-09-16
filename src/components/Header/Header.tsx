import logo from '../../assets/icons/Layer_x0020_1.svg';
import notifications from '../../assets/icons/notifications.svg';
import balance from '../../assets/icons/balance.svg';
import user_name from '../../assets/icons/user_name.svg';
import './Header.scss';

export function Header() {

    return (
        <header className='header'>
            <a className='header__logo' href='/'>
                <img className='logo__image' src={logo}></img>
                <h1 className='logo__text'>Консоль управления</h1>
            </a> 
            <input type='checkbox' name='menu' id='menu'></input>
            <label htmlFor='menu'>
                ☰
            </label>   
            <nav className='header__menu'>
                <ul className='header__menu-list'>
                    <li className='header__menu-item'>
                        <a className='header__menu-link' href='/'>
                            <img className='link__image' src={notifications}></img>
                        </a>
                    </li>
                    <li className='header__menu-item'>
                        <a className='header__menu-link' href='/'>
                            <img className='link__image' src={balance}></img>
                        </a>
                    </li>
                    <li className='header__menu-item'>
                        <a className='header__menu-link' href='/'>
                            <img className='link__image' src={user_name}></img>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}