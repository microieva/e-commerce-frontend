import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import { useGetMostRecentlyOrderedProductsQuery } from '../../redux/api-queries/product-queries';
import Button from '../shared/button';
import RecentItems from './inner-components/recent-items';
import { Subscribe } from './inner-components/subscribe';



const LandingView: FC = () => {
    const { data: items } = useGetMostRecentlyOrderedProductsQuery(undefined);
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    const [ admin, setAdmin ] = useState<boolean>(user?.role === 'ADMIN');
    const navigate = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        if (!token) {
            setAdmin(false);
        } else {
            setAdmin(user?.role === "ADMIN");
        }
       
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [token, user]);


    return (
        <div className='products-container'>    
            {admin ? 
                <div className='admin-shortcuts'>
                    <div  onClick={()=>navigate('/auth/profile')}><AccountCircleOutlinedIcon/><p>visit dashboard</p></div>
                    <div onClick={()=>navigate('/products/new')}><PlaylistAddOutlinedIcon/><p>add new product</p></div>
                    <div onClick={()=>navigate('/products')}><GridViewIcon/><p>view products</p></div>
                </div>
                :
                <div className='landing-view-wrapper'>
                    {items && <RecentItems items={items} />}
                    <Button 
                        width="80%"
                        height="4rem"
                        text="Browse Collection" 
                        onClick={()=>navigate('/products')}
                    />
                    <Subscribe />
                </div>
            }

        </div>
    ) 
}

export default LandingView;