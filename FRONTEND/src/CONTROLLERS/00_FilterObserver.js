class FilterSubject {
  constructor() {
    this.observers = [];
    this.currentCategory = 'All';
  }

  subscribe(observer) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }

  notify(category) {
    this.currentCategory = category;
    this.observers.forEach(observer => observer(category));
  }

  getCategory() {
    return this.currentCategory;
  }
}

export const filterObserver = new FilterSubject();
