import { v4 as uuidv4 } from "uuid";



class User{
    static createUser(name: string, age: number): User{
        if (age < 0){
            throw new Error('Invalid age. Age must be a number greater than zero.')
        }
        document.getElementById("cartdiv")!.style.visibility = "visible";
        document.getElementById("shop")!.style.visibility = "visible";
        document.getElementById("login")!.remove();
        const newUser = new User(name, age);
        return newUser;
    }
    constructor(
        private _name: string,
        private _age: number,
        private _cart: Item[] = [],
        private readonly _id: string = uuidv4()
    ){}

    public addToCart(item:Item){
        this.cart.push(item)
    }

    public removeFromCart(itemToRemove:Item):void{
        this.cart = this.cart.filter(item => item.id !== itemToRemove.id)
    }

    public removeQuantityFromCart(itemToRemove:Item, quantity:number):void{
        for (let i=0; i<quantity; i++){
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
    }

    public cartTotal():number{
        let total = 0
        for (let x of this.cart){
            total += x.price
        }
        return total
    }

    public printCart():void{
        for (let x of this.cart){
            console.log(x.name)
        }
    }

    cartHTMLElement(){
        const cart = document.createElement('table');
        for (const item of new Set(this.cart)){
            const minusOne = document.createElement("button");
            minusOne.id = `${item.id}-minus1`;
            minusOne.classList.add("btn", "btn-danger");
            minusOne.onclick = () => {
                Shop.myUser.removeQuantityFromCart(item, 1);
            };
            minusOne.innerText = "-1";
            const removeAll = document.createElement('button');
            removeAll.id = `${item.id}-removeall`;
            removeAll.innerText = "X";
            removeAll.classList.add("btn", "btn-dark-red", "btn-danger");
            removeAll.onclick = () => {
                Shop.myUser.removeFromCart(item);
            }
            cart.innerHTML +=  `<tr><td><strong>${item.name}</strong></td><td>$${item.price}</td>
            <td>${this.cart.filter((i) => i.id === item.id).length}</td>
            <td>${removeAll.outerHTML}</td>
            <td>${minusOne.outerHTML}</td>
            </tr>`;
        };

        cart.innerHTML += `<tr id="totalbar"><td><strong>${"Total:"}</strong></td><td>$${this.cartTotal().toFixed(2)}</td></tr>`;
        return cart;
    }

    addRemoveEventListeners(){
        for (const item of new Set(this.cart)) {
            const removeOne = document.getElementById(`${item.id}-minus1`) || null;
            if(removeOne) {
                removeOne.onclick = () => {
                    Shop.myUser.removeQuantityFromCart(item, 1);
                };
            }
            const removeAll = document.getElementById(`${item.id}-removeall`) || null;
            if (removeAll) {
                removeAll.onclick = () => {
                    Shop.myUser.removeFromCart(item);
                };
            }
        }
    }

    public get id(): string {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }
    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }
}

class Item{

    constructor(
        private _name: string,
        private _price: number,
        private _description: string,
        private readonly  _id: string = uuidv4()
    ){}

    itemElement(){
        const displayShop = document.createElement('div');
        displayShop.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="https://picsum.photos/200" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text">${this.price}</p>
                <button class="btn btn-primary" id="addtocart">Add to Cart</button>
            </div>
        </div>`;
        return displayShop;
    }

    public get id(): string {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
}

class Shop {
    private _items: Item[];
    static myUser: User;
    constructor() {
        const item1 = new Item("Source Magazine", 8.99, "A copy of the latest issue of Source Magazine.");
        const item2 = new Item("Pack of Gum", 2.99, "35 pack of Wrigley's Polar Ice EXTRA chewing gum.");
        const item3 = new Item("ChapStick", 3.99, "A small container of lip moisturizer.");
        const item4 = new Item("Notebook", 19.99, "128-page College-Ruled Notebook");
        const item5 = new Item("Wireless Keyboard", 98.99, "Logitech MX Keys Wireless Keyboard");
        const item6 = new Item("Wirless Headset", 79.99, "Logitech G535 Lightspeed Wireless Gaming Headset")

        this._items = [item1, item2, item3, item4, item5, item6];
        this.showItems();
        Shop.myUser.cart = [];
        Shop.updateCart();
    }

    showItems(){
        for (let item of this.items){
            document.getElementById("shop")!.appendChild(item.itemElement());
        }
    }

    static updateCart() {
        const cartDiv = document.getElementById("cartdiv") as HTMLElement;
        if (Shop.myUser.cart.length <= 0) {
            cartDiv.innerHTML = 
            `<h2 id="cart-header">${Shop.myUser.name}'s Cart</h2>
            <p>Cart is Empty</p>`;
        } else {
            cartDiv.replaceChildren(Shop.myUser.cartHTMLElement());
            cartDiv.innerHTML = (`<h2 id="cart-header">${Shop.myUser.name}'s Cart</h2>` +cartDiv.innerHTML);
            Shop.myUser.addRemoveEventListeners();
        }
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }
    static loginUser(e:MouseEvent){
        e.preventDefault();
        const nameInput = document.getElementById("name") as HTMLInputElement;
        const ageInput = document.getElementById("age") as HTMLInputElement;
        Shop.myUser = User.createUser(nameInput.value, parseInt(ageInput.value));
        new Shop();
    }
}

document.getElementById("loginbutton")!.addEventListener("click", (e) => Shop.loginUser(e));

