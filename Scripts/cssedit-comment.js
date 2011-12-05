/**
 * cssedit-comment.js
 * 
 * Mimics the CSSEdit "new comment" button by adding a comment between selectors
 */

action.performWithContext = function(context, outError) {
	// Get our selection
	var range = context.selectedRanges[0];
	// Grab the surrounding item to see if we are inside a selector block
	var item = context.itemizer.smallestItemContainingCharacterRange(range);
	// Init our snippet and target index
	var snippet = '/* $0 */';
	var target = range.location;
	// Make sure we are not inside a style, comment, or @import
	var disallowed = new SXSelector('css.style, css.comment, css.at-import');
	if (disallowed.matches(item)) {
		// Add leading linebreaks to our snippet
		var br = context.textPreferences.lineEndingString;
		snippet = br + br + snippet;
		// Set our target to immediately after our current item
		target = item.range.location + item.range.length;
	}
	// Place our cursor
	context.selectedRanges = [new Range(target, 0)];
	// Insert our snippet
	return context.insertTextSnippet(new CETextSnippet(snippet));
};
