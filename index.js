// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

RangeCollection = function () {

  this.collections = [];

  // Inputed range is not inside of any collections.
  this.OUTSIDE_RANGE = 0;
  // Input range is left side of collection.
  this.COLLAPSE_RANGE_ONE = 1;
  // Input range overlaps with collection and includes only collection start
  this.COLLAPSE_RANGE_TWO = 2;
  // Input range includes collection start, end
  this.COLLAPSE_RANGE_THREE = 3;
  // Input range overlaps with collection and right side of collection start
  this.COLLAPSE_RANGE_FOUR = 4;

}

/**
 * Get overlapped status
 * @param {collection, startNumber, endNumber} - collection object, start, end number
 */
RangeCollection.prototype.getOverlapStatus = function(collection, startNumber, endNumber) {
  const start = collection.start;
  const end = collection.end;
  if (startNumber > end || endNumber < start) {
    return this.OUTSIDE_RANGE;
  } else if (startNumber < start && endNumber <= end) {
    return this.COLLAPSE_RANGE_ONE;
  } else if (startNumber < start && endNumber > end) {
    return this.COLLAPSE_RANGE_TWO;
  } else if (startNumber >= start && endNumber <= end) {
    return this.COLLAPSE_RANGE_THREE;
  } else if (startNumber >= start && endNumber > end) {
    return this.COLLAPSE_RANGE_FOUR;
  }
}

/**
 * Adds a range to the collection
 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
 */
RangeCollection.prototype.add = function (range) {
  // TODO: implement this
  let added = false;
  let startNumber = range[0];
  let endNumber = range[1];
  // If start and end is same do nothing.
  if (startNumber >= endNumber) return;

  const newCollections = this.collections.reduce((result, collection) => {
    const status = this.getOverlapStatus(collection, startNumber, endNumber);
    if (status === this.OUTSIDE_RANGE) {
      // Add new collection
      return [...result, collection];
    } else if (status === this.COLLAPSE_RANGE_ONE) {
      // Update collection end value
      endNumber = collection.end;
      return [...result];
    } else if (status === this.COLLAPSE_RANGE_TWO) {
      return [...result];
    } else if (status === this.COLLAPSE_RANGE_THREE) {
      added = true;
      return [...result, collection];
    } else if (status === this.COLLAPSE_RANGE_FOUR) {
      // Update collection start value
      startNumber = collection.start;
      return [...result];
    }
  }, []);

  if (this.collections.length === 0 || !added) {
    // Add new collection
    newCollections.push({
      start: startNumber,
      end: endNumber,
    });
  }
  this.collections = [...newCollections];
  // Sort collections
  this.collections.sort(function(a, b) {
    return a.start - b.start;
  });
}

/**
 * Prints out the list of ranges in the range collection
 */
RangeCollection.prototype.print = function () {
  // TODO: implement this
  const collections = this.collections.reduce((results, collection) => {
    results = results + `[${collection.start}, ${collection.end}) `;
    return results;
  }, '');
  console.log(collections);
}

/**
 * Removes a range from the collection
 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
 */
RangeCollection.prototype.remove = function (range) {
  // TODO: implement this
  let removed = false;
  let startNumber = range[0];
  let endNumber = range[1];
  let newResult;
  if (startNumber >= endNumber) return;

  const newCollections = this.collections.reduce((result, collection) => {
    const status = this.getOverlapStatus(collection, startNumber, endNumber);
    let start;
    let end;

    if (status === this.OUTSIDE_RANGE) {
      return [...result, collection];
    } else if (status === this.COLLAPSE_RANGE_ONE) {
      newResult = [...result, { start: endNumber, end: collection.end }];
      endNumber = end;
      return newResult;
    } else if (status === this.COLLAPSE_RANGE_TWO) {
      return [...result];
    } else if (status === this.COLLAPSE_RANGE_THREE) {
      newResult = [...result];
      if (collection.start !== startNumber) {
        newResult = [...newResult, { start: collection.start, end: startNumber }];
      }
      if (endNumber !== collection.end) {
        newResult = [...newResult, { start: endNumber, end: collection.end }];
      }
      return newResult;
    } else if (status === this.COLLAPSE_RANGE_FOUR) {
      newResult = [...result, { start: collection.start, end: startNumber }];
      startNumber = collection.end;
      return newResult;
    }
  }, []);

  this.collections = [...newCollections];
  // Sort collections
  this.collections.sort(function(a, b) {
    return a.start - b.start;
  });
}

/**
 * Get Collection value as string text
 */
RangeCollection.prototype.collectionString = function () {
  // TODO: implement this
  const collections = this.collections.reduce((results, collection) => {
    results = results + `[${collection.start}, ${collection.end}) `;
    return results;
  }, '');
  return collections;
}

module.exports = new RangeCollection();