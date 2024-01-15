let psd_output = document.querySelector("[psd-output]");
let data_copy = document.querySelector("[data-copy]");
let psd_length = document.querySelector("[psd-length]");
let psd_range = document.querySelector("[psd-range]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
let strength_indicator = document.querySelector("[strength-indicator]");
const submit_password = document.querySelector("[generate-password]");
let copied_text = document.querySelector("[copy-text]");

/**
 * In the starting i have done this because now randomly i can call at any index of the array using the loop and it will give the correct output randomly........,
*/


function insertUpperCase(){
    
    let value_2 = Math.floor(Math.random() * (90-65+1) + 65);
    return String.fromCharCode(value_2);
    
}

function insertLowerCase(){
    
    let value_2 = Math.floor(Math.random() * (122-97+1) + 97);
    return String.fromCharCode(value_2);
    
}

function insertNumbers(){
    
    let value_2 = Math.floor(Math.random() * (57-48+1) + 48);
    return String.fromCharCode(value_2);
    
}

function insertSymbols(){
    let value_2 = Math.floor(Math.random() * (47-33+1) + 33);
    return String.fromCharCode(value_2);
    
    
}


/**
 * But in the starting when no change occured on the slider then password length should be synced with slider value.So we have updated the value of password length.
*/
let passwordLength = psd_range.value;
psd_length.textContent = passwordLength;

// adding the function when we change the slider(psd-range) then the value of the psd-length also change

function lengthUpdate(){
    
    /**
     * In this what we have done that took the number from the psd_range because by default range.value will be the number only and directly update the textContent of the psd_length because it will automatically get converted to the string when store it in the psd_length.textContent.
    */
   let slider_value = parseInt(psd_range.value);
   passwordLength = slider_value;
   psd_length.textContent = slider_value ;

   psd_range.value = passwordLength;
    console.log(psd_range.value);
    const min = psd_range.min;
    const max = psd_range.max;
    psd_range.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
    // psd_range.style.backgroundColor = "red"
   
}

//psd_range.addEventListener("change",lengthUpdate);


psd_range.addEventListener('change',function handleSliderColor(){
    lengthUpdate();
    

})




/**
 * for the checkboxes the role of this is to suggest the password on the basis that how many checkboxes is clicked in this and to count them then decide further what would be the password......,
 */
let counterCheckBox ;
let upperCaseFlag= false;
let lowerCaseFlag= false;
let numberFlag= false;
let symbolsFlag= false;

function countCheckBox(){

    upperCaseFlag = false;
    lowerCaseFlag = false;
    numberFlag = false;
    symbolsFlag = false;

    counterCheckBox = 0;
    if(uppercase.checked){
        counterCheckBox+=1;
        upperCaseFlag=true;
    }
    if(lowercase.checked){
        counterCheckBox+=1;
        lowerCaseFlag=true;
    }
    if(numbers.checked){
        counterCheckBox+=1;
        numberFlag=true;
    }
    if(symbols.checked){
        counterCheckBox+=1;
        symbolsFlag=true;
    }
   
    
    if(counterCheckBox>=passwordLength)
    {
        passwordLength=counterCheckBox;
        psd_length.textContent = counterCheckBox;
        psd_range.value = counterCheckBox;

    }
}


uppercase.addEventListener("change",countCheckBox);
lowercase.addEventListener("change",countCheckBox);
numbers.addEventListener("change",countCheckBox);
symbols.addEventListener("change",countCheckBox);


/**
 * Strength logic of showing that which password is strong, weak, average.....,
 * 
 * weak = red {0-5(length)}, {only one checkbox selected}, {when numbers and symbols are only selected}, {when uppercase and lowercase are only selected}
 * 
 * average = yellow {6-7(length)}, {when lower and (numbers or symbols) OR three of them are ticked OR when two of them are ticked lower is compulsory}
 * 
 * strong = green {8-20(length)}, {all four are ticked}, {when upper,lower,number are ticked}, {when above three are ticked upper,lower,numbers}
 * 
 * 
 * when we have clicked on the generate password then only we are getting out color
 */


function showStrength()
{
    
    if(upperCaseFlag && lowerCaseFlag && (numberFlag || symbolsFlag) && passwordLength >=8)
    {
        strength_indicator.style.cssText = "background-color:#0f0; filter:blur(5px);"
    }
    else if((lowerCaseFlag || upperCaseFlag) && (numberFlag || symbolsFlag) && passwordLength >= 6)
    {
        
        strength_indicator.style.cssText = "background-color:#ff0; filter:blur(5px);"
    }
    else{
        
        strength_indicator.style.cssText = "background-color:#f00; filter:blur(5px);"
    }
    
}  


/**
 * Now here we have to make the password using the checkboxes and the password length....,when we are making our password then we have to include the ticked checkboxes compulsory in the password and after subtracting it we have to fill the remaing part......,for example :- there is uppercase and the lowercase ticked and the password length is 10 so 10-2 = 8 positions will be filled with the random numbers......,
 */



let  filledPosition = 0;

function givePassword()
{
passwordAns = "";

while(filledPosition<passwordLength)
{



if(uppercase.checked && filledPosition<passwordLength){
    
    passwordAns += insertUpperCase();
    filledPosition++;
    
}

if(lowercase.checked && filledPosition<passwordLength)
{
    passwordAns += insertLowerCase();
    filledPosition++;
    
}

if(numbers.checked && filledPosition<passwordLength)
{
    passwordAns += insertNumbers();
    filledPosition++;
    
}

if(symbols.checked && filledPosition<passwordLength)
{
    passwordAns += insertSymbols();
    filledPosition++;
    
  }

 }
 
 return passwordAns;

}

// when we click on the generate password button............

let finalString = "";
submit_password.addEventListener("click", function(){
    
    finalString  = givePassword();
    showStrength();

    // Now after getting the password the last step to put it in the output display

    psd_output.value = finalString;

    // This is written to make the filledPostion again zero because when we trying to click the generate button again then it will run successfully..............,

    filledPosition=0;
    
})


// the last step to copy the password

data_copy.addEventListener('click', async function copyData(){
    try{
        await navigator.clipboard.writeText(finalString);
        //alert("Password copied to clipboard: " + finalString);
        copied_text.classList.add('active');
        setTimeout(() => {
            copied_text.classList.remove('active');
        }, 2000);
    }
    catch(err){
        console.error('Unable to copy to clipboard ', err);
        alert("Error copying to clipboard");
    }
})



