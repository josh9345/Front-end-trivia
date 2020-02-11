(function() {
  window.blocks = {
    coub: {},
    clientsideTimeline: {}
  };

  window.channels = {};

  window.pages = {};

  window.pages.bestCoubs2013 = {};

  window.pages.bestCoubs2014 = {};

  window.pages.bestCoubs2015 = {};

  window.pages.bestCoubs2016 = {};

  window.pages.bestCoubs2012 = {};

  window.pages.bestCoubs2017 = {};

  window.pages.bestCoubs2018 = {};

  window.pages.bestCoubs2019 = {};

  window.pages.profile = {
    view: {},
    promo: {}
  };

  window.pages.tags = {};

  window.pages.dev_docs = {};

  window.pages.newEditorPromo = {};

  window.pages.findFriends = {};

  window.pages.editAccount = {};

  window.pages.hotPage = {};

  window.widgets = {
    player: {},
    timeline: {},
    transliteration: {},
    hints: {}
  };

  window.siteData = {};

  window.dataProviders = {};

  window.coubEditor = {
    data: {
      typeMatchers: {}
    },
    utils: {},
    widgets: {},
    helpers: {},
    serializers: {},
    functions: {},
    flash: {},
    stateMachines: {},
    animators: {},
    logic: {},
    mixins: {},
    modules: {},
    initializers: {}
  };

  window.helpers = {};

  window.mobile = {
    navigations: {},
    modules: {}
  };

  window.utils = {};

  window.functions = {};

  window.mobilePlayer = {};

  window.html5Player = {};

  window.siteAdmin = {
    moderation: {},
    widgets: {}
  };

  window.initializers = {};

  window.abstract = {};

  window.Banners = {};

}).call(this);
/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */

(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.7.1",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

return jQuery;

})();


// String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!memory;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		fragment,
		tds,
		events,
		eventName,
		i,
		isSupported,
		div = document.createElement( "div" ),
		documentElement = document.documentElement;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( window.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.style.width = "2px";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	fragment.removeChild( div );

	// Null elements to avoid leaks in IE
	fragment = select = opt = marginDiv = div = input = null;

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			conMarginTop, ptlm, vb, style, html,
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		conMarginTop = 1;
		ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;";
		vb = "visibility:hidden;border:0;";
		style = "style='" + ptlm + "border:5px solid #000;padding:0;'";
		html = "<div " + style + "><div></div></div>" +
			"<table " + style + " cellpadding='0' cellspacing='0'>" +
			"<tr><td></td></tr></table>";

		container = document.createElement("div");
		container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName( "td" );
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Figure out if the W3C box model works as expected
		div.innerHTML = "";
		div.style.width = div.style.paddingLeft = "1px";
		jQuery.boxModel = support.boxModel = div.offsetWidth === 2;

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
		}

		div.style.cssText = ptlm + vb;
		div.innerHTML = html;

		outer = div.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		body.removeChild( container );
		div  = container = null;

		jQuery.extend( support, offsetSupport );
	});

	return support;
})();




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ internalKey ] : internalKey;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, attr, name,
			data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 && !jQuery._data( this[0], "parsedAttrs" ) ) {
					attr = this[0].attributes;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
					jQuery._data( this[0], "parsedAttrs", true );
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var self = jQuery( this ),
					args = [ parts[0], value ];

				self.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;

					// See #9699 for explanation of this approach (setting first, then removal)
					jQuery.attr( elem, name, "" );
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( rboolean.test( name ) && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	// Apply the nodeHook to tabindex
	jQuery.attrHooks.tabindex.set = nodeHook.set;

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /\bhover(\.\S+)?\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3
			// [ _, tag, id, class ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		var attrs = elem.attributes || {};
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || (attrs.id || {}).value === m[2]) &&
			(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				quick: quickParse( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, origType, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			old = null;
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			handlerQueue = [],
			i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Determine handlers that should run if there are delegated events
		// Avoid disabled elements in IE (#6911) and non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this.ownerDocument || this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				jqcur[0] = cur;
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;

					if ( selMatch[ sel ] === undefined ) {
						selMatch[ sel ] = (
							handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
						);
					}
					if ( selMatch[ sel ] ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				ret;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						// If form was submitted by the user, bubble the event up the tree
						if ( this.parentNode && !event.isTrigger ) {
							jQuery.event.simulate( "submit", this.parentNode, event, true );
						}
					});
					form._submit_attached = true;
				}
			});
			// return undefined since we don't need an event listener
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace? handleObj.type + "." + handleObj.namespace : handleObj.type,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					doneName = match[0];
					parent = elem.parentNode;
	
					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent[ expando ] = doneName;
					}
					
					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && ( 
			typeof selector === "string" ?
				// If this is a positional selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				POS.test( selector ) ? 
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];
		
		// Array (deprecated as of jQuery 1.7)
		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")", "i"),
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	// Skip scripts, get other children
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
function shimCloneNode( elem ) {
	var div = document.createElement( "div" );
	safeFragment.appendChild( div );

	div.innerHTML = elem.outerHTML;
	return div.firstChild;
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			// IE<=8 does not properly clone detached, unknown element nodes
			clone = jQuery.support.html5Clone || !rnoshimcache.test( "<" + elem.nodeName ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^([\-+])=([\-+.\de]+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( (defaultView = elem.ownerDocument.defaultView) &&
				(computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret === null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ( ret || 0 );
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight,
		i = 0,
		len = which.length;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			for ( ; i < len; i++ ) {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
				}
			}
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		for ( ; i < len; i++ ) {
			val += parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
			}
		}
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for ( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if ( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css(elem, "display") === "none" ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var index,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, index ) {
				var hooks = data[ index ];
				jQuery.removeData( elem, index, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
						stopQueue( this, data, index );
					}
				}
			} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
				stopQueue( this, data, index );
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					if ( gotoEnd ) {

						// force the next step to be the last
						timers[ index ]( true );
					} else {
						timers[ index ].saveState();
					}
					hadTimers = true;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( self.options.hide && jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				jQuery._data( self.elem, "fxshow" + self.prop, self.start );
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	// Simple 'show' function
	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any flash of content
		if ( dataShow !== undefined ) {
			// This show is picking up where a previous hide or show left off
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom( this.cur(), 0 );
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						// Toggle data is no longer needed
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}

				// Execute the complete function
				// in the event that the complete function throws an exception
				// we must ensure it won't be called twice. #5684

				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

// Adds width/height step functions
// Do not set anything below 0
jQuery.each([ "width", "height" ], function( i, prop ) {
	jQuery.fx.step[ prop ] = function( fx ) {
		jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
	};
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ],
				body = elem.document.body;
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				body && body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNumeric( ret ) ? ret : orig;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});




// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}



})( window );
/*
File generated by js-routes 1.4.3
Based on Rails routes of Cobb::Application
 */

(function() {
  var DeprecatedBehavior, NodeTypes, ParameterMissing, ReservedOptions, SpecialOptionsKey, Utils, root,
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  ParameterMissing = function(message) {
    this.message = message;
  };

  ParameterMissing.prototype = new Error();

  NodeTypes = {"GROUP":1,"CAT":2,"SYMBOL":3,"OR":4,"STAR":5,"LITERAL":6,"SLASH":7,"DOT":8};

  SpecialOptionsKey = "_options";

  DeprecatedBehavior = false;

  ReservedOptions = ['anchor', 'trailing_slash', 'subdomain', 'host', 'port', 'protocol'];

  Utils = {
    configuration: {
      prefix: "",
      default_url_options: {"host":"coub.com","protocol":"https"},
      special_options_key: "_options",
      serializer: null
    },
    default_serializer: function(object, prefix) {
      var element, i, j, key, len, prop, s;
      if (prefix == null) {
        prefix = null;
      }
      if (object == null) {
        return "";
      }
      if (!prefix && !(this.get_object_type(object) === "object")) {
        throw new Error("Url parameters should be a javascript hash");
      }
      s = [];
      switch (this.get_object_type(object)) {
        case "array":
          for (i = j = 0, len = object.length; j < len; i = ++j) {
            element = object[i];
            s.push(this.default_serializer(element, prefix + "[]"));
          }
          break;
        case "object":
          for (key in object) {
            if (!hasProp.call(object, key)) continue;
            prop = object[key];
            if ((prop == null) && (prefix != null)) {
              prop = "";
            }
            if (prop != null) {
              if (prefix != null) {
                key = prefix + "[" + key + "]";
              }
              s.push(this.default_serializer(prop, key));
            }
          }
          break;
        default:
          if (object != null) {
            s.push((encodeURIComponent(prefix.toString())) + "=" + (encodeURIComponent(object.toString())));
          }
      }
      if (!s.length) {
        return "";
      }
      return s.join("&");
    },
    serialize: function(object) {
      var custom_serializer;
      custom_serializer = this.configuration.serializer;
      if ((custom_serializer != null) && this.get_object_type(custom_serializer) === "function") {
        return custom_serializer(object);
      } else {
        return this.default_serializer(object);
      }
    },
    clean_path: function(path) {
      var last_index;
      path = path.split("://");
      last_index = path.length - 1;
      path[last_index] = path[last_index].replace(/\/+/g, "/");
      return path.join("://");
    },
    extract_options: function(number_of_params, args) {
      var last_el, options;
      last_el = args[args.length - 1];
      if ((args.length > number_of_params && last_el === void 0) || ((last_el != null) && "object" === this.get_object_type(last_el) && !this.looks_like_serialized_model(last_el))) {
        options = args.pop() || {};
        delete options[this.configuration.special_options_key];
        return options;
      } else {
        return {};
      }
    },
    looks_like_serialized_model: function(object) {
      return !object[this.configuration.special_options_key] && ("id" in object || "to_param" in object);
    },
    path_identifier: function(object) {
      var property;
      if (object === 0) {
        return "0";
      }
      if (!object) {
        return "";
      }
      property = object;
      if (this.get_object_type(object) === "object") {
        if ("to_param" in object) {
          if (object.to_param == null) {
            throw new ParameterMissing("Route parameter missing: to_param");
          }
          property = object.to_param;
        } else if ("id" in object) {
          if (object.id == null) {
            throw new ParameterMissing("Route parameter missing: id");
          }
          property = object.id;
        } else {
          property = object;
        }
        if (this.get_object_type(property) === "function") {
          property = property.call(object);
        }
      }
      return property.toString();
    },
    clone: function(obj) {
      var attr, copy, key;
      if ((obj == null) || "object" !== this.get_object_type(obj)) {
        return obj;
      }
      copy = obj.constructor();
      for (key in obj) {
        if (!hasProp.call(obj, key)) continue;
        attr = obj[key];
        copy[key] = attr;
      }
      return copy;
    },
    merge: function() {
      var tap, xs;
      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      tap = function(o, fn) {
        fn(o);
        return o;
      };
      if ((xs != null ? xs.length : void 0) > 0) {
        return tap({}, function(m) {
          var j, k, len, results, v, x;
          results = [];
          for (j = 0, len = xs.length; j < len; j++) {
            x = xs[j];
            results.push((function() {
              var results1;
              results1 = [];
              for (k in x) {
                v = x[k];
                results1.push(m[k] = v);
              }
              return results1;
            })());
          }
          return results;
        });
      }
    },
    normalize_options: function(parts, required_parts, default_options, actual_parameters) {
      var i, j, key, len, options, part, parts_options, result, route_parts, url_parameters, use_all_parts, value;
      options = this.extract_options(parts.length, actual_parameters);
      if (actual_parameters.length > parts.length) {
        throw new Error("Too many parameters provided for path");
      }
      use_all_parts = DeprecatedBehavior || actual_parameters.length > required_parts.length;
      parts_options = {};
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        use_all_parts = true;
        if (this.indexOf(parts, key) >= 0) {
          parts_options[key] = value;
        }
      }
      options = this.merge(this.configuration.default_url_options, default_options, options);
      result = {};
      url_parameters = {};
      result['url_parameters'] = url_parameters;
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        value = options[key];
        if (this.indexOf(ReservedOptions, key) >= 0) {
          result[key] = value;
        } else {
          url_parameters[key] = value;
        }
      }
      route_parts = use_all_parts ? parts : required_parts;
      i = 0;
      for (j = 0, len = route_parts.length; j < len; j++) {
        part = route_parts[j];
        if (i < actual_parameters.length) {
          if (!parts_options.hasOwnProperty(part)) {
            url_parameters[part] = actual_parameters[i];
            ++i;
          }
        }
      }
      return result;
    },
    build_route: function(parts, required_parts, default_options, route, full_url, args) {
      var options, parameters, result, url, url_params;
      args = Array.prototype.slice.call(args);
      options = this.normalize_options(parts, required_parts, default_options, args);
      parameters = options['url_parameters'];
      result = "" + (this.get_prefix()) + (this.visit(route, parameters));
      url = Utils.clean_path(result);
      if (options['trailing_slash'] === true) {
        url = url.replace(/(.*?)[\/]?$/, "$1/");
      }
      if ((url_params = this.serialize(parameters)).length) {
        url += "?" + url_params;
      }
      url += options.anchor ? "#" + options.anchor : "";
      if (full_url) {
        url = this.route_url(options) + url;
      }
      return url;
    },
    visit: function(route, parameters, optional) {
      var left, left_part, right, right_part, type, value;
      if (optional == null) {
        optional = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return this.visit(left, parameters, true);
        case NodeTypes.STAR:
          return this.visit_globbing(left, parameters, true);
        case NodeTypes.LITERAL:
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
          return left;
        case NodeTypes.CAT:
          left_part = this.visit(left, parameters, optional);
          right_part = this.visit(right, parameters, optional);
          if (optional && ((this.is_optional_node(left[0]) && !left_part) || ((this.is_optional_node(right[0])) && !right_part))) {
            return "";
          }
          return "" + left_part + right_part;
        case NodeTypes.SYMBOL:
          value = parameters[left];
          if (value != null) {
            delete parameters[left];
            return this.path_identifier(value);
          }
          if (optional) {
            return "";
          } else {
            throw new ParameterMissing("Route parameter missing: " + left);
          }
          break;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    is_optional_node: function(node) {
      return this.indexOf([NodeTypes.STAR, NodeTypes.SYMBOL, NodeTypes.CAT], node) >= 0;
    },
    build_path_spec: function(route, wildcard) {
      var left, right, type;
      if (wildcard == null) {
        wildcard = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return "(" + (this.build_path_spec(left)) + ")";
        case NodeTypes.CAT:
          return "" + (this.build_path_spec(left)) + (this.build_path_spec(right));
        case NodeTypes.STAR:
          return this.build_path_spec(left, true);
        case NodeTypes.SYMBOL:
          if (wildcard === true) {
            return "" + (left[0] === '*' ? '' : '*') + left;
          } else {
            return ":" + left;
          }
          break;
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
        case NodeTypes.LITERAL:
          return left;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    visit_globbing: function(route, parameters, optional) {
      var left, right, type, value;
      type = route[0], left = route[1], right = route[2];
      if (left.replace(/^\*/i, "") !== left) {
        route[1] = left = left.replace(/^\*/i, "");
      }
      value = parameters[left];
      if (value == null) {
        return this.visit(route, parameters, optional);
      }
      parameters[left] = (function() {
        switch (this.get_object_type(value)) {
          case "array":
            return value.join("/");
          default:
            return value;
        }
      }).call(this);
      return this.visit(route, parameters, optional);
    },
    get_prefix: function() {
      var prefix;
      prefix = this.configuration.prefix;
      if (prefix !== "") {
        prefix = (prefix.match("/$") ? prefix : prefix + "/");
      }
      return prefix;
    },
    route: function(parts_table, default_options, route_spec, full_url) {
      var j, len, part, parts, path_fn, ref, required, required_parts;
      required_parts = [];
      parts = [];
      for (j = 0, len = parts_table.length; j < len; j++) {
        ref = parts_table[j], part = ref[0], required = ref[1];
        parts.push(part);
        if (required) {
          required_parts.push(part);
        }
      }
      path_fn = function() {
        return Utils.build_route(parts, required_parts, default_options, route_spec, full_url, arguments);
      };
      path_fn.required_params = required_parts;
      path_fn.toString = function() {
        return Utils.build_path_spec(route_spec);
      };
      return path_fn;
    },
    route_url: function(route_defaults) {
      var hostname, port, protocol, subdomain;
      if (typeof route_defaults === 'string') {
        return route_defaults;
      }
      hostname = route_defaults.host || Utils.current_host();
      if (!hostname) {
        return '';
      }
      subdomain = route_defaults.subdomain ? route_defaults.subdomain + '.' : '';
      protocol = route_defaults.protocol || Utils.current_protocol();
      port = route_defaults.port || (!route_defaults.host ? Utils.current_port() : void 0);
      port = port ? ":" + port : '';
      return protocol + "://" + subdomain + hostname + port;
    },
    has_location: function() {
      return (typeof window !== "undefined" && window !== null ? window.location : void 0) != null;
    },
    current_host: function() {
      if (this.has_location()) {
        return window.location.hostname;
      } else {
        return null;
      }
    },
    current_protocol: function() {
      if (this.has_location() && window.location.protocol !== '') {
        return window.location.protocol.replace(/:$/, '');
      } else {
        return 'http';
      }
    },
    current_port: function() {
      if (this.has_location() && window.location.port !== '') {
        return window.location.port;
      } else {
        return '';
      }
    },
    _classToTypeCache: null,
    _classToType: function() {
      var j, len, name, ref;
      if (this._classToTypeCache != null) {
        return this._classToTypeCache;
      }
      this._classToTypeCache = {};
      ref = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
      for (j = 0, len = ref.length; j < len; j++) {
        name = ref[j];
        this._classToTypeCache["[object " + name + "]"] = name.toLowerCase();
      }
      return this._classToTypeCache;
    },
    get_object_type: function(obj) {
      if (root.jQuery && (root.jQuery.type != null)) {
        return root.jQuery.type(obj);
      }
      if (obj == null) {
        return "" + obj;
      }
      if (typeof obj === "object" || typeof obj === "function") {
        return this._classToType()[Object.prototype.toString.call(obj)] || "object";
      } else {
        return typeof obj;
      }
    },
    indexOf: function(array, element) {
      if (Array.prototype.indexOf) {
        return array.indexOf(element);
      } else {
        return this.indexOfImplementation(array, element);
      }
    },
    indexOfImplementation: function(array, element) {
      var el, i, j, len, result;
      result = -1;
      for (i = j = 0, len = array.length; j < len; i = ++j) {
        el = array[i];
        if (el === element) {
          result = i;
        }
      }
      return result;
    },
    namespace: function(root, namespace, routes) {
      var index, j, len, part, parts;
      parts = namespace.split(".");
      if (parts.length === 0) {
        return routes;
      }
      for (index = j = 0, len = parts.length; j < len; index = ++j) {
        part = parts[index];
        if (index < parts.length - 1) {
          root = (root[part] || (root[part] = {}));
        } else {
          return root[part] = routes;
        }
      }
    },
    configure: function(new_config) {
      return this.configuration = this.merge(this.configuration, new_config);
    },
    config: function() {
      return this.clone(this.configuration);
    },
    make: function() {
      var routes;
      routes = {
// about_page => /about
  // function(options)
  about_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"about",false]]),
about_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"about",false]], true),
// account_settings => /account/edit(.:format)
  // function(options)
  account_settings_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"account",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
account_settings_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"account",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ad_coub_api_v2_promoted_coubs => /api/v2/promoted_coubs/ad_coub(.:format)
  // function(options)
  ad_coub_api_v2_promoted_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[6,"ad_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ad_coub_api_v2_promoted_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[6,"ad_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// add_android_device_token_api_v2_users => /api/v2/users/add_android_device_token(.:format)
  // function(options)
  add_android_device_token_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"add_android_device_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
add_android_device_token_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"add_android_device_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// add_audio_track_api_v2_coub => /api/v2/coubs/:id/add_audio_track(.:format)
  // function(id, options)
  add_audio_track_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"add_audio_track",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
add_audio_track_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"add_audio_track",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// add_auth_api_v2_channels => /api/v2/channels/add_auth(.:format)
  // function(options)
  add_auth_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"add_auth",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
add_auth_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"add_auth",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// add_device_token_api_v2_users => /api/v2/users/add_device_token(.:format)
  // function(options)
  add_device_token_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"add_device_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
add_device_token_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"add_device_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// add_search_tags_editor_coub => /editor/coubs/:id/add_search_tags(.:format)
  // function(id, options)
  add_search_tags_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"add_search_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
add_search_tags_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"add_search_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// add_to_editorial_channels_editor_coub => /editor/coubs/:id/add_to_editorial_channels(.:format)
  // function(id, options)
  add_to_editorial_channels_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"add_to_editorial_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
add_to_editorial_channels_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"add_to_editorial_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin => /admin(.:format)
  // function(options)
  admin_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
admin_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// admin_applications => /admin/applications(.:format)
  // function(options)
  admin_applications_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_applications_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_audio_copyright_claim => /admin/audio_copyright_claims/:id(.:format)
  // function(id, options)
  admin_audio_copyright_claim_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_copyright_claims",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_audio_copyright_claim_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_copyright_claims",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_audio_copyright_claims => /admin/audio_copyright_claims(.:format)
  // function(options)
  admin_audio_copyright_claims_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_copyright_claims",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_audio_copyright_claims_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_copyright_claims",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_audio_track => /admin/audio_tracks/:id(.:format)
  // function(id, options)
  admin_audio_track_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_audio_track_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_audio_tracks => /admin/audio_tracks(.:format)
  // function(options)
  admin_audio_tracks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_audio_tracks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_best => /admin/bests/:id(.:format)
  // function(id, options)
  admin_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_best_tab => /admin/best_tabs/:id(.:format)
  // function(id, options)
  admin_best_tab_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_best_tab_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_best_tabs => /admin/best_tabs(.:format)
  // function(options)
  admin_best_tabs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_best_tabs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_bests => /admin/bests(.:format)
  // function(options)
  admin_bests_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_bests_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_categories => /admin/categories(.:format)
  // function(options)
  admin_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_category => /admin/categories/:id(.:format)
  // function(id, options)
  admin_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_channel => /admin/channels/:id(.:format)
  // function(id, options)
  admin_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_channel_categories => /admin/channel_categories(.:format)
  // function(options)
  admin_channel_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_channel_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_channel_category => /admin/channel_categories/:id(.:format)
  // function(id, options)
  admin_channel_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_channel_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_channels => /admin/channels(.:format)
  // function(options)
  admin_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_editors_logs => /admin/editors_logs(.:format)
  // function(options)
  admin_editors_logs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"editors_logs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_editors_logs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"editors_logs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_emoji => /admin/emojis/:id(.:format)
  // function(id, options)
  admin_emoji_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_emoji_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_emojis => /admin/emojis(.:format)
  // function(options)
  admin_emojis_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_emojis_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_faq => /admin/faqs/:id(.:format)
  // function(id, options)
  admin_faq_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_faq_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_faq_categories => /admin/faq_categories(.:format)
  // function(options)
  admin_faq_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_faq_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_faq_category => /admin/faq_categories/:id(.:format)
  // function(id, options)
  admin_faq_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_faq_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_faqs => /admin/faqs(.:format)
  // function(options)
  admin_faqs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_faqs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_image_block => /admin/image_blocks/:id(.:format)
  // function(id, options)
  admin_image_block_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_image_block_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_image_blocks => /admin/image_blocks(.:format)
  // function(options)
  admin_image_blocks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_image_blocks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_media_block => /admin/media_blocks/:id(.:format)
  // function(id, options)
  admin_media_block_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_media_block_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_media_blocks => /admin/media_blocks(.:format)
  // function(options)
  admin_media_blocks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_media_blocks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_mobile_banner => /admin/mobile_banners/:id(.:format)
  // function(id, options)
  admin_mobile_banner_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_mobile_banner_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_mobile_banners => /admin/mobile_banners(.:format)
  // function(options)
  admin_mobile_banners_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_mobile_banners_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_promo_best2015_collections => /admin/promo/best2015/collections(.:format)
  // function(options)
  admin_promo_best2015_collections_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_promo_best2015_collections_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_promo_coubs_carousel => /admin/promo/coubs_carousels/:id(.:format)
  // function(id, options)
  admin_promo_coubs_carousel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_promo_coubs_carousel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_promo_coubs_carousels => /admin/promo/coubs_carousels(.:format)
  // function(options)
  admin_promo_coubs_carousels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_promo_coubs_carousels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_promo_pro_group => /admin/promo/pro_groups/:id(.:format)
  // function(id, options)
  admin_promo_pro_group_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_promo_pro_group_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_promo_pro_group_coub => /admin/promo/pro_group_coubs/:id(.:format)
  // function(id, options)
  admin_promo_pro_group_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_promo_pro_group_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_promo_pro_group_coubs => /admin/promo/pro_group_coubs(.:format)
  // function(options)
  admin_promo_pro_group_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_promo_pro_group_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_promo_pro_groups => /admin/promo/pro_groups(.:format)
  // function(options)
  admin_promo_pro_groups_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_promo_pro_groups_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_tags => /admin/tags(.:format)
  // function(options)
  admin_tags_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_tags_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// admin_trending_like_weight => /admin/trending/like_weights/:id(.:format)
  // function(id, options)
  admin_trending_like_weight_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_trending_like_weight_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_trending_like_weights => /admin/trending/like_weights(.:format)
  // function(options)
  admin_trending_like_weights_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_trending_like_weights_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_trending_trend_region => /admin/trending/trend_regions/:id(.:format)
  // function(id, options)
  admin_trending_trend_region_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_trending_trend_region_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_trending_trend_regions => /admin/trending/trend_regions(.:format)
  // function(options)
  admin_trending_trend_regions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_trending_trend_regions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_trending_trend_schedule => /admin/trending/trend_schedules/:id(.:format)
  // function(id, options)
  admin_trending_trend_schedule_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_schedules",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
admin_trending_trend_schedule_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_schedules",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// admin_trending_trend_schedules => /admin/trending/trend_schedules(.:format)
  // function(options)
  admin_trending_trend_schedules_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_schedules",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_trending_trend_schedules_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_schedules",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_user => /admin/users/:id(.:format)
  // function(id, options)
  admin_user_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
admin_user_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// admin_users => /admin/users(.:format)
  // function(options)
  admin_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
admin_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// adreport => /:id/adreport(.:format)
  // function(id, options)
  adreport_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"adreport",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
adreport_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"adreport",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_ad_overlay => /ads/ad_overlays/:id(.:format)
  // function(id, options)
  ads_ad_overlay_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_ad_overlay_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_ad_overlays => /ads/ad_overlays(.:format)
  // function(options)
  ads_ad_overlays_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_ad_overlays_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_editor_background => /ads/editor_backgrounds/:id(.:format)
  // function(id, options)
  ads_editor_background_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_editor_background_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_editor_backgrounds => /ads/editor_backgrounds(.:format)
  // function(options)
  ads_editor_backgrounds_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_editor_backgrounds_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_overlay => /ads/overlays/:id(.:format)
  // function(id, options)
  ads_overlay_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_overlay_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_overlays => /ads/overlays(.:format)
  // function(options)
  ads_overlays_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_overlays_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_promo_audio_track => /ads/promo_audio_tracks/:id(.:format)
  // function(id, options)
  ads_promo_audio_track_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_promo_audio_track_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_promo_audio_tracks => /ads/promo_audio_tracks(.:format)
  // function(options)
  ads_promo_audio_tracks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_promo_audio_tracks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_promo_background => /ads/promo_backgrounds/:id(.:format)
  // function(id, options)
  ads_promo_background_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_promo_background_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_promo_backgrounds => /ads/promo_backgrounds(.:format)
  // function(options)
  ads_promo_backgrounds_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_promo_backgrounds_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_promo_rule => /ads/promo_rules/:id(.:format)
  // function(id, options)
  ads_promo_rule_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_promo_rule_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_promo_rules => /ads/promo_rules(.:format)
  // function(options)
  ads_promo_rules_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_promo_rules_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// ads_tag_promo_background => /ads/tag_promo_backgrounds/:id(.:format)
  // function(id, options)
  ads_tag_promo_background_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ads_tag_promo_background_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ads_tag_promo_backgrounds => /ads/tag_promo_backgrounds(.:format)
  // function(options)
  ads_tag_promo_backgrounds_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
ads_tag_promo_backgrounds_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// advertise_page => /adv
  // function(options)
  advertise_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"adv",false]]),
advertise_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"adv",false]], true),
// age_restricted_stats => /stats/age_restricted(.:format)
  // function(options)
  age_restricted_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"age_restricted",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
age_restricted_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"age_restricted",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// all_editor_stories => /editor/stories/all(.:format)
  // function(options)
  all_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"all",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
all_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"all",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// android => /android(.:format)
  // function(options)
  android_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"android",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
android_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"android",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// android_app_redirect => /android_app_redirect(.:format)
  // function(options)
  android_app_redirect_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"android_app_redirect",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
android_app_redirect_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"android_app_redirect",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// android_promo_mail_test_page_index => /test_page/android_promo_mail
  // function(options)
  android_promo_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"android_promo_mail",false]]]]),
android_promo_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"android_promo_mail",false]]]], true),
// android_redirect_api_v2_passwords => /api/v2/passwords/android_redirect(.:format)
  // function(options)
  android_redirect_api_v2_passwords_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"android_redirect",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
android_redirect_api_v2_passwords_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"android_redirect",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_analytics => /api/analytics(.:format)
  // function(options)
  api_analytics_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"analytics",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
api_analytics_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"analytics",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// api_editor_channel => /api/editor/channels/:id(.:format)
  // function(id, options)
  api_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_editor_content => /api/editor/contents/:id(.:format)
  // function(id, options)
  api_editor_content_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"contents",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_editor_content_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"contents",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_editor_delayed_repost => /api/editor/delayed_reposts/:id(.:format)
  // function(id, options)
  api_editor_delayed_repost_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delayed_reposts",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_editor_delayed_repost_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delayed_reposts",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_editor_delayed_reposts => /api/editor/delayed_reposts(.:format)
  // function(options)
  api_editor_delayed_reposts_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delayed_reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_editor_delayed_reposts_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delayed_reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_editor_post => /api/editor/posts/:id(.:format)
  // function(id, options)
  api_editor_post_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"posts",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_editor_post_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"posts",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_editor_posts => /api/editor/posts(.:format)
  // function(options)
  api_editor_posts_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"posts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_editor_posts_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"posts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_editor_stories => /api/editor/stories(.:format)
  // function(options)
  api_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_editor_story => /api/editor/stories/:id(.:format)
  // function(id, options)
  api_editor_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_editor_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_oembed_api => /api/oembed.:format
  // function(format, options)
  api_oembed_api_path: Utils.route([["format",true]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"oembed",false],[2,[8,".",false],[3,"format",false]]]]]]),
api_oembed_api_url: Utils.route([["format",true]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"oembed",false],[2,[8,".",false],[3,"format",false]]]]]], true),
// api_v2 => /api/v2/bg/:channel_id(.:format)
  // function(channel_id, options)
  api_v2_path: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"bg",false],[2,[7,"/",false],[2,[3,"channel_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_url: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"bg",false],[2,[7,"/",false],[2,[3,"channel_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_ab_mobile_tests => /api/v2/ab_mobile_tests(.:format)
  // function(options)
  api_v2_ab_mobile_tests_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"ab_mobile_tests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_ab_mobile_tests_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"ab_mobile_tests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_abuse => /api/v2/abuses/:id(.:format)
  // function(id, options)
  api_v2_abuse_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"abuses",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_abuse_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"abuses",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_abuses => /api/v2/abuses(.:format)
  // function(options)
  api_v2_abuses_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"abuses",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_abuses_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"abuses",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_avatar_moderations => /api/v2/avatar_moderations(.:format)
  // function(options)
  api_v2_avatar_moderations_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"avatar_moderations",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_avatar_moderations_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"avatar_moderations",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_best_index => /api/v2/best(.:format)
  // function(options)
  api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_categories => /api/v2/categories(.:format)
  // function(options)
  api_v2_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_category => /api/v2/categories/:id(.:format)
  // function(id, options)
  api_v2_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_channel => /api/v2/channels/:id(.:format)
  // function(id, options)
  api_v2_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_channel_backgrounds => /api/v2/channels/:channel_id/backgrounds(.:format)
  // function(channel_id, options)
  api_v2_channel_backgrounds_path: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_channel_backgrounds_url: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_channel_notifications_subscriptions => /api/v2/channel_notifications_subscriptions(.:format)
  // function(options)
  api_v2_channel_notifications_subscriptions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channel_notifications_subscriptions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_channel_notifications_subscriptions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channel_notifications_subscriptions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_channel_promo_audio_tracks => /api/v2/channels/:channel_id/promo_audio_tracks(.:format)
  // function(channel_id, options)
  api_v2_channel_promo_audio_tracks_path: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_channel_promo_audio_tracks_url: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_channel_recommendations => /api/v2/channels/:channel_id/recommendations(.:format)
  // function(channel_id, options)
  api_v2_channel_recommendations_path: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"recommendations",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_channel_recommendations_url: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"recommendations",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_channels => /api/v2/channels(.:format)
  // function(options)
  api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_chat_channel => /api/v2/chat/channel(.:format)
  // function(options)
  api_v2_chat_channel_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_chat_channel_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_chat_check_following => /api/v2/chat/check_following(.:format)
  // function(options)
  api_v2_chat_check_following_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"check_following",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_chat_check_following_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"check_following",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_chat_initial_chat_suggestions => /api/v2/chat/initial_chat_suggestions(.:format)
  // function(options)
  api_v2_chat_initial_chat_suggestions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"initial_chat_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_chat_initial_chat_suggestions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"initial_chat_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_chat_token => /api/v2/chat/token(.:format)
  // function(options)
  api_v2_chat_token_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_chat_token_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_chat_user => /api/v2/chat/user(.:format)
  // function(options)
  api_v2_chat_user_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"user",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_chat_user_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"chat",false],[2,[7,"/",false],[2,[6,"user",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_communities => /api/v2/communities(.:format)
  // function(options)
  api_v2_communities_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_communities_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_community => /api/v2/communities/:id(.:format)
  // function(id, options)
  api_v2_community_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_community_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_community_notifications_subscriptions => /api/v2/community_notifications_subscriptions(.:format)
  // function(options)
  api_v2_community_notifications_subscriptions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"community_notifications_subscriptions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_community_notifications_subscriptions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"community_notifications_subscriptions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_coub => /api/v2/coubs/:id(.:format)
  // function(id, options)
  api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_coubs => /api/v2/coubs(.:format)
  // function(options)
  api_v2_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_dislikes => /api/v2/dislikes(.:format)
  // function(options)
  api_v2_dislikes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"dislikes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_dislikes_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"dislikes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_editor_channel_list => /api/v2/editor/channel_lists/:id(.:format)
  // function(id, options)
  api_v2_editor_channel_list_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_lists",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_editor_channel_list_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_lists",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_editor_channel_lists => /api/v2/editor/channel_lists(.:format)
  // function(options)
  api_v2_editor_channel_lists_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_lists",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_editor_channel_lists_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_lists",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_editor_explore => /api/v2/editor/explore/:id(.:format)
  // function(id, options)
  api_v2_editor_explore_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_editor_explore_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_editor_explore_index => /api/v2/editor/explore(.:format)
  // function(options)
  api_v2_editor_explore_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_editor_explore_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_editor_weekly_digest => /api/v2/editor/weekly_digests/:id(.:format)
  // function(id, options)
  api_v2_editor_weekly_digest_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_editor_weekly_digest_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_editor_weekly_digest_item => /api/v2/editor/weekly_digest_items/:id(.:format)
  // function(id, options)
  api_v2_editor_weekly_digest_item_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digest_items",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_editor_weekly_digest_item_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digest_items",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_editor_weekly_digest_items => /api/v2/editor/weekly_digest_items(.:format)
  // function(options)
  api_v2_editor_weekly_digest_items_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digest_items",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_editor_weekly_digest_items_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digest_items",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_external_downloads => /api/v2/external_downloads(.:format)
  // function(options)
  api_v2_external_downloads_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_external_downloads_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_favourites => /api/v2/favourites(.:format)
  // function(options)
  api_v2_favourites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"favourites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_favourites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"favourites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_follows => /api/v2/follows(.:format)
  // function(options)
  api_v2_follows_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_follows_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_friends => /api/v2/friends(.:format)
  // function(options)
  api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_invite => /api/v2/invites/:id(.:format)
  // function(id, options)
  api_v2_invite_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_invite_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_invites => /api/v2/invites(.:format)
  // function(options)
  api_v2_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_likes => /api/v2/likes(.:format)
  // function(options)
  api_v2_likes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_likes_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_mobile_banners => /api/v2/mobile_banners(.:format)
  // function(options)
  api_v2_mobile_banners_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_mobile_banners_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_notifications => /api/v2/notifications(.:format)
  // function(options)
  api_v2_notifications_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"notifications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_notifications_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"notifications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_password => /api/v2/passwords/:id(.:format)
  // function(id, options)
  api_v2_password_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_password_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_passwords => /api/v2/passwords(.:format)
  // function(options)
  api_v2_passwords_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_passwords_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_promo_best2015_collection => /api/v2/promo/best2015/collections/:id(.:format)
  // function(id, options)
  api_v2_promo_best2015_collection_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
api_v2_promo_best2015_collection_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// api_v2_promo_best2015_collections => /api/v2/promo/best2015/collections(.:format)
  // function(options)
  api_v2_promo_best2015_collections_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_promo_best2015_collections_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_promo_best2016_categories => /api/v2/promo/best2016/categories(.:format)
  // function(options)
  api_v2_promo_best2016_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
api_v2_promo_best2016_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// api_v2_promo_best2016_category => /api/v2/promo/best2016/categories/:id(.:format)
  // function(id, options)
  api_v2_promo_best2016_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
api_v2_promo_best2016_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// api_v2_promoted_coub => /api/v2/promoted_coubs/:id(.:format)
  // function(id, options)
  api_v2_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_promoted_coubs => /api/v2/promoted_coubs(.:format)
  // function(options)
  api_v2_promoted_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_promoted_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_raw_video => /api/v2/raw_videos/:id(.:format)
  // function(id, options)
  api_v2_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_raw_video_announcement => /api/v2/raw_video_announcements/:id(.:format)
  // function(id, options)
  api_v2_raw_video_announcement_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_video_announcements",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_raw_video_announcement_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_video_announcements",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_raw_video_announcements => /api/v2/raw_video_announcements(.:format)
  // function(options)
  api_v2_raw_video_announcements_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_video_announcements",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_raw_video_announcements_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_video_announcements",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_raw_videos => /api/v2/raw_videos(.:format)
  // function(options)
  api_v2_raw_videos_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_raw_videos_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_recoubs => /api/v2/recoubs(.:format)
  // function(options)
  api_v2_recoubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"recoubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_recoubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"recoubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_reposts => /api/v2/reposts(.:format)
  // function(options)
  api_v2_reposts_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_reposts_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_rtmp_uploads => /api/v2/rtmp_uploads(.:format)
  // function(options)
  api_v2_rtmp_uploads_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"rtmp_uploads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_rtmp_uploads_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"rtmp_uploads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_search_index => /api/v2/search(.:format)
  // function(options)
  api_v2_search_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_search_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_search_log => /api/v2/search_logs/:id(.:format)
  // function(id, options)
  api_v2_search_log_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search_logs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_search_log_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search_logs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_search_logs => /api/v2/search_logs(.:format)
  // function(options)
  api_v2_search_logs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search_logs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_search_logs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search_logs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_session => /api/v2/sessions/:id(.:format)
  // function(id, options)
  api_v2_session_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_session_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_sessions => /api/v2/sessions(.:format)
  // function(options)
  api_v2_sessions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_sessions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_stories => /api/v2/stories(.:format)
  // function(options)
  api_v2_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_story => /api/v2/stories/:id(.:format)
  // function(id, options)
  api_v2_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_temp_uploads => /api/v2/temp_uploads(.:format)
  // function(options)
  api_v2_temp_uploads_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"temp_uploads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_temp_uploads_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"temp_uploads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_timeline_index => /api/v2/timeline(.:format)
  // function(options)
  api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_unified_admin_coubs => /api/v2/unified_admin/coubs(.:format)
  // function(options)
  api_v2_unified_admin_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"unified_admin",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_unified_admin_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"unified_admin",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_upload_audio_index => /api/v2/upload/audio(.:format)
  // function(options)
  api_v2_upload_audio_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"audio",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_upload_audio_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"audio",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_upload_finish => /api/v2/upload/finish(.:format)
  // function(options)
  api_v2_upload_finish_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"finish",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_upload_finish_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"finish",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_upload_video_index => /api/v2/upload/video(.:format)
  // function(options)
  api_v2_upload_video_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"video",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
api_v2_upload_video_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"video",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// api_v2_vine_imports => /api/v2/vine_imports(.:format)
  // function(options)
  api_v2_vine_imports_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"vine_imports",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_vine_imports_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"vine_imports",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// api_v2_weekly_digests => /api/v2/weekly_digests(.:format)
  // function(options)
  api_v2_weekly_digests_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
api_v2_weekly_digests_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// app_promo => /apps
  // function(options)
  app_promo_path: Utils.route([], {}, [2,[7,"/",false],[6,"apps",false]]),
app_promo_url: Utils.route([], {}, [2,[7,"/",false],[6,"apps",false]], true),
// app_release_press_mail_test_page_index => /test_page/app_release_press_mail
  // function(options)
  app_release_press_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"app_release_press_mail",false]]]]),
app_release_press_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"app_release_press_mail",false]]]], true),
// app_release_users_mail_test_page_index => /test_page/app_release_users_mail
  // function(options)
  app_release_users_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"app_release_users_mail",false]]]]),
app_release_users_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"app_release_users_mail",false]]]], true),
// apply_category_to_coubs_editor_channel => /editor/channels/:id/apply_category_to_coubs(.:format)
  // function(id, options)
  apply_category_to_coubs_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"apply_category_to_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
apply_category_to_coubs_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"apply_category_to_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// apply_global_safe_to_coubs_editor_channel => /editor/channels/:id/apply_global_safe_to_coubs(.:format)
  // function(id, options)
  apply_global_safe_to_coubs_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"apply_global_safe_to_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
apply_global_safe_to_coubs_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"apply_global_safe_to_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// apply_moderation_editor_backgrounds => /editor/backgrounds/apply_moderation(.:format)
  // function(options)
  apply_moderation_editor_backgrounds_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[2,[7,"/",false],[2,[6,"apply_moderation",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
apply_moderation_editor_backgrounds_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[2,[7,"/",false],[2,[6,"apply_moderation",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// approve_editor_promoted_coub => /editor/promoted_coubs/:id/approve(.:format)
  // function(id, options)
  approve_editor_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"approve",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
approve_editor_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"approve",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// audio_track_api_v2_coub => /api/v2/coubs/:id/audio_track(.:format)
  // function(id, options)
  audio_track_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"audio_track",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
audio_track_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"audio_track",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// audio_tracks => /audio_tracks(.:format)
  // function(options)
  audio_tracks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
audio_tracks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"audio_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// auth_failure => /auth/failure(.:format)
  // function(options)
  auth_failure_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"auth",false],[2,[7,"/",false],[2,[6,"failure",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
auth_failure_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"auth",false],[2,[7,"/",false],[2,[6,"failure",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// auth_firebase => /auth/firebase(.:format)
  // function(options)
  auth_firebase_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"auth",false],[2,[7,"/",false],[2,[6,"firebase",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
auth_firebase_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"auth",false],[2,[7,"/",false],[2,[6,"firebase",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// autocomplete_api_v2_search_index => /api/v2/search/autocomplete(.:format)
  // function(options)
  autocomplete_api_v2_search_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"autocomplete",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
autocomplete_api_v2_search_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"autocomplete",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// autocomplete_editor_tags => /editor/tags/autocomplete(.:format)
  // function(options)
  autocomplete_editor_tags_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[6,"autocomplete",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
autocomplete_editor_tags_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[6,"autocomplete",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// avatar_moderation_editor_channels => /editor/channels/avatar_moderation(.:format)
  // function(options)
  avatar_moderation_editor_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"avatar_moderation",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
avatar_moderation_editor_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"avatar_moderation",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// away_page => /away
  // function(options)
  away_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"away",false]]),
away_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"away",false]], true),
// ban_admin_application => /admin/applications/:id/ban(.:format)
  // function(id, options)
  ban_admin_application_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ban_admin_application_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// ban_coubs_editor_channel => /editor/channels/:id/ban_coubs(.:format)
  // function(id, options)
  ban_coubs_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ban_coubs_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// ban_from_trend_editor_coub => /editor/coubs/:id/ban_from_trend(.:format)
  // function(id, options)
  ban_from_trend_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban_from_trend",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ban_from_trend_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban_from_trend",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// ban_stories_editor_channel => /editor/channels/:id/ban_stories(.:format)
  // function(id, options)
  ban_stories_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban_stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ban_stories_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"ban_stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// ban_tag_admin_trending_like_weights => /admin/trending/like_weights/ban_tag(.:format)
  // function(options)
  ban_tag_admin_trending_like_weights_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[6,"ban_tag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ban_tag_admin_trending_like_weights_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[6,"ban_tag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// banned_mail_test_page_index => /test_page/banned_mail
  // function(options)
  banned_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"banned_mail",false]]]]),
banned_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"banned_mail",false]]]], true),
// banned_stats => /stats/banned(.:format)
  // function(options)
  banned_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"banned",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
banned_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"banned",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// batch_update_api_v2_editor_explore_index => /api/v2/editor/explore/batch_update(.:format)
  // function(options)
  batch_update_api_v2_editor_explore_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"batch_update",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
batch_update_api_v2_editor_explore_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"batch_update",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// best => /best
  // function(options)
  best_path: Utils.route([], {}, [2,[7,"/",false],[6,"best",false]]),
best_url: Utils.route([], {}, [2,[7,"/",false],[6,"best",false]], true),
// best2016_categories_editor_coub => /editor/coubs/:id/best2016_categories(.:format)
  // function(id, options)
  best2016_categories_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"best2016_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best2016_categories_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"best2016_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best2016_moderation_editor_coub => /editor/coubs/:id/best2016_moderation(.:format)
  // function(id, options)
  best2016_moderation_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"best2016_moderation",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best2016_moderation_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"best2016_moderation",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2014_groups_api_v2_best_index => /api/v2/best/best_2014_groups(.:format)
  // function(options)
  best_2014_groups_api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2014_groups",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_2014_groups_api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2014_groups",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2014_promo_coubs_api_v2_best_index => /api/v2/best/best_2014_promo_coubs(.:format)
  // function(options)
  best_2014_promo_coubs_api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2014_promo_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_2014_promo_coubs_api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2014_promo_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2014_statscode => /best/2014/statscode(.:format)
  // function(options)
  best_2014_statscode_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2014",false],[2,[7,"/",false],[2,[6,"statscode",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
best_2014_statscode_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2014",false],[2,[7,"/",false],[2,[6,"statscode",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// best_2014_tags_api_v2_best_index => /api/v2/best/best_2014_tags(.:format)
  // function(options)
  best_2014_tags_api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2014_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_2014_tags_api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2014_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2015_channel_mybest => /best/2015/mybest/:permalink(.:format)
  // function(permalink, options)
  best_2015_channel_mybest_path: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2015",false],[2,[7,"/",false],[2,[6,"mybest",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_2015_channel_mybest_url: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2015",false],[2,[7,"/",false],[2,[6,"mybest",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2015_groups_api_v2_best_index => /api/v2/best/best_2015_groups(.:format)
  // function(options)
  best_2015_groups_api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2015_groups",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_2015_groups_api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2015_groups",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2015_memes_api_v2_best_index => /api/v2/best/best_2015_memes(.:format)
  // function(options)
  best_2015_memes_api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2015_memes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_2015_memes_api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_2015_memes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_2016_mail_test_page_index => /test_page/best_2016_mail
  // function(options)
  best_2016_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"best_2016_mail",false]]]]),
best_2016_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"best_2016_mail",false]]]], true),
// best_coubs2012 => /best/2012(.:format)
  // function(options)
  best_coubs2012_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2012",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
best_coubs2012_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2012",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// best_coubs2013 => /best/2013(.:format)
  // function(options)
  best_coubs2013_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2013",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
best_coubs2013_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2013",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// best_coubs2013_data_api_v2_best_index => /api/v2/best/best_coubs2013_data(.:format)
  // function(options)
  best_coubs2013_data_api_v2_best_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_coubs2013_data",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
best_coubs2013_data_api_v2_best_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"best_coubs2013_data",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// best_coubs2014 => /best/2014(/:section)(.:format)
  // function(options)
  best_coubs2014_path: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2014",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
best_coubs2014_url: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2014",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// best_coubs2015 => /best/2015(/:section)(.:format)
  // function(options)
  best_coubs2015_path: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2015",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
best_coubs2015_url: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2015",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// best_coubs2016 => /best/2016(/:section)(.:format)
  // function(options)
  best_coubs2016_path: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2016",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
best_coubs2016_url: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2016",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// best_coubs2017 => /best/2017(/:section)(.:format)
  // function(options)
  best_coubs2017_path: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2017",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
best_coubs2017_url: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2017",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// best_coubs2018 => /best/2018(/:section)(.:format)
  // function(options)
  best_coubs2018_path: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2018",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
best_coubs2018_url: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2018",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// best_coubs2019 => /best/2019(/:section)(.:format)
  // function(options)
  best_coubs2019_path: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2019",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
best_coubs2019_url: Utils.route([["section",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[6,"2019",false],[2,[1,[2,[7,"/",false],[3,"section",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// best_coubs_2014_mail_test_page_index => /test_page/best_coubs_2014_mail
  // function(options)
  best_coubs_2014_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"best_coubs_2014_mail",false]]]]),
best_coubs_2014_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"best_coubs_2014_mail",false]]]], true),
// best_coubs_mail_test_page_index => /test_page/best_coubs_mail
  // function(options)
  best_coubs_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"best_coubs_mail",false]]]]),
best_coubs_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"best_coubs_mail",false]]]], true),
// block_account_api_v2_channel => /api/v2/channels/:id/block_account(.:format)
  // function(id, options)
  block_account_api_v2_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"block_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
block_account_api_v2_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"block_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// blog_en => /blog_en(.:format)
  // function(options)
  blog_en_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"blog_en",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
blog_en_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"blog_en",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// blog_ru => /blog_ru(.:format)
  // function(options)
  blog_ru_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"blog_ru",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
blog_ru_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"blog_ru",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// bookmark_editor_coub => /editor/coubs/:id/bookmark(.:format)
  // function(id, options)
  bookmark_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"bookmark",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
bookmark_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"bookmark",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// bookmarked_api_editor_stories => /api/editor/stories/bookmarked(.:format)
  // function(options)
  bookmarked_api_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"bookmarked",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
bookmarked_api_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"bookmarked",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// bookmarked_editor_stories => /editor/stories/bookmarked(.:format)
  // function(options)
  bookmarked_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"bookmarked",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
bookmarked_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"bookmarked",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// brand_assets_page => /brand-assets
  // function(options)
  brand_assets_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"brand-assets",false]]),
brand_assets_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"brand-assets",false]], true),
// buttons_test_page_index => /test_page/buttons
  // function(options)
  buttons_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"buttons",false]]]]),
buttons_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"buttons",false]]]], true),
// by_channel_api_v2_likes => /api/v2/likes/by_channel(.:format)
  // function(options)
  by_channel_api_v2_likes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[2,[7,"/",false],[2,[6,"by_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
by_channel_api_v2_likes_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[2,[7,"/",false],[2,[6,"by_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// by_channel_api_v2_recoubs => /api/v2/recoubs/by_channel(.:format)
  // function(options)
  by_channel_api_v2_recoubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"recoubs",false],[2,[7,"/",false],[2,[6,"by_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
by_channel_api_v2_recoubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"recoubs",false],[2,[7,"/",false],[2,[6,"by_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// by_coub_api_v2_likes => /api/v2/likes/by_coub(.:format)
  // function(options)
  by_coub_api_v2_likes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[2,[7,"/",false],[2,[6,"by_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
by_coub_api_v2_likes_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[2,[7,"/",false],[2,[6,"by_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// by_coub_api_v2_recoubs => /api/v2/recoubs/by_coub(.:format)
  // function(options)
  by_coub_api_v2_recoubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"recoubs",false],[2,[7,"/",false],[2,[6,"by_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
by_coub_api_v2_recoubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"recoubs",false],[2,[7,"/",false],[2,[6,"by_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// by_permalink_api_v2_channel => /api/v2/channels/:id/by_permalink(.:format)
  // function(id, options)
  by_permalink_api_v2_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"by_permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
by_permalink_api_v2_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"by_permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// category_fresh_api_v2_timeline_index => /api/v2/timeline/fresh(/:category_id)(.:format)
  // function(options)
  category_fresh_api_v2_timeline_index_path: Utils.route([["category_id",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"fresh",false],[2,[1,[2,[7,"/",false],[3,"category_id",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]),
category_fresh_api_v2_timeline_index_url: Utils.route([["category_id",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"fresh",false],[2,[1,[2,[7,"/",false],[3,"category_id",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]], true),
// category_hot => /community/:category_id(/:hot_kind)(.:format)
  // function(category_id, options)
  category_hot_path: Utils.route([["category_id",true],["hot_kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"community",false],[2,[7,"/",false],[2,[3,"category_id",false],[2,[1,[2,[7,"/",false],[3,"hot_kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
category_hot_url: Utils.route([["category_id",true],["hot_kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"community",false],[2,[7,"/",false],[2,[3,"category_id",false],[2,[1,[2,[7,"/",false],[3,"hot_kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// category_hot_api_v2_timeline_index => /api/v2/timeline/hot/:category_id(/:hot_kind)(.:format)
  // function(category_id, options)
  category_hot_api_v2_timeline_index_path: Utils.route([["category_id",true],["hot_kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"hot",false],[2,[7,"/",false],[2,[3,"category_id",false],[2,[1,[2,[7,"/",false],[3,"hot_kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]),
category_hot_api_v2_timeline_index_url: Utils.route([["category_id",true],["hot_kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"hot",false],[2,[7,"/",false],[2,[3,"category_id",false],[2,[1,[2,[7,"/",false],[3,"hot_kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]], true),
// category_random_api_v2_timeline_index => /api/v2/timeline/random/:category_id(.:format)
  // function(category_id, options)
  category_random_api_v2_timeline_index_path: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"random",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
category_random_api_v2_timeline_index_url: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"random",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// category_rising_api_v2_timeline_index => /api/v2/timeline/rising/:category_id(.:format)
  // function(category_id, options)
  category_rising_api_v2_timeline_index_path: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"rising",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
category_rising_api_v2_timeline_index_url: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"rising",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// category_suggestions_api_v2_coub => /api/v2/coubs/:id/category_suggestions(.:format)
  // function(id, options)
  category_suggestions_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"category_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
category_suggestions_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"category_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// change_channel_api_v2_users => /api/v2/users/change_channel(.:format)
  // function(options)
  change_channel_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"change_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
change_channel_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"change_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// changer_api_v2_timeline_index => /api/v2/timeline/changer/:id(.:format)
  // function(id, options)
  changer_api_v2_timeline_index_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"changer",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
changer_api_v2_timeline_index_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"changer",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// channel => /:id(/:sort_type)(.:format)
  // function(id, options)
  channel_path: Utils.route([["id",true],["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[3,"id",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]),
channel_url: Utils.route([["id",true],["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[3,"id",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]], true),
// channel_accept_mail_test_page_index => /test_page/channel_accept_mail
  // function(options)
  channel_accept_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"channel_accept_mail",false]]]]),
channel_accept_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"channel_accept_mail",false]]]], true),
// channel_api_v2_timeline_index => /api/v2/timeline/channel/:id(.:format)
  // function(id, options)
  channel_api_v2_timeline_index_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"channel",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
channel_api_v2_timeline_index_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"channel",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// channel_feed_rss_index => /rss/channel/:id(.:format)
  // function(id, options)
  channel_feed_rss_index_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rss",false],[2,[7,"/",false],[2,[6,"channel",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
channel_feed_rss_index_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rss",false],[2,[7,"/",false],[2,[6,"channel",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// channel_invite_mail_test_page_index => /test_page/channel_invite_mail
  // function(options)
  channel_invite_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"channel_invite_mail",false]]]]),
channel_invite_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"channel_invite_mail",false]]]], true),
// channel_lists_editor_channels => /editor/channels/channel_lists(.:format)
  // function(options)
  channel_lists_editor_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"channel_lists",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
channel_lists_editor_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"channel_lists",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// channel_request_mail_test_page_index => /test_page/channel_request_mail
  // function(options)
  channel_request_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"channel_request_mail",false]]]]),
channel_request_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"channel_request_mail",false]]]], true),
// channel_stats_code => /profile/stats_code/:id(.:format)
  // function(id, options)
  channel_stats_code_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"profile",false],[2,[7,"/",false],[2,[6,"stats_code",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
channel_stats_code_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"profile",false],[2,[7,"/",false],[2,[6,"stats_code",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// channels => /channels(.:format)
  // function(options)
  channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// channels_api_v2_likes => /api/v2/likes/channels(.:format)
  // function(options)
  channels_api_v2_likes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
channels_api_v2_likes_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"likes",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// channels_api_v2_reposts => /api/v2/reposts/channels(.:format)
  // function(options)
  channels_api_v2_reposts_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"reposts",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
channels_api_v2_reposts_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"reposts",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// channels_api_v2_search_index => /api/v2/search/channels(.:format)
  // function(options)
  channels_api_v2_search_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
channels_api_v2_search_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// channels_api_v2_weekly_digest => /api/v2/weekly_digests/:id/channels(.:format)
  // function(id, options)
  channels_api_v2_weekly_digest_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
channels_api_v2_weekly_digest_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// channels_promo_page => /howtochannels
  // function(options)
  channels_promo_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"howtochannels",false]]),
channels_promo_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"howtochannels",false]], true),
// channels_search => /search/channels(.:format)
  // function(options)
  channels_search_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
channels_search_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// channels_stats => /stats/channels(.:format)
  // function(options)
  channels_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
channels_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// channels_stats_editor_channels => /editor/channels/channels_stats(.:format)
  // function(options)
  channels_stats_editor_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"channels_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
channels_stats_editor_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"channels_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// chat => /chat(/*path)(.:format)
  // function(options)
  chat_path: Utils.route([["path",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"chat",false],[2,[1,[2,[7,"/",false],[5,[3,"*path",false],false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]),
chat_url: Utils.route([["path",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"chat",false],[2,[1,[2,[7,"/",false],[5,[3,"*path",false],false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]], true),
// check_coub_api_v2_stories => /api/v2/stories/check_coub(.:format)
  // function(options)
  check_coub_api_v2_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"check_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
check_coub_api_v2_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"check_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// check_email => /check_email(.:format)
  // function(options)
  check_email_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"check_email",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
check_email_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"check_email",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// check_uniqueness_and_validate_api_v2_users => /api/v2/users/check_uniqueness_and_validate(.:format)
  // function(options)
  check_uniqueness_and_validate_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"check_uniqueness_and_validate",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
check_uniqueness_and_validate_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"check_uniqueness_and_validate",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// check_uniqueness_and_validate_users => /users/check_uniqueness_and_validate(.:format)
  // function(options)
  check_uniqueness_and_validate_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"check_uniqueness_and_validate",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
check_uniqueness_and_validate_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"check_uniqueness_and_validate",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// check_uniqueness_api_v2_sessions => /api/v2/sessions/check_uniqueness(.:format)
  // function(options)
  check_uniqueness_api_v2_sessions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"check_uniqueness",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
check_uniqueness_api_v2_sessions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"check_uniqueness",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// community_api_v2_timeline_index => /api/v2/timeline/community/:id/:kind(.:format)
  // function(id, kind, options)
  community_api_v2_timeline_index_path: Utils.route([["id",true],["kind",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"community",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[3,"kind",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
community_api_v2_timeline_index_url: Utils.route([["id",true],["kind",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"community",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[3,"kind",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// community_guidelines_page => /community_guidelines(.:format)
  // function(options)
  community_guidelines_page_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"community_guidelines",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
community_guidelines_page_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"community_guidelines",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// components_test_page_index => /test_page/components
  // function(options)
  components_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"components",false]]]]),
components_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"components",false]]]], true),
// content_admin_best_tab => /admin/best_tabs/:id/content(.:format)
  // function(id, options)
  content_admin_best_tab_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"content",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
content_admin_best_tab_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"content",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// copy_api_v2_coub => /api/v2/coubs/:id/copy(.:format)
  // function(id, options)
  copy_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"copy",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
copy_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"copy",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// copy_editor_story => /editor/stories/:id/copy(.:format)
  // function(id, options)
  copy_editor_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"copy",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
copy_editor_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"copy",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// copyright_ban_mail_test_page_index => /test_page/copyright_ban_mail
  // function(options)
  copyright_ban_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"copyright_ban_mail",false]]]]),
copyright_ban_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"copyright_ban_mail",false]]]], true),
// cotd_mail_test_page_index => /test_page/cotd_mail
  // function(options)
  cotd_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"cotd_mail",false]]]]),
cotd_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"cotd_mail",false]]]], true),
// coub => /coubs/:id(.:format)
  // function(id, options)
  coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// coub_likes_list_api_v2_action_subjects_data => /api/v2/action_subjects_data/coub_likes_list(.:format)
  // function(options)
  coub_likes_list_api_v2_action_subjects_data_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"coub_likes_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
coub_likes_list_api_v2_action_subjects_data_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"coub_likes_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// coub_of_the_day => /explore/coub_of_the_day(.:format)
  // function(options)
  coub_of_the_day_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"coub_of_the_day",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
coub_of_the_day_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"coub_of_the_day",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// coub_stats_objects_stats => /stats/stats_objects/:permalink(.:format)
  // function(permalink, options)
  coub_stats_objects_stats_path: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"stats_objects",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
coub_stats_objects_stats_url: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"stats_objects",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// coub_traffic_sources_stats => /stats/traffic_sources/:permalink(.:format)
  // function(permalink, options)
  coub_traffic_sources_stats_path: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"traffic_sources",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
coub_traffic_sources_stats_url: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"traffic_sources",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// coub_view_sharing_hack => /view/:id(.:format)
  // function(id, options)
  coub_view_sharing_hack_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"view",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
coub_view_sharing_hack_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"view",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// coubs => /coubs(.:format)
  // function(options)
  coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// coubs_admin_audio_track => /admin/audio_tracks/:id/coubs(.:format)
  // function(id, options)
  coubs_admin_audio_track_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
coubs_admin_audio_track_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// coubs_api_v2_best => /api/v2/best/:id/coubs(.:format)
  // function(id, options)
  coubs_api_v2_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
coubs_api_v2_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// coubs_api_v2_promo_best2015_collection => /api/v2/promo/best2015/collections/:id/coubs(.:format)
  // function(id, options)
  coubs_api_v2_promo_best2015_collection_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]]]),
coubs_api_v2_promo_best2015_collection_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2015",false],[2,[7,"/",false],[2,[6,"collections",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]]], true),
// coubs_api_v2_promo_best2016_category => /api/v2/promo/best2016/categories/:id/coubs(.:format)
  // function(id, options)
  coubs_api_v2_promo_best2016_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]]]),
coubs_api_v2_promo_best2016_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]]], true),
// coubs_api_v2_search_index => /api/v2/search/coubs(.:format)
  // function(options)
  coubs_api_v2_search_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
coubs_api_v2_search_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// coubs_api_v2_story => /api/v2/stories/:id/coubs(.:format)
  // function(id, options)
  coubs_api_v2_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
coubs_api_v2_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// coubs_api_v2_weekly_digest => /api/v2/weekly_digests/:id/coubs(.:format)
  // function(id, options)
  coubs_api_v2_weekly_digest_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
coubs_api_v2_weekly_digest_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// coubs_by_countries_stats => /stats/coubs_by_countries(.:format)
  // function(options)
  coubs_by_countries_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs_by_countries",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
coubs_by_countries_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs_by_countries",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// coubs_from_source_api_editor_stats => /api/editor/stats/coubs_from_source(.:format)
  // function(options)
  coubs_from_source_api_editor_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs_from_source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
coubs_from_source_api_editor_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs_from_source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// coubs_from_source_stats => /stats/coubs_from_source(.:format)
  // function(options)
  coubs_from_source_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs_from_source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
coubs_from_source_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs_from_source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// coubs_list_api_v2_editor_coubs => /api/v2/editor/coubs/coubs_list(.:format)
  // function(options)
  coubs_list_api_v2_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"coubs_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
coubs_list_api_v2_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"coubs_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// coubs_stats_admin_audio_tracks => /admin/audio_tracks/coubs_stats(.:format)
  // function(options)
  coubs_stats_admin_audio_tracks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[6,"coubs_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
coubs_stats_admin_audio_tracks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[6,"coubs_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// create => /create(.:format)
  // function(options)
  create_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"create",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
create_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"create",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// create_coub_from_reminder => /create_from_reminder(.:format)
  // function(options)
  create_coub_from_reminder_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"create_from_reminder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
create_coub_from_reminder_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"create_from_reminder",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// create_payment_api_v2_promoted_coub => /api/v2/promoted_coubs/:id/create_payment(.:format)
  // function(id, options)
  create_payment_api_v2_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"create_payment",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
create_payment_api_v2_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"create_payment",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// created_coubs_admin_channel => /admin/channels/:id/created_coubs(.:format)
  // function(id, options)
  created_coubs_admin_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"created_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
created_coubs_admin_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"created_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// created_coubs_admin_user => /admin/users/:id/created_coubs(.:format)
  // function(id, options)
  created_coubs_admin_user_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"created_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
created_coubs_admin_user_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"created_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// css3_spinner_test_page_index => /test_page/css3_spinner
  // function(options)
  css3_spinner_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"css3_spinner",false]]]]),
css3_spinner_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"css3_spinner",false]]]], true),
// custom_suggestions_api_v2_coub => /api/v2/coubs/:id/custom_suggestions(.:format)
  // function(id, options)
  custom_suggestions_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"custom_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
custom_suggestions_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"custom_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// dashboard_editor_promoted_coubs => /editor/promoted_coubs/dashboard(.:format)
  // function(options)
  dashboard_editor_promoted_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[6,"dashboard",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
dashboard_editor_promoted_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[6,"dashboard",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// delete_account_users => /users/delete_account(.:format)
  // function(options)
  delete_account_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"delete_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
delete_account_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"delete_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// delete_avatar_api_v2_channels => /api/v2/channels/delete_avatar(.:format)
  // function(options)
  delete_avatar_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"delete_avatar",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
delete_avatar_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"delete_avatar",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// delete_cached_friendships_api_v2_friends => /api/v2/friends/delete_cached_friendships(.:format)
  // function(options)
  delete_cached_friendships_api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"delete_cached_friendships",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
delete_cached_friendships_api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"delete_cached_friendships",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// delete_channel_api_v2_channels => /api/v2/channels/delete_channel(.:format)
  // function(options)
  delete_channel_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"delete_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
delete_channel_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"delete_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// destroy_all_api_v2_search_logs => /api/v2/search_logs/destroy_all(.:format)
  // function(options)
  destroy_all_api_v2_search_logs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search_logs",false],[2,[7,"/",false],[2,[6,"destroy_all",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
destroy_all_api_v2_search_logs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"search_logs",false],[2,[7,"/",false],[2,[6,"destroy_all",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// dev => /dev(.:format)
  // function(options)
  dev_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
dev_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// dev_application => /dev/applications/:id(.:format)
  // function(id, options)
  dev_application_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
dev_application_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// dev_applications => /dev/applications(.:format)
  // function(options)
  dev_applications_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
dev_applications_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// dev_doc => /dev/docs/:id(.:format)
  // function(id, options)
  dev_doc_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"docs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
dev_doc_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"docs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// dev_docs => /dev/docs(.:format)
  // function(options)
  dev_docs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"docs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
dev_docs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"docs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// dev_docs_search => /dev/docs/search(.:format)
  // function(options)
  dev_docs_search_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"docs",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
dev_docs_search_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"docs",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// digest_mail_test_page_index => /test_page/digest_mail
  // function(options)
  digest_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"digest_mail",false]]]]),
digest_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"digest_mail",false]]]], true),
// download_editor_coub => /editor/coubs/:id/download(.:format)
  // function(id, options)
  download_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"download",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
download_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"download",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_best => /admin/bests/:id/edit(.:format)
  // function(id, options)
  edit_admin_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_best_tab => /admin/best_tabs/:id/edit(.:format)
  // function(id, options)
  edit_admin_best_tab_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_best_tab_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_category => /admin/categories/:id/edit(.:format)
  // function(id, options)
  edit_admin_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_channel_category => /admin/channel_categories/:id/edit(.:format)
  // function(id, options)
  edit_admin_channel_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_channel_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_emoji => /admin/emojis/:id/edit(.:format)
  // function(id, options)
  edit_admin_emoji_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_emoji_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_faq => /admin/faqs/:id/edit(.:format)
  // function(id, options)
  edit_admin_faq_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_faq_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_faq_category => /admin/faq_categories/:id/edit(.:format)
  // function(id, options)
  edit_admin_faq_category_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_faq_category_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_image_block => /admin/image_blocks/:id/edit(.:format)
  // function(id, options)
  edit_admin_image_block_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_image_block_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_media_block => /admin/media_blocks/:id/edit(.:format)
  // function(id, options)
  edit_admin_media_block_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_media_block_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_mobile_banner => /admin/mobile_banners/:id/edit(.:format)
  // function(id, options)
  edit_admin_mobile_banner_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_admin_mobile_banner_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_admin_promo_coubs_carousel => /admin/promo/coubs_carousels/:id/edit(.:format)
  // function(id, options)
  edit_admin_promo_coubs_carousel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_admin_promo_coubs_carousel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_admin_promo_pro_group => /admin/promo/pro_groups/:id/edit(.:format)
  // function(id, options)
  edit_admin_promo_pro_group_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_admin_promo_pro_group_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_admin_promo_pro_group_coub => /admin/promo/pro_group_coubs/:id/edit(.:format)
  // function(id, options)
  edit_admin_promo_pro_group_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_admin_promo_pro_group_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_admin_trending_like_weight => /admin/trending/like_weights/:id/edit(.:format)
  // function(id, options)
  edit_admin_trending_like_weight_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_admin_trending_like_weight_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_admin_trending_trend_region => /admin/trending/trend_regions/:id/edit(.:format)
  // function(id, options)
  edit_admin_trending_trend_region_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_admin_trending_trend_region_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_admin_trending_trend_schedule => /admin/trending/trend_schedules/:id/edit(.:format)
  // function(id, options)
  edit_admin_trending_trend_schedule_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_schedules",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_admin_trending_trend_schedule_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_schedules",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_ads_ad_overlay => /ads/ad_overlays/:id/edit(.:format)
  // function(id, options)
  edit_ads_ad_overlay_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_ad_overlay_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_ads_editor_background => /ads/editor_backgrounds/:id/edit(.:format)
  // function(id, options)
  edit_ads_editor_background_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_editor_background_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_ads_overlay => /ads/overlays/:id/edit(.:format)
  // function(id, options)
  edit_ads_overlay_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_overlay_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_ads_promo_audio_track => /ads/promo_audio_tracks/:id/edit(.:format)
  // function(id, options)
  edit_ads_promo_audio_track_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_promo_audio_track_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_ads_promo_background => /ads/promo_backgrounds/:id/edit(.:format)
  // function(id, options)
  edit_ads_promo_background_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_promo_background_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_ads_promo_rule => /ads/promo_rules/:id/edit(.:format)
  // function(id, options)
  edit_ads_promo_rule_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_promo_rule_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_ads_tag_promo_background => /ads/tag_promo_backgrounds/:id/edit(.:format)
  // function(id, options)
  edit_ads_tag_promo_background_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_ads_tag_promo_background_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_api_v2_channel => /api/v2/channels/:id/edit(.:format)
  // function(id, options)
  edit_api_v2_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_api_v2_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_api_v2_invite => /api/v2/invites/:id/edit(.:format)
  // function(id, options)
  edit_api_v2_invite_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_api_v2_invite_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_api_v2_password => /api/v2/passwords/:id/edit(.:format)
  // function(id, options)
  edit_api_v2_password_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_api_v2_password_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_api_v2_profile => /api/v2/profile/:id/edit(.:format)
  // function(id, options)
  edit_api_v2_profile_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"profile",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_api_v2_profile_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"profile",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_api_v2_raw_video => /api/v2/raw_videos/:id/edit(.:format)
  // function(id, options)
  edit_api_v2_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_api_v2_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_api_v2_story => /api/v2/stories/:id/edit(.:format)
  // function(id, options)
  edit_api_v2_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
edit_api_v2_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// edit_coub => /coubs/:id/edit(.:format)
  // function(id, options)
  edit_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
edit_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// edit_dev_application => /dev/applications/:id/edit(.:format)
  // function(id, options)
  edit_dev_application_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_dev_application_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_editor_weekly_digest => /editor/weekly_digests/:id/edit(.:format)
  // function(id, options)
  edit_editor_weekly_digest_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_editor_weekly_digest_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_oauth_application => /oauth/applications/:id/edit(.:format)
  // function(id, options)
  edit_oauth_application_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edit_oauth_application_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// edit_promoted_coub => /promote/:id/edit
  // function(id, options)
  edit_promoted_coub_path: Utils.route([["id",true]], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[6,"edit",false]]]]]]),
edit_promoted_coub_url: Utils.route([["id",true]], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[6,"edit",false]]]]]], true),
// edit_raw_video => /raw_videos/:id/edit(.:format)
  // function(id, options)
  edit_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
edit_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// edit_story => /stories/:id/edit(.:format)
  // function(id, options)
  edit_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
edit_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// edit_user => /users/:id/edit(.:format)
  // function(id, options)
  edit_user_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
edit_user_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// edited_tracks_admin_audio_track => /admin/audio_tracks/:id/edited_tracks(.:format)
  // function(id, options)
  edited_tracks_admin_audio_track_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edited_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
edited_tracks_admin_audio_track_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edited_tracks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// editor_backgrounds => /editor/backgrounds(.:format)
  // function(options)
  editor_backgrounds_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_backgrounds_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_channel => /editor/channels/:id(.:format)
  // function(id, options)
  editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_channel_feature => /editor/channel_features/:id(.:format)
  // function(id, options)
  editor_channel_feature_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_features",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_channel_feature_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_features",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_channel_features => /editor/channel_features(.:format)
  // function(options)
  editor_channel_features_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_features",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_channel_features_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channel_features",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_coub_of_the_day => /editor/coub_of_the_days/:id(.:format)
  // function(id, options)
  editor_coub_of_the_day_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coub_of_the_days",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_coub_of_the_day_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coub_of_the_days",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_coub_of_the_days => /editor/coub_of_the_days(.:format)
  // function(options)
  editor_coub_of_the_days_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coub_of_the_days",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_coub_of_the_days_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coub_of_the_days",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_coubs => /editor/coubs(.:format)
  // function(options)
  editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_promoted_coub => /editor/promoted_coubs/:id(.:format)
  // function(id, options)
  editor_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_promoted_coubs => /editor/promoted_coubs(.:format)
  // function(options)
  editor_promoted_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_promoted_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_reminder_mail_test_page_index => /test_page/editor_reminder_mail
  // function(options)
  editor_reminder_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"editor_reminder_mail",false]]]]),
editor_reminder_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"editor_reminder_mail",false]]]], true),
// editor_saved_channel => /editor/saved_channels/:id(.:format)
  // function(id, options)
  editor_saved_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"saved_channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_saved_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"saved_channels",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_saved_channels => /editor/saved_channels(.:format)
  // function(options)
  editor_saved_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"saved_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_saved_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"saved_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_stories => /editor/stories(.:format)
  // function(options)
  editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_tag => /editor/tags/:id(.:format)
  // function(id, options)
  editor_tag_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_tag_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_tags => /editor/tags(.:format)
  // function(options)
  editor_tags_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_tags_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editor_user => /editor/users/:id(.:format)
  // function(id, options)
  editor_user_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editor_user_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// editor_weekly_digests => /editor/weekly_digests(.:format)
  // function(options)
  editor_weekly_digests_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
editor_weekly_digests_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// editorial_api_editor_channels => /api/editor/channels/editorial(.:format)
  // function(options)
  editorial_api_editor_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"editorial",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
editorial_api_editor_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"editorial",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// editorial_api_v2_action_subjects_datum => /api/v2/action_subjects_data/:id/editorial(.:format)
  // function(id, options)
  editorial_api_v2_action_subjects_datum_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"editorial",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
editorial_api_v2_action_subjects_datum_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"editorial",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// editorial_channels_api_v2_channels => /api/v2/channels/editorial_channels(.:format)
  // function(options)
  editorial_channels_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"editorial_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
editorial_channels_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"editorial_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// editorial_reposts_api_editor_content => /api/editor/contents/:id/editorial_reposts(.:format)
  // function(id, options)
  editorial_reposts_api_editor_content_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"contents",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"editorial_reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
editorial_reposts_api_editor_content_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"contents",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"editorial_reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// editors_stats_editor_coubs => /editor/coubs/editors_stats(.:format)
  // function(options)
  editors_stats_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"editors_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
editors_stats_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"editors_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// embed_api_test_page_index => /test_page/embed_api
  // function(options)
  embed_api_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embed_api",false]]]]),
embed_api_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embed_api",false]]]], true),
// embed_coub => /embed/:id(.:format)
  // function(id, options)
  embed_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"embed",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
embed_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"embed",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// embed_runner_test_page_index => /test_page/embed_runner
  // function(options)
  embed_runner_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embed_runner",false]]]]),
embed_runner_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embed_runner",false]]]], true),
// embeds_autoplay_test_page_index => /test_page/embeds_autoplay
  // function(options)
  embeds_autoplay_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_autoplay",false]]]]),
embeds_autoplay_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_autoplay",false]]]], true),
// embeds_continuous_size_test_page_index => /test_page/embeds_continuous_size
  // function(options)
  embeds_continuous_size_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_continuous_size",false]]]]),
embeds_continuous_size_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_continuous_size",false]]]], true),
// embeds_custom_size_test_page_index => /test_page/embeds_custom_size
  // function(options)
  embeds_custom_size_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_custom_size",false]]]]),
embeds_custom_size_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_custom_size",false]]]], true),
// embeds_ios_test_page_index => /test_page/embeds_ios
  // function(options)
  embeds_ios_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_ios",false]]]]),
embeds_ios_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_ios",false]]]], true),
// embeds_mobile_test_page_index => /test_page/embeds_mobile
  // function(options)
  embeds_mobile_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_mobile",false]]]]),
embeds_mobile_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds_mobile",false]]]], true),
// embeds_test_page_index => /test_page/embeds
  // function(options)
  embeds_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds",false]]]]),
embeds_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"embeds",false]]]], true),
// empty_description_api_editor_channel => /api/editor/channels/:id/empty_description(.:format)
  // function(id, options)
  empty_description_api_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"empty_description",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
empty_description_api_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"empty_description",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// exit_during_conversion_api_v2_raw_video => /api/v2/raw_videos/:id/exit_during_conversion(.:format)
  // function(id, options)
  exit_during_conversion_api_v2_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"exit_during_conversion",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
exit_during_conversion_api_v2_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"exit_during_conversion",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// exit_during_download_api_v2_external_download => /api/v2/external_downloads/:id/exit_during_download(.:format)
  // function(id, options)
  exit_during_download_api_v2_external_download_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"exit_during_download",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
exit_during_download_api_v2_external_download_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"exit_during_download",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// exit_from_editor_api_v2_raw_video => /api/v2/raw_videos/:id/exit_from_editor(.:format)
  // function(id, options)
  exit_from_editor_api_v2_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"exit_from_editor",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
exit_from_editor_api_v2_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"exit_from_editor",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// explore => /explore(.:format)
  // function(options)
  explore_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
explore_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// explore_api_v2_timeline_index => /api/v2/timeline/explore(.:format)
  // function(options)
  explore_api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
explore_api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// explore_cat_api_v2_timeline_index => /api/v2/timeline/explore/:category_id(.:format)
  // function(category_id, options)
  explore_cat_api_v2_timeline_index_path: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
explore_cat_api_v2_timeline_index_url: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// explore_category => /explore/:category_id(.:format)
  // function(category_id, options)
  explore_category_path: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
explore_category_url: Utils.route([["category_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[3,"category_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// explore_channels_api_v2_channels => /api/v2/channels/explore_channels(.:format)
  // function(options)
  explore_channels_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"explore_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
explore_channels_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"explore_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// explore_editor_delay_publishes => /editor/delay_publishes/explore(.:format)
  // function(options)
  explore_editor_delay_publishes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delay_publishes",false],[2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
explore_editor_delay_publishes_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delay_publishes",false],[2,[7,"/",false],[2,[6,"explore",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// explore_newest => /explore/newest(.:format)
  // function(options)
  explore_newest_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"newest",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
explore_newest_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"newest",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// external_raw_videos => /raw_videos/external(.:format)
  // function(options)
  external_raw_videos_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[6,"external",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
external_raw_videos_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[6,"external",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// faq => /faq(.:format)
  // function(options)
  faq_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"faq",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
faq_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"faq",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// faq_page => /help(/:category)(.:format)
  // function(options)
  faq_page_path: Utils.route([["category",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"help",false],[2,[1,[2,[7,"/",false],[3,"category",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]),
faq_page_url: Utils.route([["category",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"help",false],[2,[1,[2,[7,"/",false],[3,"category",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]], true),
// faq_search => /help/search(.:format)
  // function(options)
  faq_search_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"help",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
faq_search_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"help",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// favourites => /bookmarks(/:sort_type)
  // function(options)
  favourites_path: Utils.route([["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"bookmarks",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]]),
favourites_url: Utils.route([["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"bookmarks",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]], true),
// favourites_api_v2_timeline_index => /api/v2/timeline/favourites(.:format)
  // function(options)
  favourites_api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"favourites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
favourites_api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"favourites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// fb_embeds_test_page_index => /test_page/fb_embeds
  // function(options)
  fb_embeds_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"fb_embeds",false]]]]),
fb_embeds_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"fb_embeds",false]]]], true),
// featured => /featured(.:format)
  // function(options)
  featured_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
featured_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// featured_api_v2_stories => /api/v2/stories/featured(.:format)
  // function(options)
  featured_api_v2_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"featured",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
featured_api_v2_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"featured",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// featured_channels => /featured/channels(.:format)
  // function(options)
  featured_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
featured_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[2,[7,"/",false],[2,[6,"channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// featured_channels_api_v2_channels => /api/v2/channels/featured_channels(.:format)
  // function(options)
  featured_channels_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"featured_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
featured_channels_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"featured_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// featured_channels_editor_channels => /editor/channels/featured_channels(.:format)
  // function(options)
  featured_channels_editor_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"featured_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
featured_channels_editor_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"featured_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// featured_coubs => /featured/coubs(/:sort_type)(.:format)
  // function(options)
  featured_coubs_path: Utils.route([["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
featured_coubs_url: Utils.route([["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// featured_stories => /featured/stories(/:sort_type)(.:format)
  // function(options)
  featured_stories_path: Utils.route([["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
featured_stories_url: Utils.route([["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"featured",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// features_editor_channel => /editor/channels/:id/features(.:format)
  // function(id, options)
  features_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"features",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
features_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"features",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// feed => /feed
  // function(options)
  feed_path: Utils.route([], {}, [2,[7,"/",false],[6,"feed",false]]),
feed_url: Utils.route([], {}, [2,[7,"/",false],[6,"feed",false]], true),
// feed_api_v2_stories => /api/v2/stories/feed(.:format)
  // function(options)
  feed_api_v2_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"feed",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
feed_api_v2_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"feed",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// fetch_oauth_data_api_v2_sessions => /api/v2/sessions/fetch_oauth_data(.:format)
  // function(options)
  fetch_oauth_data_api_v2_sessions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"fetch_oauth_data",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
fetch_oauth_data_api_v2_sessions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"fetch_oauth_data",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// finalize_raw_video => /raw_videos/:id/finalize(.:format)
  // function(id, options)
  finalize_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finalize",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
finalize_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finalize",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// finalize_status_api_v2_coub => /api/v2/coubs/:id/finalize_status(.:format)
  // function(id, options)
  finalize_status_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finalize_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
finalize_status_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finalize_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// finalize_upload_api_v2_coub => /api/v2/coubs/:id/finalize_upload(.:format)
  // function(id, options)
  finalize_upload_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finalize_upload",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
finalize_upload_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finalize_upload",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// find_api_v2_follows => /api/v2/follows/find(.:format)
  // function(options)
  find_api_v2_follows_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"find",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
find_api_v2_follows_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"find",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// find_api_v2_friends => /api/v2/friends/find(.:format)
  // function(options)
  find_api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"find",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
find_api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"find",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// find_friends => /friends/:page(.:format)
  // function(page, options)
  find_friends_path: Utils.route([["page",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[3,"page",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
find_friends_url: Utils.route([["page",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[3,"page",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// finish_api_v2_ab_mobile_test => /api/v2/ab_mobile_tests/:id/finish(.:format)
  // function(id, options)
  finish_api_v2_ab_mobile_test_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"ab_mobile_tests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finish",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
finish_api_v2_ab_mobile_test_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"ab_mobile_tests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"finish",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// flashvars_test_page_index => /test_page/flashvars
  // function(options)
  flashvars_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"flashvars",false]]]]),
flashvars_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"flashvars",false]]]], true),
// follow_all_friends_from_provider_api_v2_follows => /api/v2/follows/follow_all_friends_from_provider(.:format)
  // function(options)
  follow_all_friends_from_provider_api_v2_follows_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"follow_all_friends_from_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
follow_all_friends_from_provider_api_v2_follows_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"follow_all_friends_from_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// follow_from_mail => /follows/follow_from_mail/:permalink(.:format)
  // function(permalink, options)
  follow_from_mail_path: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"follow_from_mail",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
follow_from_mail_url: Utils.route([["permalink",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"follow_from_mail",false],[2,[7,"/",false],[2,[3,"permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// follow_mail_test_page_index => /test_page/follow_mail
  // function(options)
  follow_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"follow_mail",false]]]]),
follow_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"follow_mail",false]]]], true),
// followers_list_api_v2_action_subjects_data => /api/v2/action_subjects_data/followers_list(.:format)
  // function(options)
  followers_list_api_v2_action_subjects_data_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"followers_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
followers_list_api_v2_action_subjects_data_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"followers_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// followings_list_api_v2_action_subjects_data => /api/v2/action_subjects_data/followings_list(.:format)
  // function(options)
  followings_list_api_v2_action_subjects_data_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"followings_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
followings_list_api_v2_action_subjects_data_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"followings_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// fresh => /fresh
  // function(options)
  fresh_path: Utils.route([], {}, [2,[7,"/",false],[6,"fresh",false]]),
fresh_url: Utils.route([], {}, [2,[7,"/",false],[6,"fresh",false]], true),
// friends => /friends
  // function(options)
  friends_path: Utils.route([], {}, [2,[7,"/",false],[6,"friends",false]]),
friends_url: Utils.route([], {}, [2,[7,"/",false],[6,"friends",false]], true),
// friends_api_v2_notifications => /api/v2/notifications/friends(.:format)
  // function(options)
  friends_api_v2_notifications_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"notifications",false],[2,[7,"/",false],[2,[6,"friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
friends_api_v2_notifications_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"notifications",false],[2,[7,"/",false],[2,[6,"friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// friends_count_friends => /friends/friends_count(.:format)
  // function(options)
  friends_count_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"friends_count",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
friends_count_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"friends_count",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// friends_per_provider_friends => /friends/friends_per_provider(.:format)
  // function(options)
  friends_per_provider_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"friends_per_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
friends_per_provider_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"friends_per_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// friends_to_follow_api_v2_friends => /api/v2/friends/friends_to_follow(.:format)
  // function(options)
  friends_to_follow_api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"friends_to_follow",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
friends_to_follow_api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"friends_to_follow",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// gems_api_v2_best => /api/v2/best/:id/gems(.:format)
  // function(id, options)
  gems_api_v2_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"gems",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
gems_api_v2_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"gems",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// gifv_coub => /view/:id.gifv(.:format)
  // function(id, options)
  gifv_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"view",false],[2,[7,"/",false],[2,[3,"id",false],[2,[8,".",false],[2,[6,"gifv",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
gifv_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"view",false],[2,[7,"/",false],[2,[3,"id",false],[2,[8,".",false],[2,[6,"gifv",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// gifv_embed_test_page_index => /test_page/gifv_embed
  // function(options)
  gifv_embed_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"gifv_embed",false]]]]),
gifv_embed_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"gifv_embed",false]]]], true),
// gifv_embedly_test_page_index => /test_page/gifv_embedly
  // function(options)
  gifv_embedly_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"gifv_embedly",false]]]]),
gifv_embedly_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"gifv_embedly",false]]]], true),
// global_coubs_list_api_v2_editor_coubs => /api/v2/editor/coubs/global_coubs_list(.:format)
  // function(options)
  global_coubs_list_api_v2_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"global_coubs_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
global_coubs_list_api_v2_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"global_coubs_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// global_editor_coubs => /editor/coubs/global(.:format)
  // function(options)
  global_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"global",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
global_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"global",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// global_stats_editor_coubs => /editor/coubs/global_stats(.:format)
  // function(options)
  global_stats_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"global_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
global_stats_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"global_stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// graphs_stats => /stats/graphs(.:format)
  // function(options)
  graphs_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"graphs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
graphs_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"graphs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// help => /help(.:format)
  // function(options)
  help_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"help",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
help_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"help",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// hot => /hot
  // function(options)
  hot_path: Utils.route([], {}, [2,[7,"/",false],[6,"hot",false]]),
hot_url: Utils.route([], {}, [2,[7,"/",false],[6,"hot",false]], true),
// hot_api_v2_timeline_index => /api/v2/timeline/hot(/:hot_kind)(.:format)
  // function(options)
  hot_api_v2_timeline_index_path: Utils.route([["hot_kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"hot",false],[2,[1,[2,[7,"/",false],[3,"hot_kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]),
hot_api_v2_timeline_index_url: Utils.route([["hot_kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"hot",false],[2,[1,[2,[7,"/",false],[3,"hot_kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]], true),
// hotness_api_v2_timeline_index => /api/v2/timeline/hotness(.:format)
  // function(options)
  hotness_api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"hotness",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
hotness_api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"hotness",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// hotness_feed => /feed/hotness
  // function(options)
  hotness_feed_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"feed",false],[2,[7,"/",false],[6,"hotness",false]]]]),
hotness_feed_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"feed",false],[2,[7,"/",false],[6,"hotness",false]]]], true),
// ignore_possible_friend => /users/ignore_possible_friend/:friend_id(.:format)
  // function(friend_id, options)
  ignore_possible_friend_path: Utils.route([["friend_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"ignore_possible_friend",false],[2,[7,"/",false],[2,[3,"friend_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
ignore_possible_friend_url: Utils.route([["friend_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"ignore_possible_friend",false],[2,[7,"/",false],[2,[3,"friend_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// ignore_possible_friend_api_v2_friends => /api/v2/friends/ignore_possible_friend(.:format)
  // function(options)
  ignore_possible_friend_api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"ignore_possible_friend",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ignore_possible_friend_api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"ignore_possible_friend",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// imgur_post_api_v2_coubs => /api/v2/coubs/imgur_post(.:format)
  // function(options)
  imgur_post_api_v2_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"imgur_post",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
imgur_post_api_v2_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"imgur_post",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// increaserev_test_page_index => /test_page/increaserev
  // function(options)
  increaserev_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"increaserev",false]]]]),
increaserev_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"increaserev",false]]]], true),
// increment_clicks_api_v2_promoted_coub => /api/v2/promoted_coubs/:id/increment_clicks(.:format)
  // function(id, options)
  increment_clicks_api_v2_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"increment_clicks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
increment_clicks_api_v2_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"increment_clicks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// increment_views_api_v2_promoted_coub => /api/v2/promoted_coubs/:id/increment_views(.:format)
  // function(id, options)
  increment_views_api_v2_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"increment_views",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
increment_views_api_v2_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"increment_views",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// increment_views_coub => /coubs/:id/increment_views(.:format)
  // function(id, options)
  increment_views_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"increment_views",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
increment_views_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"increment_views",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// index_api_v2_stats => /api/v2/stats/coubs/:type(.:format)
  // function(type, options)
  index_api_v2_stats_path: Utils.route([["type",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"type",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
index_api_v2_stats_url: Utils.route([["type",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"type",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// init_upload_api_v2_coubs => /api/v2/coubs/init_upload(.:format)
  // function(options)
  init_upload_api_v2_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"init_upload",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
init_upload_api_v2_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"init_upload",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// invite_all_friends_from_provider_api_v2_invites => /api/v2/invites/invite_all_friends_from_provider(.:format)
  // function(options)
  invite_all_friends_from_provider_api_v2_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"invite_all_friends_from_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
invite_all_friends_from_provider_api_v2_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"invite_all_friends_from_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// invite_friend_mail_test_page_index => /test_page/invite_friend_mail
  // function(options)
  invite_friend_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"invite_friend_mail",false]]]]),
invite_friend_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"invite_friend_mail",false]]]], true),
// invite_friends_scope_api_v2_invites => /api/v2/invites/invite_friends_scope(.:format)
  // function(options)
  invite_friends_scope_api_v2_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"invite_friends_scope",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
invite_friends_scope_api_v2_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"invite_friends_scope",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// invite_friends_via_provider_api_v2_invites => /api/v2/invites/invite_friends_via_provider(.:format)
  // function(options)
  invite_friends_via_provider_api_v2_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"invite_friends_via_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
invite_friends_via_provider_api_v2_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"invite_friends_via_provider",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// ios => /ios(.:format)
  // function(options)
  ios_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ios",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
ios_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ios",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// labels_admin_audio_tracks => /admin/audio_tracks/labels(.:format)
  // function(options)
  labels_admin_audio_tracks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[6,"labels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
labels_admin_audio_tracks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[6,"labels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// lame_api_editor_stories => /api/editor/stories/lame(.:format)
  // function(options)
  lame_api_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"lame",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
lame_api_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"lame",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// lame_editor_stories => /editor/stories/lame(.:format)
  // function(options)
  lame_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"lame",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
lame_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"lame",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// like_mail_test_page_index => /test_page/like_mail
  // function(options)
  like_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"like_mail",false]]]]),
like_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"like_mail",false]]]], true),
// like_points_api_v2_editor_coub => /api/v2/editor/coubs/:id/like_points(.:format)
  // function(id, options)
  like_points_api_v2_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"like_points",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
like_points_api_v2_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"like_points",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// likes => /likes(/:sort_type)
  // function(options)
  likes_path: Utils.route([["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"likes",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]]),
likes_url: Utils.route([["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"likes",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]], true),
// likes_api_v2_best => /api/v2/best/:id/likes(.:format)
  // function(id, options)
  likes_api_v2_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
likes_api_v2_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// likes_api_v2_timeline_index => /api/v2/timeline/likes(.:format)
  // function(options)
  likes_api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
likes_api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// likes_stats => /stats/likes(.:format)
  // function(options)
  likes_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
likes_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"likes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// location_test_page_index => /test_page/location
  // function(options)
  location_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"location",false]]]]),
location_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"location",false]]]], true),
// login_as_channel_admin_channel => /admin/channels/:id/login_as_channel(.:format)
  // function(id, options)
  login_as_channel_admin_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"login_as_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
login_as_channel_admin_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"login_as_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// logout_as_channel_admin_channels => /admin/channels/logout_as_channel(.:format)
  // function(options)
  logout_as_channel_admin_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"logout_as_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
logout_as_channel_admin_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"logout_as_channel",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// mails_test_page_index => /test_page/mails
  // function(options)
  mails_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mails",false]]]]),
mails_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mails",false]]]], true),
// mark_as_invited_api_v2_invites => /api/v2/invites/mark_as_invited(.:format)
  // function(options)
  mark_as_invited_api_v2_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"mark_as_invited",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
mark_as_invited_api_v2_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"mark_as_invited",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// mark_as_normal_admin_tag => /admin/tags/:id/mark_as_normal(.:format)
  // function(id, options)
  mark_as_normal_admin_tag_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"mark_as_normal",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
mark_as_normal_admin_tag_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"mark_as_normal",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// mark_as_trash_admin_tag => /admin/tags/:id/mark_as_trash(.:format)
  // function(id, options)
  mark_as_trash_admin_tag_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"mark_as_trash",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
mark_as_trash_admin_tag_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"mark_as_trash",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// mark_channels_guide_as_seen_api_v2_users => /api/v2/users/mark_channels_guide_as_seen(.:format)
  // function(options)
  mark_channels_guide_as_seen_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"mark_channels_guide_as_seen",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
mark_channels_guide_as_seen_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"mark_channels_guide_as_seen",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// marked_18_mail_test_page_index => /test_page/marked_18_mail
  // function(options)
  marked_18_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"marked_18_mail",false]]]]),
marked_18_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"marked_18_mail",false]]]], true),
// mass_destroy_api_v2_abuses => /api/v2/abuses/mass_delete/:coub_id(.:format)
  // function(coub_id, options)
  mass_destroy_api_v2_abuses_path: Utils.route([["coub_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"abuses",false],[2,[7,"/",false],[2,[6,"mass_delete",false],[2,[7,"/",false],[2,[3,"coub_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
mass_destroy_api_v2_abuses_url: Utils.route([["coub_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"abuses",false],[2,[7,"/",false],[2,[6,"mass_delete",false],[2,[7,"/",false],[2,[3,"coub_id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// mass_follow_api_v2_follows => /api/v2/follows/mass_follow(.:format)
  // function(options)
  mass_follow_api_v2_follows_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"mass_follow",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
mass_follow_api_v2_follows_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"follows",false],[2,[7,"/",false],[2,[6,"mass_follow",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// mastercard2017_quiz => /travelmastercard/quiz(.:format)
  // function(options)
  mastercard2017_quiz_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"travelmastercard",false],[2,[7,"/",false],[2,[6,"quiz",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
mastercard2017_quiz_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"travelmastercard",false],[2,[7,"/",false],[2,[6,"quiz",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// mastercard2017_quiz_result => /travelmastercard/quiz/result(.:format)
  // function(options)
  mastercard2017_quiz_result_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"travelmastercard",false],[2,[7,"/",false],[2,[6,"quiz",false],[2,[7,"/",false],[2,[6,"result",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
mastercard2017_quiz_result_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"travelmastercard",false],[2,[7,"/",false],[2,[6,"quiz",false],[2,[7,"/",false],[2,[6,"result",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// me_api_v2_users => /api/v2/users/me(.:format)
  // function(options)
  me_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"me",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
me_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"me",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// media_page => /media
  // function(options)
  media_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"media",false]]),
media_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"media",false]], true),
// mediaforce_between_hb_test_page_index => /test_page/mediaforce_between_hb
  // function(options)
  mediaforce_between_hb_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce_between_hb",false]]]]),
mediaforce_between_hb_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce_between_hb",false]]]], true),
// mediaforce_feed_new_test_page_index => /test_page/mediaforce_feed_new
  // function(options)
  mediaforce_feed_new_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce_feed_new",false]]]]),
mediaforce_feed_new_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce_feed_new",false]]]], true),
// mediaforce_player_hb_test_page_index => /test_page/mediaforce_player_hb
  // function(options)
  mediaforce_player_hb_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce_player_hb",false]]]]),
mediaforce_player_hb_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce_player_hb",false]]]], true),
// mediaforce_test_page_index => /test_page/mediaforce
  // function(options)
  mediaforce_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce",false]]]]),
mediaforce_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mediaforce",false]]]], true),
// memes_api_v2_best => /api/v2/best/:id/memes(.:format)
  // function(id, options)
  memes_api_v2_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"memes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
memes_api_v2_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"memes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// meta_test_page_index => /test_page/meta
  // function(options)
  meta_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"meta",false]]]]),
meta_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"meta",false]]]], true),
// mgid_test_page_index => /test_page/mgid
  // function(options)
  mgid_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mgid",false]]]]),
mgid_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"mgid",false]]]], true),
// moderated_coubs_admin_user => /admin/users/:id/moderated_coubs(.:format)
  // function(id, options)
  moderated_coubs_admin_user_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"moderated_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
moderated_coubs_admin_user_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"moderated_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// more_from_source_api_v2_coub => /api/v2/coubs/:id/more_from_source(.:format)
  // function(id, options)
  more_from_source_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"more_from_source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
more_from_source_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"more_from_source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// moxtv_test_page_index => /test_page/moxtv
  // function(options)
  moxtv_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"moxtv",false]]]]),
moxtv_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"moxtv",false]]]], true),
// my_api_v2_channel_recommendations => /api/v2/channels/:channel_id/recommendations/my(.:format)
  // function(channel_id, options)
  my_api_v2_channel_recommendations_path: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"recommendations",false],[2,[7,"/",false],[2,[6,"my",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
my_api_v2_channel_recommendations_url: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"recommendations",false],[2,[7,"/",false],[2,[6,"my",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// nativeroll_test_page_index => /test_page/nativeroll
  // function(options)
  nativeroll_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"nativeroll",false]]]]),
nativeroll_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"nativeroll",false]]]], true),
// new_admin_best => /admin/bests/new(.:format)
  // function(options)
  new_admin_best_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_best_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"bests",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_best_tab => /admin/best_tabs/new(.:format)
  // function(options)
  new_admin_best_tab_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_best_tab_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_category => /admin/categories/new(.:format)
  // function(options)
  new_admin_category_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_category_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_channel_category => /admin/channel_categories/new(.:format)
  // function(options)
  new_admin_channel_category_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_channel_category_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_emoji => /admin/emojis/new(.:format)
  // function(options)
  new_admin_emoji_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_emoji_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_faq => /admin/faqs/new(.:format)
  // function(options)
  new_admin_faq_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_faq_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_faq_category => /admin/faq_categories/new(.:format)
  // function(options)
  new_admin_faq_category_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_faq_category_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_image_block => /admin/image_blocks/new(.:format)
  // function(options)
  new_admin_image_block_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_image_block_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"image_blocks",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_media_block => /admin/media_blocks/new(.:format)
  // function(options)
  new_admin_media_block_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_media_block_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"media_blocks",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_mobile_banner => /admin/mobile_banners/new(.:format)
  // function(options)
  new_admin_mobile_banner_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_admin_mobile_banner_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"mobile_banners",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_admin_promo_coubs_carousel => /admin/promo/coubs_carousels/new(.:format)
  // function(options)
  new_admin_promo_coubs_carousel_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_admin_promo_coubs_carousel_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"coubs_carousels",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_admin_promo_pro_group => /admin/promo/pro_groups/new(.:format)
  // function(options)
  new_admin_promo_pro_group_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_admin_promo_pro_group_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_groups",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_admin_promo_pro_group_coub => /admin/promo/pro_group_coubs/new(.:format)
  // function(options)
  new_admin_promo_pro_group_coub_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_admin_promo_pro_group_coub_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"pro_group_coubs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_admin_trending_trend_region => /admin/trending/trend_regions/new(.:format)
  // function(options)
  new_admin_trending_trend_region_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_admin_trending_trend_region_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"trend_regions",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_ads_ad_overlay => /ads/ad_overlays/new(.:format)
  // function(options)
  new_ads_ad_overlay_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_ad_overlay_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_ads_editor_background => /ads/editor_backgrounds/new(.:format)
  // function(options)
  new_ads_editor_background_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_editor_background_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"editor_backgrounds",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_ads_overlay => /ads/overlays/new(.:format)
  // function(options)
  new_ads_overlay_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_overlay_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"overlays",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_ads_promo_audio_track => /ads/promo_audio_tracks/new(.:format)
  // function(options)
  new_ads_promo_audio_track_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_promo_audio_track_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_audio_tracks",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_ads_promo_background => /ads/promo_backgrounds/new(.:format)
  // function(options)
  new_ads_promo_background_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_promo_background_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_backgrounds",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_ads_promo_rule => /ads/promo_rules/new(.:format)
  // function(options)
  new_ads_promo_rule_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_promo_rule_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"promo_rules",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_ads_tag_promo_background => /ads/tag_promo_backgrounds/new(.:format)
  // function(options)
  new_ads_tag_promo_background_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_ads_tag_promo_background_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"tag_promo_backgrounds",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_api_v2_invite => /api/v2/invites/new(.:format)
  // function(options)
  new_api_v2_invite_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_api_v2_invite_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_api_v2_password => /api/v2/passwords/new(.:format)
  // function(options)
  new_api_v2_password_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_api_v2_password_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_api_v2_raw_video => /api/v2/raw_videos/new(.:format)
  // function(options)
  new_api_v2_raw_video_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_api_v2_raw_video_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_api_v2_story => /api/v2/stories/new(.:format)
  // function(options)
  new_api_v2_story_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
new_api_v2_story_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// new_category_mail_test_page_index => /test_page/new_category_mail
  // function(options)
  new_category_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"new_category_mail",false]]]]),
new_category_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"new_category_mail",false]]]], true),
// new_coub => /coubs/new(.:format)
  // function(options)
  new_coub_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
new_coub_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// new_dev_application => /dev/applications/new(.:format)
  // function(options)
  new_dev_application_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_dev_application_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_editor_coub_of_the_day => /editor/coub_of_the_days/new(.:format)
  // function(options)
  new_editor_coub_of_the_day_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coub_of_the_days",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_editor_coub_of_the_day_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coub_of_the_days",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_editor_mail_test_page_index => /test_page/new_editor_mail
  // function(options)
  new_editor_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"new_editor_mail",false]]]]),
new_editor_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"new_editor_mail",false]]]], true),
// new_editor_promo => /new-editor
  // function(options)
  new_editor_promo_path: Utils.route([], {}, [2,[7,"/",false],[6,"new-editor",false]]),
new_editor_promo_url: Utils.route([], {}, [2,[7,"/",false],[6,"new-editor",false]], true),
// new_hot => /new-hot
  // function(options)
  new_hot_path: Utils.route([], {}, [2,[7,"/",false],[6,"new-hot",false]]),
new_hot_url: Utils.route([], {}, [2,[7,"/",false],[6,"new-hot",false]], true),
// new_oauth_application => /oauth/applications/new(.:format)
  // function(options)
  new_oauth_application_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
new_oauth_application_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// new_promoted_coub => /promote/new
  // function(options)
  new_promoted_coub_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[6,"new",false]]]]),
new_promoted_coub_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[6,"new",false]]]], true),
// new_raw_video => /raw_videos/new(.:format)
  // function(options)
  new_raw_video_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
new_raw_video_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// new_rising => /new-rising
  // function(options)
  new_rising_path: Utils.route([], {}, [2,[7,"/",false],[6,"new-rising",false]]),
new_rising_url: Utils.route([], {}, [2,[7,"/",false],[6,"new-rising",false]], true),
// new_story => /stories/new(.:format)
  // function(options)
  new_story_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
new_story_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// new_user => /users/new(.:format)
  // function(options)
  new_user_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
new_user_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// new_user_coubs_stats => /stats/new_user_coubs(.:format)
  // function(options)
  new_user_coubs_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"new_user_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
new_user_coubs_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"new_user_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// nicetry => /getvideo
  // function(options)
  nicetry_path: Utils.route([], {}, [2,[7,"/",false],[6,"getvideo",false]]),
nicetry_url: Utils.route([], {}, [2,[7,"/",false],[6,"getvideo",false]], true),
// ninegag_post_api_v2_coubs => /api/v2/coubs/ninegag_post(.:format)
  // function(options)
  ninegag_post_api_v2_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"ninegag_post",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
ninegag_post_api_v2_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"ninegag_post",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// notifications_group => /notifications_groups/:id(.:format)
  // function(id, options)
  notifications_group_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"notifications_groups",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
notifications_group_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"notifications_groups",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// notifications_viewed_api_v2_channels => /api/v2/channels/notifications_viewed(.:format)
  // function(options)
  notifications_viewed_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"notifications_viewed",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
notifications_viewed_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"notifications_viewed",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// oauth_application => /oauth/applications/:id(.:format)
  // function(id, options)
  oauth_application_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
oauth_application_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// oauth_applications => /oauth/applications(.:format)
  // function(options)
  oauth_applications_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
oauth_applications_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// oauth_authorization => /dev/oauth/authorize(.:format)
  // function(options)
  oauth_authorization_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"authorize",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
oauth_authorization_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"authorize",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// oauth_authorized_application => /oauth/authorized_applications/:id(.:format)
  // function(id, options)
  oauth_authorized_application_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"authorized_applications",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
oauth_authorized_application_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"authorized_applications",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// oauth_authorized_applications => /oauth/authorized_applications(.:format)
  // function(options)
  oauth_authorized_applications_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"authorized_applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
oauth_authorized_applications_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"authorized_applications",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// oauth_revoke => /dev/oauth/revoke(.:format)
  // function(options)
  oauth_revoke_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"revoke",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
oauth_revoke_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"revoke",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// oauth_signin => /oauth/signin(.:format)
  // function(options)
  oauth_signin_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"signin",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
oauth_signin_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"signin",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// oauth_token => /dev/oauth/token(.:format)
  // function(options)
  oauth_token_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
oauth_token_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// oauth_token_info => /dev/oauth/token/info(.:format)
  // function(options)
  oauth_token_info_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"token",false],[2,[7,"/",false],[2,[6,"info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
oauth_token_info_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"dev",false],[2,[7,"/",false],[2,[6,"oauth",false],[2,[7,"/",false],[2,[6,"token",false],[2,[7,"/",false],[2,[6,"info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// oembed_service => /oembed_service
  // function(options)
  oembed_service_path: Utils.route([], {}, [2,[7,"/",false],[6,"oembed_service",false]]),
oembed_service_url: Utils.route([], {}, [2,[7,"/",false],[6,"oembed_service",false]], true),
// og_image_api_v2_coub => /api/v2/coubs/:id/og_image(.:format)
  // function(id, options)
  og_image_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"og_image",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
og_image_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"og_image",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// ok_embeds_test_page_index => /test_page/ok_embeds
  // function(options)
  ok_embeds_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"ok_embeds",false]]]]),
ok_embeds_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"ok_embeds",false]]]], true),
// old_favourites => /favourites(.:format)
  // function(options)
  old_favourites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"favourites",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
old_favourites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"favourites",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// old_terms_of_service_policy_page => /copyright(.:format)
  // function(options)
  old_terms_of_service_policy_page_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"copyright",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
old_terms_of_service_policy_page_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"copyright",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// payments_qiwi_callback => /payments/qiwi_callback(.:format)
  // function(options)
  payments_qiwi_callback_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"payments",false],[2,[7,"/",false],[2,[6,"qiwi_callback",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
payments_qiwi_callback_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"payments",false],[2,[7,"/",false],[2,[6,"qiwi_callback",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// pop_editor_coub => /editor/coubs/:id/pop(.:format)
  // function(id, options)
  pop_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"pop",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
pop_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"pop",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// popular_banned_stats => /stats/popular_banned(.:format)
  // function(options)
  popular_banned_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"popular_banned",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
popular_banned_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"popular_banned",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// processing_status_api_v2_coub => /api/v2/coubs/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_api_v2_external_download => /api/v2/external_downloads/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_external_download_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_external_download_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_api_v2_raw_video => /api/v2/raw_videos/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_api_v2_raw_video_announcement => /api/v2/raw_video_announcements/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_raw_video_announcement_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_video_announcements",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_raw_video_announcement_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"raw_video_announcements",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_api_v2_rtmp_upload => /api/v2/rtmp_uploads/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_rtmp_upload_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"rtmp_uploads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_rtmp_upload_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"rtmp_uploads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_api_v2_segment => /api/v2/segments/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_segment_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"segments",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_segment_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"segments",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_api_v2_temp_upload => /api/v2/temp_uploads/:id/processing_status(.:format)
  // function(id, options)
  processing_status_api_v2_temp_upload_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"temp_uploads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
processing_status_api_v2_temp_upload_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"temp_uploads",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// processing_status_raw_video => /raw_videos/:id/processing_status(.:format)
  // function(id, options)
  processing_status_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
processing_status_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"processing_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// profile_edit => /:id/edit(.:format)
  // function(id, options)
  profile_edit_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
profile_edit_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// profile_notifications_viewed => /profile/notifications_viewed(.:format)
  // function(options)
  profile_notifications_viewed_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"profile",false],[2,[7,"/",false],[2,[6,"notifications_viewed",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
profile_notifications_viewed_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"profile",false],[2,[7,"/",false],[2,[6,"notifications_viewed",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// promo_main_page_coubs => /promo/main_page_coubs/:version(.:format)
  // function(version, options)
  promo_main_page_coubs_path: Utils.route([["version",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"main_page_coubs",false],[2,[7,"/",false],[2,[3,"version",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
promo_main_page_coubs_url: Utils.route([["version",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"main_page_coubs",false],[2,[7,"/",false],[2,[3,"version",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// promo_rules => /promo/rules/:template(.:format)
  // function(template, options)
  promo_rules_path: Utils.route([["template",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"rules",false],[2,[7,"/",false],[2,[3,"template",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
promo_rules_url: Utils.route([["template",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"rules",false],[2,[7,"/",false],[2,[3,"template",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// promo_veon => /promo/veon(.:format)
  // function(options)
  promo_veon_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"veon",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
promo_veon_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"veon",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// promoted_coub => /promote/:id
  // function(id, options)
  promoted_coub_path: Utils.route([["id",true]], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[3,"id",false]]]]),
promoted_coub_url: Utils.route([["id",true]], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[3,"id",false]]]], true),
// promoted_coubs => /promote
  // function(options)
  promoted_coubs_path: Utils.route([], {}, [2,[7,"/",false],[6,"promote",false]]),
promoted_coubs_url: Utils.route([], {}, [2,[7,"/",false],[6,"promote",false]], true),
// publish_now_api_v2_editor_explore_index => /api/v2/editor/explore/publish_now(.:format)
  // function(options)
  publish_now_api_v2_editor_explore_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"publish_now",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
publish_now_api_v2_editor_explore_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"explore",false],[2,[7,"/",false],[2,[6,"publish_now",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// publish_now_editor_coub => /editor/coubs/:id/publish_now(.:format)
  // function(id, options)
  publish_now_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"publish_now",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
publish_now_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"publish_now",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// push_notification_test_page_index => /test_page/push_notification
  // function(options)
  push_notification_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"push_notification",false]]]]),
push_notification_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"push_notification",false]]]], true),
// random => /random(/:sort_type)
  // function(options)
  random_path: Utils.route([["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"random",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]]),
random_url: Utils.route([["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"random",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]], true),
// random_coubs => /coubs/random(.:format)
  // function(options)
  random_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"random",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
random_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"random",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// random_stats => /stats/random(.:format)
  // function(options)
  random_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"random",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
random_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"random",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// random_suggestions_api_v2_coub => /api/v2/coubs/:id/random_suggestions(.:format)
  // function(id, options)
  random_suggestions_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"random_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
random_suggestions_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"random_suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// raw_video => /raw_videos/:id(.:format)
  // function(id, options)
  raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// raw_videos => /raw_videos(.:format)
  // function(options)
  raw_videos_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
raw_videos_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// reattach_channels_api_v2_users => /api/v2/users/reattach_channels(.:format)
  // function(options)
  reattach_channels_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"reattach_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
reattach_channels_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"reattach_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// recent_api_editor_stories => /api/editor/stories/recent(.:format)
  // function(options)
  recent_api_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"recent",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
recent_api_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"recent",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// recent_api_v2_channels => /api/v2/channels/recent(.:format)
  // function(options)
  recent_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"recent",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
recent_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"recent",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// recent_editor_stories => /editor/stories/recent(.:format)
  // function(options)
  recent_editor_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"recent",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
recent_editor_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"recent",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// recommended_api_v2_friends => /api/v2/friends/recommended(.:format)
  // function(options)
  recommended_api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"recommended",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
recommended_api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"recommended",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// recoub_mail_test_page_index => /test_page/recoub_mail
  // function(options)
  recoub_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"recoub_mail",false]]]]),
recoub_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"recoub_mail",false]]]], true),
// recoubs_list_api_v2_action_subjects_data => /api/v2/action_subjects_data/recoubs_list(.:format)
  // function(options)
  recoubs_list_api_v2_action_subjects_data_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"recoubs_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
recoubs_list_api_v2_action_subjects_data_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"recoubs_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// recoubs_queue_editor_channel => /editor/channels/:id/recoubs_queue(.:format)
  // function(id, options)
  recoubs_queue_editor_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"recoubs_queue",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
recoubs_queue_editor_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"recoubs_queue",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// recover_password => /recover_password(.:format)
  // function(options)
  recover_password_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"recover_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
recover_password_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"recover_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// recover_password_api_v2_passwords => /api/v2/passwords/recover_password(.:format)
  // function(options)
  recover_password_api_v2_passwords_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"recover_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
recover_password_api_v2_passwords_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"recover_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// redo_api_v2_editor_coub => /api/v2/editor/coubs/:id/redo(.:format)
  // function(id, options)
  redo_api_v2_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"redo",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
redo_api_v2_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"redo",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// regular_update_test_page_index => /test_page/regular_update
  // function(options)
  regular_update_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"regular_update",false]]]]),
regular_update_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"regular_update",false]]]], true),
// reject_editor_promoted_coub => /editor/promoted_coubs/:id/reject(.:format)
  // function(id, options)
  reject_editor_promoted_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"reject",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
reject_editor_promoted_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"promoted_coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"reject",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// related_channels_api_v2_tags => /api/v2/tags/:tag_name/related_channels(.:format)
  // function(tag_name, options)
  related_channels_api_v2_tags_path: Utils.route([["tag_name",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"tag_name",false],[2,[7,"/",false],[2,[6,"related_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
related_channels_api_v2_tags_url: Utils.route([["tag_name",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"tag_name",false],[2,[7,"/",false],[2,[6,"related_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// related_tags_api_v2_tags => /api/v2/tags/:tag_name/related_tags(.:format)
  // function(tag_name, options)
  related_tags_api_v2_tags_path: Utils.route([["tag_name",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"tag_name",false],[2,[7,"/",false],[2,[6,"related_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
related_tags_api_v2_tags_url: Utils.route([["tag_name",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"tag_name",false],[2,[7,"/",false],[2,[6,"related_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// remix_coub => /coubs/:id/remix(.:format)
  // function(id, options)
  remix_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remix",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
remix_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remix",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// remixes_list_api_v2_action_subjects_data => /api/v2/action_subjects_data/remixes_list(.:format)
  // function(options)
  remixes_list_api_v2_action_subjects_data_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"remixes_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
remixes_list_api_v2_action_subjects_data_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[6,"remixes_list",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// remove_auth_api_v2_channels => /api/v2/channels/remove_auth(.:format)
  // function(options)
  remove_auth_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"remove_auth",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
remove_auth_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"remove_auth",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// remove_device_token_api_v2_users => /api/v2/users/remove_device_token(.:format)
  // function(options)
  remove_device_token_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"remove_device_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
remove_device_token_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"remove_device_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// remove_from_edited_editor_coub => /editor/coubs/:id/remove_from_edited(.:format)
  // function(id, options)
  remove_from_edited_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_from_edited",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
remove_from_edited_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_from_edited",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// remove_from_editorial_channels_editor_coub => /editor/coubs/:id/remove_from_editorial_channels(.:format)
  // function(id, options)
  remove_from_editorial_channels_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_from_editorial_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
remove_from_editorial_channels_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_from_editorial_channels",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// remove_search_tag_editor_coub => /editor/coubs/:id/remove_search_tag(.:format)
  // function(id, options)
  remove_search_tag_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_search_tag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
remove_search_tag_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_search_tag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// remove_tags_api_v2_editor_coub => /api/v2/editor/coubs/:id/remove_tags(.:format)
  // function(id, options)
  remove_tags_api_v2_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
remove_tags_api_v2_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"remove_tags",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// reorder_api_editor_delayed_reposts => /api/editor/delayed_reposts/reorder(.:format)
  // function(options)
  reorder_api_editor_delayed_reposts_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delayed_reposts",false],[2,[7,"/",false],[2,[6,"reorder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
reorder_api_editor_delayed_reposts_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"delayed_reposts",false],[2,[7,"/",false],[2,[6,"reorder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// reorder_api_editor_story_features => /api/editor/story_features/reorder(.:format)
  // function(options)
  reorder_api_editor_story_features_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[6,"reorder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
reorder_api_editor_story_features_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[6,"reorder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// reorder_api_v2_unified_admin_coub => /api/v2/unified_admin/coubs/:id/reorder(.:format)
  // function(id, options)
  reorder_api_v2_unified_admin_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"unified_admin",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"reorder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
reorder_api_v2_unified_admin_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"unified_admin",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"reorder",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// repost => /reposts/:id(.:format)
  // function(id, options)
  repost_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"reposts",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
repost_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"reposts",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// reposts => /reposts(.:format)
  // function(options)
  reposts_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
reposts_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"reposts",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// resend_email_verification_api_v2_users => /api/v2/users/resend_email_verification(.:format)
  // function(options)
  resend_email_verification_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"resend_email_verification",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
resend_email_verification_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"resend_email_verification",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// resend_email_verification_users => /users/resend_email_verification(.:format)
  // function(options)
  resend_email_verification_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"resend_email_verification",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
resend_email_verification_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"resend_email_verification",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// reset_password => /reset_password(.:format)
  // function(options)
  reset_password_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"reset_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
reset_password_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"reset_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// reset_password_api_v2_passwords => /api/v2/passwords/reset_password(.:format)
  // function(options)
  reset_password_api_v2_passwords_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"reset_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
reset_password_api_v2_passwords_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"reset_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// reset_password_mail_test_page_index => /test_page/reset_password_mail
  // function(options)
  reset_password_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"reset_password_mail",false]]]]),
reset_password_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"reset_password_mail",false]]]], true),
// reset_password_users => /users/reset_password(.:format)
  // function(options)
  reset_password_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"reset_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
reset_password_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"reset_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// rising => /rising
  // function(options)
  rising_path: Utils.route([], {}, [2,[7,"/",false],[6,"rising",false]]),
rising_url: Utils.route([], {}, [2,[7,"/",false],[6,"rising",false]], true),
// rising_api_v2_timeline_index => /api/v2/timeline/rising(.:format)
  // function(options)
  rising_api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"rising",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
rising_api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"rising",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// root => /
  // function(options)
  root_path: Utils.route([], {}, [7,"/",false]),
root_url: Utils.route([], {}, [7,"/",false], true),
// save_name_promoted_coubs => /promote/save_name
  // function(options)
  save_name_promoted_coubs_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[6,"save_name",false]]]]),
save_name_promoted_coubs_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"promote",false],[2,[7,"/",false],[6,"save_name",false]]]], true),
// save_status_api_v2_avatar_moderations => /api/v2/avatar_moderations/save_status(.:format)
  // function(options)
  save_status_api_v2_avatar_moderations_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"avatar_moderations",false],[2,[7,"/",false],[2,[6,"save_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
save_status_api_v2_avatar_moderations_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"avatar_moderations",false],[2,[7,"/",false],[2,[6,"save_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// schedule_api_editor_story_feature => /api/editor/story_features/:id/schedule(.:format)
  // function(id, options)
  schedule_api_editor_story_feature_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"schedule",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
schedule_api_editor_story_feature_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"schedule",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// scheduled_api_editor_story_features => /api/editor/story_features/scheduled(.:format)
  // function(options)
  scheduled_api_editor_story_features_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[6,"scheduled",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
scheduled_api_editor_story_features_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[6,"scheduled",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// search => /search(/:sort_type)(.:format)
  // function(options)
  search_path: Utils.route([["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"search",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]),
search_url: Utils.route([["sort_type",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"search",false],[2,[1,[2,[7,"/",false],[3,"sort_type",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]], true),
// search_api_v2_tags => /api/v2/tags/search(.:format)
  // function(options)
  search_api_v2_tags_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
search_api_v2_tags_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[6,"search",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// secure_resque_server => /resque
  // function(options)
  secure_resque_server_path: Utils.route([], {}, [2,[7,"/",false],[6,"resque",false]]),
secure_resque_server_url: Utils.route([], {}, [2,[7,"/",false],[6,"resque",false]], true),
// segment_source_coubs_api_v2_users => /api/v2/users/segment_source_coubs(.:format)
  // function(options)
  segment_source_coubs_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"segment_source_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
segment_source_coubs_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"segment_source_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// segments_api_v2_coub => /api/v2/coubs/:id/segments(.:format)
  // function(id, options)
  segments_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"segments",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
segments_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"segments",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// selectable_trends_api_editor_coubs => /api/editor/coubs/selectable_trends(.:format)
  // function(options)
  selectable_trends_api_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"selectable_trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
selectable_trends_api_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"selectable_trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// selectable_trends_editor_coubs => /editor/coubs/selectable_trends(.:format)
  // function(options)
  selectable_trends_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"selectable_trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
selectable_trends_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"selectable_trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// send_test_mail_editor_weekly_digest => /editor/weekly_digests/:id/send_test_mail(.:format)
  // function(id, options)
  send_test_mail_editor_weekly_digest_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"send_test_mail",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
send_test_mail_editor_weekly_digest_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"weekly_digests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"send_test_mail",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// set_categories_coub => /coubs/:id/set_categories(.:format)
  // function(id, options)
  set_categories_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"set_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
set_categories_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"set_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// set_copyright_claim_editor_coub => /editor/coubs/:id/set_copyright_claim(.:format)
  // function(id, options)
  set_copyright_claim_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"set_copyright_claim",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
set_copyright_claim_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"set_copyright_claim",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// set_global_safe_status_editor_coub => /editor/coubs/:id/set_global_safe_status(.:format)
  // function(id, options)
  set_global_safe_status_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"set_global_safe_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
set_global_safe_status_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"set_global_safe_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// set_new_password => /set_new_password/:token(.:format)
  // function(token, options)
  set_new_password_path: Utils.route([["token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"set_new_password",false],[2,[7,"/",false],[2,[3,"token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
set_new_password_url: Utils.route([["token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"set_new_password",false],[2,[7,"/",false],[2,[3,"token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// set_new_password_api_v2_passwords => /api/v2/passwords/set_new_password(.:format)
  // function(options)
  set_new_password_api_v2_passwords_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"set_new_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
set_new_password_api_v2_passwords_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"passwords",false],[2,[7,"/",false],[2,[6,"set_new_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// set_previous_api_v2_channel_backgrounds => /api/v2/channels/:channel_id/backgrounds/set_previous(.:format)
  // function(channel_id, options)
  set_previous_api_v2_channel_backgrounds_path: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[2,[7,"/",false],[2,[6,"set_previous",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
set_previous_api_v2_channel_backgrounds_url: Utils.route([["channel_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"channel_id",false],[2,[7,"/",false],[2,[6,"backgrounds",false],[2,[7,"/",false],[2,[6,"set_previous",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// share_coub_api_v2_action_subjects_datum => /api/v2/action_subjects_data/:id/share_coub(.:format)
  // function(id, options)
  share_coub_api_v2_action_subjects_datum_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
share_coub_api_v2_action_subjects_datum_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"action_subjects_data",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// share_video_status_api_v2_coub => /api/v2/coubs/:id/share_video_status(.:format)
  // function(id, options)
  share_video_status_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_video_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
share_video_status_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_video_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// share_video_to_twitter_api_v2_coub => /api/v2/coubs/:id/share_video_to_twitter(.:format)
  // function(id, options)
  share_video_to_twitter_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_video_to_twitter",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
share_video_to_twitter_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_video_to_twitter",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// share_video_to_vkontakte_api_v2_coub => /api/v2/coubs/:id/share_video_to_vkontakte(.:format)
  // function(id, options)
  share_video_to_vkontakte_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_video_to_vkontakte",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
share_video_to_vkontakte_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"share_video_to_vkontakte",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// short_view_coub_by_permalink => /v/:id(.:format)
  // function(id, options)
  short_view_coub_by_permalink_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"v",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
short_view_coub_by_permalink_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"v",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// show_debug_info_api_v2_coub => /api/v2/coubs/:id/show_debug_info(.:format)
  // function(id, options)
  show_debug_info_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"show_debug_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
show_debug_info_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"show_debug_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// show_unregistered_friends_api_v2_friends => /api/v2/friends/show_unregistered_friends(.:format)
  // function(options)
  show_unregistered_friends_api_v2_friends_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"show_unregistered_friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
show_unregistered_friends_api_v2_friends_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"friends",false],[2,[7,"/",false],[2,[6,"show_unregistered_friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// sign_popup_test_page_index => /test_page/sign_popup
  // function(options)
  sign_popup_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"sign_popup",false]]]]),
sign_popup_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"sign_popup",false]]]], true),
// signin => /signin(.:format)
  // function(options)
  signin_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"signin",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
signin_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"signin",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// signin_api_v2_sessions => /api/v2/sessions/signin(.:format)
  // function(options)
  signin_api_v2_sessions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"signin",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
signin_api_v2_sessions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"signin",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// signout => /signout(.:format)
  // function(options)
  signout_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"signout",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
signout_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"signout",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// signup => /signup(.:format)
  // function(options)
  signup_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"signup",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
signup_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"signup",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// signup_api_v2_sessions => /api/v2/sessions/signup(.:format)
  // function(options)
  signup_api_v2_sessions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"signup",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
signup_api_v2_sessions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"signup",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// signup_page_data_invites => /invites/signup_page_data(.:format)
  // function(options)
  signup_page_data_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"signup_page_data",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
signup_page_data_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"signup_page_data",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// signup_page_invites => /invites(/:fid)(.:format)
  // function(options)
  signup_page_invites_path: Utils.route([["fid",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"invites",false],[2,[1,[2,[7,"/",false],[3,"fid",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]),
signup_page_invites_url: Utils.route([["fid",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"invites",false],[2,[1,[2,[7,"/",false],[3,"fid",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]], true),
// source => /sources/:id(.:format)
  // function(id, options)
  source_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"sources",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
source_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"sources",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// source_api_v2_coub => /api/v2/coubs/:id/source(.:format)
  // function(id, options)
  source_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
source_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"source",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// sources_api_v2_coub => /api/v2/coubs/:id/sources(.:format)
  // function(id, options)
  sources_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"sources",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
sources_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"sources",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// split_dashboard => /admin/split_panel
  // function(options)
  split_dashboard_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[6,"split_panel",false]]]]),
split_dashboard_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[6,"split_panel",false]]]], true),
// start_api_v2_ab_mobile_test => /api/v2/ab_mobile_tests/:id/start(.:format)
  // function(id, options)
  start_api_v2_ab_mobile_test_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"ab_mobile_tests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"start",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
start_api_v2_ab_mobile_test_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"ab_mobile_tests",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"start",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// stats => /stats(.:format)
  // function(options)
  stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// stats_ads_ad_overlay => /ads/ad_overlays/:id/stats(.:format)
  // function(id, options)
  stats_ads_ad_overlay_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
stats_ads_ad_overlay_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"ads",false],[2,[7,"/",false],[2,[6,"ad_overlays",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"stats",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// status_api_v2_sessions => /api/v2/sessions/status(.:format)
  // function(options)
  status_api_v2_sessions_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
status_api_v2_sessions_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"sessions",false],[2,[7,"/",false],[2,[6,"status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// status_api_v2_upload_audio => /api/v2/upload/audio/:id/status(.:format)
  // function(id, options)
  status_api_v2_upload_audio_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"audio",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
status_api_v2_upload_audio_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"audio",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// status_api_v2_upload_video => /api/v2/upload/video/:id/status(.:format)
  // function(id, options)
  status_api_v2_upload_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"video",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
status_api_v2_upload_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"upload",false],[2,[7,"/",false],[2,[6,"video",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]], true),
// stories_api_v2_best => /api/v2/best/:id/stories(.:format)
  // function(id, options)
  stories_api_v2_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
stories_api_v2_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// stories_api_v2_timeline_index => /api/v2/timeline/stories(.:format)
  // function(options)
  stories_api_v2_timeline_index_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
stories_api_v2_timeline_index_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"stories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// stories_feed_page => /stories
  // function(options)
  stories_feed_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"stories",false]]),
stories_feed_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"stories",false]], true),
// story => /stories/:id(.:format)
  // function(id, options)
  story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// story_memes_api_v2_best => /api/v2/best/:id/story_memes(.:format)
  // function(id, options)
  story_memes_api_v2_best_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"story_memes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
story_memes_api_v2_best_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"best",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"story_memes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// subscribe_api_v2_community => /api/v2/communities/:id/subscribe(.:format)
  // function(id, options)
  subscribe_api_v2_community_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"subscribe",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
subscribe_api_v2_community_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"subscribe",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// subscribe_to_coubs_mail => /users/subscribe_to_coubs_mail/:coub(.:format)
  // function(coub, options)
  subscribe_to_coubs_mail_path: Utils.route([["coub",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"subscribe_to_coubs_mail",false],[2,[7,"/",false],[2,[3,"coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
subscribe_to_coubs_mail_url: Utils.route([["coub",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"subscribe_to_coubs_mail",false],[2,[7,"/",false],[2,[3,"coub",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// subscriptions_api_v2_timeline_index => /api/v2/timeline/subscriptions/:kind(.:format)
  // function(kind, options)
  subscriptions_api_v2_timeline_index_path: Utils.route([["kind",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"subscriptions",false],[2,[7,"/",false],[2,[3,"kind",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
subscriptions_api_v2_timeline_index_url: Utils.route([["kind",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"subscriptions",false],[2,[7,"/",false],[2,[3,"kind",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// suggestions_api_v2_stories => /api/v2/stories/suggestions(.:format)
  // function(options)
  suggestions_api_v2_stories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
suggestions_api_v2_stories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[6,"suggestions",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// tag => /tags/:id(/:sort_type)
  // function(id, options)
  tag_path: Utils.route([["id",true],["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]]]]),
tag_url: Utils.route([["id",true],["sort_type",false]], {}, [2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[7,"/",false],[3,"sort_type",false]],false]]]]], true),
// tag_adreport => /tags/:id/adreport(.:format)
  // function(id, options)
  tag_adreport_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"adreport",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
tag_adreport_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"tags",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"adreport",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// tag_api_v2_timeline_index => /api/v2/timeline/tag/:id(.:format)
  // function(id, options)
  tag_api_v2_timeline_index_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"tag",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
tag_api_v2_timeline_index_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"timeline",false],[2,[7,"/",false],[2,[6,"tag",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// tag_page => /tag
  // function(options)
  tag_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"tag",false]]),
tag_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"tag",false]], true),
// terms_of_service_api_page => /api-terms
  // function(options)
  terms_of_service_api_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"api-terms",false]]),
terms_of_service_api_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"api-terms",false]], true),
// terms_of_service_copyright_page => /dmca
  // function(options)
  terms_of_service_copyright_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"dmca",false]]),
terms_of_service_copyright_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"dmca",false]], true),
// terms_of_service_copyright_page_ru => /dmca/ru
  // function(options)
  terms_of_service_copyright_page_ru_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"dmca",false],[2,[7,"/",false],[6,"ru",false]]]]),
terms_of_service_copyright_page_ru_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"dmca",false],[2,[7,"/",false],[6,"ru",false]]]], true),
// terms_of_service_page => /tos
  // function(options)
  terms_of_service_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"tos",false]]),
terms_of_service_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"tos",false]], true),
// terms_of_service_page_ru => /tos/ru
  // function(options)
  terms_of_service_page_ru_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"tos",false],[2,[7,"/",false],[6,"ru",false]]]]),
terms_of_service_page_ru_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"tos",false],[2,[7,"/",false],[6,"ru",false]]]], true),
// terms_of_service_policy_page => /privacy
  // function(options)
  terms_of_service_policy_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"privacy",false]]),
terms_of_service_policy_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"privacy",false]], true),
// test_page_index => /test_page
  // function(options)
  test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[6,"test_page",false]]),
test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[6,"test_page",false]], true),
// test_pushes_test_page_index => /test_page/test_pushes
  // function(options)
  test_pushes_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"test_pushes",false]]]]),
test_pushes_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"test_pushes",false]]]], true),
// timeline_rss_index => /rss/:rss_token(.:format)
  // function(rss_token, options)
  timeline_rss_index_path: Utils.route([["rss_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rss",false],[2,[7,"/",false],[2,[3,"rss_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
timeline_rss_index_url: Utils.route([["rss_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rss",false],[2,[7,"/",false],[2,[3,"rss_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// timeline_vast_test_page_index => /test_page/timeline_vast
  // function(options)
  timeline_vast_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"timeline_vast",false]]]]),
timeline_vast_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"timeline_vast",false]]]], true),
// toggle_category_editor_coub => /editor/coubs/:id/toggle_category(.:format)
  // function(id, options)
  toggle_category_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"toggle_category",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
toggle_category_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"toggle_category",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// toggle_flag_editor_coub => /editor/coubs/:id/toggle_flag(.:format)
  // function(id, options)
  toggle_flag_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"toggle_flag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
toggle_flag_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"toggle_flag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// top_coubs_stats => /stats/top_coubs(.:format)
  // function(options)
  top_coubs_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"top_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
top_coubs_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"top_coubs",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// total_count_admin_audio_tracks => /admin/audio_tracks/total_count(.:format)
  // function(options)
  total_count_admin_audio_tracks_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[6,"total_count",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
total_count_admin_audio_tracks_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"audio_tracks",false],[2,[7,"/",false],[2,[6,"total_count",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// trends_api_editor_coubs => /api/editor/coubs/trends(.:format)
  // function(options)
  trends_api_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
trends_api_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// trends_editor_coubs => /editor/coubs/trends(.:format)
  // function(options)
  trends_editor_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
trends_editor_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"trends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// tumblr_embeds_test_page_index => /test_page/tumblr_embeds
  // function(options)
  tumblr_embeds_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"tumblr_embeds",false]]]]),
tumblr_embeds_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"tumblr_embeds",false]]]], true),
// unban_tag_admin_trending_like_weights => /admin/trending/like_weights/unban_tag(.:format)
  // function(options)
  unban_tag_admin_trending_like_weights_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[6,"unban_tag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
unban_tag_admin_trending_like_weights_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"trending",false],[2,[7,"/",false],[2,[6,"like_weights",false],[2,[7,"/",false],[2,[6,"unban_tag",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// unblock_account_api_v2_channel => /api/v2/channels/:id/unblock_account(.:format)
  // function(id, options)
  unblock_account_api_v2_channel_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"unblock_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
unblock_account_api_v2_channel_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"unblock_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// universal_image => /universal_image(.:format)
  // function(options)
  universal_image_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"universal_image",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
universal_image_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"universal_image",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// unregistered_fb_friends_api_v2_invites => /api/v2/invites/unregistered_fb_friends(.:format)
  // function(options)
  unregistered_fb_friends_api_v2_invites_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"unregistered_fb_friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
unregistered_fb_friends_api_v2_invites_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"invites",false],[2,[7,"/",false],[2,[6,"unregistered_fb_friends",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// unscheduled_api_editor_story_features => /api/editor/story_features/unscheduled(.:format)
  // function(options)
  unscheduled_api_editor_story_features_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[6,"unscheduled",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
unscheduled_api_editor_story_features_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"story_features",false],[2,[7,"/",false],[2,[6,"unscheduled",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// unsubscribe_api_v2_community => /api/v2/communities/:id/unsubscribe(.:format)
  // function(id, options)
  unsubscribe_api_v2_community_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"unsubscribe",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
unsubscribe_api_v2_community_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"unsubscribe",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// unsubscribe_by_token => /unsubscribe/:unsubscribe_token(/:kind)(.:format)
  // function(unsubscribe_token, options)
  unsubscribe_by_token_path: Utils.route([["unsubscribe_token",true],["kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"unsubscribe",false],[2,[7,"/",false],[2,[3,"unsubscribe_token",false],[2,[1,[2,[7,"/",false],[3,"kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]),
unsubscribe_by_token_url: Utils.route([["unsubscribe_token",true],["kind",false],["format",false]], {}, [2,[7,"/",false],[2,[6,"unsubscribe",false],[2,[7,"/",false],[2,[3,"unsubscribe_token",false],[2,[1,[2,[7,"/",false],[3,"kind",false]],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]], true),
// unsubscribe_from_coubs_mail => /unsubscribe_from_coubs_mail/:unsubscribe_token(.:format)
  // function(unsubscribe_token, options)
  unsubscribe_from_coubs_mail_path: Utils.route([["unsubscribe_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"unsubscribe_from_coubs_mail",false],[2,[7,"/",false],[2,[3,"unsubscribe_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
unsubscribe_from_coubs_mail_url: Utils.route([["unsubscribe_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"unsubscribe_from_coubs_mail",false],[2,[7,"/",false],[2,[3,"unsubscribe_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// unsubscribe_success => /unsubscribe/success(.:format)
  // function(options)
  unsubscribe_success_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"unsubscribe",false],[2,[7,"/",false],[2,[6,"success",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
unsubscribe_success_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"unsubscribe",false],[2,[7,"/",false],[2,[6,"success",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// update_avatar_api_v2_users => /api/v2/users/update_avatar(.:format)
  // function(options)
  update_avatar_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_avatar",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_avatar_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_avatar",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_categories_editor_coub => /editor/coubs/:id/update_categories(.:format)
  // function(id, options)
  update_categories_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_categories_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_content_admin_best_tab => /admin/best_tabs/:id/update_content(.:format)
  // function(id, options)
  update_content_admin_best_tab_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_content",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_content_admin_best_tab_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"best_tabs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_content",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_description_api_v2_community => /api/v2/communities/:id/update_description(.:format)
  // function(id, options)
  update_description_api_v2_community_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_description",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
update_description_api_v2_community_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"communities",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_description",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// update_features_api_editor_story => /api/editor/stories/:id/update_features(.:format)
  // function(id, options)
  update_features_api_editor_story_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_features",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
update_features_api_editor_story_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"stories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_features",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// update_flags_or_categories_editor_coub => /editor/coubs/:id/update_flags_or_categories(.:format)
  // function(id, options)
  update_flags_or_categories_editor_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_flags_or_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_flags_or_categories_editor_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"editor",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_flags_or_categories",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_from_new_editor_api_v2_coub => /api/v2/coubs/:id/update_from_new_editor(.:format)
  // function(id, options)
  update_from_new_editor_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_from_new_editor",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
update_from_new_editor_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_from_new_editor",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// update_info_api_v2_channels => /api/v2/channels/update_info(.:format)
  // function(options)
  update_info_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"update_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_info_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"update_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_info_api_v2_coub => /api/v2/coubs/:id/update_info(.:format)
  // function(id, options)
  update_info_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
update_info_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// update_order_admin_categories => /admin/categories/update_order(.:format)
  // function(options)
  update_order_admin_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
update_order_admin_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// update_order_admin_channel_categories => /admin/channel_categories/update_order(.:format)
  // function(options)
  update_order_admin_channel_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
update_order_admin_channel_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"channel_categories",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// update_order_admin_emojis => /admin/emojis/update_order(.:format)
  // function(options)
  update_order_admin_emojis_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
update_order_admin_emojis_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// update_order_admin_faq_categories => /admin/faq_categories/update_order(.:format)
  // function(options)
  update_order_admin_faq_categories_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
update_order_admin_faq_categories_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faq_categories",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// update_order_admin_faqs => /admin/faqs/update_order(.:format)
  // function(options)
  update_order_admin_faqs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
update_order_admin_faqs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[6,"update_order",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// update_phone_number_api_v2_users => /api/v2/users/update_phone_number(.:format)
  // function(options)
  update_phone_number_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_phone_number",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_phone_number_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_phone_number",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_private_info_api_v2_users => /api/v2/users/update_private_info(.:format)
  // function(options)
  update_private_info_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_private_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_private_info_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_private_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_regular_info_api_v2_users => /api/v2/users/update_regular_info(.:format)
  // function(options)
  update_regular_info_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_regular_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_regular_info_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"update_regular_info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_status_admin_faq => /admin/faqs/:id/update_status(.:format)
  // function(id, options)
  update_status_admin_faq_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_status_admin_faq_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"faqs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_status",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_video_title_raw_video => /raw_videos/:id/update_video_title(.:format)
  // function(id, options)
  update_video_title_raw_video_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_video_title",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
update_video_title_raw_video_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"raw_videos",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_video_title",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// update_views_count_api_v2_coubs => /api/v2/coubs/update_views_count(.:format)
  // function(options)
  update_views_count_api_v2_coubs_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"update_views_count",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_views_count_api_v2_coubs_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[6,"update_views_count",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// update_visibility_admin_emoji => /admin/emojis/:id/update_visibility(.:format)
  // function(id, options)
  update_visibility_admin_emoji_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_visibility",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
update_visibility_admin_emoji_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"emojis",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"update_visibility",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// upload_audio_api_v2_coub => /api/v2/coubs/:id/upload_audio(.:format)
  // function(id, options)
  upload_audio_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"upload_audio",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
upload_audio_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"upload_audio",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// upload_avatar_api_v2_channels => /api/v2/channels/upload_avatar(.:format)
  // function(options)
  upload_avatar_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"upload_avatar",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
upload_avatar_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"upload_avatar",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// upload_video_api_v2_coub => /api/v2/coubs/:id/upload_video(.:format)
  // function(id, options)
  upload_video_api_v2_coub_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"upload_video",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
upload_video_api_v2_coub_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"upload_video",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]], true),
// uploaded_api_v2_rtmp_uploads => /api/v2/rtmp_uploads/uploaded(.:format)
  // function(options)
  uploaded_api_v2_rtmp_uploads_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"rtmp_uploads",false],[2,[7,"/",false],[2,[6,"uploaded",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
uploaded_api_v2_rtmp_uploads_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"rtmp_uploads",false],[2,[7,"/",false],[2,[6,"uploaded",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// user => /users/:id(.:format)
  // function(id, options)
  user_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
user_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// users => /users(.:format)
  // function(options)
  users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]], true),
// users_stats => /stats/users(.:format)
  // function(options)
  users_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
users_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// validate_password_users => /users/validate_password(.:format)
  // function(options)
  validate_password_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"validate_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
validate_password_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"validate_password",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// validate_permalink_api_v2_channels => /api/v2/channels/validate_permalink(.:format)
  // function(options)
  validate_permalink_api_v2_channels_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"validate_permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
validate_permalink_api_v2_channels_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"channels",false],[2,[7,"/",false],[2,[6,"validate_permalink",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// verify_account_api_v2_users => /api/v2/users/verify_account(.:format)
  // function(options)
  verify_account_api_v2_users_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"verify_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
verify_account_api_v2_users_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"verify_account",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// verify_email => /users/verify_email/:confirmation_token(.:format)
  // function(confirmation_token, options)
  verify_email_path: Utils.route([["confirmation_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"verify_email",false],[2,[7,"/",false],[2,[3,"confirmation_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
verify_email_url: Utils.route([["confirmation_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"verify_email",false],[2,[7,"/",false],[2,[3,"confirmation_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]], true),
// verify_email_mail_test_page_index => /test_page/verify_email_mail
  // function(options)
  verify_email_mail_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"verify_email_mail",false]]]]),
verify_email_mail_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"verify_email_mail",false]]]], true),
// video_url_api_v2_external_downloads => /api/v2/external_downloads/video_url(.:format)
  // function(options)
  video_url_api_v2_external_downloads_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[2,[7,"/",false],[2,[6,"video_url",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
video_url_api_v2_external_downloads_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"external_downloads",false],[2,[7,"/",false],[2,[6,"video_url",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]], true),
// view_coub_by_permalink => /view/:id(.:format)
  // function(id, options)
  view_coub_by_permalink_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"view",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
view_coub_by_permalink_url: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"view",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// views_stats => /stats/views(.:format)
  // function(options)
  views_stats_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"views",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
views_stats_url: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"stats",false],[2,[7,"/",false],[2,[6,"views",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]], true),
// vine_import_page => /vine
  // function(options)
  vine_import_page_path: Utils.route([], {}, [2,[7,"/",false],[6,"vine",false]]),
vine_import_page_url: Utils.route([], {}, [2,[7,"/",false],[6,"vine",false]], true),
// vk_embeds_test_page_index => /test_page/vk_embeds
  // function(options)
  vk_embeds_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"vk_embeds",false]]]]),
vk_embeds_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"vk_embeds",false]]]], true),
// vote_coub_api_v2_promo_best2016_category => /api/v2/promo/best2016/categories/:id/coubs/:coub_id/vote(.:format)
  // function(id, coub_id, options)
  vote_coub_api_v2_promo_best2016_category_path: Utils.route([["id",true],["coub_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"coub_id",false],[2,[7,"/",false],[2,[6,"vote",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]]]]]]]),
vote_coub_api_v2_promo_best2016_category_url: Utils.route([["id",true],["coub_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v2",false],[2,[7,"/",false],[2,[6,"promo",false],[2,[7,"/",false],[2,[6,"best2016",false],[2,[7,"/",false],[2,[6,"categories",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"coubs",false],[2,[7,"/",false],[2,[3,"coub_id",false],[2,[7,"/",false],[2,[6,"vote",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]]]]]]], true),
// web_pushes => /web_pushes/safari/:version/pushPackages/:website_push_id
  // function(version, website_push_id, options)
  web_pushes_path: Utils.route([["version",true],["website_push_id",true]], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[2,[6,"safari",false],[2,[7,"/",false],[2,[3,"version",false],[2,[7,"/",false],[2,[6,"pushPackages",false],[2,[7,"/",false],[3,"website_push_id",false]]]]]]]]]]),
web_pushes_url: Utils.route([["version",true],["website_push_id",true]], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[2,[6,"safari",false],[2,[7,"/",false],[2,[3,"version",false],[2,[7,"/",false],[2,[6,"pushPackages",false],[2,[7,"/",false],[3,"website_push_id",false]]]]]]]]]], true),
// web_pushes_chrome_subscribe => /web_pushes/chrome/subscribe
  // function(options)
  web_pushes_chrome_subscribe_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[2,[6,"chrome",false],[2,[7,"/",false],[6,"subscribe",false]]]]]]),
web_pushes_chrome_subscribe_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[2,[6,"chrome",false],[2,[7,"/",false],[6,"subscribe",false]]]]]], true),
// web_pushes_chrome_unsubscribe => /web_pushes/chrome/unsubscribe
  // function(options)
  web_pushes_chrome_unsubscribe_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[2,[6,"chrome",false],[2,[7,"/",false],[6,"unsubscribe",false]]]]]]),
web_pushes_chrome_unsubscribe_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[2,[6,"chrome",false],[2,[7,"/",false],[6,"unsubscribe",false]]]]]], true),
// web_pushes_latest => /web_pushes/latest
  // function(options)
  web_pushes_latest_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[6,"latest",false]]]]),
web_pushes_latest_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"web_pushes",false],[2,[7,"/",false],[6,"latest",false]]]], true),
// weekly => /weekly
  // function(options)
  weekly_path: Utils.route([], {}, [2,[7,"/",false],[6,"weekly",false]]),
weekly_url: Utils.route([], {}, [2,[7,"/",false],[6,"weekly",false]], true),
// weekly_digest_test_page_index => /test_page/weekly_digest
  // function(options)
  weekly_digest_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"weekly_digest",false]]]]),
weekly_digest_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"weekly_digest",false]]]], true),
// weekly_page => /weekly/:year/:week
  // function(year, week, options)
  weekly_page_path: Utils.route([["year",true],["week",true]], {}, [2,[7,"/",false],[2,[6,"weekly",false],[2,[7,"/",false],[2,[3,"year",false],[2,[7,"/",false],[3,"week",false]]]]]]),
weekly_page_url: Utils.route([["year",true],["week",true]], {}, [2,[7,"/",false],[2,[6,"weekly",false],[2,[7,"/",false],[2,[3,"year",false],[2,[7,"/",false],[3,"week",false]]]]]], true),
// wmgroup_test_page_index => /test_page/wmgroup
  // function(options)
  wmgroup_test_page_index_path: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"wmgroup",false]]]]),
wmgroup_test_page_index_url: Utils.route([], {}, [2,[7,"/",false],[2,[6,"test_page",false],[2,[7,"/",false],[6,"wmgroup",false]]]], true)}
;
      routes.configure = function(config) {
        return Utils.configure(config);
      };
      routes.config = function() {
        return Utils.config();
      };
      Object.defineProperty(routes, 'defaults', {
        get: function() {
          throw new Error("Routes" + ".defaults is removed. Use " + "Routes" + ".configure() instead.");
        },
        set: function(value) {}
      });
      routes.default_serializer = function(object, prefix) {
        return Utils.default_serializer(object, prefix);
      };
      return Utils.namespace(root, "Routes", routes);
    }
  };

  if (typeof define === "function" && define.amd) {
    define([], function() {
      return Utils.make();
    });
  } else {
    Utils.make();
  }

}).call(this);
// I18n.js
// =======
//
// This small library provides the Rails I18n API on the Javascript.
// You don't actually have to use Rails (or even Ruby) to use I18n.js.
// Just make sure you export all translations in an object like this:
//
//     I18n.translations.en = {
//       hello: "Hello World"
//     };
//
// See tests for specific formatting like numbers and dates.
//

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define("i18n", function(){ return factory(root);});
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
  } else {
    // Browser globals (root is window)
    root.I18n = factory(root);
  }
}(this, function(global) {
  "use strict";

  // Use previously defined object if exists in current scope
  var I18n = global && global.I18n || {};

  // Just cache the Array#slice function.
  var slice = Array.prototype.slice;

  // Apply number padding.
  var padding = function(number) {
    return ("0" + number.toString()).substr(-2);
  };

  // Improved toFixed number rounding function with support for unprecise floating points
  // JavaScript's standard toFixed function does not round certain numbers correctly (for example 0.105 with precision 2).
  var toFixed = function(number, precision) {
    return decimalAdjust('round', number, -precision).toFixed(precision);
  };

  // Is a given variable an object?
  // Borrowed from Underscore.js
  var isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object'
  };

  var isFunction = function(func) {
    var type = typeof func;
    return type === 'function'
  };

  // Check if value is different than undefined and null;
  var isSet = function(value) {
    return typeof(value) !== 'undefined' && value !== null;
  };

  // Is a given value an array?
  // Borrowed from Underscore.js
  var isArray = function(val) {
    if (Array.isArray) {
      return Array.isArray(val);
    };
    return Object.prototype.toString.call(val) === '[object Array]';
  };

  var isString = function(val) {
    return typeof value == 'string' || Object.prototype.toString.call(val) === '[object String]';
  };

  var isNumber = function(val) {
    return typeof val == 'number' || Object.prototype.toString.call(val) === '[object Number]';
  };

  var isBoolean = function(val) {
    return val === true || val === false;
  };

  var decimalAdjust = function(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  var lazyEvaluate = function(message, scope) {
    if (isFunction(message)) {
      return message(scope);
    } else {
      return message;
    }
  }

  var merge = function (dest, obj) {
    var key, value;
    for (key in obj) if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if (isString(value) || isNumber(value) || isBoolean(value) || isArray(value)) {
        dest[key] = value;
      } else {
        if (dest[key] == null) dest[key] = {};
        merge(dest[key], value);
      }
    }
    return dest;
  };

  // Set default days/months translations.
  var DATE = {
      day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    , month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    , meridian: ["AM", "PM"]
  };

  // Set default number format.
  var NUMBER_FORMAT = {
      precision: 3
    , separator: "."
    , delimiter: ","
    , strip_insignificant_zeros: false
  };

  // Set default currency format.
  var CURRENCY_FORMAT = {
      unit: "$"
    , precision: 2
    , format: "%u%n"
    , sign_first: true
    , delimiter: ","
    , separator: "."
  };

  // Set default percentage format.
  var PERCENTAGE_FORMAT = {
      unit: "%"
    , precision: 3
    , format: "%n%u"
    , separator: "."
    , delimiter: ""
  };

  // Set default size units.
  var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

  // Other default options
  var DEFAULT_OPTIONS = {
    // Set default locale. This locale will be used when fallback is enabled and
    // the translation doesn't exist in a particular locale.
      defaultLocale: "en"
    // Set the current locale to `en`.
    , locale: "en"
    // Set the translation key separator.
    , defaultSeparator: "."
    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
    , placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm
    // Set if engine should fallback to the default locale when a translation
    // is missing.
    , fallbacks: false
    // Set the default translation object.
    , translations: {}
    // Set missing translation behavior. 'message' will display a message
    // that the translation is missing, 'guess' will try to guess the string
    , missingBehaviour: 'message'
    // if you use missingBehaviour with 'message', but want to know that the
    // string is actually missing for testing purposes, you can prefix the
    // guessed string by setting the value here. By default, no prefix!
    , missingTranslationPrefix: ''
  };

  // Set default locale. This locale will be used when fallback is enabled and
  // the translation doesn't exist in a particular locale.
  I18n.reset = function() {
    var key;
    for (key in DEFAULT_OPTIONS) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };

  // Much like `reset`, but only assign options if not already assigned
  I18n.initializeOptions = function() {
    var key;
    for (key in DEFAULT_OPTIONS) if (!isSet(this[key])) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };
  I18n.initializeOptions();

  // Return a list of all locales that must be tried before returning the
  // missing translation message. By default, this will consider the inline option,
  // current locale and fallback locale.
  //
  //     I18n.locales.get("de-DE");
  //     // ["de-DE", "de", "en"]
  //
  // You can define custom rules for any locale. Just make sure you return a array
  // containing all locales.
  //
  //     // Default the Wookie locale to English.
  //     I18n.locales["wk"] = function(locale) {
  //       return ["en"];
  //     };
  //
  I18n.locales = {};

  // Retrieve locales based on inline locale, current locale or default to
  // I18n's detection.
  I18n.locales.get = function(locale) {
    var result = this[locale] || this[I18n.locale] || this["default"];

    if (isFunction(result)) {
      result = result(locale);
    }

    if (isArray(result) === false) {
      result = [result];
    }

    return result;
  };

  // The default locale list.
  I18n.locales["default"] = function(locale) {
    var locales = []
      , list = []
    ;

    // Handle the inline locale option that can be provided to
    // the `I18n.t` options.
    if (locale) {
      locales.push(locale);
    }

    // Add the current locale to the list.
    if (!locale && I18n.locale) {
      locales.push(I18n.locale);
    }

    // Add the default locale if fallback strategy is enabled.
    if (I18n.fallbacks && I18n.defaultLocale) {
      locales.push(I18n.defaultLocale);
    }

    // Locale code format 1:
    // According to RFC4646 (http://www.ietf.org/rfc/rfc4646.txt)
    // language codes for Traditional Chinese should be `zh-Hant`
    //
    // But due to backward compatibility
    // We use older version of IETF language tag
    // @see http://www.w3.org/TR/html401/struct/dirlang.html
    // @see http://en.wikipedia.org/wiki/IETF_language_tag
    //
    // Format: `language-code = primary-code ( "-" subcode )*`
    //
    // primary-code uses ISO639-1
    // @see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // @see http://www.iso.org/iso/home/standards/language_codes.htm
    //
    // subcode uses ISO 3166-1 alpha-2
    // @see http://en.wikipedia.org/wiki/ISO_3166
    // @see http://www.iso.org/iso/country_codes.htm
    //
    // @note
    //   subcode can be in upper case or lower case
    //   defining it in upper case is a convention only


    // Locale code format 2:
    // Format: `code = primary-code ( "-" region-code )*`
    // primary-code uses ISO 639-1
    // script-code uses ISO 15924
    // region-code uses ISO 3166-1 alpha-2
    // Example: zh-Hant-TW, en-HK, zh-Hant-CN
    //
    // It is similar to RFC4646 (or actually the same),
    // but seems to be limited to language, script, region

    // Compute each locale with its country code.
    // So this will return an array containing
    // `de-DE` and `de`
    // or
    // `zh-hans-tw`, `zh-hans`, `zh`
    // locales.
    locales.forEach(function(locale) {
      var localeParts = locale.split("-");
      var firstFallback = null;
      var secondFallback = null;
      if (localeParts.length === 3) {
        firstFallback = [
          localeParts[0],
          localeParts[1]
        ].join("-");
        secondFallback = localeParts[0];
      }
      else if (localeParts.length === 2) {
        firstFallback = localeParts[0];
      }

      if (list.indexOf(locale) === -1) {
        list.push(locale);
      }

      if (! I18n.fallbacks) {
        return;
      }

      [
        firstFallback,
        secondFallback
      ].forEach(function(nullableFallbackLocale) {
        // We don't want null values
        if (typeof nullableFallbackLocale === "undefined") { return; }
        if (nullableFallbackLocale === null) { return; }
        // We don't want duplicate values
        //
        // Comparing with `locale` first is faster than
        // checking whether value's presence in the list
        if (nullableFallbackLocale === locale) { return; }
        if (list.indexOf(nullableFallbackLocale) !== -1) { return; }

        list.push(nullableFallbackLocale);
      });
    });

    // No locales set? English it is.
    if (!locales.length) {
      locales.push("en");
    }

    return list;
  };

  // Hold pluralization rules.
  I18n.pluralization = {};

  // Return the pluralizer for a specific locale.
  // If no specify locale is found, then I18n's default will be used.
  I18n.pluralization.get = function(locale) {
    return this[locale] || this[I18n.locale] || this["default"];
  };

  // The default pluralizer rule.
  // It detects the `zero`, `one`, and `other` scopes.
  I18n.pluralization["default"] = function(count) {
    switch (count) {
      case 0: return ["zero", "other"];
      case 1: return ["one"];
      default: return ["other"];
    }
  };

  // Return current locale. If no locale has been set, then
  // the current locale will be the default locale.
  I18n.currentLocale = function() {
    return this.locale || this.defaultLocale;
  };

  // Check if value is different than undefined and null;
  I18n.isSet = isSet;

  // Find and process the translation using the provided scope and options.
  // This is used internally by some functions and should not be used as an
  // public API.
  I18n.lookup = function(scope, options) {
    options = options || {}

    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , fullScope
      , translations
    ;

    fullScope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = fullScope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }
      while (scopes.length) {
        translations = translations[scopes.shift()];

        if (translations === undefined || translations === null) {
          break;
        }
      }

      if (translations !== undefined && translations !== null) {
        return translations;
      }
    }

    if (isSet(options.defaultValue)) {
      return lazyEvaluate(options.defaultValue, scope);
    }
  };

  // lookup pluralization rule key into translations
  I18n.pluralizationLookupWithoutFallback = function(count, locale, translations) {
    var pluralizer = this.pluralization.get(locale)
      , pluralizerKeys = pluralizer(count)
      , pluralizerKey
      , message;

    if (isObject(translations)) {
      while (pluralizerKeys.length) {
        pluralizerKey = pluralizerKeys.shift();
        if (isSet(translations[pluralizerKey])) {
          message = translations[pluralizerKey];
          break;
        }
      }
    }

    return message;
  };

  // Lookup dedicated to pluralization
  I18n.pluralizationLookup = function(count, scope, options) {
    options = options || {}
    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , translations
      , message
    ;
    scope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = scope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }

      while (scopes.length) {
        translations = translations[scopes.shift()];
        if (!isObject(translations)) {
          break;
        }
        if (scopes.length == 0) {
          message = this.pluralizationLookupWithoutFallback(count, locale, translations);
        }
      }
      if (message != null && message != undefined) {
        break;
      }
    }

    if (message == null || message == undefined) {
      if (isSet(options.defaultValue)) {
        if (isObject(options.defaultValue)) {
          message = this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue);
        } else {
          message = options.defaultValue;
        }
        translations = options.defaultValue;
      }
    }

    return { message: message, translations: translations };
  };

  // Rails changed the way the meridian is stored.
  // It started with `date.meridian` returning an array,
  // then it switched to `time.am` and `time.pm`.
  // This function abstracts this difference and returns
  // the correct meridian or the default value when none is provided.
  I18n.meridian = function() {
    var time = this.lookup("time");
    var date = this.lookup("date");

    if (time && time.am && time.pm) {
      return [time.am, time.pm];
    } else if (date && date.meridian) {
      return date.meridian;
    } else {
      return DATE.meridian;
    }
  };

  // Merge serveral hash options, checking if value is set before
  // overwriting any value. The precedence is from left to right.
  //
  //     I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
  //     #=> {name: "John Doe", role: "user"}
  //
  I18n.prepareOptions = function() {
    var args = slice.call(arguments)
      , options = {}
      , subject
    ;

    while (args.length) {
      subject = args.shift();

      if (typeof(subject) != "object") {
        continue;
      }

      for (var attr in subject) {
        if (!subject.hasOwnProperty(attr)) {
          continue;
        }

        if (isSet(options[attr])) {
          continue;
        }

        options[attr] = subject[attr];
      }
    }

    return options;
  };

  // Generate a list of translation options for default fallbacks.
  // `defaultValue` is also deleted from options as it is returned as part of
  // the translationOptions array.
  I18n.createTranslationOptions = function(scope, options) {
    var translationOptions = [{scope: scope}];

    // Defaults should be an array of hashes containing either
    // fallback scopes or messages
    if (isSet(options.defaults)) {
      translationOptions = translationOptions.concat(options.defaults);
    }

    // Maintain support for defaultValue. Since it is always a message
    // insert it in to the translation options as such.
    if (isSet(options.defaultValue)) {
      translationOptions.push({ message: options.defaultValue });
    }

    return translationOptions;
  };

  // Translate the given scope with the provided options.
  I18n.translate = function(scope, options) {
    options = options || {}

    var translationOptions = this.createTranslationOptions(scope, options);

    var translation;

    var optionsWithoutDefault = this.prepareOptions(options)
    delete optionsWithoutDefault.defaultValue

    // Iterate through the translation options until a translation
    // or message is found.
    var translationFound =
      translationOptions.some(function(translationOption) {
        if (isSet(translationOption.scope)) {
          translation = this.lookup(translationOption.scope, optionsWithoutDefault);
        } else if (isSet(translationOption.message)) {
          translation = lazyEvaluate(translationOption.message, scope);
        }

        if (translation !== undefined && translation !== null) {
          return true;
        }
      }, this);

    if (!translationFound) {
      return this.missingTranslation(scope, options);
    }

    if (typeof(translation) === "string") {
      translation = this.interpolate(translation, options);
    } else if (isArray(translation)) {
      translation = translation.map(function(t) {
        return this.interpolate(t, options);
      }, this);
    } else if (isObject(translation) && isSet(options.count)) {
      translation = this.pluralize(options.count, scope, options);
    }

    return translation;
  };

  // This function interpolates the all variables in the given message.
  I18n.interpolate = function(message, options) {
    options = options || {}
    var matches = message.match(this.placeholder)
      , placeholder
      , value
      , name
      , regex
    ;

    if (!matches) {
      return message;
    }

    var value;

    while (matches.length) {
      placeholder = matches.shift();
      name = placeholder.replace(this.placeholder, "$1");

      if (isSet(options[name])) {
        value = options[name].toString().replace(/\$/gm, "_#$#_");
      } else if (name in options) {
        value = this.nullPlaceholder(placeholder, message, options);
      } else {
        value = this.missingPlaceholder(placeholder, message, options);
      }

      regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
      message = message.replace(regex, value);
    }

    return message.replace(/_#\$#_/g, "$");
  };

  // Pluralize the given scope using the `count` value.
  // The pluralized translation may have other placeholders,
  // which will be retrieved from `options`.
  I18n.pluralize = function(count, scope, options) {
    options = this.prepareOptions({count: String(count)}, options)
    var pluralizer, message, result;

    result = this.pluralizationLookup(count, scope, options);
    if (result.translations == undefined || result.translations == null) {
      return this.missingTranslation(scope, options);
    }

    if (result.message != undefined && result.message != null) {
      return this.interpolate(result.message, options);
    }
    else {
      pluralizer = this.pluralization.get(options.locale);
      return this.missingTranslation(scope + '.' + pluralizer(count)[0], options);
    }
  };

  // Return a missing translation message for the given parameters.
  I18n.missingTranslation = function(scope, options) {
    //guess intended string
    if(this.missingBehaviour == 'guess'){
      //get only the last portion of the scope
      var s = scope.split('.').slice(-1)[0];
      //replace underscore with space && camelcase with space and lowercase letter
      return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : '') +
          s.replace('_',' ').replace(/([a-z])([A-Z])/g,
          function(match, p1, p2) {return p1 + ' ' + p2.toLowerCase()} );
    }

    var localeForTranslation = (options != null && options.locale != null) ? options.locale : this.currentLocale();
    var fullScope           = this.getFullScope(scope, options);
    var fullScopeWithLocale = [localeForTranslation, fullScope].join(this.defaultSeparator);

    return '[missing "' + fullScopeWithLocale + '" translation]';
  };

  // Return a missing placeholder message for given parameters
  I18n.missingPlaceholder = function(placeholder, message, options) {
    return "[missing " + placeholder + " value]";
  };

  I18n.nullPlaceholder = function() {
    return I18n.missingPlaceholder.apply(I18n, arguments);
  };

  // Format number using localization rules.
  // The options will be retrieved from the `number.format` scope.
  // If this isn't present, then the following options will be used:
  //
  // - `precision`: `3`
  // - `separator`: `"."`
  // - `delimiter`: `","`
  // - `strip_insignificant_zeros`: `false`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toNumber = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.format")
      , NUMBER_FORMAT
    );

    var negative = number < 0
      , string = toFixed(Math.abs(number), options.precision).toString()
      , parts = string.split(".")
      , precision
      , buffer = []
      , formattedNumber
      , format = options.format || "%n"
      , sign = negative ? "-" : ""
    ;

    number = parts[0];
    precision = parts[1];

    while (number.length > 0) {
      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length -3);
    }

    formattedNumber = buffer.join(options.delimiter);

    if (options.strip_insignificant_zeros && precision) {
      precision = precision.replace(/0+$/, "");
    }

    if (options.precision > 0 && precision) {
      formattedNumber += options.separator + precision;
    }

    if (options.sign_first) {
      format = "%s" + format;
    }
    else {
      format = format.replace("%n", "%s%n");
    }

    formattedNumber = format
      .replace("%u", options.unit)
      .replace("%n", formattedNumber)
      .replace("%s", sign)
    ;

    return formattedNumber;
  };

  // Format currency with localization rules.
  // The options will be retrieved from the `number.currency.format` and
  // `number.format` scopes, in that order.
  //
  // Any missing option will be retrieved from the `I18n.toNumber` defaults and
  // the following options:
  //
  // - `unit`: `"$"`
  // - `precision`: `2`
  // - `format`: `"%u%n"`
  // - `delimiter`: `","`
  // - `separator`: `"."`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toCurrency = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.currency.format")
      , this.lookup("number.format")
      , CURRENCY_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Localize several values.
  // You can provide the following scopes: `currency`, `number`, or `percentage`.
  // If you provide a scope that matches the `/^(date|time)/` regular expression
  // then the `value` will be converted by using the `I18n.toTime` function.
  //
  // It will default to the value's `toString` function.
  //
  I18n.localize = function(scope, value, options) {
    options || (options = {});

    switch (scope) {
      case "currency":
        return this.toCurrency(value);
      case "number":
        scope = this.lookup("number.format");
        return this.toNumber(value, scope);
      case "percentage":
        return this.toPercentage(value);
      default:
        var localizedValue;

        if (scope.match(/^(date|time)/)) {
          localizedValue = this.toTime(scope, value);
        } else {
          localizedValue = value.toString();
        }

        return this.interpolate(localizedValue, options);
    }
  };

  // Parse a given `date` string into a JavaScript Date object.
  // This function is time zone aware.
  //
  // The following string formats are recognized:
  //
  //    yyyy-mm-dd
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ssZ
  //    yyyy-mm-dd[ T]hh:mm::ss+0000
  //    yyyy-mm-dd[ T]hh:mm::ss+00:00
  //    yyyy-mm-dd[ T]hh:mm::ss.123Z
  //
  I18n.parseDate = function(date) {
    var matches, convertedDate, fraction;
    // we have a date, so just return it.
    if (typeof(date) == "object") {
      return date;
    };

    matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);

    if (matches) {
      for (var i = 1; i <= 6; i++) {
        matches[i] = parseInt(matches[i], 10) || 0;
      }

      // month starts on 0
      matches[2] -= 1;

      fraction = matches[7] ? 1000 * ("0" + matches[7]) : null;

      if (matches[8]) {
        convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
      } else {
        convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
      }
    } else if (typeof(date) == "number") {
      // UNIX timestamp
      convertedDate = new Date();
      convertedDate.setTime(date);
    } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
      // This format `Wed Jul 20 13:03:39 +0000 2011` is parsed by
      // webkit/firefox, but not by IE, so we must parse it manually.
      convertedDate = new Date();
      convertedDate.setTime(Date.parse([
        RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5
      ].join(" ")));
    } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
      // a valid javascript format with timezone info
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    } else {
      // an arbitrary javascript string
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    }

    return convertedDate;
  };

  // Formats time according to the directives in the given format string.
  // The directives begins with a percent (%) character. Any text not listed as a
  // directive will be passed through to the output string.
  //
  // The accepted formats are:
  //
  //     %a  - The abbreviated weekday name (Sun)
  //     %A  - The full weekday name (Sunday)
  //     %b  - The abbreviated month name (Jan)
  //     %B  - The full month name (January)
  //     %c  - The preferred local date and time representation
  //     %d  - Day of the month (01..31)
  //     %-d - Day of the month (1..31)
  //     %H  - Hour of the day, 24-hour clock (00..23)
  //     %-H - Hour of the day, 24-hour clock (0..23)
  //     %I  - Hour of the day, 12-hour clock (01..12)
  //     %-I - Hour of the day, 12-hour clock (1..12)
  //     %m  - Month of the year (01..12)
  //     %-m - Month of the year (1..12)
  //     %M  - Minute of the hour (00..59)
  //     %-M - Minute of the hour (0..59)
  //     %p  - Meridian indicator (AM  or  PM)
  //     %S  - Second of the minute (00..60)
  //     %-S - Second of the minute (0..60)
  //     %w  - Day of the week (Sunday is 0, 0..6)
  //     %y  - Year without a century (00..99)
  //     %-y - Year without a century (0..99)
  //     %Y  - Year with century
  //     %z  - Timezone offset (+0545)
  //
  I18n.strftime = function(date, format) {
    var options = this.lookup("date")
      , meridianOptions = I18n.meridian()
    ;

    if (!options) {
      options = {};
    }

    options = this.prepareOptions(options, DATE);

    if (isNaN(date.getTime())) {
      throw new Error('I18n.strftime() requires a valid date object, but received an invalid date.');
    }

    var weekDay = date.getDay()
      , day = date.getDate()
      , year = date.getFullYear()
      , month = date.getMonth() + 1
      , hour = date.getHours()
      , hour12 = hour
      , meridian = hour > 11 ? 1 : 0
      , secs = date.getSeconds()
      , mins = date.getMinutes()
      , offset = date.getTimezoneOffset()
      , absOffsetHours = Math.floor(Math.abs(offset / 60))
      , absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60)
      , timezoneoffset = (offset > 0 ? "-" : "+") +
          (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) +
          (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes)
    ;

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    format = format.replace("%a", options.abbr_day_names[weekDay]);
    format = format.replace("%A", options.day_names[weekDay]);
    format = format.replace("%b", options.abbr_month_names[month]);
    format = format.replace("%B", options.month_names[month]);
    format = format.replace("%d", padding(day));
    format = format.replace("%e", day);
    format = format.replace("%-d", day);
    format = format.replace("%H", padding(hour));
    format = format.replace("%-H", hour);
    format = format.replace("%I", padding(hour12));
    format = format.replace("%-I", hour12);
    format = format.replace("%m", padding(month));
    format = format.replace("%-m", month);
    format = format.replace("%M", padding(mins));
    format = format.replace("%-M", mins);
    format = format.replace("%p", meridianOptions[meridian]);
    format = format.replace("%S", padding(secs));
    format = format.replace("%-S", secs);
    format = format.replace("%w", weekDay);
    format = format.replace("%y", padding(year));
    format = format.replace("%-y", padding(year).replace(/^0+/, ""));
    format = format.replace("%Y", year);
    format = format.replace("%z", timezoneoffset);

    return format;
  };

  // Convert the given dateString into a formatted date.
  I18n.toTime = function(scope, dateString) {
    var date = this.parseDate(dateString)
      , format = this.lookup(scope)
    ;

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  };

  // Convert a number into a formatted percentage value.
  I18n.toPercentage = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.percentage.format")
      , this.lookup("number.format")
      , PERCENTAGE_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Convert a number into a readable size representation.
  I18n.toHumanSize = function(number, options) {
    var kb = 1024
      , size = number
      , iterations = 0
      , unit
      , precision
    ;

    while (size >= kb && iterations < 4) {
      size = size / kb;
      iterations += 1;
    }

    if (iterations === 0) {
      unit = this.t("number.human.storage_units.units.byte", {count: size});
      precision = 0;
    } else {
      unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]);
      precision = (size - Math.floor(size) === 0) ? 0 : 1;
    }

    options = this.prepareOptions(
        options
      , {unit: unit, precision: precision, format: "%n%u", delimiter: ""}
    );

    return this.toNumber(size, options);
  };

  I18n.getFullScope = function(scope, options) {
    options = options || {}

    // Deal with the scope as an array.
    if (isArray(scope)) {
      scope = scope.join(this.defaultSeparator);
    }

    // Deal with the scope option provided through the second argument.
    //
    //    I18n.t('hello', {scope: 'greetings'});
    //
    if (options.scope) {
      scope = [options.scope, scope].join(this.defaultSeparator);
    }

    return scope;
  };
  /**
   * Merge obj1 with obj2 (shallow merge), without modifying inputs
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {Object} Merged values of obj1 and obj2
   *
   * In order to support ES3, `Object.prototype.hasOwnProperty.call` is used
   * Idea is from:
   * https://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
   */
  I18n.extend = function ( obj1, obj2 ) {
    if (typeof(obj1) === "undefined" && typeof(obj2) === "undefined") {
      return {};
    }
    return merge(obj1, obj2);
  };

  // Set aliases, so we can save some typing.
  I18n.t = I18n.translate;
  I18n.l = I18n.localize;
  I18n.p = I18n.pluralize;

  return I18n;
}));
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if ( !Array.prototype.forEach ) {

  Array.prototype.forEach = function forEach( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) !== "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( Object.prototype.hasOwnProperty.call(O, k) ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {

  Array.prototype.map = function(callback/*, thisArg*/) {

    var T, A, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
;

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["i18n"], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    factory(require("i18n"));
  } else {
    // Browser globals (root is window)
    factory(root.I18n);
  }
}(this, function(I18n) {
  "use strict";

}));



//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.page=e()}(this,function(){"use strict";var p=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},o=c,t=a,e=function(t){return r(a(t))},n=r,i=h,_=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function a(t){for(var e,n,i=[],o=0,r=0,a="";null!=(e=_.exec(t));){var s=e[0],h=e[1],c=e.index;if(a+=t.slice(r,c),r=c+s.length,h)a+=h[1];else{a&&(i.push(a),a="");var p=e[2],u=e[3],f=e[4],d=e[5],l=e[6],g=e[7],v="+"===l||"*"===l,m="?"===l||"*"===l,w=p||"/",y=f||d||(g?".*":"[^"+w+"]+?");i.push({name:u||o++,prefix:p||"",delimiter:w,optional:m,repeat:v,pattern:(n=y,n.replace(/([=!:$\/()])/g,"\\$1"))})}}return r<t.length&&(a+=t.substr(r)),a&&i.push(a),i}function r(h){for(var c=new Array(h.length),t=0;t<h.length;t++)"object"==typeof h[t]&&(c[t]=new RegExp("^"+h[t].pattern+"$"));return function(t){for(var e="",n=t||{},i=0;i<h.length;i++){var o=h[i];if("string"!=typeof o){var r,a=n[o.name];if(null==a){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to be defined')}if(p(a)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but received "'+a+'"');if(0===a.length){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var s=0;s<a.length;s++){if(r=encodeURIComponent(a[s]),!c[i].test(r))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'", but received "'+r+'"');e+=(0===s?o.prefix:o.delimiter)+r}}else{if(r=encodeURIComponent(a),!c[i].test(r))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but received "'+r+'"');e+=o.prefix+r}}else e+=o}return e}}function u(t){return t.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function s(t,e){return t.keys=e,t}function f(t){return t.sensitive?"":"i"}function h(t,e){for(var n=(e=e||{}).strict,i=!1!==e.end,o="",r=t[t.length-1],a="string"==typeof r&&/\/$/.test(r),s=0;s<t.length;s++){var h=t[s];if("string"==typeof h)o+=u(h);else{var c=u(h.prefix),p=h.pattern;h.repeat&&(p+="(?:"+c+p+")*"),o+=p=h.optional?c?"(?:"+c+"("+p+"))?":"("+p+")?":c+"("+p+")"}}return n||(o=(a?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=i?"$":n&&a?"":"(?=\\/|$)",new RegExp("^"+o,f(e))}function c(t,e,n){return p(e=e||[])?n||(n={}):(n=e,e=[]),t instanceof RegExp?function(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var i=0;i<n.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return s(t,e)}(t,e):p(t)?function(t,e,n){for(var i=[],o=0;o<t.length;o++)i.push(c(t[o],e,n).source);return s(new RegExp("(?:"+i.join("|")+")",f(n)),e)}(t,e,n):function(t,e,n){for(var i=a(t),o=h(i,n),r=0;r<i.length;r++)"string"!=typeof i[r]&&e.push(i[r]);return s(o,e)}(t,e,n)}o.parse=t,o.compile=e,o.tokensToFunction=n,o.tokensToRegExp=i;var d,l="undefined"!=typeof document,g="undefined"!=typeof window,v="undefined"!=typeof history,m="undefined"!=typeof process,w=l&&document.ontouchstart?"touchstart":"click",y=g&&!(!window.history.location&&!window.location);function b(){this.callbacks=[],this.exits=[],this.current="",this.len=0,this._decodeURLComponents=!0,this._base="",this._strict=!1,this._running=!1,this._hashbang=!1,this.clickHandler=this.clickHandler.bind(this),this._onpopstate=this._onpopstate.bind(this)}function x(t,e){if("function"==typeof t)return x.call(this,"*",t);if("function"==typeof e)for(var n=new R(t,null,this),i=1;i<arguments.length;++i)this.callbacks.push(n.middleware(arguments[i]));else"string"==typeof t?this["string"==typeof e?"redirect":"show"](t,e):this.start(t)}function E(t,e,n){var i=this.page=n||x,o=i._window,r=i._hashbang,a=i._getBase();"/"===t[0]&&0!==t.indexOf(a)&&(t=a+(r?"#!":"")+t);var s=t.indexOf("?");if(this.canonicalPath=t,this.path=t.replace(a,"")||"/",r&&(this.path=this.path.replace("#!","")||"/"),this.title=l&&o.document.title,this.state=e||{},this.state.path=t,this.querystring=~s?i._decodeURLEncodedURIComponent(t.slice(s+1)):"",this.pathname=i._decodeURLEncodedURIComponent(~s?t.slice(0,s):t),this.params={},this.hash="",!r){if(!~this.path.indexOf("#"))return;var h=this.path.split("#");this.path=this.pathname=h[0],this.hash=i._decodeURLEncodedURIComponent(h[1])||"",this.querystring=this.querystring.split("#")[0]}}function R(t,e,n){this.page=n||k;var i=e||{};i.strict=i.strict||n._strict,this.path="*"===t?"(.*)":t,this.method="GET",this.regexp=o(this.path,this.keys=[],i)}b.prototype.configure=function(t){var e=t||{};this._window=e.window||g&&window,this._decodeURLComponents=!1!==e.decodeURLComponents,this._popstate=!1!==e.popstate&&g,this._click=!1!==e.click&&l,this._hashbang=!!e.hashbang;var n=this._window;this._popstate?n.addEventListener("popstate",this._onpopstate,!1):g&&n.removeEventListener("popstate",this._onpopstate,!1),this._click?n.document.addEventListener(w,this.clickHandler,!1):l&&n.document.removeEventListener(w,this.clickHandler,!1),this._hashbang&&g&&!v?n.addEventListener("hashchange",this._onpopstate,!1):g&&n.removeEventListener("hashchange",this._onpopstate,!1)},b.prototype.base=function(t){if(0===arguments.length)return this._base;this._base=t},b.prototype._getBase=function(){var t=this._base;if(t)return t;var e=g&&this._window&&this._window.location;return g&&this._hashbang&&e&&"file:"===e.protocol&&(t=e.pathname),t},b.prototype.strict=function(t){if(0===arguments.length)return this._strict;this._strict=t},b.prototype.start=function(t){var e=t||{};if(this.configure(e),!1!==e.dispatch){var n;if(this._running=!0,y){var i=this._window.location;n=this._hashbang&&~i.hash.indexOf("#!")?i.hash.substr(2)+i.search:this._hashbang?i.search+i.hash:i.pathname+i.search+i.hash}this.replace(n,null,!0,e.dispatch)}},b.prototype.stop=function(){if(this._running){this.current="",this.len=0,this._running=!1;var t=this._window;this._click&&t.document.removeEventListener(w,this.clickHandler,!1),g&&t.removeEventListener("popstate",this._onpopstate,!1),g&&t.removeEventListener("hashchange",this._onpopstate,!1)}},b.prototype.show=function(t,e,n,i){var o=new E(t,e,this),r=this.prevContext;return this.prevContext=o,this.current=o.path,!1!==n&&this.dispatch(o,r),!1!==o.handled&&!1!==i&&o.pushState(),o},b.prototype.back=function(t,e){var n=this;if(0<this.len){var i=this._window;v&&i.history.back(),this.len--}else t?setTimeout(function(){n.show(t,e)}):setTimeout(function(){n.show(n._getBase(),e)})},b.prototype.redirect=function(t,e){var n=this;"string"==typeof t&&"string"==typeof e&&x.call(this,t,function(t){setTimeout(function(){n.replace(e)},0)}),"string"==typeof t&&void 0===e&&setTimeout(function(){n.replace(t)},0)},b.prototype.replace=function(t,e,n,i){var o=new E(t,e,this),r=this.prevContext;return this.prevContext=o,this.current=o.path,o.init=n,o.save(),!1!==i&&this.dispatch(o,r),o},b.prototype.dispatch=function(e,n){var i=0,o=0,r=this;function a(){var t=r.callbacks[i++];if(e.path===r.current)return t?void t(e,a):function(t){if(t.handled)return;var e,n=this._window;e=this._hashbang?y&&this._getBase()+n.location.hash.replace("#!",""):y&&n.location.pathname+n.location.search;if(e===t.canonicalPath)return;this.stop(),t.handled=!1,y&&(n.location.href=t.canonicalPath)}.call(r,e);e.handled=!1}n?function t(){var e=r.exits[o++];if(!e)return a();e(n,t)}():a()},b.prototype.exit=function(t,e){if("function"==typeof t)return this.exit("*",t);for(var n=new R(t,null,this),i=1;i<arguments.length;++i)this.exits.push(n.middleware(arguments[i]))},b.prototype.clickHandler=function(t){if(1===this._which(t)&&!(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented)){var e=t.target,n=t.path||(t.composedPath?t.composedPath():null);if(n)for(var i=0;i<n.length;i++)if(n[i].nodeName&&"A"===n[i].nodeName.toUpperCase()&&n[i].href){e=n[i];break}for(;e&&"A"!==e.nodeName.toUpperCase();)e=e.parentNode;if(e&&"A"===e.nodeName.toUpperCase()){var o="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name;if(!e.hasAttribute("download")&&"external"!==e.getAttribute("rel")){var r=e.getAttribute("href");if((this._hashbang||!this._samePath(e)||!e.hash&&"#"!==r)&&!(r&&-1<r.indexOf("mailto:"))&&(o?!e.target.baseVal:!e.target)&&(o||this.sameOrigin(e.href))){var a=o?e.href.baseVal:e.pathname+e.search+(e.hash||"");a="/"!==a[0]?"/"+a:a,m&&a.match(/^\/[a-zA-Z]:\//)&&(a=a.replace(/^\/[a-zA-Z]:\//,"/"));var s=a,h=this._getBase();0===a.indexOf(h)&&(a=a.substr(h.length)),this._hashbang&&(a=a.replace("#!","")),(!h||s!==a||y&&"file:"===this._window.location.protocol)&&(t.preventDefault(),this.show(s))}}}}},b.prototype._onpopstate=(d=!1,g?(l&&"complete"===document.readyState?d=!0:window.addEventListener("load",function(){setTimeout(function(){d=!0},0)}),function(t){if(d)if(t.state){var e=t.state.path;this.replace(e,t.state)}else if(y){var n=this._window.location;this.show(n.pathname+n.search+n.hash,void 0,void 0,!1)}}):function(){}),b.prototype._which=function(t){return null==(t=t||g&&this._window.event).which?t.button:t.which},b.prototype._toURL=function(t){var e=this._window;if("function"==typeof URL&&y)return new URL(t,e.location.toString());if(l){var n=e.document.createElement("a");return n.href=t,n}},b.prototype.sameOrigin=function(t){if(!t||!y)return!1;var e=this._toURL(t),n=this._window.location;return n.protocol===e.protocol&&n.hostname===e.hostname&&n.port===e.port},b.prototype._samePath=function(t){if(!y)return!1;var e=this._window.location;return t.pathname===e.pathname&&t.search===e.search},b.prototype._decodeURLEncodedURIComponent=function(t){return"string"!=typeof t?t:this._decodeURLComponents?decodeURIComponent(t.replace(/\+/g," ")):t},E.prototype.pushState=function(){var t=this.page,e=t._window,n=t._hashbang;t.len++,v&&e.history.pushState(this.state,this.title,n&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},E.prototype.save=function(){var t=this.page;v&&"file:"!==t._window.location.protocol&&t._window.history.replaceState(this.state,this.title,t._hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},R.prototype.middleware=function(n){var i=this;return function(t,e){if(i.match(t.path,t.params))return n(t,e);e()}},R.prototype.match=function(t,e){var n=this.keys,i=t.indexOf("?"),o=~i?t.slice(0,i):t,r=this.regexp.exec(decodeURIComponent(o));if(!r)return!1;for(var a=1,s=r.length;a<s;++a){var h=n[a-1],c=this.page._decodeURLEncodedURIComponent(r[a]);void 0===c&&hasOwnProperty.call(e,h.name)||(e[h.name]=c)}return!0};var k=function t(){var e=new b;function n(){return x.apply(e,arguments)}return n.callbacks=e.callbacks,n.exits=e.exits,n.base=e.base.bind(e),n.strict=e.strict.bind(e),n.start=e.start.bind(e),n.stop=e.stop.bind(e),n.show=e.show.bind(e),n.back=e.back.bind(e),n.redirect=e.redirect.bind(e),n.replace=e.replace.bind(e),n.dispatch=e.dispatch.bind(e),n.exit=e.exit.bind(e),n.configure=e.configure.bind(e),n.sameOrigin=e.sameOrigin.bind(e),n.clickHandler=e.clickHandler.bind(e),n.create=t,Object.defineProperty(n,"len",{get:function(){return e.len},set:function(t){e.len=t}}),Object.defineProperty(n,"current",{get:function(){return e.current},set:function(t){e.current=t}}),n.Context=E,n.Route=R,n}(),U=k,L=k;return U.default=L,U});
if ("jQuery" in window && "defineProperty" in Object) {
  Object.defineProperty(window, "$", {value: jQuery, writable: false});
  Object.defineProperty(window, "jQuery", {value: $, writable: false});
}
;

/*
  Абстрактный объект - родитель всех объектов
 */

(function() {
  abstract.Object = (function() {
    function Object() {
      this.s = this.constructor;
    }

    return Object;

  })();

}).call(this);

/*
  Абстрактный класс для всех классов
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.AbstractPiece = (function(superClass) {
    extend(AbstractPiece, superClass);

    function AbstractPiece() {
      AbstractPiece.__super__.constructor.apply(this, arguments);
    }

    return AbstractPiece;

  })(abstract.Object);

}).call(this);

/*
  Main file with namespace and imports
 */

(function() {
  if (window.chms == null) {
    window.chms = {};
  }

  if (window.chms.utils === void 0) {
    window.chms.utils = {};
  }

}).call(this);

/*
  Mixins for javascript
 */

(function() {
  chms.utils.Mixin = (function() {
    function Mixin(to) {
      if (to != null) {
        chms.utils.Mixin.mix(to, this);
      }
    }

    Mixin.mix = function(cl, mixin) {
      var name, value;
      for (name in mixin) {
        value = mixin[name];
        if (name !== "constructor") {
          switch (typeof value) {
            case "function":
              cl[name] = value.bind(cl);
              break;
            default:
              cl[name] = value;
          }
        }
      }
      return void 0;
    };

    return Mixin;

  })();

}).call(this);

/*
  Система очередей для ARD
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  siteData.ArdQueuesMixin = (function(superClass) {
    extend(ArdQueuesMixin, superClass);

    function ArdQueuesMixin() {
      this._queues = {};
      ArdQueuesMixin.__super__.constructor.apply(this, arguments);
    }

    ArdQueuesMixin.prototype.createAndRunQueue = function(field, time) {
      var q;
      if (this.getQueue(field) != null) {
        this.removeQueue(field);
      }
      q = new chms.utils.IntervalQueue();
      if (time != null) {
        q.setInterval(time);
      }
      q.start();
      return this._queues[field] = q;
    };

    ArdQueuesMixin.prototype.removeQueue = function(field) {
      if (this.getQueue(field) != null) {
        this._queues[field].stop();
        return delete this._queues[field];
      }
    };

    ArdQueuesMixin.prototype.getQueue = function(field) {
      return this._queues[field];
    };

    ArdQueuesMixin.prototype.setInQueue = function(key, val, stream, flags) {
      var q;
      if (flags == null) {
        flags = {};
      }
      if ((q = this.getQueue(key))) {
        q.clear();
        return q.add((function(_this) {
          return function() {
            return _this.set(key, val, stream, flags);
          };
        })(this));
      } else {
        throw "siteData.ArdQueuesMixin: trying to use queue for field " + key + " but it is not defined";
      }
    };

    return ArdQueuesMixin;

  })(chms.utils.Mixin);

}).call(this);

/*
  Миксин для интерфейсов bacon.js
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  siteData.ArdBaconMixin = (function(superClass) {
    extend(ArdBaconMixin, superClass);

    function ArdBaconMixin(to) {
      if (typeof Bacon !== "undefined" && Bacon !== null) {
        ArdBaconMixin.__super__.constructor.apply(this, arguments);
        to._ardBaconMixinMix();
      }
    }

    ArdBaconMixin.prototype._ardBaconMixinMix = function() {
      this.sChanged = $(this).asEventStream(this.s.EVENT_DATA_CHANGED);
      this.sBeforeChanged = $(this).asEventStream(this.s.EVENT_BEFORE_DATA_CHANGED);
      this.sProcessBeforeStart = $(this).asEventStream(this.s.EVENT_PROCESS_OF_CHANGE_BEFORE_START);
      this.sProcessBeforeEnd = $(this).asEventStream(this.s.EVENT_PROCESS_OF_CHANGE_BEFORE_END);
      this.sProcessStarted = $(this).asEventStream(this.s.EVENT_PROCESS_OF_CHANGE_STARTED);
      this.sProcessEnded = $(this).asEventStream(this.s.EVENT_PROCESS_OF_CHANGE_ENDED);
      return this.sProcessTakesPlace = this.sProcessStarted.merge(this.sProcessEnded);
    };

    ArdBaconMixin.prototype.getFiltedStream = function(fields, streams) {
      var f;
      f = this.sChanged.filter((function(_this) {
        return function(e) {
          return fields.indexOf(e.key) !== -1;
        };
      })(this));
      if (streams != null) {
        f = f.filter((function(_this) {
          return function(e) {
            return streams.indexOf(e.stream) !== -1;
          };
        })(this));
      }
      return f;
    };

    return ArdBaconMixin;

  })(chms.utils.Mixin);

}).call(this);

/*
  Абстрактные реактивные данные
 */

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  siteData.AbstractReactiveData = (function() {
    AbstractReactiveData.EVENT_BEFORE_DATA_CHANGED = "coubEditor-data-AbstractReactiveData:EVENT_BEFORE_DATA_CHANGED";

    AbstractReactiveData.EVENT_DATA_CHANGED = "coubEditor.data.AbstractReactiveData:EVENT_DATA_CHANGED";

    AbstractReactiveData.EVENT_DATA_ADDED = "coubEditor.data.AbstractReactiveData:EVENT_DATA_ADDED";

    AbstractReactiveData.EVENT_DATA_INSERTED_TO_ARRAY = "coubEditor.data.AbstractReactiveData:EVENT_DATA_INSERTED_TO_ARRAY";

    AbstractReactiveData.EVENT_DATA_DELETED_FROM_ARRAY = "coubEditor.data.AbstractReactiveData:EVENT_DATA_DELETER_FROM_ARRAY";

    AbstractReactiveData.EVENT_DATA_CONCATED_TO_ARRAY = "coubEditor-data-AbstractReactiveData:EVENT_DATA_CONCATED_TO_ARRAY";

    AbstractReactiveData.EVENT_PROCESS_OF_CHANGE_BEFORE_START = "coubEditor-data-AbstractReactiveData:EVENT_PROCESS_OF_CHANGE_BEFORE_START";

    AbstractReactiveData.EVENT_PROCESS_OF_CHANGE_BEFORE_END = "coubEditor-data-AbstractReactiveData:EVENT_PROCESS_OF_CHANGE_BEFORE_END";

    AbstractReactiveData.EVENT_PROCESS_OF_CHANGE_STARTED = "coubEditor-data-AbstractReactiveData:EVENT_PROCESS_OF_CHANGE_STARTED";

    AbstractReactiveData.EVENT_PROCESS_OF_CHANGE_ENDED = "coubEditor-data-AbstractReactiveData:EVENT_PROCESS_OF_CHANGE_ENDED";

    AbstractReactiveData.STREAM_NOTIFICATION = "notification";

    AbstractReactiveData.prototype.DEBUG_TAG = "coubEditor.data.AbstractReactiveData";

    function AbstractReactiveData(data) {
      if (data == null) {
        data = {};
      }
      this.isAllInProcessOfChange = bind(this.isAllInProcessOfChange, this);
      this.isAnyInProcessOfChange = bind(this.isAnyInProcessOfChange, this);
      this.getProcessesForKeys = bind(this.getProcessesForKeys, this);
      this.isInProcessOfChange = bind(this.isInProcessOfChange, this);
      this.endProcessOfChange = bind(this.endProcessOfChange, this);
      this.startProcessOfChange = bind(this.startProcessOfChange, this);
      this.checkType = bind(this.checkType, this);
      this.setType = bind(this.setType, this);
      this.updateModel = bind(this.updateModel, this);
      this.overwriteModel = bind(this.overwriteModel, this);
      this.notifyAboutAllFields = bind(this.notifyAboutAllFields, this);
      this.notify = bind(this.notify, this);
      this.addNum = bind(this.addNum, this);
      this.concat = bind(this.concat, this);
      this.deleteAtIndex = bind(this.deleteAtIndex, this);
      this.insertAt = bind(this.insertAt, this);
      this.deleteFirstByValue = bind(this.deleteFirstByValue, this);
      this.pushUniq = bind(this.pushUniq, this);
      this.push = bind(this.push, this);
      this.get = bind(this.get, this);
      this.toggleBool = bind(this.toggleBool, this);
      this.setIfUnequal = bind(this.setIfUnequal, this);
      this.set = bind(this.set, this);
      this.getCurrentState = bind(this.getCurrentState, this);
      this.reset = bind(this.reset, this);
      this._initModel = bind(this._initModel, this);
      this.mix = bind(this.mix, this);
      this.s = this.constructor;
      this.eh = {
        err: (function(_this) {
          return function(tag, msg) {
            return console.error(tag, msg);
          };
        })(this),
        log: (function(_this) {
          return function(tag, msg) {
            return console.log(tag, msg);
          };
        })(this),
        warn: (function(_this) {
          return function(tag, msg) {
            return console.warn(tag, msg);
          };
        })(this)
      };
      this.mix();
      this._types = {};
      this._processes = {};
      this._initModel();
    }

    AbstractReactiveData.prototype.mix = function() {
      if (siteData.ArdQueuesMixin != null) {
        new siteData.ArdQueuesMixin(this);
      }
      if (siteData.ArdBaconMixin != null) {
        return new siteData.ArdBaconMixin(this);
      }
    };

    AbstractReactiveData.prototype._initModel = function() {
      return this._data = {};
    };

    AbstractReactiveData.prototype.reset = function() {
      return this._initModel();
    };

    AbstractReactiveData.prototype.getCurrentState = function() {
      return this._data;
    };

    AbstractReactiveData.prototype.set = function(key, val, stream, flags) {
      var event, evts, existBefore, j, len, prevValue;
      if (flags == null) {
        flags = {};
      }
      if (!this.checkType(key, val)) {
        this.eh.err(this.DEBUG_TAG, "Trying to set inappropriate type to field: " + key + "!");
        return;
      }
      prevValue = this._data[key];
      existBefore = this._data[key] != null;
      $(this).trigger({
        type: this.s.EVENT_BEFORE_DATA_CHANGED,
        key: key,
        current: this._data[key],
        next: val,
        stream: stream
      });
      this._data[key] = val;
      evts = [];
      if (!existBefore) {
        evts.push(this.s.EVENT_DATA_ADDED);
      }
      evts.push(this.s.EVENT_DATA_CHANGED);
      for (j = 0, len = evts.length; j < len; j++) {
        event = evts[j];
        $(this).trigger({
          type: event,
          key: key,
          value: val,
          stream: stream,
          prevValue: prevValue,
          flags: flags
        });
      }
      return val;
    };

    AbstractReactiveData.prototype.setIfUnequal = function(key, val, stream, flags) {
      var cv;
      if (flags == null) {
        flags = {};
      }
      cv = this.get(key);
      if (cv !== val) {
        return this.set(key, val, stream, flags);
      }
    };

    AbstractReactiveData.prototype.toggleBool = function(key) {
      var cv;
      cv = this.get(key);
      if (typeof cv === "boolean") {
        return this.set(key, !cv);
      } else {
        return this.eh.err(this.DEBUG_TAG, "Trying to toggle value of " + key + " which is not a boolean!");
      }
    };

    AbstractReactiveData.prototype.get = function(key) {
      return this._data[key];
    };

    AbstractReactiveData.prototype.push = function(key, val, stream, flags) {
      var a;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      if (this.criticArrayCheck(a)) {
        return this.insertAt(key, a.length, val, stream, flags);
      }
    };

    AbstractReactiveData.prototype.pushUniq = function(key, val, stream, flags) {
      var a;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      if (this.criticArrayCheck(a)) {
        if (a.indexOf(val) === -1) {
          return this.push(key, val, stream, flags);
        }
      }
    };

    AbstractReactiveData.prototype.deleteFirstByValue = function(key, val, stream, flags) {
      var a, i;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      if (this.criticArrayCheck(a)) {
        if ((i = a.indexOf(val)) !== -1) {
          return this.deleteAtIndex(key, i, stream, flags);
        }
      }
    };

    AbstractReactiveData.prototype.insertAt = function(key, i, val, stream, flags) {
      var a;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      if (this.criticArrayCheck(a)) {
        i = Math.min(i, a.length);
        a = utils.CArray.insertAt(i, a, [val]);
        this.set(key, a, stream, flags);
        return $(this).trigger({
          type: this.s.EVENT_DATA_INSERTED_TO_ARRAY,
          key: key,
          value: a,
          pushed: val,
          index: i,
          stream: stream
        });
      }
    };

    AbstractReactiveData.prototype.deleteAtIndex = function(key, i, stream, flags) {
      var a, deleted;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      if (this.criticArrayCheck(a)) {
        if (a[i] != null) {
          deleted = a[i];
          a.splice(i, 1);
          this.set(key, a, stream, flags);
          return $(this).trigger({
            type: this.s.EVENT_DATA_DELETED_FROM_ARRAY,
            key: key,
            value: a,
            deletedAt: i,
            deletedValue: deleted,
            stream: stream
          });
        } else {
          return this.eh.err(this.DEBUG_TAG, "trying to remove value from array which are not exists");
        }
      }
    };

    AbstractReactiveData.prototype.concat = function(key, values, stream, flags) {
      var a, aisarray, visarray;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      aisarray = this.criticArrayCheck(a);
      visarray = this.criticArrayCheck(values);
      if (aisarray && visarray) {
        this.set(key, a.concat(values), stream, flags);
        return $(this).trigger({
          type: this.s.EVENT_DATA_CONCATED_TO_ARRAY,
          key: key,
          concated: values
        });
      } else {
        return this.eh.err(this.DEBUG_TAG, "Trying to add values to " + key + " but key or values (" + aisarray + ", " + visarray + ") are not array!");
      }
    };

    AbstractReactiveData.prototype.addNum = function(key, num, stream, flags) {
      var a;
      if (flags == null) {
        flags = {};
      }
      a = this._data[key];
      if (!($.isNumeric(a) && $.isNumeric(num))) {
        this.eh.err(this.DEBUG_TAG, "trying to add number to NaN");
      }
      return this.set(key, a + num, stream, flags);
    };

    AbstractReactiveData.prototype.notify = function(key, stream, flags) {
      var v;
      if (flags == null) {
        flags = {};
      }
      if ((v = this._data[key]) == null) {
        this.eh.err(this.DEBUG_TAG, "try to notify about non existing field");
      }
      if (stream == null) {
        stream = this.s.STREAM_NOTIFICATION;
      }
      return this.set(key, v, stream, flags);
    };

    AbstractReactiveData.prototype.notifyAboutAllFields = function(flags) {
      var key, ref, results, value;
      if (flags == null) {
        flags = {};
      }
      ref = this._data;
      results = [];
      for (key in ref) {
        value = ref[key];
        results.push(this.notify(key, flags));
      }
      return results;
    };

    AbstractReactiveData.prototype.overwriteModel = function(data, flags) {
      if (flags == null) {
        flags = {};
      }
      this._data = data;
      return this.notifyAboutAllFields(flags);
    };

    AbstractReactiveData.prototype.updateModel = function(data, ignore, accept, flags) {
      var j, key, len, results, val, value;
      if (ignore != null) {
        for (j = 0, len = ignore.length; j < len; j++) {
          key = ignore[j];
          delete data[key];
        }
      }
      if (accept != null) {
        for (key in data) {
          value = data[key];
          if (accept.indexOf(key) === -1) {
            delete data[key];
          }
        }
      }
      this._data = $.extend(this._data, data);
      results = [];
      for (key in data) {
        val = data[key];
        results.push(this.notify(key, void 0, flags));
      }
      return results;
    };

    AbstractReactiveData.prototype.criticArrayCheck = function(a) {
      if ($.isArray(a)) {
        return true;
      } else {
        this.eh.err(this.DEBUG_TAG, "Element is not an array!");
        return false;
      }
    };

    AbstractReactiveData.prototype.setType = function(key, type) {
      return this._types[key] = type;
    };

    AbstractReactiveData.prototype.checkType = function(key, value) {
      if (this._types[key] != null) {
        return this._types[key].test(value);
      } else {
        return true;
      }
    };

    AbstractReactiveData.prototype.startProcessOfChange = function(keys, processId) {
      var cbk, cbks, j, key, l, len, len1, results;
      for (j = 0, len = keys.length; j < len; j++) {
        key = keys[j];
        this._processes[key] = processId;
      }
      cbks = [this.s.EVENT_PROCESS_OF_CHANGE_BEFORE_START, this.s.EVENT_PROCESS_OF_CHANGE_STARTED];
      results = [];
      for (l = 0, len1 = cbks.length; l < len1; l++) {
        cbk = cbks[l];
        results.push($(this).trigger({
          type: cbk,
          keys: keys,
          process: processId
        }));
      }
      return results;
    };

    AbstractReactiveData.prototype.endProcessOfChange = function(keys, processId) {
      var cbk, cbks, j, key, l, len, len1, results;
      for (j = 0, len = keys.length; j < len; j++) {
        key = keys[j];
        if (this.isInProcessOfChange(key, processId)) {
          delete this._processes[key];
        } else {
          this.eh.warn("Trying to end process for key " + key + " but it is not in any process or does not belong to specific process " + processId + ".");
        }
      }
      cbks = [this.s.EVENT_PROCESS_OF_CHANGE_BEFORE_END, this.s.EVENT_PROCESS_OF_CHANGE_ENDED];
      results = [];
      for (l = 0, len1 = cbks.length; l < len1; l++) {
        cbk = cbks[l];
        results.push($(this).trigger({
          type: cbk,
          keys: keys,
          process: processId
        }));
      }
      return results;
    };

    AbstractReactiveData.prototype.isInProcessOfChange = function(key, processId) {
      return (this._processes[key] != null) && (!processId || this._processes[key] === processId);
    };

    AbstractReactiveData.prototype.getProcessesForKeys = function(keys) {
      return keys.map((function(_this) {
        return function(k) {
          return _this._processes[k];
        };
      })(this));
    };

    AbstractReactiveData.prototype.isAnyInProcessOfChange = function(keys, processId) {
      return keys.map((function(_this) {
        return function(key) {
          return _this.isInProcessOfChange(key, processId);
        };
      })(this)).reduce((function(_this) {
        return function(o, t) {
          return o || t;
        };
      })(this));
    };

    AbstractReactiveData.prototype.isAllInProcessOfChange = function(keys, processId) {
      return keys.map((function(_this) {
        return function(key) {
          return _this.isInProcessOfChange(key, processId);
        };
      })(this)).reduce((function(_this) {
        return function(o, t) {
          return o && t;
        };
      })(this));
    };

    return AbstractReactiveData;

  })();

}).call(this);
(function() {


}).call(this);