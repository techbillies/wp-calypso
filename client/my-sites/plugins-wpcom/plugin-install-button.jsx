/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import { localize } from 'i18n-calypso';

export const WpcomPluginInstallButton = ( { translate, disabled } ) => {
	return <Button
		onClick={ undefined }
		primary={ true }
		type="submit"
		disabled={ disabled }
	>
		{ translate( 'Install' ) }
	</Button>;
};

export default localize( WpcomPluginInstallButton );
