
if (window.jQuery) {
    (function ($) {
        $.fn.wheelizateTab = function (options) {
            var tabDivId = this.selector.substring(1);
            var wTab = new wheelizateTab(tabDivId);

            var settings = $.extend({
                // Default tab settings
                tabType: wheelizateTabTypes.Corner,
                tabSubType: wheelizateTabSubTypes.TopLeft,
                tabWheelType: wheelizateTabWheelTypes.Pie,
                tabThemeType: wheelizateTabThemeTypes.Basic,
                tabTitles: null,
                tabTooltips: null,
                wheelRadius: 100,
                clockwise: false,
                titleRotateAngle: null,
                iconHeight: null,
                iconWidth: null,
                wheelAnimation: "linear",
                paneAnimation: "fade",
                marker: false,
                selectedTab: 0,
                tabRounded: false,
                tabShadowed: false,
                minHeight: null
            }, options);

            if (options !== undefined &&
                options !== null) {
                wTab.tabType = settings.tabType;
                wTab.tabSubType = settings.tabSubType;
                wTab.tabWheelType = settings.tabWheelType;
                wTab.tabThemeType = settings.tabThemeType;
                wTab.tabTitles = settings.tabTitles;
                wTab.tabTooltips = settings.tabTooltips;
                wTab.wheelRadius = settings.wheelRadius;
                wTab.clockwise = settings.clockwise;
                wTab.titleRotateAngle = settings.titleRotateAngle;
                wTab.iconHeight = settings.iconHeight;
                wTab.iconWidth = settings.iconWidth;
                wTab.wheelAnimation = settings.wheelAnimation;
                wTab.paneAnimation = settings.paneAnimation;
                wTab.marker = settings.marker;
                wTab.selectedTab = settings.selectedTab;
                wTab.tabRounded = settings.tabRounded;
                wTab.tabShadowed = settings.tabShadowed;
                wTab.minHeight = settings.minHeight;
            }

            wTab.createTab();

            return wTab;
        };

        $.fn.wheelizateTabHtml = function (tabTitles, tabTooltips) {
            var tabDivId = this.selector.substring(1);
            var wTab = new wheelizateTabHtml(tabDivId, tabTitles, tabTooltips);
        };
    })(jQuery);
}

wheelizateTabHtml = function (tabDivId, tabTitles, tabTooltips) {

    var tabDiv = document.getElementById(tabDivId);

    if (tabDiv !== undefined &&
        tabDiv !== null) {

        var wTab = new wheelizateTab(tabDivId);

        //data-wtab attribute is required
        var wTabData = tabDiv.hasAttribute("data-wtab");
        if (wTabData) {
            //data-wtab-type
            var wtabType = tabDiv.getAttribute("data-wtab-type");
            if (wtabType !== null) {
                wTab.tabType = wtabType;
            }

            //data-wtab-subtype
            var wtabSubType = tabDiv.getAttribute("data-wtab-subtype");
            if (wtabSubType !== null) {
                wTab.tabSubType = wtabSubType;
            }

            //data-wtab-wheeltype
            var wtabWheelType = tabDiv.getAttribute("data-wtab-wheeltype");
            if (wtabWheelType !== null) {
                wTab.tabWheelType = wtabWheelType;
            }

            //data-wtab-themetype
            var wtabThemeType = tabDiv.getAttribute("data-wtab-themetype");
            if (wtabThemeType !== null) {
                wTab.tabThemeType = wtabThemeType;
            }

            //data-wtab-wheelradius
            var wtabWheelradius = tabDiv.getAttribute("data-wtab-wheelradius");
            if (wtabWheelradius !== null) {
                wTab.wheelRadius = Number(wtabWheelradius);
            }

            //data-wtab-clockwise
            var wtabClockwise = tabDiv.getAttribute("data-wtab-clockwise");
            if (wtabClockwise !== null) {
                wTab.clockwise = true;
            }

            //data-wtab-titlerotateangle
            var wtabTitleRotateAngle = tabDiv.getAttribute("data-wtab-titlerotateangle");
            if (wtabTitleRotateAngle !== null) {
                wTab.titleRotateAngle = Number(wtabTitleRotateAngle);
            }

            //data-wtab-iconheight
            var wtabIconHeight = tabDiv.getAttribute("data-wtab-iconheight");
            if (wtabIconHeight !== null) {
                wTab.iconHeight = Number(wtabIconHeight);
            }

            //data-wtab-iconwidth
            var wtabIconWidth = tabDiv.getAttribute("data-wtab-iconwidth");
            if (wtabIconWidth !== null) {
                wTab.iconWidth = Number(wtabIconWidth);
            }

            //data-wtab-wheelanimation
            var wtabWheelAnimation = tabDiv.getAttribute("data-wtab-wheelanimation");
            if (wtabWheelAnimation !== null) {
                wTab.wheelAnimation = wtabWheelAnimation;
            }

            //data-wtab-paneanimation
            var wtabPaneAnimation = tabDiv.getAttribute("data-wtab-paneanimation");
            if (wtabPaneAnimation !== null) {
                wTab.paneAnimation = wtabPaneAnimation;
            }

            //data-wtab-marker
            var wtabMarker = tabDiv.getAttribute("data-wtab-marker");
            if (wtabMarker !== null) {
                wTab.marker = true;
            }

            //data-wtab-selectedtab
            var wtabSelectedTab = tabDiv.getAttribute("data-wtab-selectedtab");
            if (wtabSelectedTab !== null) {
                wTab.selectedTab = Number(wtabSelectedTab);
            }

            //data-wtab-tabrounded
            var wtabTabRounded = tabDiv.getAttribute("data-wtab-tabrounded");
            if (wtabTabRounded !== null) {
                wTab.tabRounded = true;
            }

            //data-wtab-tabshadowed
            var wtabTabShadowed = tabDiv.getAttribute("data-wtab-tabshadowed");
            if (wtabTabShadowed !== null) {
                wTab.tabShadowed = true;
            }

            //data-wtab-minheight
            var wtabMinHeight = tabDiv.getAttribute("data-wtab-minheight");
            if (wtabMinHeight !== null) {
                wTab.minHeight = Number(wtabMinHeight);
            }

            //Parse tab panes
            var parsedTabPanes = [];
            var parsedTabPanesTooltip = [];
            var tabContent = tabDiv.children[0];
            for (var i = 0; i < tabContent.children.length; i++) {
                var wtabTabtitleText = tabContent.children[i].getAttribute("data-wtab-tabtitle-text");
                var wtabTabtitleIcon = tabContent.children[i].getAttribute("data-wtab-tabtitle-icon");
                var wtabTabtitleImg = tabContent.children[i].getAttribute("data-wtab-tabtitle-img");
                if (wtabTabtitleText !== null ||
                    wtabTabtitleIcon !== null ||
                    wtabTabtitleImg !== null) {
                    //data-wtab-tabtitle-text
                    if (wtabTabtitleText !== null) {
                        parsedTabPanes.push(wtabTabtitleText);
                    }
                    //data-wtab-tabtitle-icon
                    else if (wtabTabtitleIcon !== null) {
                        try {
                            if (iconraphael[wtabTabtitleIcon] !== undefined) {
                                parsedTabPanes.push(iconraphael[wtabTabtitleIcon]);
                            }
                            else {
                                parsedTabPanes.push(wtabTabtitleIcon);
                            }
                        }
                        catch(e) {
                            parsedTabPanes.push("wrong icon");
                        }
                    }
                    //data-wtab-tabtitle-img
                    else if (wtabTabtitleImg !== null) {
                        parsedTabPanes.push("imgsrc:" + wtabTabtitleImg);
                    }
                }

                //data-wtab-tabtooltip
                var wtabTabTooltip = tabContent.children[i].getAttribute("data-wtab-tabtooltip");
                if (wtabTabTooltip !== null) {
                    parsedTabPanesTooltip.push(wtabTabTooltip);
                }
                else {
                    parsedTabPanesTooltip.push("");
                }
            }

            if (parsedTabPanes.length > 0 && (tabTitles === undefined || tabTitles === null)) {
                tabTitles = parsedTabPanes;
            }
            if (parsedTabPanesTooltip.length > 0 && (tabTooltips === undefined || tabTooltips === null)) {
                tabTooltips = parsedTabPanesTooltip;
            }

            wTab.tabTitles = tabTitles;
            wTab.tabTooltips = tabTooltips;
            wTab.createTab();
        }
    }
};

wheelizateTab = function (tabDivId) {

    this.version = "2.0.0";

    this.tabDivId = tabDivId;
    if (document.getElementById("wheel") === null) {
        this.wheelnavDivId = "wheel";
    }
    else {
        this.wheelnavDivId = tabDivId + "-wheel";
    }
    
    // Default tab settings
    this.tabType = wheelizateTabTypes.Corner;
    this.tabSubType = wheelizateTabSubTypes.TopLeft;
    this.tabWheelType = wheelizateTabWheelTypes.Pie;
    this.tabThemeType = wheelizateTabThemeTypes.Color;
    this.wheelRadius = 100;
    this.clockwise = false;
    this.titleRotateAngle = null;
    this.iconHeight = null;
    this.iconWidth = null;
    this.wheelAnimation = "linear";
    this.paneAnimation = "fade";
    this.animatetime = 1000;
    this.marker = false;
    this.selectedTab = 0;
    this.tabRounded = false;
    this.tabShadowed = false;
    this.minHeight = 300;

    this.tabTitles = null;
    this.tabTooltips = null;

    return this;
};

wheelizateTab.prototype.onLoad = function (wheelizateOnLoad) {
    var windowOnLoad = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = function () {
            wheelizateOnLoad();
        };
    } else {
        window.onload = function () {
            windowOnLoad();
            wheelizateOnLoad();
        };
    }
};

wheelizateTab.prototype.setTitles = function (titles) {
    this.tabTitles = titles;
};

wheelizateTab.prototype.setTooltips = function (tooltips) {
    this.tabTooltips = tooltips;
};

wheelizateTab.prototype.createTab = function () {

    // Div ids for JavaScript functions
    if (this.tabDivId === undefined) {
        alert("Please set the DivId of tab in wheelizateTab constructor!");
        return;
    }
    this.tabElement = document.getElementById(this.tabDivId);
    if (this.tabElement === null) {
        alert("Please set valid DivId of tab in wheelizateTab constructor!");
        return;
    }

    //Create id for tab-content
    this.tabContentDivId = this.tabDivId + "-content";
    this.tabContentElement = document.getElementById(this.tabContentDivId);
    if (this.tabContentElement === null) {
        this.tabElement.firstElementChild.setAttribute("id", this.tabContentDivId);
        this.tabContentElement = document.getElementById(this.tabContentDivId);
    }

    //Create div for wheelnav
    this.wheelnavElement = document.getElementById(this.wheelnavDivId);
    if (this.wheelnavElement === null) {
        this.wheelnavElement = document.createElement("div");
        this.wheelnavElement.setAttribute("id", this.wheelnavDivId);
        switch (this.tabSubType) {
            case wheelizateTabSubTypes.TopLeft:
            case wheelizateTabSubTypes.TopRight:
            case wheelizateTabSubTypes.Left:
            case wheelizateTabSubTypes.Right:
            case wheelizateTabSubTypes.Top:
                this.tabContentElement.parentNode.insertBefore(this.wheelnavElement, this.tabContentElement);
                break;
            case wheelizateTabSubTypes.BottomLeft:
            case wheelizateTabSubTypes.BottomRight:
            case wheelizateTabSubTypes.Bottom:
                this.tabContentElement.parentNode.insertBefore(this.wheelnavElement, this.tabContentElement.nextSibling);
                break;
        }
    }
    else {
        this.wheelnavElement.innerHTML = "";
    }

    // Initialize wheelnav
    switch (this.tabType) {
        case wheelizateTabTypes.Corner:
        case wheelizateTabTypes.Apart:
            this.wheelNav = new wheelnav(this.wheelnavDivId, null, 2.2 * this.wheelRadius, 2.2 * this.wheelRadius);
            break;
        case wheelizateTabTypes.Side:
            this.wheelNav = new wheelnav(this.wheelnavDivId, null, 1.1 * this.wheelRadius, 2.2 * this.wheelRadius);
            break;
        case wheelizateTabTypes.Classic:
            this.wheelNav = new wheelnav(this.wheelnavDivId, null, 2.2 * this.wheelRadius, 1.1 * this.wheelRadius);
            break;
    }
    
    //For backward compatibility
    if (this.wheelnavTitles !== undefined && this.wheelnavTitles !== null) {
        this.tabTitles = this.wheelnavTitles;
    }

    var defaultTitles = false;
    if (this.tabTitles === null) {
        this.tabTitles = [];
        defaultTitles = true;
    }

    var count = 0;
    
    for (var i = 0; i < this.tabContentElement.children.length; i++) {
        this.tabContentElement.children[i].setAttribute("id", this.tabDivId + "-pane-" + i.toString());
    }

    for (var i = 0; i < this.tabContentElement.children.length; i++) {
        if (defaultTitles) {
            this.tabTitles.push((i + 1).toString());
        }
    }

    this.setWheelType();

    // Set properties and events
    this.wheelNav.clockwise = this.clockwise;
    //For backward compatibility
    if (this.animateeffect !== undefined && this.animateeffect !== null) {
        this.wheelNav.animateeffect = this.animateeffect;
    }
    else {
        this.wheelNav.animateeffect = this.wheelAnimation;
    }
    this.wheelNav.animatetime = this.animatetime;
    this.wheelNav.createWheel(this.tabTitles);
    this.wheelNav.setTooltips(this.tabTooltips);
    this.setWheelEvents();

    selectedTabQuery = getQueryVariable(this.tabDivId + "Selected");

    if (selectedTabQuery !== "") {
        this.selectedTab = parseInt(selectedTabQuery);
    }

    if (this.selectedTab > this.tabTitles.length - 1) {
        this.selectedTab = this.tabTitles.length - 1;
    }

    this.wheelNav.navigateWheel(parseInt(this.selectedTab));

    this.setTabClass();
    this.setTab(this.selectedTab);
};

wheelizateTab.prototype.refreshTab = function () {
    this.setWheelType();
    this.wheelNav.refreshWheel(true);
};

wheelizateTab.prototype.setWheelType = function () {

    this.wheelNav.slicePathCustom = null;
    this.wheelNav.sliceSelectedPathCustom = null;
    this.wheelNav.cssMode = true;
    this.wheelNav.markerEnable = this.marker;

    if (this.marker) {
        this.wheelNav.markerPathCustom = new markerPath().PieLineMarkerCustomization();
        this.wheelNav.markerPathCustom.markerPercent = 1.15;
        this.wheelNav.markerPathFunction = markerPath().PieLineMarker;
    }

    this.wheelNav.wheelRadius = this.wheelRadius;
    this.wheelNav.titleRotateAngle = this.titleRotateAngle;
    this.wheelNav.titleHeight = this.iconHeight;
    this.wheelNav.titleWidth = this.iconWidth;
    this.wheelNav.initTitleRotate = true;

    var wheelStyle = "";
    var tabStyle = "";

    switch (this.tabType) {
        case wheelizateTabTypes.Corner:
            switch (this.tabSubType) {
                case wheelizateTabSubTypes.TopLeft:
                    this.wheelNav.navAngle = 45;
                    wheelStyle = "float: left;";
                    tabStyle = "margin-top: " + (1.1 * this.wheelRadius) + "px; margin-left: " + (1.1 * this.wheelRadius) + "px;";
                    break;
                case wheelizateTabSubTypes.TopRight:
                    this.wheelNav.navAngle = 135;
                    wheelStyle = "float: right;";
                    tabStyle = "margin-top: " + (1.1 * this.wheelRadius) + "px; margin-right: " + (1.1 * this.wheelRadius) + "px;";
                    break;
                case wheelizateTabSubTypes.BottomRight:
                    this.wheelNav.navAngle = 225;
                    wheelStyle = "float: right;";
                    tabStyle = "margin-bottom: -" + (1.1 * this.wheelRadius) + "px; margin-right: " + (1.1 * this.wheelRadius) + "px; padding-right: " + (0.6 * this.wheelRadius) + "px; padding-bottom: " + (0.6 * this.wheelRadius) + "px;";
                    break;
                case wheelizateTabSubTypes.BottomLeft:
                    wheelStyle = "float: left;";
                    tabStyle = "margin-bottom: -" + (1.1 * this.wheelRadius) + "px; margin-left: " + (1.1 * this.wheelRadius) + "px; padding-left: " + (0.7 * this.wheelRadius) + "px; padding-bottom: " + (0.7 * this.wheelRadius) + "px;";
                    this.wheelNav.navAngle = -45;
                    break;
            }
            this.wheelNav.centerX = 1.1 * this.wheelRadius;
            this.wheelNav.centerY = 1.1 * this.wheelRadius;
            this.wheelNav.rotateRound = true;
            break;
        case wheelizateTabTypes.Side:
            this.wheelNav.sliceAngle = 180 / this.tabTitles.length;
            switch (this.tabSubType) {
                case wheelizateTabSubTypes.TopLeft:
                    this.wheelNav.centerX = 1.1 * this.wheelRadius;
                    wheelStyle = "float: left;";
                    tabStyle = "margin-left: " + (1.1 * this.wheelRadius) + "px;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = 270 - this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = 90 + this.wheelNav.sliceAngle / 2;
                    }
                    break;
                case wheelizateTabSubTypes.TopRight:
                    this.wheelNav.centerX = 0;
                    wheelStyle = "float: right;";
                    tabStyle = "margin-right: " + (1.1 * this.wheelRadius) + "px;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = 90 - this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = -90 + this.wheelNav.sliceAngle / 2;
                    }
                    break;
                case wheelizateTabSubTypes.BottomRight:
                    this.wheelNav.centerX = 0;
                    wheelStyle = "float: right;";
                    tabStyle = "margin-bottom: -" + (2.2 * this.wheelRadius) + "px; margin-right: " + (1.1 * this.wheelRadius) + "px;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = 90 - this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = -90 + this.wheelNav.sliceAngle / 2;
                    }
                    break;
                case wheelizateTabSubTypes.BottomLeft:
                    this.wheelNav.centerX = 1.1 * this.wheelRadius;
                    wheelStyle = "float: left;";
                    tabStyle = "margin-bottom: -" + (2.2 * this.wheelRadius) + "px; margin-left: " + (1.1 * this.wheelRadius) + "px;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = 270 - this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = 90 + this.wheelNav.sliceAngle / 2;
                    }
                    break;
            }
            wheelStyle += "width: " + (1.1 * this.wheelRadius) + "px;";
            this.wheelNav.centerY = 1.1 * this.wheelRadius;
            this.wheelNav.clickModeRotate = false;
            this.animatetime = 500;
            this.wheelNav.navItemsContinuous = true;
            break;
        case wheelizateTabTypes.Classic:
            this.wheelNav.sliceAngle = 180 / this.tabTitles.length;
            switch (this.tabSubType) {
                case wheelizateTabSubTypes.TopLeft:
                    this.wheelNav.centerY = 1.1 * this.wheelRadius;
                    wheelStyle = "float: left;";
                    tabStyle = "margin-top: " + (1.1 * this.wheelRadius) + "px;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = -this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = -180 + this.wheelNav.sliceAngle / 2;
                    }
                    break;
                case wheelizateTabSubTypes.TopRight:
                    this.wheelNav.centerY = 1.1 * this.wheelRadius;
                    wheelStyle = "float: right;";
                    tabStyle = "margin-top: " + (1.1 * this.wheelRadius) + "px;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = -this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = -180 + this.wheelNav.sliceAngle / 2;
                    }
                    break;
                case wheelizateTabSubTypes.BottomRight:
                    this.wheelNav.centerY = 0;
                    wheelStyle = "float: right;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = 180 - this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = this.wheelNav.sliceAngle / 2;
                    }
                    break;
                case wheelizateTabSubTypes.BottomLeft:
                    this.wheelNav.centerY = 0;
                    wheelStyle = "float: left;";
                    if (this.clockwise === false) {
                        this.wheelNav.navAngle = 180 - this.wheelNav.sliceAngle / 2;
                    }
                    else {
                        this.wheelNav.navAngle = this.wheelNav.sliceAngle / 2;
                    }
                    break;
            }
            wheelStyle += "height: " + (1.1 * this.wheelRadius) + "px;";
            this.wheelNav.centerX = 1.1 * this.wheelRadius;
            this.wheelNav.clickModeRotate = false;
            this.animatetime = 500;
            this.wheelNav.navItemsContinuous = true;
            break;
        case wheelizateTabTypes.Apart:
            switch (this.tabSubType) {
                case wheelizateTabSubTypes.Left:
                    wheelStyle = "float: left; text-align: center;";
                    tabStyle = "margin-left: " + (2.2 * this.wheelRadius) + "px;";
                    if (document.getElementById('tabapartleft') === null) {
                        var styleElement = document.createElement("style");
                        styleElement.setAttribute("id", "tabapartleft");
                        styleElement.innerHTML = "@media (max-width:" + (6.6 * this.wheelRadius) + "px) { #" + this.wheelnavDivId + " { float: none !important; } #" + this.tabDivId + "content { margin-left: 0 !important; } }";
                        var headElement = document.getElementsByTagName("head")[0];
                        headElement.appendChild(styleElement);
                    }
                    this.wheelNav.navAngle = 0;
                    break;
                case wheelizateTabSubTypes.Top:
                    wheelStyle = "text-align: center;";
                    this.wheelNav.navAngle = 90;
                    break;
                case wheelizateTabSubTypes.Right:
                    wheelStyle = "float: right; text-align: center;";
                    tabStyle = "margin-right: " + (2.2 * this.wheelRadius) + "px;";
                    if (document.getElementById('tabapartright') === null) {
                        var styleElement = document.createElement("style");
                        styleElement.setAttribute("id", "tabapartright");
                        styleElement.innerHTML = "@media (max-width:" + (6.6 * this.wheelRadius) + "px) { #" + this.wheelnavDivId + " { float: none !important; } #" + this.tabDivId + "content { margin-right: 0 !important; } }";
                        var headElement = document.getElementsByTagName("head")[0];
                        headElement.appendChild(styleElement);
                    }
                    this.wheelNav.navAngle = -180;
                    break;
                case wheelizateTabSubTypes.Bottom:
                    wheelStyle = "text-align: center;";
                    this.wheelNav.navAngle = -90;
                    break;
            }
            this.wheelNav.centerX = 1.1 * this.wheelRadius;
            this.wheelNav.centerY = 1.1 * this.wheelRadius;
            this.wheelNav.rotateRound = true;
            break;
    }

    if (this.minHeight !== null) {
        tabStyle += "min-height: " + this.minHeight.toString() + "px;";
    }

    this.wheelnavElement.setAttribute("style", wheelStyle);
    this.tabContentElement.setAttribute("style", tabStyle);

    this.isCornerBorder = (this.tabType === wheelizateTabTypes.Corner) && (this.tabThemeType === wheelizateTabThemeTypes.Border);

    switch (this.tabWheelType) {
        case wheelizateTabWheelTypes.Pie:
            this.wheelNav.slicePathFunction = tabSlicePath().PieSlice;
            this.wheelNav.sliceSelectedPathCustom = new tabSlicePath().PieSliceCustomization(this.isCornerBorder);
            this.wheelNav.sliceSelectedPathCustom.isSelected = true;
            break;
        case wheelizateTabWheelTypes.Donut:
            this.wheelNav.slicePathFunction = tabSlicePath().DonutSlice;
            this.wheelNav.sliceSelectedPathCustom = new tabSlicePath().DonutSliceCustomization(this.isCornerBorder);
            this.wheelNav.sliceSelectedPathCustom.isSelected = true;
            break;
        case wheelizateTabWheelTypes.Flower:
            this.wheelNav.slicePathFunction = tabSlicePath().FlowerSlice;
            this.wheelNav.sliceSelectedPathCustom = new tabSlicePath().FlowerSliceCustomization(this.isCornerBorder);
            this.wheelNav.sliceSelectedPathCustom.isSelected = true;
            break;
        case wheelizateTabWheelTypes.Icon:
            this.wheelNav.slicePathFunction = tabSlicePath().IconSlice;
            break;
        case wheelizateTabWheelTypes.Cog:
            this.wheelNav.slicePathFunction = tabSlicePath().CogSlice;
            this.wheelNav.sliceSelectedPathCustom = new tabSlicePath().CogSliceCustomization(this.isCornerBorder);
            this.wheelNav.sliceSelectedPathCustom.isSelected = true;
            break;
        case wheelizateTabWheelTypes.Wheel:
            this.wheelNav.slicePathFunction = tabSlicePath().WheelSlice;
            break;
        default:
            this.wheelNav.slicePathFunction = slicePath().PieSlice;
            break;
    }

    if (this.paneAnimation === "bounce") {
        this.animatetime = 1500;
    }
    else {
        if (this.wheelAnimation === "linear") {
            this.animatetime = 700;
        }
        else {
            this.animatetime = 1000;
        }
    }
};

wheelizateTab.prototype.setWheelEvents = function () {
    
    var thisTab = this;

    this.wheelNav.navItems[0].navItem.mouseup(function () {
        thisTab.setTab("0");
    });

    if (this.wheelNav.navItems.length > 1) {
        this.wheelNav.navItems[1].navItem.mouseup(function () {
            thisTab.setTab("1");
        });
    }

    if (this.wheelNav.navItems.length > 2) {
        this.wheelNav.navItems[2].navItem.mouseup(function () {
            thisTab.setTab("2");
        });
    }

    if (this.wheelNav.navItems.length > 3) {
        this.wheelNav.navItems[3].navItem.mouseup(function () {
            thisTab.setTab("3");
        });
    }

    if (this.wheelNav.navItems.length > 4) {
        this.wheelNav.navItems[4].navItem.mouseup(function () {
            thisTab.setTab("4");
        });
    }
    if (this.wheelNav.navItems.length > 5) {
        this.wheelNav.navItems[5].navItem.mouseup(function () {
            thisTab.setTab("5");
        });
    }
    if (this.wheelNav.navItems.length > 6) {
        this.wheelNav.navItems[6].navItem.mouseup(function () {
            thisTab.setTab("6");
        });
    }
    if (this.wheelNav.navItems.length > 7) {
        this.wheelNav.navItems[7].navItem.mouseup(function () {
            thisTab.setTab("7");
        });
    }
};

wheelizateTab.prototype.setTab = function (tabId) {
    var prevTab = this.selectedTab;
    this.selectedTab = tabId;
    
    this.tabContentElement.classList.remove("wtab-selected-0");
    this.tabContentElement.classList.remove("wtab-selected-1");
    this.tabContentElement.classList.remove("wtab-selected-2");
    this.tabContentElement.classList.remove("wtab-selected-3");
    this.tabContentElement.classList.remove("wtab-selected-4");
    this.tabContentElement.classList.remove("wtab-selected-5");
    this.tabContentElement.classList.remove("wtab-selected-6");
    this.tabContentElement.classList.remove("wtab-selected-7");
    this.tabContentElement.classList.add("wtab-selected-" + tabId);

    for (var i = 0; i < this.tabContentElement.children.length; i++) {
        var tabPaneElement = document.getElementById((this.tabDivId + "-pane-" + i).toString());

        if (tabPaneElement.classList.length > 0) {
            var classes = tabPaneElement.classList.toString().split(' ');
            for (var j = 0; j < classes.length; j++) {
                tabPaneElement.classList.remove(classes[j]);
            }
        }

        tabPaneElement.classList.add("wtab-pane");
        if (i.toString() === this.selectedTab.toString()) {
            var anim = "";
            if (this.paneAnimation !== null) {
                anim = "wtab-anim-";

                switch (this.paneAnimation) {
                    case "bounce":
                    case "slide":
                        anim +=  this.paneAnimation + "-";
                        switch (this.tabType) {
                            case wheelizateTabTypes.Corner:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.TopLeft:
                                        if (this.clockwise) { anim += "right"; }
                                        else { anim += "down"; }
                                        break;
                                    case wheelizateTabSubTypes.TopRight:
                                        if (!this.clockwise) { anim += "left"; }
                                        else { anim += "down"; }
                                        break;
                                    case wheelizateTabSubTypes.BottomRight:
                                        if (this.clockwise) { anim += "left"; }
                                        else { anim += "up"; }
                                        break;
                                    case wheelizateTabSubTypes.BottomLeft:
                                        if (!this.clockwise) { anim += "right"; }
                                        else { anim += "up"; }
                                        break;
                                }
                                break;
                            case wheelizateTabTypes.Apart:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.Left:
                                        if (this.clockwise) { anim += "up"; }
                                        else { anim += "down"; }
                                        break;
                                    case wheelizateTabSubTypes.Top:
                                        if (this.clockwise) { anim += "right"; }
                                        else { anim += "left"; }
                                        break;
                                    case wheelizateTabSubTypes.Right:
                                        if (this.clockwise) { anim += "down"; }
                                        else { anim += "up"; }
                                        break;
                                    case wheelizateTabSubTypes.Bottom:
                                        if (this.clockwise) { anim += "left"; }
                                        else { anim += "right"; }
                                        break;
                                }
                                break;
                            case wheelizateTabTypes.Side:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.TopLeft:
                                    case wheelizateTabSubTypes.TopRight:
                                        anim += "down";
                                        break;
                                    case wheelizateTabSubTypes.BottomRight:
                                    case wheelizateTabSubTypes.BottomLeft:
                                        anim += "up";
                                        break;
                                }
                                break;
                            case wheelizateTabTypes.Classic:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.TopLeft:
                                    case wheelizateTabSubTypes.BottomLeft:
                                        anim += "right";
                                        break;
                                    case wheelizateTabSubTypes.BottomRight:
                                    case wheelizateTabSubTypes.TopRight:
                                        anim += "left";
                                        break;
                                }
                                break;
                        }
                        break;
                    case "rotate":
                        switch (this.tabType) {
                            case wheelizateTabTypes.Corner:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.TopLeft:
                                        if (this.clockwise) { anim += "top-left-rotate-right"; }
                                        else { anim += "top-left-rotate-down"; }
                                        break;
                                    case wheelizateTabSubTypes.TopRight:
                                        if (this.clockwise) { anim += "top-right-rotate-down"; }
                                        else { anim += "top-right-rotate-left"; }
                                        break;
                                    case wheelizateTabSubTypes.BottomRight:
                                        if (this.clockwise) { anim += "bottom-right-rotate-left"; }
                                        else { anim += "bottom-right-rotate-up"; }
                                        break;
                                    case wheelizateTabSubTypes.BottomLeft:
                                        if (this.clockwise) { anim += "bottom-left-rotate-up"; }
                                        else { anim += "bottom-left-rotate-right"; }
                                        break;
                                }
                                break;
                            case wheelizateTabTypes.Apart:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.Left:
                                        if (this.clockwise) { anim += "bottom-left-rotate-up"; }
                                        else { anim += "top-left-rotate-down"; }
                                        break;
                                    case wheelizateTabSubTypes.Top:
                                        if (this.clockwise) { anim += "top-left-rotate-right"; }
                                        else { anim += "top-right-rotate-left"; }
                                        break;
                                    case wheelizateTabSubTypes.Right:
                                        if (this.clockwise) { anim += "top-right-rotate-down"; }
                                        else { anim += "bottom-right-rotate-up"; }
                                        break;
                                    case wheelizateTabSubTypes.Bottom:
                                        if (this.clockwise) { anim += "bottom-right-rotate-left"; }
                                        else { anim += "bottom-left-rotate-right"; }
                                        break;
                                }
                                break;
                            case wheelizateTabTypes.Side:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.TopLeft:
                                        anim += "top-left-rotate-down";
                                        break;
                                    case wheelizateTabSubTypes.TopRight:
                                        anim += "top-right-rotate-down";
                                        break;
                                    case wheelizateTabSubTypes.BottomRight:
                                        anim += "bottom-right-rotate-up";
                                        break;
                                    case wheelizateTabSubTypes.BottomLeft:
                                        anim += "bottom-left-rotate-up";
                                        break;
                                }
                                break;
                            case wheelizateTabTypes.Classic:
                                switch (this.tabSubType) {
                                    case wheelizateTabSubTypes.TopLeft:
                                        anim += "top-left-rotate-right";
                                        break;
                                    case wheelizateTabSubTypes.TopRight:
                                        anim += "top-right-rotate-left";
                                        break;
                                    case wheelizateTabSubTypes.BottomRight:
                                        anim += "bottom-right-rotate-left";
                                        break;
                                    case wheelizateTabSubTypes.BottomLeft:
                                        anim += "bottom-left-rotate-right";
                                        break;
                                }
                                break;
                        }
                        break;
                    default:
                        anim = "wtab-anim-" + this.paneAnimation;
                }

                tabPaneElement.classList.add("wtab-anim");
                tabPaneElement.classList.add(anim);
            } 

            tabPaneElement.classList.add("wtab-current");
        }
    }
};

wheelizateTab.prototype.setTabClass = function () {

    this.tabElement.classList.remove("wtab");
    this.tabElement.classList.add("wtab");

    this.tabContentElement.classList.remove("wtab-content");
    this.tabContentElement.classList.add("wtab-content");

    var subTypeStyle = "";
    switch (this.tabSubType) {
        case wheelizateTabSubTypes.TopLeft:
            subTypeStyle = "wtab-top-left-";
            break;
        case wheelizateTabSubTypes.TopRight:
            subTypeStyle = "wtab-top-right-";
            break;
        case wheelizateTabSubTypes.BottomRight:
            subTypeStyle = "wtab-bottom-right-";
            break;
        case wheelizateTabSubTypes.BottomLeft:
            subTypeStyle = "wtab-bottom-left-";
            break;
        case wheelizateTabSubTypes.Bottom:
        case wheelizateTabSubTypes.Left:
        case wheelizateTabSubTypes.Right:
        case wheelizateTabSubTypes.Top:
            subTypeStyle = "wtab-";
            break;
    }

    if (this.tabRounded) {
        this.tabContentElement.classList.add(subTypeStyle + "round");
    }
    else {
        this.tabContentElement.classList.remove(subTypeStyle + "round");
    }
    if (this.tabShadowed) {
        this.tabContentElement.classList.add(subTypeStyle + "shadow");
    }
    else {
        this.tabContentElement.classList.remove(subTypeStyle + "shadow");
    }
};

var wheelizateTabTypes = {
    Corner: "Corner",
    Side: "Side",
    Classic: "Classic",
    Apart: "Apart"
};

var wheelizateTabSubTypes = {
    Left: "Left",
    Top: "Top",
    Right: "Right",
    Bottom: "Bottom",
    TopLeft: "TopLeft",
    TopRight: "TopRight",
    BottomRight: "BottomRight",
    BottomLeft: "BottomLeft"
};

var wheelizateTabWheelTypes = {
    Pie: "Pie",
    Flower: "Flower",
    Icon: "Icon",
    Cog: "Cog",
    Donut: "Donut",
    Wheel: "Wheel"
};

var wheelizateTabThemeTypes = {
    Basic: "Basic",
    Select: "Select",
    Solid: "Solid",
    Color: "Color",
    Inverse: "Inverse",
    Border: "Border"
};

var tabSlicePath = function () {

    this.NullSlice = function (helper, percent, custom) {

        helper.setBaseValue(percent, custom);

        return {
            slicePathString: "",
            linePathString: "",
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };

    this.PieSliceCustomization = function (isCornerBorder) {

        var custom = new slicePathCustomization();
        custom.titleRadiusPercent = 0.63;
        custom.arcRadiusPercent = 1;
        custom.minRadiusPercent = 0;
        custom.maxRadiusPercent = 1;
        custom.minRadiusSelectedPercent = 0;
        custom.maxRadiusSelectedPercent = 1;
        custom.isCornerBorder = isCornerBorder;
        if (isCornerBorder) {
            custom.maxRadiusSelectedPercent = 0.98;
        }
        custom.isSelected = false;
        return custom;
    };

    this.PieSlice = function (helper, percent, custom) {

        if (custom === null) {
            custom = PieSliceCustomization();
        }

        helper.setBaseValue(percent, custom);
        x = helper.centerX;
        y = helper.centerY;

        r = helper.wheelRadius * percent;
        helper.titleRadius = r * custom.titleRadiusPercent;

        helper.setTitlePos();

        startTheta = helper.startTheta;
        middleTheta = helper.middleTheta;
        endTheta = helper.endTheta;

        var minRadius = r * custom.minRadiusPercent;
        var maxRadius = r * custom.maxRadiusPercent;
        var arcRadius = r * custom.arcRadiusPercent;

        if (custom.isSelected) {
            minRadius = r * custom.minRadiusSelectedPercent;
            maxRadius = r * custom.maxRadiusSelectedPercent;
        }
        
        if (custom.minRadiusPercent === 0) {

            if (custom.isCornerBorder && custom.isSelected) {
                linePathString = [["M", maxRadius * Math.cos(middleTheta) + x, maxRadius * Math.sin(middleTheta) + y]];
            }
            else {
                linePathString = [["M", maxRadius * Math.cos(startTheta) + x, maxRadius * Math.sin(startTheta) + y],
                            ["A", arcRadius, arcRadius, 0, 0, 1, maxRadius * Math.cos(endTheta) + x, maxRadius * Math.sin(endTheta) + y],
                            ["A", arcRadius, arcRadius, 0, 0, 0, maxRadius * Math.cos(startTheta) + x, maxRadius * Math.sin(startTheta) + y],
                            ["A", arcRadius, arcRadius, 0, 0, 1, maxRadius * Math.cos(endTheta) + x, maxRadius * Math.sin(endTheta) + y]];
            }

            slicePathString = [["M", minRadius * Math.cos(startTheta) + x, minRadius * Math.sin(startTheta) + y],
                         ["L", maxRadius * Math.cos(startTheta) + x, maxRadius * Math.sin(startTheta) + y],
                         ["A", arcRadius, arcRadius, 0, 0, 1, maxRadius * Math.cos(endTheta) + x, maxRadius * Math.sin(endTheta) + y],
                         ["A", arcRadius, arcRadius, 0, 0, 0, maxRadius * Math.cos(startTheta) + x, maxRadius * Math.sin(startTheta) + y],
                         ["A", arcRadius, arcRadius, 0, 0, 1, maxRadius * Math.cos(endTheta) + x, maxRadius * Math.sin(endTheta) + y],
                         ["z"]];
        }
        else {
            if (custom.isCornerBorder && custom.isSelected) {
                linePathString = [["M", maxRadius * Math.cos(middleTheta) + x, maxRadius * Math.sin(middleTheta) + y]];
            }
            else {
                linePathString = [["M", maxRadius * Math.cos(startTheta) + x, maxRadius * Math.sin(startTheta) + y],
                ["A", arcRadius, arcRadius, 0, 0, 1, maxRadius * Math.cos(endTheta) + x, maxRadius * Math.sin(endTheta) + y],
                ["M", minRadius * Math.cos(endTheta) + x, minRadius * Math.sin(endTheta) + y],
                ["A", minRadius, minRadius, 0, 0, 0, minRadius * Math.cos(startTheta) + x, minRadius * Math.sin(startTheta) + y]];
            }
            slicePathString = [["M", minRadius * Math.cos(startTheta) + x, minRadius * Math.sin(startTheta) + y],
                            ["L", maxRadius * Math.cos(startTheta) + x, maxRadius * Math.sin(startTheta) + y],
                            ["A", arcRadius, arcRadius, 0, 0, 1, maxRadius * Math.cos(endTheta) + x, maxRadius * Math.sin(endTheta) + y],
                            ["L", minRadius * Math.cos(endTheta) + x, minRadius * Math.sin(endTheta) + y],
                            ["A", minRadius, minRadius, 0, 0, 0, minRadius * Math.cos(startTheta) + x, minRadius * Math.sin(startTheta) + y],
                            ["z"]];
        }

        return {
            slicePathString: slicePathString,
            linePathString: linePathString,
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };

    this.DonutSliceCustomization = function (isCornerBorder) {

        var custom = new slicePathCustomization();
        custom.titleRadiusPercent = 0.69;
        custom.arcRadiusPercent = 1;
        custom.minRadiusPercent = 0.37;
        custom.maxRadiusPercent = 1;
        custom.minRadiusSelectedPercent = 0.37;
        custom.maxRadiusSelectedPercent = 1;
        custom.isCornerBorder = isCornerBorder;
        if (isCornerBorder) {
            custom.minRadiusSelectedPercent = 0.391;
            custom.maxRadiusSelectedPercent = 0.98;
        }
        custom.isSelected = false;
        return custom;
    };

    this.DonutSlice = function (helper, percent, custom) {

        if (custom === null) {
            custom = DonutSliceCustomization();
        }
        
        var slicePath = PieSlice(helper, percent, custom);

        return {
            slicePathString: slicePath.slicePathString,
            linePathString: slicePath.linePathString,
            titlePosX: slicePath.titlePosX,
            titlePosY: slicePath.titlePosY
        };
    };

    this.FlowerSliceCustomization = function (isCornerBorder) {

        var custom = new slicePathCustomization();
        custom.titleRadiusPercent = 0.63;
        custom.arcRadiusPercent = 0.2;
        custom.minRadiusPercent = 0.1;
        custom.maxRadiusPercent = 0.7;
        custom.minRadiusSelectedPercent = 0.1;
        custom.maxRadiusSelectedPercent = 0.7;
        custom.isCornerBorder = isCornerBorder;
        if (isCornerBorder) {
            custom.minRadiusSelectedPercent = 0.121;
            custom.maxRadiusSelectedPercent = 0.675;
        }
        custom.isSelected = false;
        return custom;
    };

    this.FlowerSlice = function (helper, percent, custom) {

        if (custom === null) {
            custom = FlowerSliceCustomization();
        }

        var slicePath = PieSlice(helper, percent, custom);

        return {
            slicePathString: slicePath.slicePathString,
            linePathString: slicePath.linePathString,
            titlePosX: slicePath.titlePosX,
            titlePosY: slicePath.titlePosY
        };
    };

    this.IconSliceCustomization = function () {

        var custom = new slicePathCustomization();
        custom.titleRadiusPercent = 0.61;
        custom.isSelectedLine = false;

        return custom;
    };

    this.IconSlice = function (helper, percent, custom) {

        if (custom === null) {
            custom = IconSliceCustomization();
        }

        helper.setBaseValue(percent, custom);
        x = helper.centerX;
        y = helper.centerY;

        var r = helper.wheelRadius * percent;
        helper.titleRadius = r * custom.titleRadiusPercent;
        helper.setTitlePos();

        var menuRadius = percent * helper.wheelRadius * 0.3;

        if (percent <= 0.05) { menuRadius = 10; }

        middleTheta = helper.middleTheta;

        slicePathString = [["M", helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                    ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX + (menuRadius * Math.cos(middleTheta)), helper.titlePosY + (menuRadius * Math.sin(middleTheta))],
                    ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                    ["z"]];

        if (percent <= 0.05) {
            linePathString = [["M", x, y],
                    ["A", 1, 1, 0, 0, 1, x + 1, y + 1]];
        }
        else {
            lineEndX = (helper.titleRadius - menuRadius) * Math.cos(middleTheta) + x;
            lineEndY = (helper.titleRadius - menuRadius) * Math.sin(middleTheta) + y;

            linePathString = [["M", x, y],
                        ["A", r / 3, r / 3, 0, 0, 1, lineEndX, lineEndY],
                        ["M", helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                        ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX + (menuRadius * Math.cos(middleTheta)), helper.titlePosY + (menuRadius * Math.sin(middleTheta))],
                        ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))]];
        }

        return {
            slicePathString: slicePathString,
            linePathString: linePathString,
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };

    this.CogSliceCustomization = function (isCornerBorder) {

        var custom = new slicePathCustomization();
        custom.titleRadiusPercent = 0.61;
        custom.minRadiusPercent = 0.95;
        custom.maxRadiusPercent = 1;
        custom.minRadiusSelectedPercent = 0.95;
        custom.maxRadiusSelectedPercent = 1;
        custom.isCornerBorder = isCornerBorder;
        if (isCornerBorder) {
            custom.minRadiusSelectedPercent = 0.935;
            custom.maxRadiusSelectedPercent = 0.985;
        }
        custom.isSelected = false;

        return custom;
    };

    this.CogSlice = function (helper, percent, custom) {

        if (custom === null) {
            custom = CogSliceCustomization();
        }

        helper.setBaseValue(percent, custom);
        x = helper.centerX;
        y = helper.centerY;

        r = helper.wheelRadius * custom.maxRadiusPercent * percent;
        rbase = helper.wheelRadius * custom.minRadiusPercent * percent;
        if (custom.isSelected === true) {
            r = helper.wheelRadius * custom.maxRadiusSelectedPercent * percent;
            rbase = helper.wheelRadius * custom.minRadiusSelectedPercent * percent;
        }
        
        startTheta = helper.startTheta;
        endTheta = helper.endTheta;

        theta1 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.0625);
        theta2 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.1875);
        theta3 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.3125);
        theta4 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.4375);
        theta5 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.5625);
        theta6 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.6875);
        theta7 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.8125);
        theta8 = helper.getTheta(helper.startAngle + helper.sliceAngle * 0.9375);

        slicePathString = [["M", x, y],
            ["L", r * Math.cos(startTheta) + x, r * Math.sin(startTheta) + y],
            ["A", r, r, 0, 0, 1, r * Math.cos(theta1) + x, r * Math.sin(theta1) + y],
            ["L", rbase * Math.cos(theta1) + x, rbase * Math.sin(theta1) + y],
            ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta2) + x, rbase * Math.sin(theta2) + y],
            ["L", r * Math.cos(theta2) + x, r * Math.sin(theta2) + y],
            ["A", r, r, 0, 0, 1, r * Math.cos(theta3) + x, r * Math.sin(theta3) + y],
            ["L", rbase * Math.cos(theta3) + x, rbase * Math.sin(theta3) + y],
            ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta4) + x, rbase * Math.sin(theta4) + y],
            ["L", r * Math.cos(theta4) + x, r * Math.sin(theta4) + y],
            ["A", r, r, 0, 0, 1, r * Math.cos(theta5) + x, r * Math.sin(theta5) + y],
            ["L", rbase * Math.cos(theta5) + x, rbase * Math.sin(theta5) + y],
            ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta6) + x, rbase * Math.sin(theta6) + y],
            ["L", r * Math.cos(theta6) + x, r * Math.sin(theta6) + y],
            ["A", r, r, 0, 0, 1, r * Math.cos(theta7) + x, r * Math.sin(theta7) + y],
            ["L", rbase * Math.cos(theta7) + x, rbase * Math.sin(theta7) + y],
            ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta8) + x, rbase * Math.sin(theta8) + y],
            ["L", r * Math.cos(theta8) + x, r * Math.sin(theta8) + y],
            ["A", r, r, 0, 0, 1, r * Math.cos(endTheta) + x, r * Math.sin(endTheta) + y],
            ["z"]];

        if (custom.isCornerBorder && custom.isSelected) {
            linePathString = [["M", r * Math.cos(middleTheta) + x, r * Math.sin(middleTheta) + y]];
        }
        else {
            linePathString = [["M", r * Math.cos(startTheta) + x, r * Math.sin(startTheta) + y],
                ["A", r, r, 0, 0, 1, r * Math.cos(theta1) + x, r * Math.sin(theta1) + y],
                ["L", rbase * Math.cos(theta1) + x, rbase * Math.sin(theta1) + y],
                ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta2) + x, rbase * Math.sin(theta2) + y],
                ["L", r * Math.cos(theta2) + x, r * Math.sin(theta2) + y],
                ["A", r, r, 0, 0, 1, r * Math.cos(theta3) + x, r * Math.sin(theta3) + y],
                ["L", rbase * Math.cos(theta3) + x, rbase * Math.sin(theta3) + y],
                ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta4) + x, rbase * Math.sin(theta4) + y],
                ["L", r * Math.cos(theta4) + x, r * Math.sin(theta4) + y],
                ["A", r, r, 0, 0, 1, r * Math.cos(theta5) + x, r * Math.sin(theta5) + y],
                ["L", rbase * Math.cos(theta5) + x, rbase * Math.sin(theta5) + y],
                ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta6) + x, rbase * Math.sin(theta6) + y],
                ["L", r * Math.cos(theta6) + x, r * Math.sin(theta6) + y],
                ["A", r, r, 0, 0, 1, r * Math.cos(theta7) + x, r * Math.sin(theta7) + y],
                ["L", rbase * Math.cos(theta7) + x, rbase * Math.sin(theta7) + y],
                ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta8) + x, rbase * Math.sin(theta8) + y],
                ["L", r * Math.cos(theta8) + x, r * Math.sin(theta8) + y],
                ["A", r, r, 0, 0, 1, r * Math.cos(endTheta) + x, r * Math.sin(endTheta) + y]];
        }

        helper.titleRadius = r * custom.titleRadiusPercent;
        helper.setTitlePos();

        return {
            slicePathString: slicePathString,
            linePathString: linePathString,
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };

    this.WheelSlice = function (helper, percent, custom) {

        helper.setBaseValue(percent, custom);
        x = helper.centerX;
        y = helper.centerY;

        r = helper.wheelRadius * percent;

        startTheta = helper.startTheta;
        middleTheta = helper.middleTheta;
        endTheta = helper.endTheta;

        var innerRadiusPercent;

        if (helper.sliceAngle < 120) {
            helper.titleRadius = r * 0.57;
            innerRadiusPercent = 0.9;
        }
        else if (helper.sliceAngle < 180) {
            helper.titleRadius = r * 0.52;
            innerRadiusPercent = 0.91;
        }
        else {
            helper.titleRadius = r * 0.45;
            innerRadiusPercent = 0.873;
        }

        slicePathString = [helper.MoveTo(helper.middleAngle, r * 0.07),
                     ["L", (r * 0.07) * Math.cos(middleTheta) + (r * 0.87) * Math.cos(startTheta) + x, (r * 0.07) * Math.sin(middleTheta) + (r * 0.87) * Math.sin(startTheta) + y],
                     ["A", (r * innerRadiusPercent), (r * innerRadiusPercent), 0, 0, 1, (r * 0.07) * Math.cos(middleTheta) + (r * 0.87) * Math.cos(endTheta) + x, (r * 0.07) * Math.sin(middleTheta) + (r * 0.87) * Math.sin(endTheta) + y],
                     helper.Close()];

        linePathString = [helper.MoveTo(helper.startAngle, r),
                     helper.ArcTo(r, helper.endAngle, r),
                     helper.ArcBackTo(r, helper.startAngle, r)];

        helper.setTitlePos();

        return {
            slicePathString: slicePathString,
            linePathString: linePathString,
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };

    return this;
};

getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var queryString = query.split("&");
    for (var i = 0; i < queryString.length; i++) {
        var pair = queryString[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return ("");
};
