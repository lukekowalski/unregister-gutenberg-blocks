import classNames from 'classnames';

const CategoryFilter = ( props ) => {
	const { categories, activeCategory } = props;

	const handleButtonClick = ( category ) => {
		props.updateActiveCategory( category );
	};

	return (
		<ul className="ugb-filters-category-list">

			{ categories.map( category => {
				const categoryButtonClass = classNames( {
					'ugb-category-button': true,
					'is-active': category === activeCategory,
				} );

				return (
					<li key={ category } className="ugb-category-item">
						<button
							className={ categoryButtonClass }
							onClick={ () => {
								handleButtonClick( category );
							} }
						>
							{ category }
						</button>
					</li>
				);
			} ) }

		</ul>
	);
};

export default CategoryFilter;
