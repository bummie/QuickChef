const chalk = require('chalk');
const Decoder = require('./Decoder.js');
const fs = require('fs');

const prefix_error = chalk.red("[-] ");
const prefix_good = chalk.green("[+] ");

const TimeStarted = new Date().getTime();

const Arguments = process.argv.slice(2);
let FlagFormat = "";
let FoundFlags = [];
let Input = [];
let Depth = 1;

function Init()
{
    PrintLogo();
    ReadArguments();
    Run();
    PrintFoundFlags();
}

function Run()
{
    while(Depth > 0)
    {
        RunStep();
        Depth--;
    }
}

function RunStep()
{
    DecodeInput();
    LookForFlag(Input);
}

function DecodeInput()
{
    let result = [];
    Input.forEach((value) => 
    {
        if(value == null || value <= 0) { return; }
    
        Decoder.Decode(value).forEach((str) => 
        {
            if(str == null || str.length <= 0) { return; }
            
            result.push(str);
        });
    });

    Input = result;

    console.log(prefix_good + "Depth " + Depth + " result:");
    PrintInput();
}

function ReadArguments()
{
    Arguments.forEach(ParseArgument);
}

function ParseArgument(argument, index)
{
    if(argument.charAt(0) != '-') { return; }

    switch (argument) 
    {
        case '-f':
        case '-flag':
            SetFlagFormat(index + 1);
        break;

        case '-i':
        case '-input':
            SetInput(index + 1);
        break;

        case '-d':
        case '-depth':
            SetDepth(index + 1);
        break;

        case '-h':
        case '-help':
            PrintHelp();
        break;

        default:
            console.log(prefix_error + argument + " is invalid. Use -help to print instructions!");
        }
}


function SetDepth(index)
{
    if((Arguments.length-1) < index) { console.log(prefix_error + "No depth given!"); }
    
    try
    {
        Depth = Math.floor(parseInt(Arguments[index]));
    }
    catch(error)
    {
        console.log(prefix_error + "Depth value must be an integer!");
    }

    console.log(prefix_good + "Depth: " + Depth);
}

function SetInput(index)
{
    if((Arguments.length-1) < index) { console.log(prefix_error + "No input given!"); }
    
    Input.push(Arguments[index]);

    console.log(prefix_good + "Input: " + Input[0]);
}

function SetFlagFormat(index)
{
    if((Arguments.length-1) < index) { console.log(prefix_error + "No flag format given!"); }
    
    FlagFormat = Arguments[index];

    console.log(prefix_good + "Flagformat: " + FlagFormat);
}

function LookForFlag(array)
{
    if(FlagFormat == null || FlagFormat == "" ) { return; }
    
    array.forEach((str) => 
    {
        if(!(str.toString().toLowerCase().includes(FlagFormat.toLowerCase()))) { return; }
        
        FoundFlags.push(str);
    });
}

function PrintHelp()
{
    console.log(chalk.yellowBright("H E L P"));
    console.log(chalk.yellowBright("Example:"));
    console.log(chalk.yellow("node .\index.js -flag zh3r0 -input 123456789"));
}

function PrintLogo()
{
    console.log(chalk.redBright("     _____     _     _   _____ _       ___ "));
    console.log(chalk.yellowBright("    |     |_ _|_|___| |_|     | |_ ___|  _|"));
    console.log(chalk.greenBright("    |  |  | | | |  _| '_|   --|   | -_|  _|"));
    console.log(chalk.yellowBright("    |  |  | | | |  _| '_|   --|   | -_|  _|"));
    console.log(chalk.blueBright("    |__  _|___|_|___|_,_|_____|_|_|___|_|  "));
    console.log(chalk.magentaBright("    |__  _|___|_|___|_,_|_____|_|_|___|_|  "));
    console.log(chalk.cyanBright("       |__|                                "));
}

function PrintFoundFlags()
{
    if(FoundFlags.length > 0)
    {
        console.log(prefix_good + "Flag(s)!");
        console.log(FoundFlags);
    }
}

function PrintInput()
{
    if(Input.length < 10) {console.log(Input); }

    console.log(prefix_good + "Storing output to file.");
    fs.writeFile('./logs/quickchef_log_' + TimeStarted + '.txt', JSON.stringify(Input),  {'flag':'a'},  function(error) 
    {
        if (error) 
        {
            console.log(prefix_error + error)
        }
    });
}


Init();