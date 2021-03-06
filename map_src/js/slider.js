/*
 *  OpenStreetMap.de - Webseite
 *	Copyright (C) Pascal Neis, 2011
 *
 *	This program is free software; you can redistribute it and/or modify
 *	it under the terms of the GNU AFFERO General Public License as published by
 *	the Free Software Foundation; either version 3 of the License, or
 *	any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU Affero General Public License
 *	along with this program; if not, write to the Free Software
 *	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *	or see http://www.gnu.org/licenses/agpl.txt.
 */
 
/**
 * Title: slider.js
 * Description: slides a div
 *
 * @author Pascal Neis, pascal@neis-one.org 
 * @version 0.1 2011-10-29
 */

//======================
// OBJECTS
var timerlen = 5;
var slideAniLen = 240;

var timerID = new Array();
var startTime = new Array();
var obj = new Array();
var endWidth = new Array();
var moving = new Array();
var dir = new Array();

//======================
// FUNCTIONS
function toggleSlide(objname){
	document.getElementById('panzoombar').style.top="20px";
	document.getElementById('panzoombar').style.display = "none";
	if(document.getElementById(objname).style.display == "none"){
	 	// div is hidden, so let's slide right
		slide_right(objname);
	}else{
		// div is not hidden, so slide left
		slide_left(objname);
	}
	//Open Or Close ILikeOSM
	if(iLikeOSM){
		if(iLikeOSM.div.style.display == "none"){ iLikeOSM.div.style.display = ""; }
		else{ iLikeOSM.div.style.display = "none"; }
	}
}

function openSlide(objname){
	if(document.getElementById(objname).style.display == "none"){
	 	// div is hidden, so let's slide right
		slide_right(objname);
	}
	//Close ILikeOSM
	if(iLikeOSM){ iLikeOSM.div.style.display = "none"; }
}

function closeSlide(objname){
	document.getElementById('panzoombar').style.top="20px";
	document.getElementById('panzoombar').style.display = "none";
	if(document.getElementById(objname).style.display == "none"){
		// div is not hidden, so slide left
		slide_left(objname);
	}
	//Open ILikeOSM
	if(iLikeOSM){ iLikeOSM.div.style.display = ""; }
}

function slide_right(objname){
	if(moving[objname]){ return; }
	if(document.getElementById(objname).style.display != "none"){
		return; // cannot slide right something that is already visible
	}
	moving[objname] = true; dir[objname] = "right"; startslide(objname);
}

function slide_left(objname){
	if(moving[objname]){ return; }
	if(document.getElementById(objname).style.display == "none"){
		return; // cannot slide left something that is already hidden
	}
	moving[objname] = true; dir[objname] = "left"; startslide(objname);
}

function startslide(objname){
	obj[objname] = document.getElementById(objname);
	endWidth[objname] = parseInt(obj[objname].style.width);
	startTime[objname] = (new Date()).getTime();	
	if(dir[objname] == "right"){ obj[objname].style.width = "1px"; }
    obj[objname].style.display = "block";
    timerID[objname] = setInterval('slidetick(\'' + objname + '\');',timerlen);
}

function slidetick(objname){
	var elapsed = (new Date()).getTime() - startTime[objname];
	if (elapsed > slideAniLen){ endSlide(objname); }
	else {
		var d = Math.round(elapsed / slideAniLen * endWidth[objname]);
		if(dir[objname] == "left"){ d = endWidth[objname] - d; }
		obj[objname].style.width = d + "px";
	}
    return;
}

function endSlide(objname){
	clearInterval(timerID[objname]);
	
	if(dir[objname] == "left"){
		obj[objname].style.display = "none";
		document.getElementById('panzoombar').style.left="20px";
		document.getElementById('panzoombar').style.display = "";
    }
    else{
    	document.getElementById('panzoombar').style.left="340px";
    	document.getElementById('panzoombar').style.display = "";
    }
   	obj[objname].style.width = endWidth[objname] + "px";

   	delete(moving[objname]);
   	delete(timerID[objname]);
   	delete(startTime[objname]);
   	delete(endWidth[objname]);
   	delete(obj[objname]);
   	delete(dir[objname]);
   	return;
}