import { createFilter } from 'react-search-input';

import SingleBlock from './single-block';

const Blocks = ( props ) => {
	const { allBlocks, activeCategory, activeStatus, unregisteredBlocks, searchTerm, isDoingAjax } = props;

	// Keys to filter the blocks when we are using search form
	const KEYS_TO_FILTER = [ 'title', 'description', 'category' ];

	// filter based on the selected category
	const filterBlocksByCategory = ( blocksToFilter = [] ) => {
		if ( activeCategory !== 'ALL' && blocksToFilter.length !== 0 ) {
			return blocksToFilter.filter( block =>
				block.category === activeCategory.toLowerCase()
			);
		}
		return blocksToFilter;
	};

	// filter based on the currently selected status
	const filterBlocksByStatus = ( blocksToFilter = [] ) => {
		if ( activeStatus === 'ALL' ) {
			return blocksToFilter;
		} else if ( activeStatus === 'ENABLED' ) {
			return blocksToFilter.filter( block =>
				! unregisteredBlocks.includes( block.name )
			);
		} else if ( activeStatus === 'DISABLED' ) {
			return blocksToFilter.filter( block =>
				unregisteredBlocks.includes( block.name )
			);
		}
	};

	// Filter our blocks
	let filteredBlocks = allBlocks.filter( createFilter( searchTerm, KEYS_TO_FILTER ) );
	filteredBlocks = filterBlocksByCategory( filteredBlocks );
	filteredBlocks = filterBlocksByStatus( filteredBlocks );

	return (
		<ul className="ugb-cards">
			{ filteredBlocks.map( block => (
				<SingleBlock
					key={ block.name }
					block={ block }
					isDoingAjax={ isDoingAjax }
					unregisteredBlocks={ unregisteredBlocks }
					updateUnregisteredBlocksList={ props.updateUnregisteredBlocksList }
				/>
			) ) }
		</ul>
	);
};

export default Blocks;
