import React from 'react'
import styled from 'styled-components'
import { bitcoin, book, calender, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/icons';
import Button from '../Button/Button';
import { dateFormat } from '../../utils/dateFormat';
function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category){
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bank':
                return card;
            case 'bitcoin':
                return bitcoin;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return '';
        }
    }
    const expenseCatIcon = () =>{
        switch (category){
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }
    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type==='expense' ? expenseCatIcon(): categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon ={trash}
                            bPad = {'1rem'}
                            bRad = {'50%'}
                            bg = {'var(--primary-color)'}
                            color = {'#fff'}
                            iColor = {'#fff'}
                            hColor = {'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}
const IncomeItemStyled = styled.div`
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0px 8px 32px rgba(0,0,0,0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    color: #222260;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 12px 40px rgba(0,0,0,0.08);
    }

    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: rgba(245, 245, 245, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
        i{
            font-size: 2.6rem;
        }
    }
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            font-weight: 700;
            &:before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
                box-shadow: 0px 0px 8px ${props => props.indicator}80;
            }
        }
        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
            }
            p{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-color);
                opacity: 0.8;
                font-weight: 500;
            }
            .btn-con {
                button {
                    transition: all 0.3s ease;
                    &:hover {
                        transform: scale(1.1) rotate(5deg);
                        box-shadow: 0px 6px 20px rgba(255, 0, 0, 0.2);
                    }
                }
            }
        }
    }
`;
export default IncomeItem
