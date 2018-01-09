(function (pPopup, $, undefined) {

    var popups = [];

    var indexOfPopup = function (popupName) {
        for (var i = 0; i < popups.length; i++) {
            if (popups[i].popupName === popupPrefix + popupName) {
                return i;
            }
        }
        return -1;
    };

    var addPopup = function (popupName, popupDiv) {

        var canAdd = indexOfPopup(popupName) == -1;

        if (!canAdd) {
            alert("Cannot add new popup as popup name is already used (" + popupName + ")");
            return;
        }

        popups.push({ popupName: popupPrefix + popupName, popupDiv: popupDiv });
    };

    var removePopup = function (popupName) {

        var idx = indexOfPopup(popupName);
        if (idx == -1) {
            alert("Cannot remove popup as popup name is already removed (" + popupName + ")");
            return;
        }

        popups.splice(idx, 1);

    };


    var isNullOrWhitespaceOrUndefined = function (obj) {
        return obj === undefined || obj === null || obj.toString().replace(/\s/g, "").length < 1;
    };

    var isFunction = function (obj) {
        return !isNullOrWhitespaceOrUndefined(obj) && typeof (obj) == "function";
    }

    var popupPrefix = "pPopupName_";

    var openPopup = function (popupName, onOpenCallback) {

        var popupId = popupPrefix + popupName;

        var popupHtml = '<div id="' + popupId + '">' +
            '<div class="pPopupWindow pPopupBackgroundFilter"></div>' +
        '<div id="" class="pPopupWindow pPopupContainer">' +
        '<div class="pPopup_close">' +
        '<input type="button" value="x" />' +
        '</div>' +
        '<div class="pPopupContent">' +
        '</div>' +
        '</div>' +
        '</div>';

        var body = $("body");
        body.append(popupHtml)

        var popupDiv = body.find("#" + popupId);

        popupDiv.find(".pPopup_close").click(function () {
            closePopup(popupName);
        });

        addPopup(popupName, popupDiv);

        var offset = (popups.length - 1) * 10;

        var popupContainer = popupDiv.find(".pPopupContainer");

        var marginLeft = parseFloat(popupContainer.css("margin-left").replace("px", "")),
            marginTop = parseFloat(popupContainer.css("margin-top").replace("px", ""));

        var newMarginLeft = (marginLeft + offset).toString() + "px",
            newMarginTop = (marginTop + offset).toString() + "px";

        popupContainer.css("margin-left", newMarginLeft);
        popupContainer.css("margin-top", newMarginTop);

        onOpenCallback(popupDiv.find(".pPopupContent"));

    };

    var closePopup = function (popupName) {
        var idx = indexOfPopup(popupName);
        if (idx === -1) {
            alert("Cannot close popup as it is already closed");
            return;
        }

        var popupInfo = popups[idx];
        popupInfo.popupDiv.remove();
        removePopup(popupName);
    };

    pPopup.close = function (popupName) {
        closePopup(popupName);
    };

    pPopup.getPopupContent = function (popupName) {
        var idx = indexOfPopup(popupName);
        if (idx === -1) {
            alert("Cannot get popup content as it does not exist");
            return;
        }

        var popupInfo = popups[idx];
        return popupInfo.popupDiv.find(".pPopupContent");
    };

    pPopup.open = function (popupName, onOpenCallback) {

        if (isNullOrWhitespaceOrUndefined(popupName)) {
            alert("Cannot add new popup as popup name is blank");
            return;
        }

        if (!isFunction(onOpenCallback)) {
            alert("Must have onOpenCallback for popup");
            return;
        }

        var canAdd = indexOfPopup(popupName) == -1;
        if (!canAdd) {
            alert("Cannot add new popup as popup name is already used (" + popupName + ")");
            return;
        }


        openPopup(popupName, onOpenCallback);

    };


}(window.pPopup = window.pPopup || {}, jQuery));
