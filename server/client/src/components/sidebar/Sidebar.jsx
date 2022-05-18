import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import home from './home.png';
import login from './login.png'
import registration from './registration.png'
import anomaly from './anomaly.png'
import logout from './logout.png'
import stock from './stock.png'
import logo from './logo.png'

const sidebarNavItems = [
    {
        display: 'Главная',
        icon: <img src={home} />,
        to: '/',
        section: ''
    },
    {
        display: 'Акции',
        icon: <img src={stock} />,
        to: '/stock',
        section: 'stock'
    },
    {
      display: 'Аномалии',
      icon: <img src={anomaly} />,
      to: '/anomaly',
      section: 'anomaly'
  },
    {
        display: 'Логин',
        icon: <img src={login} />,
        to: '/login',
        section: 'login'
    },
    {
        display: 'Регистрация',
        icon: <img src={registration} />,
        to: '/registration',
        section: 'registration'
    }
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
        <img src={logo} alt='logo'/>
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
