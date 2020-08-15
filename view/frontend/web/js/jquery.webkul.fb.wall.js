
/**
* Webkul Software
*
* @category  Webkul
* @package   Webkul_FacebookWallPost
* @author    Webkul
* @copyright Copyright (c) Webkul Software Private Limited (https://webkul.com)
* @license   https://store.webkul.com/license.html
*/
define([
	"jquery",
	"Webkul_FacebookWallPost/js/jquery.jscrollpane.min",
	"Webkul_FacebookWallPost/js/jquery.mousewheel"
], function($) {

$.fn.webkulfbwall = function(options) {
  var opts = $.extend({}, $.fn.webkulfbwall.defaults, options.fbWall);
  var meta = this;
  $this = null;
  return meta.each(function() {
	  $this = $(this);
	  var o = $.meta ? $.extend({}, opts, $this.data()) : opts;			
	  var output = '';
	  var avatarBaseURL;
	  var baseData;
	  var data_like_web = '';
	  var data_like_web2;
	  var wk_like_call = 0;
	  var maxmax = 0;
	  var webkul= 0;
	  var graphURL = "https://graph.facebook.com/";
	  /******************************************************************************************************
	   * Load base data
	   ******************************************************************************************************/
	  meta.addClass('fb-wall'+o.show_suffixs+'').addClass('loading').html('');
	  $.ajax({
		  url: graphURL+o.id+'?access_token='+o.accessToken,
		  dataType: "jsonp",
		  success: function(data, textStatus, XMLHttpRequest){
			  initBase(data);

		  }
	  });
	  function afterallajax(ss){
		  ss = ss.slice(0,-1);				
		  var arr = ss.split("|");				
		  arr = arr.reverse();				
		  var count = 0;								
		  $(".live-demo").find(".fb-face").each(function(){			
			  var thisthis = $(this);
			  var demok =thisthis.attr("id");					
			  
		  for(i=0; i<arr.length; i++)
		  {				
			  var wk_array=arr[i];
			  var wk_arr = wk_array.split("hint")[1].split("hint")[0];												
			  if(demok == wk_arr)
			  {
				  if($("#"+demok+"").find(".fb-wall-date").next().attr("class") != "fb-wall-likes"){				
					  $("#"+demok+"").find(".fb-wall-date").after(wk_array);
					  
				  }
			  }	
		  }	
		  });	
	  }
	  /******************************************************************************************************
	   * Load feed data			 ******************************************************************************************************/
	  var initBase = function(data){
		  baseData = data;
		  
		  if(data==false){
			  meta.removeClass('loading').html('The alias you requested do not exist: '+o.id);
			  return false;
		  };
		  if(data.error){
			  meta.removeClass('loading').html(data.error.message);
			  return false;
		  };
		  
		  var type = (o.showGuestEntries=='true'||o.showGuestEntries==true) ? 'feed' : 'posts';

		  var fields = ["actions","caption","created_time","comments","description","from","full_picture","icon,id","link","message","message_tags","name","object_id","picture","properties","source","status_type","story","story_tags","subscribed","to","type","privacy","application","updated_time"]
		  $.ajax({
			  url: graphURL+o.id+"/"+type+"?limit="+o.max+'&access_token='+o.accessToken+'&fields='+fields.join(),	
			  dataType: "jsonp",
			  success:function (data, textStatus, XMLHttpRequest) {
				  initWall(data);
				  meta.removeClass('loading');						
			  }
		  });
	  }
  
	  /******************************************************************************************************
	   * Parse feed data / wall
	   *****************************************************************************************************/
	  var initWall = function(data){
		  data = data.data;
		  
		  var max = data.length;
		  maxmax = max;
		  
		  for(i=0; i<maxmax; i++){	
			  if(exists(data[i].likes)){
					  
			  }else{					
				  wk_like_call++;//for like button
				  webkul++;
					  
			  }
		  }
		  var thisAvatar, isBase, hasBaseLink, thisDesc;
		  for(var k=0;k<max;k++){
			  isBase = (data[k].from.id==baseData.id);
			  hasBaseLink = isBase&&(exists(baseData.link));
			  if(typeof data[k].actions!='undefined'){
				  if(!o.showGuestEntries&&!isBase) continue;
				  // Box -----------------------------------------------------------------------------------------------------------------------------------
				  output += (k==0) ? '<div id="'+data[k].id+'" class="hint'+data[k].id+' fb fb-face fb-wall-box fb-wall-box-first">' : '<div id="'+data[k].id+'" class="hint'+data[k].id+' fb fb-face fb-wall-box">';	
				  if(o.showavatar==1){
				  output += '<div class="avatar"><a href="http://www.facebook.com/profile.php?id='+data[k].from.id+'" target="_blank">';
				  output += '<img class="fb-wall-avatar" src="'+getAvatarURL(data[k].from.id)+'" />';
				  output += '</a></div>';
				  }
				  output += '<div class="fb-wall-data">';
				  output += '<div class="fb-wall-message'+o.show_suffixs+'">';
				  output += '<a href="http://www.facebook.com/profile.php?id='+data[k].from.id+'" class="fb-wall-message-from" target="_blank">'+data[k].from.name+'</a> ';
				  if(o.show_more_option==1)
				  {
					  if(exists(data[k].message))
					  {
						  if((data[k].message).length>o.char_len)
						  {	var d=data[k].message;
							  var str=d.split("http");
							  //output +=str[0]+'<a href="http'+str[1]+'" target="_blank">'+('http'+str[1]).substr(0,o.char_len);
							  output+=(data[k].message).substr(0,o.char_len);
							  output+= '<span id="hidee'+k+'"  style="display:none" >';
							  output+= modText((data[k].message).substr(o.char_len,5000));
							  output+= '</span>';
							  output+= '</a>';
							  output+= '<a id="see'+k+'" name="hidee'+k+'" class="wkseemore" data-name="hidee" data-id="'+k+'" style="cursor: pointer; display: inline;">'+o.see_more+'</a>';
							  }
							  else
							  output += modText((data[k].message));
					  }	
				  }
				  else{
				  if(exists(data[k].message)) output += modText(data[k].message);
				  }
				  if(o.show_more_option==1)
				  {
					  if(exists(data[k].story))
					  {
						  if((data[k].story).length>o.char_len)
						  {
							  output += modText((data[k].story).substr(0,o.char_len));
							  output+= '<span id="hidee'+k+'"  style="display:none" >';
							  output+= modText((data[k].story).substr(o.char_len,5000));
							  output+= '</span>';
							  output+= '<a id="see'+k+'" name="hidee'+k+'" class="wkseemore" data-name="hidee" data-id="'+k+'" style="cursor: pointer; display: inline;">'+o.see_more+'</a>';
							  }
						  else
								  output += modText((data[k].story));	

					  }
				  }
				  else{
				  if(exists(data[k].story)) output += modText(data[k].story);
				  }
				  output += '</div>';
				  // Media -----------------------------------------------------------------------------------------------------------------------------------
				  if(exists(data[k].picture)||exists(data[k].link)||exists(data[k].caption)||exists(data[k].description)){
					  output += exists(data[k].picture) ? '<div class="fb-wall-media">' : '<div class="fb-wall-media fb-wall-border-left">';
					  if(exists(data[k].picture)){																		
						  var web_pic=data[k].picture;							
						  var web_pic = web_pic.replace("_s.","_n.");						
						  if(exists(data[k].link)) output += '<div class="fb-wall-media-link'+o.show_suffixs+'"><a class="fb-wall-img" href="'+data[k].link+'" target="_blank" >';
						  output += '<img class="fb-wall-picture" src="'+web_pic+'" />';
						  if(exists(data[k].link)) output += '</a></div>';
					  }
					  output += '<div class="fb-wall-media-container"><div class="fb-wall-media-inside">';
					  if(exists(data[k].name)) output += '<a class="fb-wall-name" href="'+data[k].link+'" target="_blank">'+data[k].name+'</a>';
					  if(exists(data[k].caption)) output += '<a class="fb-wall-caption" href="http://'+data[k].caption+'" target="_blank">'+data[k].caption+'</a>';
					  if(exists(data[k].properties)){
						  for(var p=0;p<data[k].properties.length;p++) output += (p==0) ? '<div>'+formatDate(data[k].properties[p].text)+'</div>' : '<div>'+data[k].properties[p].text+'</div>';
					  }
					  if(exists(data[k].description)){
						  thisDesc = modText(data[k].description);
						  if(thisDesc.length>299)thisDesc=thisDesc.substr(0,thisDesc.lastIndexOf(' '))+' ...';
						  output += '<span class="fb-wall-description">'+thisDesc+'</span>';
					  }
					  output += '</div>';
					  output += '</div>';
					  output += '</div>';
				  }
				  if(o.showdate==1) {
				  output += '<span class="fb-wall-date">';
				  if(exists(data[k].icon)) output += '<img class="fb-wall-icon" src="'+data[k].icon+'" title="'+data[k].type+'" alt="" />';
				  output += formatDate(data[k].created_time)+'</span>';	}
				  // Likes -------------------------------------------------------------------------------------------------------------------------------						
				  if(exists(data[k].likes)){						
					  if(parseInt(data[k].likes.data.length)<25){												
						  wk_like_call++;
					  if(parseInt(data[k].likes.data.length)==1){
						  output += '<div class="fb-wall-likes"><div><span>'+data[k].likes.data[0].name+'</span> '+o.translateLikesThis+'</div> </div>';
					  } else {
					  
						  output += '<div class="fb-wall-likes"><div><span>'+data[k].likes.data.length+' '+o.translatePeople+'</span> '+o.translateLikeThis+'</div> </div>';
					  }
				  }
				  else	
					  if(parseInt(data[k].likes.data.length)>=25){	
						  $.ajax({
							  url: graphURL+data[k].id+'/likes?limit=300&after='+data[k].likes.paging.cursors.after+'&access_token='+o.accessToken,
							  dataType: "jsonp",
							  async: false,
							  success: function(data){
					  
									  
								  datalikes=data.data.length;
								  datalikes=datalikes+25;
									  
										  $('#fbwall-like-hidden').html(datalikes);					
																  
								  data_like_web += '<div id="hint'+data.paging.previous.split("com/")[1].split("/likes")[0]+'hint" class="fb-wall-likes"><div><span id="webkul_likes">'+datalikes+'</span> '+o.translateLikesThis+'</div> </div>|';
								  wk_like_call++;
								  if(wk_like_call == maxmax){
					  
									  afterallajax(data_like_web);
						  
								  }
							  }
						  });			
					  }
					  else
						  wk_like_call++;						
					  
				  }
				  
				  // Comments -------------------------------------------------------------------------------------------------------------------------------
				  
				  if(exists(data[k].comments) && exists(data[k].comments.data) && (o.showComments==true||o.showComments=='true')){
					  output += '<div class="fb-wall-comments">';
					  for(var c=0;c<data[k].comments.data.length-1;c++){

						  // alert(data[k].comments.data[c].from);

						  output += '<span class="fb-wall-comment'+o.show_suffixs+'">';	
						  if(o.showavatar==1){	
						  output += '<a href="http://www.facebook.com/profile.php?id='+data[k].comments.data[c].from.id+'" class="fb-wall-comment-avatar" target="_blank">';
						  output += '<img src="'+getAvatarURL(data[k].comments.data[c].from.id)+'" />';
						  output += '</a>';
						  }
						  output += '<span class="fb-wall-comment-message">';
						  output += '<a class="fb-wall-comment-from-name" href="http://www.facebook.com/profile.php?id='+data[k].comments.data[c].from.id+'" target="_blank">'+data[k].comments.data[c].from.name+'</a> ';
						  output += modText(data[k].comments.data[c].message);
						  output += '<span class="fb-wall-comment-from-date">'+formatDate(data[k].comments.data[c].created_time)+'</span>';
						  output +='</span>';
						  output +='</span>';
					  }
					  output += '</div>';
					  }
					  if(o.groupurlOpt==1 && o.show_in_window=="newtab"){
				  output += '<div class="groupurl"><a target="_blank" href="'+ o.groupurl +'"> goto group </a></div>' ;
				  }
				  else if(o.groupurlOpt==1 && o.show_in_window=="samewindow"){
				  output += '<div class="groupurl"><a href="'+ o.groupurl +'"> goto group </a></div>' ;
				  }
				  if(o.pageurlOpt==1 && o.show_in_window=="newtab"){
				  output += '<div class="pageurl"><a target="_blank" href="'+ o.pageurl +'"> goto page </a> </div>' ;
				  }
				  else if(o.groupurlOpt==1 && o.show_in_window=="samewindow"){
				  output += '<div class="pageurl"><a href="'+ o.pageurl +'"> goto page </a> </div>' ;
				  }
				  output += '</div>';
				  output += '<div class="fb-wall-clean"></div>';
				  output += '</div>';
			  }else{
				  if(!o.showGuestEntries&&!isBase) continue;			
					  
				  // Box -----------------------------------------------------------------------------------------------------------------------------------
				  
				  output += (k==0) ? '<div class="fb-face fb-wall-box fb-wall-box-first">' : '<div class="fb-face fb-wall-box">';	
				  if(o.showavatar==1){	
					  output += '<div class="avatar"><a href="http://www.facebook.com/profile.php?id='+data[k].from.id+'" target="_blank">';
					  output += '<img class="fb-wall-avatar" src="'+getAvatarURL(data[k].from.id)+'" />';
					  output += '</a></div>';
				  }
				  output += '<div class="fb-wall-data">';
				  output += '<div class="fb-wall-message'+o.show_suffixs+'">';
				  output += '<a href="http://www.facebook.com/profile.php?id='+data[k].from.id+'" class="fb-wall-message-from" target="_blank">'+data[k].from.name+'</a> ';
				  if(o.show_more_option==1)
				  {
					  if(exists(data[k].message))
					  {
						  if((data[k].message).length>o.char_len)	{	
							  var d=data[k].message;
							  var str=d.split("http");
							  //output +=str[0]+'<a href="http'+str[1]+'" target="_blank">'+('http'+str[1]).substr(0,o.char_len);
							  output+=(data[k].message).substr(0,o.char_len);
							  output+= '<span id="hidee'+k+'"  style="display:none" >';
							  output+= modText((data[k].message).substr(o.char_len,5000));
							  output+= '</span>';
							  output+= '</a>';
							  //output+= '<button id="see'+k+'" onclick="seemore()" onmouseout="seeless()">See More</button>';
							  output+= '<a id="see'+k+'" name="hidee'+k+'" class="wkseemore" data-name="hidee" data-id="'+k+'" style="cursor: pointer; display: inline;">'+o.see_more+'</a>';
						  }
						  else
							  output += modText((data[k].message));
					  }	
				  }
				  else{
					  if(exists(data[k].message)) output += modText(data[k].message);
				  }
				  if(o.show_more_option==1){
					  if(exists(data[k].story))
					  {
						  if((data[k].story).length>o.char_len)
							  {
								  output += modText((data[k].story).substr(0,o.char_len));
								  output+= '<span id="hidee'+k+'"  style="display:none" >';
								  output+= modText((data[k].story).substr(o.char_len,5000));
								  output+= '</span>';
								  output+= '<a id="see'+k+'" name="hidee'+k+'" class="wkseemore" data-name="hidee" data-id="'+k+'" style="cursor: pointer; display: inline;">'+o.see_more+'</a>';
							  }
						  else
							  output += modText((data[k].story));	
					  }	
				  }else{
					  if(exists(data[k].story)) output += modText(data[k].story);
				  }		
				  output += '</div>';

				  // Media -----------------------------------------------------------------------------------------------------------------------------------
				  if(exists(data[k].picture)||exists(data[k].link)||exists(data[k].caption)||exists(data[k].description)){
					  output += exists(data[k].picture) ? '<div class="fb-wall-media">' : '<div class="fb-wall-media fb-wall-border-left">';
					  if(exists(data[k].picture)){
						  var web_pic=data[k].picture;							
						  var web_pic = web_pic.replace("_s.","_n.");	
						  if(exists(data[k].link)) output += '<div class="fb-wall-media-link'+o.show_suffixs+'"><a class="fb-wall-img" href="'+data[k].link+'" target="_blank" >';
						  output += '<img class="fb-wall-picture" src="'+web_pic+'" />';
						  if(exists(data[k].link)) output += '</a></div>';
					  }
					  output += '<div class="fb-wall-media-container"><div class="fb-wall-media-inside">';
					  if(exists(data[k].name)) output += '<a class="fb-wall-name" href="'+data[k].link+'" target="_blank">'+data[k].name+'</a>';
					  if(exists(data[k].caption)) output += '<a class="fb-wall-caption" href="http://'+data[k].caption+'" target="_blank">'+data[k].caption+'</a>';
					  if(exists(data[k].properties)){
						  for(var p=0;p<data[k].properties.length;p++) output += (p==0) ? '<div>'+formatDate(data[k].properties[p].text)+'</div>' : '<div>'+data[k].properties[p].text+'</div>';
					  }

					  if(exists(data[k].description)){

						  thisDesc = modText(data[k].description);

						  if(thisDesc.length>299)thisDesc=thisDesc.substr(0,thisDesc.lastIndexOf(' '))+' ...';

						  output += '<span class="fb-wall-description">'+thisDesc+'</span>';
					  }

					  output += '</div>';

					  output += '</div>';

					  output += '</div>';

				  }
				  if(o.showdate==1) {
					  output += '<span class="fb-wall-date">';

					  if(exists(data[k].icon)) output += '<img class="fb-wall-icon" src="'+data[k].icon+'" title="'+data[k].type+'" alt="" />';
					  output += formatDate(data[k].created_time)+'</span>';	
				  }	

							if(exists(data[k].icon)) output += '<img class="fb-wall-icon" src="'+data[k].icon+'" title="'+data[k].type+'" alt="" />';
							output += formatDate(data[k].created_time)+'</span>';	
						}	


				  if(exists(data[k].comments) && exists(data[k].comments.data) && (o.showComments==true||o.showComments=='true')){
					  output += '<div class="fb-wall-comments">';
					  for(var c=0;c<data[k].comments.data.length;c++){
						  output += '<span class="fb-wall-comment'+o.show_suffixs+'">';	
						  if(o.showavatar==1){		
						  // output += '<a href="http://www.facebook.com/profile.php?id='+data[k].comments.data[c].from.id+'" class="fb-wall-comment-avatar" target="_blank">';
						  // output += '<img src="'+getAvatarURL(data[k].comments.data[c].from.id)+'" />';
						  // output += '</a>';
						  }
						  // output += '<span class="fb-wall-comment-message">';
						  // output += '<a class="fb-wall-comment-from-name" href="http://www.facebook.com/profile.php?id='+data[k].comments.data[c].from.id+'" target="_blank">'+data[k].comments.data[c].from.name+'</a> ';
						  // output += modText(data[k].comments.data[c].message);
						  // output += '<span class="fb-wall-comment-from-date">'+formatDate(data[k].comments.data[c].created_time)+'</span>';
						  // output +='</span>';
						  // output +='</span>';
					  }
					  output += '</div>';
				  }
				  if(o.groupurlOpt==1 && o.show_in_window=="newtab"){
					  output += '<div class="groupurl"><a target="_blank" href="'+ o.groupurl +'"> goto group </a></div>' ;
				  }
				  else if(o.groupurlOpt==1 && o.show_in_window=="samewindow"){
					  output += '<div class="groupurl"><a href="'+ o.groupurl +'"> goto group </a></div>' ;
				  }
				  if(o.pageurlOpt==1 && o.show_in_window=="newtab"){
					  output += '<div class="pageurl"><a target="_blank" href="'+ o.pageurl +'"> goto page </a> </div>' ;
				  }
				  else if(o.groupurlOpt==1 && o.show_in_window=="samewindow"){
					  output += '<div class="pageurl"><a href="'+ o.pageurl +'"> goto page </a> </div>' ;
				  }
				  output += '</div>';

				  output += '<div class="fb-wall-clean"></div>';

				  output += '</div>';

			  }
		  }

		  // No data found --------------------------------------------------------------------------------------------

		  if(max==0){	
			  output += '<div class="fb-wall-box-first">';
			  
			  output += '<img class="fb-wall-avatar" src="'+getAvatarURL(baseData.id)+'" />';

			  output += '<div class="fb-wall-data">';
			  
			  output += '<div class="fb-wall-message'+o.show_suffixs+'"><span class="fb-wall-message-from">'+baseData.name+'</span> '+o.translateErrorNoData+'</div>';

			  if(o.groupurlOpt==1 && o.show_in_window == "newtab"){
				  output += '<div class="groupurl"><a target="_blank" href="'+ o.groupurl +'"> goto group </a></div>';
			  }
			  else if(o.groupurlOpt==1 && o.show_in_window == "samewindow"){
				  output += '<div class="groupurl"><a href="'+ o.groupurl +'"> goto group </a></div>';
			  }
			  if(o.pageurlOpt==1  && o.show_in_window=="newtab" ){
				  output += '<div class="pageurl"><a target="_blank" href="'+ o.pageurl +'">goto page </a> </div>';
			  }
			  else if(o.groupurlOpt==1 && o.show_in_window == "samewindow"){
				  output += '<div class="pageurl"><a href="'+ o.pageurl +'">goto page </a> </div>';
			  }
			  output += '</div>';
			  output += '</div>';
		  }
			  var settings = {
			  showArrows       : true,
			  autoReinitialise : true,
			  mouseWheelSpeed  : 60
		  };
		  var pane = jQuery('#live-demo');
		  pane.jScrollPane(settings);
		  var contentPane = pane.data('jsp').getContentPane();
		  contentPane.html(output).fadeIn(700);
	  }
	  /******************************************************************************************************
	   * Get Avatar URLs
	   ******************************************************************************************************/

	  function getAvatarURL(id){
		  var avatarURL;
		  if(id==baseData.id){ avatarURL = (o.useAvatarAlternative) ? o.avatarAlternative : graphURL+id+'/picture?type=square'; }
		  else{ avatarURL = (o.useAvatarExternal) ? o.avatarExternal : graphURL+id+'/picture?type=square'; }
		  return avatarURL;
	  }

	  /******************************************************************************************************

	   * Parse dateStr as formatted date
	   * @return: if dateStr can't be parsed as Date, return dateStr
	   ******************************************************************************************************/

	  function formatDate(dateStr){
		  var year, month, day, hour, minute, dateUTC, date, ampm, d, time;
		  var iso = (dateStr.indexOf(' ')==-1&&dateStr.substr(4,1)=='-'&&dateStr.substr(7,1)=='-'&&dateStr.substr(10,1)=='T') ? true : false;
		  if(iso){
			  year = dateStr.substr(0,4);
			  month = parseInt((dateStr.substr(5,1)=='0') ? dateStr.substr(6,1) : dateStr.substr(5,2))-1;
			  day = dateStr.substr(8,2);
			  hour = dateStr.substr(11,2);
			  minute = dateStr.substr(14,2);		
			  dateUTC = Date.UTC(year, month, day, hour, minute);
			  date = new Date(dateUTC);
		  }else{
			  d = dateStr.split(' ');
			  if(d.length!=6||d[4]!='at')
				  return dateStr;
			  time = d[5].split(':');
			  ampm = time[1].substr(2);
			  minute = time[1].substr(0,2);
			  hour = parseInt(time[0]);
			  if(ampm=='pm')hour+=12;
			  date = new Date(d[1]+' '+d[2]+' '+d[3] +' '+ hour+':'+minute);
			  date.setTime(date.getTime()-(1000*60*60*7));
		  }
		  day = (date.getDate()<10)?'0'+date.getDate():date.getDate();
		  month = date.getMonth()+1;				
		  month = (month<10)?'0'+month:month;
		  hour = date.getHours();
		  minute = (date.getMinutes()<10)?'0'+date.getMinutes():date.getMinutes();
		  if(o.timeConversion==24){
			  ampm = (hour<12) ? 'am' : 'pm';
			  if(hour==0)hour==12;
			  else if(hour>12)hour=hour-12;
			  if(hour<10)hour='0'+hour;	
			  if(o.date_format=='us'){	
			  return month+'.'+day+'.'+date.getFullYear()+' '+o.translateAt+' '+hour+':'+minute+' '+ampm;
			  }
			  return day+'.'+month+'.'+date.getFullYear()+' at '+hour+':'+minute+' '+ampm;
		  }	
		  if(o.date_format=='us'){
		  return month+'.'+day+'.'+date.getFullYear()+' '+o.translateAt+' '+hour+':'+minute+' '+ampm;	
		  }
		  return day+'.'+month+'.'+date.getFullYear()+' '+o.translateAt+' '+hour+':'+minute+' '+ampm;
	  }
	  /******************************************************************************************************
	   * Helper Function
	   ******************************************************************************************************/
	  function exists(data){
		  if(!data || data==null || data=='undefined' || typeof(data)=='undefined') return false;
		  else return true;
	  }
	  function modText(text){
		  return nl2br(autoLink(escapeTags(text)));
	  }
	  function escapeTags(str){
		  return str.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	  }
	  function nl2br(str){
		  return str.replace(/(\r\n)|(\n\r)|\r|\n/g,"<br>");
	  }
	  function autoLink(str){
		  return str.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a>');
	  }

  });
};
/******************************************************************************************************
* Defaults 
*****************************************************************************************************/
$.fn.webkulfbwall.defaults = {
  avatarAlternative:		'../images/avatar-alternative.jpg',
  avatarExternal:			'../images/avatar-external.jpg',
  id: 					'webkul',
  max:					5,
  showComments:			true,
  showGuestEntries:		true,
  translateAt:			'at',
  translateLikeThis:		'like this',
  translateLikesThis:		'likes this',
  translateErrorNoData:	'has not shared any information.',
  translatePeople:		'people',
  timeConversion:			24,
  useAvatarAlternative:	false,
  useAvatarExternal:		false,
  groupurl:				'',
  pageurl:				'',
  groupurlOpt:			'',
  pageurlOpt:				'',
  showdate:				'',
  accessToken:			'',
  showavatar:				'',			
  date_format:			'',
  show_in_window:			'',
  show_more_option:		'',
  char_len:				50,
  see_more: 				'',
  show_suffixs:			'',
  char_speen  :           100
};
});