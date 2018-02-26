import ReactDOM from 'react-dom';
import OptionsPage from './components/options-page';

import './style/index.scss';

const container = document.getElementById( 'ugb-unregister-gutenberg-blocks' );

if ( container ) {
	ReactDOM.render( <OptionsPage />, container );
}
