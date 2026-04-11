import React, { useState } from 'react'
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { menuItems } from '../../utils/menuitems';
import { signout } from '../../utils/icons';
import { useAuthContext } from '../../context/authContext';

function Navigation({active,setActive}) {
    const { user, logout } = useAuthContext();
    
    // Construct absolute url for profile image
    const profileImgUrl = user?.profileImage ? `http://localhost:5000${user.profileImage}` : avatar;

    return (
        <NavStyled>
            <div className="user-con" onClick={() => setActive(5)}>
                <img src={user?.profileImage ? `http://localhost:5000${user.profileImage}` : avatar} alt="" />
                <div className="text">
                    <h2>{user?.username}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li key={item.id} onClick={()=>setActive(item.id)} className={active === item.id?'active':''}>
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li onClick={logout} style={{cursor: 'pointer'}}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252,246,249,0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(10px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    box-shadow: 0px 12px 32px rgba(0,0,0,0.08);

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0.5rem;
        border-radius: 20px;
        
        &:hover {
            background: rgba(34,34,96,0.04);
            transform: translateY(-2px);
        }

        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 8px 24px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            &:hover {
                transform: scale(1.05);
            }
        }
        h2{
            color: rgba(34,34,96,1);
            font-weight: 700;
        }
        p{
            color: rgba(34,34,96,.6);
            font-weight: 500;
        }
    }
    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 600;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34,34,96,.6);
            padding: 0.8rem 1rem;
            position: relative;
            border-radius: 12px;

            &:hover {
                background: rgba(34,34,96,0.04);
                color: rgba(34,34,96,1);
                i {
                    color: rgba(34,34,96,1);
                    transform: scale(1.1);
                }
            }

            i{
                color: rgba(34,34,96,0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .active{
        color: rgba(34,34,96,1) !important;
        background: rgba(34,34,96,0.06) !important;
        i{
            color:rgba(34,34,96,1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height:100%;
            background: linear-gradient(180deg, var(--color-accent) 0%, rgba(34,34,96,1) 100%);
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        li {
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 1rem;

            &:hover {
                background: rgba(255, 0, 0, 0.05);
                color: var(--color-delete);
            }
        }
    }
`;

export default Navigation
