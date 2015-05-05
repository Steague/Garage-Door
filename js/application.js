/* 
	jQuery Mobile Boilerplate
	application.js
*/
$(document).on("pageinit", function(event){
	// custom code goes here



});

function checkStatus(to) {
	if ($('#gpio18').hasClass('LOW')) {
		$("#gpio18").html('CLOSED');
	} else {
		$("#gpio18").html('OPEN');
	}
	if (typeof to != "undefined")
	{
		setTimeout(checkStatus,1000)
	}
}

// this function gets called by the mousedown function below - it sets gpio7 back to 'IN'
function mouseup() {
	webiopi().setFunction(7,"in");
	//window.alert("RELAY OPEN");
}

// this function sets gpio7 to 'OUT' which will trip the relay.  After .5 second it calls mouseup above.
// hides the confirmation div and makes doge face change
function mousedown() {
	document.getElementById('button').style.background = "#808080 url('/doge-action.png') no-repeat center bottom";
	webiopi().setFunction(7,"out");
	//window.alert("RELAY CLOSED");
	document.getElementById('confirmBox').style.visibility = "hidden";
	document.getElementById('confirmText').style.visibility = "hidden";
	setTimeout(mouseup, 500);
	setTimeout(dogeNormal, 3000);
}

// after pressing no hide the confirmation div
function hideConfirm() {
	document.getElementById('confirmBox').style.visibility = "hidden";
	document.getElementById('confirmText').style.visibility = "hidden";
}

// show confirmation div after pressing garage door button
function showConfirm() {
	confirmDialog("Are you sure you want to leave the game? This is an irreversible change. Once you confirm you will not be able to retrieve your character in the future.", function() {
        // user has confirmed, do stuff
        //console.log("user has confirmed, do stuff",$(e.target).attr("href"));
        //console.log("wat",url);
        //$.mobile.navigate(url);
        alert("user clicked yes");
    });
	// document.getElementById('yes').onclick = mousedown;
	// document.getElementById('no').onclick = hideConfirm;
	// document.getElementById('confirmBox').style.visibility = "visible";
	// document.getElementById('confirmText').style.visibility = "visible";
}

// change doge face to normal
function dogeNormal() {
	document.getElementById('button').style.background = "#808080 url('/doge-static.png') no-repeat center bottom";
}

function confirmDialog(text, callback) {
    var popupDialogId = 'popupDialog';
    $('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="pop" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"> \
                        <div data-role="header" data-theme="a">\
                            <h1>Question</h1>\
                        </div>\
                        <div role="main" class="ui-content">\
                            <h3 class="ui-title">' + text + '</h3>\
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back">Yes</a>\
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionCancel" data-rel="back" data-transition="flow">No</a>\
                        </div>\
                    </div>')
        .appendTo($.mobile.pageContainer);
    var popupDialogObj = $('#' + popupDialogId);
    popupDialogObj.trigger('create');
    popupDialogObj.popup({
        afterclose: function (event, ui) {
            popupDialogObj.find(".optionConfirm").first().off('click');
            var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
            $(event.target).remove();
            if (isConfirmed && callback) {
                callback();
            }
        }
    });
    popupDialogObj.popup('open');
    popupDialogObj.find(".optionConfirm").first().on('click', function () {
        popupDialogObj.attr('data-confirmed', 'yes');
    });
}