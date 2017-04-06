import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';


class MyStore extends EventEmitter {
    constructor(){
        super();
        this.name = 'Manny';
        this.age = '43';
        this.gender = 'Male';
        this.city = 'San Jose';
        this.state = 'CA';
        this.country = 'US';
        this.hobbies = ['chess', 'table tennis', 'cricket', 'movies'];
    }

    getName(){
        return this.name;
    }
    setName(newName){
        this.name = newName;
        this.emit('change');
    }

    getAge(){
        return this.age;
    }
    setAge(newAge){
        this.name = newAge;
        this.emit('change');
    }

    getGender(){
        return this.gender;
    }
    setGender(newGender){
        this.name = newGender;
        this.emit('change');
    }


    getCity(){
        return this.city;
    }
    setCity(newCity){
        this.name = newCity;
        this.emit('change');
    }

    getState(){
        return this.state;
    }
    setState(newState){
        this.name = newState;
        this.emit('change');
    }

    getCountry(){
        return this.country;
    }
    setCountry(newCountry){
        this.name = newCountry;
        this.emit('change');
    }

    getHobbies(){
        return this.hobbies;
    }
    setHobbies(newHobbies){
        this.name = newHobbies;
        this.emit('change');
    }

    getAll() {
        let obj = {
            name: this.getName(),
            age: this.getAge(),
            gender: this.getGender(),
            city: this.getCity(),
            state: this.getState(),
            country: this.getCountry(),
            hobbies: this.getHobbies()
        };
        return obj;
    }

    handleAction(payload){
        // payload: type, obj
        console.log('action has arrived from dispatcher of payload of', payload);

        switch (payload.type) {
            case 'change_my_name':
                this.setName(payload.name);
                break;
            case 'change_my_age':
                this.setAge(payload.name);
                break;
            default:
                break;
        }
    }

}

const yStore = new MyStore();
dispatcher.register(yStore.handleAction.bind(yStore));

export default yStore;
