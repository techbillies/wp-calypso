/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	OLARK_READY,
	OLARK_REQUEST,
	OLARK_TIMEOUT,
	OLARK_OPERATORS_AVAILABLE,
	OLARK_OPERATORS_AWAY
} from 'state/action-types';
import useMockery from 'test/helpers/use-mockery';
import { OLARK_TIMEOUT_MS } from '../constants';
import { useSandbox } from 'test/helpers/use-sinon';
import { useFakeTimers } from 'test/helpers/use-sinon';
import {
	operatorsAvailable,
	operatorsAway
} from '../actions';

describe( 'actions', () => {
	let olarkTimeout, olarkReady, requestOlark, sandbox, spy, clock, callOlarkReady = false;

	const olarkApiMock = function( event, callback ) {
		if ( callOlarkReady ) {
			callback();
		}
	};

	useSandbox( newSandbox => {
		sandbox = newSandbox;
		spy = sandbox.spy();
	} );

	useFakeTimers( fakeClock => {
		clock = fakeClock;
	} );

	useMockery( ( mockery ) => {
		mockery.registerMock( 'lib/olark-api', olarkApiMock );
		const olarkActions = require( '../actions' );
		olarkTimeout = olarkActions.olarkTimeout;
		olarkReady = olarkActions.olarkReady;
		requestOlark = olarkActions.requestOlark;
	} );

	describe( '#olarkTimeout()', () => {
		it( 'should return an action object', () => {
			const action = olarkTimeout();
			expect( action ).to.eql( {
				type: OLARK_TIMEOUT
			} );
		} );
	} );

	describe( '#olarkReady()', () => {
		it( 'should return an action object', () => {
			const action = olarkReady();
			expect( action ).to.eql( {
				type: OLARK_READY
			} );
		} );
	} );

	describe( '#operatorsAway()', () => {
		it( 'should return an action object', () => {
			const action = operatorsAway();
			expect( action ).to.eql( {
				type: OLARK_OPERATORS_AWAY
			} );
		} );
	} );

	describe( '#operatorsAvailable()', () => {
		it( 'should return an action object', () => {
			const action = operatorsAvailable();
			expect( action ).to.eql( {
				type: OLARK_OPERATORS_AVAILABLE
			} );
		} );
	} );

	describe( '#requestOlark()', () => {
		it( 'should dispatch request action when thunk triggered', () => {
			requestOlark()( spy );
			clock.tick( OLARK_TIMEOUT_MS );
			expect( spy ).to.have.been.calledWith( {
				type: OLARK_REQUEST
			} );
		} );

		it( 'should dispatch timeout action olark fails to load', () => {
			requestOlark()( spy );
			clock.tick( OLARK_TIMEOUT_MS );
			expect( spy ).to.have.been.calledWith( {
				type: OLARK_TIMEOUT
			} );
		} );

		describe( 'on olark load', () => {
			before( () => {
				callOlarkReady = true;
			} );
			after( () => {
				callOlarkReady = false;
			} );
			it( 'should dispatch ready action when olark loads', () => {
				return requestOlark()( spy ).then( () => {
					expect( spy ).to.have.been.calledWith( {
						type: OLARK_READY
					} );
				} );
			} );
		} );
	} );
} );
