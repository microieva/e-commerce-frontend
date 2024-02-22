import { FC } from 'react';
import { CartItem } from '../../../@types/cart';
import { RecentItem } from './recent-item';
import { Link, Outlet } from 'react-router-dom';

interface Props {
    items: CartItem[]
}

const RecentItems:FC<Props> = ({items}) => {

    return (   
        <div className='items-wrapper'>
            <div className='items-grid'>
                <div className='items-title'><h3>Some of our customers most favorite items</h3></div>
                <div className='item1'>
                    <Link style={{textDecoration: "none", color: "black"}} to={`/products/${items[0]._id}`}>
                        <RecentItem item={items[0]} />
                    </Link>
                </div>
                <div className='item2'>
                    <Link style={{textDecoration: "none", color: "black"}} to={`/products/${items[1]._id}`}>
                        <RecentItem item={items[1]} />
                    </Link>
                </div>
                <div className='item3'>
                    <Link style={{textDecoration: "none", color: "black"}} to={`/products/${items[2]._id}`}>
                        <RecentItem item={items[2]} />
                    </Link>
                </div>
                <div className='item4'>
                    <Link style={{textDecoration: "none", color: "black"}} to={`/products/${items[3]._id}`}>
                        <RecentItem item={items[3]} />
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    ) 
}

export default RecentItems;