$textarea = $('#textarea');
var counter = 0;

// $textarea.keyup(function(e) {
// 	console.log($textarea.html());
// 	//$textarea.find('span#current').removeAttr('id');
// 	$textarea.contents()
// 	    .filter(function() {
// 	      return this.nodeType === 3;
// 	    })
// 	      .wrap( '<span class="highlight"></span>' );

	
// });

// document.getElementById('textarea').addEventListener('keypress',function(evt){
//     var range = window.getSelection().getRangeAt(0),
//         modifiers = [0,8]; // List of keys to ignore (0 is arrows & 8 is delete in firefox)

//     console.log($textarea.html());
    
//     if(range.startContainer.parentNode.className!=='highlight' && modifiers.indexOf(evt.which) <  0){
//         if(!range.collapsed){
//             range.deleteContents();
//         }
//         var el =  document.createElement('span');
//         el.appendChild(document.createTextNode('A'));
//         el.className = 'highlight';
//         range.insertNode(el);
        
//         var sel = window.getSelection();		
//         range.setStartBefore(el.childNodes[0]);
//         range.setEndAfter(el.childNodes[0]);
//         sel.removeAllRanges();
//         sel.addRange(range);
//     }
// });

function increment () {
	$('span').each(function() {
		$this = $(this);
		console.log($this.get(0))
		var previous = parseInt($this.attr('data-item'));

		$this.attr('data-item', previous + 1 );
	})
}

function insertAtCursor(char, timestamp) { 
	increment();
    var sel = rangy.getSelection();
    var range = sel.rangeCount ? sel.getRangeAt(0) : null;
    var parent;
    if (range) {
        var el = document.createElement("span");
        $(el).attr('data-item', 1);
        if(char === '<br />') {
        	el.appendChild(document.createElement('br'));
        }
        else {
        	el.appendChild(document.createTextNode(char));
        }
 
        // Check if the cursor is at the end of the text in an existing span
        if (range.endContainer.nodeType == 3
                && (parent = range.endContainer.parentNode)
                && (parent.tagName == "SPAN")) {
            range.setStartAfter(parent);
        }

        range.insertNode(el); 
        range.setStartAfter(el);
        rangy.getSelection().setSingleRange(range); 
    } 
   	
}


document.onkeypress = function(evt) {
	console.log($textarea.html());
    evt = evt || window.event;
    var charCode = (typeof evt.which == "undefined") ? evt.keyCode : evt.which;
    console.log(charCode, String.fromCharCode(charCode))
    if (charCode) {
    	if(charCode == 13) {
    		var code = '<br />';
    	}
    	else {
			var code = String.fromCharCode(charCode);
    	}
        insertAtCursor(code, +new Date());
        return false;
    }
}