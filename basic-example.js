const EventEmitter = require('events');

this.soso = 'blabla';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
const mySecondEmitter = new MyEmitter();

myEmitter.on('event3', function(n1, n2) {
        console.log('an event occurred!');
    console.log('n1 + n2 = ', n1 + n2);
    console.log('this ', this);
    console.log('this === myEmitter ', this === myEmitter);
});

myEmitter.on('event3', function(n1, n2) {
    console.log('an event occurred! on second handler');
    console.log('n1 + n2 = ', n1 + n2);
    console.log('this ', this);
    console.log('this === myEmitter ', this === myEmitter);
});

mySecondEmitter.once('do_thing', () => {
    console.log('i will do the thing only once!');
});

// emitting the events
myEmitter.emit('event3', 1, 2);

mySecondEmitter.emit('do_thing', 1, 2);
mySecondEmitter.emit('do_thing', 1, 2);

// Error Events
// error event listener
myEmitter.on('error', (error) => {
    console.log('an error occurred');
});

myEmitter.emit('error', new Error('Whoops!'));
// this will throw the error, print a stack trace and exit the node.js process.
// to avoid the crash of the node.js process 'an error' listeners always should be added

// it is possible to monitor error events without consuming the emitted error by installing the listener
// using the symbol errorMonitor
// mySecondEmitter.on(EventEmitter.errorMonitor, (error) => {
//     console.log('err is', error);
// });

// mySecondEmitter.emit('error', new Error('Something went wrong!'));
// But this will still throws and crashes Node.js


// Capture rejection of Promises:
// - Using async functions with event handlers is problematic, because it can lead to unhandled rejection in case of
// a thrown exception.
// - The captureRejections option in the event emitter constructor or the global setting change the behavior, installing a
// .then(undefined, handler) handler on the promise.
// This handler routes the ex exception asynchronously to the Symbol.for('nodejs.rejection) method if there is one or to 'error'
// event handler if there is none.

const myThirdEventEmitter = new EventEmitter({captureRejections: true});

myThirdEventEmitter.on('error', (err) => {
    console.log('foo bar');
});

myThirdEventEmitter.on('something', async () => {
    throw new Error('kadoom');
});


myThirdEventEmitter.emit('something');
