class Race {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }

    getName = () => this.name;
    getIcon = () => this.icon;
};

export default Race;
