////////////////////////////////////////////////////////////////////////
//                                                                    //
//   Simple Date Picker                                               //
//                                                                    //
//   Murat KAHRAMAN        04.07.2021                                 //
//                                                                    //
////////////////////////////////////////////////////////////////////////


//Table Day Header Values Turkisch (TR)
var day1 = "Pzt";
var day2 = "Sal";
var day3 = "Çar";
var day4 = "Per";
var day5 = "Cum";
var day6 = "Cmt";
var day7 = "Paz";

//Table Button Style Values
var btn_bgCol = "background-color : white; ";         //button background-color
var btn_brCol = "border-color : #d1d1d1; ";           //button border-color
var btn_width = "width : 21px; ";                     //button width 
var btnheight = "height : 20px; ";                    //button height 
var btn_Dsply = "display : flex; ";                   //button display
var btn_align = "align-items : center; ";             //button align-items
var btn_Jstf1 = "justify-content : flex-end; ";       //button justify-content end
var btn_Jstf2 = "justify-content : flex-start; ";     //button justify-content start

//Table Label Style Values
var lbl_ffmly = "font-family : system-ui; ";          //label font-family
var lbl_fsize = "font-size : 14px; ";                 //label font-size
var lbl_fCol1 = "color : blue; ";                     //label color
var lblValign = "vertical-align : middle; ";          //label vertical-align
var lbl_MgTop = "margin-top : 3px; ";                 //label margin-top 

//Table Head Style Values
var fontFmly1 = "font-family : system-ui; ";          //thead font-familiy 
var fontSize1 = "font-size : 10px; ";                 //thead font-size
var th_BgCol1 = "background-color : lightskyblue; ";  //thead background-color
var th_frCol1 = "color : #545454; ";                  //th text color days
var th_frCol2 = "color : black; ";                    //th text color weekend
var th_width = "width : 24px; ";                      //th width

//Table Day Style Values
var fontFmly2 = "font-family : system-ui; ";          //td day font-familiy 
var fontSize2 = "font-size : 12px; ";                 //td day font-size
var td_bgCol1 = "background-color : white; ";         //td day background-color days
var td_bgCol2 = "background-color : #f2f2f2; ";       //td day background-color weekend
var td_bgCol3 = "background-color : lightskyblue; ";  //td day background-color selected days
var td_styleD = "display : flex; ";                   //td day display style
var td_j_cont = "justify-content : center; ";         //td day display justify

var close_picker;
var date_pattern = "";


$(document).ready(function () {

    //When Mouse leaves Input Picker, Start Timer
    $('body')
        .on("mouseleave", ".input_picker", function (e) {
            close_picker = setInterval("ClosePickerDiv()", 3000);
        })
        .on("mouseenter", ".input_picker", function (e) {
            clearInterval(close_picker);
        });

    //When Mouse leaves Div Picker, Start Timer
    $('body')
        .on("mouseleave", "#picker", function (e) {
            close_picker = setInterval("ClosePickerDiv()", 3000);
        })
        .on("mouseenter", "#picker", function (e) {
            clearInterval(close_picker);
        });

    // Open / Close Div Picker
    $('body').on("click", ".input_picker", function (e) {

        //Take Div Picker
        var div_picker = document.getElementById("picker");

        //Set Div Picker Style First Time 
        if (div_picker.style.display == '') {
            div_picker.style.position = "absolute";
            div_picker.style.display = "none";
            div_picker.style.backgroundColor = "#ffffff";
            div_picker.style.border = "1px solid #747474";
            div_picker.style.zIndex = "9999999";
        }

        //Prepare Div Picker and Show
        if (div_picker.style.display == 'none') {

            //Load User Interface (UI) of Div Picker 
            $('#picker').html(UI_All_Table());

            //Take Date from Input or Current Date
            var currDate;
            if ($(".input_picker").val().trim() == '') {
                currDate = new Date();
            } else {
                currDate = new Date(DatetoStr($(".input_picker").val().trim()));
            }

            //Take All Parts of Date 
            str_year = " " + currDate.getFullYear().toString() + " ";
            str_month = (currDate.getMonth() + 1).toString();
            str_month2 = str_month.length < 2 ? " 0" + str_month + " " : " " + str_month + " ";
            str_day = currDate.getDate().toString();

            //Set All Date Labels
            $("#year").html(str_year);
            $("#month").html(str_month2);
            $("#day").html(str_day);

            //Prepare Pattern from Current Date
            date_pattern = str_day + str_month2 + str_year;

            //Show Div Picker
            div_picker.style.display = "block";

            //Update Day Table UI in Div Picker 
            UI_Day_Table();

        }
        else {
            //Hide Div Picker
            div_picker.style.display = "none";
        }

    });

    //When Month or Year change
    $('body').on("click", ".change", function () {
        var $Clicked = $(this);
        var id = $Clicked.attr('data-id');
        var action = $Clicked.attr('data-target');

        if (action == "month") {

            var str1 = ($("#month").html().trim() * 1) + (id * 1);
            var str2 = str1.toString();
            str2 = str2.length < 2 ? " 0" + str2 + " " : " " + str2 + " ";

            if (str2 == " 00 ") {
                $("#month").html(" 12 ");
                $("#year").html(" " + (($("#year").html().trim() * 1) + (id * 1)) + " ");
            } else if (str2 == " 13 ") {
                $("#month").html(" 01 ");
                $("#year").html(" " + (($("#year").html().trim() * 1) + (id * 1)) + " ");
            } else {
                $("#month").html(str2);
            }

        } else if (action == "year") {
            $("#year").html(" " + (($("#year").html().trim() * 1) + (id * 1)) + " ");
        }
        UI_Day_Table();
    });

    //When Day is Selected 
    $('body').on("click", ".p_day", function () {

        var $Clicked = $(this);
        var id = $Clicked.attr('data-id');


        //When selected day is one digit, add zero 
        id_txt = id.toString().length < 2 ? "0" + id.toString() : id.toString();

        $(".input_picker").val(id_txt + "." + $("#month").html().trim() + "." + $("#year").html().trim());

        //Hide Div Picker
        var div_picker_panel = document.getElementById("picker");
        div_picker_panel.style.display = "none";

    });

});


//Close Div Picker and Timer
function ClosePickerDiv() {

    var picker_div = document.getElementById("picker");
    picker_div.style.display = "none";
    clearInterval(close_picker);
}

//Date to String
function DatetoStr(dateStr) {
    var parts = dateStr.split(".")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

//Prepare UI of All in Div Picker
function UI_All_Table() {

    //Prepae Table
    var p_div = $('<div id="all_table"></div>');

    var p_header1 = '<table align="center" style="border-spacing : unset; margin : 5px; margin-right:-1px; "><thead><tr>';
    p_header1 += '<th align="center" class="text-center" ><button class="change" data-id="-1" data-target="month" type="button" style="' + btn_bgCol + btn_brCol + btn_width + btnheight + btn_Dsply + btn_align + btn_Jstf1 + '" >' + "<" + '</button></th>';
    p_header1 += '<th align="center" class="text-center" ><label id="month" data-target="month" style="' + lbl_ffmly + lbl_fsize + lbl_fCol1 + lblValign + lbl_MgTop + '"> 06 </Label></th>';
    p_header1 += '<th align="center" class="text-center" ><button class="change" data-id="1" data-target="month" type="button" style="' + btn_bgCol + btn_brCol + btn_width + btnheight + btn_Dsply + btn_align + btn_Jstf2 + '" >' + ">" + '</button></th>';
    p_header1 += '<th align="center" class="text-center" >&nbsp;&nbsp;&nbsp;<label id="day" style="display:none;"> 18 </label></th>';
    p_header1 += '<th align="center" class="text-center" ><button class="change" data-id="-1" data-target="year" type="button" style="' + btn_bgCol + btn_brCol + btn_width + btnheight + btn_Dsply + btn_align + btn_Jstf1 + '" >' + "<" + '</button></th>';
    p_header1 += '<th align="center" class="text-center" ><label id="year" data-target="year" style="' + lbl_ffmly + lbl_fsize + lbl_fCol1 + lblValign + lbl_MgTop + '"> 2021 </Label></th>';
    p_header1 += '<th align="center" class="text-center" ><button class="change" data-id="1" data-target="year" type="button" style="' + btn_bgCol + btn_brCol + btn_width + btnheight + btn_Dsply + btn_align + btn_Jstf2 + '" >' + ">" + '</button></th>';
    p_header1 += '</tr></thead></table>';
    p_div.append(p_header1);

    var p_table = $('<table id="day_table" style="border-spacing : unset; margin:5px auto; "></table>').addClass('');
    p_div.append(p_table);

    return p_div;
}

//Prepare UI of Day Table in Div Picker
function UI_Day_Table() {

    //Prepare Pattern from Last Selected Date
    var last_pattern = $("#day").html().toString() + $("#month").html().toString() + $("#year").html().toString();

    //Read Last Selected Date
    now_year = $("#year").html().trim() * 1;
    now_month = ($("#month").html().trim() * 1) - 1;
    now_day = $("#day").html().trim() * 1;

    //which day of the week is the first day of the month
    now_date1 = new Date(now_year, now_month, 1);
    firstDayPos = now_date1.getDay() == 0 ? 6 : now_date1.getDay() - 1;

    //which is last day of the month
    next_month_firstday = new Date(now_year, now_month + 1, 1);
    now_date2 = new Date(next_month_firstday - 1);
    month_lastday = now_date2.getDate();

    //Prepare Table Header
    var p_header = '<thead style="' + th_BgCol1 + fontFmly1 + fontSize1 + '"><tr>';//class="headings"
    p_header += '<th class="text-center" style="' + th_width + th_frCol1 + '">' + day1 + '</th>';
    p_header += '<th class="text-center" style="' + th_width + th_frCol1 + '">' + day2 + '</th>';
    p_header += '<th class="text-center" style="' + th_width + th_frCol1 + '">' + day3 + '</th>';
    p_header += '<th class="text-center" style="' + th_width + th_frCol1 + '">' + day4 + '</th>';
    p_header += '<th class="text-center" style="' + th_width + th_frCol1 + '">' + day5 + '</th>';
    p_header += '<th class="text-center" style="' + th_width + th_frCol2 + '">' + day6 + '</th>';
    p_header += '<th class="text-center" style="' + th_width + th_frCol2 + '">' + day7 + '</th>';
    p_header += '</tr></thead>';

    //Add Table Header into Table
    $("#day_table").html(p_header);

    for (var t_row = 0; t_row < 7; t_row++) {
        //Prepare Table Row
        var p_row = $('<tr/>');
        for (var t_cell = 0; t_cell < 7; t_cell++) {

            //Calculate Cell Adres 
            cell_adres = (t_row * 7) + t_cell;

            //Set BackColor of Weekend or other Days 
            var cell_data = (cell_adres + 1) - firstDayPos;
            back_color = t_cell > 4 ? td_bgCol2 : td_bgCol1;

            //Add All Cell recording to Month
            if ((cell_adres + 1) - firstDayPos < 1 || (cell_adres + 1) - firstDayPos > month_lastday) {
                //Add Empty Cell
                p_row.append($('<td style="' + back_color + '"></td>').html('<span > </span>').addClass('text-center '));
            }
            else {
                //Set BackColor of Selected Day
                selected_day = ((date_pattern == last_pattern) && (now_day == (cell_adres + 1) - firstDayPos)) ? td_bgCol3 : "";
                //Add Day of Month
                p_row.append($('<td style="' + back_color + '"></td>').html('<a class="p_day" data-id="' + cell_data + '" style="' + selected_day + fontFmly2 + fontSize2 + td_styleD + td_j_cont + '">' + cell_data + '</a>').addClass('text-center '));
            }

        }

        //Add Table Row into Table
        $("#day_table").append(p_row);
    }
}
