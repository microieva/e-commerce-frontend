import { ChangeEvent, FC, useState } from 'react';
import TableView from '../products-table-view';
import SearchBar from '../../shared/search-bar';
import HomeViewSwitcherIcons from '../../shared/home-view-switcher-icons';
import CardsView from '../cards-view';


const Section: FC = () => {
    const [activeView, setActiveView] = useState<string>('grid');
    const [searchWord, setSearchWord] = useState<string>('');

    const switchView = (activeView: string) => {
        setActiveView(activeView)
     }
     const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchWord(event.target.value);
      };

    return (
        <div style={{ width: "100%"}}>
            <div className='utilities-container'>
                <SearchBar onSearchInputChange={handleSearchInputChange} />
                <HomeViewSwitcherIcons switchView={switchView}/>
            </div>
            <div className='products-container'>
                {activeView === 'grid' && <CardsView searchWord={searchWord}/>}
                {activeView === 'table' && <TableView searchWord={searchWord}/>}
            </div>  
        </div>
    )
}

export default Section;