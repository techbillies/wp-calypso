/**
 * External dependencies
 */
import keyBy from 'lodash/keyBy';

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
import wp from 'lib/wp';

export const activateModule = ( siteId, moduleSlug ) => {
	return ( dispatch ) => {
		dispatch( {
			type: JETPACK_MODULE_ACTIVATE,
			siteId,
			moduleSlug
		} );

		return wp.undocumented().jetpackModulesActivate( siteId, moduleSlug )
			.then( () => {
				dispatch( {
					type: JETPACK_MODULE_ACTIVATE_SUCCESS,
					siteId,
					moduleSlug
				} );
			} ).catch( error => {
				dispatch( {
					type: JETPACK_MODULE_ACTIVATE_FAILURE,
					siteId,
					moduleSlug,
					error: error.message
				} );
			} );
	};
};

export const deactivateModule = ( siteId, moduleSlug ) => {
	return ( dispatch ) => {
		dispatch( {
			type: JETPACK_MODULE_DEACTIVATE,
			siteId,
			moduleSlug
		} );

		return wp.undocumented().jetpackModulesDeactivate( siteId, moduleSlug )
			.then( () => {
				dispatch( {
					type: JETPACK_MODULE_DEACTIVATE_SUCCESS,
					siteId,
					moduleSlug
				} );
			} ).catch( error => {
				dispatch( {
					type: JETPACK_MODULE_DEACTIVATE_FAILURE,
					siteId,
					moduleSlug,
					error: error.message
				} );
			} );
	};
};

export const fetchModuleList = ( siteId ) => {
	return ( dispatch ) => {
		dispatch( {
			type: JETPACK_MODULE_LIST_REQUEST,
			siteId
		} );

		return wp.undocumented().jetpackModules( siteId )
			.then( ( data ) => {
				const modules = keyBy( data.modules, 'id' );
				dispatch( {
					type: JETPACK_MODULE_LIST_REQUEST_SUCCESS,
					siteId,
					modules
				} );
			} ).catch( error => {
				dispatch( {
					type: JETPACK_MODULE_LIST_REQUEST_FAILURE,
					siteId,
					error: error.message
				} );
			} );
	};
};
