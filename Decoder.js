const chalk = require('chalk');
let chef = null;

function Init()
{
    console.log(chalk.blueBright("Warming up CyberChef!"));
    chef = require("cyberchef");
    console.log(chalk.greenBright("Done warming up, lets go!"));
}

const Decode = ((dataToDecode) => 
{
    if(chef == null) { Init(); }

    let results = [];

    results.push(Base32(dataToDecode));
    results.push(Base58(dataToDecode));
    results.push(Base62(dataToDecode));
    results.push(Base64(dataToDecode));
    results.push(Base85(dataToDecode));
    results.push(Binary(dataToDecode));
    results.push(Braille(dataToDecode));
    results.push(Hex(dataToDecode));
    results.push(Decimal(dataToDecode));
    results.push(MorseCode(dataToDecode));
    results.push(Octal(dataToDecode));
    results.push(ROT13(dataToDecode));
    results.push(ROT47(dataToDecode));

    return results;
});

function Base32(data)
{
    try
    {
        return chef.fromBase32(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Base58(data)
{
    try
    {
        return chef.fromBase58(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Base62(data)
{
    try
    {
        return chef.fromBase62(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Base64(data)
{
    try
    {
        return chef.fromBase64(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Base85(data)
{
    try
    {
        return chef.fromBase85(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Binary(data)
{
    try
    {
        return chef.fromBinary(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Hex(data)
{
    try
    {
        return chef.fromHex(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Braille(data)
{
    try
    {
        return chef.fromBraille(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Decimal(data)
{
    try
    {
        return chef.fromDecimal(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function MorseCode(data)
{
    try
    {
        return chef.fromMorseCode(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function Octal(data)
{
    try
    {
        return chef.fromOctal(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function ROT13(data)
{
    try
    {
        return chef.ROT13(data).toString();
    } 
    catch (error) 
    {
        
        return "";
    }
}

function ROT47(data)
{
    try
    {
        return chef.ROT47(data).toString();
    } 
    catch (error) 
    {
        return "";
    }
}

exports.Decode = Decode;