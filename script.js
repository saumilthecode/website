const terminalOutput = document.getElementById("output");
const terminalInput = document.getElementById("input");
const terminal = document.getElementById("terminal");

let commandHistory = [];
let historyIndex = -1;

const commands = {
  help: () => `
Available commands:
- help: Show this help menu
- projects: List available projects
- education: Show educational background
- skills: List technical skills
- clear: Clear the terminal
- ls: List items in the current directory
- cd [directory]: Change to a specific directory
- pwd: Show current directory
- ascii: Display an ASCII dinosaur
- neofetch: Display system info (fun version)
`,
  projects: () => `
Projects:
- Grass: https://apps.apple.com/us/app/grass-grow-plants/id6444735516
- About BBSS: https://apps.apple.com/us/app/about-bbss/id6737804170
- BBSS Hack Club: http://bbsshack.club/
`,
  education: () => `
Education:
1. Pei Tong Primary School (2016–2021)
   - CCA Vice-President - Infocomm Club (2021)
   - Singapore Primary Science Olympiad (Bronze, 2021)
   - National Mathematical Olympiad of Singapore (2021)
   - Model Student Awards (2018, 2019)
2. Bukit Batok Secondary School (2022–2025)
   - Robotics Club
   - Participated in Sibbersec
   - Competed in First Lego League (2022)
   - Competed in National Robotics Competition (regular, 2024)
`,
  skills: () => `
Skills:
- Astro
- Git
- Swift
`,
  clear: () => {
    terminalOutput.innerHTML = "";
    return "";
  },
  ls: () => "projects  education  skills",
  pwd: () => "/home/user",
  cd: (args) => {
    if (!args) return "Error: Please specify a directory.";
    if (args === "projects" || args === "education" || args === "skills") {
      return `Changed directory to /home/user/${args}`;
    }
    return `Error: Directory '${args}' not found.`;
  },
  ascii: () => `
       __
      / _)
 .-^^^_/ /
  __/  /
 <___/<
Dinosaur ASCII art, because why not?
`,
  neofetch: () => `
${"~".repeat(20)}
| Saumil's Neofetch |
${"~".repeat(20)}
OS: PortfolioOS 1.0
Host: RetroTerminalJS
Kernel: SaumilCode 2024
Uptime: ${Math.floor(Math.random() * 1000)} hours
Packages: ${Math.floor(Math.random() * 500)} (npm)
Shell: SwiftlyBash
Resolution: 80x24
DE: SaumilUI
Theme: Green-on-Black Retro
CPU: Problem Solver™ Core
Memory: Endless Creativity™ RAM
Disk: Infinite Curiosity™ SSD
Socials:
- LinkedIn: <a href="https://www.linkedin.com/in/saumil707/" target="_blank">https://www.linkedin.com/in/saumil707/</a>
- GitHub: <a href="https://github.com/saumilthecode" target="_blank">https://github.com/saumilthecode</a>
ASCII Art:
__
/ _)
.-^^^_/ /
__/  /
<___/<
DinoBrand PC
`,
};

const processCommand = async (input) => {
  const [command, ...args] = input.trim().split(" ");
  if (commands[command]) {
    const result = commands[command](args.join(" "));
    return result;
  }
  return `Error: Command '${command}' not found. Type 'help' for a list of commands.`;
};

const displayTypingEffect = async (text) => {
  for (const char of text) {
    terminalOutput.innerHTML += char;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  terminalOutput.innerHTML += "\n";
};

terminalInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const input = terminalInput.value;
    commandHistory.push(input);
    historyIndex = commandHistory.length;
    terminalOutput.innerHTML += `$ ${input}\n`;
    terminalInput.value = "";

    const result = await processCommand(input);
    if (result) await displayTypingEffect(result);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  } else if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex -= 1;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex += 1;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      terminalInput.value = "";
    }
  }
});

const focusInput = () => terminalInput.focus();
window.addEventListener("load", focusInput);
terminal.addEventListener("click", focusInput);
