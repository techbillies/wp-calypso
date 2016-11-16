/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { merge } from 'lodash';

/**
 * Internal dependencies
 */
import {
	JETPACK_MODULE_ACTIVATE,
	JETPACK_MODULE_ACTIVATE_FAILURE,
	JETPACK_MODULE_ACTIVATE_SUCCESS,
	JETPACK_MODULE_DEACTIVATE,
	JETPACK_MODULE_DEACTIVATE_FAILURE,
	JETPACK_MODULE_DEACTIVATE_SUCCESS,
	JETPACK_MODULE_LIST_REQUEST,
	JETPACK_MODULE_LIST_REQUEST_FAILURE,
	JETPACK_MODULE_LIST_REQUEST_SUCCESS
} from 'state/action-types';
import { createReducer } from 'state/utils';

const createItemsReducer = ( active ) => {
	return ( state, { siteId, moduleSlug } ) => {
		return merge( {}, state, {
			[ siteId ]: {
				[ moduleSlug ]: {
					active
				}
			}
		} );
	};
};

const createItemsListReducer = () => {
	return ( state, { siteId, modules } ) => {
		return merge( {}, state, {
			[ siteId ]: modules
		} );
	};
};

const createRequestsReducer = ( data ) => {
	return ( state, { siteId, moduleSlug } ) => {
		return merge( {}, state, {
			[ siteId ]: {
				[ moduleSlug ]: data
			}
		} );
	};
};

const createModuleListRequestReducer = ( data ) => {
	return ( state, { siteId } ) => {
		return merge( {}, state, {
			[ siteId ]: data
		} );
	};
};

/**
 * `Reducer` function which handles request/response actions
 * concerning Jetpack modules data updates
 *
 * @param  {Array}  state  Current state
 * @param  {Object} action action
 * @return {Array}         Updated state
 */
export const items = createReducer( {}, {
	[ JETPACK_MODULE_ACTIVATE_SUCCESS ]: createItemsReducer( true ),
	[ JETPACK_MODULE_DEACTIVATE_SUCCESS ]: createItemsReducer( false ),
	[ JETPACK_MODULE_LIST_REQUEST_SUCCESS ]: createItemsListReducer()
} );

/**
 * `Reducer` function which handles request/response actions
 * concerning Jetpack modules-related requests
 *
 * @param {Object} state - current state
 * @param {Object} action - action
 * @return {Object} updated state
 */
export const requests = createReducer( {}, {
	[ JETPACK_MODULE_ACTIVATE ]: createRequestsReducer( { activating: true } ),
	[ JETPACK_MODULE_ACTIVATE_FAILURE ]: createRequestsReducer( { activating: false } ),
	[ JETPACK_MODULE_ACTIVATE_SUCCESS ]: createRequestsReducer( { activating: false } ),
	[ JETPACK_MODULE_DEACTIVATE ]: createRequestsReducer( { deactivating: true } ),
	[ JETPACK_MODULE_DEACTIVATE_FAILURE ]: createRequestsReducer( { deactivating: false } ),
	[ JETPACK_MODULE_DEACTIVATE_SUCCESS ]: createRequestsReducer( { deactivating: false } ),
	[ JETPACK_MODULE_LIST_REQUEST ]: createModuleListRequestReducer( { isFetchingModuleList: true } ),
	[ JETPACK_MODULE_LIST_REQUEST_FAILURE ]: createModuleListRequestReducer( { isFetchingModuleList: false } ),
	[ JETPACK_MODULE_LIST_REQUEST_SUCCESS ]: createModuleListRequestReducer( { isFetchingModuleList: false } )
} );

export const reducer = combineReducers( {
	items,
	requests
} );
