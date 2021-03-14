const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  //Test #7
  it('constructor sets position and default values for mode and generatorWatts', function (){
      let rover = new Rover('position');
      expect(rover.position, rover.mode, rover.generatorWatts).toEqual('position', 'NORMAL', 110);
  });

//   //Test #8
  it('response returned by receiveMessage contains name of message', function (){
      let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];      
      let message = new Message('name of message', commands);
      let rover = new Rover('position');
      //message.name = 'name of message'
      let response = rover.receiveMessage(message);
      expect(response.message).toEqual('name of message');
  });

//   //Test #9
  it('response returned by receivemessage includes two results if two commands are sent in the message', function (){
      //testing if response.results.length == message.commands.length?
      let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
      let message = new Message('Another message!', commands);
      let rover = new Rover(98382);
      //message.commands = an array of command objects
      //[{commandType: 'STATUS_CHECK', value: undefined}, {commandType: 'MOVE', value: 20}]
      let response = rover.receiveMessage(message)
      expect(response.results.length).toEqual(2);
  });

//   //Test #10:
  it('responds correctly to status check command', function (){
      let commands = [new Command('STATUS_CHECK')];
      let message = new Message('Another message!', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);

      expect(response.results).toEqual([{completed: true, roverStatus: {mode:'NORMAL', generatorWatts: 110, position: 98382}}])


  });

//   //Test #11:
  it('responds correctly to mode change command', function (){
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let message = new Message('Another message!', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);

      expect(response.results).toEqual([{completed: true}])
      expect(rover.mode).toEqual("LOW_POWER");


  });

//   //Test #12:
  it('responds with false completed value when attempting to move in LOW_POWER mode', function (){
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
      let rover = new Rover(98382);
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);

 
      expect(response.results).toEqual([{completed: true}, {completed: false}]);
        //Failure: Expected $[1] to be a kind of Object, but was Command({ commandType: 'Move', value: 12000 })
        //keep getting this message. But completed: false should be results[1];

  });

  //Test #13
  it('responds with position for MOVE command', function (){
      let commands = [new Command('MOVE', 12000)];
      let rover = new Rover(98382);
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);

      expect(response.results).toEqual([{completed: true}]);
      expect(rover.position).toEqual(12000);

  });
});
