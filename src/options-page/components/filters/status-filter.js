import classNames from 'classnames';

const StatusFilter = ( props ) => {
	const { statuses, activeStatus } = props;

	const handleButtonClick = ( status ) => {
		props.updateActiveStatus( status );
	};

	return (
		<ul className="ugb-filters-status">
			{ statuses.map( status => {
				const statusButtonClasses = classNames( {
					'ugb-status-list-button': true,
					'is-active': status === activeStatus,
				} );

				return (
					<li key={ status } className="ugb-status-list-item">
						<button
							className={ statusButtonClasses }
							onClick={ () => {
								handleButtonClick( status );
							} }
						>
							{ status }
						</button>
					</li>
				);
			} ) }
		</ul>
	);
};

export default StatusFilter;
