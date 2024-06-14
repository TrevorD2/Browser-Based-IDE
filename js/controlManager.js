//-----------------------CONTROL PANEL CODE-----------------------//

//Initialize the ace editor and set default settings
let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/c_cpp");

//On language change, change the mode of the editor
function changeLanguage() {
    //Get language selected
    let language = $("#languages").val();
    //Set mode according to language
    switch (language) {
        case "c":
        case "cpp":
            editor.session.setMode("ace/mode/c_cpp");
            break;
        case "csharp":
            editor.session.setMode("ace/mode/csharp");
            break;
        case "java":
            editor.session.setMode("ace/mode/java");
            break;
        case "javascript":
            editor.session.setMode("ace/mode/javascript");
            break;
        case "python":
            editor.session.setMode("ace/mode/python");
            break;
        case "ruby":
            editor.session.setMode("ace/mode/ruby");
            break;
        case "php":
            editor.session.setMode("ace/mode/php");
            break;
        case "swift":
            editor.session.setMode("ace/mode/swift");
            break;
        case "typescript":
            editor.session.setMode("ace/mode/typescript");
            break;
        case "rust":
            editor.session.setMode("ace/mode/rust");
            break;
        default:
            editor.session.setMode("ace/mode/text");
            break;
    }
    
}

//On theme change, change the theme of the editor
function changeTheme(){
    //Get theme, then change to selected theme
    let theme = $("#themes").val();
    editor.setTheme(`ace/theme/${theme}`);

}