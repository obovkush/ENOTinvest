import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import logo from './logo.png'
import axios from 'axios';

const sidebarNavItems = [
    {
        display: 'Главная',
        to: '/',
        section: ''
    },
    {
        display: 'Акции',
        to: '/stocks',
        section: 'stocks'
    },
    {
      display: 'Аномалии',
      to: '/anomaly',
      section: 'anomaly'
  },
    {
        display: 'Логин',
        to: '/signin',
        section: 'signin'
    },
    {
        display: 'Регистрация',
        to: '/signup',
        section: 'signup'
    }
]

const Sidebar = () => {
  const [usd, setUsd] = useState(0)
  const [eur, setEur] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
      axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then((data) => {
          setUsd(data.data.Valute.USD.Value)
          setEur(data.data.Valute.EUR.Value)
        })
        .catch(error => console.log(error))
    }, [])

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
        <div className='sidebar__menu__item' style={{ fontSize: '14px' }}>
          USD: {usd} | EUR: {eur}
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
