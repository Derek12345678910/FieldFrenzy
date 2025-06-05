function handleSearch(): void{
    const SEARCHBAR = document.getElementById("search-bar") as HTMLInputElement;
    const search: string = SEARCHBAR.value
    SEARCHBAR.value = "";
    console.log(search);
}