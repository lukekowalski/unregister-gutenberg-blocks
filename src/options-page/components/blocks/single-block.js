import classNames from 'classnames';
const { Dashicon } = wp.components;

const SingleBlock = ( props ) => {
	const { title, name, icon, description } = props.block;
	const { unregisteredBlocks, isDoingAjax } = props;

	const handleButtonClick = ( blockName ) => {
		props.updateUnregisteredBlocksList( blockName );
	};

	const isUnregistered = unregisteredBlocks.includes( name );
	const blockStatus = isUnregistered ? 'Not active' : 'Active';
	const blockButtonText = isUnregistered ? 'Activate' : 'Deactivate';

	const cardStatusClass = classNames( {
		'ugb-card-status': true,
		'is-active': ! isUnregistered,
	} );

	const cardBodyClass = classNames( {
		'ugb-card-body': true,
		'is-active': ! isUnregistered,
	} );

	const buttonClass = classNames( {
		'ugb-card-button': true,
		'is-disabled': isDoingAjax,
		'is-unregistered': isUnregistered,
	} );

	return (
		<li className="ugb-card">
			<span className={ cardStatusClass }>
				<span className="screen-reader-text">{ blockStatus }</span>
			</span>

			<div className={ cardBodyClass }>
				<span className="ugb-card-icon">
					<Dashicon icon={ icon } size={ 30 } />
				</span>
				<p className="ugb-card-title">{ title }</p>
				<p className="ugb-card-description">{ description }</p>
			</div>

			<button
				disabled={ isDoingAjax }
				onClick={ () => handleButtonClick( name ) }
				className={ buttonClass }
			>
				{ blockButtonText }
			</button>
		</li>
	);
};

export default SingleBlock;
