/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import {
	getSelectedSite,
	getSelectedSiteId
} from 'state/ui/selectors';
import { getSiteSlug } from 'state/sites/selectors';
import {
	isPremium,
	isBusiness,
	isEnterprise
} from 'lib/products-values';
import StandardPluginsPanel from './standard-plugins-panel';
import PremiumPluginsPanel from './premium-plugins-panel';
import BusinessPluginsPanel from './business-plugins-panel';
import PageViewTracker from 'lib/analytics/page-view-tracker';
import {
	defaultStandardPlugins,
	defaultPremiumPlugins,
	defaultBusinessPlugins
} from './default-plugins';

/*
 *replacements e.g. { siteSlug: 'mytestblog.wordpress.com', siteId: 12345 }
 */
const linkInterpolator = replacements => plugin => {
	const { descriptionLink: link } = plugin;
	const descriptionLink = Object
		.keys( replacements )
		.reduce(
			( s, r ) => s.replace( new RegExp( `{${ r }}` ), replacements[ r ] ),
			link
		);

	return { ...plugin, descriptionLink };
};

export const PluginPanel = ( {
	plan,
	siteSlug,
	translate,
} ) => {
	const standardPluginsLink = `/plugins/category/standard/${ siteSlug }`;
	const purchaseLink = `/plans/${ siteSlug }`;

	const hasBusiness = isBusiness( plan ) || isEnterprise( plan );
	const hasPremium = hasBusiness || isPremium( plan );

	const interpolateLink = linkInterpolator( { siteSlug } );

	const standardPlugins = defaultStandardPlugins.map( interpolateLink );
	const premiumPlugins = defaultPremiumPlugins.map( interpolateLink );
	const businessPlugins = defaultBusinessPlugins.map( interpolateLink );

	return (
		<div className="wpcom-plugin-panel">
			<PageViewTracker path="/plugins/:site" title="Plugins > WPCOM Site" />
			<Card compact className="plugins-wpcom__header">
				<div className="plugins-wpcom__header-text">
					<span className="plugins-wpcom__header-title">{ translate( 'Included Plugins' ) }</span>
					<span className="plugins-wpcom__header-subtitle">
						{ translate( 'Every plan includes a set of plugins specially tailored to supercharge your site.' ) }
					</span>
				</div>
				<img className="plugins-wpcom__header-image" src="/calypso/images/plugins/plugins_hero.svg" />
			</Card>
			<StandardPluginsPanel plugins={ standardPlugins } displayCount={ 9 } />
			<Card className="wpcom-plugin-panel__panel-footer" href={ standardPluginsLink }>
				{ translate( 'View all standard plugins' ) }
			</Card>
			<PremiumPluginsPanel plugins={ premiumPlugins } isActive={ hasPremium } { ...{ purchaseLink } } />
			<BusinessPluginsPanel plugins={ businessPlugins } isActive={ hasBusiness } { ...{ purchaseLink } } />
		</div>
	);
};

const mapStateToProps = state => ( {
	plan: get( getSelectedSite( state ), 'plan', {} ),
	siteSlug: getSiteSlug( state, getSelectedSiteId( state ) )
} );

export default connect( mapStateToProps )( localize( PluginPanel ) );
