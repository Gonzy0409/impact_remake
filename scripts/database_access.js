/**
 * Created by demars on 5/8/14.
 */

var oyateDebugging = false;
var gamelog_DB_URL        = "http://sandbox.7generationgames.com/forgotten_trail/forgotten_trail_db/game_log_db.php";
var gamelog_DB_URL_local  = "http://localhost/7gen-sandbox/forgotten_trail/forgotten_trail_db/game_log_db.php";
var gamelog_DB_URL_local2 = "http://localhost/forgotten_trail/forgotten_trail_db/game_log_db.php";
var newuser= false ;
var forms = [];
var gamestatedata = null;

// Keys for session storage
var userNameKey = "username";
var gameStateKey = "gamestate";

$(document).ready(function() {
    SetGamelogURL();
});

function SetGamelogURL() {
    // If host is localhost, then we test whether a local PHP script exists.
    // If host is not localhost, it is either a remote server or, if host is
    // empty string, then it is a file. In either case we use a PHP script on our
    // remote server.

    if (window.location.host == "localhost") {
        PageExists(
            gamelog_DB_URL_local,
            function() {gamelog_DB_URL = gamelog_DB_URL_local;},
            function() {PageExists(
                gamelog_DB_URL_local2,
                function() {gamelog_DB_URL = gamelog_DB_URL_local2;},
                null
            )});
    }
}

function PageExists(pageUrl, existsCallback, doesntExistCallback) {
    $.ajax({
        type: 'HEAD',
        url: pageUrl,
        success: function() {
            if (existsCallback != null) {
                existsCallback();
            }
        },
        error: function () {
            if (doesntExistCallback != null) {
                doesntExistCallback();
            }
        }
    });
}

function alert7gen(arg, callback) {
    alert(arg);
    if (callback) {
        callback();
    }
}

function showForm(formID) {
    forms.forEach(function(s) {
        if (s == formID) {
            $(s).show();
        }
        else {
            $(s).hide();
        }
    });
}

function Perform_Game_Log_DB_Action(data, CompletionRoutine){
    var hasCompletionRoutine = (typeof CompletionRoutine) === "function";
    $.ajax({
        type: 'POST',
        url: gamelog_DB_URL,
        data: data,
        async: true,
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            if (oyateDebugging) {
                var alertmsg;
                if (!data) {
                    alertmsg = "data is null.";
                }
                else {
                    if (!data.status) {
                        alertmsg = "data is not null but has no status field";
                    }
                    else {
                        if (data.status == 'success') {
                            alertmsg = "status is success, message: " + data.message;
                        }
                        else {
                            alertmsg = "data.status = " + data.status + " message: " + data.message;
                        }
                    }
                }
                alert7gen(alertmsg, function() {
                    if (hasCompletionRoutine) {
                        if (data && data.status && data.status == 'success' && data.message) {
                            CompletionRoutine(data);
                        } else {
                            CompletionRoutine(null);
                        }
                    }
                })
            }
            else {
                if (hasCompletionRoutine) {
                    if (data && data.status && data.status == 'success' && data.message) {
                        CompletionRoutine(data);
                    } else {
                        CompletionRoutine(null);
                    }
                }
            }
        },
        error: function(data){

            if (data.message)
                alert7gen(data.message);
            else if (data)
                alert7gen("No message field. Data: " + JSON.stringify(data) );
            else
                alert7gen("ERROR Connecting to Server");

            // Do some action here with the data variable that contains the resulting message
        }
    });
}

// These functions look up username ;
// Create username and password if none exists ;

function user_lookup(theUser, CompletionRoutine){
    Perform_Game_Log_DB_Action(
        {
            action:'lookup-userid',
            userid: theUser
        },
        CompletionRoutine
    );
}

function user_login(theUser, password, CompletionRoutine){
    Perform_Game_Log_DB_Action(
        {
            action:'user-login',
            userid: theUser,
            password: password
        },
        CompletionRoutine
    );
}

function LookupUserName() {
    var username = $("#username").val();
    newuser = false;
    sessionStorage.setItem(userNameKey, username);
    user_lookup(username, FinishLookupUserName);
}

function LookupNewUserName() {
    var username = $("#username").val();
    newuser= true ;
    sessionStorage.setItem(userNameKey, username);
    user_lookup(username, FinishLookupUserName);
}

// Looks up username. Gives error message if doesn't exist on start page ;
// Gives error message if duplicate username on new user page ;
function FinishLookupUserName(data) {
    if (data.message == 'New password required') {
        if (newuser) {
            showForm("#new_password_form");
        }
        else {
            //$("#userform").hide();
            showForm("#NoSuchName");
        }
    }
    else if (data.message == 'Old password required' && newuser == true) {
        showForm("#dup_id");
    }
    else {
        showForm("#old_password_form");
    }

}

function SubmitNewPassword() {
    var username = sessionStorage.getItem(userNameKey);
    var password = $("#password").val();
    var verify = $("#verify_password").val();
    if (password && password == verify) {
        user_login(username, password, FinishSubmitNewPassword);
    }
    else {
        showForm("#WrongPassword")
    }
}

function SubmitExistingPassword() {
    var username = sessionStorage.getItem(userNameKey);
    var password = $("#old_password").val();
    if (password) {
        user_login(username, password, FinishSubmitExistingPassword);
    }
}

function FinishSubmitNewPassword(data) {
    gamestatedata = {};
    UpdateGameState();
    showForm("#success_form");
}

function FinishSubmitExistingPassword(data) {
    if (!data || data.message == "Password did not match") {
        showForm("#WrongPassword")
    }
    else {
        if (data.jsondata) {
            sessionStorage.setItem(gameStateKey, data.jsondata);
        }
        else {
            sessionStorage.setItem(gameStateKey, JSON.stringify({}));
        }
        showForm("#success_form");
    }
}

function GetGameState() {
    if (gamestatedata == null) {
        var jsonData = sessionStorage.getItem(gameStateKey);
        if (jsonData) {
            gamestatedata = JSON.parse(jsonData);
        }
        else {
            gamestatedata = {};
        }
    }

    return gamestatedata;
}

function UpdateGameState(completion_routine) {
    var username = sessionStorage.getItem(userNameKey);
    var jsonData = JSON.stringify(gamestatedata);
    sessionStorage.setItem(gameStateKey, jsonData);
    completion_routine = completion_routine || null; // completion_routine is optional
    Perform_Game_Log_DB_Action(
        {
            action:'save-db-state',
            userid: username,
            jsondata: jsonData
        },
        completion_routine
    );
}

function SetGameStateItem(itemName, itemValue, completion_routine) {
    // This can be used by anybody but it is mainly provided
    // for the convenience of the Unity-based mini-games
    completion_routine = completion_routine || null; // completion_routine is optional
    var g = GetGameState();
    g[itemName] = itemValue;
    UpdateGameState(completion_routine);
}

function SetGameStateItemAndGoToPage(itemName, itemValue, newURL) {
    SetGameStateItem(itemName, itemValue, function() {window.location.href = newURL;});
}

function SetGameStateFromJSON(items, callback) {
    if (items != "") {
        var gameStateValues = JSON.parse(items);
        var g = GetGameState();
        for(var key in gameStateValues) {
            if (gameStateValues.hasOwnProperty(key)) {
                g[key] = gameStateValues[key];
            }
        }
        UpdateGameState(callback);
    }
    else {
        if (callback) {
            callback();
        }
    }
}