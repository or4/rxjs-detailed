// Observer Pattern
// Каждый из observer может обрабатывать значение по-разному

// Субъект изменяет значение
// Также называется Observable, наблюдаемый объект

// Наблюдатель (Observer) реагирует на изменения

export class Subject {
    private observers: any[];

    public constructor() {
        this.observers = [];
    }

    public add(observer: any) {
        this.observers.push(observer);
    }

    public remove(observer: any) {
        const index = this.observers.indexOf(observer);

        if (index === -1) {
            return;
        }

        this.observers.splice(index, 1);
    }

    public notify(value: any) {
        this.observers.forEach(observer => {
            observer.update(value);
        });
    }
}
