// pair data structure
// mainly used for merge sort holding index and value
export class PairNode<T> {
  constructor(public val: T, public index: number) {}
}

export class List<T> {
  public unsortedData: T[] = new Array<T>(10);
  public sortedData: T[] = new Array<T>(10);
  private numItems: number = 0;
  private startSize: number = 10;

  // post: removes the element at index.
  //  returns without removing if index is not between
  //  0 and size() - 1
  public delete(index: number) {
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

  public size(): number {
    return this.numItems;
  }

  public isEmpty(): boolean {
    return this.numItems === 0;
  }

  // inserts a number at a certain index, pushing everything from the right of it 1 space right
  public insert(val: T, index: number) {
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

  public replace(val: T, index: number): void {
    if (index < 0 || index >= this.numItems) return;
    this.unsortedData[index] = val;
  }

  public get(index: number): T | null {
    if (index < 0 || index >= this.numItems) return null;
    return this.unsortedData[index];
  }

  // ammoritized O(1)
  // because the array will usually be big enough to O(1) add elements
  public push(val: T) {
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

  public getData(): T[] {
    return this.unsortedData.slice(0, this.numItems);
  }

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
    public ascending(a: number, b:number): number{
        if (a === b) return 0;
        return a < b ? 1 : -1;
    }
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

  /**
   * Empty the list
   */
  public empty(): void {
    for (let i = this.numItems - 1; i >= 0; i--) {
      this.delete(i);
    }
  }
}
