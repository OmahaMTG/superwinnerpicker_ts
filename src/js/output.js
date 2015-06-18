var Customer = (function () {
    function Customer(name) {
        this.name = name;
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    return Customer;
})();
var c = new Customer('bob');
c.getName();

//# sourceMappingURL=output.js.map