const fs = require('fs');
const path = require('path');
const readline = require('readline');

const FILE_PATH = path.join(__dirname, 'tasks.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTask(task) {
  fs.appendFileSync(FILE_PATH, `${task}\n`);
  console.log('Task added successfully.');
  rl.prompt(); // Prompt for the next operation
}

function viewTasks() {
  const tasks = fs.readFileSync(FILE_PATH, 'utf8').split('\n').filter(Boolean);
  console.log('Tasks:');
  tasks.forEach((task, index) => console.log(`${index + 1}. ${task}`));
  rl.prompt(); // Prompt for the next operation
}

function markTaskComplete(index) {
  const tasks = fs.readFileSync(FILE_PATH, 'utf8').split('\n').filter(Boolean);
  if (index >= 1 && index <= tasks.length) {
    tasks[index - 1] += ' - Completed';
    fs.writeFileSync(FILE_PATH, tasks.join('\n'));
    console.log('Task marked as complete.');
  } else {
    console.log('Invalid task index.');
  }
  rl.prompt(); // Prompt for the next operation
}

function removeTask(index) {
  const tasks = fs.readFileSync(FILE_PATH, 'utf8').split('\n').filter(Boolean);
  if (index >= 1 && index <= tasks.length) {
    tasks.splice(index - 1, 1);
    fs.writeFileSync(FILE_PATH, tasks.join('\n'));
    console.log('Task removed successfully.');
  } else {
    console.log('Invalid task index.');
  }
  rl.prompt(); // Prompt for the next operation
}

function selectOperation() {
  rl.question('Select an operation:\n1. Add a new task\n2. View tasks\n3. Mark a task as complete\n4. Remove a task\n', (answer) => {
    switch (answer) {
      case '1':
        rl.question('Enter the task: ', (task) => {
          addTask(task);
        });
        break;
      case '2':
        viewTasks();
        break;
      case '3':
        rl.question('Enter the index of the task to mark as complete: ', (index) => {
          markTaskComplete(parseInt(index));
        });
        break;
      case '4':
        rl.question('Enter the index of the task to remove: ', (index) => {
          removeTask(parseInt(index));
        });
        break;
      default:
        console.log('Invalid operation.');
    }
  });
}

// Prompt for the first operation
rl.prompt();

// Listen for line events to continuously prompt for operations
rl.on('line', () => {
  selectOperation();
});

// Handle close event
rl.on('close', () => {
  console.log('Exiting...');
  process.exit(0);
});
