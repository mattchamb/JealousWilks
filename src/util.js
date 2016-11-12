function mutate(getter, eventName) {
    return {
        get () {
            return getter(this.$store.state);
        },
        set (value) {
            this.$store.commit(eventName, value)
        }
    };
}

export { mutate };