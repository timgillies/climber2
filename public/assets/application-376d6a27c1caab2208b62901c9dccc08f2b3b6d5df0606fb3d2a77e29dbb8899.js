/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
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

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
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
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
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
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

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

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

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

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

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
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
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

	thisCache = cache[ id ];

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

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

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
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

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
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



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


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
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
		return elem;
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
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

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

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

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

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

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
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
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
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
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
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
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
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
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

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
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

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

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
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
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
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

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

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
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
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
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

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

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
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
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

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

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

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

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
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
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

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

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
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
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

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright: Cory LaViska for A Beautiful Site, LLC: http://www.abeautifulsite.net/
 *
 * Contribute: https://github.com/claviska/jquery-minicolors
 *
 * @license: http://opensource.org/licenses/MIT
 *
 */

(function (factory) {
    /* jshint ignore:start */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
    /* jshint ignore:end */
}(function ($) {

    'use strict';

    // Defaults
    $.minicolors = {
        defaults: {
            animationSpeed: 50,
            animationEasing: 'swing',
            change: null,
            changeDelay: 0,
            control: 'hue',
            dataUris: true,
            defaultValue: '',
            format: 'hex',
            hide: null,
            hideSpeed: 100,
            inline: false,
            keywords: '',
            letterCase: 'lowercase',
            opacity: false,
            position: 'bottom left',
            show: null,
            showSpeed: 100,
            theme: 'default',
            swatches: []
        }
    };

    // Public methods
    $.extend($.fn, {
        minicolors: function(method, data) {

            switch(method) {

                // Destroy the control
                case 'destroy':
                    $(this).each( function() {
                        destroy($(this));
                    });
                    return $(this);

                // Hide the color picker
                case 'hide':
                    hide();
                    return $(this);

                // Get/set opacity
                case 'opacity':
                    // Getter
                    if( data === undefined ) {
                        // Getter
                        return $(this).attr('data-opacity');
                    } else {
                        // Setter
                        $(this).each( function() {
                            updateFromInput($(this).attr('data-opacity', data));
                        });
                    }
                    return $(this);

                // Get an RGB(A) object based on the current color/opacity
                case 'rgbObject':
                    return rgbObject($(this), method === 'rgbaObject');

                // Get an RGB(A) string based on the current color/opacity
                case 'rgbString':
                case 'rgbaString':
                    return rgbString($(this), method === 'rgbaString');

                // Get/set settings on the fly
                case 'settings':
                    if( data === undefined ) {
                        return $(this).data('minicolors-settings');
                    } else {
                        // Setter
                        $(this).each( function() {
                            var settings = $(this).data('minicolors-settings') || {};
                            destroy($(this));
                            $(this).minicolors($.extend(true, settings, data));
                        });
                    }
                    return $(this);

                // Show the color picker
                case 'show':
                    show( $(this).eq(0) );
                    return $(this);

                // Get/set the hex color value
                case 'value':
                    if( data === undefined ) {
                        // Getter
                        return $(this).val();
                    } else {
                        // Setter
                        $(this).each( function() {
                            if( typeof(data) === 'object' ) {
                                if( data.opacity ) {
                                    $(this).attr('data-opacity', keepWithin(data.opacity, 0, 1));
                                }
                                if( data.color ) {
                                    $(this).val(data.color);
                                }
                            } else {
                                $(this).val(data);
                            }
                            updateFromInput($(this));
                        });
                    }
                    return $(this);

                // Initializes the control
                default:
                    if( method !== 'create' ) data = method;
                    $(this).each( function() {
                        init($(this), data);
                    });
                    return $(this);

            }

        }
    });

    // Initialize input elements
    function init(input, settings) {

        var minicolors = $('<div class="minicolors" />'),
            defaults = $.minicolors.defaults,
            size,
            swatches,
            swatch,
            panel,
            i;

        // Do nothing if already initialized
        if( input.data('minicolors-initialized') ) return;

        // Handle settings
        settings = $.extend(true, {}, defaults, settings);

        // The wrapper
        minicolors
            .addClass('minicolors-theme-' + settings.theme)
            .toggleClass('minicolors-with-opacity', settings.opacity)
            .toggleClass('minicolors-no-data-uris', settings.dataUris !== true);

        // Custom positioning
        if( settings.position !== undefined ) {
            $.each(settings.position.split(' '), function() {
                minicolors.addClass('minicolors-position-' + this);
            });
        }

        // Input size
        if( settings.format === 'rgb' ) {
            size = settings.opacity ? '25' : '20';
        } else {
            size = settings.keywords ? '11' : '7';
        }

        // The input
        input
            .addClass('minicolors-input')
            .data('minicolors-initialized', false)
            .data('minicolors-settings', settings)
            .prop('size', size)
            .wrap(minicolors)
            .after(
                '<div class="minicolors-panel minicolors-slider-' + settings.control + '">' +
                    '<div class="minicolors-slider minicolors-sprite">' +
                        '<div class="minicolors-picker"></div>' +
                    '</div>' +
                    '<div class="minicolors-opacity-slider minicolors-sprite">' +
                        '<div class="minicolors-picker"></div>' +
                    '</div>' +
                    '<div class="minicolors-grid minicolors-sprite">' +
                        '<div class="minicolors-grid-inner"></div>' +
                        '<div class="minicolors-picker"><div></div></div>' +
                    '</div>' +
                '</div>'
            );
        
        // The swatch
        if( !settings.inline ) {
            input.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>');
            input.next('.minicolors-input-swatch').on('click', function(event) {
                event.preventDefault();
                input.focus();
            });
        }

        // Prevent text selection in IE
        panel = input.parent().find('.minicolors-panel');
        panel.on('selectstart', function() { return false; }).end();
        
        // Swatches
        if (settings.swatches && settings.swatches.length !== 0) {
            if (settings.swatches.length > 7) {
                settings.swatches.length = 7;
            }
            panel.addClass('minicolors-with-swatches');
            swatches = $('<ul class="minicolors-swatches"></ul>')
                .appendTo(panel);
            for(i = 0; i < settings.swatches.length; ++i) {
                swatch = settings.swatches[i];
                swatch = isRgb(swatch) ? parseRgb(swatch, true) : hex2rgb(parseHex(swatch, true));
                $('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>')
                    .appendTo(swatches)
                    .data('swatch-color', settings.swatches[i])
                    .find('.minicolors-swatch-color')
                    .css({
                        backgroundColor: rgb2hex(swatch),
                        opacity: swatch.a
                    });
                settings.swatches[i] = swatch;
            }
                
        }

        // Inline controls
        if( settings.inline ) input.parent().addClass('minicolors-inline');

        updateFromInput(input, false);

        input.data('minicolors-initialized', true);

    }

    // Returns the input back to its original state
    function destroy(input) {

        var minicolors = input.parent();

        // Revert the input element
        input
            .removeData('minicolors-initialized')
            .removeData('minicolors-settings')
            .removeProp('size')
            .removeClass('minicolors-input');

        // Remove the wrap and destroy whatever remains
        minicolors.before(input).remove();

    }

    // Shows the specified dropdown panel
    function show(input) {

        var minicolors = input.parent(),
            panel = minicolors.find('.minicolors-panel'),
            settings = input.data('minicolors-settings');

        // Do nothing if uninitialized, disabled, inline, or already open
        if( !input.data('minicolors-initialized') ||
            input.prop('disabled') ||
            minicolors.hasClass('minicolors-inline') ||
            minicolors.hasClass('minicolors-focus')
        ) return;

        hide();

        minicolors.addClass('minicolors-focus');
        panel
            .stop(true, true)
            .fadeIn(settings.showSpeed, function() {
                if( settings.show ) settings.show.call(input.get(0));
            });

    }

    // Hides all dropdown panels
    function hide() {

        $('.minicolors-focus').each( function() {

            var minicolors = $(this),
                input = minicolors.find('.minicolors-input'),
                panel = minicolors.find('.minicolors-panel'),
                settings = input.data('minicolors-settings');

            panel.fadeOut(settings.hideSpeed, function() {
                if( settings.hide ) settings.hide.call(input.get(0));
                minicolors.removeClass('minicolors-focus');
            });

        });
    }

    // Moves the selected picker
    function move(target, event, animate) {

        var input = target.parents('.minicolors').find('.minicolors-input'),
            settings = input.data('minicolors-settings'),
            picker = target.find('[class$=-picker]'),
            offsetX = target.offset().left,
            offsetY = target.offset().top,
            x = Math.round(event.pageX - offsetX),
            y = Math.round(event.pageY - offsetY),
            duration = animate ? settings.animationSpeed : 0,
            wx, wy, r, phi;

        // Touch support
        if( event.originalEvent.changedTouches ) {
            x = event.originalEvent.changedTouches[0].pageX - offsetX;
            y = event.originalEvent.changedTouches[0].pageY - offsetY;
        }

        // Constrain picker to its container
        if( x < 0 ) x = 0;
        if( y < 0 ) y = 0;
        if( x > target.width() ) x = target.width();
        if( y > target.height() ) y = target.height();

        // Constrain color wheel values to the wheel
        if( target.parent().is('.minicolors-slider-wheel') && picker.parent().is('.minicolors-grid') ) {
            wx = 75 - x;
            wy = 75 - y;
            r = Math.sqrt(wx * wx + wy * wy);
            phi = Math.atan2(wy, wx);
            if( phi < 0 ) phi += Math.PI * 2;
            if( r > 75 ) {
                r = 75;
                x = 75 - (75 * Math.cos(phi));
                y = 75 - (75 * Math.sin(phi));
            }
            x = Math.round(x);
            y = Math.round(y);
        }

        // Move the picker
        if( target.is('.minicolors-grid') ) {
            picker
                .stop(true)
                .animate({
                    top: y + 'px',
                    left: x + 'px'
                }, duration, settings.animationEasing, function() {
                    updateFromControl(input, target);
                });
        } else {
            picker
                .stop(true)
                .animate({
                    top: y + 'px'
                }, duration, settings.animationEasing, function() {
                    updateFromControl(input, target);
                });
        }

    }

    // Sets the input based on the color picker values
    function updateFromControl(input, target) {

        function getCoords(picker, container) {

            var left, top;
            if( !picker.length || !container ) return null;
            left = picker.offset().left;
            top = picker.offset().top;

            return {
                x: left - container.offset().left + (picker.outerWidth() / 2),
                y: top - container.offset().top + (picker.outerHeight() / 2)
            };

        }

        var hue, saturation, brightness, x, y, r, phi,

            hex = input.val(),
            opacity = input.attr('data-opacity'),

            // Helpful references
            minicolors = input.parent(),
            settings = input.data('minicolors-settings'),
            swatch = minicolors.find('.minicolors-input-swatch'),

            // Panel objects
            grid = minicolors.find('.minicolors-grid'),
            slider = minicolors.find('.minicolors-slider'),
            opacitySlider = minicolors.find('.minicolors-opacity-slider'),

            // Picker objects
            gridPicker = grid.find('[class$=-picker]'),
            sliderPicker = slider.find('[class$=-picker]'),
            opacityPicker = opacitySlider.find('[class$=-picker]'),

            // Picker positions
            gridPos = getCoords(gridPicker, grid),
            sliderPos = getCoords(sliderPicker, slider),
            opacityPos = getCoords(opacityPicker, opacitySlider);

        // Handle colors
        if( target.is('.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider') ) {

            // Determine HSB values
            switch(settings.control) {

                case 'wheel':
                    // Calculate hue, saturation, and brightness
                    x = (grid.width() / 2) - gridPos.x;
                    y = (grid.height() / 2) - gridPos.y;
                    r = Math.sqrt(x * x + y * y);
                    phi = Math.atan2(y, x);
                    if( phi < 0 ) phi += Math.PI * 2;
                    if( r > 75 ) {
                        r = 75;
                        gridPos.x = 69 - (75 * Math.cos(phi));
                        gridPos.y = 69 - (75 * Math.sin(phi));
                    }
                    saturation = keepWithin(r / 0.75, 0, 100);
                    hue = keepWithin(phi * 180 / Math.PI, 0, 360);
                    brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
                    break;

                case 'saturation':
                    // Calculate hue, saturation, and brightness
                    hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
                    saturation = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                    brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: brightness }));
                    minicolors.find('.minicolors-grid-inner').css('opacity', saturation / 100);
                    break;

                case 'brightness':
                    // Calculate hue, saturation, and brightness
                    hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
                    saturation = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                    brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
                    minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (brightness / 100));
                    break;

                default:
                    // Calculate hue, saturation, and brightness
                    hue = keepWithin(360 - parseInt(sliderPos.y * (360 / slider.height()), 10), 0, 360);
                    saturation = keepWithin(Math.floor(gridPos.x * (100 / grid.width())), 0, 100);
                    brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    grid.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: 100 }));
                    break;

            }
            
            // Handle opacity
            if( settings.opacity ) {
                opacity = parseFloat(1 - (opacityPos.y / opacitySlider.height())).toFixed(2);
            } else {
                opacity = 1;
            }
            
            updateInput(input, hex, opacity);
        }
        else {
            // Set swatch color
            swatch.find('span').css({
                backgroundColor: hex,
                opacity: opacity
            });

            // Handle change event
            doChange(input, hex, opacity);
        }
    }
    
    // Sets the value of the input and does the appropriate conversions
    // to respect settings, also updates the swatch
    function updateInput(input, value, opacity) {
        var rgb,
        
        // Helpful references
        minicolors = input.parent(),
        settings = input.data('minicolors-settings'),
        swatch = minicolors.find('.minicolors-input-swatch');
        
        if( settings.opacity ) input.attr('data-opacity', opacity);
        
        // Set color string
        if( settings.format === 'rgb' ) {
            // Returns RGB(A) string
            
            // Checks for input format and does the conversion
            if ( isRgb(value) ) {
                rgb = parseRgb(value, true);
            }
            else {
                rgb = hex2rgb(parseHex(value, true));
            }
            
            opacity = input.attr('data-opacity') === '' ? 1 : keepWithin( parseFloat( input.attr('data-opacity') ).toFixed(2), 0, 1 );
            if( isNaN( opacity ) || !settings.opacity ) opacity = 1;

            if( input.minicolors('rgbObject').a <= 1 && rgb && settings.opacity) {
                // Set RGBA string if alpha
                value = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat( opacity ) + ')';
            } else {
                // Set RGB string (alpha = 1)
                value = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
            }
        } else {
            // Returns hex color
            
            // Checks for input format and does the conversion
            if ( isRgb(value) ) {
                value = rgbString2hex(value);
            }
            
            value = convertCase( value, settings.letterCase );
        }

        // Update value from picker
        input.val( value );
        
        // Set swatch color
        swatch.find('span').css({
            backgroundColor: value,
            opacity: opacity
        });

        // Handle change event
        doChange(input, value, opacity);
    }

    // Sets the color picker values from the input
    function updateFromInput(input, preserveInputValue) {

        var hex,
            hsb,
            opacity,
            keywords,
            alpha,
            value,
            x, y, r, phi,

            // Helpful references
            minicolors = input.parent(),
            settings = input.data('minicolors-settings'),
            swatch = minicolors.find('.minicolors-input-swatch'),

            // Panel objects
            grid = minicolors.find('.minicolors-grid'),
            slider = minicolors.find('.minicolors-slider'),
            opacitySlider = minicolors.find('.minicolors-opacity-slider'),

            // Picker objects
            gridPicker = grid.find('[class$=-picker]'),
            sliderPicker = slider.find('[class$=-picker]'),
            opacityPicker = opacitySlider.find('[class$=-picker]');

        // Determine hex/HSB values
        if( isRgb(input.val()) ) {
            // If input value is a rgb(a) string, convert it to hex color and update opacity
            hex = rgbString2hex(input.val());
            alpha = keepWithin(parseFloat(getAlpha(input.val())).toFixed(2), 0, 1);
            if( alpha ) {
                input.attr('data-opacity', alpha);
            }
        } else {
            hex = convertCase(parseHex(input.val(), true), settings.letterCase);
        }

        if( !hex ){
            hex = convertCase(parseInput(settings.defaultValue, true), settings.letterCase);
        }
        hsb = hex2hsb(hex);

        // Get array of lowercase keywords
        keywords = !settings.keywords ? [] : $.map(settings.keywords.split(','), function(a) {
            return $.trim(a.toLowerCase());
        });

        // Set color string
        if( input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1 ) {
            value = convertCase(input.val());
        } else {
            value = isRgb(input.val()) ? parseRgb(input.val()) : hex;
        }

        // Update input value
        if( !preserveInputValue ) input.val(value);

        // Determine opacity value
        if( settings.opacity ) {
            // Get from data-opacity attribute and keep within 0-1 range
            opacity = input.attr('data-opacity') === '' ? 1 : keepWithin(parseFloat(input.attr('data-opacity')).toFixed(2), 0, 1);
            if( isNaN(opacity) ) opacity = 1;
            input.attr('data-opacity', opacity);
            swatch.find('span').css('opacity', opacity);

            // Set opacity picker position
            y = keepWithin(opacitySlider.height() - (opacitySlider.height() * opacity), 0, opacitySlider.height());
            opacityPicker.css('top', y + 'px');
        }

        // Set opacity to zero if input value is transparent
        if( input.val().toLowerCase() === 'transparent' ) {
            swatch.find('span').css('opacity', 0);
        }

        // Update swatch
        swatch.find('span').css('backgroundColor', hex);

        // Determine picker locations
        switch(settings.control) {

            case 'wheel':
                // Set grid position
                r = keepWithin(Math.ceil(hsb.s * 0.75), 0, grid.height() / 2);
                phi = hsb.h * Math.PI / 180;
                x = keepWithin(75 - Math.cos(phi) * r, 0, grid.width());
                y = keepWithin(75 - Math.sin(phi) * r, 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = 150 - (hsb.b / (100 / grid.height()));
                if( hex === '' ) y = 0;
                sliderPicker.css('top', y + 'px');

                // Update panel color
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
                break;

            case 'saturation':
                // Set grid position
                x = keepWithin((5 * hsb.h) / 12, 0, 150);
                y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = keepWithin(slider.height() - (hsb.s * (slider.height() / 100)), 0, slider.height());
                sliderPicker.css('top', y + 'px');

                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: hsb.b }));
                minicolors.find('.minicolors-grid-inner').css('opacity', hsb.s / 100);
                break;

            case 'brightness':
                // Set grid position
                x = keepWithin((5 * hsb.h) / 12, 0, 150);
                y = keepWithin(grid.height() - Math.ceil(hsb.s / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = keepWithin(slider.height() - (hsb.b * (slider.height() / 100)), 0, slider.height());
                sliderPicker.css('top', y + 'px');

                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
                minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (hsb.b / 100));
                break;

            default:
                // Set grid position
                x = keepWithin(Math.ceil(hsb.s / (100 / grid.width())), 0, grid.width());
                y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = keepWithin(slider.height() - (hsb.h / (360 / slider.height())), 0, slider.height());
                sliderPicker.css('top', y + 'px');

                // Update panel color
                grid.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: 100 }));
                break;

        }

        // Fire change event, but only if minicolors is fully initialized
        if( input.data('minicolors-initialized') ) {
            doChange(input, value, opacity);
        }

    }

    // Runs the change and changeDelay callbacks
    function doChange(input, value, opacity) {

        var settings = input.data('minicolors-settings'),
            lastChange = input.data('minicolors-lastChange'),
            obj,
            sel,
            i;

        // Only run if it actually changed
        if( !lastChange || lastChange.value !== value || lastChange.opacity !== opacity ) {
            
            // Remember last-changed value
            input.data('minicolors-lastChange', {
                value: value,
                opacity: opacity
            });

            // Check and select applicable swatch
            if (settings.swatches && settings.swatches.length !== 0) {
                if(!isRgb(value)) {
                    obj = hex2rgb(value);
                }
                else {
                    obj = parseRgb(value, true);
                }
                sel = -1;
                for(i = 0; i < settings.swatches.length; ++i) {
                    if (obj.r === settings.swatches[i].r && obj.g === settings.swatches[i].g && obj.b === settings.swatches[i].b && obj.a === settings.swatches[i].a) {
                        sel = i;
                        break;
                    }
                }
                
                input.parent().find('.minicolors-swatches .minicolors-swatch').removeClass('selected');
                if (i !== -1) {
                    input.parent().find('.minicolors-swatches .minicolors-swatch').eq(i).addClass('selected');
                }
            }

            // Fire change event
            if( settings.change ) {
                if( settings.changeDelay ) {
                    // Call after a delay
                    clearTimeout(input.data('minicolors-changeTimeout'));
                    input.data('minicolors-changeTimeout', setTimeout( function() {
                        settings.change.call(input.get(0), value, opacity);
                    }, settings.changeDelay));
                } else {
                    // Call immediately
                    settings.change.call(input.get(0), value, opacity);
                }
            }
            input.trigger('change').trigger('input');
        }

    }

    // Generates an RGB(A) object based on the input's value
    function rgbObject(input) {
        var hex = parseHex($(input).val(), true),
            rgb = hex2rgb(hex),
            opacity = $(input).attr('data-opacity');
        if( !rgb ) return null;
        if( opacity !== undefined ) $.extend(rgb, { a: parseFloat(opacity) });
        return rgb;
    }

    // Generates an RGB(A) string based on the input's value
    function rgbString(input, alpha) {
        var hex = parseHex($(input).val(), true),
            rgb = hex2rgb(hex),
            opacity = $(input).attr('data-opacity');
        if( !rgb ) return null;
        if( opacity === undefined ) opacity = 1;
        if( alpha ) {
            return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat(opacity) + ')';
        } else {
            return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        }
    }

    // Converts to the letter case specified in settings
    function convertCase(string, letterCase) {
        return letterCase === 'uppercase' ? string.toUpperCase() : string.toLowerCase();
    }

    // Parses a string and returns a valid hex string when possible
    function parseHex(string, expand) {
        string = string.replace(/^#/g, '');
        if( !string.match(/^[A-F0-9]{3,6}/ig) ) return '';
        if( string.length !== 3 && string.length !== 6 ) return '';
        if( string.length === 3 && expand ) {
            string = string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
        }
        return '#' + string;
    }

    // Parses a string and returns a valid RGB(A) string when possible
    function parseRgb(string, obj) {

        var values = string.replace(/[^\d,.]/g, ''),
            rgba = values.split(',');

        rgba[0] = keepWithin(parseInt(rgba[0], 10), 0, 255);
        rgba[1] = keepWithin(parseInt(rgba[1], 10), 0, 255);
        rgba[2] = keepWithin(parseInt(rgba[2], 10), 0, 255);
        if( rgba[3] ) {
            rgba[3] = keepWithin(parseFloat(rgba[3], 10), 0, 1);
        }

        // Return RGBA object
        if( obj ) {
            return {
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3] ? rgba[3] : null
            };
        }

        // Return RGBA string
        if( typeof(rgba[3]) !== 'undefined' && rgba[3] <= 1 ) {
            return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
        } else {
            return 'rgb(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ')';
        }

    }

    // Parses a string and returns a valid color string when possible
    function parseInput(string, expand) {
        if( isRgb(string) ) {
            // Returns a valid rgb(a) string
            return parseRgb(string);
        } else {
            return parseHex(string, expand);
        }
    }

    // Keeps value within min and max
    function keepWithin(value, min, max) {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    // Checks if a string is a valid RGB(A) string
    function isRgb(string) {
        var rgb = string.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? true : false;
    }

    // Function to get alpha from a RGB(A) string
    function getAlpha(rgba) {
        rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i);
        return (rgba && rgba.length === 6) ? rgba[4] : '1';
    }

   // Converts an HSB object to an RGB object
    function hsb2rgb(hsb) {
        var rgb = {};
        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s * 255 / 100);
        var v = Math.round(hsb.b * 255 / 100);
        if(s === 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if( h === 360 ) h = 0;
            if( h < 60 ) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
            else if( h < 120 ) {rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
            else if( h < 180 ) {rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
            else if( h < 240 ) {rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
            else if( h < 300 ) {rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
            else if( h < 360 ) {rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
            else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
        }
        return {
            r: Math.round(rgb.r),
            g: Math.round(rgb.g),
            b: Math.round(rgb.b)
        };
    }

    // Converts an RGB string to a hex string
    function rgbString2hex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    // Converts an RGB object to a hex string
    function rgb2hex(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        $.each(hex, function(nr, val) {
            if (val.length === 1) hex[nr] = '0' + val;
        });
        return '#' + hex.join('');
    }

    // Converts an HSB object to a hex string
    function hsb2hex(hsb) {
        return rgb2hex(hsb2rgb(hsb));
    }

    // Converts a hex string to an HSB object
    function hex2hsb(hex) {
        var hsb = rgb2hsb(hex2rgb(hex));
        if( hsb.s === 0 ) hsb.h = 360;
        return hsb;
    }

    // Converts an RGB object to an HSB object
    function rgb2hsb(rgb) {
        var hsb = { h: 0, s: 0, b: 0 };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max !== 0 ? 255 * delta / max : 0;
        if( hsb.s !== 0 ) {
            if( rgb.r === max ) {
                hsb.h = (rgb.g - rgb.b) / delta;
            } else if( rgb.g === max ) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            } else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        } else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if( hsb.h < 0 ) {
            hsb.h += 360;
        }
        hsb.s *= 100/255;
        hsb.b *= 100/255;
        return hsb;
    }

    // Converts a hex string to an RGB object
    function hex2rgb(hex) {
        hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {
            /* jshint ignore:start */
            r: hex >> 16,
            g: (hex & 0x00FF00) >> 8,
            b: (hex & 0x0000FF)
            /* jshint ignore:end */
        };
    }

    // Handle events
    $(document)
        // Hide on clicks outside of the control
        .on('mousedown.minicolors touchstart.minicolors', function(event) {
            if( !$(event.target).parents().add(event.target).hasClass('minicolors') ) {
                hide();
            }
        })
        // Start moving
        .on('mousedown.minicolors touchstart.minicolors', '.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider', function(event) {
            var target = $(this);
            event.preventDefault();
            $(document).data('minicolors-target', target);
            move(target, event, true);
        })
        // Move pickers
        .on('mousemove.minicolors touchmove.minicolors', function(event) {
            var target = $(document).data('minicolors-target');
            if( target ) move(target, event);
        })
        // Stop moving
        .on('mouseup.minicolors touchend.minicolors', function() {
            $(this).removeData('minicolors-target');
        })
        // Selected a swatch
        .on('click.minicolors', '.minicolors-swatches li', function(event) {
            event.preventDefault();
            var target = $(this), input = target.parents('.minicolors').find('.minicolors-input'), color = target.data('swatch-color');
            updateInput(input, color, getAlpha(color));
            updateFromInput(input);
        })
        // Show panel when swatch is clicked
        .on('mousedown.minicolors touchstart.minicolors', '.minicolors-input-swatch', function(event) {
            var input = $(this).parent().find('.minicolors-input');
            event.preventDefault();
            show(input);
        })
        // Show on focus
        .on('focus.minicolors', '.minicolors-input', function() {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            show(input);
        })
        // Update value on blur
        .on('blur.minicolors', '.minicolors-input', function() {
            var input = $(this),
                settings = input.data('minicolors-settings'),
                keywords,
                hex,
                rgba,
                swatchOpacity,
                value;

            if( !input.data('minicolors-initialized') ) return;

            // Get array of lowercase keywords
            keywords = !settings.keywords ? [] : $.map(settings.keywords.split(','), function(a) {
                return $.trim(a.toLowerCase());
            });

            // Set color string
            if( input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1 ) {
                value = input.val();
            } else {
                // Get RGBA values for easy conversion
                if( isRgb(input.val()) ) {
                    rgba = parseRgb(input.val(), true);
                } else {
                    hex = parseHex(input.val(), true);
                    rgba = hex ? hex2rgb(hex) : null;
                }

                // Convert to format
                if( rgba === null ) {
                    value = settings.defaultValue;
                } else if( settings.format === 'rgb' ) {
                    value = settings.opacity ?
                        parseRgb('rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + input.attr('data-opacity') + ')') :
                        parseRgb('rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')');
                } else {
                    value = rgb2hex(rgba);
                }
            }

            // Update swatch opacity
            swatchOpacity = settings.opacity ? input.attr('data-opacity') : 1;
            if( value.toLowerCase() === 'transparent' ) swatchOpacity = 0;
            input
                .closest('.minicolors')
                .find('.minicolors-input-swatch > span')
                .css('opacity', swatchOpacity);

            // Set input value
            input.val(value);

            // Is it blank?
            if( input.val() === '' ) input.val(parseInput(settings.defaultValue, true));

            // Adjust case
            input.val( convertCase(input.val(), settings.letterCase) );

        })
        // Handle keypresses
        .on('keydown.minicolors', '.minicolors-input', function(event) {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            switch(event.keyCode) {
                case 9: // tab
                    hide();
                    break;
                case 13: // enter
                case 27: // esc
                    hide();
                    input.blur();
                    break;
            }
        })
        // Update on keyup
        .on('keyup.minicolors', '.minicolors-input', function() {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            updateFromInput(input, true);
        })
        // Update on paste
        .on('paste.minicolors', '.minicolors-input', function() {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            setTimeout( function() {
                updateFromInput(input, true);
            }, 1);
        });

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/**
 * Javascript behaviors for Filterrific.
 * http://filterrific.clearcove.ca
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */



// Create global Filterrific namespace
if (typeof Filterrific === 'undefined') {
  var Filterrific = {};
}



// Define function to submit Filterrific filter form
Filterrific.submitFilterForm = function(){
  var form = $(this).parents("form"),
      url = form.attr("action");
  // turn on spinner
  $('.filterrific_spinner').show();
  // Submit ajax request
  $.ajax({
    url: url,
    data: form.serialize(),
    type: 'GET',
    dataType: 'script'
  }).done(function( msg ) {
    $('.filterrific_spinner').hide();
  });
};



//
// Embed jquery.observe_field.js to observe Filterrific filter inputs
//
// Copied from https://github.com/splendeo/jquery.observe_field
// Wrap in immediately invoked function for compatibility with other js libraries
//
(function($) {

  $.fn.filterrific_observe_field = function(frequency, callback) {
    frequency = frequency * 1000; // translate to milliseconds
    return this.each(function(){
      var $this = $(this);
      var prev = $this.val();
      var check = function() {
        if(removed()){ // if removed clear the interval and don't fire the callback
          if(ti) clearInterval(ti);
          return;
        }
        var val = $this.val();
        if(prev != val){
          prev = val;
          $this.map(callback); // invokes the callback on $this
        }
      };
      var removed = function() {
        return $this.closest('html').length == 0
      };
      var reset = function() {
        if(ti){
          clearInterval(ti);
          ti = setInterval(check, frequency);
        }
      };
      check();
      var ti = setInterval(check, frequency); // invoke check periodically
      // reset counter after user interaction
      $this.bind('keyup click mousemove', reset); //mousemove is for selects
    });
  };
})(jQuery);


Filterrific.init = function() {
  // Add change event handler to all Filterrific filter inputs.
  $('#filterrific_filter').on(
    "change",
    ":input",
    Filterrific.submitFilterForm
  );

  // Add periodic observer to selected inputs.
  // Use this for text fields you want to observe for change, e.g., a search input.
  $(".filterrific-periodically-observed").filterrific_observe_field(
    0.5,
    Filterrific.submitFilterForm
  );
};


// Initialize event observers on document ready and turbolinks page:load
jQuery(document).on('turbolinks:load', function() {
  // Prevent double initilisation. With turbolinks 5 this function
  // will be called twice: on 'ready' and 'turbolinks:load'
  jQuery(document).off('ready page:load')
  Filterrific.init();
});

jQuery(document).on('ready page:load', function() {
  Filterrific.init();
});
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  $(function() {
    return $('input#color-picker').minicolors({
      theme: 'bootstrap'
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  $(document).on("ready turbolinks:load", function() {
    var walls;
    $('#route_wall_id').parent().show();
    $('#route_sub_child_zone_id').parent().show();
    walls = $('#route_wall_id').html();
    $('#route_zone_id').change(function() {
      var options, zone;
      zone = $('#route_zone_id :seleced').text();
      options = $(walls).filter("optgroup[label='" + zone + "']").html();
      if (options) {
        $('#route_wall_id').html(options);
        return $('#route_wall_id').parent().show();
      } else {
        $('#route_wall_id').empty;
        return $('#route_wall_id').parent().hide();
      }
    });
    $(document).on("ready turbolinks:load", function() {
      $('.walls').hide();
      return $('input[name="route[zone_id]"]').click(function() {
        var zone;
        $('#wall_render').html('');
        zone = $('input[name="route[zone_id]"]:checked').val();
        return $('#zone_wall_' + zone).clone().appendTo('#wall_render');
      });
    });
    $('input[name="route[grade_system_virtual]"]').change(function() {
      var grade;
      $('#grade_render').html('');
      grade = $('input[name="route[grade_system_virtual]"]:checked').val();
      return $('#grade_system_' + grade).clone().appendTo('#grade_render');
    });
    $(function() {});
    $.rails.allowAction = function(link) {
      if (!link.attr('data-confirm')) {
        return true;
      }
      $.rails.showConfirmDialog(link);
      return false;
    };
    $.rails.confirmed = function(link) {
      link.removeAttr('data-confirm');
      return link.trigger('click.rails');
    };
    return $.rails.showConfirmDialog = function(link) {
      var html, message;
      message = link.attr('data-confirm');
      html = "<div class=\"modal\" id=\"confirmationDialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <a class=\"close\" data-dismiss=\"modal\">×</a>\n        <h1>" + message + "</h1>\n      </div>\n      <div class=\"modal-footer\">\n        <a data-dismiss=\"modal\" class=\"btn\">Cancel</a>\n        <a data-dismiss=\"modal\" class=\"btn btn-primary confirm\">Confirm</a>\n      </div>\n    </div>\n  </div>\n</div>";
      $(html).modal();
      return $('#confirmationDialog .confirm').on('click', function() {
        return $.rails.confirmed(link);
      });
    };
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  $(document).on("ready turbolinks:load", function() {
    var walls;
    $('#task_wall_id').parent().show();
    $('#task_sub_child_zone_id').parent().show();
    walls = $('#task_wall_id').html();
    return $('#task_zone_id').change(function() {
      var options, zone;
      zone = $('#task_zone_id :selected').text();
      options = $(walls).filter("optgroup[label='" + zone + "']").html();
      if (options) {
        $('#task_wall_id').html(options);
        return $('#task_wall_id').parent().show();
      } else {
        $('#task_wall_id').empty;
        return $('#task_wall_id').parent().hide();
      }
    });
  });

  $(document).on("ready turbolinks:load", function() {
    var sub_child_zones;
    $('#task_sub_child_zone_id').parent().show();
    sub_child_zones = $('#task_sub_child_zone_id').html();
    $('#task_zone_id').select(function() {
      $('#task_sub_child_zone_id').empty;
      return $('#task_sub_child_zone_id').parent().hide();
    });
    return $('#task_wall_id').change(function() {
      var options, wall;
      wall = $('#task_wall_id :selected').text();
      options = $(sub_child_zones).filter("optgroup[label='" + wall + "']").html();
      if (options) {
        $('#task_sub_child_zone_id').html(options);
        return $('#task_sub_child_zone_id').parent().show();
      } else {
        $('#task_sub_child_zone_id').empty;
        return $('#task_sub_child_zone_id').parent().hide();
      }
    });
  });

  $('input[name="task[zone_id]"]').click(function() {
    var zone;
    $('#wall_render').html('');
    zone = $('input[name="task[zone_id]"]:checked').val();
    return $('#zone_wall_' + zone).clone().appendTo('#wall_render');
  });

  $('input[name="task[grade_system_virtual]"]').click(function() {
    var grade;
    $('#grade_render').html('');
    grade = $('input[name="task[grade_system_virtual]"]:checked').val();
    return $('#grade_system_' + grade).clone().appendTo('#grade_render');
  });

}).call(this);
(function() {
  $(document).on("ready turbolinks:load", function() {
    var grade;
    grade = $('input[name="tick[grade_system_virtual]"]:checked').val();
    $('.grade-').hide();
    if (grade > 0) {
      $('#grade_system_' + grade).clone().appendTo('#grade_render');
    } else {

    }
    return $('input[name="tick[grade_system_virtual]"]').change(function() {
      $('#grade_render').html('');
      grade = $('input[name="tick[grade_system_virtual]"]:checked').val();
      return $('#grade_system_' + grade).clone().appendTo('#grade_render');
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
//! moment.js
//! version : 2.11.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            locales[name] = locales[name] || new Locale();
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this > +localInput;
        } else {
            return +localInput < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this < +localInput;
        } else {
            return +this.clone().endOf(units) < +localInput;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return +this === +localInput;
        } else {
            inputMs = +localInput;
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // JSON.stringify(new Date(NaN)) === 'null'
        return this.isValid() ? this.toISOString() : 'null';
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        // console.log("got", weekYear, week, weekday, "set", date.toISOString());
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = local__createLocal([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.11.1';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
/*
 Highcharts JS v6.0.1 (2017-10-05)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(R,N){"object"===typeof module&&module.exports?module.exports=R.document?N(R):N:R.Highcharts=N(R)})("undefined"!==typeof window?window:this,function(R){var N=function(){var a=R.document,A=R.navigator&&R.navigator.userAgent||"",B=a&&a.createElementNS&&!!a.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,G=/(edge|msie|trident)/i.test(A)&&!R.opera,F=/Firefox/.test(A),l=F&&4>parseInt(A.split("Firefox/")[1],10);return R.Highcharts?R.Highcharts.error(16,!0):{product:"Highcharts",
version:"6.0.1",deg2rad:2*Math.PI/360,doc:a,hasBidiBug:l,hasTouch:a&&void 0!==a.documentElement.ontouchstart,isMS:G,isWebKit:/AppleWebKit/.test(A),isFirefox:F,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:B,win:R,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var A=[],B=a.charts,G=a.doc,F=a.win;a.error=function(l,f){l=a.isNumber(l)?"Highcharts error #"+
l+": www.highcharts.com/errors/"+l:l;if(f)throw Error(l);F.console&&console.log(l)};a.Fx=function(a,f,h){this.options=f;this.elem=a;this.prop=h};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],h=[],m=this.now,r=a.length,v;if(1===m)h=this.toD;else if(r===f.length&&1>m)for(;r--;)v=parseFloat(a[r]),h[r]=isNaN(v)?a[r]:m*parseFloat(f[r]-v)+v;else h=f;this.elem.attr("d",h,null,!0)},update:function(){var a=this.elem,f=this.prop,h=this.now,m=this.options.step;if(this[f+"Setter"])this[f+
"Setter"]();else a.attr?a.element&&a.attr(f,h,null,!0):a.style[f]=h+this.unit;m&&m.call(a,h,this)},run:function(a,f,h){var m=this,l=function(a){return l.stopped?!1:m.step(a)},v=F.requestAnimationFrame||function(a){setTimeout(a,13)},d=function(){var a;for(a=0;a<A.length;a++)A[a]()||A.splice(a--,1);A.length&&v(d)};a===f?delete this.options.curAnim[this.prop]:(this.startTime=+new Date,this.start=a,this.end=f,this.unit=h,this.now=this.start,this.pos=0,l.elem=this.elem,l.prop=this.prop,l()&&1===A.push(l)&&
v(d))},step:function(l){var f=+new Date,h,m=this.options,r=this.elem,v=m.complete,d=m.duration,e=m.curAnim;r.attr&&!r.element?l=!1:l||f>=d+this.startTime?(this.now=this.end,this.pos=1,this.update(),h=e[this.prop]=!0,a.objectEach(e,function(a){!0!==a&&(h=!1)}),h&&v&&v.call(r),l=!1):(this.pos=m.easing((f-this.startTime)/d),this.now=this.start+(this.end-this.start)*this.pos,this.update(),l=!0);return l},initPath:function(l,f,h){function m(a){var c,b;for(p=a.length;p--;)c="M"===a[p]||"L"===a[p],b=/[a-zA-Z]/.test(a[p+
3]),c&&b&&a.splice(p+1,0,a[p+1],a[p+2],a[p+1],a[p+2])}function r(a,b){for(;a.length<w;){a[0]=b[w-a.length];var k=a.slice(0,c);[].splice.apply(a,[0,0].concat(k));C&&(k=a.slice(a.length-c),[].splice.apply(a,[a.length,0].concat(k)),p--)}a[0]="M"}function v(a,d){for(var e=(w-a.length)/c;0<e&&e--;)k=a.slice().splice(a.length/I-c,c*I),k[0]=d[w-c-e*c],b&&(k[c-6]=k[c-2],k[c-5]=k[c-1]),[].splice.apply(a,[a.length/I,0].concat(k)),C&&e--}f=f||"";var d,e=l.startX,n=l.endX,b=-1<f.indexOf("C"),c=b?7:3,w,k,p;f=
f.split(" ");h=h.slice();var C=l.isArea,I=C?2:1,y;b&&(m(f),m(h));if(e&&n){for(p=0;p<e.length;p++)if(e[p]===n[0]){d=p;break}else if(e[0]===n[n.length-e.length+p]){d=p;y=!0;break}void 0===d&&(f=[])}f.length&&a.isNumber(d)&&(w=h.length+d*I*c,y?(r(f,h),v(h,f)):(r(h,f),v(f,h)));return[f,h]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,f){var l;a||(a={});for(l in f)a[l]=f[l];
return a};a.merge=function(){var l,f=arguments,h,m={},r=function(f,d){"object"!==typeof f&&(f={});a.objectEach(d,function(e,n){!a.isObject(e,!0)||a.isClass(e)||a.isDOMElement(e)?f[n]=d[n]:f[n]=r(f[n]||{},e)});return f};!0===f[0]&&(m=f[1],f=Array.prototype.slice.call(f,2));h=f.length;for(l=0;l<h;l++)m=r(m,f[l]);return m};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===
a||"[object Array Iterator]"===a};a.isObject=function(l,f){return!!l&&"object"===typeof l&&(!f||!a.isArray(l))};a.isDOMElement=function(l){return a.isObject(l)&&"number"===typeof l.nodeType};a.isClass=function(l){var f=l&&l.constructor;return!(!a.isObject(l,!0)||a.isDOMElement(l)||!f||!f.name||"Object"===f.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,f){for(var l=a.length;l--;)if(a[l]===f){a.splice(l,1);break}};a.defined=function(a){return void 0!==a&&null!==
a};a.attr=function(l,f,h){var m;a.isString(f)?a.defined(h)?l.setAttribute(f,h):l&&l.getAttribute&&(m=l.getAttribute(f)):a.defined(f)&&a.isObject(f)&&a.objectEach(f,function(a,f){l.setAttribute(f,a)});return m};a.splat=function(l){return a.isArray(l)?l:[l]};a.syncTimeout=function(a,f,h){if(f)return setTimeout(a,f,h);a.call(0,h)};a.pick=function(){var a=arguments,f,h,m=a.length;for(f=0;f<m;f++)if(h=a[f],void 0!==h&&null!==h)return h};a.css=function(l,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter=
"alpha(opacity\x3d"+100*f.opacity+")");a.extend(l.style,f)};a.createElement=function(l,f,h,m,r){l=G.createElement(l);var v=a.css;f&&a.extend(l,f);r&&v(l,{padding:0,border:"none",margin:0});h&&v(l,h);m&&m.appendChild(l);return l};a.extendClass=function(l,f){var h=function(){};h.prototype=new l;a.extend(h.prototype,f);return h};a.pad=function(a,f,h){return Array((f||2)+1-String(a).length).join(h||0)+a};a.relativeLength=function(a,f,h){return/%$/.test(a)?f*parseFloat(a)/100+(h||0):parseFloat(a)};a.wrap=
function(a,f,h){var m=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments),f=arguments,d=this;d.proceed=function(){m.apply(d,arguments.length?arguments:f)};a.unshift(m);a=h.apply(this,a);d.proceed=null;return a}};a.getTZOffset=function(l){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(l)||f.hcTimezoneOffset||0)};a.dateFormat=function(l,f,h){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||"";l=a.pick(l,"%Y-%m-%d %H:%M:%S");var m=a.Date,r=new m(f-
a.getTZOffset(f)),v=r[m.hcGetHours](),d=r[m.hcGetDay](),e=r[m.hcGetDate](),n=r[m.hcGetMonth](),b=r[m.hcGetFullYear](),c=a.defaultOptions.lang,w=c.weekdays,k=c.shortWeekdays,p=a.pad,m=a.extend({a:k?k[d]:w[d].substr(0,3),A:w[d],d:p(e),e:p(e,2," "),w:d,b:c.shortMonths[n],B:c.months[n],m:p(n+1),y:b.toString().substr(2,2),Y:b,H:p(v),k:v,I:p(v%12||12),l:v%12||12,M:p(r[m.hcGetMinutes]()),p:12>v?"AM":"PM",P:12>v?"am":"pm",S:p(r.getSeconds()),L:p(Math.round(f%1E3),3)},a.dateFormats);a.objectEach(m,function(a,
b){for(;-1!==l.indexOf("%"+b);)l=l.replace("%"+b,"function"===typeof a?a(f):a)});return h?l.substr(0,1).toUpperCase()+l.substr(1):l};a.formatSingle=function(l,f){var h=/\.([0-9])/,m=a.defaultOptions.lang;/f$/.test(l)?(h=(h=l.match(h))?h[1]:-1,null!==f&&(f=a.numberFormat(f,h,m.decimalPoint,-1<l.indexOf(",")?m.thousandsSep:""))):f=a.dateFormat(l,f);return f};a.format=function(l,f){for(var h="{",m=!1,r,v,d,e,n=[],b;l;){h=l.indexOf(h);if(-1===h)break;r=l.slice(0,h);if(m){r=r.split(":");v=r.shift().split(".");
e=v.length;b=f;for(d=0;d<e;d++)b&&(b=b[v[d]]);r.length&&(b=a.formatSingle(r.join(":"),b));n.push(b)}else n.push(r);l=l.slice(h+1);h=(m=!m)?"}":"{"}n.push(l);return n.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(l,f,h,m,r){var v,d=l;h=a.pick(h,1);v=l/h;f||(f=r?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===m&&(1===h?f=a.grep(f,function(a){return 0===a%1}):.1>=h&&(f=[1/h])));for(m=0;m<f.length&&!(d=f[m],r&&d*h>=l||!r&&
v<=(f[m]+(f[m+1]||f[m]))/2);m++);return d=a.correctFloat(d*h,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,f){var h=a.length,m,l;for(l=0;l<h;l++)a[l].safeI=l;a.sort(function(a,d){m=f(a,d);return 0===m?a.safeI-d.safeI:m});for(l=0;l<h;l++)delete a[l].safeI};a.arrayMin=function(a){for(var f=a.length,h=a[0];f--;)a[f]<h&&(h=a[f]);return h};a.arrayMax=function(a){for(var f=a.length,h=a[0];f--;)a[f]>h&&(h=a[f]);return h};a.destroyObjectProperties=function(l,f){a.objectEach(l,function(a,
m){a&&a!==f&&a.destroy&&a.destroy();delete l[m]})};a.discardElement=function(l){var f=a.garbageBin;f||(f=a.createElement("div"));l&&f.appendChild(l);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||14))};a.setAnimation=function(l,f){f.renderer.globalAnimation=a.pick(l,f.options.chart.animation,!0)};a.animObject=function(l){return a.isObject(l)?a.merge(l):{duration:l?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,
year:314496E5};a.numberFormat=function(l,f,h,m){l=+l||0;f=+f;var r=a.defaultOptions.lang,v=(l.toString().split(".")[1]||"").split("e")[0].length,d,e,n=l.toString().split("e");-1===f?f=Math.min(v,20):a.isNumber(f)||(f=2);e=(Math.abs(n[1]?n[0]:l)+Math.pow(10,-Math.max(f,v)-1)).toFixed(f);v=String(a.pInt(e));d=3<v.length?v.length%3:0;h=a.pick(h,r.decimalPoint);m=a.pick(m,r.thousandsSep);l=(0>l?"-":"")+(d?v.substr(0,d)+m:"");l+=v.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+m);f&&(l+=h+e.slice(-f));n[1]&&
(l+="e"+n[1]);return l};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(l,f,h){if("width"===f)return Math.min(l.offsetWidth,l.scrollWidth)-a.getStyle(l,"padding-left")-a.getStyle(l,"padding-right");if("height"===f)return Math.min(l.offsetHeight,l.scrollHeight)-a.getStyle(l,"padding-top")-a.getStyle(l,"padding-bottom");F.getComputedStyle||a.error(27,!0);if(l=F.getComputedStyle(l,void 0))l=l.getPropertyValue(f),a.pick(h,"opacity"!==f)&&(l=a.pInt(l));return l};a.inArray=
function(l,f){return(a.indexOfPolyfill||Array.prototype.indexOf).call(f,l)};a.grep=function(l,f){return(a.filterPolyfill||Array.prototype.filter).call(l,f)};a.find=Array.prototype.find?function(a,f){return a.find(f)}:function(a,f){var h,m=a.length;for(h=0;h<m;h++)if(f(a[h],h))return a[h]};a.map=function(a,f){for(var h=[],m=0,r=a.length;m<r;m++)h[m]=f.call(a[m],a[m],m,a);return h};a.reduce=function(l,f,h){return(a.reducePolyfill||Array.prototype.reduce).call(l,f,h)};a.offset=function(a){var f=G.documentElement;
a=a.getBoundingClientRect();return{top:a.top+(F.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(F.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}};a.stop=function(a,f){for(var h=A.length;h--;)A[h].elem!==a||f&&f!==A[h].prop||(A[h].stopped=!0)};a.each=function(l,f,h){return(a.forEachPolyfill||Array.prototype.forEach).call(l,f,h)};a.objectEach=function(a,f,h){for(var m in a)a.hasOwnProperty(m)&&f.call(h,a[m],m,a)};a.addEvent=function(l,f,h){var m=l.hcEvents=l.hcEvents||{},r=l.addEventListener||
a.addEventListenerPolyfill;r&&r.call(l,f,h,!1);m[f]||(m[f]=[]);m[f].push(h);return function(){a.removeEvent(l,f,h)}};a.removeEvent=function(l,f,h){function m(d,b){var c=l.removeEventListener||a.removeEventListenerPolyfill;c&&c.call(l,d,b,!1)}function r(){var e,b;l.nodeName&&(f?(e={},e[f]=!0):e=d,a.objectEach(e,function(a,e){if(d[e])for(b=d[e].length;b--;)m(e,d[e][b])}))}var v,d=l.hcEvents,e;d&&(f?(v=d[f]||[],h?(e=a.inArray(h,v),-1<e&&(v.splice(e,1),d[f]=v),m(f,h)):(r(),d[f]=[])):(r(),l.hcEvents={}))};
a.fireEvent=function(l,f,h,m){var r;r=l.hcEvents;var v,d;h=h||{};if(G.createEvent&&(l.dispatchEvent||l.fireEvent))r=G.createEvent("Events"),r.initEvent(f,!0,!0),a.extend(r,h),l.dispatchEvent?l.dispatchEvent(r):l.fireEvent(f,r);else if(r)for(r=r[f]||[],v=r.length,h.target||a.extend(h,{preventDefault:function(){h.defaultPrevented=!0},target:l,type:f}),f=0;f<v;f++)(d=r[f])&&!1===d.call(l,h)&&h.preventDefault();m&&!h.defaultPrevented&&m(h)};a.animate=function(l,f,h){var m,r="",v,d,e;a.isObject(h)||(e=
arguments,h={duration:e[2],easing:e[3],complete:e[4]});a.isNumber(h.duration)||(h.duration=400);h.easing="function"===typeof h.easing?h.easing:Math[h.easing]||Math.easeInOutSine;h.curAnim=a.merge(f);a.objectEach(f,function(e,b){a.stop(l,b);d=new a.Fx(l,h,b);v=null;"d"===b?(d.paths=d.initPath(l,l.d,f.d),d.toD=f.d,m=0,v=1):l.attr?m=l.attr(b):(m=parseFloat(a.getStyle(l,b))||0,"opacity"!==b&&(r="px"));v||(v=e);v&&v.match&&v.match("px")&&(v=v.replace(/px/g,""));d.run(m,v,r)})};a.seriesType=function(l,
f,h,m,r){var v=a.getOptions(),d=a.seriesTypes;v.plotOptions[l]=a.merge(v.plotOptions[f],h);d[l]=a.extendClass(d[f]||function(){},m);d[l].prototype.type=l;r&&(d[l].prototype.pointClass=a.extendClass(a.Point,r));return d[l]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),f=0;return function(){return"highcharts-"+a+"-"+f++}}();F.jQuery&&(F.jQuery.fn.highcharts=function(){var l=[].slice.call(arguments);if(this[0])return l[0]?(new (a[a.isString(l[0])?l.shift():"Chart"])(this[0],
l[0],l[1]),this):B[a.attr(this[0],"data-highcharts-chart")]})})(N);(function(a){var A=a.each,B=a.isNumber,G=a.map,F=a.merge,l=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[l(a[1]),l(a[2]),l(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[l(a[1]),
l(a[2]),l(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(f){var h,m,r,v;if((this.input=f=this.names[f&&f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=G(f.stops,function(d){return new a.Color(d[1])});else if(f&&f.charAt&&"#"===f.charAt()&&(h=f.length,f=parseInt(f.substr(1),16),7===h?m=[(f&16711680)>>16,(f&65280)>>8,f&255,1]:4===h&&(m=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])),!m)for(r=this.parsers.length;r--&&!m;)v=this.parsers[r],
(h=v.regex.exec(f))&&(m=v.parse(h));this.rgba=m||[]},get:function(a){var f=this.input,m=this.rgba,r;this.stops?(r=F(f),r.stops=[].concat(r.stops),A(this.stops,function(f,d){r.stops[d]=[r.stops[d][0],f.get(a)]})):r=m&&B(m[0])?"rgb"===a||!a&&1===m[3]?"rgb("+m[0]+","+m[1]+","+m[2]+")":"a"===a?m[3]:"rgba("+m.join(",")+")":f;return r},brighten:function(a){var f,m=this.rgba;if(this.stops)A(this.stops,function(f){f.brighten(a)});else if(B(a)&&0!==a)for(f=0;3>f;f++)m[f]+=l(255*a),0>m[f]&&(m[f]=0),255<m[f]&&
(m[f]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,h){var f=this.rgba,r=a.rgba;r.length&&f&&f.length?(a=1!==r[3]||1!==f[3],h=(a?"rgba(":"rgb(")+Math.round(r[0]+(f[0]-r[0])*(1-h))+","+Math.round(r[1]+(f[1]-r[1])*(1-h))+","+Math.round(r[2]+(f[2]-r[2])*(1-h))+(a?","+(r[3]+(f[3]-r[3])*(1-h)):"")+")"):h=a.input||"none";return h}};a.color=function(f){return new a.Color(f)}})(N);(function(a){var A,B,G=a.addEvent,F=a.animate,l=a.attr,f=a.charts,h=a.color,m=a.css,
r=a.createElement,v=a.defined,d=a.deg2rad,e=a.destroyObjectProperties,n=a.doc,b=a.each,c=a.extend,w=a.erase,k=a.grep,p=a.hasTouch,C=a.inArray,I=a.isArray,y=a.isFirefox,K=a.isMS,q=a.isObject,z=a.isString,J=a.isWebKit,t=a.merge,D=a.noop,E=a.objectEach,H=a.pick,g=a.pInt,u=a.removeEvent,P=a.stop,M=a.svg,O=a.SVG_NS,L=a.symbolSizes,S=a.win;A=a.SVGElement=function(){return this};c(A.prototype,{opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
init:function(a,g){this.element="span"===g?r(g):n.createElementNS(this.SVG_NS,g);this.renderer=a},animate:function(x,g,u){g=a.animObject(H(g,this.renderer.globalAnimation,!0));0!==g.duration?(u&&(g.complete=u),F(this,x,g)):(this.attr(x,null,u),g.step&&g.step.call(this));return this},colorGradient:function(x,g,u){var c=this.renderer,k,Q,d,e,w,p,M,n,L,f,y=[],q;x.radialGradient?Q="radialGradient":x.linearGradient&&(Q="linearGradient");Q&&(d=x[Q],w=c.gradients,M=x.stops,f=u.radialReference,I(d)&&(x[Q]=
d={x1:d[0],y1:d[1],x2:d[2],y2:d[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===Q&&f&&!v(d.gradientUnits)&&(e=d,d=t(d,c.getRadialAttr(f,e),{gradientUnits:"userSpaceOnUse"})),E(d,function(a,x){"id"!==x&&y.push(x,a)}),E(M,function(a){y.push(a)}),y=y.join(","),w[y]?f=w[y].attr("id"):(d.id=f=a.uniqueKey(),w[y]=p=c.createElement(Q).attr(d).add(c.defs),p.radAttr=e,p.stops=[],b(M,function(x){0===x[1].indexOf("rgba")?(k=a.color(x[1]),n=k.get("rgb"),L=k.get("a")):(n=x[1],L=1);x=c.createElement("stop").attr({offset:x[0],
"stop-color":n,"stop-opacity":L}).add(p);p.stops.push(x)})),q="url("+c.url+"#"+f+")",u.setAttribute(g,q),u.gradient=y,x.toString=function(){return q})},applyTextOutline:function(x){var g=this.element,u,c,k,d,t;-1!==x.indexOf("contrast")&&(x=x.replace(/contrast/g,this.renderer.getContrast(g.style.fill)));x=x.split(" ");c=x[x.length-1];if((k=x[0])&&"none"!==k&&a.svg){this.fakeTS=!0;x=[].slice.call(g.getElementsByTagName("tspan"));this.ySetter=this.xSetter;k=k.replace(/(^[\d\.]+)(.*?)$/g,function(a,
x,g){return 2*x+g});for(t=x.length;t--;)u=x[t],"highcharts-text-outline"===u.getAttribute("class")&&w(x,g.removeChild(u));d=g.firstChild;b(x,function(a,x){0===x&&(a.setAttribute("x",g.getAttribute("x")),x=g.getAttribute("y"),a.setAttribute("y",x||0),null===x&&g.setAttribute("y",0));a=a.cloneNode(1);l(a,{"class":"highcharts-text-outline",fill:c,stroke:c,"stroke-width":k,"stroke-linejoin":"round"});g.insertBefore(a,d)})}},attr:function(a,g,u,c){var x,k=this.element,b,d=this,Q,t;"string"===typeof a&&
void 0!==g&&(x=a,a={},a[x]=g);"string"===typeof a?d=(this[a+"Getter"]||this._defaultGetter).call(this,a,k):(E(a,function(x,g){Q=!1;c||P(this,g);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(g)&&(b||(this.symbolAttr(a),b=!0),Q=!0);!this.rotation||"x"!==g&&"y"!==g||(this.doTransform=!0);Q||(t=this[g+"Setter"]||this._defaultSetter,t.call(this,x,g,k),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g)&&this.updateShadows(g,x,t))},this),this.afterSetters());
u&&u();return d},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,g,u){for(var x=this.shadows,c=x.length;c--;)u.call(x[c],"height"===a?Math.max(g-(x[c].cutHeight||0),0):"d"===a?this.d:g,a,x[c])},addClass:function(a,g){var x=this.attr("class")||"";-1===x.indexOf(a)&&(g||(a=(x+(x?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==C(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",
(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var x=this;b("x y r start end width height innerR anchorX anchorY".split(" "),function(g){x[g]=H(a[g],x[g])});x.attr({d:x.renderer.symbols[x.symbolName](x.x,x.y,x.width,x.height,x)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,g){var x=this,u={},c;g=g||a.strokeWidth||0;c=Math.round(g)%2/2;a.x=Math.floor(a.x||x.x||0)+c;a.y=Math.floor(a.y||x.y||0)+c;a.width=Math.floor((a.width||
x.width||0)-2*c);a.height=Math.floor((a.height||x.height||0)-2*c);v(a.strokeWidth)&&(a.strokeWidth=g);E(a,function(a,g){x[g]!==a&&(x[g]=u[g]=a)});return u},css:function(a){var x=this.styles,u={},k=this.element,b,d="",t,e=!x,p=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);x&&E(a,function(a,g){a!==x[g]&&(u[g]=a,e=!0)});e&&(x&&(a=c(x,u)),b=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===k.nodeName.toLowerCase()&&g(a.width),this.styles=a,b&&!M&&this.renderer.forExport&&delete a.width,
K&&!M?m(this.element,a):(t=function(a,x){return"-"+x.toLowerCase()},E(a,function(a,x){-1===C(x,p)&&(d+=x.replace(/([A-Z])/g,t)+":"+a+";")}),d&&l(k,"style",d)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,g){var x=this,u=x.element;p&&"click"===a?(u.ontouchstart=function(a){x.touchEventFired=Date.now();a.preventDefault();g.call(u,a)},
u.onclick=function(a){(-1===S.navigator.userAgent.indexOf("Android")||1100<Date.now()-(x.touchEventFired||0))&&g.call(u,a)}):u["on"+a]=g;return this},setRadialReference:function(a){var x=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;x&&x.radAttr&&x.animate(this.renderer.getRadialAttr(a,x.radAttr));return this},translate:function(a,g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=
this.translateX||0,g=this.translateY||0,u=this.scaleX,c=this.scaleY,k=this.inverted,b=this.rotation,d=this.matrix,t=this.element;k&&(a+=this.width,g+=this.height);a=["translate("+a+","+g+")"];v(d)&&a.push("matrix("+d.join(",")+")");k?a.push("rotate(90) scale(-1,1)"):b&&a.push("rotate("+b+" "+H(this.rotationOriginX,t.getAttribute("x"),0)+" "+H(this.rotationOriginY,t.getAttribute("y")||0)+")");(v(u)||v(c))&&a.push("scale("+H(u,1)+" "+H(c,1)+")");a.length&&t.setAttribute("transform",a.join(" "))},toFront:function(){var a=
this.element;a.parentNode.appendChild(a);return this},align:function(a,g,u){var x,c,k,b,d={};c=this.renderer;k=c.alignedObjects;var t,e;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!u||z(u))this.alignTo=x=u||"renderer",w(k,this),k.push(this),u=null}else a=this.alignOptions,g=this.alignByTranslate,x=this.alignTo;u=H(u,c[x],c);x=a.align;c=a.verticalAlign;k=(u.x||0)+(a.x||0);b=(u.y||0)+(a.y||0);"right"===x?t=1:"center"===x&&(t=2);t&&(k+=(u.width-(a.width||0))/t);d[g?"translateX":"x"]=Math.round(k);
"bottom"===c?e=1:"middle"===c&&(e=2);e&&(b+=(u.height-(a.height||0))/e);d[g?"translateY":"y"]=Math.round(b);this[this.placed?"animate":"attr"](d);this.placed=!0;this.alignAttr=d;return this},getBBox:function(a,g){var x,u=this.renderer,k,t=this.element,e=this.styles,Q,p=this.textStr,w,M=u.cache,n=u.cacheKeys,L;g=H(g,this.rotation);k=g*d;Q=e&&e.fontSize;void 0!==p&&(L=p.toString(),-1===L.indexOf("\x3c")&&(L=L.replace(/[0-9]/g,"0")),L+=["",g||0,Q,e&&e.width,e&&e.textOverflow].join());L&&!a&&(x=M[L]);
if(!x){if(t.namespaceURI===this.SVG_NS||u.forExport){try{(w=this.fakeTS&&function(a){b(t.querySelectorAll(".highcharts-text-outline"),function(x){x.style.display=a})})&&w("none"),x=t.getBBox?c({},t.getBBox()):{width:t.offsetWidth,height:t.offsetHeight},w&&w("")}catch(X){}if(!x||0>x.width)x={width:0,height:0}}else x=this.htmlGetBBox();u.isSVG&&(a=x.width,u=x.height,e&&"11px"===e.fontSize&&17===Math.round(u)&&(x.height=u=14),g&&(x.width=Math.abs(u*Math.sin(k))+Math.abs(a*Math.cos(k)),x.height=Math.abs(u*
Math.cos(k))+Math.abs(a*Math.sin(k))));if(L&&0<x.height){for(;250<n.length;)delete M[n.shift()];M[L]||n.push(L);M[L]=x}}return x},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var g=this;g.animate({opacity:0},{duration:a||150,complete:function(){g.attr({y:-9999})}})},add:function(a){var g=this.renderer,x=this.element,u;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&
g.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)u=this.zIndexSetter();u||(a?a.element:g.box).appendChild(x);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var g=a.parentNode;g&&g.removeChild(a)},destroy:function(){var a=this,g=a.element||{},u=a.renderer.isSVG&&"SPAN"===g.nodeName&&a.parentGroup,c=g.ownerSVGElement;g.onclick=g.onmouseout=g.onmouseover=g.onmousemove=g.point=null;P(a);a.clipPath&&c&&(b(c.querySelectorAll("[clip-path]"),function(g){-1<g.getAttribute("clip-path").indexOf(a.clipPath.element.id+
")")&&g.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(c=0;c<a.stops.length;c++)a.stops[c]=a.stops[c].destroy();a.stops=null}a.safeRemoveChild(g);for(a.destroyShadows();u&&u.div&&0===u.div.childNodes.length;)g=u.parentGroup,a.safeRemoveChild(u.div),delete u.div,u=g;a.alignTo&&w(a.renderer.alignedObjects,a);E(a,function(g,x){delete a[x]});return null},shadow:function(a,g,u){var x=[],c,k,b=this.element,d,t,e,p;if(!a)this.destroyShadows();else if(!this.shadows){t=H(a.width,
3);e=(a.opacity||.15)/t;p=this.parentInverted?"(-1,-1)":"("+H(a.offsetX,1)+", "+H(a.offsetY,1)+")";for(c=1;c<=t;c++)k=b.cloneNode(0),d=2*t+1-2*c,l(k,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":e*c,"stroke-width":d,transform:"translate"+p,fill:"none"}),u&&(l(k,"height",Math.max(l(k,"height")-d,0)),k.cutHeight=d),g?g.element.appendChild(k):b.parentNode&&b.parentNode.insertBefore(k,b),x.push(k);this.shadows=x}return this},destroyShadows:function(){b(this.shadows||[],function(a){this.safeRemoveChild(a)},
this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=H(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,u){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[g]!==a&&(u.setAttribute(g,a),this[g]=a)},dashstyleSetter:function(a){var u,x=this["stroke-width"];"inherit"===x&&(x=1);if(a=
a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(u=a.length;u--;)a[u]=g(a[u])*x;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,
g,u){this[g]=a;u.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=n.createElementNS(this.SVG_NS,"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(n.createTextNode(String(H(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,g,u){"string"===typeof a?u.setAttribute(g,a):a&&this.colorGradient(a,
g,u)},visibilitySetter:function(a,g,u){"inherit"===a?u.removeAttribute(g):this[g]!==a&&u.setAttribute(g,a);this[g]=a},zIndexSetter:function(a,u){var c=this.renderer,k=this.parentGroup,x=(k||c).element||c.box,b,d=this.element,t,e,c=x===c.box;b=this.added;var p;v(a)&&(d.zIndex=a,a=+a,this[u]===a&&(b=!1),this[u]=a);if(b){(a=this.zIndex)&&k&&(k.handleZ=!0);u=x.childNodes;for(p=u.length-1;0<=p&&!t;p--)if(k=u[p],b=k.zIndex,e=!v(b),k!==d)if(0>a&&e&&!c&&!p)x.insertBefore(d,u[p]),t=!0;else if(g(b)<=a||e&&
(!v(a)||0<=a))x.insertBefore(d,u[p+1]||null),t=!0;t||(x.insertBefore(d,u[c?3:0]||null),t=!0)}return t},_defaultSetter:function(a,g,u){u.setAttribute(g,a)}});A.prototype.yGetter=A.prototype.xGetter;A.prototype.translateXSetter=A.prototype.translateYSetter=A.prototype.rotationSetter=A.prototype.verticalAlignSetter=A.prototype.rotationOriginXSetter=A.prototype.rotationOriginYSetter=A.prototype.scaleXSetter=A.prototype.scaleYSetter=A.prototype.matrixSetter=function(a,g){this[g]=a;this.doTransform=!0};
A.prototype["stroke-widthSetter"]=A.prototype.strokeSetter=function(a,g,u){this[g]=a;this.stroke&&this["stroke-width"]?(A.prototype.fillSetter.call(this,this.stroke,"stroke",u),u.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===g&&0===a&&this.hasStroke&&(u.removeAttribute("stroke"),this.hasStroke=!1)};B=a.SVGRenderer=function(){this.init.apply(this,arguments)};c(B.prototype,{Element:A,SVG_NS:O,init:function(a,g,u,c,k,b){var x;c=this.createElement("svg").attr({version:"1.1",
"class":"highcharts-root"}).css(this.getStyle(c));x=c.element;a.appendChild(x);-1===a.innerHTML.indexOf("xmlns")&&l(x,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=x;this.boxWrapper=c;this.alignedObjects=[];this.url=(y||J)&&n.getElementsByTagName("base").length?S.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highcharts 6.0.1"));this.defs=this.createElement("defs").add();
this.allowHTML=b;this.forExport=k;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,u,!1);var d;y&&a.getBoundingClientRect&&(g=function(){m(a,{left:0,top:0});d=a.getBoundingClientRect();m(a,{left:Math.ceil(d.left)-d.left+"px",top:Math.ceil(d.top)-d.top+"px"})},g(),this.unSubPixelFix=G(S,"resize",g))},getStyle:function(a){return this.style=c({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},
isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();e(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,a);return g},draw:D,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-a[2]/2+g.cy*a[2],r:g.r*a[2]}},getSpanWidth:function(a,g){var u=
a.getBBox(!0).width;!M&&this.forExport&&(u=this.measureSpanWidth(g.firstChild.data,a.styles));return u},applyEllipsis:function(a,g,u,c){var k=a.rotation,b=u,x,d=0,t=u.length,e=function(a){g.removeChild(g.firstChild);a&&g.appendChild(n.createTextNode(a))},p;a.rotation=0;b=this.getSpanWidth(a,g);if(p=b>c){for(;d<=t;)x=Math.ceil((d+t)/2),b=u.substring(0,x)+"\u2026",e(b),b=this.getSpanWidth(a,g),d===t?d=t+1:b>c?t=x-1:d=x;0===t&&e("")}a.rotation=k;return p},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;",
"\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot"},buildText:function(a){var u=a.element,c=this,d=c.forExport,x=H(a.textStr,"").toString(),t=-1!==x.indexOf("\x3c"),e=u.childNodes,p,w,L,f,y=l(u,"x"),q=a.styles,D=a.textWidth,C=q&&q.lineHeight,z=q&&q.textOutline,h=q&&"ellipsis"===q.textOverflow,I=q&&"nowrap"===q.whiteSpace,P=q&&q.fontSize,r,v,K=e.length,q=D&&!a.added&&this.box,S=function(a){var k;k=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:P||c.style.fontSize||12;return C?g(C):c.fontMetrics(k,
a.getAttribute("style")?a:u).h},J=function(a){E(c.escapes,function(g,u){a=a.replace(new RegExp(g,"g"),u)});return a};r=[x,h,I,C,z,P,D].join();if(r!==a.textCache){for(a.textCache=r;K--;)u.removeChild(e[K]);t||z||h||D||-1!==x.indexOf(" ")?(p=/<.*class="([^"]+)".*>/,w=/<.*style="([^"]+)".*>/,L=/<.*href="([^"]+)".*>/,q&&q.appendChild(u),x=t?x.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
"\x3c/span\x3e").split(/<br.*?>/g):[x],x=k(x,function(a){return""!==a}),b(x,function(g,k){var x,t=0;g=g.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");x=g.split("|||");b(x,function(g){if(""!==g||1===x.length){var b={},e=n.createElementNS(c.SVG_NS,"tspan"),q,E;p.test(g)&&(q=g.match(p)[1],l(e,"class",q));w.test(g)&&(E=g.match(w)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),l(e,"style",E));L.test(g)&&!d&&(l(e,"onclick",'location.href\x3d"'+g.match(L)[1]+
'"'),l(e,"class","highcharts-anchor"),m(e,{cursor:"pointer"}));g=J(g.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==g){e.appendChild(n.createTextNode(g));t?b.dx=0:k&&null!==y&&(b.x=y);l(e,b);u.appendChild(e);!t&&v&&(!M&&d&&m(e,{display:"block"}),l(e,"dy",S(e)));if(D){b=g.replace(/([^\^])-/g,"$1- ").split(" ");q=1<x.length||k||1<b.length&&!I;var C=[],Q,z=S(e),r=a.rotation;for(h&&(f=c.applyEllipsis(a,e,g,D));!h&&q&&(b.length||C.length);)a.rotation=0,Q=c.getSpanWidth(a,e),g=Q>D,void 0===f&&(f=g),
g&&1!==b.length?(e.removeChild(e.firstChild),C.unshift(b.pop())):(b=C,C=[],b.length&&!I&&(e=n.createElementNS(O,"tspan"),l(e,{dy:z,x:y}),E&&l(e,"style",E),u.appendChild(e)),Q>D&&(D=Q)),b.length&&e.appendChild(n.createTextNode(b.join(" ").replace(/- /g,"-")));a.rotation=r}t++}}});v=v||u.childNodes.length}),f&&a.attr("title",a.textStr),q&&q.removeChild(u),z&&a.applyTextOutline&&a.applyTextOutline(z)):u.appendChild(n.createTextNode(J(x)))}},getContrast:function(a){a=h(a).rgba;return 510<a[0]+a[1]+a[2]?
"#000000":"#FFFFFF"},button:function(a,g,u,k,b,d,e,p,w){var x=this.label(a,g,u,w,null,null,null,null,"button"),M=0;x.attr(t({padding:8,r:2},b));var n,L,f,q;b=t({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},b);n=b.style;delete b.style;d=t(b,{fill:"#e6e6e6"},d);L=d.style;delete d.style;e=t(b,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},e);f=e.style;delete e.style;p=t(b,{style:{color:"#cccccc"}},p);q=p.style;delete p.style;
G(x.element,K?"mouseover":"mouseenter",function(){3!==M&&x.setState(1)});G(x.element,K?"mouseout":"mouseleave",function(){3!==M&&x.setState(M)});x.setState=function(a){1!==a&&(x.state=M=a);x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);x.attr([b,d,e,p][a||0]).css([n,L,f,q][a||0])};x.attr(b).css(c({cursor:"default"},n));return x.on("click",function(a){3!==M&&k.call(x,a)})},crispLine:function(a,g){a[1]===
a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g={fill:"none"};I(a)?g.d=a:q(a)&&c(g,a);return this.createElement("path").attr(g)},circle:function(a,g,u){a=q(a)?a:{x:a,y:g,r:u};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,u){u.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,u,c,b,k){q(a)?(c=a,g=c.y,u=c.r,a=c.x):c={innerR:c,start:b,end:k};a=this.symbol("arc",a,g,u,u,c);a.r=u;return a},rect:function(a,
g,u,c,b,k){b=q(a)?a.r:b;var d=this.createElement("rect");a=q(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(u,0),height:Math.max(c,0)};void 0!==k&&(a.strokeWidth=k,a=d.crisp(a));a.fill="none";b&&(a.r=b);d.rSetter=function(a,g,u){l(u,{rx:a,ry:a})};return d.attr(a)},setSize:function(a,g,u){var c=this.alignedObjects,b=c.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:H(u,!0)?
void 0:0});b--;)c[b].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,g,u,b,k){var d={preserveAspectRatio:"none"};1<arguments.length&&c(d,{x:g,y:u,width:b,height:k});d=this.createElement("image").attr(d);d.element.setAttributeNS?d.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):d.element.setAttribute("hc-svg-href",a);return d},symbol:function(a,g,u,k,d,t){var e=this,x,p=/^url\((.*?)\)$/,w=p.test(a),M=!w&&(this.symbols[a]?
a:"circle"),q=M&&this.symbols[M],y=v(g)&&q&&q.call(this.symbols,Math.round(g),Math.round(u),k,d,t),E,D;q?(x=this.path(y),x.attr("fill","none"),c(x,{symbolName:M,x:g,y:u,width:k,height:d}),t&&c(x,t)):w&&(E=a.match(p)[1],x=this.image(E),x.imgwidth=H(L[E]&&L[E].width,t&&t.width),x.imgheight=H(L[E]&&L[E].height,t&&t.height),D=function(){x.attr({width:x.width,height:x.height})},b(["width","height"],function(a){x[a+"Setter"]=function(a,g){var u={},c=this["img"+g],b="width"===g?"translateX":"translateY";
this[g]=a;v(c)&&(this.element&&this.element.setAttribute(g,c),this.alignByTranslate||(u[b]=((this[g]||0)-c)/2,this.attr(u)))}}),v(g)&&x.attr({x:g,y:u}),x.isImg=!0,v(x.imgwidth)&&v(x.imgheight)?D():(x.attr({width:0,height:0}),r("img",{onload:function(){var a=f[e.chartIndex];0===this.width&&(m(this,{position:"absolute",top:"-999em"}),n.body.appendChild(this));L[E]={width:this.width,height:this.height};x.imgwidth=this.width;x.imgheight=this.height;x.element&&D();this.parentNode&&this.parentNode.removeChild(this);
e.imgCount--;if(!e.imgCount&&a&&a.onload)a.onload()},src:E}),this.imgCount++));return x},symbols:{circle:function(a,g,u,c){return this.arc(a+u/2,g+c/2,u/2,c/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,g,u,c){return["M",a,g,"L",a+u,g,a+u,g+c,a,g+c,"Z"]},triangle:function(a,g,u,c){return["M",a+u/2,g,"L",a+u,g+c,a,g+c,"Z"]},"triangle-down":function(a,g,u,c){return["M",a,g,"L",a+u,g,a+u/2,g+c,"Z"]},diamond:function(a,g,u,c){return["M",a+u/2,g,"L",a+u,g+c/2,a+u/2,g+c,a,g+c/2,"Z"]},arc:function(a,
g,u,c,b){var k=b.start,d=b.r||u,t=b.r||c||u,e=b.end-.001;u=b.innerR;c=H(b.open,.001>Math.abs(b.end-b.start-2*Math.PI));var x=Math.cos(k),p=Math.sin(k),w=Math.cos(e),e=Math.sin(e);b=.001>b.end-k-Math.PI?0:1;d=["M",a+d*x,g+t*p,"A",d,t,0,b,1,a+d*w,g+t*e];v(u)&&d.push(c?"M":"L",a+u*w,g+u*e,"A",u,u,0,b,0,a+u*x,g+u*p);d.push(c?"":"Z");return d},callout:function(a,g,u,c,b){var k=Math.min(b&&b.r||0,u,c),d=k+6,t=b&&b.anchorX;b=b&&b.anchorY;var e;e=["M",a+k,g,"L",a+u-k,g,"C",a+u,g,a+u,g,a+u,g+k,"L",a+u,g+c-
k,"C",a+u,g+c,a+u,g+c,a+u-k,g+c,"L",a+k,g+c,"C",a,g+c,a,g+c,a,g+c-k,"L",a,g+k,"C",a,g,a,g,a+k,g];t&&t>u?b>g+d&&b<g+c-d?e.splice(13,3,"L",a+u,b-6,a+u+6,b,a+u,b+6,a+u,g+c-k):e.splice(13,3,"L",a+u,c/2,t,b,a+u,c/2,a+u,g+c-k):t&&0>t?b>g+d&&b<g+c-d?e.splice(33,3,"L",a,b+6,a-6,b,a,b-6,a,g+k):e.splice(33,3,"L",a,c/2,t,b,a,c/2,a,g+k):b&&b>c&&t>a+d&&t<a+u-d?e.splice(23,3,"L",t+6,g+c,t,g+c+6,t-6,g+c,a+k,g+c):b&&0>b&&t>a+d&&t<a+u-d&&e.splice(3,3,"L",t-6,g,t,g-6,t+6,g,u-k,g);return e}},clipRect:function(g,u,c,
b){var k=a.uniqueKey(),d=this.createElement("clipPath").attr({id:k}).add(this.defs);g=this.rect(g,u,c,b,0).add(d);g.id=k;g.clipPath=d;g.count=0;return g},text:function(a,g,u,c){var b={};if(c&&(this.allowHTML||!this.forExport))return this.html(a,g,u);b.x=Math.round(g||0);u&&(b.y=Math.round(u));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);c||(a.xSetter=function(a,g,u){var c=u.getElementsByTagName("tspan"),b,k=u.getAttribute(g),d;for(d=0;d<c.length;d++)b=c[d],b.getAttribute(g)===k&&b.setAttribute(g,
a);u.setAttribute(g,a)});return a},fontMetrics:function(a,u){a=a||u&&u.style&&u.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?g(a):/em/.test(a)?parseFloat(a)*(u?this.fontMetrics(null,u.parentNode).f:16):12;u=24>a?a+3:Math.round(1.2*a);return{h:u,b:Math.round(.8*u),f:a}},rotCorr:function(a,g,u){var c=a;g&&u&&(c=Math.max(c*Math.cos(g*d),4));return{x:-a/3*Math.sin(g*d),y:c}},label:function(g,k,d,e,p,w,M,n,L){var x=this,q=x.g("button"!==L&&"label"),f=q.text=x.text("",0,0,M).attr({zIndex:1}),
y,E,D=0,m=3,C=0,z,h,r,I,P,l={},K,S,H=/^url\((.*?)\)$/.test(e),O=H,Q,J,U,T;L&&q.addClass("highcharts-"+L);O=H;Q=function(){return(K||0)%2/2};J=function(){var a=f.element.style,g={};E=(void 0===z||void 0===h||P)&&v(f.textStr)&&f.getBBox();q.width=(z||E.width||0)+2*m+C;q.height=(h||E.height||0)+2*m;S=m+x.fontMetrics(a&&a.fontSize,f).b;O&&(y||(q.box=y=x.symbols[e]||H?x.symbol(e):x.rect(),y.addClass(("button"===L?"":"highcharts-label-box")+(L?" highcharts-"+L+"-box":"")),y.add(q),a=Q(),g.x=a,g.y=(n?-S:
0)+a),g.width=Math.round(q.width),g.height=Math.round(q.height),y.attr(c(g,l)),l={})};U=function(){var a=C+m,g;g=n?0:S;v(z)&&E&&("center"===P||"right"===P)&&(a+={center:.5,right:1}[P]*(z-E.width));if(a!==f.x||g!==f.y)f.attr("x",a),void 0!==g&&f.attr("y",g);f.x=a;f.y=g};T=function(a,g){y?y.attr(a,g):l[a]=g};q.onAdd=function(){f.add(q);q.attr({text:g||0===g?g:"",x:k,y:d});y&&v(p)&&q.attr({anchorX:p,anchorY:w})};q.widthSetter=function(g){z=a.isNumber(g)?g:null};q.heightSetter=function(a){h=a};q["text-alignSetter"]=
function(a){P=a};q.paddingSetter=function(a){v(a)&&a!==m&&(m=q.padding=a,U())};q.paddingLeftSetter=function(a){v(a)&&a!==C&&(C=a,U())};q.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==D&&(D=a,E&&q.attr({x:r}))};q.textSetter=function(a){void 0!==a&&f.textSetter(a);J();U()};q["stroke-widthSetter"]=function(a,g){a&&(O=!0);K=this["stroke-width"]=a;T(g,a)};q.strokeSetter=q.fillSetter=q.rSetter=function(a,g){"r"!==g&&("fill"===g&&a&&(O=!0),q[g]=a);T(g,a)};q.anchorXSetter=function(a,g){p=q.anchorX=
a;T(g,Math.round(a)-Q()-r)};q.anchorYSetter=function(a,g){w=q.anchorY=a;T(g,a-I)};q.xSetter=function(a){q.x=a;D&&(a-=D*((z||E.width)+2*m));r=Math.round(a);q.attr("translateX",r)};q.ySetter=function(a){I=q.y=Math.round(a);q.attr("translateY",I)};var V=q.css;return c(q,{css:function(a){if(a){var g={};a=t(a);b(q.textProps,function(u){void 0!==a[u]&&(g[u]=a[u],delete a[u])});f.css(g)}return V.call(q,a)},getBBox:function(){return{width:E.width+2*m,height:E.height+2*m,x:E.x-m,y:E.y-m}},shadow:function(a){a&&
(J(),y&&y.shadow(a));return q},destroy:function(){u(q.element,"mouseenter");u(q.element,"mouseleave");f&&(f=f.destroy());y&&(y=y.destroy());A.prototype.destroy.call(q);q=x=J=U=T=null}})}});a.Renderer=B})(N);(function(a){var A=a.attr,B=a.createElement,G=a.css,F=a.defined,l=a.each,f=a.extend,h=a.isFirefox,m=a.isMS,r=a.isWebKit,v=a.pInt,d=a.SVGRenderer,e=a.win,n=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var c=this.element;if(c=a&&"SPAN"===c.tagName&&a.width)delete a.width,this.textWidth=c,
this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,c=this.element,d=this.translateX||0,k=this.translateY||0,e=this.x||0,n=this.y||0,f=this.textAlign||"left",y={left:0,center:.5,right:1}[f],m=this.styles;G(c,
{marginLeft:d,marginTop:k});this.shadows&&l(this.shadows,function(a){G(a,{marginLeft:d+1,marginTop:k+1})});this.inverted&&l(c.childNodes,function(b){a.invertChild(b,c)});if("SPAN"===c.tagName){var q=this.rotation,z=v(this.textWidth),h=m&&m.whiteSpace,t=[q,f,c.innerHTML,this.textWidth,this.textAlign].join();t!==this.cTT&&(m=a.fontMetrics(c.style.fontSize).b,F(q)&&this.setSpanRotation(q,y,m),G(c,{width:"",whiteSpace:h||"nowrap"}),c.offsetWidth>z&&/[ \-]/.test(c.textContent||c.innerText)&&G(c,{width:z+
"px",display:"block",whiteSpace:h||"normal"}),this.getSpanCorrection(c.offsetWidth,m,y,q,f));G(c,{left:e+(this.xCorr||0)+"px",top:n+(this.yCorr||0)+"px"});r&&(m=c.offsetHeight);this.cTT=t}}else this.alignOnAdd=!0},setSpanRotation:function(a,c,d){var b={},e=this.renderer.getTransformKey();b[e]=b.transform="rotate("+a+"deg)";b[e+(h?"Origin":"-origin")]=b.transformOrigin=100*c+"% "+d+"px";G(this.element,b)},getSpanCorrection:function(a,c,d){this.xCorr=-a*d;this.yCorr=-c}});f(d.prototype,{getTransformKey:function(){return m&&
!/Edge/.test(e.navigator.userAgent)?"-ms-transform":r?"-webkit-transform":h?"MozTransform":e.opera?"-o-transform":""},html:function(a,c,d){var b=this.createElement("span"),e=b.element,w=b.renderer,m=w.isSVG,y=function(a,c){l(["opacity","visibility"],function(b){n(a,b+"Setter",function(a,b,k,d){a.call(this,b,k,d);c[k]=b})})};b.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a;b.htmlUpdateTransform()};m&&y(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=
function(a,c){"align"===c&&(c="textAlign");b[c]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(c),y:Math.round(d)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});e.style.whiteSpace="nowrap";b.css=b.htmlCss;m&&(b.add=function(a){var c,k=w.box.parentNode,d=[];if(this.parentGroup=a){if(c=a.div,!c){for(;a;)d.push(a),a=a.parentGroup;l(d.reverse(),function(a){function t(g,u){a[u]=g;e[w.getTransformKey()]="translate("+a.x+"px,"+a.y+"px)";a.doTransform=!0}
var e,p=A(a.element,"class");p&&(p={className:p});c=a.div=a.div||B("div",p,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},c||k);e=c.style;f(a,{classSetter:function(a){this.element.setAttribute("class",a);c.className=a},on:function(){d[0].div&&b.on.apply({element:d[0].div},arguments);return a},translateXSetter:t,translateYSetter:t});y(a,e)})}}else c=k;c.appendChild(e);b.added=!0;b.alignOnAdd&&
b.htmlUpdateTransform();return b});return b}})})(N);(function(a){function A(){var f=a.defaultOptions.global,r=h.moment;if(f.timezone){if(r)return function(a){return-r.tz(a,f.timezone).utcOffset()};a.error(25)}return f.useUTC&&f.getTimezoneOffset}function B(){var m=a.defaultOptions.global,r,v=m.useUTC,d=v?"getUTC":"get",e=v?"setUTC":"set",n="Minutes Hours Day Date Month FullYear".split(" "),b=n.concat(["Milliseconds","Seconds"]);a.Date=r=m.Date||h.Date;r.hcTimezoneOffset=v&&m.timezoneOffset;r.hcGetTimezoneOffset=
A();r.hcMakeTime=function(a,b,k,d,e,n){var c;v?(c=r.UTC.apply(0,arguments),c+=F(c)):c=(new r(a,b,f(k,1),f(d,0),f(e,0),f(n,0))).getTime();return c};for(m=0;m<n.length;m++)r["hcGet"+n[m]]=d+n[m];for(m=0;m<b.length;m++)r["hcSet"+b[m]]=e+b[m]}var G=a.color,F=a.getTZOffset,l=a.merge,f=a.pick,h=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",
months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},
itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,
animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:G("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(f){a.defaultOptions=l(!0,a.defaultOptions,f);B();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;B()})(N);
(function(a){var A=a.correctFloat,B=a.defined,G=a.destroyObjectProperties,F=a.isNumber,l=a.merge,f=a.pick,h=a.deg2rad;a.Tick=function(a,f,h,d){this.axis=a;this.pos=f;this.type=h||"";this.isNewLabel=this.isNew=!0;h||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,h=a.options,v=a.chart,d=a.categories,e=a.names,n=this.pos,b=h.labels,c=a.tickPositions,w=n===c[0],k=n===c[c.length-1],e=d?f(d[n],e[n],n):n,d=this.label,c=c.info,p;a.isDatetimeAxis&&c&&(p=h.dateTimeLabelFormats[c.higherRanks[n]||
c.unitName]);this.isFirst=w;this.isLast=k;h=a.labelFormatter.call({axis:a,chart:v,isFirst:w,isLast:k,dateTimeLabelFormat:p,value:a.isLog?A(a.lin2log(e)):e,pos:n});B(d)?d&&d.attr({text:h}):(this.labelLength=(this.label=d=B(h)&&b.enabled?v.renderer.text(h,0,0,b.useHTML).css(l(b.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var m=this.axis,v=a.x,d=m.chart.chartWidth,
e=m.chart.spacing,n=f(m.labelLeft,Math.min(m.pos,e[3])),e=f(m.labelRight,Math.max(m.pos+m.len,d-e[1])),b=this.label,c=this.rotation,w={left:0,center:.5,right:1}[m.labelAlign],k=b.getBBox().width,p=m.getSlotWidth(),C=p,I=1,y,l={};if(c)0>c&&v-w*k<n?y=Math.round(v/Math.cos(c*h)-n):0<c&&v+w*k>e&&(y=Math.round((d-v)/Math.cos(c*h)));else if(d=v+(1-w)*k,v-w*k<n?C=a.x+C*(1-w)-n:d>e&&(C=e-a.x+C*w,I=-1),C=Math.min(p,C),C<p&&"center"===m.labelAlign&&(a.x+=I*(p-C-w*(p-Math.min(k,C)))),k>C||m.autoRotation&&(b.styles||
{}).width)y=C;y&&(l.width=y,(m.options.labels.style||{}).textOverflow||(l.textOverflow="ellipsis"),b.css(l))},getPosition:function(a,f,h,d){var e=this.axis,n=e.chart,b=d&&n.oldChartHeight||n.chartHeight;return{x:a?e.translate(f+h,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&n.oldChartWidth||n.chartWidth)-e.right-e.left:0),y:a?b-e.bottom+e.offset-(e.opposite?e.height:0):b-e.translate(f+h,null,null,d)-e.transB}},getLabelPosition:function(a,f,l,d,e,n,b,c){var w=this.axis,k=w.transA,p=w.reversed,
m=w.staggerLines,I=w.tickRotCorr||{x:0,y:0},y=e.y;B(y)||(y=0===w.side?l.rotation?-8:-l.getBBox().height:2===w.side?I.y+8:Math.cos(l.rotation*h)*(I.y-l.getBBox(!1,0).height/2));a=a+e.x+I.x-(n&&d?n*k*(p?-1:1):0);f=f+y-(n&&!d?n*k*(p?1:-1):0);m&&(l=b/(c||1)%m,w.opposite&&(l=m-l-1),f+=w.labelOffset/m*l);return{x:a,y:Math.round(f)}},getMarkPath:function(a,f,h,d,e,n){return n.crispLine(["M",a,f,"L",a+(e?0:-h),f+(e?h:0)],d)},renderGridLine:function(a,f,h){var d=this.axis,e=d.options,n=this.gridLine,b={},
c=this.pos,w=this.type,k=d.tickmarkOffset,p=d.chart.renderer,m=w?w+"Grid":"grid",l=e[m+"LineWidth"],y=e[m+"LineColor"],e=e[m+"LineDashStyle"];n||(b.stroke=y,b["stroke-width"]=l,e&&(b.dashstyle=e),w||(b.zIndex=1),a&&(b.opacity=0),this.gridLine=n=p.path().attr(b).addClass("highcharts-"+(w?w+"-":"")+"grid-line").add(d.gridGroup));if(!a&&n&&(a=d.getPlotLinePath(c+k,n.strokeWidth()*h,a,!0)))n[this.isNew?"attr":"animate"]({d:a,opacity:f})},renderMark:function(a,h,l){var d=this.axis,e=d.options,n=d.chart.renderer,
b=this.type,c=b?b+"Tick":"tick",w=d.tickSize(c),k=this.mark,p=!k,m=a.x;a=a.y;var I=f(e[c+"Width"],!b&&d.isXAxis?1:0),e=e[c+"Color"];w&&(d.opposite&&(w[0]=-w[0]),p&&(this.mark=k=n.path().addClass("highcharts-"+(b?b+"-":"")+"tick").add(d.axisGroup),k.attr({stroke:e,"stroke-width":I})),k[p?"attr":"animate"]({d:this.getMarkPath(m,a,w[0],k.strokeWidth()*l,d.horiz,n),opacity:h}))},renderLabel:function(a,h,l,d){var e=this.axis,n=e.horiz,b=e.options,c=this.label,w=b.labels,k=w.step,p=e.tickmarkOffset,m=!0,
I=a.x;a=a.y;c&&F(I)&&(c.xy=a=this.getLabelPosition(I,a,c,n,w,p,d,k),this.isFirst&&!this.isLast&&!f(b.showFirstLabel,1)||this.isLast&&!this.isFirst&&!f(b.showLastLabel,1)?m=!1:!n||e.isRadial||w.step||w.rotation||h||0===l||this.handleOverflow(a),k&&d%k&&(m=!1),m&&F(a.y)?(a.opacity=l,c[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(c.attr("y",-9999),this.isNewLabel=!0))},render:function(a,h,l){var d=this.axis,e=d.horiz,n=this.getPosition(e,this.pos,d.tickmarkOffset,h),b=n.x,c=n.y,d=e&&b===
d.pos+d.len||!e&&c===d.pos?-1:1;l=f(l,1);this.isActive=!0;this.renderGridLine(h,l,d);this.renderMark(n,l,d);this.renderLabel(n,h,l,a);this.isNew=!1},destroy:function(){G(this,this.axis)}}})(N);var W=function(a){var A=a.addEvent,B=a.animObject,G=a.arrayMax,F=a.arrayMin,l=a.color,f=a.correctFloat,h=a.defaultOptions,m=a.defined,r=a.deg2rad,v=a.destroyObjectProperties,d=a.each,e=a.extend,n=a.fireEvent,b=a.format,c=a.getMagnitude,w=a.grep,k=a.inArray,p=a.isArray,C=a.isNumber,I=a.isString,y=a.merge,K=a.normalizeTickInterval,
q=a.objectEach,z=a.pick,J=a.removeEvent,t=a.splat,D=a.syncTimeout,E=a.Tick,H=function(){this.init.apply(this,arguments)};a.extend(H.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,
tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,
formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,u){var g=u.isX,c=this;c.chart=a;c.horiz=
a.inverted&&!c.isZAxis?!g:g;c.isXAxis=g;c.coll=c.coll||(g?"xAxis":"yAxis");c.opposite=u.opposite;c.side=u.side||(c.horiz?c.opposite?0:2:c.opposite?1:3);c.setOptions(u);var b=this.options,d=b.type;c.labelFormatter=b.labels.formatter||c.defaultLabelFormatter;c.userOptions=u;c.minPixelPadding=0;c.reversed=b.reversed;c.visible=!1!==b.visible;c.zoomEnabled=!1!==b.zoomEnabled;c.hasNames="category"===d||!0===b.categories;c.categories=b.categories||c.hasNames;c.names=c.names||[];c.plotLinesAndBandsGroups=
{};c.isLog="logarithmic"===d;c.isDatetimeAxis="datetime"===d;c.positiveValuesOnly=c.isLog&&!c.allowNegativeLog;c.isLinked=m(b.linkedTo);c.ticks={};c.labelEdge=[];c.minorTicks={};c.plotLinesAndBands=[];c.alternateBands={};c.len=0;c.minRange=c.userMinRange=b.minRange||b.maxZoom;c.range=b.range;c.offset=b.offset||0;c.stacks={};c.oldStacks={};c.stacksTouched=0;c.max=null;c.min=null;c.crosshair=z(b.crosshair,t(a.options.tooltip.crosshairs)[g?0:1],!1);u=c.options.events;-1===k(c,a.axes)&&(g?a.axes.splice(a.xAxis.length,
0,c):a.axes.push(c),a[c.coll].push(c));c.series=c.series||[];a.inverted&&!c.isZAxis&&g&&void 0===c.reversed&&(c.reversed=!0);q(u,function(a,g){A(c,g,a)});c.lin2log=b.linearToLogConverter||c.lin2log;c.isLog&&(c.val2lin=c.log2lin,c.lin2val=c.lin2log)},setOptions:function(a){this.options=y(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],y(h[this.coll],a))},
defaultLabelFormatter:function(){var g=this.axis,u=this.value,c=g.categories,d=this.dateTimeLabelFormat,k=h.lang,e=k.numericSymbols,k=k.numericSymbolMagnitude||1E3,t=e&&e.length,p,f=g.options.labels.format,g=g.isLog?Math.abs(u):g.tickInterval;if(f)p=b(f,this);else if(c)p=u;else if(d)p=a.dateFormat(d,u);else if(t&&1E3<=g)for(;t--&&void 0===p;)c=Math.pow(k,t+1),g>=c&&0===10*u%c&&null!==e[t]&&0!==u&&(p=a.numberFormat(u/c,-1)+e[t]);void 0===p&&(p=1E4<=Math.abs(u)?a.numberFormat(u,-1):a.numberFormat(u,
-1,void 0,""));return p},getSeriesExtremes:function(){var a=this,u=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();d(a.series,function(g){if(g.visible||!u.options.chart.ignoreHiddenSeries){var c=g.options,b=c.threshold,d;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=b&&(b=null);if(a.isXAxis)c=g.xData,c.length&&(g=F(c),C(g)||g instanceof Date||(c=w(c,function(a){return C(a)}),g=F(c)),a.dataMin=Math.min(z(a.dataMin,c[0]),
g),a.dataMax=Math.max(z(a.dataMax,c[0]),G(c)));else if(g.getExtremes(),d=g.dataMax,g=g.dataMin,m(g)&&m(d)&&(a.dataMin=Math.min(z(a.dataMin,g),g),a.dataMax=Math.max(z(a.dataMax,d),d)),m(b)&&(a.threshold=b),!c.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,c,b,d,k,e){var g=this.linkedParent||this,u=1,t=0,p=d?g.oldTransA:g.transA;d=d?g.oldMin:g.min;var f=g.minPixelPadding;k=(g.isOrdinal||g.isBroken||g.isLog&&k)&&g.lin2val;p||(p=g.transA);b&&(u*=-1,t=g.len);g.reversed&&
(u*=-1,t-=u*(g.sector||g.len));c?(a=(a*u+t-f)/p+d,k&&(a=g.lin2val(a))):(k&&(a=g.val2lin(a)),a=C(d)?u*(a-d)*p+t+u*f+(C(e)?p*e:0):void 0);return a},toPixels:function(a,c){return this.translate(a,!1,!this.horiz,null,!0)+(c?0:this.pos)},toValue:function(a,c){return this.translate(a-(c?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,c,b,d,k){var g=this.chart,u=this.left,t=this.top,e,p,f=b&&g.oldChartHeight||g.chartHeight,w=b&&g.oldChartWidth||g.chartWidth,q;e=this.transB;var n=function(a,
g,c){if(a<g||a>c)d?a=Math.min(Math.max(g,a),c):q=!0;return a};k=z(k,this.translate(a,null,null,b));a=b=Math.round(k+e);e=p=Math.round(f-k-e);C(k)?this.horiz?(e=t,p=f-this.bottom,a=b=n(a,u,u+this.width)):(a=u,b=w-this.right,e=p=n(e,t,t+this.height)):(q=!0,d=!1);return q&&!d?null:g.renderer.crispLine(["M",a,e,"L",b,p],c||1)},getLinearTickPositions:function(a,c,b){var g,u=f(Math.floor(c/a)*a);b=f(Math.ceil(b/a)*a);var d=[];if(this.single)return[c];for(c=u;c<=b;){d.push(c);c=f(c+a);if(c===g)break;g=c}return d},
getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?z(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,c=a.options,b=a.tickPositions,k=a.minorTickInterval,e=[],t=a.pointRangePadding||0,p=a.min-t,t=a.max+t,f=t-p;if(f&&f/k<a.len/3)if(a.isLog)d(this.paddedTicks,function(g,c,u){c&&e.push.apply(e,a.getLogTickPositions(k,u[c-1],u[c],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())e=e.concat(a.getTimeTicks(a.normalizeTimeTickInterval(k),
p,t,c.startOfWeek));else for(c=p+(b[0]-p)%k;c<=t&&c!==e[0];c+=k)e.push(c);0!==e.length&&a.trimTicks(e);return e},adjustForMinRange:function(){var a=this.options,c=this.min,b=this.max,k,e,t,p,f,w,q,n;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(m(a.min)||m(a.max)?this.minRange=null:(d(this.series,function(a){w=a.xData;for(p=q=a.xIncrement?1:w.length-1;0<p;p--)if(f=w[p]-w[p-1],void 0===t||f<t)t=f}),this.minRange=Math.min(5*t,this.dataMax-this.dataMin)));b-c<this.minRange&&(e=this.dataMax-this.dataMin>=
this.minRange,n=this.minRange,k=(n-b+c)/2,k=[c-k,z(a.min,c-k)],e&&(k[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),c=G(k),b=[c+n,z(a.max,c+n)],e&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=F(b),b-c<n&&(k[0]=b-n,k[1]=z(a.min,b-n),c=G(k)));this.min=c;this.max=b},getClosest:function(){var a;this.categories?a=1:d(this.series,function(g){var c=g.closestPointRange,u=g.visible||!g.chart.options.chart.ignoreHiddenSeries;!g.noSharedTooltip&&m(c)&&u&&(a=m(a)?Math.min(a,c):c)});return a},
nameToX:function(a){var g=p(this.categories),c=g?this.categories:this.names,b=a.options.x,d;a.series.requireSorting=!1;m(b)||(b=!1===this.options.uniqueNames?a.series.autoIncrement():k(a.name,c));-1===b?g||(d=c.length):d=b;void 0!==d&&(this.names[d]=a.name);return d},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,d(this.series||[],function(g){g.xIncrement=null;if(!g.points||g.isDirtyData)g.processData(),g.generatePoints();d(g.points,function(c,
u){var b;c.options&&(b=a.nameToX(c),void 0!==b&&b!==c.x&&(c.x=b,g.xData[u]=b))})}))},setAxisTranslation:function(a){var g=this,c=g.max-g.min,b=g.axisPointRange||0,k,e=0,t=0,p=g.linkedParent,f=!!g.categories,w=g.transA,n=g.isXAxis;if(n||f||b)k=g.getClosest(),p?(e=p.minPointOffset,t=p.pointRangePadding):d(g.series,function(a){var c=f?1:n?z(a.options.pointRange,k,0):g.axisPointRange||0;a=a.options.pointPlacement;b=Math.max(b,c);g.single||(e=Math.max(e,I(a)?0:c/2),t=Math.max(t,"on"===a?0:c))}),p=g.ordinalSlope&&
k?g.ordinalSlope/k:1,g.minPointOffset=e*=p,g.pointRangePadding=t*=p,g.pointRange=Math.min(b,c),n&&(g.closestPointRange=k);a&&(g.oldTransA=w);g.translationSlope=g.transA=w=g.options.staticScale||g.len/(c+t||1);g.transB=g.horiz?g.left:g.bottom;g.minPixelPadding=w*e},minFromRange:function(){return this.max-this.range},setTickInterval:function(g){var b=this,k=b.chart,e=b.options,t=b.isLog,p=b.log2lin,w=b.isDatetimeAxis,q=b.isXAxis,y=b.isLinked,E=e.maxPadding,D=e.minPadding,h=e.tickInterval,l=e.tickPixelInterval,
I=b.categories,H=b.threshold,r=b.softThreshold,v,J,A,B;w||I||y||this.getTickAmount();A=z(b.userMin,e.min);B=z(b.userMax,e.max);y?(b.linkedParent=k[b.coll][e.linkedTo],k=b.linkedParent.getExtremes(),b.min=z(k.min,k.dataMin),b.max=z(k.max,k.dataMax),e.type!==b.linkedParent.options.type&&a.error(11,1)):(!r&&m(H)&&(b.dataMin>=H?(v=H,D=0):b.dataMax<=H&&(J=H,E=0)),b.min=z(A,v,b.dataMin),b.max=z(B,J,b.dataMax));t&&(b.positiveValuesOnly&&!g&&0>=Math.min(b.min,z(b.dataMin,b.min))&&a.error(10,1),b.min=f(p(b.min),
15),b.max=f(p(b.max),15));b.range&&m(b.max)&&(b.userMin=b.min=A=Math.max(b.dataMin,b.minFromRange()),b.userMax=B=b.max,b.range=null);n(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();!(I||b.axisPointRange||b.usePercentage||y)&&m(b.min)&&m(b.max)&&(p=b.max-b.min)&&(!m(A)&&D&&(b.min-=p*D),!m(B)&&E&&(b.max+=p*E));C(e.softMin)&&(b.min=Math.min(b.min,e.softMin));C(e.softMax)&&(b.max=Math.max(b.max,e.softMax));C(e.floor)&&(b.min=Math.max(b.min,e.floor));C(e.ceiling)&&(b.max=
Math.min(b.max,e.ceiling));r&&m(b.dataMin)&&(H=H||0,!m(A)&&b.min<H&&b.dataMin>=H?b.min=H:!m(B)&&b.max>H&&b.dataMax<=H&&(b.max=H));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:y&&!h&&l===b.linkedParent.options.tickPixelInterval?h=b.linkedParent.tickInterval:z(h,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,I?1:(b.max-b.min)*l/Math.max(b.len,l));q&&!g&&d(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&
b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!h&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));g=z(e.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!h&&b.tickInterval<g&&(b.tickInterval=g);w||t||h||(b.tickInterval=K(b.tickInterval,null,c(b.tickInterval),z(e.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());
this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions;b=this.getMinorTickInterval();var k=a.tickPositioner,d=a.startOnTick,e=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&m(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();
!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,k&&(k=k.apply(this,[this.min,this.max])))&&(this.tickPositions=b=k);this.paddedTicks=b.slice(0);this.trimTicks(b,d,e);this.isLinked||
(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),c||k||this.adjustTickAmount())},trimTicks:function(a,b,c){var g=a[0],k=a[a.length-1],d=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==g)this.min=g;else for(;this.min-d>a[0];)a.shift();if(c)this.max=k;else for(;this.max+d<a[a.length-1];)a.pop();0===a.length&&m(g)&&a.push((k+g)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||d(this.chart[this.coll],function(g){var c=
g.options,c=[g.horiz?c.left:c.top,c.width,c.height,c.pane].join();g.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!m(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,k=this.finalTickAmt,
d=b&&b.length;if(d<c){for(;b.length<c;)b.push(f(b[b.length-1]+a));this.transA*=(d-1)/(c-1);this.max=b[b.length-1]}else d>c&&(this.tickInterval*=2,this.setTickPositions());if(m(k)){for(a=c=b.length;a--;)(3===k&&1===a%2||2>=k&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;d(this.series,function(g){if(g.isDirtyData||g.isDirty||g.xAxis.isDirty)a=
!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,k,t){var g=this,u=g.chart;c=z(c,!0);d(g.series,function(a){delete a.kdTree});
t=e(t,{min:a,max:b});n(g,"setExtremes",t,function(){g.userMin=a;g.userMax=b;g.eventArgs=t;c&&u.redraw(k)})},zoom:function(a,b){var g=this.dataMin,c=this.dataMax,k=this.options,d=Math.min(g,z(k.min,g)),k=Math.max(c,z(k.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(m(g)&&(a<d&&(a=d),a>k&&(a=k)),m(c)&&(b<d&&(b=d),b>k&&(b=k))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,c=this.options,k=c.offsets||
[0,0,0,0],d=this.horiz,e=this.width=Math.round(a.relativeLength(z(c.width,b.plotWidth-k[3]+k[1]),b.plotWidth)),t=this.height=Math.round(a.relativeLength(z(c.height,b.plotHeight-k[0]+k[2]),b.plotHeight)),p=this.top=Math.round(a.relativeLength(z(c.top,b.plotTop+k[0]),b.plotHeight,b.plotTop)),c=this.left=Math.round(a.relativeLength(z(c.left,b.plotLeft+k[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-t-p;this.right=b.chartWidth-e-c;this.len=Math.max(d?e:t,0);this.pos=d?c:p},getExtremes:function(){var a=
this.isLog,b=this.lin2log;return{min:a?f(b(this.min)):this.min,max:a?f(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=this.lin2log,g=b?c(this.min):this.min,b=b?c(this.max):this.max;null===a?a=g:g>a?a=g:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(z(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,
c=b[a+"Length"],g=z(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(g&&c)return"inside"===b[a+"Position"]&&(c=-c),[c,g]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,k=c,e=this.len/(((this.categories?1:0)+this.max-this.min)/c),t,p=a.rotation,f=this.labelMetrics(),
w,n=Number.MAX_VALUE,q,y=function(a){a/=e||1;a=1<a?Math.ceil(a):1;return a*c};b?(q=!a.staggerLines&&!a.step&&(m(p)?[p]:e<z(a.autoRotationLimit,80)&&a.autoRotation))&&d(q,function(a){var b;if(a===p||a&&-90<=a&&90>=a)w=y(Math.abs(f.h/Math.sin(r*a))),b=w+Math.abs(a/360),b<n&&(n=b,t=a,k=w)}):a.step||(k=y(f.h));this.autoRotation=q;this.labelRotation=z(t,p);return k},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,k=Math.max(this.tickPositions.length-(this.categories?0:1),1),
d=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/k||!b&&(c.style&&parseInt(c.style.width,10)||d&&d-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,k=this.ticks,e=this.options.labels,t=this.horiz,p=this.getSlotWidth(),f=Math.max(1,Math.round(p-2*(e.padding||5))),w={},n=this.labelMetrics(),q=e.style&&e.style.textOverflow,E,D=0,h,m;I(e.rotation)||(w.rotation=e.rotation||0);d(c,function(a){(a=k[a])&&a.labelLength>
D&&(D=a.labelLength)});this.maxLabelLength=D;if(this.autoRotation)D>f&&D>n.h?w.rotation=this.labelRotation:this.labelRotation=0;else if(p&&(E={width:f+"px"},!q))for(E.textOverflow="clip",h=c.length;!t&&h--;)if(m=c[h],f=k[m].label)f.styles&&"ellipsis"===f.styles.textOverflow?f.css({textOverflow:"clip"}):k[m].labelLength>p&&f.css({width:p+"px"}),f.getBBox().height>this.len/c.length-(n.h-n.f)&&(f.specCss={textOverflow:"ellipsis"});w.rotation&&(E={width:(D>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+
"px"},q||(E.textOverflow="ellipsis"));if(this.labelAlign=e.align||this.autoLabelAlign(this.labelRotation))w.align=this.labelAlign;d(c,function(a){var b=(a=k[a])&&a.label;b&&(b.attr(w),E&&b.css(y(E,b.specCss)),delete b.specCss,a.rotation=w.rotation)});this.tickRotCorr=b.rotCorr(n.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||m(this.min)&&m(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,c=this.horiz,g=this.opposite,k=this.options.title,
d;this.axisTitle||((d=k.textAlign)||(d=(c?{low:"left",middle:"center",high:"right"}:{low:g?"right":"left",middle:"center",high:g?"left":"right"})[k.align]),this.axisTitle=b.text(k.text,0,0,k.useHTML).attr({zIndex:7,rotation:k.rotation||0,align:d}).addClass("highcharts-axis-title").css(k.style).add(this.axisGroup),this.axisTitle.isNew=!0);k.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():
b[a]=new E(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,k=a.options,e=a.tickPositions,t=a.ticks,p=a.horiz,f=a.side,w=b.inverted&&!a.isZAxis?[1,0,3,2][f]:f,n,y,E=0,D,h=0,C=k.title,l=k.labels,I=0,H=b.axisOffset,b=b.clipOffset,r=[-1,1,1,-1][f],v=k.className,K=a.axisParent,J=this.tickSize("tick");n=a.hasData();a.showAxis=y=n||z(k.showEmpty,!0);a.staggerLines=a.horiz&&l.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:k.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+
"-grid "+(v||"")).add(K),a.axisGroup=c.g("axis").attr({zIndex:k.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(v||"")).add(K),a.labelGroup=c.g("axis-labels").attr({zIndex:l.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(v||"")).add(K));n||a.isLinked?(d(e,function(b,c){a.generateTick(b,c)}),a.renderUnsquish(),!1===l.reserveSpace||0!==f&&2!==f&&{1:"left",3:"right"}[f]!==a.labelAlign&&"center"!==a.labelAlign||d(e,function(a){I=Math.max(t[a].getLabelSize(),I)}),a.staggerLines&&
(I*=a.staggerLines,a.labelOffset=I*(a.opposite?-1:1))):q(t,function(a,b){a.destroy();delete t[b]});C&&C.text&&!1!==C.enabled&&(a.addTitle(y),y&&!1!==C.reserveSpace&&(a.titleOffset=E=a.axisTitle.getBBox()[p?"height":"width"],D=C.offset,h=m(D)?0:z(C.margin,p?5:10)));a.renderLine();a.offset=r*z(k.offset,H[f]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===f?-a.labelMetrics().h:2===f?a.tickRotCorr.y:0;h=Math.abs(I)+h;I&&(h=h-c+r*(p?z(l.y,a.tickRotCorr.y+8*r):l.x));a.axisTitleMargin=z(D,h);H[f]=Math.max(H[f],
a.axisTitleMargin+E+r*a.offset,h,n&&e.length&&J?J[0]+r*a.offset:0);k=k.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[w]=Math.max(b[w],k)},getLinePath:function(a){var b=this.chart,c=this.opposite,g=this.offset,k=this.horiz,d=this.left+(c?this.width:0)+g,g=b.chartHeight-this.bottom-(c?this.height:0)+g;c&&(a*=-1);return b.renderer.crispLine(["M",k?this.left:d,k?g:this.top,"L",k?b.chartWidth-this.right:d,k?g:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,k=this.len,d=this.options.title,e=a?b:c,t=this.opposite,p=this.offset,f=d.x||0,w=d.y||0,n=this.axisTitle,q=this.chart.renderer.fontMetrics(d.style&&d.style.fontSize,n),n=Math.max(n.getBBox(null,0).height-q.h-1,0),k={low:e+(a?0:k),middle:e+k/2,high:e+(a?k:0)}[d.align],b=(a?c+this.height:b)+(a?1:-1)*(t?-1:1)*this.axisTitleMargin+[-n,
n,q.f,-n][this.side];return{x:a?k+f:b+(t?this.width:0)+p+f,y:a?b+w-(t?this.height:0)+p:k+w}},renderMinorTick:function(a){var b=this.chart.hasRendered&&C(this.oldMin),c=this.minorTicks;c[a]||(c[a]=new E(this,a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,g=this.ticks,k=this.chart.hasRendered&&C(this.oldMin);if(!c||a>=this.min&&a<=this.max)g[a]||(g[a]=new E(this,a)),k&&g[a].isNew&&g[a].render(b,!0,.1),g[a].render(b)},render:function(){var b=
this,c=b.chart,k=b.options,e=b.isLog,t=b.lin2log,p=b.isLinked,f=b.tickPositions,w=b.axisTitle,n=b.ticks,y=b.minorTicks,h=b.alternateBands,m=k.stackLabels,l=k.alternateGridColor,z=b.tickmarkOffset,I=b.axisLine,H=b.showAxis,r=B(c.renderer.globalAnimation),v,K;b.labelEdge.length=0;b.overlap=!1;d([n,y,h],function(a){q(a,function(a){a.isActive=!1})});if(b.hasData()||p)b.minorTickInterval&&!b.categories&&d(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),f.length&&(d(f,function(a,c){b.renderTick(a,
c)}),z&&(0===b.min||b.single)&&(n[-1]||(n[-1]=new E(b,-1,null,!0)),n[-1].render(-1))),l&&d(f,function(g,k){K=void 0!==f[k+1]?f[k+1]+z:b.max-z;0===k%2&&g<b.max&&K<=b.max+(c.polar?-z:z)&&(h[g]||(h[g]=new a.PlotLineOrBand(b)),v=g+z,h[g].options={from:e?t(v):v,to:e?t(K):K,color:l},h[g].render(),h[g].isActive=!0)}),b._addedPlotLB||(d((k.plotLines||[]).concat(k.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);d([n,y,h],function(a){var b,g=[],k=r.duration;q(a,function(a,b){a.isActive||
(a.render(b,!1,0),a.isActive=!1,g.push(b))});D(function(){for(b=g.length;b--;)a[g[b]]&&!a[g[b]].isActive&&(a[g[b]].destroy(),delete a[g[b]])},a!==h&&c.hasRendered&&k?k:0)});I&&(I[I.isPlaced?"animate":"attr"]({d:this.getLinePath(I.strokeWidth())}),I.isPlaced=!0,I[H?"show":"hide"](!0));w&&H&&(k=b.getTitlePosition(),C(k.y)?(w[w.isNew?"attr":"animate"](k),w.isNew=!1):(w.attr("y",-9999),w.isNew=!0));m&&m.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),d(this.plotLinesAndBands,
function(a){a.render()}));d(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,c=b.stacks,g=b.plotLinesAndBands,e;a||J(b);q(c,function(a,b){v(a);c[b]=null});d([b.ticks,b.minorTicks,b.alternateBands],function(a){v(a)});if(g)for(a=g.length;a--;)g[a].destroy();d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(e in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[e]=
b.plotLinesAndBandsGroups[e].destroy();q(b,function(a,c){-1===k(c,b.keepProps)&&delete b[c]})},drawCrosshair:function(a,b){var c,g=this.crosshair,k=z(g.snap,!0),d,e=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(m(b)||!k)?(k?m(b)&&(d=this.isXAxis?b.plotX:this.len-b.plotY):d=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),m(d)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:z(b.stackY,b.y)),null,null,null,d)||null),m(c)?(b=this.categories&&!this.isRadial,e||(this.cross=
e=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+g.className).attr({zIndex:z(g.zIndex,2)}).add(),e.attr({stroke:g.color||(b?l("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":z(g.width,1)}).css({"pointer-events":"none"}),g.dashStyle&&e.attr({dashstyle:g.dashStyle})),e.show().attr({d:c}),b&&!g.width&&e.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&
this.cross.hide()}});return a.Axis=H}(N);(function(a){var A=a.Axis,B=a.Date,G=a.dateFormat,F=a.defaultOptions,l=a.defined,f=a.each,h=a.extend,m=a.getMagnitude,r=a.getTZOffset,v=a.normalizeTickInterval,d=a.pick,e=a.timeUnits;A.prototype.getTimeTicks=function(a,b,c,w){var k=[],p={},n=F.global.useUTC,m,y=new B(b-Math.max(r(b),r(c))),v=B.hcMakeTime,q=a.unitRange,z=a.count,J,t;if(l(b)){y[B.hcSetMilliseconds](q>=e.second?0:z*Math.floor(y.getMilliseconds()/z));if(q>=e.second)y[B.hcSetSeconds](q>=e.minute?
0:z*Math.floor(y.getSeconds()/z));if(q>=e.minute)y[B.hcSetMinutes](q>=e.hour?0:z*Math.floor(y[B.hcGetMinutes]()/z));if(q>=e.hour)y[B.hcSetHours](q>=e.day?0:z*Math.floor(y[B.hcGetHours]()/z));if(q>=e.day)y[B.hcSetDate](q>=e.month?1:z*Math.floor(y[B.hcGetDate]()/z));q>=e.month&&(y[B.hcSetMonth](q>=e.year?0:z*Math.floor(y[B.hcGetMonth]()/z)),m=y[B.hcGetFullYear]());if(q>=e.year)y[B.hcSetFullYear](m-m%z);if(q===e.week)y[B.hcSetDate](y[B.hcGetDate]()-y[B.hcGetDay]()+d(w,1));m=y[B.hcGetFullYear]();w=y[B.hcGetMonth]();
var D=y[B.hcGetDate](),E=y[B.hcGetHours]();if(B.hcTimezoneOffset||B.hcGetTimezoneOffset)t=(!n||!!B.hcGetTimezoneOffset)&&(c-b>4*e.month||r(b)!==r(c)),y=y.getTime(),J=r(y),y=new B(y+J);n=y.getTime();for(b=1;n<c;)k.push(n),n=q===e.year?v(m+b*z,0):q===e.month?v(m,w+b*z):!t||q!==e.day&&q!==e.week?t&&q===e.hour?v(m,w,D,E+b*z,0,0,J)-J:n+q*z:v(m,w,D+b*z*(q===e.day?1:7)),b++;k.push(n);q<=e.hour&&1E4>k.length&&f(k,function(a){0===a%18E5&&"000000000"===G("%H%M%S%L",a)&&(p[a]="day")})}k.info=h(a,{higherRanks:p,
totalRange:q*z});return k};A.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];b=c[c.length-1];var d=e[b[0]],k=b[1],p;for(p=0;p<c.length&&!(b=c[p],d=e[b[0]],k=b[1],c[p+1]&&a<=(d*k[k.length-1]+e[c[p+1][0]])/2);p++);d===e.year&&a<5*d&&(k=[1,2,5]);a=v(a/d,k,"year"===b[0]?Math.max(m(a/d),1):1);return{unitRange:d,
count:a,unitName:b[0]}}})(N);(function(a){var A=a.Axis,B=a.getMagnitude,G=a.map,F=a.normalizeTickInterval,l=a.pick;A.prototype.getLogTickPositions=function(a,h,m,r){var f=this.options,d=this.len,e=this.lin2log,n=this.log2lin,b=[];r||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),b=this.getLinearTickPositions(a,h,m);else if(.08<=a)for(var d=Math.floor(h),c,w,k,p,C,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];d<m+1&&!C;d++)for(w=f.length,c=0;c<w&&!C;c++)k=n(e(d)*f[c]),k>h&&(!r||p<=
m)&&void 0!==p&&b.push(p),p>m&&(C=!0),p=k;else h=e(h),m=e(m),a=r?this.getMinorTickInterval():f.tickInterval,a=l("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(r?5:1)*(m-h)/((r?d/this.tickPositions.length:d)||1)),a=F(a,null,B(a)),b=G(this.getLinearTickPositions(a,h,m),n),r||(this._minorAutoInterval=a/5);r||(this.tickInterval=a);return b};A.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};A.prototype.lin2log=function(a){return Math.pow(10,a)}})(N);(function(a,A){var B=a.arrayMax,
G=a.arrayMin,F=a.defined,l=a.destroyObjectProperties,f=a.each,h=a.erase,m=a.merge,r=a.pick;a.PlotLineOrBand=function(a,d){this.axis=a;d&&(this.options=d,this.id=d.id)};a.PlotLineOrBand.prototype={render:function(){var f=this,d=f.axis,e=d.horiz,n=f.options,b=n.label,c=f.label,w=n.to,k=n.from,p=n.value,h=F(k)&&F(w),l=F(p),y=f.svgElem,K=!y,q=[],z=n.color,J=r(n.zIndex,0),t=n.events,q={"class":"highcharts-plot-"+(h?"band ":"line ")+(n.className||"")},D={},E=d.chart.renderer,H=h?"bands":"lines",g=d.log2lin;
d.isLog&&(k=g(k),w=g(w),p=g(p));l?(q={stroke:z,"stroke-width":n.width},n.dashStyle&&(q.dashstyle=n.dashStyle)):h&&(z&&(q.fill=z),n.borderWidth&&(q.stroke=n.borderColor,q["stroke-width"]=n.borderWidth));D.zIndex=J;H+="-"+J;(z=d.plotLinesAndBandsGroups[H])||(d.plotLinesAndBandsGroups[H]=z=E.g("plot-"+H).attr(D).add());K&&(f.svgElem=y=E.path().attr(q).add(z));if(l)q=d.getPlotLinePath(p,y.strokeWidth());else if(h)q=d.getPlotBandPath(k,w,n);else return;K&&q&&q.length?(y.attr({d:q}),t&&a.objectEach(t,function(a,
b){y.on(b,function(a){t[b].apply(f,[a])})})):y&&(q?(y.show(),y.animate({d:q})):(y.hide(),c&&(f.label=c=c.destroy())));b&&F(b.text)&&q&&q.length&&0<d.width&&0<d.height&&!q.flat?(b=m({align:e&&h&&"center",x:e?!h&&4:10,verticalAlign:!e&&h&&"middle",y:e?h?16:10:h?6:-4,rotation:e&&!h&&90},b),this.renderLabel(b,q,h,J)):c&&c.hide();return f},renderLabel:function(a,d,e,f){var b=this.label,c=this.axis.chart.renderer;b||(b={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(e?"band":
"line")+"-label "+(a.className||"")},b.zIndex=f,this.label=b=c.text(a.text,0,0,a.useHTML).attr(b).add(),b.css(a.style));f=d.xBounds||[d[1],d[4],e?d[6]:d[1]];d=d.yBounds||[d[2],d[5],e?d[7]:d[2]];e=G(f);c=G(d);b.align(a,!1,{x:e,y:c,width:B(f)-e,height:B(d)-c});b.show()},destroy:function(){h(this.axis.plotLinesAndBands,this);delete this.axis;l(this)}};a.extend(A.prototype,{getPlotBandPath:function(a,d){var e=this.getPlotLinePath(d,null,null,!0),f=this.getPlotLinePath(a,null,null,!0),b=this.horiz,c=1;
a=a<this.min&&d<this.min||a>this.max&&d>this.max;f&&e?(a&&(f.flat=f.toString()===e.toString(),c=0),f.push(b&&e[4]===f[4]?e[4]+c:e[4],b||e[5]!==f[5]?e[5]:e[5]+c,b&&e[1]===f[1]?e[1]+c:e[1],b||e[2]!==f[2]?e[2]:e[2]+c,"z")):f=null;return f},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,d){var e=(new a.PlotLineOrBand(this,f)).render(),n=this.userOptions;e&&(d&&(n[d]=n[d]||[],n[d].push(f)),
this.plotLinesAndBands.push(e));return e},removePlotBandOrLine:function(a){for(var d=this.plotLinesAndBands,e=this.options,n=this.userOptions,b=d.length;b--;)d[b].id===a&&d[b].destroy();f([e.plotLines||[],n.plotLines||[],e.plotBands||[],n.plotBands||[]],function(c){for(b=c.length;b--;)c[b].id===a&&h(c,c[b])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(N,W);(function(a){var A=a.dateFormat,B=a.each,G=a.extend,F=a.format,l=a.isNumber,
f=a.map,h=a.merge,m=a.pick,r=a.splat,v=a.syncTimeout,d=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){B(this.chart.series,function(d){var b=d&&d.tt;b&&(!b.isActive||a?d.tt=b.destroy():b.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||
(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();h(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,h(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());
this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,d,b,c){var e=this,k=e.now,p=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(a-k.x)||1<Math.abs(d-k.y)),f=e.followPointer||1<e.len;G(k,{x:p?(2*k.x+a)/3:a,y:p?(k.y+d)/2:d,anchorX:f?void 0:p?(2*k.anchorX+b)/3:b,anchorY:f?void 0:p?(k.anchorY+c)/2:c});e.getLabel().attr(k);p&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&
e.move(a,d,b,c)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);a=m(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=v(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,d){var b,c=this.chart,e=c.inverted,k=c.plotTop,p=c.plotLeft,n=0,h=0,y,m;a=r(a);b=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=c.pointer.normalize(d)),b=[d.chartX-c.plotLeft,d.chartY-k]);b||(B(a,function(a){y=a.series.yAxis;m=a.series.xAxis;n+=a.plotX+
(!e&&m?m.left-p:0);h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&y?y.top-k:0)}),n/=a.length,h/=a.length,b=[e?c.plotWidth-h:n,this.shared&&!e&&1<a.length&&d?d.chartY-k:e?c.plotHeight-n:h]);return f(b,Math.round)},getPosition:function(a,d,b){var c=this.chart,e=this.distance,k={},p=b.h||0,f,n=["y",c.chartHeight,d,b.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],y=["x",c.chartWidth,a,b.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],h=!this.followPointer&&m(b.ttBelow,!c.inverted===!!b.negative),
q=function(a,b,c,g,d,t){var f=c<g-e,u=g+e+c<b,w=g-e-c;g+=e;if(h&&u)k[a]=g;else if(!h&&f)k[a]=w;else if(f)k[a]=Math.min(t-c,0>w-p?w:w-p);else if(u)k[a]=Math.max(d,g+p+c>b?g:g+p);else return!1},l=function(a,b,c,g){var d;g<e||g>b-e?d=!1:k[a]=g<c/2?1:g>b-c/2?b-c-2:g-c/2;return d},r=function(a){var b=n;n=y;y=b;f=a},t=function(){!1!==q.apply(0,n)?!1!==l.apply(0,y)||f||(r(!0),t()):f?k.x=k.y=0:(r(!0),t())};(c.inverted||1<this.len)&&r();t();return k},defaultFormatter:function(a){var d=this.points||r(this),
b;b=[a.tooltipFooterHeaderFormatter(d[0])];b=b.concat(a.bodyFormatter(d));b.push(a.tooltipFooterHeaderFormatter(d[0],!0));return b},refresh:function(a,d){var b,c=this.options,e,k=a,p,f={},n=[];b=c.formatter||this.defaultFormatter;var f=this.shared,y;c.enabled&&(clearTimeout(this.hideTimer),this.followPointer=r(k)[0].series.tooltipOptions.followPointer,p=this.getAnchor(k,d),d=p[0],e=p[1],!f||k.series&&k.series.noSharedTooltip?f=k.getLabelConfig():(B(k,function(a){a.setState("hover");n.push(a.getLabelConfig())}),
f={x:k[0].category,y:k[0].y},f.points=n,k=k[0]),this.len=n.length,f=b.call(f,this),y=k.series,this.distance=m(y.tooltipOptions.distance,16),!1===f?this.hide():(b=this.getLabel(),this.isHidden&&b.attr({opacity:1}).show(),this.split?this.renderSplit(f,a):(c.style.width||b.css({width:this.chart.spacingBox.width}),b.attr({text:f&&f.join?f.join(""):f}),b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+m(k.colorIndex,y.colorIndex)),b.attr({stroke:c.borderColor||k.color||y.color||"#666666"}),
this.updatePosition({plotX:d,plotY:e,negative:k.negative,ttBelow:k.ttBelow,h:p[2]||0})),this.isHidden=!1))},renderSplit:function(d,f){var b=this,c=[],e=this.chart,k=e.renderer,p=!0,n=this.options,h=0,y=this.getLabel();a.isString(d)&&(d=[!1,d]);B(d.slice(0,f.length+1),function(a,d){if(!1!==a){d=f[d-1]||{isHeader:!0,plotX:f[0].plotX};var w=d.series||b,q=w.tt,t=d.series||{},D="highcharts-color-"+m(d.colorIndex,t.colorIndex,"none");q||(w.tt=q=k.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+
D).attr({padding:n.padding,r:n.borderRadius,fill:n.backgroundColor,stroke:n.borderColor||d.color||t.color||"#333333","stroke-width":n.borderWidth}).add(y));q.isActive=!0;q.attr({text:a});q.css(n.style).shadow(n.shadow);a=q.getBBox();t=a.width+q.strokeWidth();d.isHeader?(h=a.height,t=Math.max(0,Math.min(d.plotX+e.plotLeft-t/2,e.chartWidth-t))):t=d.plotX+e.plotLeft-m(n.distance,16)-t;0>t&&(p=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=e.plotTop;c.push({target:d.isHeader?e.plotHeight+
h:a,rank:d.isHeader?1:0,size:w.tt.getBBox().height+1,point:d,x:t,tt:q})}});this.cleanSplit();a.distribute(c,e.plotHeight+h);B(c,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:p||b.isHeader?a.x:b.plotX+e.plotLeft+m(n.distance,16),y:a.pos+e.plotTop,anchorX:b.isHeader?b.plotX+e.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+e.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var d=this.chart,b=this.getLabel(),b=(this.options.positioner||
this.getPosition).call(this,b.width,b.height,a);this.move(Math.round(b.x),Math.round(b.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getDateFormat:function(a,f,b,c){var e=A("%m-%d %H:%M:%S.%L",f),k,p,n={millisecond:15,second:12,minute:9,hour:6,day:3},h="millisecond";for(p in d){if(a===d.week&&+A("%w",f)===b&&"00:00:00.000"===e.substr(6)){p="week";break}if(d[p]>a){p=h;break}if(n[p]&&e.substr(n[p])!=="01-01 00:00:00.000".substr(n[p]))break;"week"!==p&&(h=p)}p&&(k=c[p]);return k},getXDateFormat:function(a,
d,b){d=d.dateTimeLabelFormats;var c=b&&b.closestPointRange;return(c?this.getDateFormat(c,a.x,b.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){d=d?"footer":"header";var b=a.series,c=b.tooltipOptions,e=c.xDateFormat,k=b.xAxis,f=k&&"datetime"===k.options.type&&l(a.key),n=c[d+"Format"];f&&!e&&(e=this.getXDateFormat(a,c,k));f&&e&&B(a.point&&a.point.tooltipDateKeys||["key"],function(a){n=n.replace("{point."+a+"}","{point."+a+":"+e+"}")});return F(n,{point:a,series:b})},
bodyFormatter:function(a){return f(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b[(a.point.formatPrefix||"point")+"Format"])})}}})(N);(function(a){var A=a.addEvent,B=a.attr,G=a.charts,F=a.color,l=a.css,f=a.defined,h=a.each,m=a.extend,r=a.find,v=a.fireEvent,d=a.isObject,e=a.offset,n=a.pick,b=a.removeEvent,c=a.splat,w=a.Tooltip;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=
b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};w&&(a.tooltip=new w(a,b.tooltip),this.followTouchMove=n(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,d=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(d=n(c.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!b||d&&b;this.zoomVert=d&&!b||a&&b;this.hasZoom=a||d},normalize:function(a,b){var c;c=a.touches?a.touches.length?a.touches.item(0):
a.changedTouches[0]:a;b||(this.chartPosition=b=e(this.chart.container));return m(a,{chartX:Math.round(c.pageX-b.left),chartY:Math.round(c.pageY-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};h(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,c){var k;h(a,function(a){var e=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(c,e);if((e=d(a,
!0))&&!(e=!d(k,!0)))var e=k.distX-a.distX,f=k.dist-a.dist,p=(a.series.group&&a.series.group.zIndex)-(k.series.group&&k.series.group.zIndex),e=0<(0!==e&&b?e:0!==f?f:0!==p?p:k.series.index>a.series.index?-1:1);e&&(k=a)});return k},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var c=a.series,d=c.xAxis,c=c.yAxis;if(d&&c)return b?{chartX:d.len+d.pos-a.clientX,chartY:c.len+c.pos-a.plotY}:{chartX:a.clientX+d.pos,chartY:a.plotY+
c.pos}},getHoverData:function(b,c,e,f,w,m,q){var k,p=[],t=q&&q.isBoosting;f=!(!f||!b);q=c&&!c.stickyTracking?[c]:a.grep(e,function(a){return a.visible&&!(!w&&a.directTouch)&&n(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(k=f?b:this.findNearestKDPoint(q,w,m))&&k.series;k&&(w&&!c.noSharedTooltip?(q=a.grep(e,function(a){return a.visible&&!(!w&&a.directTouch)&&n(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),h(q,function(a){var b=r(a.points,function(a){return a.x===k.x&&!a.isNull});
d(b)&&(t&&(b=a.getPoint(b)),p.push(b))})):p.push(k));return{hoverPoint:k,hoverSeries:c,hoverPoints:p}},runPointActions:function(b,c){var d=this.chart,k=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,e=k?k.shared:!1,f=c||d.hoverPoint,p=f&&f.series||d.hoverSeries,p=this.getHoverData(f,p,d.series,!!c||p&&p.directTouch&&this.isDirectTouch,e,b,{isBoosting:d.isBoosting}),w,f=p.hoverPoint;w=p.hoverPoints;c=(p=p.hoverSeries)&&p.tooltipOptions.followPointer;e=e&&p&&!p.noSharedTooltip;if(f&&(f!==d.hoverPoint||
k&&k.isHidden)){h(d.hoverPoints||[],function(b){-1===a.inArray(b,w)&&b.setState()});h(w||[],function(a){a.setState("hover")});if(d.hoverSeries!==p)p.onMouseOver();d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!f.series)return;f.firePointEvent("mouseOver");d.hoverPoints=w;d.hoverPoint=f;k&&k.refresh(e?w:f,b)}else c&&k&&!k.isHidden&&(f=k.getAnchor([{}],b),k.updatePosition({plotX:f[0],plotY:f[1]}));this.unDocMouseMove||(this.unDocMouseMove=A(d.container.ownerDocument,"mousemove",function(b){var c=
G[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));h(d.axes,function(c){var d=n(c.crosshair.snap,!0),k=d?a.find(w,function(a){return a.series[c.coll]===c}):void 0;k||!d?c.drawCrosshair(b,k):c.hideCrosshair()})},reset:function(a,b){var d=this.chart,k=d.hoverSeries,e=d.hoverPoint,f=d.hoverPoints,p=d.tooltip,w=p&&p.shared?f:e;a&&w&&h(c(w),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)p&&w&&(p.refresh(w),e&&(e.setState(e.state,!0),h(d.axes,function(a){a.crosshair&&a.drawCrosshair(null,
e)})));else{if(e)e.onMouseOut();f&&h(f,function(a){a.setState()});if(k)k.onMouseOut();p&&p.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());h(d.axes,function(a){a.hideCrosshair()});this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,d;h(c.series,function(k){d=a||k.getPlotBox();k.xAxis&&k.xAxis.zoomEnabled&&k.group&&(k.group.attr(d),k.markerGroup&&(k.markerGroup.attr(d),k.markerGroup.clip(b?c.clipRect:null)),k.dataLabelsGroup&&k.dataLabelsGroup.attr(d))});
c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,k=a.chartY,e=this.zoomHor,f=this.zoomVert,w=b.plotLeft,n=b.plotTop,t=b.plotWidth,h=b.plotHeight,E,m=this.selectionMarker,g=this.mouseDownX,u=this.mouseDownY,l=c.panKey&&a[c.panKey+"Key"];m&&m.touch||(d<w?d=w:d>w+t&&(d=w+t),k<n?k=n:k>n+h&&(k=n+h),this.hasDragged=
Math.sqrt(Math.pow(g-d,2)+Math.pow(u-k,2)),10<this.hasDragged&&(E=b.isInsidePlot(g-w,u-n),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&E&&!l&&!m&&(this.selectionMarker=m=b.renderer.rect(w,n,e?1:t,f?1:h,0).attr({fill:c.selectionMarkerFill||F("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),m&&e&&(d-=g,m.attr({width:Math.abs(d),x:(0<d?0:d)+g})),m&&f&&(d=k-u,m.attr({height:Math.abs(d),y:(0<d?0:d)+u})),E&&!m&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=
this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var k={originalEvent:a,xAxis:[],yAxis:[]},e=this.selectionMarker,w=e.attr?e.attr("x"):e.x,n=e.attr?e.attr("y"):e.y,r=e.attr?e.attr("width"):e.width,t=e.attr?e.attr("height"):e.height,D;if(this.hasDragged||d)h(c.axes,function(c){if(c.zoomEnabled&&f(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var e=c.horiz,g="touchend"===a.type?c.minPixelPadding:0,p=c.toValue((e?w:n)+g),e=c.toValue((e?w+r:n+t)-g);k[c.coll].push({axis:c,min:Math.min(p,
e),max:Math.max(p,e)});D=!0}}),D&&v(c,"selection",k,function(a){c.zoom(m(a,d?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups()}c&&(l(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},
onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;f(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=
c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var c;a;){if(c=B(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||
!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,k=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(v(c.series,"click",m(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(m(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-k)&&v(b,"click",a)))},setDOMEvents:function(){var b=
this,c=b.chart.container,d=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};A(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&A(d,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&A(d,"touchend",b.onDocumentTouchEnd))},destroy:function(){var c=this,d=this.chart.container.ownerDocument;
c.unDocMouseMove&&c.unDocMouseMove();b(c.chart.container,"mouseleave",c.onContainerMouseLeave);a.chartCount||(b(d,"mouseup",c.onDocumentMouseUp),a.hasTouch&&b(d,"touchend",c.onDocumentTouchEnd));clearInterval(c.tooltipTimeout);a.objectEach(c,function(a,b){c[b]=null})}}})(N);(function(a){var A=a.charts,B=a.each,G=a.extend,F=a.map,l=a.noop,f=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,f,l,v,d,e){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,l,v,d,e);this.zoomVert&&this.pinchTranslateDirection(!1,
a,f,l,v,d,e)},pinchTranslateDirection:function(a,f,l,v,d,e,n,b){var c=this.chart,w=a?"x":"y",k=a?"X":"Y",p="chart"+k,h=a?"width":"height",m=c["plot"+(a?"Left":"Top")],y,r,q=b||1,z=c.inverted,J=c.bounds[a?"h":"v"],t=1===f.length,D=f[0][p],E=l[0][p],H=!t&&f[1][p],g=!t&&l[1][p],u;l=function(){!t&&20<Math.abs(D-H)&&(q=b||Math.abs(E-g)/Math.abs(D-H));r=(m-E)/q+D;y=c["plot"+(a?"Width":"Height")]/q};l();f=r;f<J.min?(f=J.min,u=!0):f+y>J.max&&(f=J.max-y,u=!0);u?(E-=.8*(E-n[w][0]),t||(g-=.8*(g-n[w][1])),l()):
n[w]=[E,g];z||(e[w]=r-m,e[h]=y);e=z?1/q:q;d[h]=y;d[w]=f;v[z?a?"scaleY":"scaleX":"scale"+k]=q;v["translate"+k]=e*m+(E-e*D)},pinch:function(a){var h=this,r=h.chart,v=h.pinchDown,d=a.touches,e=d.length,n=h.lastValidTouch,b=h.hasZoom,c=h.selectionMarker,w={},k=1===e&&(h.inClass(a.target,"highcharts-tracker")&&r.runTrackerClick||h.runChartClick),p={};1<e&&(h.initiated=!0);b&&h.initiated&&!k&&a.preventDefault();F(d,function(a){return h.normalize(a)});"touchstart"===a.type?(B(d,function(a,b){v[b]={chartX:a.chartX,
chartY:a.chartY}}),n.x=[v[0].chartX,v[1]&&v[1].chartX],n.y=[v[0].chartY,v[1]&&v[1].chartY],B(r.axes,function(a){if(a.zoomEnabled){var b=r.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,d=a.toPixels(f(a.options.min,a.dataMin)),e=a.toPixels(f(a.options.max,a.dataMax)),k=Math.max(d,e);b.min=Math.min(a.pos,Math.min(d,e)-c);b.max=Math.max(a.pos+a.len,k+c)}}),h.res=!0):h.followTouchMove&&1===e?this.runPointActions(h.normalize(a)):v.length&&(c||(h.selectionMarker=c=G({destroy:l,touch:!0},r.plotBox)),h.pinchTranslate(v,
d,w,c,p,n),h.hasPinched=b,h.scaleGroups(w,p),h.res&&(h.res=!1,this.reset(!1,0)))},touch:function(h,m){var l=this.chart,v,d;if(l.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=l.index;1===h.touches.length?(h=this.normalize(h),(d=l.isInsidePlot(h.chartX-l.plotLeft,h.chartY-l.plotTop))&&!l.openMenu?(m&&this.runPointActions(h),"touchmove"===h.type&&(m=this.pinchDown,v=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-h.chartX,2)+Math.pow(m[0].chartY-h.chartY,2)):!1),f(v,
!0)&&this.pinch(h)):m&&this.reset()):2===h.touches.length&&this.pinch(h)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){A[a.hoverChartIndex]&&A[a.hoverChartIndex].pointer.drop(f)}})})(N);(function(a){var A=a.addEvent,B=a.charts,G=a.css,F=a.doc,l=a.extend,f=a.noop,h=a.Pointer,m=a.removeEvent,r=a.win,v=a.wrap;if(!a.hasTouch&&(r.PointerEvent||r.MSPointerEvent)){var d={},e=!!r.PointerEvent,n=function(){var b=
[];b.item=function(a){return this[a]};a.objectEach(d,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},b=function(b,d,e,p){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!B[a.hoverChartIndex]||(p(b),p=B[a.hoverChartIndex].pointer,p[d]({type:e,target:b.currentTarget,preventDefault:f,touches:n()}))};l(h.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},
onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY};d[a.pointerId].target||(d[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,"onDocumentTouchEnd","touchend",function(a){delete d[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,e?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,e?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(F,e?
"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});v(h.prototype,"init",function(a,b,d){a.call(this,b,d);this.hasZoom&&G(b.container,{"-ms-touch-action":"none","touch-action":"none"})});v(h.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(A)});v(h.prototype,"destroy",function(a){this.batchMSEvents(m);a.call(this)})}})(N);(function(a){var A=a.addEvent,B=a.css,G=a.discardElement,F=a.defined,l=a.each,f=a.isFirefox,h=a.marginNames,m=a.merge,
r=a.pick,v=a.setAnimation,d=a.stableSort,e=a.win,n=a.wrap;a.Legend=function(a,c){this.init(a,c)};a.Legend.prototype={init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),A(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=r(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=m(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=
this.maxItemWidth=0;this.symbolWidth=r(a.symbolWidth,16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(m(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;r(c,!0)&&b.redraw()},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var b=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,n=this.itemHiddenStyle.color,b=c?b.itemStyle.color:n,h=c?a.color||n:n,m=a.options&&a.options.marker,q={fill:h};d&&d.css({fill:b,
color:b});e&&e.attr({stroke:h});f&&(m&&f.isMarker&&(q=a.pointAttribs(),c||(q.stroke=q.fill=n)),f.attr(q))},positionItem:function(a){var b=this.options,d=b.symbolPadding,b=!b.rtl,e=a._legendItemPos,f=e[0],e=e[1],n=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?f:this.legendWidth-f-2*d-4,e);n&&(n.x=f,n.y=e)},destroyItem:function(a){var b=a.checkbox;l(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&G(a.checkbox)},destroy:function(){function a(a){this[a]&&
(this[a]=this[a].destroy())}l(this.getAllItems(),function(b){l(["legendItem","legendGroup"],a,b)});l("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,d,e=this.clipHeight||this.legendHeight,f=this.titleHeight;b&&(d=b.translateY,l(this.allItems,function(c){var k=c.checkbox,p;k&&(p=d+f+k.y+(a||0)+3,B(k,{left:b.translateX+c.checkboxOffset+k.x-20+"px",top:p+"px",display:p>d-6&&p<d+e-6?"":"none"}))}))},
renderTitle:function(){var a=this.options,c=this.padding,d=a.title,e=0;d.text&&(this.title||(this.title=this.chart.renderer.label(d.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(d.style).add(this.group)),a=this.title.getBBox(),e=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(b){var c=this.options;b.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,b):c.labelFormatter.call(b)})},renderItem:function(a){var b=
this.chart,d=b.renderer,e=this.options,f="horizontal"===e.layout,n=this.symbolWidth,h=e.symbolPadding,l=this.itemStyle,v=this.itemHiddenStyle,q=this.padding,z=f?r(e.itemDistance,20):0,J=!e.rtl,t=e.width,D=e.itemMarginBottom||0,E=this.itemMarginTop,H=a.legendItem,g=!a.series,u=!g&&a.series.drawLegendSymbol?a.series:a,P=u.options,M=this.createCheckboxForItem&&P&&P.showCheckbox,P=n+h+z+(M?20:0),O=e.useHTML,L=a.options.className;H||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+u.type+"-series highcharts-color-"+
a.colorIndex+(L?" "+L:"")+(g?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=H=d.text("",J?n+h:-h,this.baseline||0,O).css(m(a.visible?l:v)).attr({align:J?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(n=l.fontSize,this.fontMetrics=d.fontMetrics(n,H),this.baseline=this.fontMetrics.f+3+E,H.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,u.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,H,O),M&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);l.width||H.css({width:(e.itemWidth||e.width||b.spacingBox.width)-P});this.setText(a);d=H.getBBox();l=a.checkboxOffset=e.itemWidth||a.legendItemWidth||d.width+P;this.itemHeight=d=Math.round(a.legendItemHeight||d.height||this.symbolHeight);f&&this.itemX-q+l>(t||b.spacingBox.width-2*q-e.x)&&(this.itemX=q,this.itemY+=E+this.lastLineHeight+D,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,l);this.lastItemY=E+this.itemY+D;this.lastLineHeight=Math.max(d,
this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=l:(this.itemY+=E+d+D,this.lastLineHeight=d);this.offsetWidth=t||Math.max((f?this.itemX-q-(a.checkbox?0:z):l)+q,this.offsetWidth)},getAllItems:function(){var a=[];l(this.chart.series,function(b){var c=b&&b.options;b&&r(c.showInLegend,F(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});return a},adjustMargins:function(a,c){var b=this.chart,d=this.options,e=d.align.charAt(0)+d.verticalAlign.charAt(0)+
d.layout.charAt(0);d.floating||l([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(k,f){k.test(e)&&!F(a[f])&&(b[h[f]]=Math.max(b[h[f]],b.legend[(f+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][f]*d[f%2?"x":"y"]+r(d.margin,12)+c[f]))})},render:function(){var a=this,c=a.chart,e=c.renderer,k=a.group,f,n,h,y,r=a.box,q=a.options,z=a.padding;a.itemX=z;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;k||(a.group=k=e.g("legend").attr({zIndex:7}).add(),a.contentGroup=e.g().attr({zIndex:1}).add(k),
a.scrollGroup=e.g().add(a.contentGroup));a.renderTitle();f=a.getAllItems();d(f,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});q.reversed&&f.reverse();a.allItems=f;a.display=n=!!f.length;a.lastLineHeight=0;l(f,function(b){a.renderItem(b)});h=(q.width||a.offsetWidth)+z;y=a.lastItemY+a.lastLineHeight+a.titleHeight;y=a.handleOverflow(y);y+=z;r||(a.box=r=e.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(k),r.isNew=!0);r.attr({stroke:q.borderColor,
"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<h&&0<y&&(r[r.isNew?"attr":"animate"](r.crisp({x:0,y:0,width:h,height:y},r.strokeWidth())),r.isNew=!1);r[n?"show":"hide"]();a.legendWidth=h;a.legendHeight=y;l(f,function(b){a.positionItem(b)});n&&k.align(m(q,{width:h,height:y}),!0,"spacingBox");c.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,d=this.chart,e=d.renderer,f=this.options,n=f.y,h=this.padding,d=d.spacingBox.height+("top"===f.verticalAlign?
-n:n)-h,n=f.maxHeight,m,v=this.clipRect,q=f.navigation,z=r(q.animation,!0),J=q.arrowSize||12,t=this.nav,D=this.pages,E,H=this.allItems,g=function(a){"number"===typeof a?v.attr({height:a}):v&&(b.clipRect=v.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+h+"px,9999px,"+(h+a)+"px,0)":"auto")};"horizontal"!==f.layout||"middle"===f.verticalAlign||f.floating||(d/=2);n&&(d=Math.min(d,n));D.length=0;a>d&&!1!==q.enabled?(this.clipHeight=m=Math.max(d-20-this.titleHeight-
h,0),this.currentPage=r(this.currentPage,1),this.fullHeight=a,l(H,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=D.length;if(!d||c-D[d-1]>m&&(E||c)!==D[d-1])D.push(E||c),d++;b===H.length-1&&c+a-D[d-1]>m&&D.push(c);c!==E&&(E=c)}),v||(v=b.clipRect=e.clipRect(0,h,9999,0),b.contentGroup.clip(v)),g(m),t||(this.nav=t=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,J,J).on("click",function(){b.scroll(-1,z)}).add(t),this.pager=e.text("",15,
10).addClass("highcharts-legend-navigation").css(q.style).add(t),this.down=e.symbol("triangle-down",0,0,J,J).on("click",function(){b.scroll(1,z)}).add(t)),b.scroll(0),a=d):t&&(g(),this.nav=t.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var b=this.pages,d=b.length;a=this.currentPage+a;var e=this.clipHeight,f=this.options.navigation,n=this.pager,h=this.padding;a>d&&(a=d);0<a&&(void 0!==c&&v(c,this.chart),this.nav.attr({translateX:h,translateY:e+this.padding+
7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),n.attr({text:a+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===d?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?f.inactiveColor:f.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===d?f.inactiveColor:f.activeColor}).css({cursor:a===d?"default":"pointer"}),c=-b[a-1]+this.initialItemY,
this.scrollGroup.animate({translateY:c}),this.currentPage=a,this.positionCheckboxes(c))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,d=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(d?(a.symbolWidth-b)/2:0,a.baseline-b+1,d?b:a.symbolWidth,b,r(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var b=this.options,d=b.marker,e=a.symbolWidth,f=a.symbolHeight,n=f/2,h=this.chart.renderer,l=
this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var v;v={"stroke-width":b.lineWidth||0};b.dashStyle&&(v.dashstyle=b.dashStyle);this.legendLine=h.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(v).add(l);d&&!1!==d.enabled&&(b=Math.min(r(d.radius,n),n),0===this.symbol.indexOf("url")&&(d=m(d,{width:f,height:f}),b=0),this.legendSymbol=d=h.symbol(this.symbol,e/2-b,a-b,2*b,2*b,d).addClass("highcharts-point").add(l),d.isMarker=!0)}};(/Trident\/7\.0/.test(e.navigator.userAgent)||f)&&
n(a.Legend.prototype,"positionItem",function(a,c){var b=this,d=function(){c._legendItemPos&&a.call(b,c)};d();setTimeout(d)})})(N);(function(a){var A=a.addEvent,B=a.animate,G=a.animObject,F=a.attr,l=a.doc,f=a.Axis,h=a.createElement,m=a.defaultOptions,r=a.discardElement,v=a.charts,d=a.css,e=a.defined,n=a.each,b=a.extend,c=a.find,w=a.fireEvent,k=a.grep,p=a.isNumber,C=a.isObject,I=a.isString,y=a.Legend,K=a.marginNames,q=a.merge,z=a.objectEach,J=a.Pointer,t=a.pick,D=a.pInt,E=a.removeEvent,H=a.seriesTypes,
g=a.splat,u=a.svg,P=a.syncTimeout,M=a.win,O=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new O(a,b,c)};b(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(I(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,g,e=b.series,f=b.plotOptions||{};b.series=null;d=q(m,b);for(g in d.plotOptions)d.plotOptions[g].tooltip=f[g]&&q(f[g].tooltip)||void 0;d.tooltip.userOptions=b.chart&&b.chart.forExport&&
b.tooltip.userOptions||b.tooltip;d.series=b.series=e;this.userOptions=b;b=d.chart;g=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var k=this;k.index=v.length;v.push(k);a.chartCount++;g&&z(g,function(a,b){A(k,b,a)});k.xAxis=[];k.yAxis=[];k.pointCount=k.colorCounter=k.symbolCounter=0;k.firstRender()},initSeries:function(b){var c=this.options.chart;
(c=H[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(c){var d=this.axes,g=this.series,e=this.pointer,f=this.legend,k=this.isDirtyLegend,t,u,h=this.hasCartesianSeries,p=this.isDirtyBox,q,E=this.renderer,m=
E.isHidden(),l=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(c,this);m&&this.temporaryDisplay();this.layOutTitles();for(c=g.length;c--;)if(q=g[c],q.options.stacking&&(t=!0,q.isDirty)){u=!0;break}if(u)for(c=g.length;c--;)q=g[c],q.options.stacking&&(q.isDirty=!0);n(g,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),k=!0);a.isDirtyData&&w(a,"updatedData")});k&&f.options.enabled&&(f.render(),this.isDirtyLegend=!1);t&&this.getStacks();h&&n(d,function(a){a.updateNames();
a.setScale()});this.getMargins();h&&(n(d,function(a){a.isDirty&&(p=!0)}),n(d,function(a){var c=a.min+","+a.max;a.extKey!==c&&(a.extKey=c,l.push(function(){w(a,"afterSetExtremes",b(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(p||t)&&a.redraw()}));p&&this.drawChartBox();w(this,"predraw");n(g,function(a){(p||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});e&&e.reset(!0);E.draw();w(this,"redraw");w(this,"render");m&&this.temporaryDisplay(!0);n(l,function(a){a.call()})},get:function(a){function b(b){return b.id===
a||b.options&&b.options.id===a}var d,g=this.series,e;d=c(this.axes,b)||c(this.series,b);for(e=0;!d&&e<g.length;e++)d=c(g[e].points||[],b);return d},getAxes:function(){var a=this,b=this.options,c=b.xAxis=g(b.xAxis||{}),b=b.yAxis=g(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new f(a,b)})},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(k(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return k(this.series,
function(a){return a.selected})},setTitle:function(a,b,c){var d=this,g=d.options,e;e=g.title=q({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=q({style:{color:"#666666"}},g.subtitle,b);n([["title",a,e],["subtitle",b,g]],function(a,b){var c=a[0],g=d[c],e=a[1];a=a[2];g&&e&&(d[c]=g=g.destroy());a&&a.text&&!g&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&
a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var c=0,d,g=this.renderer,e=this.spacingBox;n(["title","subtitle"],function(a){var d=this[a],f=this.options[a];a="title"===a?-3:f.verticalAlign?0:c+2;var k;d&&(k=f.style.fontSize,k=g.fontMetrics(k,d).b,d.css({width:(f.width||e.width+f.widthAdjust)+"px"}).align(b({y:a+k},f),!1,"spacingBox"),f.floating||f.verticalAlign||(c=Math.ceil(c+d.getBBox(f.useHTML).height)))},this);d=this.titleOffset!==c;this.titleOffset=c;!this.isDirtyBox&&
d&&(this.isDirtyBox=d,this.hasRendered&&t(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,d=this.renderTo;e(c)||(this.containerWidth=a.getStyle(d,"width"));e(b)||(this.containerHeight=a.getStyle(d,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&
c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(l.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){l.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,l.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display",
"block","important");c=c.parentNode;if(c===l.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var c,d=this.options,g=d.chart,e,f;c=this.renderTo;var k=a.uniqueKey(),t;c||(this.renderTo=c=g.renderTo);I(c)&&(this.renderTo=c=l.getElementById(c));c||a.error(13,!0);e=D(F(c,"data-highcharts-chart"));p(e)&&v[e]&&v[e].hasRendered&&v[e].destroy();F(c,"data-highcharts-chart",this.index);c.innerHTML="";g.skipClone||c.offsetWidth||this.temporaryDisplay();
this.getChartSize();e=this.chartWidth;f=this.chartHeight;t=b({position:"relative",overflow:"hidden",width:e+"px",height:f+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},g.style);this.container=c=h("div",{id:k},t,c);this._cursor=c.style.cursor;this.renderer=new (a[g.renderer]||a.Renderer)(c,e,f,null,g.forExport,d.exporting&&d.exporting.allowHTML);this.setClassName(g.className);this.renderer.setStyle(g.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=
this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();d&&!e(c[0])&&(this.plotTop=Math.max(this.plotTop,d+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&n(a.axes,function(a){a.visible&&
a.getOffset()});n(K,function(d,g){e(c[g])||(a[d]+=b[g])});a.setChartSize()},reflow:function(b){var c=this,d=c.options.chart,g=c.renderTo,f=e(d.width)&&e(d.height),k=d.width||a.getStyle(g,"width"),d=d.height||a.getStyle(g,"height"),g=b?b.target:M;if(!f&&!c.isPrinting&&k&&d&&(g===M||g===l)){if(k!==c.containerWidth||d!==c.containerHeight)clearTimeout(c.reflowTimeout),c.reflowTimeout=P(function(){c.container&&c.setSize(void 0,void 0,!1)},b?100:0);c.containerWidth=k;c.containerHeight=d}},initReflow:function(){var a=
this,b;b=A(M,"resize",function(b){a.reflow(b)});A(a,"destroy",b)},setSize:function(b,c,g){var e=this,f=e.renderer;e.isResizing+=1;a.setAnimation(g,e);e.oldChartHeight=e.chartHeight;e.oldChartWidth=e.chartWidth;void 0!==b&&(e.options.chart.width=b);void 0!==c&&(e.options.chart.height=c);e.getChartSize();b=f.globalAnimation;(b?B:d)(e.container,{width:e.chartWidth+"px",height:e.chartHeight+"px"},b);e.setChartSize(!0);f.setSize(e.chartWidth,e.chartHeight,g);n(e.axes,function(a){a.isDirty=!0;a.setScale()});
e.isDirtyLegend=!0;e.isDirtyBox=!0;e.layOutTitles();e.getMargins();e.redraw(g);e.oldChartHeight=null;w(e,"resize");P(function(){e&&w(e,"endResize",null,function(){--e.isResizing})},G(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,g=this.chartHeight,e=this.options.chart,f=this.spacing,k=this.clipOffset,t,u,h,p;this.plotLeft=t=Math.round(this.plotLeft);this.plotTop=u=Math.round(this.plotTop);this.plotWidth=h=Math.max(0,Math.round(d-t-this.marginRight));
this.plotHeight=p=Math.max(0,Math.round(g-u-this.marginBottom));this.plotSizeX=b?p:h;this.plotSizeY=b?h:p;this.plotBorderWidth=e.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:f[3],y:f[0],width:d-f[3]-f[1],height:g-f[0]-f[2]};this.plotBox=c.plotBox={x:t,y:u,width:h,height:p};d=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(d,k[3])/2);c=Math.ceil(Math.max(d,k[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,k[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-
Math.max(d,k[2])/2-c))};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;n(["margin","spacing"],function(c){var d=b[c],g=C(d)?d:[d,d,d,d];n(["Top","Right","Bottom","Left"],function(d,e){a[c][e]=t(b[c+d],g[e])})});n(K,function(b,c){a[b]=t(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,g=this.chartBackground,
e=this.plotBackground,f=this.plotBorder,k,t=this.plotBGImage,n=a.backgroundColor,u=a.plotBackgroundColor,h=a.plotBackgroundImage,p,q=this.plotLeft,E=this.plotTop,m=this.plotWidth,l=this.plotHeight,w=this.plotBox,D=this.clipRect,y=this.clipBox,z="animate";g||(this.chartBackground=g=b.rect().addClass("highcharts-background").add(),z="attr");k=a.borderWidth||0;p=k+(a.shadow?8:0);n={fill:n||"none"};if(k||g["stroke-width"])n.stroke=a.borderColor,n["stroke-width"]=k;g.attr(n).shadow(a.shadow);g[z]({x:p/
2,y:p/2,width:c-p-k%2,height:d-p-k%2,r:a.borderRadius});z="animate";e||(z="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[z](w);e.attr({fill:u||"none"}).shadow(a.plotShadow);h&&(t?t.animate(w):this.plotBGImage=b.image(h,q,E,m,l).add());D?D.animate({width:y.width,height:y.height}):this.clipRect=b.clipRect(y);z="animate";f||(z="attr",this.plotBorder=f=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());f.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||
0,fill:"none"});f[z](f.crisp({x:q,y:E,width:m,height:l},-f.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,g,e;n(["inverted","angular","polar"],function(f){c=H[b.type||b.defaultSeriesType];e=b[f]||c&&c.prototype[f];for(g=d&&d.length;!e&&g--;)(c=H[d[g].type])&&c.prototype[f]&&(e=!0);a[f]=e})},linkSeries:function(){var a=this,b=a.series;n(b,function(a){a.linkedSeries.length=0});n(b,function(b){var c=b.options.linkedTo;I(c)&&(c=":previous"===
c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=t(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){n(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,c=a.options.labels;c.items&&n(c.items,function(d){var g=b(c.style,d.style),e=D(g.left)+a.plotLeft,f=D(g.top)+a.plotTop+12;delete g.left;delete g.top;a.renderer.text(d.html,e,f).attr({zIndex:2}).css(g).add()})},render:function(){var a=
this.axes,b=this.renderer,c=this.options,d,g,e;this.setTitle();this.legend=new y(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight-=21;n(a,function(a){a.setScale()});this.getAxisMargins();g=1.1<c/this.plotWidth;e=1.05<d/this.plotHeight;if(g||e)n(a,function(a){(a.horiz&&g||!a.horiz&&e)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&n(a,function(a){a.visible&&a.render()});this.seriesGroup||
(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=q(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(M.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),
this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,d=b.series,g=b.container,e,f=g&&g.parentNode;w(b,"destroy");b.renderer.forExport?a.erase(v,b):v[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");E(b);for(e=c.length;e--;)c[e]=c[e].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(e=d.length;e--;)d[e]=d[e].destroy();n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});g&&(g.innerHTML="",E(g),f&&r(g));z(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return u||M!=M.top||"complete"===l.readyState?!0:(l.attachEvent("onreadystatechange",function(){l.detachEvent("onreadystatechange",a.firstRender);"complete"===l.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();w(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();n(b.series||[],function(b){a.initSeries(b)});a.linkSeries();w(a,"beforeRender");J&&(a.pointer=new J(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){n([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);w(this,"load");w(this,"render");e(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(N);(function(a){var A,B=a.each,G=a.extend,F=a.erase,l=a.fireEvent,
f=a.format,h=a.isArray,m=a.isNumber,r=a.pick,v=a.removeEvent;a.Point=A=function(){};a.Point.prototype={init:function(a,e,f){this.series=a;this.color=a.color;this.applyOptions(e,f);a.options.colorByPoint?(e=a.options.colors||a.chart.options.colors,this.color=this.color||e[a.colorCounter],e=e.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=r(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,e){var d=this.series,
b=d.options.pointValKey||d.pointValKey;a=A.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;b&&(this.y=this[b]);this.isNull=r(this.isValid&&!this.isValid(),null===this.x||!m(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===e&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===e?d.autoIncrement(this):e);return this},optionsToObject:function(a){var d={},f=this.series,
b=f.options.keys,c=b||f.pointArrayMap||["y"],l=c.length,k=0,p=0;if(m(a)||null===a)d[c[0]]=a;else if(h(a))for(!b&&a.length>l&&(f=typeof a[0],"string"===f?d.name=a[0]:"number"===f&&(d.x=a[0]),k++);p<l;)b&&void 0===a[k]||(d[c[p]]=a[k]),k++,p++;else"object"===typeof a&&(d=a,a.dataLabels&&(f._hasPointLabels=!0),a.marker&&(f._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?
" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||"y",f=0,b;for(b=e[f];this[a]>=b.value;)b=e[++f];b&&b.color&&!this.options.color&&(this.color=b.color);return b},destroy:function(){var a=this.series.chart,e=a.hoverPoints,f;a.pointCount--;e&&(this.setState(),
F(e,this),e.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)v(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],e,f=6;f--;)e=a[f],this[e]&&(this[e]=this[e].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,
series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,h=d.tooltipOptions,b=r(h.valueDecimals,""),c=h.valuePrefix||"",l=h.valueSuffix||"";B(d.pointArrayMap||["y"],function(d){d="{point."+d;if(c||l)a=a.replace(d+"}",c+d+"}"+l);a=a.replace(d+"}",d+":,."+b+"f}")});return f(a,{point:this,series:this.series})},firePointEvent:function(a,e,f){var b=this,c=this.series.options;(c.point.events[a]||b.options&&b.options.events&&
b.options.events[a])&&this.importEvents();"click"===a&&c.allowPointSelect&&(f=function(a){b.select&&b.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});l(this,a,e,f)},visible:!0}})(N);(function(a){var A=a.addEvent,B=a.animObject,G=a.arrayMax,F=a.arrayMin,l=a.correctFloat,f=a.Date,h=a.defaultOptions,m=a.defaultPlotOptions,r=a.defined,v=a.each,d=a.erase,e=a.extend,n=a.fireEvent,b=a.grep,c=a.isArray,w=a.isNumber,k=a.isString,p=a.merge,C=a.objectEach,I=a.pick,y=a.removeEvent,K=a.splat,q=a.SVGElement,z=
a.syncTimeout,J=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",
textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,d,g=a.series,f;c.chart=
a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();e(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});d=b.events;C(d,function(a,b){A(c,b,a)});if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();v(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(f=g[g.length-1]);c._i=I(f&&f._i,-1)+1;a.orderSeries(this.insert(g))},insert:function(a){var b=
this.options.index,c;if(w(b)){for(c=a.length;c--;)if(b>=I(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return I(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;v(b.axisTypes||[],function(g){v(d[g],function(a){e=a.options;if(c[g]===e.index||void 0!==c[g]&&c[g]===e.id||void 0===c[g]&&0===e.index)b.insert(a.series),b[g]=a,a.isDirty=!0});b[g]||b.optionalAxis===g||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=
a.series,d=arguments,g=w(b)?function(d){var g="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=g}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};v(c.parallelArrays,g)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=I(b,a.pointStart,0);this.pointInterval=c=I(this.pointInterval,a.pointInterval,1);d&&(a=new f(b),"day"===d?a=+a[f.hcSetDate](a[f.hcGetDate]()+c):"month"===d?a=+a[f.hcSetMonth](a[f.hcGetMonth]()+c):"year"===d&&
(a=+a[f.hcSetFullYear](a[f.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,d=c.plotOptions,g=(b.userOptions||{}).plotOptions||{},e=d[this.type];this.userOptions=a;b=p(e,d.series,a);this.tooltipOptions=p(h.tooltip,h.plotOptions.series&&h.plotOptions.series.tooltip,h.plotOptions[this.type].tooltip,c.tooltip.userOptions,d.series&&d.series.tooltip,d[this.type].tooltip,a.tooltip);this.stickyTracking=I(a.stickyTracking,g[this.type]&&g[this.type].stickyTracking,
g.series&&g.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===e.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&r(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,
b,c){var d,g=this.chart,e=this.userOptions,f=a+"Index",k=a+"Counter",t=c?c.length:I(g.options.chart[a+"Count"],g[a+"Count"]);b||(d=I(e[f],e["_"+f]),r(d)||(g.series.length||(g[k]=0),e["_"+f]=d=g[k]%t,g[k]+=1),c&&(b=c[d]));void 0!==d&&(this[f]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||m[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},
drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,d,e,f){var g=this,t=g.points,h=t&&t.length||0,p,n=g.options,q=g.chart,l=null,m=g.xAxis,y=n.turboThreshold,D=this.xData,E=this.yData,z=(p=g.pointArrayMap)&&p.length;b=b||[];p=b.length;d=I(d,!0);if(!1!==f&&p&&h===p&&!g.cropped&&!g.hasGroupedData&&g.visible)v(b,function(a,b){t[b].update&&a!==n.data[b]&&t[b].update(a,!1,null,!1)});else{g.xIncrement=null;g.colorCounter=0;v(this.parallelArrays,function(a){g[a+"Data"].length=0});if(y&&
p>y){for(e=0;null===l&&e<p;)l=b[e],e++;if(w(l))for(e=0;e<p;e++)D[e]=this.autoIncrement(),E[e]=b[e];else if(c(l))if(z)for(e=0;e<p;e++)l=b[e],D[e]=l[0],E[e]=l.slice(1,z+1);else for(e=0;e<p;e++)l=b[e],D[e]=l[0],E[e]=l[1];else a.error(12)}else for(e=0;e<p;e++)void 0!==b[e]&&(l={series:g},g.pointClass.prototype.applyOptions.apply(l,[b[e]]),g.updateParallelArrays(l,e));E&&k(E[0])&&a.error(14,!0);g.data=[];g.options.data=g.userOptions.data=b;for(e=h;e--;)t[e]&&t[e].destroy&&t[e].destroy();m&&(m.minRange=
m.userMinRange);g.isDirty=q.isDirtyBox=!0;g.isDirtyData=!!t;e=!1}"point"===n.legendType&&(this.processData(),this.generatePoints());d&&q.redraw(e)},processData:function(b){var c=this.xData,d=this.yData,e=c.length,g;g=0;var f,k,t=this.xAxis,h,p=this.options;h=p.cropThreshold;var n=this.getExtremesFromAll||p.getExtremesFromAll,q=this.isCartesian,p=t&&t.val2lin,l=t&&t.isLog,m,w;if(q&&!this.isDirty&&!t.isDirty&&!this.yAxis.isDirty&&!b)return!1;t&&(b=t.getExtremes(),m=b.min,w=b.max);if(q&&this.sorted&&
!n&&(!h||e>h||this.forceCrop))if(c[e-1]<m||c[0]>w)c=[],d=[];else if(c[0]<m||c[e-1]>w)g=this.cropData(this.xData,this.yData,m,w),c=g.xData,d=g.yData,g=g.start,f=!0;for(h=c.length||1;--h;)e=l?p(c[h])-p(c[h-1]):c[h]-c[h-1],0<e&&(void 0===k||e<k)?k=e:0>e&&this.requireSorting&&a.error(15);this.cropped=f;this.cropStart=g;this.processedXData=c;this.processedYData=d;this.closestPointRange=k},cropData:function(a,b,c,d){var e=a.length,f=0,k=e,t=I(this.cropShoulder,1),h;for(h=0;h<e;h++)if(a[h]>=c){f=Math.max(0,
h-t);break}for(c=h;c<e;c++)if(a[c]>d){k=c+t;break}return{xData:a.slice(f,k),yData:b.slice(f,k),start:f,end:k}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,d,e=this.processedXData,f=this.processedYData,k=this.pointClass,h=e.length,p=this.cropStart||0,n,q=this.hasGroupedData,a=a.keys,l,m=[],w;c||q||(c=[],c.length=b.length,c=this.data=c);a&&q&&(this.options.keys=!1);for(w=0;w<h;w++)n=p+w,q?(l=(new k).init(this,[e[w]].concat(K(f[w]))),l.dataGroup=this.groupMap[w]):(l=c[n])||void 0===
b[n]||(c[n]=l=(new k).init(this,b[n],e[w])),l&&(l.index=n,m[w]=l);this.options.keys=a;if(c&&(h!==(d=c.length)||q))for(w=0;w<d;w++)w!==p||q||(w+=h),c[w]&&(c[w].destroyElements(),c[w].plotX=void 0);this.data=c;this.points=m},getExtremes:function(a){var b=this.yAxis,d=this.processedXData,e,g=[],f=0;e=this.xAxis.getExtremes();var k=e.min,t=e.max,h,p,n,q;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(q=0;q<e;q++)if(p=d[q],n=a[q],h=(w(n,!0)||c(n))&&(!b.positiveValuesOnly||n.length||0<n),
p=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[q+1]||p)>=k&&(d[q-1]||p)<=t,h&&p)if(h=n.length)for(;h--;)null!==n[h]&&(g[f++]=n[h]);else g[f++]=n;this.dataMin=F(g);this.dataMax=G(g)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,k=f.length,h=!!this.modifyValue,p=a.pointPlacement,n="between"===p||w(p),q=a.threshold,m=a.startFromThreshold?q:0,y,z,v,
K,J=Number.MAX_VALUE;"between"===p&&(p=.5);w(p)&&(p*=I(a.pointRange||c.pointRange));for(a=0;a<k;a++){var C=f[a],A=C.x,B=C.y;z=C.low;var F=b&&e.stacks[(this.negStacks&&B<(m?0:q)?"-":"")+this.stackKey],G;e.positiveValuesOnly&&null!==B&&0>=B&&(C.isNull=!0);C.plotX=y=l(Math.min(Math.max(-1E5,c.translate(A,0,0,0,1,p,"flags"===this.type)),1E5));b&&this.visible&&!C.isNull&&F&&F[A]&&(K=this.getStackIndicator(K,A,this.index),G=F[A],B=G.points[K.key],z=B[0],B=B[1],z===m&&K.key===F[A].base&&(z=I(q,e.min)),e.positiveValuesOnly&&
0>=z&&(z=null),C.total=C.stackTotal=G.total,C.percentage=G.total&&C.y/G.total*100,C.stackY=B,G.setOffset(this.pointXOffset||0,this.barW||0));C.yBottom=r(z)?e.translate(z,0,1,0,1):null;h&&(B=this.modifyValue(B,C));C.plotY=z="number"===typeof B&&Infinity!==B?Math.min(Math.max(-1E5,e.translate(B,0,1,0,1)),1E5):void 0;C.isInside=void 0!==z&&0<=z&&z<=e.len&&0<=y&&y<=c.len;C.clientX=n?l(c.translate(A,0,0,0,1,p)):y;C.negative=C.y<(q||0);C.category=d&&void 0!==d[C.x]?d[C.x]:C.x;C.isNull||(void 0!==v&&(J=
Math.min(J,Math.abs(y-v))),v=y);C.zone=this.zones.length&&C.getZone()}this.closestPointRangePx=J},getValidPoints:function(a,c){var d=this.chart;return b(a||this.points||[],function(a){return c&&!d.isInsidePlot(a.plotX,a.plotY,d.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,k=f||b.clipBox,t=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,k.height,c.xAxis,c.yAxis].join(),h=b[t],p=b[t+"m"];h||(a&&(k.width=0,e&&(k.x=
b.plotSizeX),b[t+"m"]=p=d.clipRect(e?b.plotSizeX+99:-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[t]=h=d.clipRect(k),h.count={length:0});a&&!h.count[this.index]&&(h.count[this.index]=!0,h.count.length+=1);!1!==c.clip&&(this.group.clip(a||f?h:b.clipRect),this.markerGroup.clip(p),this.sharedClipKey=t);a||(h.count[this.index]&&(delete h.count[this.index],--h.count.length),0===h.count.length&&t&&b[t]&&(f||(b[t]=b[t].destroy()),b[t+"m"]&&(b[t+"m"]=b[t+"m"].destroy())))},animate:function(a){var b=
this.chart,c=B(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX,x:0},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99,x:0},c),this.animate=null)},afterAnimate:function(){this.setClip();n(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,d,e,f,k=this.options.marker,h,p,n,q,l=this[this.specialGroup]||this.markerGroup,m=I(k.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*k.radius);
if(!1!==k.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)e=a[d],c=e.plotY,f=e.graphic,h=e.marker||{},p=!!e.marker,n=m&&void 0===h.enabled||h.enabled,q=e.isInside,n&&w(c)&&null!==e.y?(c=I(h.symbol,this.symbol),e.hasImage=0===c.indexOf("url"),n=this.markerAttribs(e,e.selected&&"select"),f?f[q?"show":"hide"](!0).animate(n):q&&(0<n.width||e.hasImage)&&(e.graphic=f=b.renderer.symbol(c,n.x,n.y,n.width,n.height,p?h:k).add(l)),f&&f.attr(this.pointAttribs(e,e.selected&&"select")),f&&f.addClass(e.getClassName(),
!0)):f&&(e.graphic=f.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},e=I(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],e=I(b&&b.radius,c&&c.radius,e+(c&&c.radiusPlus||0)));a.hasImage&&(e=0);a={x:Math.floor(a.plotX)-e,y:a.plotY-e};e&&(a.width=a.height=2*e);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},f=this.color,k=d&&d.color,t=a&&a.color,d=I(e.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;f=k||a||
t||f;a=e.fillColor||c.fillColor||f;f=e.lineColor||c.lineColor||f;b&&(c=c.states[b],b=e.states&&e.states[b]||{},d=I(b.lineWidth,c.lineWidth,d+I(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,f=b.lineColor||c.lineColor||f);return{stroke:f,"stroke-width":d,fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(J.navigator.userAgent),e,g,f=a.data||[],k,h;n(a,"destroy");y(a);v(a.axisTypes||[],function(b){(h=a[b])&&h.series&&(d(h.series,a),h.isDirty=h.forceRedraw=
!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(g=f.length;g--;)(k=f[g])&&k.destroy&&k.destroy();a.points=null;clearTimeout(a.animationTimeout);C(a,function(a,b){a instanceof q&&!a.survive&&(e=c&&"group"===b?"hide":"destroy",a[e]())});b.hoverSeries===a&&(b.hoverSeries=null);d(b.series,a);b.orderSeries();C(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,k,h=[],t=[],p;a=a||d.points;(k=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&k&&(f=4-
f);!e.connectNulls||b||c||(a=this.getValidPoints(a));v(a,function(g,k){var n=g.plotX,q=g.plotY,l=a[k-1];(g.leftCliff||l&&l.rightCliff)&&!c&&(p=!0);g.isNull&&!r(b)&&0<k?p=!e.connectNulls:g.isNull&&!b?p=!0:(0===k||p?k=["M",g.plotX,g.plotY]:d.getPointSpline?k=d.getPointSpline(a,g,k):f?(k=1===f?["L",l.plotX,q]:2===f?["L",(l.plotX+n)/2,l.plotY,"L",(l.plotX+n)/2,q]:["L",n,l.plotY],k.push("L",n,q)):k=["L",n,q],t.push(g.x),f&&t.push(g.x),h.push.apply(h,k),p=!1)});h.xMap=t;return d.graphPath=h},drawGraph:function(){var a=
this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];v(this.zones,function(c,e){d.push(["zone-graph-"+e,"highcharts-graph highcharts-zone-graph-"+e+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});v(d,function(d,e){var g=d[0],f=a[g];f?(f.endX=c.xMap,f.animate({d:c})):c.length&&(a[g]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),f={stroke:d[2],"stroke-width":b.lineWidth,
fill:a.fillGraph&&a.color||"none"},d[3]?f.dashstyle=d[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[g].attr(f).shadow(2>e&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,f,k=this.clips||[],h,p=this.graph,n=this.area,q=Math.max(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||"y")+"Axis"],m,w,y=b.inverted,z,r,K,C,J=!1;d.length&&(p||n)&&l&&void 0!==l.min&&(w=l.reversed,z=l.horiz,p&&p.hide(),
n&&n.hide(),m=l.getExtremes(),v(d,function(d,g){e=w?z?b.plotWidth:0:z?0:l.toPixels(m.min);e=Math.min(Math.max(I(f,e),0),q);f=Math.min(Math.max(Math.round(l.toPixels(I(d.value,m.max),!0)),0),q);J&&(e=f=l.toPixels(m.max));r=Math.abs(e-f);K=Math.min(e,f);C=Math.max(e,f);l.isXAxis?(h={x:y?C:K,y:0,width:r,height:q},z||(h.x=b.plotHeight-h.x)):(h={x:0,y:y?C:K,width:q,height:r},z&&(h.y=b.plotWidth-h.y));y&&c.isVML&&(h=l.isXAxis?{x:0,y:w?K:C,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,
y:0,width:h.height,height:b.chartHeight});k[g]?k[g].animate(h):(k[g]=c.clipRect(h),p&&a["zone-graph-"+g].clip(k[g]),n&&a["zone-area-"+g].clip(k[g]));J=d.value>m.max}),this.clips=k)},invertGroups:function(a){function b(){v(["group","markerGroup"],function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,e;c.xAxis&&(e=A(d,"resize",b),A(c,"destroy",e),b(a),c.invertGroups=b)},plotGroup:function(a,
b,c,d,e){var g=this[a],f=!g;f&&(this[a]=g=this.chart.renderer.g().attr({zIndex:d||.1}).add(e));g.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(r(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(g.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);g.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return g},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,
c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=!!a.animate&&b.renderer.isSVG&&B(d.animation).duration,f=a.visible?"inherit":"hidden",k=d.zIndex,h=a.hasRendered,p=b.seriesGroup,n=b.inverted;c=a.plotGroup("group","series",f,k,p);a.markerGroup=a.plotGroup("markerGroup","markers",f,k,p);e&&a.animate(!0);c.inverted=a.isCartesian?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&
a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===d.clip||a.sharedClipKey||h||c.clip(b.clipRect);e&&a.animate();h||(a.animationTimeout=z(function(){a.afterAnimate()},e));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:I(d&&d.left,a.plotLeft),
translateY:I(e&&e.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,d,e){var f,g;if(g=c&&c.length)return f=b.kdAxisArray[d%e],c.sort(function(a,b){return a[f]-b[f]}),g=Math.floor(g/2),{point:c[g],left:a(c.slice(0,
g),d+1,e),right:a(c.slice(g+1),d+1,e)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;z(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,g,h){var p=b.point,n=d.kdAxisArray[g%h],q,l,t=p;l=r(a[e])&&r(p[e])?Math.pow(a[e]-p[e],2):null;q=r(a[f])&&r(p[f])?Math.pow(a[f]-p[f],2):null;q=(l||0)+(q||0);p.dist=r(q)?Math.sqrt(q):Number.MAX_VALUE;p.distX=r(l)?
Math.sqrt(l):Number.MAX_VALUE;n=a[n]-p[n];q=0>n?"left":"right";l=0>n?"right":"left";b[q]&&(q=c(a,b[q],g+1,h),t=q[k]<t[k]?q:p);b[l]&&Math.sqrt(n*n)<t[k]&&(a=c(a,b[l],g+1,h),t=a[k]<t[k]?a:t);return t}var d=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],k=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(N);(function(a){var A=a.Axis,B=a.Chart,G=a.correctFloat,F=a.defined,l=a.destroyObjectProperties,
f=a.each,h=a.format,m=a.objectEach,r=a.pick,v=a.Series;a.StackItem=function(a,e,f,b,c){var d=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=e;this.x=b;this.total=null;this.points={};this.stack=c;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(d?f?"left":"right":"center"),verticalAlign:e.verticalAlign||(d?"middle":f?"bottom":"top"),y:r(e.y,d?4:f?14:-6),x:r(e.x,d?f?-6:6:0)};this.textAlign=e.textAlign||(d?f?"right":"left":"center")};a.StackItem.prototype={destroy:function(){l(this,
this.axis)},render:function(a){var d=this.options,f=d.format,f=f?h(f,this):d.formatter.call(this);this.label?this.label.attr({text:f,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(f,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,e){var d=this.axis,b=d.chart,c=d.translate(d.usePercentage?100:this.total,0,0,0,1),d=d.translate(0),d=Math.abs(c-d);a=b.xAxis[0].translate(this.x)+a;c=this.getStackBox(b,this,
a,c,e,d);if(e=this.label)e.align(this.alignOptions,null,c),c=e.alignAttr,e[!1===this.options.crop||b.isInsidePlot(c.x,c.y)?"show":"hide"](!0)},getStackBox:function(a,e,f,b,c,h){var d=e.axis.reversed,p=a.inverted;a=a.plotHeight;e=e.isNegative&&!d||!e.isNegative&&d;return{x:p?e?b:b-h:f,y:p?a-f-c:e?a-b-h:a-b,width:p?h:c,height:p?c:h}}};B.prototype.getStacks=function(){var a=this;f(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});f(a.series,function(d){!d.options.stacking||!0!==
d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+r(d.options.stack,""))})};A.prototype.buildStacks=function(){var a=this.series,e=r(this.options.reversedStacks,!0),f=a.length,b;if(!this.isXAxis){this.usePercentage=!1;for(b=f;b--;)a[e?b:f-b-1].setStackedPoints();for(b=0;b<f;b++)a[b].modifyStacks()}};A.prototype.renderStackTotals=function(){var a=this.chart,e=a.renderer,f=this.stacks,b=this.stackTotalGroup;b||(this.stackTotalGroup=b=e.g("stack-labels").attr({visibility:"visible",
zIndex:6}).add());b.translate(a.plotLeft,a.plotTop);m(f,function(a){m(a,function(a){a.render(b)})})};A.prototype.resetStacks=function(){var a=this,e=a.stacks;a.isXAxis||m(e,function(d){m(d,function(b,c){b.touched<a.stacksTouched?(b.destroy(),delete d[c]):(b.total=null,b.cum=null)})})};A.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),m(a,function(a){m(a,function(a){a.cum=a.total})}))};v.prototype.setStackedPoints=function(){if(this.options.stacking&&
(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var d=this.processedXData,e=this.processedYData,f=[],b=e.length,c=this.options,h=c.threshold,k=c.startFromThreshold?h:0,p=c.stack,c=c.stacking,l=this.stackKey,m="-"+l,y=this.negStacks,v=this.yAxis,q=v.stacks,z=v.oldStacks,J,t,D,E,H,g,u;v.stacksTouched+=1;for(H=0;H<b;H++)g=d[H],u=e[H],J=this.getStackIndicator(J,g,this.index),E=J.key,D=(t=y&&u<(k?0:h))?m:l,q[D]||(q[D]={}),q[D][g]||(z[D]&&z[D][g]?(q[D][g]=z[D][g],q[D][g].total=null):
q[D][g]=new a.StackItem(v,v.options.stackLabels,t,g,p)),D=q[D][g],null!==u&&(D.points[E]=D.points[this.index]=[r(D.cum,k)],F(D.cum)||(D.base=E),D.touched=v.stacksTouched,0<J.index&&!1===this.singleStacks&&(D.points[E][0]=D.points[this.index+","+g+",0"][0])),"percent"===c?(t=t?l:m,y&&q[t]&&q[t][g]?(t=q[t][g],D.total=t.total=Math.max(t.total,D.total)+Math.abs(u)||0):D.total=G(D.total+(Math.abs(u)||0))):D.total=G(D.total+(u||0)),D.cum=r(D.cum,k)+(u||0),null!==u&&(D.points[E].push(D.cum),f[H]=D.cum);
"percent"===c&&(v.usePercentage=!0);this.stackedYData=f;v.oldStacks={}}};v.prototype.modifyStacks=function(){var a=this,e=a.stackKey,h=a.yAxis.stacks,b=a.processedXData,c,l=a.options.stacking;a[l+"Stacker"]&&f([e,"-"+e],function(d){for(var e=b.length,f,k;e--;)if(f=b[e],c=a.getStackIndicator(c,f,a.index,d),k=(f=h[d]&&h[d][f])&&f.points[c.key])a[l+"Stacker"](k,f,e)})};v.prototype.percentStacker=function(a,e,f){e=e.total?100/e.total:0;a[0]=G(a[0]*e);a[1]=G(a[1]*e);this.stackedYData[f]=a[1]};v.prototype.getStackIndicator=
function(a,e,f,b){!F(a)||a.x!==e||b&&a.key!==b?a={x:e,index:0,key:b}:a.index++;a.key=[f,e,a.index].join();return a}})(N);(function(a){var A=a.addEvent,B=a.animate,G=a.Axis,F=a.createElement,l=a.css,f=a.defined,h=a.each,m=a.erase,r=a.extend,v=a.fireEvent,d=a.inArray,e=a.isNumber,n=a.isObject,b=a.isArray,c=a.merge,w=a.objectEach,k=a.pick,p=a.Point,C=a.Series,I=a.seriesTypes,y=a.setAnimation,K=a.splat;r(a.Chart.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=k(b,!0),v(e,"addSeries",{options:a},
function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,d,e){var f=b?"xAxis":"yAxis",h=this.options;a=c(a,{index:this[f].length,isX:b});b=new G(this,a);h[f]=K(h[f]||{});h[f].push(a);k(d,!0)&&this.redraw(e);return b},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&l(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=F("div",{className:"highcharts-loading highcharts-loading-hidden"},
null,b.container),b.loadingSpan=F("span",{className:"highcharts-loading-inner"},null,d),A(b,"redraw",f));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;l(d,r(e.style,{zIndex:10}));l(b.loadingSpan,e.labelStyle);b.loadingShown||(l(d,{opacity:0,display:""}),B(d,{opacity:e.style.opacity||.5},{duration:e.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",B(b,{opacity:0},
{duration:a.loading.hideDuration||100,complete:function(){l(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
update:function(a,b,p){var l=this,n={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},q=a.chart,m,g,y=[];if(q){c(!0,l.options.chart,q);"className"in q&&l.setClassName(q.className);if("inverted"in q||"polar"in q)l.propFromSeries(),m=!0;"alignTicks"in q&&(m=!0);w(q,function(a,b){-1!==d("chart."+b,l.propsRequireUpdateSeries)&&(g=!0);-1!==d(b,l.propsRequireDirtyBox)&&(l.isDirtyBox=!0)});"style"in q&&l.renderer.setStyle(q.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&c(!0,
this.options.plotOptions,a.plotOptions);w(a,function(a,b){if(l[b]&&"function"===typeof l[b].update)l[b].update(a,!1);else if("function"===typeof l[n[b]])l[n[b]](a);"chart"!==b&&-1!==d(b,l.propsRequireUpdateSeries)&&(g=!0)});h("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(h(K(a[b]),function(a,c){(c=f(a.id)&&l.get(a.id)||l[b][c])&&c.coll===b&&(c.update(a,!1),p&&(c.touched=!0));if(!c&&p)if("series"===b)l.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)l.addAxis(a,
"xAxis"===b,!1).touched=!0}),p&&h(l[b],function(a){a.touched?delete a.touched:y.push(a)}))});h(y,function(a){a.remove(!1)});m&&h(l.axes,function(a){a.update({},!1)});g&&h(l.series,function(a){a.update({},!1)});a.loading&&c(!0,l.options.loading,a.loading);m=q&&q.width;q=q&&q.height;e(m)&&m!==l.chartWidth||e(q)&&q!==l.chartHeight?l.setSize(m,q):k(b,!0)&&l.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});r(p.prototype,{update:function(a,b,c,d){function e(){f.applyOptions(a);null===f.y&&g&&
(f.graphic=g.destroy());n(a,!0)&&(g&&g.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=g.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()));p=f.index;h.updateParallelArrays(f,p);q.data[p]=n(q.data[p],!0)||n(a,!0)?f.options:a;h.isDirty=h.isDirtyData=!0;!h.fixedBox&&h.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===q.legendType&&(l.isDirtyLegend=!0);b&&l.redraw(c)}var f=this,h=f.series,g=f.graphic,p,l=h.chart,q=h.options;b=k(b,!0);!1===d?e():f.firePointEvent("update",
{options:a},e)},remove:function(a,b){this.series.removePoint(d(this,this.series.data),a,b)}});r(C.prototype,{addPoint:function(a,b,c,d){var e=this.options,f=this.data,h=this.chart,g=this.xAxis,g=g&&g.hasNames&&g.names,p=e.data,l,n,q=this.xData,m,t;b=k(b,!0);l={series:this};this.pointClass.prototype.applyOptions.apply(l,[a]);t=l.x;m=q.length;if(this.requireSorting&&t<q[m-1])for(n=!0;m&&q[m-1]>t;)m--;this.updateParallelArrays(l,"splice",m,0,0);this.updateParallelArrays(l,m);g&&l.name&&(g[t]=l.name);
p.splice(m,0,a);n&&(this.data.splice(m,0,null),this.processData());"point"===e.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(l,"shift"),p.shift()));this.isDirtyData=this.isDirty=!0;b&&h.redraw(d)},removePoint:function(a,b,c){var d=this,e=d.data,f=e[a],h=d.points,g=d.chart,p=function(){h&&h.length===e.length&&h.splice(a,1);e.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||{series:d},"splice",a,1);f&&f.destroy();d.isDirty=
!0;d.isDirtyData=!0;b&&g.redraw()};y(c,g);b=k(b,!0);f?f.firePointEvent("remove",null,p):p()},remove:function(a,b,c){function d(){e.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();k(a,!0)&&f.redraw(b)}var e=this,f=e.chart;!1!==c?v(e,"remove",null,d):d()},update:function(a,b){var d=this,e=d.chart,f=d.userOptions,p=d.oldType||d.type,l=a.type||f.type||e.options.chart.type,g=I[p].prototype,n,q=["group","markerGroup","dataLabelsGroup"],m=["navigatorSeries","baseSeries"],w=d.finishedAnimating&&
{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,b);if(l&&l!==p||void 0!==a.zIndex)q.length=0;d.options.isInternal&&(m.length=0);m=q.concat(m);h(m,function(a){m[a]=d[a];delete d[a]});a=c(f,w,{index:d.index,pointStart:d.xData[0]},{data:d.options.data},a);d.remove(!1,null,!1);for(n in g)d[n]=void 0;r(d,I[l||p].prototype);h(m,function(a){d[a]=m[a]});d.init(e,a);d.oldType=p;e.linkSeries();k(b,!0)&&e.redraw(!1)}});r(G.prototype,{update:function(a,b){var d=this.chart;
a=d.options[this.coll][this.options.index]=c(this.userOptions,a);this.destroy(!0);this.init(d,r(a,{events:void 0}));d.isDirtyBox=!0;k(b,!0)&&d.redraw()},remove:function(a){for(var c=this.chart,d=this.coll,e=this.series,f=e.length;f--;)e[f]&&e[f].remove(!1);m(c.axes,this);m(c[d],this);b(c.options[d])?c.options[d].splice(this.options.index,1):delete c.options[d];h(c[d],function(a,b){a.options.index=b});this.destroy();c.isDirtyBox=!0;k(a,!0)&&c.redraw()},setTitle:function(a,b){this.update({title:a},
b)},setCategories:function(a,b){this.update({categories:a},b)}})})(N);(function(a){var A=a.color,B=a.each,G=a.map,F=a.pick,l=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(f){var h=[],l=[],v=this.xAxis,d=this.yAxis,e=d.stacks[this.stackKey],n={},b=this.index,c=d.series,w=c.length,k,p=F(d.options.reversedStacks,!0)?1:-1,C;f=f||this.points;if(this.options.stacking){for(C=0;C<f.length;C++)n[f[C].x]=f[C];a.objectEach(e,function(a,b){null!==
a.total&&l.push(b)});l.sort(function(a,b){return a-b});k=G(c,function(){return this.visible});B(l,function(a,c){var f=0,m,y;if(n[a]&&!n[a].isNull)h.push(n[a]),B([-1,1],function(d){var f=1===d?"rightNull":"leftNull",h=0,q=e[l[c+d]];if(q)for(C=b;0<=C&&C<w;)m=q.points[C],m||(C===b?n[a][f]=!0:k[C]&&(y=e[a].points[C])&&(h-=y[1]-y[0])),C+=p;n[a][1===d?"rightCliff":"leftCliff"]=h});else{for(C=b;0<=C&&C<w;){if(m=e[a].points[C]){f=m[1];break}C+=p}f=d.translate(f,0,1,0,1);h.push({isNull:!0,plotX:v.translate(a,
0,0,0,1),x:a,plotY:f,yBottom:f})}})}return h},getGraphPath:function(a){var f=l.prototype.getGraphPath,h=this.options,v=h.stacking,d=this.yAxis,e,n,b=[],c=[],w=this.index,k,p=d.stacks[this.stackKey],C=h.threshold,I=d.getThreshold(h.threshold),y,h=h.connectNulls||"percent"===v,K=function(e,f,h){var l=a[e];e=v&&p[l.x].points[w];var n=l[h+"Null"]||0;h=l[h+"Cliff"]||0;var m,q,l=!0;h||n?(m=(n?e[0]:e[1])+h,q=e[0]+h,l=!!n):!v&&a[f]&&a[f].isNull&&(m=q=C);void 0!==m&&(c.push({plotX:k,plotY:null===m?I:d.getThreshold(m),
isNull:l,isCliff:!0}),b.push({plotX:k,plotY:null===q?I:d.getThreshold(q),doCurve:!1}))};a=a||this.points;v&&(a=this.getStackPoints(a));for(e=0;e<a.length;e++)if(n=a[e].isNull,k=F(a[e].rectPlotX,a[e].plotX),y=F(a[e].yBottom,I),!n||h)h||K(e,e-1,"left"),n&&!v&&h||(c.push(a[e]),b.push({x:e,plotX:k,plotY:y})),h||K(e,e+1,"right");e=f.call(this,c,!0,!0);b.reversed=!0;n=f.call(this,b,!0,!0);n.length&&(n[0]="L");n=e.concat(n);f=f.call(this,c,!1,h);n.xMap=e.xMap;this.areaPath=n;return f},drawGraph:function(){this.areaPath=
[];l.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,r=this.options,v=[["area","highcharts-area",this.color,r.fillColor]];B(this.zones,function(d,e){v.push(["zone-area-"+e,"highcharts-area highcharts-zone-area-"+e+" "+d.className,d.color||a.color,d.fillColor||r.fillColor])});B(v,function(d){var e=d[0],h=a[e];h?(h.endX=f.xMap,h.animate({d:f})):(h=a[e]=a.chart.renderer.path(f).addClass(d[1]).attr({fill:F(d[3],A(d[2]).setOpacity(F(r.fillOpacity,.75)).get()),zIndex:0}).add(a.group),h.isArea=
!0);h.startX=f.xMap;h.shiftUnit=r.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(N);(function(a){var A=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,F){var l=G.plotX,f=G.plotY,h=a[F-1];F=a[F+1];var m,r,v,d;if(h&&!h.isNull&&!1!==h.doCurve&&!G.isCliff&&F&&!F.isNull&&!1!==F.doCurve&&!G.isCliff){a=h.plotY;v=F.plotX;F=F.plotY;var e=0;m=(1.5*l+h.plotX)/2.5;r=(1.5*f+a)/2.5;v=(1.5*l+v)/2.5;d=(1.5*f+F)/2.5;v!==m&&(e=(d-r)*(v-l)/(v-m)+f-d);r+=e;d+=e;r>a&&r>f?(r=
Math.max(a,f),d=2*f-r):r<a&&r<f&&(r=Math.min(a,f),d=2*f-r);d>F&&d>f?(d=Math.max(F,f),r=2*f-d):d<F&&d<f&&(d=Math.min(F,f),r=2*f-d);G.rightContX=v;G.rightContY=d}G=["C",A(h.rightContX,h.plotX),A(h.rightContY,h.plotY),A(m,l),A(r,f),l,f];h.rightContX=h.rightContY=null;return G}})})(N);(function(a){var A=a.seriesTypes.area.prototype,B=a.seriesType;B("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:A.getStackPoints,getGraphPath:A.getGraphPath,drawGraph:A.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(N);
(function(a){var A=a.animObject,B=a.color,G=a.each,F=a.extend,l=a.isNumber,f=a.merge,h=a.pick,m=a.Series,r=a.seriesType,v=a.svg;r("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,
borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){m.prototype.init.apply(this,arguments);var a=this,e=a.chart;e.hasRendered&&G(e.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,e=a.options,f=a.xAxis,b=a.yAxis,c=f.reversed,l,k={},p=0;!1===e.grouping?p=1:G(a.chart.series,function(c){var d=c.options,e=c.yAxis,f;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||
b.len!==e.len||b.pos!==e.pos||(d.stacking?(l=c.stackKey,void 0===k[l]&&(k[l]=p++),f=k[l]):!1!==d.grouping&&(f=p++),c.columnIndex=f)});var m=Math.min(Math.abs(f.transA)*(f.ordinalSlope||e.pointRange||f.closestPointRange||f.tickInterval||1),f.len),r=m*e.groupPadding,y=(m-2*r)/(p||1),e=Math.min(e.maxPointWidth||f.len,h(e.pointWidth,y*(1-2*e.pointPadding)));a.columnMetrics={width:e,offset:(y-e)/2+(r+((a.columnIndex||0)+(c?1:0))*y-m/2)*(c?-1:1)};return a.columnMetrics},crispCol:function(a,e,f,b){var c=
this.chart,d=this.borderWidth,k=-(d%2?.5:0),d=d%2?.5:1;c.inverted&&c.renderer.isVML&&(d+=1);this.options.crisp&&(f=Math.round(a+f)+k,a=Math.round(a)+k,f-=a);b=Math.round(e+b)+d;k=.5>=Math.abs(e)&&.5<b;e=Math.round(e)+d;b-=e;k&&b&&(--e,b+=1);return{x:a,y:e,width:f,height:b}},translate:function(){var a=this,e=a.chart,f=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=h(f.borderWidth,b?0:1),c=a.yAxis,l=a.translatedThreshold=c.getThreshold(f.threshold),k=h(f.minPointLength,5),
p=a.getColumnMetrics(),r=p.width,v=a.barW=Math.max(r,1+2*b),y=a.pointXOffset=p.offset;e.inverted&&(l-=.5);f.pointPadding&&(v=Math.ceil(v));m.prototype.translate.apply(a);G(a.points,function(b){var d=h(b.yBottom,l),f=999+Math.abs(d),f=Math.min(Math.max(-f,b.plotY),c.len+f),p=b.plotX+y,m=v,n=Math.min(f,d),w,C=Math.max(f,d)-n;k&&Math.abs(C)<k&&(C=k,w=!c.reversed&&!b.negative||c.reversed&&b.negative,0===b.y&&0>=a.dataMax&&(w=!w),n=Math.abs(n-l)>k?d-k:l-(w?k:0));b.barX=p;b.pointWidth=r;b.tooltipPos=e.inverted?
[c.len+c.pos-e.plotLeft-f,a.xAxis.len-p-m/2,C]:[p+m/2,f+c.pos-e.plotTop,C];b.shapeType="rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[p,l,m,0]:[p,n,m,C])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,e){var d=this.options,b,c=this.pointAttrToOptions||{};b=c.stroke||"borderColor";var h=c["stroke-width"]||"borderWidth",k=a&&a.color||this.color,p=a&&a[b]||d[b]||
this.color||k,l=a&&a[h]||d[h]||this[h]||0,c=d.dashStyle;a&&this.zones.length&&(k=a.getZone(),k=a.options.color||k&&k.color||this.color);e&&(a=f(d.states[e],a.options.states&&a.options.states[e]||{}),e=a.brightness,k=a.color||void 0!==e&&B(k).brighten(a.brightness).get()||k,p=a[b]||p,l=a[h]||l,c=a.dashStyle||c);b={fill:k,stroke:p,"stroke-width":l};c&&(b.dashstyle=c);return b},drawPoints:function(){var a=this,e=this.chart,h=a.options,b=e.renderer,c=h.animationLimit||250,m;G(a.points,function(d){var k=
d.graphic;if(l(d.plotY)&&null!==d.y){m=d.shapeArgs;if(k)k[e.pointCount<c?"animate":"attr"](f(m));else d.graphic=k=b[d.shapeType](m).add(d.group||a.group);h.borderRadius&&k.attr({r:h.borderRadius});k.attr(a.pointAttribs(d,d.selected&&"select")).shadow(h.shadow,null,h.stacking&&!h.borderRadius);k.addClass(d.getClassName(),!0)}else k&&(d.graphic=k.destroy())})},animate:function(a){var d=this,f=this.yAxis,b=d.options,c=this.chart.inverted,h={},k=c?"translateX":"translateY",p;v&&(a?(h.scaleY=.001,a=Math.min(f.pos+
f.len,Math.max(f.pos,f.toPixels(b.threshold))),c?h.translateX=a-f.len:h.translateY=a,d.group.attr(h)):(p=d.group.attr(k),d.group.animate({scaleY:1},F(A(d.options.animation),{step:function(a,b){h[k]=p+b.pos*(f.pos-p);d.group.attr(h)}})),d.animate=null))},remove:function(){var a=this,e=a.chart;e.hasRendered&&G(e.series,function(d){d.type===a.type&&(d.isDirty=!0)});m.prototype.remove.apply(a,arguments)}})})(N);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(N);(function(a){var A=a.Series;
a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
A.prototype.drawGraph.call(this)}})})(N);(function(a){var A=a.deg2rad,B=a.isNumber,G=a.pick,F=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,f=this.chart,h=2*(a.slicedOffset||0),m=f.plotWidth-2*h,f=f.plotHeight-2*h,r=a.center,r=[G(r[0],"50%"),G(r[1],"50%"),a.size||"100%",a.innerSize||0],v=Math.min(m,f),d,e;for(d=0;4>d;++d)e=r[d],a=2>d||2===d&&/%$/.test(e),r[d]=F(e,[m,f,v,r[2]][d])+(a?h:0);r[3]>r[2]&&(r[3]=r[2]);return r},getStartAndEndRadians:function(a,f){a=B(a)?
a:0;f=B(f)&&f>a&&360>f-a?f:a+360;return{start:A*(a+-90),end:A*(f+-90)}}}})(N);(function(a){var A=a.addEvent,B=a.CenteredSeriesMixin,G=a.defined,F=a.each,l=a.extend,f=B.getStartAndEndRadians,h=a.inArray,m=a.noop,r=a.pick,v=a.Point,d=a.Series,e=a.seriesType,n=a.setAnimation;e("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,
showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=this,d=b.points,e=b.startAngleRad;a||(F(d,function(a){var c=a.graphic,d=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:e,end:e}),c.animate({r:d.r,
start:d.start,end:d.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,c=0,d=this.points,e=d.length,f,h=this.options.ignoreHiddenPoint;for(a=0;a<e;a++)f=d[a],c+=h&&!f.visible?0:f.isNull?0:f.y;this.total=c;for(a=0;a<e;a++)f=d[a],f.percentage=0<c&&(f.visible||!h)?f.y/c*100:0,f.total=c},generatePoints:function(){d.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,d=this.options,e=d.slicedOffset,h=e+(d.borderWidth||0),
l,m,n,v=f(d.startAngle,d.endAngle),q=this.startAngleRad=v.start,v=(this.endAngleRad=v.end)-q,z=this.points,J,t=d.dataLabels.distance,d=d.ignoreHiddenPoint,D,E=z.length,H;a||(this.center=a=this.getCenter());this.getX=function(b,c,d){n=Math.asin(Math.min((b-a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(n)*(a[2]/2+d.labelDistance)};for(D=0;D<E;D++){H=z[D];H.labelDistance=r(H.options.dataLabels&&H.options.dataLabels.distance,t);this.maxLabelDistance=Math.max(this.maxLabelDistance||
0,H.labelDistance);l=q+b*v;if(!d||H.visible)b+=H.percentage/100;m=q+b*v;H.shapeType="arc";H.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*l)/1E3,end:Math.round(1E3*m)/1E3};n=(m+l)/2;n>1.5*Math.PI?n-=2*Math.PI:n<-Math.PI/2&&(n+=2*Math.PI);H.slicedTranslation={translateX:Math.round(Math.cos(n)*e),translateY:Math.round(Math.sin(n)*e)};m=Math.cos(n)*a[2]/2;J=Math.sin(n)*a[2]/2;H.tooltipPos=[a[0]+.7*m,a[1]+.7*J];H.half=n<-Math.PI/2||n>Math.PI/2?1:0;H.angle=n;l=Math.min(h,H.labelDistance/
5);H.labelPos=[a[0]+m+Math.cos(n)*H.labelDistance,a[1]+J+Math.sin(n)*H.labelDistance,a[0]+m+Math.cos(n)*l,a[1]+J+Math.sin(n)*l,a[0]+m,a[1]+J,0>H.labelDistance?"center":H.half?"right":"left",n]}},drawGraph:null,drawPoints:function(){var a=this,c=a.chart.renderer,d,e,f,h,m=a.options.shadow;m&&!a.shadowGroup&&(a.shadowGroup=c.g("shadow").add(a.group));F(a.points,function(b){e=b.graphic;if(b.isNull)e&&(b.graphic=e.destroy());else{h=b.shapeArgs;d=b.getTranslate();var k=b.shadowGroup;m&&!k&&(k=b.shadowGroup=
c.g("shadow").add(a.shadowGroup));k&&k.attr(d);f=a.pointAttribs(b,b.selected&&"select");e?e.setRadialReference(a.center).attr(f).animate(l(h,d)):(b.graphic=e=c[b.shapeType](h).setRadialReference(a.center).attr(d).add(a.group),b.visible||e.attr({visibility:"hidden"}),e.attr(f).attr({"stroke-linejoin":"round"}).shadow(m,k));e.addClass(b.getClassName())}})},searchPoint:m,sortByAngle:function(a,c){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*c})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,
getCenter:B.getCenter,getSymbol:m},{init:function(){v.prototype.init.apply(this,arguments);var a=this,c;a.name=r(a.name,"Slice");c=function(b){a.slice("select"===b.type)};A(a,"select",c);A(a,"unselect",c);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,c){var b=this,d=b.series,e=d.chart,f=d.options.ignoreHiddenPoint;c=r(c,f);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,d.options.data[h(b,d.data)]=b.options,F(["graphic","dataLabel",
"connector","shadowGroup"],function(c){if(b[c])b[c][a?"show":"hide"](!0)}),b.legendItem&&e.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),f&&(d.isDirty=!0),c&&e.redraw())},slice:function(a,c,d){var b=this.series;n(d,b.chart);r(c,!0);this.sliced=this.options.sliced=G(a)?a:!this.sliced;b.options.data[h(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:
{translateX:0,translateY:0}},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}})})(N);(function(a){var A=a.addEvent,B=a.arrayMax,G=a.defined,F=a.each,l=a.extend,f=a.format,h=a.map,m=a.merge,r=a.noop,v=a.pick,d=a.relativeLength,e=a.Series,n=a.seriesTypes,b=a.stableSort;a.distribute=function(a,d){function c(a,b){return a.target-b.target}var e,f=!0,l=a,m=[],n;n=
0;for(e=a.length;e--;)n+=a[e].size;if(n>d){b(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=e=0;n<=d;)n+=a[e].size,e++;m=a.splice(e-1,a.length)}b(a,c);for(a=h(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(e=a.length;e--;)f=a[e],n=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,n-f.size/2),d-f.size);e=a.length;for(f=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,a[e-1].targets=a[e-1].targets.concat(a[e].targets),a[e-
1].pos+a[e-1].size>d&&(a[e-1].pos=d-a[e-1].size),a.splice(e,1),f=!0)}e=0;F(a,function(a){var b=0;F(a.targets,function(){l[e].pos=a.pos+b;b+=l[e].size;e++})});l.push.apply(l,m);b(l,c)};e.prototype.drawDataLabels=function(){var b=this,d=b.options,e=d.dataLabels,h=b.points,l,n,y=b.hasRendered||0,r,q,z=v(e.defer,!!d.animation),J=b.chart.renderer;if(e.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(e),q=b.plotGroup("dataLabelsGroup","data-labels",z&&!y?"hidden":"visible",e.zIndex||6),
z&&(q.attr({opacity:+y}),y||A(b,"afterAnimate",function(){b.visible&&q.show(!0);q[d.animation?"animate":"attr"]({opacity:1},{duration:200})})),n=e,F(h,function(c){var k,h=c.dataLabel,p,g,t=c.connector,y=!h,w;l=c.dlOptions||c.options&&c.options.dataLabels;if(k=v(l&&l.enabled,n.enabled)&&!c.isNull)e=m(n,l),p=c.getLabelConfig(),w=e[c.formatPrefix+"Format"]||e.format,r=G(w)?f(w,p):e.formatter.call(p,e),w=e.style,p=e.rotation,w.color=v(e.color,w.color,b.color,"#000000"),"contrast"===w.color&&(c.contrastColor=
J.getContrast(c.color||b.color),w.color=e.inside||0>v(c.labelDistance,e.distance)||d.stacking?c.contrastColor:"#000000"),d.cursor&&(w.cursor=d.cursor),g={fill:e.backgroundColor,stroke:e.borderColor,"stroke-width":e.borderWidth,r:e.borderRadius||0,rotation:p,padding:e.padding,zIndex:1},a.objectEach(g,function(a,b){void 0===a&&delete g[b]});!h||k&&G(r)?k&&G(r)&&(h?g.text=r:(h=c.dataLabel=J[p?"text":"label"](r,0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),h.addClass("highcharts-data-label-color-"+
c.colorIndex+" "+(e.className||"")+(e.useHTML?"highcharts-tracker":""))),h.attr(g),h.css(w).shadow(e.shadow),h.added||h.add(q),b.alignDataLabel(c,h,e,null,y)):(c.dataLabel=h=h.destroy(),t&&(c.connector=t.destroy()))})};e.prototype.alignDataLabel=function(a,b,d,e,f){var c=this.chart,k=c.inverted,h=v(a.plotX,-9999),m=v(a.plotY,-9999),p=b.getBBox(),n,t=d.rotation,w=d.align,r=this.visible&&(a.series.forceDL||c.isInsidePlot(h,Math.round(m),k)||e&&c.isInsidePlot(h,k?e.x+1:e.y+e.height-1,k)),C="justify"===
v(d.overflow,"justify");if(r&&(n=d.style.fontSize,n=c.renderer.fontMetrics(n,b).b,e=l({x:k?this.yAxis.len-m:h,y:Math.round(k?this.xAxis.len-h:m),width:0,height:0},e),l(d,{width:p.width,height:p.height}),t?(C=!1,h=c.renderer.rotCorr(n,t),h={x:e.x+d.x+e.width/2+h.x,y:e.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*e.height},b[f?"attr":"animate"](h).attr({align:w}),m=(t+720)%360,m=180<m&&360>m,"left"===w?h.y-=m?p.height:0:"center"===w?(h.x-=p.width/2,h.y-=p.height/2):"right"===w&&(h.x-=p.width,h.y-=
m?0:p.height)):(b.align(d,null,e),h=b.alignAttr),C?a.isLabelJustified=this.justifyDataLabel(b,d,h,p,e,f):v(d.crop,!0)&&(r=c.isInsidePlot(h.x,h.y)&&c.isInsidePlot(h.x+p.width,h.y+p.height)),d.shape&&!t))b[f?"attr":"animate"]({anchorX:k?c.plotWidth-a.plotY:a.plotX,anchorY:k?c.plotHeight-a.plotX:a.plotY});r||(b.attr({y:-9999}),b.placed=!1)};e.prototype.justifyDataLabel=function(a,b,d,e,f,h){var c=this.chart,k=b.align,l=b.verticalAlign,m,p,n=a.box?0:a.padding||0;m=d.x+n;0>m&&("right"===k?b.align="left":
b.x=-m,p=!0);m=d.x+e.width-n;m>c.plotWidth&&("left"===k?b.align="right":b.x=c.plotWidth-m,p=!0);m=d.y+n;0>m&&("bottom"===l?b.verticalAlign="top":b.y=-m,p=!0);m=d.y+e.height-n;m>c.plotHeight&&("top"===l?b.verticalAlign="bottom":b.y=c.plotHeight-m,p=!0);p&&(a.placed=!h,a.align(b,null,f));return p};n.pie&&(n.pie.prototype.drawDataLabels=function(){var b=this,d=b.data,f,h=b.chart,l=b.options.dataLabels,m=v(l.connectorPadding,10),n=v(l.connectorWidth,1),r=h.plotWidth,q=h.plotHeight,z,A=b.center,t=A[2]/
2,D=A[1],E,H,g,u,P=[[],[]],M,O,L,N,x=[0,0,0,0];b.visible&&(l.enabled||b._hasPointLabels)&&(F(d,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),e.prototype.drawDataLabels.apply(b),F(d,function(a){a.dataLabel&&a.visible&&(P[a.half].push(a),a.dataLabel._pos=null)}),F(P,function(c,d){var e,k,p=c.length,n=[],y;if(p)for(b.sortByAngle(c,d-.5),0<b.maxLabelDistance&&(e=Math.max(0,D-t-b.maxLabelDistance),
k=Math.min(D+t+b.maxLabelDistance,h.plotHeight),F(c,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,D-t-a.labelDistance),a.bottom=Math.min(D+t+a.labelDistance,h.plotHeight),y=a.dataLabel.getBBox().height||21,a.positionsIndex=n.push({target:a.labelPos[1]-a.top+y/2,size:y,rank:a.y})-1)}),a.distribute(n,k+y-e)),N=0;N<p;N++)f=c[N],k=f.positionsIndex,g=f.labelPos,E=f.dataLabel,L=!1===f.visible?"hidden":"inherit",O=e=g[1],n&&G(n[k])&&(void 0===n[k].pos?L="hidden":(u=n[k].size,O=f.top+n[k].pos)),
delete f.positionIndex,M=l.justify?A[0]+(d?-1:1)*(t+f.labelDistance):b.getX(O<f.top+2||O>f.bottom-2?e:O,d,f),E._attr={visibility:L,align:g[6]},E._pos={x:M+l.x+({left:m,right:-m}[g[6]]||0),y:O+l.y-10},g.x=M,g.y=O,v(l.crop,!0)&&(H=E.getBBox().width,e=null,M-H<m?(e=Math.round(H-M+m),x[3]=Math.max(e,x[3])):M+H>r-m&&(e=Math.round(M+H-r+m),x[1]=Math.max(e,x[1])),0>O-u/2?x[0]=Math.max(Math.round(-O+u/2),x[0]):O+u/2>q&&(x[2]=Math.max(Math.round(O+u/2-q),x[2])),E.sideOverflow=e)}),0===B(x)||this.verifyDataLabelOverflow(x))&&
(this.placeDataLabels(),n&&F(this.points,function(a){var c;z=a.connector;if((E=a.dataLabel)&&E._pos&&a.visible&&0<a.labelDistance){L=E._attr.visibility;if(c=!z)a.connector=z=h.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup),z.attr({"stroke-width":n,stroke:l.connectorColor||a.color||"#666666"});z[c?"attr":"animate"]({d:b.connectorPath(a.labelPos)});z.attr("visibility",L)}else z&&(a.connector=z.destroy())}))},n.pie.prototype.connectorPath=
function(a){var b=a.x,c=a.y;return v(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},n.pie.prototype.placeDataLabels=function(){F(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?
"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},n.pie.prototype.alignDataLabel=r,n.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,e=c.center,f=c.minSize||80,h,l=null!==c.size;l||(null!==e[0]?h=Math.max(b[2]-Math.max(a[1],a[3]),f):(h=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2),null!==e[1]?h=Math.max(Math.min(h,b[2]-Math.max(a[0],a[2])),f):(h=Math.max(Math.min(h,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2),h<b[2]?(b[2]=h,b[3]=Math.min(d(c.innerSize||
0,h),h),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):l=!0);return l});n.column&&(n.column.prototype.alignDataLabel=function(a,b,d,f,h){var c=this.chart.inverted,k=a.series,l=a.dlBox||a.shapeArgs,n=v(a.below,a.plotY>v(this.translatedThreshold,k.yAxis.len)),p=v(d.inside,!!this.options.stacking);l&&(f=m(l),0>f.y&&(f.height+=f.y,f.y=0),l=f.y+f.height-k.yAxis.len,0<l&&(f.height-=l),c&&(f={x:k.yAxis.len-f.y-f.height,y:k.xAxis.len-f.x-f.width,width:f.height,height:f.width}),p||(c?(f.x+=
n?0:f.width,f.width=0):(f.y+=n?f.height:0,f.height=0)));d.align=v(d.align,!c||p?"center":n?"right":"left");d.verticalAlign=v(d.verticalAlign,c||p?"middle":n?"top":"bottom");e.prototype.alignDataLabel.call(this,a,b,d,f,h);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(N);(function(a){var A=a.Chart,B=a.each,G=a.objectEach,F=a.pick,l=a.addEvent;A.prototype.callbacks.push(function(a){l(a,"render",function(){var f=[];B(a.labelCollectors||[],function(a){f=f.concat(a())});
B(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&G(a.stacks,function(a){G(a,function(a){f.push(a.label)})})});B(a.series||[],function(a){var h=a.options.dataLabels,l=a.dataLabelCollections||["dataLabel"];(h.enabled||a._hasPointLabels)&&!h.allowOverlap&&a.visible&&B(l,function(d){B(a.points,function(a){a[d]&&(a[d].labelrank=F(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[d]))})})});a.hideOverlappingLabels(f)})});A.prototype.hideOverlappingLabels=function(a){var f=
a.length,l,r,v,d,e,n,b,c,w,k=function(a,b,c,d,e,f,h,k){return!(e>a+c||e+h<a||f>b+d||f+k<b)};for(r=0;r<f;r++)if(l=a[r])l.oldOpacity=l.opacity,l.newOpacity=1,l.width||(v=l.getBBox(),l.width=v.width,l.height=v.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(r=0;r<f;r++)for(v=a[r],l=r+1;l<f;++l)if(d=a[l],v&&d&&v!==d&&v.placed&&d.placed&&0!==v.newOpacity&&0!==d.newOpacity&&(e=v.alignAttr,n=d.alignAttr,b=v.parentGroup,c=d.parentGroup,w=2*(v.box?0:v.padding||0),e=k(e.x+b.translateX,
e.y+b.translateY,v.width-w,v.height-w,n.x+c.translateX,n.y+c.translateY,d.width-w,d.height-w)))(v.labelrank<d.labelrank?v:d).newOpacity=0;B(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(N);(function(a){var A=a.addEvent,B=a.Chart,G=a.createElement,F=a.css,l=a.defaultOptions,f=a.defaultPlotOptions,h=a.each,m=a.extend,r=a.fireEvent,v=a.hasTouch,d=a.inArray,
e=a.isObject,n=a.Legend,b=a.merge,c=a.pick,w=a.Point,k=a.Series,p=a.seriesTypes,C=a.svg,I;I=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};h(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(h(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",
c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(v)a[d].on("touchstart",c);a.options.cursor&&a[d].css(F).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,k=f.pointer,l=f.renderer,n=f.options.tooltip.snap,g=a.tracker,m,p=function(){if(f.hoverSeries!==a)a.onMouseOver()},r="rgba(192,192,192,"+(C?.0001:.002)+")";if(e&&!c)for(m=e+1;m--;)"M"===d[m]&&d.splice(m+1,0,d[m+
1]-n,d[m+2],"L"),(m&&"M"===d[m]||m===e)&&d.splice(m,0,"L",d[m-2]+n,d[m-1]);g?g.attr({d:d}):a.graph&&(a.tracker=l.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:r,fill:c?r:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*n),zIndex:2}).add(a.group),h([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",p).on("mouseout",function(a){k.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(v)a.on("touchstart",p)}))}};p.column&&
(p.column.prototype.drawTracker=I.drawTrackerPoint);p.pie&&(p.pie.prototype.drawTracker=I.drawTrackerPoint);p.scatter&&(p.scatter.prototype.drawTracker=I.drawTrackerPoint);m(n.prototype,{setItemEvents:function(a,c,d){var e=this,f=e.chart.renderer.boxWrapper,h="highcharts-legend-"+(a.series?"point":"series")+"-active";(d?c:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(h);c.css(e.options.itemHoverStyle)}).on("mouseout",function(){c.css(b(a.visible?e.itemStyle:e.itemHiddenStyle));
f.removeClass(h);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):r(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);A(a.checkbox,"click",function(b){r(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});
l.legend.itemStyle.cursor="pointer";m(B.prototype,{showResetZoom:function(){var a=this,b=l.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,f)},zoomOut:function(){var a=this;r(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,
d=this.pointer,f=!1,k;!a||a.resetSelection?(h(this.axes,function(a){b=a.zoom()}),d.initiated=!1):h(a.xAxis.concat(a.yAxis),function(a){var c=a.axis;d[c.isXAxis?"zoomX":"zoomY"]&&(b=c.zoom(a.min,a.max),c.displayBtn&&(f=!0))});k=this.resetZoomButton;f&&!k?this.showResetZoom():!f&&e(k)&&(this.resetZoomButton=k.destroy());b&&this.redraw(c(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&h(d,function(a){a.setState()});h("xy"===b?[1,0]:
[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",h=c[d],g=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(h-f,!0)+g,g=b.toValue(h+b.len-f,!0)-g,m=g<l,h=m?g:l,l=m?l:g,g=Math.min(k.dataMin,b.toValue(b.toPixels(k.min)-b.minPixelPadding)),m=Math.max(k.dataMax,b.toValue(b.toPixels(k.max)+b.minPixelPadding)),n;n=g-h;0<n&&(l+=n,h=g);n=l-m;0<n&&(l=m,h-=n);b.series.length&&h!==k.min&&l!==k.max&&(b.setExtremes(h,l,!1,!1,{trigger:"pan"}),e=!0);
c[d]=f});e&&c.redraw(!1);F(c.container,{cursor:"move"})}});m(w.prototype,{select:function(a,b){var e=this,f=e.series,k=f.chart;a=c(a,!e.selected);e.firePointEvent(a?"select":"unselect",{accumulate:b},function(){e.selected=e.options.selected=a;f.options.data[d(e,f.data)]=e.options;e.setState(a&&"select");b||h(k.getSelectedPoints(),function(a){a.selected&&a!==e&&(a.selected=a.options.selected=!1,f.options.data[d(a,f.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=
this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");h(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var c=this,d=b(c.series.options.point,c.options).events;c.events=d;a.objectEach(d,function(a,b){A(c,b,a)});this.hasImportedEvents=!0}},setState:function(a,b){var d=Math.floor(this.plotX),
e=this.plotY,h=this.series,k=h.options.states[a]||{},l=f[h.type].marker&&h.options.marker,n=l&&!1===l.enabled,p=l&&l.states&&l.states[a]||{},g=!1===p.enabled,r=h.stateMarkerGraphic,v=this.marker||{},w=h.chart,y=h.halo,A,B=l&&h.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===k.enabled||a&&(g||n&&!1===p.enabled)||a&&v.states&&v.states[a]&&!1===v.states[a].enabled)){B&&(A=h.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+
this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(h.pointAttribs(this,a),c(w.options.chart.animation,k.animation)),A&&this.graphic.animate(A,c(w.options.chart.animation,p.animation,l.animation)),r&&r.hide();else{if(a&&p){l=v.symbol||h.symbol;r&&r.currentSymbol!==l&&(r=r.destroy());if(r)r[b?"animate":"attr"]({x:A.x,y:A.y});else l&&(h.stateMarkerGraphic=r=w.renderer.symbol(l,A.x,A.y,A.width,A.height).add(h.markerGroup),r.currentSymbol=l);r&&r.attr(h.pointAttribs(this,
a))}r&&(r[a&&w.isInsidePlot(d,e,w.inverted)?"show":"hide"](),r.element.point=this)}(d=k.halo)&&d.size?(y||(h.halo=y=w.renderer.path().add((this.graphic||r).parentGroup)),y[b?"animate":"attr"]({d:this.haloPath(d.size)}),y.attr({"class":"highcharts-halo highcharts-color-"+c(this.colorIndex,h.colorIndex)}),y.point=this,y.attr(m({fill:this.color||h.color,"fill-opacity":d.opacity,zIndex:-1},d.attributes))):y&&y.point&&y.point.haloPath&&y.animate({d:y.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});m(k.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&r(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&r(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
d=b.options,e=b.graph,f=d.states,k=d.lineWidth,d=0;a=a||"";if(b.state!==a&&(h([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(k=f[a].lineWidth||k+(f[a].lineWidthPlus||0)),e&&!e.dashstyle))for(k={"stroke-width":k},e.animate(k,c(b.chart.options.chart.animation,f[a]&&f[a].animation));b["zone-graph-"+d];)b["zone-graph-"+d].attr(k),d+=1},setVisible:function(a,
b){var c=this,d=c.chart,e=c.legendItem,f,k=d.options.chart.ignoreHiddenSeries,l=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!l:a)?"show":"hide";h(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&h(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});h(c.linkedSeries,function(b){b.setVisible(a,
!1)});k&&(d.isDirtyBox=!0);!1!==b&&d.redraw();r(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);r(this,a?"select":"unselect")},drawTracker:I.drawTrackerGraph})})(N);(function(a){var A=a.Chart,B=a.each,G=a.inArray,F=a.isArray,l=a.isObject,f=a.pick,h=a.splat;A.prototype.setResponsive=function(f){var h=this.options.responsive,l=[],d=this.currentResponsive;h&&h.rules&&
B(h.rules,function(d){void 0===d._id&&(d._id=a.uniqueKey());this.matchResponsiveRule(d,l,f)},this);var e=a.merge.apply(0,a.map(l,function(d){return a.find(h.rules,function(a){return a._id===d}).chartOptions})),l=l.toString()||void 0;l!==(d&&d.ruleIds)&&(d&&this.update(d.undoOptions,f),l?(this.currentResponsive={ruleIds:l,mergedOptions:e,undoOptions:this.currentOptions(e)},this.update(e,f)):this.currentResponsive=void 0)};A.prototype.matchResponsiveRule=function(a,h){var l=a.condition;(l.callback||
function(){return this.chartWidth<=f(l.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=f(l.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=f(l.minWidth,0)&&this.chartHeight>=f(l.minHeight,0)}).call(this)&&h.push(a._id)};A.prototype.currentOptions=function(f){function m(d,e,f,b){var c;a.objectEach(d,function(a,k){if(!b&&-1<G(k,["series","xAxis","yAxis"]))for(d[k]=h(d[k]),f[k]=[],c=0;c<d[k].length;c++)e[k][c]&&(f[k][c]={},m(a[c],e[k][c],f[k][c],b+1));else l(a)?(f[k]=F(a)?[]:{},m(a,e[k]||{},f[k],b+1)):f[k]=
e[k]||null})}var v={};m(f,this.options,v,0);return v}})(N);return N});
/*
 Highcharts JS v6.0.1 (2017-10-05)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(k){"object"===typeof module&&module.exports?module.exports=k:k(Highcharts)})(function(k){(function(f){var k=f.defaultOptions,z=f.doc,B=f.Chart,w=f.addEvent,I=f.removeEvent,F=f.fireEvent,p=f.createElement,C=f.discardElement,u=f.css,n=f.merge,D=f.pick,h=f.each,G=f.objectEach,r=f.extend,J=f.isTouchDevice,E=f.win,H=E.navigator.userAgent,K=f.Renderer.prototype.symbols;/Edge\/|Trident\/|MSIE /.test(H);/firefox/i.test(H);r(k.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",
downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});k.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};n(!0,k.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",background:"none",color:"#333333",fontSize:J?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",
color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{fill:"#ffffff",stroke:"none",padding:5}}});k.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:"printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},menuItemDefinitions:{printChart:{textKey:"printChart",
onclick:function(){this.print()}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}}};f.post=function(a,b,e){var c=p("form",n({method:"post",action:a,enctype:"multipart/form-data"},
e),{display:"none"},z.body);G(b,function(a,b){p("input",{type:"hidden",name:b,value:a},null,c)});c.submit();C(c)};r(B.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var e=a.match(/<\/svg>(.*?$)/);e&&e[1]&&(e='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+b.chart.width+'" height\x3d"'+b.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+e[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",a=a.replace("\x3c/svg\x3e",e+"\x3c/svg\x3e"))}a=a.replace(/zIndex="[^"]+"/g,
"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,
"\u00a0").replace(/&shy;/g,"\u00ad");this.ieSanitizeSVG&&(a=this.ieSanitizeSVG(a));return a},getChartHTML:function(){return this.container.innerHTML},getSVG:function(a){var b,e,c,v,m,g=n(this.options,a);e=p("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},z.body);c=this.renderTo.style.width;m=this.renderTo.style.height;c=g.exporting.sourceWidth||g.chart.width||/px$/.test(c)&&parseInt(c,10)||600;m=g.exporting.sourceHeight||g.chart.height||/px$/.test(m)&&
parseInt(m,10)||400;r(g.chart,{animation:!1,renderTo:e,forExport:!0,renderer:"SVGRenderer",width:c,height:m});g.exporting.enabled=!1;delete g.data;g.series=[];h(this.series,function(a){v=n(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});v.isInternal||g.series.push(v)});h(this.axes,function(a){a.userOptions.internalKey||(a.userOptions.internalKey=f.uniqueKey())});b=new f.Chart(g,this.callback);a&&h(["xAxis","yAxis","series"],function(c){var d={};a[c]&&(d[c]=a[c],
b.update(d))});h(this.axes,function(a){var c=f.find(b.axes,function(b){return b.options.internalKey===a.userOptions.internalKey}),d=a.getExtremes(),e=d.userMin,d=d.userMax;!c||void 0===e&&void 0===d||c.setExtremes(e,d,!0,!1)});c=b.getChartHTML();c=this.sanitizeSVG(c,g);g=null;b.destroy();C(e);return c},getSVGForExport:function(a,b){var e=this.options.exporting;return this.getSVG(n({chart:{borderRadius:0}},e.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||e.sourceWidth,sourceHeight:a&&a.sourceHeight||
e.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=n(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,e=[],c=b.parentNode,f=z.body,m=f.childNodes,g=a.options.exporting.printMaxWidth,d,t;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);F(a,"beforePrint");if(t=g&&a.chartWidth>g)d=[a.options.chart.width,void 0,!1],a.setSize(g,void 0,!1);
h(m,function(a,b){1===a.nodeType&&(e[b]=a.style.display,a.style.display="none")});f.appendChild(b);E.focus();E.print();setTimeout(function(){c.appendChild(b);h(m,function(a,b){1===a.nodeType&&(a.style.display=e[b])});a.isPrinting=!1;t&&a.setSize.apply(a,d);F(a,"afterPrint")},1E3)}},contextMenu:function(a,b,e,c,v,m,g){var d=this,t=d.options.navigation,k=d.chartWidth,q=d.chartHeight,n="cache-"+a,l=d[n],x=Math.max(v,m),y,A;l||(d[n]=l=p("div",{className:a},{position:"absolute",zIndex:1E3,padding:x+"px"},
d.container),y=p("div",{className:"highcharts-menu"},null,l),u(y,r({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},t.menuStyle)),A=function(){u(l,{display:"none"});g&&g.setState(0);d.openMenu=!1},d.exportEvents.push(w(l,"mouseleave",function(){l.hideTimer=setTimeout(A,500)}),w(l,"mouseenter",function(){clearTimeout(l.hideTimer)}),w(z,"mouseup",function(b){d.pointer.inClass(b.target,a)||A()})),h(b,function(a){"string"===typeof a&&(a=d.options.exporting.menuItemDefinitions[a]);
if(f.isObject(a,!0)){var b;a.separator?b=p("hr",null,null,y):(b=p("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();A();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},null,y),b.onmouseover=function(){u(this,t.menuItemHoverStyle)},b.onmouseout=function(){u(this,t.menuItemStyle)},u(b,r({cursor:"pointer"},t.menuItemStyle)));d.exportDivElements.push(b)}}),d.exportDivElements.push(y,l),d.exportMenuWidth=l.offsetWidth,d.exportMenuHeight=
l.offsetHeight);b={display:"block"};e+d.exportMenuWidth>k?b.right=k-e-v-x+"px":b.left=e-x+"px";c+m+d.exportMenuHeight>q&&"top"!==g.alignOptions.verticalAlign?b.bottom=q-c-x+"px":b.top=c+m-x+"px";u(l,b);d.openMenu=!0},addButton:function(a){var b=this,e=b.renderer,c=n(b.options.navigation.buttonOptions,a),f=c.onclick,m=c.menuItems,g,d,k=c.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);if(!1!==c.enabled){var h=c.theme,q=h.states,p=q&&q.hover,
q=q&&q.select,l;delete h.states;f?l=function(a){a.stopPropagation();f.call(b,a)}:m&&(l=function(){b.contextMenu(d.menuClassName,m,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});c.text&&c.symbol?h.paddingLeft=D(h.paddingLeft,25):c.text||r(h,{width:c.width,height:c.height,padding:0});d=e.button(c.text,0,0,l,h,p,q).addClass(a.className).attr({"stroke-linecap":"round",title:b.options.lang[c._titleKey],zIndex:3});d.menuClassName=a.menuClassName||"highcharts-menu-"+b.btnCount++;c.symbol&&
(g=e.symbol(c.symbol,c.symbolX-k/2,c.symbolY-k/2,k,k).addClass("highcharts-button-symbol").attr({zIndex:1}).add(d),g.attr({stroke:c.symbolStroke,fill:c.symbolFill,"stroke-width":c.symbolStrokeWidth||1}));d.add().align(r(c,{width:d.width,x:D(c.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(d.width+c.buttonSpacing)*("right"===c.align?-1:1);b.exportSVGElements.push(d,g)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var e=b.exportDivElements,c=b.exportEvents,f;a&&(h(a,
function(a,c){a&&(a.onclick=a.ontouchstart=null,f="cache-"+a.menuClassName,b[f]&&delete b[f],b.exportSVGElements[c]=a.destroy())}),a.length=0);e&&(h(e,function(a,c){clearTimeout(a.hideTimer);I(a,"mouseleave");b.exportDivElements[c]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;C(a)}),e.length=0);c&&(h(c,function(a){a()}),c.length=0)}});K.menu=function(a,b,e,c){return["M",a,b+2.5,"L",a+e,b+2.5,"M",a,b+c/2+.5,"L",a+e,b+c/2+.5,"M",a,b+c-1.5,"L",a+e,b+c-1.5]};B.prototype.renderExporting=function(){var a=
this,b=a.options.exporting,e=b.buttons,c=a.isDirtyExporting||!a.exportSVGElements;a.buttonOffset=0;a.isDirtyExporting&&a.destroyExport();c&&!1!==b.enabled&&(a.exportEvents=[],G(e,function(b){a.addButton(b)}),a.isDirtyExporting=!1);w(a,"destroy",a.destroyExport)};B.prototype.callbacks.push(function(a){a.renderExporting();w(a,"redraw",a.renderExporting);h(["exporting","navigation"],function(b){a[b]={update:function(e,c){a.isDirtyExporting=!0;n(!0,a.options[b],e);D(c,!0)&&a.redraw()}}})})})(k)});
/*
 Highcharts JS v6.0.1 (2017-10-05)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(a){var t=a.deg2rad,v=a.isNumber,w=a.pick,n=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,e=this.chart,m=2*(a.slicedOffset||0),b=e.plotWidth-2*m,e=e.plotHeight-2*m,c=a.center,c=[w(c[0],"50%"),w(c[1],"50%"),a.size||"100%",a.innerSize||0],l=Math.min(b,e),g,d;for(g=0;4>g;++g)d=c[g],a=2>g||2===g&&/%$/.test(d),c[g]=n(d,[b,e,l,c[2]][g])+(a?m:0);c[3]>c[2]&&(c[3]=c[2]);
return c},getStartAndEndRadians:function(a,e){a=v(a)?a:0;e=v(e)&&e>a&&360>e-a?e:a+360;return{start:t*(a+-90),end:t*(e+-90)}}}})(x);(function(a){function t(a,b){this.init(a,b)}var v=a.CenteredSeriesMixin,w=a.each,n=a.extend,k=a.merge,e=a.splat;n(t.prototype,{coll:"pane",init:function(a,b){this.chart=b;this.background=[];b.pane.push(this);this.setOptions(a)},setOptions:function(a){this.options=k(this.defaultOptions,this.chart.angular?{background:{}}:void 0,a)},render:function(){var a=this.options,b=
this.options.background,c=this.chart.renderer;this.group||(this.group=c.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(b)for(b=e(b),a=Math.max(b.length,this.background.length||0),c=0;c<a;c++)b[c]&&this.axis?this.renderBackground(k(this.defaultBackgroundOptions,b[c]),c):this.background[c]&&(this.background[c]=this.background[c].destroy(),this.background.splice(c,1))},renderBackground:function(a,b){var c="animate";this.background[b]||(this.background[b]=this.chart.renderer.path().add(this.group),
c="attr");this.background[b][c]({d:this.axis.getPlotBandPath(a.from,a.to,a)}).attr({fill:a.backgroundColor,stroke:a.borderColor,"stroke-width":a.borderWidth,"class":"highcharts-pane "+(a.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},
updateCenter:function(a){this.center=(a||this.axis||{}).center=v.getCenter.call(this)},update:function(a,b){k(!0,this.options,a);this.setOptions(this.options);this.render();w(this.chart.axes,function(c){c.pane===this&&(c.pane=null,c.update({},b))},this)}});a.Pane=t})(x);(function(a){var t=a.each,v=a.extend,w=a.map,n=a.merge,k=a.noop,e=a.pick,m=a.pInt,b=a.wrap,c,l,g=a.Axis.prototype;a=a.Tick.prototype;c={getOffset:k,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:k,setCategories:k,
setTitle:k};l={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,
title:{x:4,text:null,rotation:90}},setOptions:function(b){b=this.options=n(this.defaultOptions,this.defaultRadialOptions,b);b.plotBands||(b.plotBands=[])},getOffset:function(){g.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(b,c){b=this.center;var d=this.chart,f=e(c,b[2]/2-this.offset);this.isCircular||void 0!==c?(c=this.chart.renderer.symbols.arc(this.left+b[0],this.top+b[1],f,f,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}),c.xBounds=[this.left+
b[0]],c.yBounds=[this.top+b[1]-f]):(c=this.postTranslate(this.angleRad,f),c=["M",b[0]+d.plotLeft,b[1]+d.plotTop,"L",c.x,c.y]);return c},setAxisTranslation:function(){g.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===e(this.userMax,
this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){g.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*e(this.sector,1)/2)},getPosition:function(b,c){return this.postTranslate(this.isCircular?this.translate(b):this.angleRad,e(this.isCircular?c:this.translate(b),
this.center[2]/2)-this.offset)},postTranslate:function(b,c){var d=this.chart,f=this.center;b=this.startAngleRad+b;return{x:d.plotLeft+f[0]+Math.cos(b)*c,y:d.plotTop+f[1]+Math.sin(b)*c}},getPlotBandPath:function(b,c,a){var d=this.center,f=this.startAngleRad,l=d[2]/2,h=[e(a.outerRadius,"100%"),a.innerRadius,e(a.thickness,10)],g=Math.min(this.offset,0),u=/%$/,k,n=this.isCircular;"polygon"===this.options.gridLineInterpolation?d=this.getPlotLinePath(b).concat(this.getPlotLinePath(c,!0)):(b=Math.max(b,
this.min),c=Math.min(c,this.max),n||(h[0]=this.translate(b),h[1]=this.translate(c)),h=w(h,function(b){u.test(b)&&(b=m(b,10)*l/100);return b}),"circle"!==a.shape&&n?(b=f+this.translate(b),c=f+this.translate(c)):(b=-Math.PI/2,c=1.5*Math.PI,k=!0),h[0]-=g,h[2]-=g,d=this.chart.renderer.symbols.arc(this.left+d[0],this.top+d[1],h[0],h[0],{start:Math.min(b,c),end:Math.max(b,c),innerR:e(h[1],h[0]-h[2]),open:k}));return d},getPlotLinePath:function(b,c){var d=this,f=d.center,a=d.chart,l=d.getPosition(b),g,e,
u;d.isCircular?u=["M",f[0]+a.plotLeft,f[1]+a.plotTop,"L",l.x,l.y]:"circle"===d.options.gridLineInterpolation?(b=d.translate(b))&&(u=d.getLinePath(0,b)):(t(a.xAxis,function(b){b.pane===d.pane&&(g=b)}),u=[],b=d.translate(b),f=g.tickPositions,g.autoConnect&&(f=f.concat([f[0]])),c&&(f=[].concat(f).reverse()),t(f,function(c,d){e=g.getPosition(c,b);u.push(d?"L":"M",e.x,e.y)}));return u},getTitlePosition:function(){var b=this.center,c=this.chart,a=this.options.title;return{x:c.plotLeft+b[0]+(a.x||0),y:c.plotTop+
b[1]-{high:.5,middle:.25,low:0}[a.align]*b[2]+(a.y||0)}}};b(g,"init",function(b,f,a){var d=f.angular,h=f.polar,g=a.isX,y=d&&g,k,u=f.options,m=this.pane=f.pane[a.pane||0],t=m.options;if(d){if(v(this,y?c:l),k=!g)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else h&&(v(this,l),this.defaultRadialOptions=(k=g)?this.defaultRadialXOptions:n(this.defaultYAxisOptions,this.defaultRadialYOptions));d||h?(this.isRadial=!0,f.inverted=!1,u.chart.zoomType=null):this.isRadial=!1;k&&(m.axis=this);b.call(this,
f,a);y||!d&&!h||(b=this.options,this.angleRad=(b.angle||0)*Math.PI/180,this.startAngleRad=(t.startAngle-90)*Math.PI/180,this.endAngleRad=(e(t.endAngle,t.startAngle+360)-90)*Math.PI/180,this.offset=b.offset||0,this.isCircular=k)});b(g,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});b(a,"getPosition",function(b,c,a,l,g){var d=this.axis;return d.getPosition?d.getPosition(a):b.call(this,c,a,l,g)});b(a,"getLabelPosition",function(b,c,a,l,g,r,y,k,u){var d=
this.axis,f=r.y,h=20,p=r.align,q=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial?(b=d.getPosition(this.pos,d.center[2]/2+e(r.distance,-25)),"auto"===r.rotation?l.attr({rotation:q}):null===f&&(f=d.chart.renderer.fontMetrics(l.styles.fontSize).b-l.getBBox().height/2),null===p&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(h=0),p=q>h&&q<180-h?"left":q>180+h&&q<360-h?"right":"center"):p="center",l.attr({align:p})),b.x+=r.x,b.y+=f):b=b.call(this,
c,a,l,g,r,y,k,u);return b});b(a,"getMarkPath",function(b,c,a,l,g,r,e){var d=this.axis;d.isRadial?(b=d.getPosition(this.pos,d.center[2]/2+l),c=["M",c,a,"L",b.x,b.y]):c=b.call(this,c,a,l,g,r,e);return c})})(x);(function(a){var t=a.each,v=a.pick,w=a.defined,n=a.seriesType,k=a.seriesTypes,e=a.Series.prototype,m=a.Point.prototype;n("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(b){return[b.low,b.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(b){var c=this.chart,a=this.xAxis.postTranslate(b.rectPlotX,this.yAxis.len-b.plotHigh);b.plotHighX=a.x-c.plotLeft;b.plotHigh=a.y-c.plotTop;b.plotLowX=b.plotX},translate:function(){var b=this,c=b.yAxis,a=!!b.modifyValue;k.area.prototype.translate.apply(b);
t(b.points,function(l){var d=l.low,f=l.high,h=l.plotY;null===f||null===d?(l.isNull=!0,l.plotY=null):(l.plotLow=h,l.plotHigh=c.translate(a?b.modifyValue(f,l):f,0,1,0,1),a&&(l.yBottom=l.plotHigh))});this.chart.polar&&t(this.points,function(c){b.highToXY(c);c.tooltipPos=[(c.plotHighX+c.plotLowX)/2,(c.plotHigh+c.plotLow)/2]})},getGraphPath:function(b){var c=[],a=[],g,d=k.area.prototype.getGraphPath,f,h,q;q=this.options;var p=this.chart.polar&&!1!==q.connectEnds,r=q.connectNulls,e=q.step;b=b||this.points;
for(g=b.length;g--;)f=b[g],f.isNull||p||r||b[g+1]&&!b[g+1].isNull||a.push({plotX:f.plotX,plotY:f.plotY,doCurve:!1}),h={polarPlotY:f.polarPlotY,rectPlotX:f.rectPlotX,yBottom:f.yBottom,plotX:v(f.plotHighX,f.plotX),plotY:f.plotHigh,isNull:f.isNull},a.push(h),c.push(h),f.isNull||p||r||b[g-1]&&!b[g-1].isNull||a.push({plotX:f.plotX,plotY:f.plotY,doCurve:!1});b=d.call(this,b);e&&(!0===e&&(e="left"),q.step={left:"right",center:"center",right:"left"}[e]);c=d.call(this,c);a=d.call(this,a);q.step=e;q=[].concat(b,
c);this.chart.polar||"M"!==a[0]||(a[0]="L");this.graphPath=q;this.areaPath=this.areaPath.concat(b,a);q.isArea=!0;q.xMap=b.xMap;this.areaPath.xMap=b.xMap;return q},drawDataLabels:function(){var b=this.data,c=b.length,a,g=[],d=this.options.dataLabels,f=d.align,h=d.verticalAlign,q=d.inside,p,r,y=this.chart.inverted;if(d.enabled||this._hasPointLabels){for(a=c;a--;)if(p=b[a])r=q?p.plotHigh<p.plotLow:p.plotHigh>p.plotLow,p.y=p.high,p._plotY=p.plotY,p.plotY=p.plotHigh,g[a]=p.dataLabel,p.dataLabel=p.dataLabelUpper,
p.below=r,y?f||(d.align=r?"right":"left"):h||(d.verticalAlign=r?"top":"bottom"),d.x=d.xHigh,d.y=d.yHigh;e.drawDataLabels&&e.drawDataLabels.apply(this,arguments);for(a=c;a--;)if(p=b[a])r=q?p.plotHigh<p.plotLow:p.plotHigh>p.plotLow,p.dataLabelUpper=p.dataLabel,p.dataLabel=g[a],p.y=p.low,p.plotY=p._plotY,p.below=!r,y?f||(d.align=r?"left":"right"):h||(d.verticalAlign=r?"bottom":"top"),d.x=d.xLow,d.y=d.yLow;e.drawDataLabels&&e.drawDataLabels.apply(this,arguments)}d.align=f;d.verticalAlign=h},alignDataLabel:function(){k.column.prototype.alignDataLabel.apply(this,
arguments)},drawPoints:function(){var b=this.points.length,c,a;e.drawPoints.apply(this,arguments);for(a=0;a<b;)c=this.points[a],c.lowerGraphic=c.graphic,c.graphic=c.upperGraphic,c._plotY=c.plotY,c._plotX=c.plotX,c.plotY=c.plotHigh,w(c.plotHighX)&&(c.plotX=c.plotHighX),a++;e.drawPoints.apply(this,arguments);for(a=0;a<b;)c=this.points[a],c.upperGraphic=c.graphic,c.graphic=c.lowerGraphic,c.plotY=c._plotY,c.plotX=c._plotX,a++},setStackedPoints:a.noop},{setState:function(){var b=this.state,c=this.series,
a=c.chart.polar;w(this.plotHigh)||(this.plotHigh=c.yAxis.toPixels(this.high,!0));w(this.plotLow)||(this.plotLow=this.plotY=c.yAxis.toPixels(this.low,!0));m.setState.apply(this,arguments);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);this.state=b;c.stateMarkerGraphic&&(c.lowerStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.upperStateMarkerGraphic);m.setState.apply(this,arguments);this.plotY=this.plotLow;this.graphic=this.lowerGraphic;a&&(this.plotX=
this.plotLowX);c.stateMarkerGraphic&&(c.upperStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.lowerStateMarkerGraphic,c.lowerStateMarkerGraphic=void 0)},haloPath:function(){var b=this.series.chart.polar,c;this.plotY=this.plotLow;b&&(this.plotX=this.plotLowX);c=m.haloPath.apply(this,arguments);this.plotY=this.plotHigh;b&&(this.plotX=this.plotHighX);return c=c.concat(m.haloPath.apply(this,arguments))},destroy:function(){this.upperGraphic&&(this.upperGraphic=this.upperGraphic.destroy());
return m.destroy.apply(this,arguments)}})})(x);(function(a){var t=a.seriesType;t("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(x);(function(a){var t=a.defaultPlotOptions,v=a.each,w=a.merge,n=a.noop,k=a.pick,e=a.seriesType,m=a.seriesTypes.column.prototype;e("columnrange","arearange",w(t.column,t.arearange,{pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var b=this,c=b.yAxis,a=b.xAxis,g=a.startAngleRad,d,f=b.chart,h=
b.xAxis.isRadial,q=Math.max(f.chartWidth,f.chartHeight)+999,p;m.translate.apply(b);v(b.points,function(l){var r=l.shapeArgs,e=b.options.minPointLength,u,m;l.plotHigh=p=Math.min(Math.max(-q,c.translate(l.high,0,1,0,1)),q);l.plotLow=Math.min(Math.max(-q,l.plotY),q);m=p;u=k(l.rectPlotY,l.plotY)-p;Math.abs(u)<e?(e-=u,u+=e,m-=e/2):0>u&&(u*=-1,m-=u);h?(d=l.barX+g,l.shapeType="path",l.shapeArgs={d:b.polarArc(m+u,m,d,d+l.pointWidth)}):(r.height=u,r.y=m,l.tooltipPos=f.inverted?[c.len+c.pos-f.plotLeft-m-u/
2,a.len+a.pos-f.plotTop-r.x-r.width/2,u]:[a.left-f.plotLeft+r.x+r.width/2,c.pos-f.plotTop+m+u/2,u])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:n,getSymbol:n,crispCol:m.crispCol,drawPoints:m.drawPoints,drawTracker:m.drawTracker,getColumnMetrics:m.getColumnMetrics,pointAttribs:m.pointAttribs,animate:function(){return m.animate.apply(this,arguments)},polarArc:function(){return m.polarArc.apply(this,arguments)},translate3dPoints:function(){return m.translate3dPoints.apply(this,
arguments)},translate3dShapes:function(){return m.translate3dShapes.apply(this,arguments)}},{setState:m.pointClass.prototype.setState})})(x);(function(a){var t=a.each,v=a.isNumber,w=a.merge,n=a.pick,k=a.pInt,e=a.Series,m=a.seriesType,b=a.TrackerMixin;m("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,
forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var b=this.yAxis,a=this.options,g=b.center;this.generatePoints();t(this.points,function(c){var d=w(a.dial,c.dial),l=k(n(d.radius,80))*g[2]/200,q=k(n(d.baseLength,70))*l/100,p=k(n(d.rearLength,10))*l/100,r=d.baseWidth||3,e=d.topWidth||1,m=a.overshoot,u=b.startAngleRad+b.translate(c.y,null,null,null,!0);v(m)?(m=m/180*Math.PI,u=Math.max(b.startAngleRad-m,Math.min(b.endAngleRad+m,u))):!1===a.wrap&&(u=Math.max(b.startAngleRad,
Math.min(b.endAngleRad,u)));u=180*u/Math.PI;c.shapeType="path";c.shapeArgs={d:d.path||["M",-p,-r/2,"L",q,-r/2,l,-e/2,l,e/2,q,r/2,-p,r/2,"z"],translateX:g[0],translateY:g[1],rotation:u};c.plotX=g[0];c.plotY=g[1]})},drawPoints:function(){var b=this,a=b.yAxis.center,g=b.pivot,d=b.options,f=d.pivot,h=b.chart.renderer;t(b.points,function(c){var a=c.graphic,f=c.shapeArgs,l=f.d,g=w(d.dial,c.dial);a?(a.animate(f),f.d=l):(c.graphic=h[c.shapeType](f).attr({rotation:f.rotation,zIndex:1}).addClass("highcharts-dial").add(b.group),
c.graphic.attr({stroke:g.borderColor||"none","stroke-width":g.borderWidth||0,fill:g.backgroundColor||"#000000"}))});g?g.animate({translateX:a[0],translateY:a[1]}):(b.pivot=h.circle(0,0,n(f.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],a[1]).add(b.group),b.pivot.attr({"stroke-width":f.borderWidth||0,stroke:f.borderColor||"#cccccc",fill:f.backgroundColor||"#000000"}))},animate:function(b){var c=this;b||(t(c.points,function(b){var a=b.graphic;a&&(a.attr({rotation:180*c.yAxis.startAngleRad/
Math.PI}),a.animate({rotation:b.shapeArgs.rotation},c.options.animation))}),c.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);e.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(b,a){e.prototype.setData.call(this,b,!1);this.processData();this.generatePoints();n(a,!0)&&this.chart.redraw()},drawTracker:b&&b.drawTrackerPoint},{setState:function(b){this.state=b}})})(x);
(function(a){var t=a.each,v=a.noop,w=a.pick,n=a.seriesType,k=a.seriesTypes;n("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},
whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",pointAttribs:function(a){var e=this.options,b=a&&a.color||this.color;return{fill:a.fillColor||e.fillColor||b,stroke:e.lineColor||b,"stroke-width":e.lineWidth||0}},drawDataLabels:v,translate:function(){var a=this.yAxis,m=this.pointArrayMap;k.column.prototype.translate.apply(this);t(this.points,function(b){t(m,function(c){null!==b[c]&&(b[c+"Plot"]=a.translate(b[c],
0,1,0,1))})})},drawPoints:function(){var a=this,k=a.options,b=a.chart.renderer,c,l,g,d,f,h,q=0,p,r,y,n,u=!1!==a.doQuartiles,v,A=a.options.whiskerLength;t(a.points,function(e){var m=e.graphic,t=m?"animate":"attr",J=e.shapeArgs,x={},C={},H={},I=e.color||a.color;void 0!==e.plotY&&(p=J.width,r=Math.floor(J.x),y=r+p,n=Math.round(p/2),c=Math.floor(u?e.q1Plot:e.lowPlot),l=Math.floor(u?e.q3Plot:e.lowPlot),g=Math.floor(e.highPlot),d=Math.floor(e.lowPlot),m||(e.graphic=m=b.g("point").add(a.group),e.stem=b.path().addClass("highcharts-boxplot-stem").add(m),
A&&(e.whiskers=b.path().addClass("highcharts-boxplot-whisker").add(m)),u&&(e.box=b.path(void 0).addClass("highcharts-boxplot-box").add(m)),e.medianShape=b.path(void 0).addClass("highcharts-boxplot-median").add(m)),x.stroke=e.stemColor||k.stemColor||I,x["stroke-width"]=w(e.stemWidth,k.stemWidth,k.lineWidth),x.dashstyle=e.stemDashStyle||k.stemDashStyle,e.stem.attr(x),A&&(C.stroke=e.whiskerColor||k.whiskerColor||I,C["stroke-width"]=w(e.whiskerWidth,k.whiskerWidth,k.lineWidth),e.whiskers.attr(C)),u&&
(m=a.pointAttribs(e),e.box.attr(m)),H.stroke=e.medianColor||k.medianColor||I,H["stroke-width"]=w(e.medianWidth,k.medianWidth,k.lineWidth),e.medianShape.attr(H),h=e.stem.strokeWidth()%2/2,q=r+n+h,e.stem[t]({d:["M",q,l,"L",q,g,"M",q,c,"L",q,d]}),u&&(h=e.box.strokeWidth()%2/2,c=Math.floor(c)+h,l=Math.floor(l)+h,r+=h,y+=h,e.box[t]({d:["M",r,l,"L",r,c,"L",y,c,"L",y,l,"L",r,l,"z"]})),A&&(h=e.whiskers.strokeWidth()%2/2,g+=h,d+=h,v=/%$/.test(A)?n*parseFloat(A)/100:A/2,e.whiskers[t]({d:["M",q-v,g,"L",q+v,
g,"M",q-v,d,"L",q+v,d]})),f=Math.round(e.medianPlot),h=e.medianShape.strokeWidth()%2/2,f+=h,e.medianShape[t]({d:["M",r,f,"L",y,f]}))})},setStackedPoints:v})})(x);(function(a){var t=a.each,v=a.noop,w=a.seriesType,n=a.seriesTypes;w("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",
pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:n.arearange?function(){var a=this.pointValKey;n.arearange.prototype.drawDataLabels.call(this);t(this.data,function(e){e.y=e[a]})}:v,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||n.column.prototype.getColumnMetrics.call(this)}})})(x);(function(a){var t=a.correctFloat,v=a.isNumber,w=a.pick,n=a.Point,k=a.Series,e=a.seriesType,m=a.seriesTypes;
e("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var b=this.options,c=this.yAxis,a,g,d,f,h,e,p,r,k,n,u=w(b.minPointLength,5),v=u/2,x=b.threshold,D=b.stacking,z;m.column.prototype.translate.apply(this);r=k=x;g=this.points;a=0;for(b=g.length;a<b;a++)d=g[a],p=this.processedYData[a],f=d.shapeArgs,h=D&&c.stacks[(this.negStacks&&p<x?"-":"")+this.stackKey],z=this.getStackIndicator(z,
d.x,this.index),n=h?h[d.x].points[z.key]:[0,p],d.isSum?d.y=t(p):d.isIntermediateSum&&(d.y=t(p-k)),e=Math.max(r,r+d.y)+n[0],f.y=c.translate(e,0,1,0,1),d.isSum?(f.y=c.translate(n[1],0,1,0,1),f.height=Math.min(c.translate(n[0],0,1,0,1),c.len)-f.y):d.isIntermediateSum?(f.y=c.translate(n[1],0,1,0,1),f.height=Math.min(c.translate(k,0,1,0,1),c.len)-f.y,k=n[1]):(f.height=0<p?c.translate(r,0,1,0,1)-f.y:c.translate(r,0,1,0,1)-c.translate(r-p,0,1,0,1),r+=h&&h[d.x]?h[d.x].total:p),0>f.height&&(f.y+=f.height,
f.height*=-1),d.plotY=f.y=Math.round(f.y)-this.borderWidth%2/2,f.height=Math.max(Math.round(f.height),.001),d.yBottom=f.y+f.height,f.height<=u&&!d.isNull?(f.height=u,f.y-=v,d.plotY=f.y,d.minPointLengthOffset=0>d.y?-v:v):d.minPointLengthOffset=0,f=d.plotY+(d.negative?f.height:0),this.chart.inverted?d.tooltipPos[0]=c.len-f:d.tooltipPos[1]=f},processData:function(b){var c=this.yData,a=this.options.data,e,d=c.length,f,h,q,p,r,m;h=f=q=p=this.options.threshold||0;for(m=0;m<d;m++)r=c[m],e=a&&a[m]?a[m]:{},
"sum"===r||e.isSum?c[m]=t(h):"intermediateSum"===r||e.isIntermediateSum?c[m]=t(f):(h+=r,f+=r),q=Math.min(h,q),p=Math.max(h,p);k.prototype.processData.call(this,b);this.options.stacking||(this.dataMin=q,this.dataMax=p)},toYData:function(b){return b.isSum?0===b.x?null:"sum":b.isIntermediateSum?0===b.x?null:"intermediateSum":b.y},pointAttribs:function(b,a){var c=this.options.upColor;c&&!b.options.color&&(b.color=0<b.y?c:null);b=m.column.prototype.pointAttribs.call(this,b,a);delete b.dashstyle;return b},
getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var b=this.data,a=b.length,e=this.graph.strokeWidth()+this.borderWidth,e=Math.round(e)%2/2,g=this.yAxis.reversed,d=[],f,h,q;for(q=1;q<a;q++){h=b[q].shapeArgs;f=b[q-1].shapeArgs;h=["M",f.x+f.width,f.y+b[q-1].minPointLengthOffset+e,"L",h.x,f.y+b[q-1].minPointLengthOffset+e];if(0>b[q-1].y&&!g||0<b[q-1].y&&g)h[2]+=f.height,h[5]+=f.height;d=d.concat(h)}return d},drawGraph:function(){k.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},
setStackedPoints:function(){var b=this.options,a,e;k.prototype.setStackedPoints.apply(this,arguments);a=this.stackedYData?this.stackedYData.length:0;for(e=1;e<a;e++)b.data[e].isSum||b.data[e].isIntermediateSum||(this.stackedYData[e]+=this.stackedYData[e-1])},getExtremes:function(){if(this.options.stacking)return k.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var b=n.prototype.getClassName.call(this);this.isSum?b+=" highcharts-sum":this.isIntermediateSum&&(b+=" highcharts-intermediate-sum");
return b},isValid:function(){return v(this.y,!0)||this.isSum||this.isIntermediateSum}})})(x);(function(a){var t=a.Series,v=a.seriesType,w=a.seriesTypes;v("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=t.prototype.getGraphPath.call(this),k=a.length+1;k--;)(k===a.length||"M"===a[k])&&0<k&&a.splice(k,0,"z");return this.areaPath=a},drawGraph:function(){this.options.fillColor=
this.color;w.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:t.prototype.drawTracker,setStackedPoints:a.noop})})(x);(function(a){var t=a.arrayMax,v=a.arrayMin,w=a.Axis,n=a.color,k=a.each,e=a.isNumber,m=a.noop,b=a.pick,c=a.pInt,l=a.Point,g=a.Series,d=a.seriesType,f=a.seriesTypes;d("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},
symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(a,c){var d=b(this.options.marker.fillOpacity,.5);a=g.prototype.pointAttribs.call(this,a,c);1!==d&&(a.fill=n(a.fill).setOpacity(d).get("rgba"));
return a},getRadii:function(b,a,c,d){var f,e,h,g=this.zData,l=[],p=this.options,r="width"!==p.sizeBy,q=p.zThreshold,k=a-b;e=0;for(f=g.length;e<f;e++)h=g[e],p.sizeByAbsoluteValue&&null!==h&&(h=Math.abs(h-q),a=Math.max(a-q,Math.abs(b-q)),b=0),null===h?h=null:h<b?h=c/2-1:(h=0<k?(h-b)/k:.5,r&&0<=h&&(h=Math.sqrt(h)),h=Math.ceil(c+h*(d-c))/2),l.push(h);this.radii=l},animate:function(b){var a=this.options.animation;b||(k(this.points,function(b){var c=b.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,
height:c.height},c.attr({x:b.plotX,y:b.plotY,width:1,height:1}),c.animate(d,a))}),this.animate=null)},translate:function(){var b,c=this.data,d,g,l=this.radii;f.scatter.prototype.translate.call(this);for(b=c.length;b--;)d=c[b],g=l?l[b]:0,e(g)&&g>=this.minPxSize/2?(d.marker=a.extend(d.marker,{radius:g,width:2*g,height:2*g}),d.dlBox={x:d.plotX-g,y:d.plotY-g,width:2*g,height:2*g}):d.shapeArgs=d.plotY=d.dlBox=void 0},alignDataLabel:f.column.prototype.alignDataLabel,buildKDTree:m,applyZones:m},{haloPath:function(b){return l.prototype.haloPath.call(this,
0===b?0:(this.marker?this.marker.radius||0:0)+b)},ttBelow:!1});w.prototype.beforePadding=function(){var a=this,d=this.len,f=this.chart,g=0,l=d,m=this.isXAxis,n=m?"xData":"yData",w=this.min,x={},D=Math.min(f.plotWidth,f.plotHeight),z=Number.MAX_VALUE,E=-Number.MAX_VALUE,F=this.max-w,B=d/F,G=[];k(this.series,function(d){var e=d.options;!d.bubblePadding||!d.visible&&f.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,G.push(d),m&&(k(["minSize","maxSize"],function(b){var a=e[b],d=/%$/.test(a),
a=c(a);x[b]=d?D*a/100:a}),d.minPxSize=x.minSize,d.maxPxSize=Math.max(x.maxSize,x.minSize),d=d.zData,d.length&&(z=b(e.zMin,Math.min(z,Math.max(v(d),!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),E=b(e.zMax,Math.max(E,t(d))))))});k(G,function(b){var c=b[n],d=c.length,f;m&&b.getRadii(z,E,b.minPxSize,b.maxPxSize);if(0<F)for(;d--;)e(c[d])&&a.dataMin<=c[d]&&c[d]<=a.dataMax&&(f=b.radii[d],g=Math.min((c[d]-w)*B-f,g),l=Math.max((c[d]-w)*B+f,l))});G.length&&0<F&&!this.isLog&&(l-=d,B*=(d+g-l)/d,k([["min",
"userMin",g],["max","userMax",l]],function(c){void 0===b(a.options[c[0]],a[c[1]])&&(a[c[0]]+=c[2]/B)}))}})(x);(function(a){function t(b,a){var c=this.chart,e=this.options.animation,d=this.group,f=this.markerGroup,h=this.xAxis.center,k=c.plotLeft,m=c.plotTop;c.polar?c.renderer.isSVG&&(!0===e&&(e={}),a?(b={translateX:h[0]+k,translateY:h[1]+m,scaleX:.001,scaleY:.001},d.attr(b),f&&f.attr(b)):(b={translateX:k,translateY:m,scaleX:1,scaleY:1},d.animate(b,e),f&&f.animate(b,e),this.animate=null)):b.call(this,
a)}var v=a.each,w=a.pick,n=a.seriesTypes,k=a.wrap,e=a.Series.prototype,m=a.Pointer.prototype;e.searchPointByAngle=function(b){var a=this.chart,e=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(b.chartX-e[0]-a.plotLeft,b.chartY-e[1]-a.plotTop)})};e.getConnectors=function(b,a,e,g){var c,f,h,l,k,m,n,t;f=g?1:0;c=0<=a&&a<=b.length-1?a:0>a?b.length-1+a:0;a=0>c-1?b.length-(1+f):c-1;f=c+1>b.length-1?f:c+1;h=b[a];f=b[f];l=h.plotX;h=h.plotY;k=f.plotX;m=f.plotY;f=b[c].plotX;
c=b[c].plotY;l=(1.5*f+l)/2.5;h=(1.5*c+h)/2.5;k=(1.5*f+k)/2.5;n=(1.5*c+m)/2.5;m=Math.sqrt(Math.pow(l-f,2)+Math.pow(h-c,2));t=Math.sqrt(Math.pow(k-f,2)+Math.pow(n-c,2));l=Math.atan2(h-c,l-f);n=Math.PI/2+(l+Math.atan2(n-c,k-f))/2;Math.abs(l-n)>Math.PI/2&&(n-=Math.PI);l=f+Math.cos(n)*m;h=c+Math.sin(n)*m;k=f+Math.cos(Math.PI+n)*t;n=c+Math.sin(Math.PI+n)*t;f={rightContX:k,rightContY:n,leftContX:l,leftContY:h,plotX:f,plotY:c};e&&(f.prevPointCont=this.getConnectors(b,a,!1,g));return f};k(e,"buildKDTree",
function(b){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy");b.apply(this)});e.toXY=function(b){var a,e=this.chart,g=b.plotX;a=b.plotY;b.rectPlotX=g;b.rectPlotY=a;a=this.xAxis.postTranslate(b.plotX,this.yAxis.len-a);b.plotX=b.polarPlotX=a.x-e.plotLeft;b.plotY=b.polarPlotY=a.y-e.plotTop;this.kdByAngle?(e=(g/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>e&&(e+=360),b.clientX=e):b.clientX=b.plotX};n.spline&&(k(n.spline.prototype,
"getPointSpline",function(b,a,e,g){this.chart.polar?g?(b=this.getConnectors(a,g,!0,this.connectEnds),b=["C",b.prevPointCont.rightContX,b.prevPointCont.rightContY,b.leftContX,b.leftContY,b.plotX,b.plotY]):b=["M",e.plotX,e.plotY]:b=b.call(this,a,e,g);return b}),n.areasplinerange&&(n.areasplinerange.prototype.getPointSpline=n.spline.prototype.getPointSpline));k(e,"translate",function(b){var a=this.chart;b.call(this);if(a.polar&&(this.kdByAngle=a.tooltip&&a.tooltip.shared,!this.preventPostTranslate))for(b=
this.points,a=b.length;a--;)this.toXY(b[a])});k(e,"getGraphPath",function(b,a){var c=this,e,d,f;if(this.chart.polar){a=a||this.points;for(e=0;e<a.length;e++)if(!a[e].isNull){d=e;break}!1!==this.options.connectEnds&&void 0!==d&&(this.connectEnds=!0,a.splice(a.length,0,a[d]),f=!0);v(a,function(b){void 0===b.polarPlotY&&c.toXY(b)})}e=b.apply(this,[].slice.call(arguments,1));f&&a.pop();return e});k(e,"animate",t);n.column&&(n=n.column.prototype,n.polarArc=function(b,a,e,g){var c=this.xAxis.center,f=this.yAxis.len;
return this.chart.renderer.symbols.arc(c[0],c[1],f-a,null,{start:e,end:g,innerR:f-w(b,f)})},k(n,"animate",t),k(n,"translate",function(b){var a=this.xAxis,e=a.startAngleRad,g,d,f;this.preventPostTranslate=!0;b.call(this);if(a.isRadial)for(g=this.points,f=g.length;f--;)d=g[f],b=d.barX+e,d.shapeType="path",d.shapeArgs={d:this.polarArc(d.yBottom,d.plotY,b,b+d.pointWidth)},this.toXY(d),d.tooltipPos=[d.plotX,d.plotY],d.ttBelow=d.plotY>a.center[1]}),k(n,"alignDataLabel",function(a,c,l,g,d,f){this.chart.polar?
(a=c.rectPlotX/Math.PI*180,null===g.align&&(g.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===g.verticalAlign&&(g.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),e.alignDataLabel.call(this,c,l,g,d,f)):a.call(this,c,l,g,d,f)}));k(m,"getCoordinates",function(a,c){var b=this.chart,e={xAxis:[],yAxis:[]};b.polar?v(b.axes,function(a){var d=a.isXAxis,g=a.center,k=c.chartX-g[0]-b.plotLeft,g=c.chartY-g[1]-b.plotTop;e[d?"xAxis":"yAxis"].push({axis:a,value:a.translate(d?Math.PI-
Math.atan2(k,g):Math.sqrt(Math.pow(k,2)+Math.pow(g,2)),!0)})}):e=a.call(this,c);return e});k(a.Chart.prototype,"getAxes",function(b){this.pane||(this.pane=[]);v(a.splat(this.options.pane),function(b){new a.Pane(b,this)},this);b.call(this)});k(a.Chart.prototype,"drawChartBox",function(a){a.call(this);v(this.pane,function(a){a.render()})});k(a.Chart.prototype,"get",function(b,c){return a.find(this.pane,function(a){return a.options.id===c})||b.call(this,c)})})(x)});
/*
  Highcharts JS v6.0.1 (2017-10-05)
 Solid angular gauge module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(l){"object"===typeof module&&module.exports?module.exports=l:l(Highcharts)})(function(l){(function(e){var l=e.pInt,u=e.pick,m=e.each,r=e.isNumber,w=e.wrap,v;w(e.Renderer.prototype.symbols,"arc",function(a,f,d,c,e,b){a=a(f,d,c,e,b);b.rounded&&(c=((b.r||c)-b.innerR)/2,b=["A",c,c,0,1,1,a[12],a[13]],a.splice.apply(a,[a.length-1,0].concat(["A",c,c,0,1,1,a[1],a[2]])),a.splice.apply(a,[11,3].concat(b)));return a});v={initDataClasses:function(a){var f=this.chart,d,c=0,t=this.options;this.dataClasses=
d=[];m(a.dataClasses,function(b,h){b=e.merge(b);d.push(b);b.color||("category"===t.dataClassColor?(h=f.options.colors,b.color=h[c++],c===h.length&&(c=0)):b.color=e.color(t.minColor).tweenTo(e.color(t.maxColor),h/(a.dataClasses.length-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];m(this.stops,function(a){a.color=e.color(a[1])})},toColor:function(a,f){var d=this.stops,c,e,b=this.dataClasses,h,g;if(b)for(g=b.length;g--;){if(h=b[g],c=h.from,d=
h.to,(void 0===c||a>=c)&&(void 0===d||a<=d)){e=h.color;f&&(f.dataClass=g);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min);for(g=d.length;g--&&!(a>d[g][0]););c=d[g]||d[g+1];d=d[g+1]||c;a=1-(d[0]-a)/(d[0]-c[0]||1);e=c.color.tweenTo(d.color,a)}return e}};e.seriesType("solidgauge","gauge",{colorByPoint:!0},{translate:function(){var a=this.yAxis;e.extend(a,v);!a.dataClasses&&a.options.dataClasses&&a.initDataClasses(a.options);a.initStops(a.options);e.seriesTypes.gauge.prototype.translate.call(this)},
drawPoints:function(){var a=this,f=a.yAxis,d=f.center,c=a.options,t=a.chart.renderer,b=c.overshoot,h=r(b)?b/180*Math.PI:0,g;r(c.threshold)&&(g=f.startAngleRad+f.translate(c.threshold,null,null,null,!0));this.thresholdAngleRad=u(g,f.startAngleRad);m(a.points,function(b){var g=b.graphic,k=f.startAngleRad+f.translate(b.y,null,null,null,!0),m=l(u(b.options.radius,c.radius,100))*d[2]/200,n=l(u(b.options.innerRadius,c.innerRadius,60))*d[2]/200,p=f.toColor(b.y,b),q=Math.min(f.startAngleRad,f.endAngleRad),
r=Math.max(f.startAngleRad,f.endAngleRad);"none"===p&&(p=b.color||a.color||"none");"none"!==p&&(b.color=p);k=Math.max(q-h,Math.min(r+h,k));!1===c.wrap&&(k=Math.max(q,Math.min(r,k)));q=Math.min(k,a.thresholdAngleRad);k=Math.max(k,a.thresholdAngleRad);k-q>2*Math.PI&&(k=q+2*Math.PI);b.shapeArgs=n={x:d[0],y:d[1],r:m,innerR:n,start:q,end:k,rounded:c.rounded};b.startR=m;g?(b=n.d,g.animate(e.extend({fill:p},n)),b&&(n.d=b)):(b.graphic=t.arc(n).addClass(b.getClassName(),!0).attr({fill:p,"sweep-flag":0}).add(a.group),
"square"!==c.linecap&&b.graphic.attr({"stroke-linecap":"round","stroke-linejoin":"round"}),b.graphic.attr({stroke:c.borderColor||"none","stroke-width":c.borderWidth||0}))})},animate:function(a){a||(this.startAngleRad=this.thresholdAngleRad,e.seriesTypes.pie.prototype.animate.call(this,a))}})})(l)});
/*!
* Parsley.js
* Version 2.7.0 - built Wed, Mar 1st 2017, 3:53 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/

// The source code below is generated by babel as
// Parsley is written in ECMAScript 6
//
var _slice = Array.prototype.slice;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.parsley = factory(global.jQuery);
})(this, function ($) {
  'use strict';

  var globalID = 1;
  var pastWarnings = {};

  var Utils__Utils = {
    // Parsley DOM-API
    // returns object from dom attributes and values
    attr: function attr($element, namespace, obj) {
      var i;
      var attribute;
      var attributes;
      var regex = new RegExp('^' + namespace, 'i');

      if ('undefined' === typeof obj) obj = {};else {
        // Clear all own properties. This won't affect prototype's values
        for (i in obj) {
          if (obj.hasOwnProperty(i)) delete obj[i];
        }
      }

      if ('undefined' === typeof $element || 'undefined' === typeof $element[0]) return obj;

      attributes = $element[0].attributes;
      for (i = attributes.length; i--;) {
        attribute = attributes[i];

        if (attribute && attribute.specified && regex.test(attribute.name)) {
          obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
        }
      }

      return obj;
    },

    checkAttr: function checkAttr($element, namespace, _checkAttr) {
      return $element.is('[' + namespace + _checkAttr + ']');
    },

    setAttr: function setAttr($element, namespace, attr, value) {
      $element[0].setAttribute(this.dasherize(namespace + attr), String(value));
    },

    generateID: function generateID() {
      return '' + globalID++;
    },

    /** Third party functions **/
    // Zepto deserialize function
    deserializeValue: function deserializeValue(value) {
      var num;

      try {
        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
      } catch (e) {
        return value;
      }
    },

    // Zepto camelize function
    camelize: function camelize(str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },

    // Zepto dasherize function
    dasherize: function dasherize(str) {
      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
    },

    warn: function warn() {
      var _window$console;

      if (window.console && 'function' === typeof window.console.warn) (_window$console = window.console).warn.apply(_window$console, arguments);
    },

    warnOnce: function warnOnce(msg) {
      if (!pastWarnings[msg]) {
        pastWarnings[msg] = true;
        this.warn.apply(this, arguments);
      }
    },

    _resetWarnings: function _resetWarnings() {
      pastWarnings = {};
    },

    trimString: function trimString(string) {
      return string.replace(/^\s+|\s+$/g, '');
    },

    parse: {
      date: function date(string) {
        var parsed = string.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
        if (!parsed) return null;

        var _parsed$map = parsed.map(function (x) {
          return parseInt(x, 10);
        });

        var _parsed$map2 = _slicedToArray(_parsed$map, 4);

        var _ = _parsed$map2[0];
        var year = _parsed$map2[1];
        var month = _parsed$map2[2];
        var day = _parsed$map2[3];

        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return null;
        return date;
      },
      string: function string(_string) {
        return _string;
      },
      integer: function integer(string) {
        if (isNaN(string)) return null;
        return parseInt(string, 10);
      },
      number: function number(string) {
        if (isNaN(string)) throw null;
        return parseFloat(string);
      },
      'boolean': function _boolean(string) {
        return !/^\s*false\s*$/i.test(string);
      },
      object: function object(string) {
        return Utils__Utils.deserializeValue(string);
      },
      regexp: function regexp(_regexp) {
        var flags = '';

        // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
        if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
          // Replace the regexp literal string with the first match group: ([gimy]*)
          // If no flag is present, this will be a blank string
          flags = _regexp.replace(/.*\/([gimy]*)$/, '$1');
          // Again, replace the regexp literal string with the first match group:
          // everything excluding the opening and closing slashes and the flags
          _regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        } else {
          // Anchor regexp:
          _regexp = '^' + _regexp + '$';
        }
        return new RegExp(_regexp, flags);
      }
    },

    parseRequirement: function parseRequirement(requirementType, string) {
      var converter = this.parse[requirementType || 'string'];
      if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
      var converted = converter(string);
      if (converted === null) throw 'Requirement is not a ' + requirementType + ': "' + string + '"';
      return converted;
    },

    namespaceEvents: function namespaceEvents(events, namespace) {
      events = this.trimString(events || '').split(/\s+/);
      if (!events[0]) return '';
      return $.map(events, function (evt) {
        return evt + '.' + namespace;
      }).join(' ');
    },

    difference: function difference(array, remove) {
      // This is O(N^2), should be optimized
      var result = [];
      $.each(array, function (_, elem) {
        if (remove.indexOf(elem) == -1) result.push(elem);
      });
      return result;
    },

    // Alter-ego to native Promise.all, but for jQuery
    all: function all(promises) {
      // jQuery treats $.when() and $.when(singlePromise) differently; let's avoid that and add spurious elements
      return $.when.apply($, _toConsumableArray(promises).concat([42, 42]));
    },

    // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    objectCreate: Object.create || (function () {
      var Object = function Object() {};
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }
        if (typeof prototype != 'object') {
          throw TypeError('Argument must be an object');
        }
        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
        return result;
      };
    })(),

    _SubmitSelector: 'input[type="submit"], button:submit'
  };

  var Utils__default = Utils__Utils;

  // All these options could be overriden and specified directly in DOM using
  // `data-parsley-` default DOM-API
  // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
  // eg: `data-parsley-stop-on-first-failing-constraint="false"`

  var Defaults = {
    // ### General

    // Default data-namespace for DOM API
    namespace: 'data-parsley-',

    // Supported inputs by default
    inputs: 'input, textarea, select',

    // Excluded inputs by default
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',

    // Stop validating field on highest priority failing constraint
    priorityEnabled: true,

    // ### Field only

    // identifier used to group together inputs (e.g. radio buttons...)
    multiple: null,

    // identifier (or array of identifiers) used to validate only a select group of inputs
    group: null,

    // ### UI
    // Enable\Disable error messages
    uiEnabled: true,

    // Key events threshold before validation
    validationThreshold: 3,

    // Focused field on form validation error. 'first'|'last'|'none'
    focus: 'first',

    // event(s) that will trigger validation before first failure. eg: `input`...
    trigger: false,

    // event(s) that will trigger validation after first failure.
    triggerAfterFailure: 'input',

    // Class that would be added on every failing validation Parsley field
    errorClass: 'parsley-error',

    // Same for success validation
    successClass: 'parsley-success',

    // Return the `$element` that will receive these above success or error classes
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    classHandler: function classHandler(Field) {},

    // Return the `$element` where errors will be appended
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    errorsContainer: function errorsContainer(Field) {},

    // ul elem that would receive errors' list
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',

    // li elem that would receive error message
    errorTemplate: '<li></li>'
  };

  var Base = function Base() {
    this.__id__ = Utils__default.generateID();
  };

  Base.prototype = {
    asyncSupport: true, // Deprecated

    _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
      var _this = this;

      var pipe = function pipe() {
        var r = $.Deferred();
        if (true !== _this.validationResult) r.reject();
        return r.resolve().promise();
      };
      return [pipe, pipe];
    },

    actualizeOptions: function actualizeOptions() {
      Utils__default.attr(this.$element, this.options.namespace, this.domOptions);
      if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
      return this;
    },

    _resetOptions: function _resetOptions(initOptions) {
      this.domOptions = Utils__default.objectCreate(this.parent.options);
      this.options = Utils__default.objectCreate(this.domOptions);
      // Shallow copy of ownProperties of initOptions:
      for (var i in initOptions) {
        if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
      }
      this.actualizeOptions();
    },

    _listeners: null,

    // Register a callback for the given event name
    // Callback is called with context as the first argument and the `this`
    // The context is the current parsley instance, or window.Parsley if global
    // A return value of `false` will interrupt the calls
    on: function on(name, fn) {
      this._listeners = this._listeners || {};
      var queue = this._listeners[name] = this._listeners[name] || [];
      queue.push(fn);

      return this;
    },

    // Deprecated. Use `on` instead
    subscribe: function subscribe(name, fn) {
      $.listenTo(this, name.toLowerCase(), fn);
    },

    // Unregister a callback (or all if none is given) for the given event name
    off: function off(name, fn) {
      var queue = this._listeners && this._listeners[name];
      if (queue) {
        if (!fn) {
          delete this._listeners[name];
        } else {
          for (var i = queue.length; i--;) if (queue[i] === fn) queue.splice(i, 1);
        }
      }
      return this;
    },

    // Deprecated. Use `off`
    unsubscribe: function unsubscribe(name, fn) {
      $.unsubscribeTo(this, name.toLowerCase());
    },

    // Trigger an event of the given name
    // A return value of `false` interrupts the callback chain
    // Returns false if execution was interrupted
    trigger: function trigger(name, target, extraArg) {
      target = target || this;
      var queue = this._listeners && this._listeners[name];
      var result;
      var parentResult;
      if (queue) {
        for (var i = queue.length; i--;) {
          result = queue[i].call(target, target, extraArg);
          if (result === false) return result;
        }
      }
      if (this.parent) {
        return this.parent.trigger(name, target, extraArg);
      }
      return true;
    },

    asyncIsValid: function asyncIsValid(group, force) {
      Utils__default.warnOnce("asyncIsValid is deprecated; please use whenValid instead");
      return this.whenValid({ group: group, force: force });
    },

    _findRelated: function _findRelated() {
      return this.options.multiple ? this.parent.$element.find('[' + this.options.namespace + 'multiple="' + this.options.multiple + '"]') : this.$element;
    }
  };

  var convertArrayRequirement = function convertArrayRequirement(string, length) {
    var m = string.match(/^\s*\[(.*)\]\s*$/);
    if (!m) throw 'Requirement is not an array: "' + string + '"';
    var values = m[1].split(',').map(Utils__default.trimString);
    if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
    return values;
  };

  var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
    var main = null;
    var extra = {};
    for (var key in requirementSpec) {
      if (key) {
        var value = extraOptionReader(key);
        if ('string' === typeof value) value = Utils__default.parseRequirement(requirementSpec[key], value);
        extra[key] = value;
      } else {
        main = Utils__default.parseRequirement(requirementSpec[key], string);
      }
    }
    return [main, extra];
  };

  // A Validator needs to implement the methods `validate` and `parseRequirements`

  var Validator = function Validator(spec) {
    $.extend(true, this, spec);
  };

  Validator.prototype = {
    // Returns `true` iff the given `value` is valid according the given requirements.
    validate: function validate(value, requirementFirstArg) {
      if (this.fn) {
        // Legacy style validator

        if (arguments.length > 3) // If more args then value, requirement, instance...
          requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest
        return this.fn(value, requirementFirstArg);
      }

      if ($.isArray(value)) {
        if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
        return this.validateMultiple.apply(this, arguments);
      } else {
        var instance = arguments[arguments.length - 1];
        if (this.validateDate && instance._isDateInput()) {
          arguments[0] = Utils__default.parse.date(arguments[0]);
          if (arguments[0] === null) return false;
          return this.validateDate.apply(this, arguments);
        }
        if (this.validateNumber) {
          if (isNaN(value)) return false;
          arguments[0] = parseFloat(arguments[0]);
          return this.validateNumber.apply(this, arguments);
        }
        if (this.validateString) {
          return this.validateString.apply(this, arguments);
        }
        throw 'Validator `' + this.name + '` only handles multiple values';
      }
    },

    // Parses `requirements` into an array of arguments,
    // according to `this.requirementType`
    parseRequirements: function parseRequirements(requirements, extraOptionReader) {
      if ('string' !== typeof requirements) {
        // Assume requirement already parsed
        // but make sure we return an array
        return $.isArray(requirements) ? requirements : [requirements];
      }
      var type = this.requirementType;
      if ($.isArray(type)) {
        var values = convertArrayRequirement(requirements, type.length);
        for (var i = 0; i < values.length; i++) values[i] = Utils__default.parseRequirement(type[i], values[i]);
        return values;
      } else if ($.isPlainObject(type)) {
        return convertExtraOptionRequirement(type, requirements, extraOptionReader);
      } else {
        return [Utils__default.parseRequirement(type, requirements)];
      }
    },
    // Defaults:
    requirementType: 'string',

    priority: 2

  };

  var ValidatorRegistry = function ValidatorRegistry(validators, catalog) {
    this.__class__ = 'ValidatorRegistry';

    // Default Parsley locale is en
    this.locale = 'en';

    this.init(validators || {}, catalog || {});
  };

  var typeTesters = {
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

    // Follow https://www.w3.org/TR/html5/infrastructure.html#floating-point-numbers
    number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,

    integer: /^-?\d+$/,

    digits: /^\d+$/,

    alphanum: /^\w+$/i,

    date: {
      test: function test(value) {
        return Utils__default.parse.date(value) !== null;
      }
    },

    url: new RegExp("^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:" +
    // IP address exclusion
    // private & local networks
    // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
    // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
    // host name
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    // domain name
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' + ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:/\\S*)?" + "$", 'i')
  };
  typeTesters.range = typeTesters.number;

  // See http://stackoverflow.com/a/10454560/8279
  var decimalPlaces = function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) - (
    // Adjust for scientific notation.
    match[2] ? +match[2] : 0));
  };

  // parseArguments('number', ['1', '2']) => [1, 2]
  var ValidatorRegistry__parseArguments = function ValidatorRegistry__parseArguments(type, args) {
    return args.map(Utils__default.parse[type]);
  };
  // operatorToValidator returns a validating function for an operator function, applied to the given type
  var ValidatorRegistry__operatorToValidator = function ValidatorRegistry__operatorToValidator(type, operator) {
    return function (value) {
      for (var _len = arguments.length, requirementsAndInput = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        requirementsAndInput[_key - 1] = arguments[_key];
      }

      requirementsAndInput.pop(); // Get rid of `input` argument
      return operator.apply(undefined, [value].concat(_toConsumableArray(ValidatorRegistry__parseArguments(type, requirementsAndInput))));
    };
  };

  var ValidatorRegistry__comparisonOperator = function ValidatorRegistry__comparisonOperator(operator) {
    return {
      validateDate: ValidatorRegistry__operatorToValidator('date', operator),
      validateNumber: ValidatorRegistry__operatorToValidator('number', operator),
      requirementType: operator.length <= 2 ? 'string' : ['string', 'string'], // Support operators with a 1 or 2 requirement(s)
      priority: 30
    };
  };

  ValidatorRegistry.prototype = {
    init: function init(validators, catalog) {
      this.catalog = catalog;
      // Copy prototype's validators:
      this.validators = $.extend({}, this.validators);

      for (var name in validators) this.addValidator(name, validators[name].fn, validators[name].priority);

      window.Parsley.trigger('parsley:validator:init');
    },

    // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
    setLocale: function setLocale(locale) {
      if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');

      this.locale = locale;

      return this;
    },

    // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
    addCatalog: function addCatalog(locale, messages, set) {
      if ('object' === typeof messages) this.catalog[locale] = messages;

      if (true === set) return this.setLocale(locale);

      return this;
    },

    // Add a specific message for a given constraint in a given locale
    addMessage: function addMessage(locale, name, message) {
      if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};

      this.catalog[locale][name] = message;

      return this;
    },

    // Add messages for a given locale
    addMessages: function addMessages(locale, nameMessageObject) {
      for (var name in nameMessageObject) this.addMessage(locale, name, nameMessageObject[name]);

      return this;
    },

    // Add a new validator
    //
    //    addValidator('custom', {
    //        requirementType: ['integer', 'integer'],
    //        validateString: function(value, from, to) {},
    //        priority: 22,
    //        messages: {
    //          en: "Hey, that's no good",
    //          fr: "Aye aye, pas bon du tout",
    //        }
    //    })
    //
    // Old API was addValidator(name, function, priority)
    //
    addValidator: function addValidator(name, arg1, arg2) {
      if (this.validators[name]) Utils__default.warn('Validator "' + name + '" is already defined.');else if (Defaults.hasOwnProperty(name)) {
        Utils__default.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
        return;
      }
      return this._setValidator.apply(this, arguments);
    },

    updateValidator: function updateValidator(name, arg1, arg2) {
      if (!this.validators[name]) {
        Utils__default.warn('Validator "' + name + '" is not already defined.');
        return this.addValidator.apply(this, arguments);
      }
      return this._setValidator.apply(this, arguments);
    },

    removeValidator: function removeValidator(name) {
      if (!this.validators[name]) Utils__default.warn('Validator "' + name + '" is not defined.');

      delete this.validators[name];

      return this;
    },

    _setValidator: function _setValidator(name, validator, priority) {
      if ('object' !== typeof validator) {
        // Old style validator, with `fn` and `priority`
        validator = {
          fn: validator,
          priority: priority
        };
      }
      if (!validator.validate) {
        validator = new Validator(validator);
      }
      this.validators[name] = validator;

      for (var locale in validator.messages || {}) this.addMessage(locale, name, validator.messages[locale]);

      return this;
    },

    getErrorMessage: function getErrorMessage(constraint) {
      var message;

      // Type constraints are a bit different, we have to match their requirements too to find right error message
      if ('type' === constraint.name) {
        var typeMessages = this.catalog[this.locale][constraint.name] || {};
        message = typeMessages[constraint.requirements];
      } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);

      return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    },

    // Kind of light `sprintf()` implementation
    formatMessage: function formatMessage(string, parameters) {
      if ('object' === typeof parameters) {
        for (var i in parameters) string = this.formatMessage(string, parameters[i]);

        return string;
      }

      return 'string' === typeof string ? string.replace(/%s/i, parameters) : '';
    },

    // Here is the Parsley default validators list.
    // A validator is an object with the following key values:
    //  - priority: an integer
    //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
    //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
    // Alternatively, a validator can be a function that returns such an object
    //
    validators: {
      notblank: {
        validateString: function validateString(value) {
          return (/\S/.test(value)
          );
        },
        priority: 2
      },
      required: {
        validateMultiple: function validateMultiple(values) {
          return values.length > 0;
        },
        validateString: function validateString(value) {
          return (/\S/.test(value)
          );
        },
        priority: 512
      },
      type: {
        validateString: function validateString(value, type) {
          var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          var _ref$step = _ref.step;
          var step = _ref$step === undefined ? 'any' : _ref$step;
          var _ref$base = _ref.base;
          var base = _ref$base === undefined ? 0 : _ref$base;

          var tester = typeTesters[type];
          if (!tester) {
            throw new Error('validator type `' + type + '` is not supported');
          }
          if (!tester.test(value)) return false;
          if ('number' === type) {
            if (!/^any$/i.test(step || '')) {
              var nb = Number(value);
              var decimals = Math.max(decimalPlaces(step), decimalPlaces(base));
              if (decimalPlaces(nb) > decimals) // Value can't have too many decimals
                return false;
              // Be careful of rounding errors by using integers.
              var toInt = function toInt(f) {
                return Math.round(f * Math.pow(10, decimals));
              };
              if ((toInt(nb) - toInt(base)) % toInt(step) != 0) return false;
            }
          }
          return true;
        },
        requirementType: {
          '': 'string',
          step: 'string',
          base: 'number'
        },
        priority: 256
      },
      pattern: {
        validateString: function validateString(value, regexp) {
          return regexp.test(value);
        },
        requirementType: 'regexp',
        priority: 64
      },
      minlength: {
        validateString: function validateString(value, requirement) {
          return value.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxlength: {
        validateString: function validateString(value, requirement) {
          return value.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      length: {
        validateString: function validateString(value, min, max) {
          return value.length >= min && value.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      mincheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxcheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      check: {
        validateMultiple: function validateMultiple(values, min, max) {
          return values.length >= min && values.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      min: ValidatorRegistry__comparisonOperator(function (value, requirement) {
        return value >= requirement;
      }),
      max: ValidatorRegistry__comparisonOperator(function (value, requirement) {
        return value <= requirement;
      }),
      range: ValidatorRegistry__comparisonOperator(function (value, min, max) {
        return value >= min && value <= max;
      }),
      equalto: {
        validateString: function validateString(value, refOrValue) {
          var $reference = $(refOrValue);
          if ($reference.length) return value === $reference.val();else return value === refOrValue;
        },
        priority: 256
      }
    }
  };

  var UI = {};

  var diffResults = function diffResults(newResult, oldResult, deep) {
    var added = [];
    var kept = [];

    for (var i = 0; i < newResult.length; i++) {
      var found = false;

      for (var j = 0; j < oldResult.length; j++) if (newResult[i].assert.name === oldResult[j].assert.name) {
        found = true;
        break;
      }

      if (found) kept.push(newResult[i]);else added.push(newResult[i]);
    }

    return {
      kept: kept,
      added: added,
      removed: !deep ? diffResults(oldResult, newResult, true).added : []
    };
  };

  UI.Form = {

    _actualizeTriggers: function _actualizeTriggers() {
      var _this2 = this;

      this.$element.on('submit.Parsley', function (evt) {
        _this2.onSubmitValidate(evt);
      });
      this.$element.on('click.Parsley', Utils__default._SubmitSelector, function (evt) {
        _this2.onSubmitButton(evt);
      });

      // UI could be disabled
      if (false === this.options.uiEnabled) return;

      this.$element.attr('novalidate', '');
    },

    focus: function focus() {
      this._focusedField = null;

      if (true === this.validationResult || 'none' === this.options.focus) return null;

      for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
          this._focusedField = field.$element;
          if ('first' === this.options.focus) break;
        }
      }

      if (null === this._focusedField) return null;

      return this._focusedField.focus();
    },

    _destroyUI: function _destroyUI() {
      // Reset all event listeners
      this.$element.off('.Parsley');
    }

  };

  UI.Field = {

    _reflowUI: function _reflowUI() {
      this._buildUI();

      // If this field doesn't have an active UI don't bother doing something
      if (!this._ui) return;

      // Diff between two validation results
      var diff = diffResults(this.validationResult, this._ui.lastValidationResult);

      // Then store current validation result for next reflow
      this._ui.lastValidationResult = this.validationResult;

      // Handle valid / invalid / none field class
      this._manageStatusClass();

      // Add, remove, updated errors messages
      this._manageErrorsMessages(diff);

      // Triggers impl
      this._actualizeTriggers();

      // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user
      if ((diff.kept.length || diff.added.length) && !this._failedOnce) {
        this._failedOnce = true;
        this._actualizeTriggers();
      }
    },

    // Returns an array of field's error message(s)
    getErrorsMessages: function getErrorsMessages() {
      // No error message, field is valid
      if (true === this.validationResult) return [];

      var messages = [];

      for (var i = 0; i < this.validationResult.length; i++) messages.push(this.validationResult[i].errorMessage || this._getErrorMessage(this.validationResult[i].assert));

      return messages;
    },

    // It's a goal of Parsley that this method is no longer required [#1073]
    addError: function addError(name) {
      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var message = _ref2.message;
      var assert = _ref2.assert;
      var _ref2$updateClass = _ref2.updateClass;
      var updateClass = _ref2$updateClass === undefined ? true : _ref2$updateClass;

      this._buildUI();
      this._addError(name, { message: message, assert: assert });

      if (updateClass) this._errorClass();
    },

    // It's a goal of Parsley that this method is no longer required [#1073]
    updateError: function updateError(name) {
      var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var message = _ref3.message;
      var assert = _ref3.assert;
      var _ref3$updateClass = _ref3.updateClass;
      var updateClass = _ref3$updateClass === undefined ? true : _ref3$updateClass;

      this._buildUI();
      this._updateError(name, { message: message, assert: assert });

      if (updateClass) this._errorClass();
    },

    // It's a goal of Parsley that this method is no longer required [#1073]
    removeError: function removeError(name) {
      var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _ref4$updateClass = _ref4.updateClass;
      var updateClass = _ref4$updateClass === undefined ? true : _ref4$updateClass;

      this._buildUI();
      this._removeError(name);

      // edge case possible here: remove a standard Parsley error that is still failing in this.validationResult
      // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.
      if (updateClass) this._manageStatusClass();
    },

    _manageStatusClass: function _manageStatusClass() {
      if (this.hasConstraints() && this.needsValidation() && true === this.validationResult) this._successClass();else if (this.validationResult.length > 0) this._errorClass();else this._resetClass();
    },

    _manageErrorsMessages: function _manageErrorsMessages(diff) {
      if ('undefined' !== typeof this.options.errorsMessagesDisabled) return;

      // Case where we have errorMessage option that configure an unique field error message, regardless failing validators
      if ('undefined' !== typeof this.options.errorMessage) {
        if (diff.added.length || diff.kept.length) {
          this._insertErrorWrapper();

          if (0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length) this._ui.$errorsWrapper.append($(this.options.errorTemplate).addClass('parsley-custom-error-message'));

          return this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage);
        }

        return this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
      }

      // Show, hide, update failing constraints messages
      for (var i = 0; i < diff.removed.length; i++) this._removeError(diff.removed[i].assert.name);

      for (i = 0; i < diff.added.length; i++) this._addError(diff.added[i].assert.name, { message: diff.added[i].errorMessage, assert: diff.added[i].assert });

      for (i = 0; i < diff.kept.length; i++) this._updateError(diff.kept[i].assert.name, { message: diff.kept[i].errorMessage, assert: diff.kept[i].assert });
    },

    _addError: function _addError(name, _ref5) {
      var message = _ref5.message;
      var assert = _ref5.assert;

      this._insertErrorWrapper();
      this._ui.$errorsWrapper.addClass('filled').append($(this.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(assert)));
    },

    _updateError: function _updateError(name, _ref6) {
      var message = _ref6.message;
      var assert = _ref6.assert;

      this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(assert));
    },

    _removeError: function _removeError(name) {
      this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();
    },

    _getErrorMessage: function _getErrorMessage(constraint) {
      var customConstraintErrorMessage = constraint.name + 'Message';

      if ('undefined' !== typeof this.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(this.options[customConstraintErrorMessage], constraint.requirements);

      return window.Parsley.getErrorMessage(constraint);
    },

    _buildUI: function _buildUI() {
      // UI could be already built or disabled
      if (this._ui || false === this.options.uiEnabled) return;

      var _ui = {};

      // Give field its Parsley id in DOM
      this.$element.attr(this.options.namespace + 'id', this.__id__);

      /** Generate important UI elements and store them in this **/
      // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes
      _ui.$errorClassHandler = this._manageClassHandler();

      // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer
      _ui.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__);
      _ui.$errorsWrapper = $(this.options.errorsWrapper).attr('id', _ui.errorsWrapperId);

      // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly
      _ui.lastValidationResult = [];
      _ui.validationInformationVisible = false;

      // Store it in this for later
      this._ui = _ui;
    },

    // Determine which element will have `parsley-error` and `parsley-success` classes
    _manageClassHandler: function _manageClassHandler() {
      // An element selector could be passed through DOM with `data-parsley-class-handler=#foo`
      if ('string' === typeof this.options.classHandler && $(this.options.classHandler).length) return $(this.options.classHandler);

      // Class handled could also be determined by function given in Parsley options
      var $handler = this.options.classHandler.call(this, this);

      // If this function returned a valid existing DOM element, go for it
      if ('undefined' !== typeof $handler && $handler.length) return $handler;

      return this._inputHolder();
    },

    _inputHolder: function _inputHolder() {
      // if simple element (input, texatrea, select...) it will perfectly host the classes and precede the error container
      if (!this.options.multiple || this.$element.is('select')) return this.$element;

      // But if multiple element (radio, checkbox), that would be their parent
      return this.$element.parent();
    },

    _insertErrorWrapper: function _insertErrorWrapper() {
      var $errorsContainer;

      // Nothing to do if already inserted
      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();

      if ('string' === typeof this.options.errorsContainer) {
        if ($(this.options.errorsContainer).length) return $(this.options.errorsContainer).append(this._ui.$errorsWrapper);else Utils__default.warn('The errors container `' + this.options.errorsContainer + '` does not exist in DOM');
      } else if ('function' === typeof this.options.errorsContainer) $errorsContainer = this.options.errorsContainer.call(this, this);

      if ('undefined' !== typeof $errorsContainer && $errorsContainer.length) return $errorsContainer.append(this._ui.$errorsWrapper);

      return this._inputHolder().after(this._ui.$errorsWrapper);
    },

    _actualizeTriggers: function _actualizeTriggers() {
      var _this3 = this;

      var $toBind = this._findRelated();
      var trigger;

      // Remove Parsley events already bound on this field
      $toBind.off('.Parsley');
      if (this._failedOnce) $toBind.on(Utils__default.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function () {
        _this3._validateIfNeeded();
      });else if (trigger = Utils__default.namespaceEvents(this.options.trigger, 'Parsley')) {
        $toBind.on(trigger, function (event) {
          _this3._validateIfNeeded(event);
        });
      }
    },

    _validateIfNeeded: function _validateIfNeeded(event) {
      var _this4 = this;

      // For keyup, keypress, keydown, input... events that could be a little bit obstrusive
      // do not validate if val length < min threshold on first validation. Once field have been validated once and info
      // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
      if (event && /key|input/.test(event.type)) if (!(this._ui && this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold) return;

      if (this.options.debounce) {
        window.clearTimeout(this._debounced);
        this._debounced = window.setTimeout(function () {
          return _this4.validate();
        }, this.options.debounce);
      } else this.validate();
    },

    _resetUI: function _resetUI() {
      // Reset all event listeners
      this._failedOnce = false;
      this._actualizeTriggers();

      // Nothing to do if UI never initialized for this field
      if ('undefined' === typeof this._ui) return;

      // Reset all errors' li
      this._ui.$errorsWrapper.removeClass('filled').children().remove();

      // Reset validation class
      this._resetClass();

      // Reset validation flags and last validation result
      this._ui.lastValidationResult = [];
      this._ui.validationInformationVisible = false;
    },

    _destroyUI: function _destroyUI() {
      this._resetUI();

      if ('undefined' !== typeof this._ui) this._ui.$errorsWrapper.remove();

      delete this._ui;
    },

    _successClass: function _successClass() {
      this._ui.validationInformationVisible = true;
      this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
    },
    _errorClass: function _errorClass() {
      this._ui.validationInformationVisible = true;
      this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
    },
    _resetClass: function _resetClass() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
    }
  };

  var Form = function Form(element, domOptions, options) {
    this.__class__ = 'Form';

    this.$element = $(element);
    this.domOptions = domOptions;
    this.options = options;
    this.parent = window.Parsley;

    this.fields = [];
    this.validationResult = null;
  };

  var Form__statusMapping = { pending: null, resolved: true, rejected: false };

  Form.prototype = {
    onSubmitValidate: function onSubmitValidate(event) {
      var _this5 = this;

      // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
      if (true === event.parsley) return;

      // If we didn't come here through a submit button, use the first one in the form
      var $submitSource = this._$submitSource || this.$element.find(Utils__default._SubmitSelector).first();
      this._$submitSource = null;
      this.$element.find('.parsley-synthetic-submit-button').prop('disabled', true);
      if ($submitSource.is('[formnovalidate]')) return;

      var promise = this.whenValidate({ event: event });

      if ('resolved' === promise.state() && false !== this._trigger('submit')) {
        // All good, let event go through. We make this distinction because browsers
        // differ in their handling of `submit` being called from inside a submit event [#1047]
      } else {
          // Rejected or pending: cancel this submit
          event.stopImmediatePropagation();
          event.preventDefault();
          if ('pending' === promise.state()) promise.done(function () {
            _this5._submit($submitSource);
          });
        }
    },

    onSubmitButton: function onSubmitButton(event) {
      this._$submitSource = $(event.currentTarget);
    },
    // internal
    // _submit submits the form, this time without going through the validations.
    // Care must be taken to "fake" the actual submit button being clicked.
    _submit: function _submit($submitSource) {
      if (false === this._trigger('submit')) return;
      // Add submit button's data
      if ($submitSource) {
        var $synthetic = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', false);
        if (0 === $synthetic.length) $synthetic = $('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element);
        $synthetic.attr({
          name: $submitSource.attr('name'),
          value: $submitSource.attr('value')
        });
      }

      this.$element.trigger($.extend($.Event('submit'), { parsley: true }));
    },

    // Performs validation on fields while triggering events.
    // @returns `true` if all validations succeeds, `false`
    // if a failure is immediately detected, or `null`
    // if dependant on a promise.
    // Consider using `whenValidate` instead.
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils__default.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');

        var _arguments = _slice.call(arguments);

        var group = _arguments[0];
        var force = _arguments[1];
        var event = _arguments[2];

        options = { group: group, force: force, event: event };
      }
      return Form__statusMapping[this.whenValidate(options).state()];
    },

    whenValidate: function whenValidate() {
      var _Utils__default$all$done$fail$always,
          _this6 = this;

      var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var group = _ref7.group;
      var force = _ref7.force;
      var event = _ref7.event;

      this.submitEvent = event;
      if (event) {
        this.submitEvent = $.extend({}, event, { preventDefault: function preventDefault() {
            Utils__default.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`");
            _this6.validationResult = false;
          } });
      }
      this.validationResult = true;

      // fire validate event to eventually modify things before every validation
      this._trigger('validate');

      // Refresh form DOM options and form's fields that could have changed
      this._refreshFields();

      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this6.fields, function (field) {
          return field.whenValidate({ force: force, group: group });
        });
      });

      return (_Utils__default$all$done$fail$always = Utils__default.all(promises).done(function () {
        _this6._trigger('success');
      }).fail(function () {
        _this6.validationResult = false;
        _this6.focus();
        _this6._trigger('error');
      }).always(function () {
        _this6._trigger('validated');
      })).pipe.apply(_Utils__default$all$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },

    // Iterate over refreshed fields, and stop on first failure.
    // Returns `true` if all fields are valid, `false` if a failure is detected
    // or `null` if the result depends on an unresolved promise.
    // Prefer using `whenValid` instead.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils__default.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');

        var _arguments2 = _slice.call(arguments);

        var group = _arguments2[0];
        var force = _arguments2[1];

        options = { group: group, force: force };
      }
      return Form__statusMapping[this.whenValid(options).state()];
    },

    // Iterate over refreshed fields and validate them.
    // Returns a promise.
    // A validation that immediately fails will interrupt the validations.
    whenValid: function whenValid() {
      var _this7 = this;

      var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var group = _ref8.group;
      var force = _ref8.force;

      this._refreshFields();

      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this7.fields, function (field) {
          return field.whenValid({ group: group, force: force });
        });
      });
      return Utils__default.all(promises);
    },

    // Reset UI
    reset: function reset() {
      // Form case: emit a reset event for each field
      for (var i = 0; i < this.fields.length; i++) this.fields[i].reset();

      this._trigger('reset');
    },

    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI();

      // Form case: destroy all its fields and then destroy stored instance
      for (var i = 0; i < this.fields.length; i++) this.fields[i].destroy();

      this.$element.removeData('Parsley');
      this._trigger('destroy');
    },

    _refreshFields: function _refreshFields() {
      return this.actualizeOptions()._bindFields();
    },

    _bindFields: function _bindFields() {
      var _this8 = this;

      var oldFields = this.fields;

      this.fields = [];
      this.fieldsMappedById = {};

      this._withoutReactualizingFormOptions(function () {
        _this8.$element.find(_this8.options.inputs).not(_this8.options.excluded).each(function (_, element) {
          var fieldInstance = new window.Parsley.Factory(element, {}, _this8);

          // Only add valid and not excluded `Field` and `FieldMultiple` children
          if (('Field' === fieldInstance.__class__ || 'FieldMultiple' === fieldInstance.__class__) && true !== fieldInstance.options.excluded) {
            var uniqueId = fieldInstance.__class__ + '-' + fieldInstance.__id__;
            if ('undefined' === typeof _this8.fieldsMappedById[uniqueId]) {
              _this8.fieldsMappedById[uniqueId] = fieldInstance;
              _this8.fields.push(fieldInstance);
            }
          }
        });

        $.each(Utils__default.difference(oldFields, _this8.fields), function (_, field) {
          field.reset();
        });
      });
      return this;
    },

    // Internal only.
    // Looping on a form's fields to do validation or similar
    // will trigger reactualizing options on all of them, which
    // in turn will reactualize the form's options.
    // To avoid calling actualizeOptions so many times on the form
    // for nothing, _withoutReactualizingFormOptions temporarily disables
    // the method actualizeOptions on this form while `fn` is called.
    _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
      var oldActualizeOptions = this.actualizeOptions;
      this.actualizeOptions = function () {
        return this;
      };
      var result = fn();
      this.actualizeOptions = oldActualizeOptions;
      return result;
    },

    // Internal only.
    // Shortcut to trigger an event
    // Returns true iff event is not interrupted and default not prevented.
    _trigger: function _trigger(eventName) {
      return this.trigger('form:' + eventName);
    }

  };

  var Constraint = function Constraint(parsleyField, name, requirements, priority, isDomConstraint) {
    var validatorSpec = window.Parsley._validatorRegistry.validators[name];
    var validator = new Validator(validatorSpec);

    $.extend(this, {
      validator: validator,
      name: name,
      requirements: requirements,
      priority: priority || parsleyField.options[name + 'Priority'] || validator.priority,
      isDomConstraint: true === isDomConstraint
    });
    this._parseRequirements(parsleyField.options);
  };

  var capitalize = function capitalize(str) {
    var cap = str[0].toUpperCase();
    return cap + str.slice(1);
  };

  Constraint.prototype = {
    validate: function validate(value, instance) {
      var _validator;

      return (_validator = this.validator).validate.apply(_validator, [value].concat(_toConsumableArray(this.requirementList), [instance]));
    },

    _parseRequirements: function _parseRequirements(options) {
      var _this9 = this;

      this.requirementList = this.validator.parseRequirements(this.requirements, function (key) {
        return options[_this9.name + capitalize(key)];
      });
    }
  };

  var Field = function Field(field, domOptions, options, parsleyFormInstance) {
    this.__class__ = 'Field';

    this.$element = $(field);

    // Set parent if we have one
    if ('undefined' !== typeof parsleyFormInstance) {
      this.parent = parsleyFormInstance;
    }

    this.options = options;
    this.domOptions = domOptions;

    // Initialize some properties
    this.constraints = [];
    this.constraintsByName = {};
    this.validationResult = true;

    // Bind constraints
    this._bindConstraints();
  };

  var parsley_field__statusMapping = { pending: null, resolved: true, rejected: false };

  Field.prototype = {
    // # Public API
    // Validate field and trigger some events for mainly `UI`
    // @returns `true`, an array of the validators that failed, or
    // `null` if validation is not finished. Prefer using whenValidate
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils__default.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.');
        options = { options: options };
      }
      var promise = this.whenValidate(options);
      if (!promise) // If excluded with `group` option
        return true;
      switch (promise.state()) {
        case 'pending':
          return null;
        case 'resolved':
          return true;
        case 'rejected':
          return this.validationResult;
      }
    },

    // Validate field and trigger some events for mainly `UI`
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if field is not in the given `group`.
    whenValidate: function whenValidate() {
      var _whenValid$always$done$fail$always,
          _this10 = this;

      var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var force = _ref9.force;
      var group = _ref9.group;

      // do not validate a field if not the same as given validation group
      this.refreshConstraints();
      if (group && !this._isInGroup(group)) return;

      this.value = this.getValue();

      // Field Validate event. `this.value` could be altered for custom needs
      this._trigger('validate');

      return (_whenValid$always$done$fail$always = this.whenValid({ force: force, value: this.value, _refreshed: true }).always(function () {
        _this10._reflowUI();
      }).done(function () {
        _this10._trigger('success');
      }).fail(function () {
        _this10._trigger('error');
      }).always(function () {
        _this10._trigger('validated');
      })).pipe.apply(_whenValid$always$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },

    hasConstraints: function hasConstraints() {
      return 0 !== this.constraints.length;
    },

    // An empty optional field does not need validation
    needsValidation: function needsValidation(value) {
      if ('undefined' === typeof value) value = this.getValue();

      // If a field is empty and not required, it is valid
      // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators
      if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;

      return true;
    },

    _isInGroup: function _isInGroup(group) {
      if ($.isArray(this.options.group)) return -1 !== $.inArray(group, this.options.group);
      return this.options.group === group;
    },

    // Just validate field. Do not trigger any event.
    // Returns `true` iff all constraints pass, `false` if there are failures,
    // or `null` if the result can not be determined yet (depends on a promise)
    // See also `whenValid`.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils__default.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');

        var _arguments3 = _slice.call(arguments);

        var force = _arguments3[0];
        var value = _arguments3[1];

        options = { force: force, value: value };
      }
      var promise = this.whenValid(options);
      if (!promise) // Excluded via `group`
        return true;
      return parsley_field__statusMapping[promise.state()];
    },

    // Just validate field. Do not trigger any event.
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if the field is not in the given `group`.
    // The argument `force` will force validation of empty fields.
    // If a `value` is given, it will be validated instead of the value of the input.
    whenValid: function whenValid() {
      var _this11 = this;

      var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref10$force = _ref10.force;
      var force = _ref10$force === undefined ? false : _ref10$force;
      var value = _ref10.value;
      var group = _ref10.group;
      var _refreshed = _ref10._refreshed;

      // Recompute options and rebind constraints to have latest changes
      if (!_refreshed) this.refreshConstraints();
      // do not validate a field if not the same as given validation group
      if (group && !this._isInGroup(group)) return;

      this.validationResult = true;

      // A field without constraint is valid
      if (!this.hasConstraints()) return $.when();

      // Value could be passed as argument, needed to add more power to 'field:validate'
      if ('undefined' === typeof value || null === value) value = this.getValue();

      if (!this.needsValidation(value) && true !== force) return $.when();

      var groupedConstraints = this._getGroupedConstraints();
      var promises = [];
      $.each(groupedConstraints, function (_, constraints) {
        // Process one group of constraints at a time, we validate the constraints
        // and combine the promises together.
        var promise = Utils__default.all($.map(constraints, function (constraint) {
          return _this11._validateConstraint(value, constraint);
        }));
        promises.push(promise);
        if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
      });
      return Utils__default.all(promises);
    },

    // @returns a promise
    _validateConstraint: function _validateConstraint(value, constraint) {
      var _this12 = this;

      var result = constraint.validate(value, this);
      // Map false to a failed promise
      if (false === result) result = $.Deferred().reject();
      // Make sure we return a promise and that we record failures
      return Utils__default.all([result]).fail(function (errorMessage) {
        if (!(_this12.validationResult instanceof Array)) _this12.validationResult = [];
        _this12.validationResult.push({
          assert: constraint,
          errorMessage: 'string' === typeof errorMessage && errorMessage
        });
      });
    },

    // @returns Parsley field computed value that could be overrided or configured in DOM
    getValue: function getValue() {
      var value;

      // Value could be overriden in DOM or with explicit options
      if ('function' === typeof this.options.value) value = this.options.value(this);else if ('undefined' !== typeof this.options.value) value = this.options.value;else value = this.$element.val();

      // Handle wrong DOM or configurations
      if ('undefined' === typeof value || null === value) return '';

      return this._handleWhitespace(value);
    },

    // Reset UI
    reset: function reset() {
      this._resetUI();
      return this._trigger('reset');
    },

    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI();
      this.$element.removeData('Parsley');
      this.$element.removeData('FieldMultiple');
      this._trigger('destroy');
    },

    // Actualize options that could have change since previous validation
    // Re-bind accordingly constraints (could be some new, removed or updated)
    refreshConstraints: function refreshConstraints() {
      return this.actualizeOptions()._bindConstraints();
    },

    /**
    * Add a new constraint to a field
    *
    * @param {String}   name
    * @param {Mixed}    requirements      optional
    * @param {Number}   priority          optional
    * @param {Boolean}  isDomConstraint   optional
    */
    addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {

      if (window.Parsley._validatorRegistry.validators[name]) {
        var constraint = new Constraint(this, name, requirements, priority, isDomConstraint);

        // if constraint already exist, delete it and push new version
        if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);

        this.constraints.push(constraint);
        this.constraintsByName[constraint.name] = constraint;
      }

      return this;
    },

    // Remove a constraint
    removeConstraint: function removeConstraint(name) {
      for (var i = 0; i < this.constraints.length; i++) if (name === this.constraints[i].name) {
        this.constraints.splice(i, 1);
        break;
      }
      delete this.constraintsByName[name];
      return this;
    },

    // Update a constraint (Remove + re-add)
    updateConstraint: function updateConstraint(name, parameters, priority) {
      return this.removeConstraint(name).addConstraint(name, parameters, priority);
    },

    // # Internals

    // Internal only.
    // Bind constraints from config + options + DOM
    _bindConstraints: function _bindConstraints() {
      var constraints = [];
      var constraintsByName = {};

      // clean all existing DOM constraints to only keep javascript user constraints
      for (var i = 0; i < this.constraints.length; i++) if (false === this.constraints[i].isDomConstraint) {
        constraints.push(this.constraints[i]);
        constraintsByName[this.constraints[i].name] = this.constraints[i];
      }

      this.constraints = constraints;
      this.constraintsByName = constraintsByName;

      // then re-add Parsley DOM-API constraints
      for (var name in this.options) this.addConstraint(name, this.options[name], undefined, true);

      // finally, bind special HTML5 constraints
      return this._bindHtml5Constraints();
    },

    // Internal only.
    // Bind specific HTML5 constraints to be HTML5 compliant
    _bindHtml5Constraints: function _bindHtml5Constraints() {
      // html5 required
      if (this.$element.attr('required')) this.addConstraint('required', true, undefined, true);

      // html5 pattern
      if ('string' === typeof this.$element.attr('pattern')) this.addConstraint('pattern', this.$element.attr('pattern'), undefined, true);

      // range
      if ('undefined' !== typeof this.$element.attr('min') && 'undefined' !== typeof this.$element.attr('max')) this.addConstraint('range', [this.$element.attr('min'), this.$element.attr('max')], undefined, true);

      // HTML5 min
      else if ('undefined' !== typeof this.$element.attr('min')) this.addConstraint('min', this.$element.attr('min'), undefined, true);

        // HTML5 max
        else if ('undefined' !== typeof this.$element.attr('max')) this.addConstraint('max', this.$element.attr('max'), undefined, true);

      // length
      if ('undefined' !== typeof this.$element.attr('minlength') && 'undefined' !== typeof this.$element.attr('maxlength')) this.addConstraint('length', [this.$element.attr('minlength'), this.$element.attr('maxlength')], undefined, true);

      // HTML5 minlength
      else if ('undefined' !== typeof this.$element.attr('minlength')) this.addConstraint('minlength', this.$element.attr('minlength'), undefined, true);

        // HTML5 maxlength
        else if ('undefined' !== typeof this.$element.attr('maxlength')) this.addConstraint('maxlength', this.$element.attr('maxlength'), undefined, true);

      // html5 types
      var type = this.$element.attr('type');

      if ('undefined' === typeof type) return this;

      // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise
      if ('number' === type) {
        return this.addConstraint('type', ['number', {
          step: this.$element.attr('step') || '1',
          base: this.$element.attr('min') || this.$element.attr('value')
        }], undefined, true);
        // Regular other HTML5 supported types
      } else if (/^(email|url|range|date)$/i.test(type)) {
          return this.addConstraint('type', type, undefined, true);
        }
      return this;
    },

    // Internal only.
    // Field is required if have required constraint without `false` value
    _isRequired: function _isRequired() {
      if ('undefined' === typeof this.constraintsByName.required) return false;

      return false !== this.constraintsByName.required.requirements;
    },

    // Internal only.
    // Shortcut to trigger an event
    _trigger: function _trigger(eventName) {
      return this.trigger('field:' + eventName);
    },

    // Internal only
    // Handles whitespace in a value
    // Use `data-parsley-whitespace="squish"` to auto squish input value
    // Use `data-parsley-whitespace="trim"` to auto trim input value
    _handleWhitespace: function _handleWhitespace(value) {
      if (true === this.options.trimValue) Utils__default.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');

      if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');

      if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = Utils__default.trimString(value);

      return value;
    },

    _isDateInput: function _isDateInput() {
      var c = this.constraintsByName.type;
      return c && c.requirements === 'date';
    },

    // Internal only.
    // Returns the constraints, grouped by descending priority.
    // The result is thus an array of arrays of constraints.
    _getGroupedConstraints: function _getGroupedConstraints() {
      if (false === this.options.priorityEnabled) return [this.constraints];

      var groupedConstraints = [];
      var index = {};

      // Create array unique of priorities
      for (var i = 0; i < this.constraints.length; i++) {
        var p = this.constraints[i].priority;
        if (!index[p]) groupedConstraints.push(index[p] = []);
        index[p].push(this.constraints[i]);
      }
      // Sort them by priority DESC
      groupedConstraints.sort(function (a, b) {
        return b[0].priority - a[0].priority;
      });

      return groupedConstraints;
    }

  };

  var parsley_field = Field;

  var Multiple = function Multiple() {
    this.__class__ = 'FieldMultiple';
  };

  Multiple.prototype = {
    // Add new `$element` sibling for multiple field
    addElement: function addElement($element) {
      this.$elements.push($element);

      return this;
    },

    // See `Field.refreshConstraints()`
    refreshConstraints: function refreshConstraints() {
      var fieldConstraints;

      this.constraints = [];

      // Select multiple special treatment
      if (this.$element.is('select')) {
        this.actualizeOptions()._bindConstraints();

        return this;
      }

      // Gather all constraints for each input in the multiple group
      for (var i = 0; i < this.$elements.length; i++) {

        // Check if element have not been dynamically removed since last binding
        if (!$('html').has(this.$elements[i]).length) {
          this.$elements.splice(i, 1);
          continue;
        }

        fieldConstraints = this.$elements[i].data('FieldMultiple').refreshConstraints().constraints;

        for (var j = 0; j < fieldConstraints.length; j++) this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
      }

      return this;
    },

    // See `Field.getValue()`
    getValue: function getValue() {
      // Value could be overriden in DOM
      if ('function' === typeof this.options.value) return this.options.value(this);else if ('undefined' !== typeof this.options.value) return this.options.value;

      // Radio input case
      if (this.$element.is('input[type=radio]')) return this._findRelated().filter(':checked').val() || '';

      // checkbox input case
      if (this.$element.is('input[type=checkbox]')) {
        var values = [];

        this._findRelated().filter(':checked').each(function () {
          values.push($(this).val());
        });

        return values;
      }

      // Select multiple case
      if (this.$element.is('select') && null === this.$element.val()) return [];

      // Default case that should never happen
      return this.$element.val();
    },

    _init: function _init() {
      this.$elements = [this.$element];

      return this;
    }
  };

  var Factory = function Factory(element, options, parsleyFormInstance) {
    this.$element = $(element);

    // If the element has already been bound, returns its saved Parsley instance
    var savedparsleyFormInstance = this.$element.data('Parsley');
    if (savedparsleyFormInstance) {

      // If the saved instance has been bound without a Form parent and there is one given in this call, add it
      if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
        savedparsleyFormInstance.parent = parsleyFormInstance;
        savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
      }

      if ('object' === typeof options) {
        $.extend(savedparsleyFormInstance.options, options);
      }

      return savedparsleyFormInstance;
    }

    // Parsley must be instantiated with a DOM element or jQuery $element
    if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');

    if ('undefined' !== typeof parsleyFormInstance && 'Form' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a Form instance');

    this.parent = parsleyFormInstance || window.Parsley;
    return this.init(options);
  };

  Factory.prototype = {
    init: function init(options) {
      this.__class__ = 'Parsley';
      this.__version__ = '2.7.0';
      this.__id__ = Utils__default.generateID();

      // Pre-compute options
      this._resetOptions(options);

      // A Form instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
      if (this.$element.is('form') || Utils__default.checkAttr(this.$element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm');

      // Every other element is bound as a `Field` or `FieldMultiple`
      return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
    },

    isMultiple: function isMultiple() {
      return this.$element.is('input[type=radio], input[type=checkbox]') || this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple');
    },

    // Multiples fields are a real nightmare :(
    // Maybe some refactoring would be appreciated here...
    handleMultiple: function handleMultiple() {
      var _this13 = this;

      var name;
      var multiple;
      var parsleyMultipleInstance;

      // Handle multiple name
      if (this.options.multiple) ; // We already have our 'multiple' identifier
      else if ('undefined' !== typeof this.$element.attr('name') && this.$element.attr('name').length) this.options.multiple = name = this.$element.attr('name');else if ('undefined' !== typeof this.$element.attr('id') && this.$element.attr('id').length) this.options.multiple = this.$element.attr('id');

      // Special select multiple input
      if (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple')) {
        this.options.multiple = this.options.multiple || this.__id__;
        return this.bind('parsleyFieldMultiple');

        // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
      } else if (!this.options.multiple) {
          Utils__default.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
          return this;
        }

      // Remove special chars
      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');

      // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
      if ('undefined' !== typeof name) {
        $('input[name="' + name + '"]').each(function (i, input) {
          if ($(input).is('input[type=radio], input[type=checkbox]')) $(input).attr(_this13.options.namespace + 'multiple', _this13.options.multiple);
        });
      }

      // Check here if we don't already have a related multiple instance saved
      var $previouslyRelated = this._findRelated();
      for (var i = 0; i < $previouslyRelated.length; i++) {
        parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
        if ('undefined' !== typeof parsleyMultipleInstance) {

          if (!this.$element.data('FieldMultiple')) {
            parsleyMultipleInstance.addElement(this.$element);
          }

          break;
        }
      }

      // Create a secret Field instance for every multiple field. It will be stored in `data('FieldMultiple')`
      // And will be useful later to access classic `Field` stuff while being in a `FieldMultiple` instance
      this.bind('parsleyField', true);

      return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
    },

    // Return proper `Form`, `Field` or `FieldMultiple`
    bind: function bind(type, doNotStore) {
      var parsleyInstance;

      switch (type) {
        case 'parsleyForm':
          parsleyInstance = $.extend(new Form(this.$element, this.domOptions, this.options), new Base(), window.ParsleyExtend)._bindFields();
          break;
        case 'parsleyField':
          parsleyInstance = $.extend(new parsley_field(this.$element, this.domOptions, this.options, this.parent), new Base(), window.ParsleyExtend);
          break;
        case 'parsleyFieldMultiple':
          parsleyInstance = $.extend(new parsley_field(this.$element, this.domOptions, this.options, this.parent), new Multiple(), new Base(), window.ParsleyExtend)._init();
          break;
        default:
          throw new Error(type + 'is not a supported Parsley type');
      }

      if (this.options.multiple) Utils__default.setAttr(this.$element, this.options.namespace, 'multiple', this.options.multiple);

      if ('undefined' !== typeof doNotStore) {
        this.$element.data('FieldMultiple', parsleyInstance);

        return parsleyInstance;
      }

      // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
      this.$element.data('Parsley', parsleyInstance);

      // Tell the world we have a new Form or Field instance!
      parsleyInstance._actualizeTriggers();
      parsleyInstance._trigger('init');

      return parsleyInstance;
    }
  };

  var vernums = $.fn.jquery.split('.');
  if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
    throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  }
  if (!vernums.forEach) {
    Utils__default.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
  }
  // Inherit `on`, `off` & `trigger` to Parsley:
  var Parsley = $.extend(new Base(), {
    $element: $(document),
    actualizeOptions: null,
    _resetOptions: null,
    Factory: Factory,
    version: '2.7.0'
  });

  // Supplement Field and Form with Base
  // This way, the constructors will have access to those methods
  $.extend(parsley_field.prototype, UI.Field, Base.prototype);
  $.extend(Form.prototype, UI.Form, Base.prototype);
  // Inherit actualizeOptions and _resetOptions:
  $.extend(Factory.prototype, Base.prototype);

  // ### jQuery API
  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`
  $.fn.parsley = $.fn.psly = function (options) {
    if (this.length > 1) {
      var instances = [];

      this.each(function () {
        instances.push($(this).parsley(options));
      });

      return instances;
    }

    // Return undefined if applied to non existing DOM element
    if (!$(this).length) {
      Utils__default.warn('You must bind Parsley on an existing element.');

      return;
    }

    return new Factory(this, options);
  };

  // ### Field and Form extension
  // Ensure the extension is now defined if it wasn't previously
  if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {};

  // ### Parsley config
  // Inherit from ParsleyDefault, and copy over any existing values
  Parsley.options = $.extend(Utils__default.objectCreate(Defaults), window.ParsleyConfig);
  window.ParsleyConfig = Parsley.options; // Old way of accessing global options

  // ### Globals
  window.Parsley = window.psly = Parsley;
  Parsley.Utils = Utils__default;
  window.ParsleyUtils = {};
  $.each(Utils__default, function (key, value) {
    if ('function' === typeof value) {
      window.ParsleyUtils[key] = function () {
        Utils__default.warnOnce('Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead.');
        return Utils__default[key].apply(Utils__default, arguments);
      };
    }
  });

  // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley
  var registry = window.Parsley._validatorRegistry = new ValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {};
  $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator'.split(' '), function (i, method) {
    window.Parsley[method] = $.proxy(registry, method);
    window.ParsleyValidator[method] = function () {
      var _window$Parsley;

      Utils__default.warnOnce('Accessing the method \'' + method + '\' through Validator is deprecated. Simply call \'window.Parsley.' + method + '(...)\'');
      return (_window$Parsley = window.Parsley)[method].apply(_window$Parsley, arguments);
    };
  });

  // ### UI
  // Deprecated global object
  window.Parsley.UI = UI;
  window.ParsleyUI = {
    removeError: function removeError(instance, name, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      Utils__default.warnOnce('Accessing UI is deprecated. Call \'removeError\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
      return instance.removeError(name, { updateClass: updateClass });
    },
    getErrorsMessages: function getErrorsMessages(instance) {
      Utils__default.warnOnce('Accessing UI is deprecated. Call \'getErrorsMessages\' on the instance directly.');
      return instance.getErrorsMessages();
    }
  };
  $.each('addError updateError'.split(' '), function (i, method) {
    window.ParsleyUI[method] = function (instance, name, message, assert, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      Utils__default.warnOnce('Accessing UI is deprecated. Call \'' + method + '\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
      return instance[method](name, { message: message, assert: assert, updateClass: updateClass });
    };
  });

  // ### PARSLEY auto-binding
  // Prevent it by setting `ParsleyConfig.autoBind` to `false`
  if (false !== window.ParsleyConfig.autoBind) {
    $(function () {
      // Works only on `data-parsley-validate`.
      if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
    });
  }

  var o = $({});
  var deprecated = function deprecated() {
    Utils__default.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
  };

  // Returns an event handler that calls `fn` with the arguments it expects
  function adapt(fn, context) {
    // Store to allow unbinding
    if (!fn.parsleyAdaptedCallback) {
      fn.parsleyAdaptedCallback = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this);
        fn.apply(context || o, args);
      };
    }
    return fn.parsleyAdaptedCallback;
  }

  var eventPrefix = 'parsley:';
  // Converts 'parsley:form:validate' into 'form:validate'
  function eventName(name) {
    if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
    return name;
  }

  // $.listen is deprecated. Use Parsley.on instead.
  $.listen = function (name, callback) {
    var context;
    deprecated();
    if ('object' === typeof arguments[1] && 'function' === typeof arguments[2]) {
      context = arguments[1];
      callback = arguments[2];
    }

    if ('function' !== typeof callback) throw new Error('Wrong parameters');

    window.Parsley.on(eventName(name), adapt(callback, context));
  };

  $.listenTo = function (instance, name, fn) {
    deprecated();
    if (!(instance instanceof parsley_field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');

    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');

    instance.on(eventName(name), adapt(fn));
  };

  $.unsubscribe = function (name, fn) {
    deprecated();
    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
    window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
  };

  $.unsubscribeTo = function (instance, name) {
    deprecated();
    if (!(instance instanceof parsley_field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
    instance.off(eventName(name));
  };

  $.unsubscribeAll = function (name) {
    deprecated();
    window.Parsley.off(eventName(name));
    $('form,input,textarea,select').each(function () {
      var instance = $(this).data('Parsley');
      if (instance) {
        instance.off(eventName(name));
      }
    });
  };

  // $.emit is deprecated. Use jQuery events instead.
  $.emit = function (name, instance) {
    var _instance;

    deprecated();
    var instanceGiven = instance instanceof parsley_field || instance instanceof Form;
    var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
    args.unshift(eventName(name));
    if (!instanceGiven) {
      instance = window.Parsley;
    }
    (_instance = instance).trigger.apply(_instance, _toConsumableArray(args));
  };

  var pubsub = {};

  $.extend(true, Parsley, {
    asyncValidators: {
      'default': {
        fn: function fn(xhr) {
          // By default, only status 2xx are deemed successful.
          // Note: we use status instead of state() because responses with status 200
          // but invalid messages (e.g. an empty body for content type set to JSON) will
          // result in state() === 'rejected'.
          return xhr.status >= 200 && xhr.status < 300;
        },
        url: false
      },
      reverse: {
        fn: function fn(xhr) {
          // If reverse option is set, a failing ajax request is considered successful
          return xhr.status < 200 || xhr.status >= 300;
        },
        url: false
      }
    },

    addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
      Parsley.asyncValidators[name] = {
        fn: fn,
        url: url || false,
        options: options || {}
      };

      return this;
    }

  });

  Parsley.addValidator('remote', {
    requirementType: {
      '': 'string',
      'validator': 'string',
      'reverse': 'boolean',
      'options': 'object'
    },

    validateString: function validateString(value, url, options, instance) {
      var data = {};
      var ajaxOptions;
      var csr;
      var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');

      if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');

      url = Parsley.asyncValidators[validator].url || url;

      // Fill current value
      if (url.indexOf('{value}') > -1) {
        url = url.replace('{value}', encodeURIComponent(value));
      } else {
        data[instance.$element.attr('name') || instance.$element.attr('id')] = value;
      }

      // Merge options passed in from the function with the ones in the attribute
      var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options);

      // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`
      ajaxOptions = $.extend(true, {}, {
        url: url,
        data: data,
        type: 'GET'
      }, remoteOptions);

      // Generate store key based on ajax options
      instance.trigger('field:ajaxoptions', instance, ajaxOptions);

      csr = $.param(ajaxOptions);

      // Initialise querry cache
      if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {};

      // Try to retrieve stored xhr
      var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);

      var handleXhr = function handleXhr() {
        var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
        if (!result) // Map falsy results to rejected promise
          result = $.Deferred().reject();
        return $.when(result);
      };

      return xhr.then(handleXhr, handleXhr);
    },

    priority: -1
  });

  Parsley.on('form:submit', function () {
    Parsley._remoteCache = {};
  });

  window.ParsleyExtend.addAsyncValidator = function () {
    Utils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
    return Parsley.addAsyncValidator.apply(Parsley, arguments);
  };

  // This is included with the Parsley library itself,
  // thus there is no use in adding it to your project.
  Parsley.addMessages('en', {
    defaultMessage: "This value seems to be invalid.",
    type: {
      email: "This value should be a valid email.",
      url: "This value should be a valid url.",
      number: "This value should be a valid number.",
      integer: "This value should be a valid integer.",
      digits: "This value should be digits.",
      alphanum: "This value should be alphanumeric."
    },
    notblank: "This value should not be blank.",
    required: "This value is required.",
    pattern: "This value seems to be invalid.",
    min: "This value should be greater than or equal to %s.",
    max: "This value should be lower than or equal to %s.",
    range: "This value should be between %s and %s.",
    minlength: "This value is too short. It should have %s characters or more.",
    maxlength: "This value is too long. It should have %s characters or fewer.",
    length: "This value length is invalid. It should be between %s and %s characters long.",
    mincheck: "You must select at least %s choices.",
    maxcheck: "You must select %s choices or fewer.",
    check: "You must select between %s and %s choices.",
    equalto: "This value should be the same."
  });

  Parsley.setLocale('en');

  /**
   * inputevent - Alleviate browser bugs for input events
   * https://github.com/marcandre/inputevent
   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
   * @author Marc-Andre Lafortune <github@marc-andre.ca>
   * @license MIT
   */

  function InputEvent() {
    var _this14 = this;

    var globals = window || global;

    // Slightly odd way construct our object. This way methods are force bound.
    // Used to test for duplicate library.
    $.extend(this, {

      // For browsers that do not support isTrusted, assumes event is native.
      isNativeEvent: function isNativeEvent(evt) {
        return evt.originalEvent && evt.originalEvent.isTrusted !== false;
      },

      fakeInputEvent: function fakeInputEvent(evt) {
        if (_this14.isNativeEvent(evt)) {
          $(evt.target).trigger('input');
        }
      },

      misbehaves: function misbehaves(evt) {
        if (_this14.isNativeEvent(evt)) {
          _this14.behavesOk(evt);
          $(document).on('change.inputevent', evt.data.selector, _this14.fakeInputEvent);
          _this14.fakeInputEvent(evt);
        }
      },

      behavesOk: function behavesOk(evt) {
        if (_this14.isNativeEvent(evt)) {
          $(document) // Simply unbinds the testing handler
          .off('input.inputevent', evt.data.selector, _this14.behavesOk).off('change.inputevent', evt.data.selector, _this14.misbehaves);
        }
      },

      // Bind the testing handlers
      install: function install() {
        if (globals.inputEventPatched) {
          return;
        }
        globals.inputEventPatched = '0.0.3';
        var _arr = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'];
        for (var _i = 0; _i < _arr.length; _i++) {
          var selector = _arr[_i];
          $(document).on('input.inputevent', selector, { selector: selector }, _this14.behavesOk).on('change.inputevent', selector, { selector: selector }, _this14.misbehaves);
        }
      },

      uninstall: function uninstall() {
        delete globals.inputEventPatched;
        $(document).off('.inputevent');
      }

    });
  };

  var inputevent = new InputEvent();

  inputevent.install();

  var parsley = Parsley;

  return parsley;
});
//# sourceMappingURL=parsley.js.map
;
// By: Hans Fj�llemark and John Papa
// https://github.com/CodeSeven/toastr
// 
// Modified to support css styling instead of inline styling
// Inspired by https://github.com/Srirangan/notifer.js/

;(function(window, $) {
    window.toastr = (function() {
        var 
            defaults = {
                tapToDismiss: true,
                toastClass: 'toast',
                containerId: 'toast-container',
                debug: false,
                fadeIn: 300,
                fadeOut: 1000,
                extendedTimeOut: 1000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                iconClass: 'toast-info',
                positionClass: 'toast-top-right',
                timeOut: 5000, // Set timeOut to 0 to make it sticky
                titleClass: 'toast-title',
                messageClass: 'toast-message'
            },


            error = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    title: title
                })
            },

            getContainer = function(options) {
                var $container = $('#' + options.containerId)

                if ($container.length)
                    return $container

                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)

                $container.appendTo($('body'))

                return $container
            },

            getOptions = function() {
                return $.extend({}, defaults, toastr.options)
            },

            info = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    title: title
                })
            },

            notify = function(map) {
                var 
                    options = getOptions(),
                    iconClass = map.iconClass || options.iconClass,
                    intervalId = null,
                    $container = getContainer(options),
                    $toastElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    response = { options: options, map: map }

                if (map.iconClass) {
                    $toastElement.addClass(options.toastClass).addClass(iconClass)
                }

                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass)
                    $toastElement.append($titleElement)
                }

                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass)
                    $toastElement.append($messageElement)
                }

                var fadeAway = function() {
                    if ($(':focus', $toastElement).length > 0)
                		return
                	
                    var fade = function() {
                        return $toastElement.fadeOut(options.fadeOut)
                    }

                    $.when(fade()).done(function() {
                        if ($toastElement.is(':visible')) {
                            return
                        }
                        $toastElement.remove()
                        if ($container.children().length === 0)
                            $container.remove()
                    })
                }

                var delayedFadeAway = function() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(fadeAway, options.extendedTimeOut)
                    }
                }

                var stickAround = function() {
                    clearTimeout(intervalId)
                    $toastElement.stop(true, true)
                        .fadeIn(options.fadeIn)
                }

                $toastElement.hide()
                $container.prepend($toastElement)
                $toastElement.fadeIn(options.fadeIn)

                if (options.timeOut > 0) {
                    intervalId = setTimeout(fadeAway, options.timeOut)
                }

                $toastElement.hover(stickAround, delayedFadeAway)

                if (options.tapToDismiss) {
                    $toastElement.click(fadeAway)
                }

                if (options.debug) {
                    console.log(response)
                }
                return $toastElement
            },

            success = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    title: title
                })
            },

            warning = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    title: title
                })
            }

        return {
            error: error,
            info: info,
            options: {},
            success: success,
            warning: warning
        }
    })()
} (window, jQuery));

/*
jQuery Infinite Pages v0.2.0
https://github.com/magoosh/jquery-infinite-pages

Released under the MIT License
 */

(function() {
  var slice = [].slice;

  (function($, window) {
    var InfinitePages;
    InfinitePages = (function() {
      InfinitePages.prototype.defaults = {
        debug: false,
        navSelector: 'a[rel=next]',
        buffer: 1000,
        loading: null,
        success: null,
        error: null,
        context: window,
        state: {
          paused: false,
          loading: false
        }
      };

      function InfinitePages(container, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$container = $(container);
        this.$table = $(container).find('table');
        this.$context = $(this.options.context);
        this.init();
      }

      InfinitePages.prototype.init = function() {
        var scrollHandler, scrollTimeout;
        scrollTimeout = null;
        scrollHandler = ((function(_this) {
          return function() {
            return _this.check();
          };
        })(this));
        return this.$context.scroll(function() {
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
          }
          return scrollTimeout = setTimeout(scrollHandler, 250);
        });
      };

      InfinitePages.prototype._log = function(msg) {
        if (this.options.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };

      InfinitePages.prototype.check = function() {
        var distance, nav, windowBottom;
        nav = this.$container.find(this.options.navSelector);
        if (nav.size() === 0) {
          return this._log("No more pages to load");
        } else {
          windowBottom = this.$context.scrollTop() + this.$context.height();
          distance = nav.offset().top - windowBottom;
          if (this.options.state.paused) {
            return this._log("Paused");
          } else if (this.options.state.loading) {
            return this._log("Waiting...");
          } else if (distance > this.options.buffer) {
            return this._log((distance - this.options.buffer) + "px remaining...");
          } else {
            return this.next();
          }
        }
      };

      InfinitePages.prototype.next = function() {
        if (this.options.state.done) {
          return this._log("Loaded all pages");
        } else {
          this._loading();
          return $.getScript(this.$container.find(this.options.navSelector).attr('href')).done((function(_this) {
            return function() {
              return _this._success();
            };
          })(this)).fail((function(_this) {
            return function() {
              return _this._error();
            };
          })(this));
        }
      };

      InfinitePages.prototype._loading = function() {
        this.options.state.loading = true;
        this._log("Loading next page...");
        if (typeof this.options.loading === 'function') {
          return this.$container.find(this.options.navSelector).each(this.options.loading);
        }
      };

      InfinitePages.prototype._success = function() {
        this.options.state.loading = false;
        this._log("New page loaded!");
        if (typeof this.options.success === 'function') {
          return this.$container.find(this.options.navSelector).each(this.options.success);
        }
      };

      InfinitePages.prototype._error = function() {
        this.options.state.loading = false;
        this._log("Error loading new page :(");
        if (typeof this.options.error === 'function') {
          return this.$container.find(this.options.navSelector).each(this.options.error);
        }
      };

      InfinitePages.prototype.pause = function() {
        this.options.state.paused = true;
        return this._log("Scroll checks paused");
      };

      InfinitePages.prototype.resume = function() {
        this.options.state.paused = false;
        this._log("Scroll checks resumed");
        return this.check();
      };

      return InfinitePages;

    })();
    return $.fn.extend({
      infinitePages: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('infinitepages');
          if (!data) {
            $this.data('infinitepages', (data = new InfinitePages(this, option)));
          }
          if (typeof option === 'string') {
            return data[option].apply(data, args);
          }
        });
      }
    });
  })(window.jQuery, window);

}).call(this);





















/*global toastr*/

 toastr.options = {
                  "closeButton": true,
                  "debug": false,
                  "positionClass": "toast-bottom-right",
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "1000",
                  "timeOut": "3000",
                  "extendedTimeOut": "500",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
              }
;
