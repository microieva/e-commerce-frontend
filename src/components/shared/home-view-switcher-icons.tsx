import { FC, useEffect, useState } from 'react';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import { IconButton } from '@mui/material';

interface SwitcherProps {
    switchView:(activeView: string)=>void
}

const HomeViewSwitcherIcons: FC<SwitcherProps> = ({ switchView }: SwitcherProps) => {
    const [activeView, setActiveView] = useState<string>('grid');
    const [state, setState] = useState({mobileView: false});
    const { mobileView } = state;

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 700
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    
        return () => {
          window.removeEventListener("resize", () => setResponsiveness());
        }
      }, []);

    const handleTableClick = () => {
        switchView('table');
        setActiveView('table');
    };

    const handleGridClick = () => {
        switchView('grid');
        setActiveView('grid');
    };
    
    const handleClick = ()=> {
        if (activeView === 'grid') {
            switchView('table');
            setActiveView('table');
        } else {
            switchView('grid');
            setActiveView('grid');
        }
    }

    return (
        <div className='btn-group'>
            {
                !mobileView ? 
                <>
                    <IconButton onClick={handleGridClick} className={activeView === 'grid' ? 'active-icon' : ''}>
                        <GridViewIcon />
                    </IconButton>
                    <IconButton onClick={handleTableClick} className={activeView === 'table' ? 'active-icon' : ''}>
                        <TableRowsIcon />
                    </IconButton>
                </>
                : 
                <>
                    {
                        activeView === 'grid' ? 
                            <IconButton onClick={handleClick} className={activeView === 'grid' ? 'active-icon' : ''}>
                                <TableRowsIcon />
                            </IconButton>
                        :
                            <IconButton onClick={handleClick} className={activeView === 'table' ? 'active-icon' : ''}>
                                <GridViewIcon  />
                            </IconButton>
                    }
                </>

            }
        </div>
    );
};

export default HomeViewSwitcherIcons;
