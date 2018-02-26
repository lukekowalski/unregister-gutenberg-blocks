const { __ } = wp.i18n;
import SearchInput from 'react-search-input';

import CategoryFilter from './category-filter';
import StatusFilter from './status-filter';

const Filters = ( props ) => {
	const { categories, activeCategory, statuses, activeStatus } = props;
	const { updateSearch, updateActiveCategory, updateActiveStatus } = props;

	return (
		<div className="ugb-filters">

			<div className="ugb-filters-top">

				<div className="ugb-filters-category">
					<span className="ugb-category-label">{ __( 'Block types:' ) }</span>
					<CategoryFilter
						categories={ categories }
						activeCategory={ activeCategory }
						updateActiveCategory={ updateActiveCategory }
					/>
				</div>

				<SearchInput className="ugb-filters-search" onChange={ updateSearch } placeholder="Find a block..." />
			</div>

			<div className="ugb-filters-bottom">
				<span className="filter-label">{ __( 'Status:' ) }</span>
				<StatusFilter
					statuses={ statuses }
					activeStatus={ activeStatus }
					updateActiveStatus={ updateActiveStatus }
				/>
			</div>

		</div>
	);
};

export default Filters;
