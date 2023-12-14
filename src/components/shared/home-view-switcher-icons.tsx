import { FC, useState } from 'react';

import TableRowsIcon from '@mui/icons-material/TableRows';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

interface SwitcherProps {
    switchView:(activeView: string)=>void
}

const HomeViewSwitcherIcons: FC<SwitcherProps> = ({ switchView }: SwitcherProps) => {
    const [activeView, setActiveView] = useState<string>('grid');

    const handleTableClick = () => {
        switchView('table');
        setActiveView('table');
    };

    const handleGridClick = () => {
        switchView('grid');
        setActiveView('grid');
    };

    return (
         <div className="icons-container">
            <GridViewIcon onClick={handleGridClick} className={activeView === 'grid' ? 'active-icon' : ''} />
            <TableRowsIcon onClick={handleTableClick} className={activeView === 'table' ? 'active-icon' : ''}/>
        </div>
    );
};

export default HomeViewSwitcherIcons;
