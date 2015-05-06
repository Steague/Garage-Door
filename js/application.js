/* 
	jQuery Mobile Boilerplate
	application.js
*/
$(document).on("pageinit", function(event){
	// custom code goes here



});

$( "#latestPhoto" ).bind({
    popupbeforeposition: function(event, ui) {
        $( "#latestPhoto" ).html('<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img src="./webcam/latest.jpg?'+new Date().getTime()+'" alt="Latest">');
        var maxHeight = $( window ).height() - 60 + "px";
        $( ".photopopup img" ).css( "max-height", maxHeight );
    },
    popupafteropen: function(event, ui) {
        $( "#latestPhoto" ).parent().css({"top":"25%","left":"10px"});
    }
});


$( "#lastOpenClose" ).bind({
    popupbeforeposition: function(event, ui) {
        $( "#lastOpenClose" ).html('<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img src="./webcam/lastaction.jpg?'+new Date().getTime()+'" alt="Last">');
    },
    popupafteropen: function(event, ui) {
        $( "#lastOpenClose" ).parent().css({"top":"25%","left":"10px"});
    }
});

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