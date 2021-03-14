class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
//Comments below are console logs to visualize the Command Objects
//  let sampleCommand = new Command('Status_Check');
//  console.log(sampleCommand)

//  let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
//  console.log(commands)
 module.exports = Command;