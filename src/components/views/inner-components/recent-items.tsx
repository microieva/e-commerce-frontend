import { FC } from 'react';
import { CartItem } from '../../../@types/cart';
import { RecentItem } from './recent-item';

interface Props {
    items: CartItem[]
}

const RecentItems:FC<Props> = ({items}) => {


    return (
        <div className='recent-items-wrapper'>
            {/* {products.map(item => {

            })} */}
            <div className='item1'>
                <RecentItem item={items[0]} />
            </div>
            <div className='item2'>
                <RecentItem item={items[1]} />
            </div>
            <div className='item3'>
                <RecentItem item={items[2]} />
            </div>
            <div className='item4'>
                <RecentItem item={items[3]} />
            </div>
        </div>
    ) 
}

export default RecentItems;