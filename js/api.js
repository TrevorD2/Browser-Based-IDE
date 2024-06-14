//-----------------------API CODE-----------------------//

//Get API object to send requests to Piston API
const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});

//Executes code written in the editor
async function executeCode(){
    //Get output window
    var outputElement = document.getElementById('output');
    outputElement.textContent = "Please wait"
    try {
        //Get version
        const version = await extractLanguageVersion($("#languages").val());

        //Send API call to execute the code with appropriate data
        const response = await API.post("/execute", {
            language: $("#languages").val(),
            version: version,
            files: [
                {
                    content: editor.getValue(),
                },
            ],
        });

        return response;
    } catch (error) {
        //Handle and display any errors from the request
        if (error.response) {
            //Server responded with a status other than 2xx
            outputElement.textContent = `Error: ${error.response.data.message || error.response.statusText}`;
        } else if (error.request) {
            //Request was made but no response was received
            outputElement.textContent = 'Error: No response received from the server.';
        } else {
            //Something happened in setting up the request
            outputElement.textContent = `Error: ${error.message}`;
        }  
    }
    return null;
}

function displayResponse(response)
{
    //Get output window
    var outputElement = document.getElementById('output');
    //Extract and display only the stdout from the response
    if (response.data.run.stdout) {
        //stdout
        outputElement.textContent = response.data.run.stdout;
    } else if (response.data.run.stderr) {
        //Error occured in client code
        outputElement.textContent = `Error: ${response.data.run.stderr}`;
    } else {
        outputElement.textContent = 'No output received.';
    }
}

async function runCode()
{
    try {
        const result = await executeCode();  //Wait for executeCode() to complete and return its result
        displayResponse(result);  //Pass the actual response object to displayResponse()
    } catch (error) {
        //Handle any errors from executeCode() or displayResponse()
        console.error('Error in runCode:', error);
    }
}

//Gets Piston language version based on input language
async function extractLanguageVersion(inputLanguage){
    const { data: languages } = await API.get("/runtimes");

    for (const lang of languages) {
        if (lang.language === inputLanguage || (lang.aliases && lang.aliases.includes(inputLanguage))) {
          return lang.version;
        }
      }
    return null;
}
