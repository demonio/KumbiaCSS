const storage = {
    save: function(key, val) {
        localStorage.setItem(key, val);
    },
    read: function(key) {
        return localStorage.getItem(key);
    },
    quit: function(key) {
        localStorage.removeItem(key);
    },
    increment: function(key, val) {
        localStorage.setItem(key, Number(localStorage.getItem(key)) + Number(val));
    },
    decrement: function(key, val) {
        localStorage.setItem(key, Number(localStorage.getItem(key)) - Number(val));
    },
    clear: function() {
        localStorage.clear();
    },
    action: function(action, key, val) {
        if (action === 'save') {
            this.save(key, val);
        } else if (action === 'read') {
            return this.read(key);
        } else if (action === 'quit') {
            this.quit(key);
        } else if (action === '+') {
            this.increment(key, val);
        } else if (action === '-') {
            this.decrement(key, val);
        } else if (action === 'clear') {
            this.clear();
        } else {
            console.error(`Unknown action: ${action}`);
        }
        return localStorage.getItem(key);
    }
}