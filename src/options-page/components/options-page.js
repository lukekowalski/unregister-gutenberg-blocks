import { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import { blocksList as allBlocks, blocksCategories as categories, statuses } from '../data/blocks';
import Filters from './filters/filters';
import Blocks from './blocks/blocks';

class OptionsPage extends Component {
	constructor() {
		super();
		this.state = {
			allBlocks: [],
			unregisteredBlocks: [],
			categories: [],
			activeCategory: 'ALL',
			statuses: [],
			activeStatus: 'ALL',
			searchTerm: '',
			isDoingAjax: false,
		};
		this.updateSearch = this.updateSearch.bind( this );
		this.updateActiveStatus = this.updateActiveStatus.bind( this );
		this.updateActiveCategory = this.updateActiveCategory.bind( this );
		this.updateUnregisteredBlocksList = this.updateUnregisteredBlocksList.bind( this );
	}

	componentDidMount() {
		let listOfUnregisteredBlocks = ugbGlobals.unregisteredBlocks;
		// If we are recieving an object 
		// let's convert it into an array 
		if ( ! listOfUnregisteredBlocks.length ) {
			listOfUnregisteredBlocks =
				Object.keys( listOfUnregisteredBlocks ).map( key => listOfUnregisteredBlocks[ key ] );
		}

		// Set the initial state of the app
		this.setState( {
			allBlocks,
			categories,
			statuses,
			unregisteredBlocks: listOfUnregisteredBlocks,
		} );
	}

	updateUnregisteredBlocksList( currentBlock ) {
		this.setState( { isDoingAjax: ! this.state.isDoingAjax } );
		const unregistered = [ ...this.state.unregisteredBlocks ];
		const data = {
			action: 'ugb_update_options',
			block: currentBlock,
		};

		if ( ! unregistered.includes( currentBlock ) ) {
			// Add current block to nregistered blocks list
			this.setState( prevState => ( {
				unregisteredBlocks: [ ...prevState.unregisteredBlocks, currentBlock ],
			} ) );
		} else {
			// Remove current block to unregistered blocks list
			this.setState( prevState => ( {
				unregisteredBlocks: prevState.unregisteredBlocks.filter( oldBlock => oldBlock !== currentBlock ),
			} ) );
		}

		// Push it to the server
		axios.post( ugbGlobals.ajaxURL, qs.stringify( data ) )
			.then( () => this.setState( { isDoingAjax: ! this.state.isDoingAjax } ) )
			.catch( () => this.setState( { unregisteredBlocks: unregistered } ) );
	}

	updateActiveCategory( newCategoryName ) {
		this.setState( { activeCategory: newCategoryName } );
	}

	updateActiveStatus( newStatusName ) {
		this.setState( { activeStatus: newStatusName } );
	}

	updateSearch( term ) {
		this.setState( { searchTerm: term } );
	}

	render() {
		return (
			<div className="ugb-body">
				<Filters
					{ ...this.state }
					updateSearch={ this.updateSearch }
					updateActiveCategory={ this.updateActiveCategory }
					updateActiveStatus={ this.updateActiveStatus }
				/>
				<Blocks
					{ ...this.state }
					updateUnregisteredBlocksList={ this.updateUnregisteredBlocksList }
				/>
			</div>
		);
	}
}

export default OptionsPage;
