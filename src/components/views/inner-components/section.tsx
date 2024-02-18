import { ChangeEvent, FC, useState } from 'react';
import TableView from '../products-table-view';
import SearchBar from '../../shared/search-bar';
import HomeViewSwitcherIcons from '../../shared/home-view-switcher-icons';
import CardsView from '../cards-view';


const Section: FC = () => {
    const [activeView, setActiveView] = useState<string>('grid');
    const [searchWord, setSearchWord] = useState<string>('');
    const [numberOfProducts, setNumberOfProducts] = useState<number>();

    const switchView = (activeView: string) => {
        setActiveView(activeView);
     }
     const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchWord(event.target.value);
      };

    return (
        <div style={{ width: "100%"}}>
            <div className='utilities-container'> 
                <SearchBar onSearchInputChange={handleSearchInputChange} />
                <HomeViewSwitcherIcons switchView={switchView}/>
                    <div style={{visibility: searchWord.toString() === "" ? 'hidden':'visible', marginLeft: "0.8rem"}}>
                        { 
                            numberOfProducts && numberOfProducts > 0 ?
                                <p style={{fontWeight:"900"}}>
                                    Searching for "{searchWord}": { 
                                        numberOfProducts>1 ?
                                            <span>found {numberOfProducts} products</span> 
                                            : 
                                            <span>found {numberOfProducts} product</span>
                                        }
                                </p> 
                                : 
                                <p style={{fontWeight:"900"}}>Searching for "{searchWord}": no results</p>
                        }
                    </div>
            </div>
            <div className='products-container'>
                {activeView === 'grid' && <CardsView searchWord={searchWord} setNumberOfProducts={setNumberOfProducts}/>}
                {activeView === 'table' && <TableView searchWord={searchWord} setNumberOfProducts={setNumberOfProducts}/>}
            </div>  
        </div>
    )
}

export default Section;