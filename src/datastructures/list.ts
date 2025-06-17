/**
 * Represents a key-value pair used in merge sort operations
 * Useful for tracking original indices during sorting
 */
export class PairNode<T> {
  /**
   * Creates a new PairNode.
   * @param val - The value of the node.
   * @param index - The original index of the value.
   */
  constructor(public val: T, public index: number) {}
}

/**
 * A generic list class that supports dynamic array resizing,
 * insertion, deletion, and sorting
 */
export class List<T> {
  public unsortedData: T[] = new Array<T>(10);
  public sortedData: T[] = new Array<T>(10);
  private numItems: number = 0;
  private startSize: number = 10;

  /**
   * Removes the element at the specified index.
   * Shrinks the array if it's only half full and larger than the start size
   * @param index - The index of the item to delete
   */
  public delete(index: number) : void{
    // halve the size of the array if it is only half full and larger than the startSize
    if (
      this.numItems === this.unsortedData.length / 2 &&
      this.unsortedData.length > this.startSize
    ) {
      let newData: T[] = new Array<T>(Math.floor(this.numItems / 2));

      for (let i = 0; i < this.numItems; i++) {
        newData[i] = this.unsortedData[i];
      }

      this.unsortedData = newData;
    }
    //shift values after index to the left
    for (let i = index; i < this.numItems; i++) {
      this.unsortedData[i] = this.unsortedData[i + 1];
    }

    this.numItems--;
  }

  /**
   * Returns the number of items in the list
   * @returns The size of the list
   */
  public size(): number {
    return this.numItems;
  }

  /**
   * Checks if the list is empty
   * @returns True if empty, otherwise false
   */
  public isEmpty(): boolean {
    return this.numItems === 0;
  }

  /**
   * Inserts a value at a specific index, shifting later elements right
   * @param val - Value to insert
   * @param index - Position at which to insert the value
   */
  public insert(val: T, index: number) : void {
    if (this.numItems === this.unsortedData.length) {
      let newData: T[] = new Array<T>(this.numItems * 2);

      for (let i = 0; i < this.numItems; i++) {
        newData[i] = this.unsortedData[i];
      }

      this.unsortedData = newData;
    }
    //shift values after index to the right
    for (let i = this.numItems; i > index; i--) {
      this.unsortedData[i] = this.unsortedData[i - 1];
    }

    this.unsortedData[index] = val;

    this.numItems++;
  }

  /**
   * Replaces the value at a given index with a new value
   * @param val - New value to set
   * @param index - Index to replace the value at
   */
  public replace(val: T, index: number): void {
    if (index < 0 || index >= this.numItems) return;
    this.unsortedData[index] = val;
  }

  /**
   * Retrieves the value at a given index
   * @param index - Index to access
   * @returns The value at the index, or null if invalid index
   */
  public get(index: number): T | null {
    if (index < 0 || index >= this.numItems) return null;
    return this.unsortedData[index];
  }

  /**
   * Appends a value to the end of the list
   * Dynamically resizes the array if needed
   * @param val - Value to add
   */
  public push(val: T) : void {
    if (this.numItems === this.unsortedData.length) {
      let newData: T[] = new Array<T>(this.numItems * 2);

      for (let i = 0; i < this.numItems; i++) {
        newData[i] = this.unsortedData[i];
      }

      this.unsortedData = newData;
    }
    this.unsortedData[this.numItems] = val;
    this.numItems++;
  }

  /**
   * Returns a shallow copy of the current data in the list
   * @returns An array of the list's current values
   */
  public getData(): T[] {
    return this.unsortedData.slice(0, this.numItems);
  }

  /**
   * Sorts the list using an iterative merge sort algorithm
   * Stores the result in sortedData
   * @param compareFn - Optional custom comparison function
   * @returns A sorted array of the list's values
   */
  public sort(compareFn?: (a: T, b: T) => number): T[] {
    const defaultCompare = (a: T, b: T): number => {
        if (a === b) return 0;
        return a < b ? 1 : -1;
    };
    const compare = compareFn ?? defaultCompare;

    const arr = this.unsortedData.slice(0, this.numItems).map((val, i) => new PairNode(val, i));
    const aux: PairNode<T>[] = new Array(arr.length);

    // Iterative Merge Sort
    for (let width = 1; width < arr.length; width *= 2) {
        for (let i = 0; i < arr.length; i += 2 * width) {
        const left = i;
        const mid = Math.min(i + width - 1, arr.length - 1);
        const right = Math.min(i + 2 * width - 1, arr.length - 1);

        let l = left, r = mid + 1, k = left;
        while (l <= mid && r <= right) {
            if (compare(arr[r].val, arr[l].val) === 1) {
            aux[k++] = arr[r++];
            } else {
            aux[k++] = arr[l++];
            }
        }
        while (l <= mid) aux[k++] = arr[l++];
        while (r <= right) aux[k++] = arr[r++];

        for (let j = left; j <= right; j++) {
            arr[j] = aux[j];
        }   
    }
    }

    for (let i = 0; i < arr.length; i++) {
        this.sortedData[i] = this.unsortedData[arr[i].index];
    }
    return this.sortedData;
    }

  /**
   * Compares two numbers for ascending order
   * Larger numbers come first (descending behavior)
   * @param a - First number
   * @param b - Second number
   * @returns 1 if a < b, -1 if a > b, 0 if equal
   */
    public ascending(a: number, b:number): number{
        if (a === b) return 0;
        return a < b ? 1 : -1;
    }

  /**
   * Compares two strings lexicographically in ascending order (case-insensitive)
   * Longer strings come after shorter ones if all characters are equal
   * @param target - First string
   * @param check - Second string
   * @returns 1 if target < check, -1 if target > check, 0 if equal
   */
    public alphaAscending(target: string, check:string): number{
        const len = Math.min(target.length,check.length);
        let a = target.toLowerCase();
        let b = check.toLowerCase();
        for(let i=0;i<len;i++){
            let aVal = a.charCodeAt(i);
            let bVal = b.charCodeAt(i);
            if(aVal === bVal){
                continue;
            }
            else if(aVal<bVal){
                return 1;
            }
            else{
                return -1;
            }
        }
        if(a.length<b.length){
            return 1;
        }
        if(a.length>b.length){
            return -1;
        }
        return 0;
    }
}