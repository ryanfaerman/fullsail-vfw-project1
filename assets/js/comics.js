/*
@project VFW Project 1
@author  Ryan Faerman
@term    September 2011
*/

var $ = function(id) {
	return document.getElementById(id);
}

var storage = {
	set: function(k, v) {
		return localStorage.setItem(k, JSON.stringify(v));
	},
	get: function(k) {
		return JSON.parse(localStorage.getItem(k));
	},
	clear: function() {
		return localStorage.clear();
	}
};

var saveData = function() {
	var data = {
		title: $('title').value,
		rating: $('range').value,
		favorite: $('favorite').checked ? 'yes' : 'no',
		pubdate: $('pubdate').value,
		summary: $('summary').value,
		age_group: $('age_group').value,
	}
	
	db = storage.get('db') || [];
	db.push(data);
	storage.set('db', db);
	
	return data;
};

var form = '';
var getData = function() {
	db = storage.get('db') || [];
	html = '';
	for(i in db) {
		r = db[i];
		html += '<div class="item"><ul>';
		html += '	<li><strong>Title</strong> '+r.title+'</li>';
		html += '	<li><strong>Rating</strong> '+r.rating+'</li>';
		html += '	<li><strong>Favorite</strong> '+r.favorite+'</li>';
		html += '	<li><strong>Published Date</strong> '+r.pubdate+'</li>';
		html += '	<li><strong>Summary</strong> '+r.summary+'</li>';
		html += '	<li><strong>Age Group</strong> '+r.age_group+'</li>';
		html += '</ul></div>';
	}
	form = $('form').innerHTML;
	$('form').innerHTML = html;
};

var prepareSelect = function(a){
	
	var html = '';
	for(i in a) {
		html += '<option>'+a[i]+'</option>';
	}
	$('age_group').innerHTML = html;
};

// DOM Ready
window.addEventListener("DOMContentLoaded", function(){
	
	prepareSelect(["Everyone", "Teens (&lt; 18)", "Mature (18+)"]);
	
	
	$('submit').addEventListener('click', function(e){
		e.preventDefault();
		saveData();
	});
	
	$('view_comics').addEventListener('click', function(e){
		e.preventDefault();
		getData();
	});
	
	$('clear_comics').addEventListener('click', function(e){
		e.preventDefault();
		storage.clear();
		window.location = window.location;
	});
});