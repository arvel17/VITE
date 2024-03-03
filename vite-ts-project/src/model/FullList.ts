import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    //untuk membuat daftar dari penympanan local
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") return; //jika data bukan string makan stop

    //data yang dimuat akan diuraikan menjadi objek ListItem dan ditambahkan ke daftar
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._id,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    //menyimpan daftar ke penyimpanan lokal dengan mengconvert ke JSON
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    //Menghapus seluruh isi daftar dan menympan ke local
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    //add object ListItem baru ke dalam daftar
    this._list.push(itemObj);
    this.save;
  }

  removeItem(id: string): void {
    // menghapus object ListItem dengan ID yang sesuai daftar
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
