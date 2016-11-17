/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import themes from './themes/reducer';
import themeDetails from './theme-details/reducer';
import themesList from './themes-list/reducer';
import currentTheme from './current-theme/reducer';
import themesUI from './themes-ui/reducer';
import { createReducer } from 'state/utils';
import {
	THEME_ACTIVATE_REQUEST_SUCCESS,
} from 'state/action-types';

export const activeThemes = createReducer( {}, {
	[ THEME_ACTIVATE_REQUEST_SUCCESS ]: ( state, { siteId, theme } ) => ( {
		...state,
		[ siteId ]: theme.id
	} )
} );

export default combineReducers( {
	themes,
	themeDetails,
	themesList,
	currentTheme,
	themesUI,
} );
