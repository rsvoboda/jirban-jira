System.register([], function(exports_1) {
    var Indexed;
    return {
        setters:[],
        execute: function() {
            /**
             * Container for an array, and a lookup of the array index by key
             */
            Indexed = (function () {
                function Indexed() {
                    this._array = [];
                    this._indices = {};
                }
                /**
                 * Creates an index where the input is an array of entries
                 * @param input the array input
                 * @param factory function to create the entries of type T
                 * @param keyValue function to get the key to index by
                 */
                Indexed.prototype.indexArray = function (input, factory, keyValue) {
                    var i = 0;
                    for (var _i = 0; _i < input.length; _i++) {
                        var entry = input[_i];
                        var value = factory(entry);
                        var key = keyValue(value);
                        this._array.push(value);
                        this._indices[key] = i++;
                    }
                };
                /**
                 * Creates an index where the input is a map of entries
                 * @param input the array input
                 * @param factory function to create the entries of type T
                 * @param keyValue function to get the key to index by
                 */
                Indexed.prototype.indexMap = function (input, factory) {
                    var i = 0;
                    for (var key in input) {
                        var value = factory(key, input[key]);
                        this._array.push(value);
                        this._indices[key] = i++;
                    }
                };
                Indexed.prototype.forKey = function (key) {
                    var index = this._indices[key];
                    if (isNaN(index)) {
                        return null;
                    }
                    return this._array[index];
                };
                Indexed.prototype.forIndex = function (index) {
                    return this._array[index];
                };
                /**
                 * Deletes the entries with the selected keys
                 * @param keys the keys to remove
                 * @return the entries that were deleted
                 */
                Indexed.prototype.deleteKeys = function (keys) {
                    if (keys.length == 0) {
                        return [];
                    }
                    //Map the indices to keys
                    var indicesToKeys = new Array(this.array.length);
                    for (var key in this._indices) {
                        var index = this._indices[key];
                        indicesToKeys[index] = key;
                    }
                    //Index the keys we want to delete
                    var deleteKeys = {};
                    for (var _i = 0; _i < keys.length; _i++) {
                        var key = keys[_i];
                        deleteKeys[key] = true;
                    }
                    var deleted = [];
                    var newArray = [];
                    var newIndices = {};
                    var currentIndex = 0;
                    for (var i = 0; i < this._array.length; i++) {
                        var key = indicesToKeys[i];
                        if (deleteKeys[key]) {
                            deleted.push(this._array[i]);
                            continue;
                        }
                        newArray.push(this._array[i]);
                        newIndices[key] = currentIndex++;
                    }
                    this._array = newArray;
                    this._indices = newIndices;
                    return deleted;
                };
                Indexed.prototype.add = function (key, value) {
                    if (!this._indices[key]) {
                        var index = this.array.length;
                        this.array.push(value);
                        this.indices[key] = index;
                    }
                };
                Indexed.prototype.reorder = function (values, keyValue) {
                    for (var i = 0; i < values.length; i++) {
                        this._array[i] = values[i];
                        this._indices[keyValue(values[i])] = i;
                    }
                };
                Object.defineProperty(Indexed.prototype, "array", {
                    get: function () {
                        return this._array;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Indexed.prototype, "indices", {
                    get: function () {
                        return this._indices;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Indexed;
            })();
            exports_1("Indexed", Indexed);
        }
    }
});
//# sourceMappingURL=indexed.js.map