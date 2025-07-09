export default class Book {
    constructor (title, author, category, coverImage, amountPages) {
        this.id = crypto.randomUUID(); // creates a unique id
        this.dateAdded = Date();
        this.title = title;
        this.author = author;
        this.category = category;
        this.coverImage = coverImage;
        this.amountOfPages = amountPages;
    }
}