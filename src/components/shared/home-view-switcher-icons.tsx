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
          return window.innerWidth < 520
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
        <>
            {
                !mobileView ? 
                <div className='btn-group'>
                    <IconButton onClick={handleGridClick}>
                        <GridViewIcon className={activeView === 'grid' ? 'active-icon' : ''} />
                    </IconButton>
                    <IconButton onClick={handleTableClick}>
                        <TableRowsIcon className={activeView === 'table' ? 'active-icon' : ''}/>
                    </IconButton>
                </div>
                : 
                <div className='btn-group'>
                    {
                        activeView === 'grid' ? 
                            <IconButton onClick={handleClick}>
                                <GridViewIcon className={activeView === 'grid' ? 'active-icon' : ''} />
                            </IconButton>
                        :
                            <IconButton onClick={handleClick}>
                                <TableRowsIcon className={activeView === 'table' ? 'active-icon' : ''}/>
                            </IconButton>
                    }
                </div>

            }
        </>
    );
};

export default HomeViewSwitcherIcons;
