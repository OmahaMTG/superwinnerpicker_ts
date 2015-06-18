class Customer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

var c = new Customer('bob');
c.getName();