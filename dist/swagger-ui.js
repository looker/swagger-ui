// swagger-ui.js
// version 2.1.0-alpha.7
$(function() {

	// Helper function for vertically aligning DOM elements
	// http://www.seodenver.com/simple-vertical-align-plugin-for-jquery/
	$.fn.vAlign = function() {
		return this.each(function(i){
		var ah = $(this).height();
		var ph = $(this).parent().height();
		var mh = (ph - ah) / 2;
		$(this).css('margin-top', mh);
		});
	};

	$.fn.stretchFormtasticInputWidthToParent = function() {
		return this.each(function(i){
		var p_width = $(this).closest("form").innerWidth();
		var p_padding = parseInt($(this).closest("form").css('padding-left') ,10) + parseInt($(this).closest("form").css('padding-right'), 10);
		var this_padding = parseInt($(this).css('padding-left'), 10) + parseInt($(this).css('padding-right'), 10);
		$(this).css('width', p_width - p_padding - this_padding);
		});
	};

	$('form.formtastic li.string input, form.formtastic textarea').stretchFormtasticInputWidthToParent();

	// Vertically center these paragraphs
	// Parent may need a min-height for this to work..
	$('ul.downplayed li div.content p').vAlign();

	// When a sandbox form is submitted..
	$("form.sandbox").submit(function(){

		var error_free = true;

		// Cycle through the forms required inputs
 		$(this).find("input.required").each(function() {

			// Remove any existing error styles from the input
			$(this).removeClass('error');

			// Tack the error style on if the input is empty..
			if ($(this).val() == '') {
				$(this).addClass('error');
				$(this).wiggle();
				error_free = false;
			}

		});

		return error_free;
	});

});

function clippyCopiedCallback(a) {
  $('#api_key_copied').fadeIn().delay(1000).fadeOut();

  // var b = $("#clippy_tooltip_" + a);
  // b.length != 0 && (b.attr("title", "copied!").trigger("tipsy.reload"), setTimeout(function() {
  //   b.attr("title", "copy to clipboard")
  // },
  // 500))
}

// Logging function that accounts for browsers that don't have window.console
log = function(){
  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments)[0] );
  }
};

// Handle browsers that do console incorrectly (IE9 and below, see http://stackoverflow.com/a/5539378/7913)
if (Function.prototype.bind && console && typeof console.log == "object") {
    [
      "log","info","warn","error","assert","dir","clear","profile","profileEnd"
    ].forEach(function (method) {
        console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
}

var Docs = {

	navigate_to_topic: function (topic) {
		var newHash = '!';
		if (topic.api_version) {
			newHash += '/' + topic.api_version
		}
		if (topic.group) {
			newHash += '/' + topic.group;
			if (topic.topic) {
				newHash += '/' + topic.topic
			}
		}
		location.hash = newHash
	},

	shebang_parse_topic: function(topic_str) {
	// If shebang has an operation nickname in it..
	// e.g. /docs/#!/3.0/group/topic

	// this regex matches all of these patterns
	// 		!/3.0
	// 		!/3.0/group
	// 		!/3.0/group/topic
	// 		!/group
	// 		!/group/topic
	//
		const matches = topic_str.match(/^#?!(?:\/(\d+\.\d+))?(?:\/(\w+)(?:\/(\w+))?)?/);
		if (matches) {
			return {
				api_version: matches[1],
				group: matches[2],
				topic: matches[3],
			}
		}
		return null
  },

	show_topic: function(topic) {
		if (topic) {
			if (topic.group) {
				// Expand all operations for the resource and scroll to it
				Docs.expandEndpointListForResource(topic.group);
				document.getElementById("resource_" + topic.group).scrollIntoView()

				if (topic.topic) {
					// Expand operation
					const li_dom_id = topic.group + "_" + topic.topic;

					Docs.expandOperation(document.getElementById(li_dom_id + "_content"));
					document.getElementById(li_dom_id).scrollIntoView();
				}
			}
		}
	},

	toggleEndpointListForResource: function(resource) {
		$('li#resource_' + Docs.escapeResourceName(resource) + ' ul.endpoints').collapse('toggle');
	},

	// Expand resource
	expandEndpointListForResource: function(resource) {
		var resource = Docs.escapeResourceName(resource);
		if (resource == '') {
			$('.resource ul.endpoints').show();
			return;
		}

		$('li#resource_' + resource + ' ul.endpoints').show();
	},

	// Collapse resource and mark as explicitly closed
	collapseEndpointListForResource: function(resource) {
		var resource = Docs.escapeResourceName(resource);
		$('li#resource_' + resource + ' ul.endpoints').hide();
	},

	expandOperationsForResource: function(resource) {
		// Make sure the resource container is open..
		Docs.expandEndpointListForResource(resource);

		if (resource == '') {
			$('.resource ul.endpoints li.operation div.content').show();
			return;
		}

		$('li#resource_' + Docs.escapeResourceName(resource) + ' li.operation div.content').each(function() {
			Docs.expandOperation($(this));
		});
	},

	collapseOperationsForResource: function(resource) {
		// Make sure the resource container is open..
		Docs.expandEndpointListForResource(resource);

		$('li#resource_' + Docs.escapeResourceName(resource) + ' li.operation div.content').each(function() {
			Docs.collapseOperation($(this));
		});
	},

	escapeResourceName: function(resource) {
		return resource.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g, "\\$&");
	},

	expandOperation: function(elem) {
		(elem.style || elem[0].style).display = "block";
	},

	collapseOperation: function(elem) {
		// normalize across jquery collection & getElementById singleton
		(elem.style || elem[0].style).display = "none";
	},
};
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['apikey_button_view'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class='auth_button' id='apikey_button'><img class='auth_icon' alt='apply api key' src='images/apikey.jpeg'></div>\n<div class='auth_container' id='apikey_container'>\n  <div class='key_input_container'>\n    <div class='auth_label'>"
    + container.escapeExpression(((helper = (helper = helpers.keyName || (depth0 != null ? depth0.keyName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"keyName","hash":{},"data":data}) : helper)))
    + "</div>\n    <input placeholder=\"api_key\" class=\"auth_input\" id=\"input_apiKey_entry\" name=\"apiKey\" type=\"text\"/>\n    <div class='auth_submit'><a class='auth_submit_button' id=\"apply_api_key\" href=\"#\">apply</a></div>\n  </div>\n</div>\n\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['basic_auth_button_view'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='auth_button' id='basic_auth_button'><img class='auth_icon' src='images/password.jpeg'></div>\n<div class='auth_container' id='basic_auth_container'>\n  <div class='key_input_container'>\n    <div class=\"auth_label\">Username</div>\n    <input placeholder=\"username\" class=\"auth_input\" id=\"input_username\" name=\"username\" type=\"text\"/>\n    <div class=\"auth_label\">Password</div>\n    <input placeholder=\"password\" class=\"auth_input\" id=\"input_password\" name=\"password\" type=\"password\"/>\n    <div class='auth_submit'><a class='auth_submit_button' id=\"apply_basic_auth\" href=\"#\">apply</a></div>\n  </div>\n</div>\n\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['content_type'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.produces : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "	<option value=\""
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "  <option value=\"application/json\">application/json</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<label for=\"contentType\"></label>\n<select name=\"contentType\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.produces : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</select>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <div class=\"info_title\">"
    + container.escapeExpression(alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.title : stack1), depth0))
    + "</div>\n  <h2 data-toggle=\"collapse\" data-target=\"#info_description\" aria-expanded=\"true\">\n    Overview\n  </h2>\n  <div class=\"info_description collapse in\" id=\"info_description\">"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.description : stack1), depth0)) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers["if"].call(alias2,((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.termsOfServiceUrl : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers["if"].call(alias2,((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers["if"].call(alias2,((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.license : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"info_tos\"><a href=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.termsOfServiceUrl : stack1), depth0))
    + "\">Terms of service</a></div>";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class='info_contact'><a href=\"mailto:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.name : stack1), depth0))
    + "\">Contact Looker</a></div>";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class='info_license'><a href='"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.license : stack1)) != null ? stack1.url : stack1), depth0))
    + "'>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.license : stack1)) != null ? stack1.name : stack1), depth0))
    + "</a></div>";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    , <span style=\"font-variant: small-caps\">api version</span>: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.version : stack1), depth0))
    + "\n    ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <span style=\"float:right\"><a href=\""
    + alias4(((helper = (helper = helpers.validatorUrl || (depth0 != null ? depth0.validatorUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"validatorUrl","hash":{},"data":data}) : helper)))
    + "/debug?url="
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><img id=\"validator\" src=\""
    + alias4(((helper = (helper = helpers.validatorUrl || (depth0 != null ? depth0.validatorUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"validatorUrl","hash":{},"data":data}) : helper)))
    + "?url="
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n    </span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class='info' id='api_info'>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.info : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n<div id='resources_container'>\n  <ul id='resources'></ul>\n\n  <div class=\"footer\">\n    <br>\n    <br>\n    <h4 style=\"color: #999\">[ <span style=\"font-variant: small-caps\">base url</span>: "
    + container.escapeExpression(((helper = (helper = helpers.basePath || (depth0 != null ? depth0.basePath : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"basePath","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.version : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "]\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.validatorUrl : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </h4>\n    </div>\n</div>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['operation'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <h4>Warning: Deprecated</h4>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        <h4>Implementation Notes</h4>\n        <p>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"auth\">\n        <span class=\"api-ic ic-error\"></span>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <div id=\"api_information_panel\" style=\"top: 526px; left: 776px; display: none;\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "            <div title='"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "'>"
    + container.escapeExpression(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "</div>";
},"12":function(container,depth0,helpers,partials,data) {
    return "        <div class='access'>\n          <span class=\"api-ic ic-off\" title=\"click to authenticate\"></span>\n        </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "          <h4>Response Class</h4>\n          <p><span class=\"model-signature\" /></p>\n          <br/>\n          <div class=\"response-content-type\" />\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "          <h4>Parameters</h4>\n          <table class='fullwidth'>\n          <thead>\n            <tr>\n            <th style=\"width: 100px; max-width: 100px\">Parameter</th>\n            <th style=\"width: 310px; max-width: 310px\">Value</th>\n            <th style=\"width: 200px; max-width: 200px\">Description</th>\n            <th style=\"width: 100px; max-width: 100px\">Parameter Type</th>\n            <th style=\"width: 220px; max-width: 230px\">Data Type</th>\n            </tr>\n          </thead>\n          <tbody class=\"operation-params\">\n\n          </tbody>\n          </table>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "          <div style='margin:0;padding:0;display:inline'></div>\n          <h4>Response Messages</h4>\n          <table class='fullwidth'>\n            <thead>\n            <tr>\n              <th>HTTP Status Code</th>\n              <th>Reason</th>\n              <th>Response Model</th>\n            </tr>\n            </thead>\n            <tbody class=\"operation-status\">\n\n            </tbody>\n          </table>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "";
},"22":function(container,depth0,helpers,partials,data) {
    return "          <div class='sandbox_header'>\n            <input class='submit' name='commit' type='button' value='Try it out!' />\n            <a href='#' class='response_hider' style='display:none'>Hide Response</a>\n            <span class='response_throbber' style='display:none'></span>\n          </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=helpers.blockHelperMissing, buffer = 
  "\n  <ul class='operations' >\n    <li class='"
    + alias4(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"method","hash":{},"data":data}) : helper)))
    + " operation' id='"
    + alias4(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias4(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "'>\n      <div class='heading'>\n        <h3>\n          <a href='#!/"
    + alias4(((helper = (helper = helpers.api_version || (depth0 != null ? depth0.api_version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"api_version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "' class=\"toggleOperation\">SDK</a>\n          <span class='sdk sdk_header_element'>\n          </span>\n          <span class='http_method http_header_element' hidden='hidden'>\n          </span>\n          <span class='path http_header_element' hidden='hidden'>\n          </span>\n          <span class='sdk_fn_name sdk_header_element'>\n          </span>\n        </h3>\n        <span class='status status_"
    + alias4(((helper = (helper = helpers.looker_status || (depth0 != null ? depth0.looker_status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"looker_status","hash":{},"data":data}) : helper)))
    + " tooltip_anchor'>\n            "
    + ((stack1 = ((helper = (helper = helpers.looker_status_text || (depth0 != null ? depth0.looker_status_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"looker_status_text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n          <span class='tooltip_popup'>\n            "
    + alias4(((helper = (helper = helpers.looker_status_description || (depth0 != null ? depth0.looker_status_description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"looker_status_description","hash":{},"data":data}) : helper)))
    + "\n          </span>\n        </span>\n        <ul class='options'>\n          <li>\n            <a href='#!/"
    + alias4(((helper = (helper = helpers.api_version || (depth0 != null ? depth0.api_version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"api_version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "' class='toggleOperation summary'>"
    + ((stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summary","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a>\n          </li>\n        </ul>\n      </div>\n      <div class='content' id='"
    + alias4(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias4(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "_content' style='display:none'>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.deprecated : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.oauth || (depth0 != null ? depth0.oauth : depth0)) != null ? helper : alias2),(options={"name":"oauth","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.oauth) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.oauth : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        ";
  stack1 = ((helper = (helper = helpers.oauth || (depth0 != null ? depth0.oauth : depth0)) != null ? helper : alias2),(options={"name":"oauth","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.oauth) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = ((helper = (helper = helpers.oauth || (depth0 != null ? depth0.oauth : depth0)) != null ? helper : alias2),(options={"name":"oauth","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.oauth) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <form accept-charset='UTF-8' class='sandbox'>\n          <div style='margin:0;padding:0;display:inline'></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.parameters : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.responseMessages : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isReadOnly : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "        </form>\n        <div class='response' style='display:none'>\n          <h4>Request URL</h4>\n          <div class='block request_url'></div>\n          <h4>Response Body</h4>\n          <div class='block response_body'></div>\n          <h4>Response Code</h4>\n          <div class='block response_code'></div>\n          <h4>Response Headers</h4>\n          <div class='block response_headers'></div>\n        </div>\n      </div>\n    </li>\n  </ul>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFile : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<input type=\"file\" name='"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "'/>\n			<div class=\"parameter-content-type\" />\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["default"] : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<textarea class='body-textarea' name='"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers["default"] || (depth0 != null ? depth0["default"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"default","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<textarea class='body-textarea' name='"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "'></textarea>\n				<br />\n				<div class=\"parameter-content-type\" />\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFile : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.renderTextParam || (depth0 && depth0.renderTextParam) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"renderTextParam","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<td class='code'>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n<td>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isBody : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "\n</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"paramType","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td>\n	<span class=\"model-signature\"></span>\n</td>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_list'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "'code required'";
},"3":function(container,depth0,helpers,partials,data) {
    return "'code'";
},"5":function(container,depth0,helpers,partials,data) {
    return " multiple='multiple'";
},"7":function(container,depth0,helpers,partials,data) {
    return "'parameter required'";
},"9":function(container,depth0,helpers,partials,data) {
    return "'parameter'";
},"11":function(container,depth0,helpers,partials,data) {
    return "";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["default"] : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.isArray || (depth0 && depth0.isArray) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"isArray","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "          <option selected=\"\" value=''></option>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isDefault : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option selected=\"\" value='"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + " (default)</option>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option value='"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<td class="
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n<td>\n  <select "
    + ((stack1 = (helpers.isArray || (depth0 && depth0.isArray) || alias2).call(alias1,depth0,{"name":"isArray","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " class="
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + " name='"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "'>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.allowableValues : depth0)) != null ? stack1.descriptiveValues : stack1),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </select>\n</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"paramType","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_readonly'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <textarea class='body-textarea' readonly='readonly' name='"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers["default"] || (depth0 != null ? depth0["default"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"default","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["default"] : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            "
    + container.escapeExpression(((helper = (helper = helpers["default"] || (depth0 != null ? depth0["default"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"default","hash":{},"data":data}) : helper)))
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "            (empty)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<td class='code'>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isBody : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"paramType","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_readonly_required'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <textarea class='body-textarea'  readonly='readonly' placeholder='(required)' name='"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers["default"] || (depth0 != null ? depth0["default"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"default","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["default"] : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            "
    + container.escapeExpression(((helper = (helper = helpers["default"] || (depth0 != null ? depth0["default"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"default","hash":{},"data":data}) : helper)))
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "            (empty)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<td class='code required'>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isBody : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"paramType","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_required'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFile : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<input type=\"file\" name='"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "'/>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["default"] : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<textarea class='body-textarea required' placeholder='(required)' name='"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers["default"] || (depth0 != null ? depth0["default"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"default","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<textarea class='body-textarea required' placeholder='(required)' name='"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "'></textarea>\n				<br />\n				<div class=\"parameter-content-type\" />\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFile : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<input class='parameter' class='required' type='file' name='"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "'/>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.renderTextParam || (depth0 && depth0.renderTextParam) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"renderTextParam","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<td class='code required'>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isBody : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n	<strong>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</strong>\n</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"paramType","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['parameter_content_type'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.consumes : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "  <option value=\""
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "  <option value=\"application/json\">application/json</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<label for=\"parameterContentType\"></label>\n<select name=\"parameterContentType\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.consumes : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</select>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['resource'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " : ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li>\n      <a href='"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"url","hash":{},"data":data}) : helper)))
    + "'>Raw</a>\n    </li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=helpers.blockHelperMissing, buffer = 
  "<div class='heading'>\n  <h2 data-toggle=\"collapse\" data-target='#"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "_endpoint_list'  aria-expanded=\"false\" class=\"collapsed\">\n    <a href='#!/"
    + alias4(((helper = (helper = helpers.api_version || (depth0 != null ? depth0.api_version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"api_version","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "  ";
  stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias2),(options={"name":"summary","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.summary) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += ((stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summary","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a>\n  </h2>\n<!--\n  <ul class='options'>\n    <li>\n      <a href='#!/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' id='endpointListTogger_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "' class=\"toggleEndpointList\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Show/Hide</a>\n    </li>\n    <li>\n      <a href='#' class=\"collapseResource\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        List Operations\n      </a>\n    </li>\n    <li>\n      <a href='#' class=\"expandResource\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n        Expand Operations\n      </a>\n    </li>\n    ";
  stack1 = ((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(options={"name":"url","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.url) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </ul>\n-->\n</div>\n<ul class='endpoints collapse' id='"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "_endpoint_list'>\n\n</ul>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['response_content_type'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.produces : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "  <option value=\""
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "  <option value=\"application/json\">application/json</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<label for=\"responseContentType\"></label>\n<select name=\"responseContentType\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.produces : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</select>\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['signature'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div>\n<ul class=\"signature-nav\">\n  <li><a class=\"description-link\" href=\"#\">Model</a></li>\n  <li><a class=\"snippet-link\" href=\"#\">Model Example</a></li>\n</ul>\n<div>\n\n<div class=\"signature-container\">\n  <div class=\"description\">\n    "
    + ((stack1 = ((helper = (helper = helpers.signature || (depth0 != null ? depth0.signature : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"signature","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </div>\n\n  <div class=\"snippet\">\n    <pre><code>"
    + container.escapeExpression(((helper = (helper = helpers.sampleJSON || (depth0 != null ? depth0.sampleJSON : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sampleJSON","hash":{},"data":data}) : helper)))
    + "</code></pre>\n    <small class=\"notice\"></small>\n  </div>\n</div>\n\n";
},"useData":true});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['status_code'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<td width='15%' class='code'>"
    + container.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n<td width='50%'><span class=\"model-signature\" /></td>";
},"useData":true});
})();



// Generated by CoffeeScript 1.6.3
(function() {
  var ApiKeyButton, BasicAuthButton, ContentTypeView, HeaderView, MainView, OperationView, ParameterContentTypeView, ParameterView, ResourceView, ResponseContentTypeView, SignatureView, StatusCodeView, SwaggerUi, _ref, _ref1, _ref10, _ref11, _ref12, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SwaggerUi = (function(_super) {
    __extends(SwaggerUi, _super);

    function SwaggerUi() {
      _ref = SwaggerUi.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SwaggerUi.prototype.dom_id = "swagger_ui";

    SwaggerUi.prototype.options = null;

    SwaggerUi.prototype.api = null;

    SwaggerUi.prototype.headerView = null;

    SwaggerUi.prototype.mainView = null;

    SwaggerUi.prototype.initialize = function(options) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      if (options.dom_id != null) {
        this.dom_id = options.dom_id;
        delete options.dom_id;
      }
      if ($('#' + this.dom_id) == null) {
        $('body').append('<div id="' + this.dom_id + '"></div>');
      }
      this.options = options;
      this.options.success = function() {
        return _this.render();
      };
      this.options.progress = function(d) {
        return _this.showMessage(d);
      };
      this.options.failure = function(d) {
        if (_this.api && _this.api.isValid === false && _this.options.legacyFallback === true) {
          log("not a valid 2.0 spec, loading legacy client");
          _this.api = new SwaggerApi(_this.options);
          return _this.api.build();
        } else {
          return _this.onLoadFailure(d);
        }
      };
      this.headerView = new HeaderView({
        el: $('#header')
      });
      return this.headerView.on('update-swagger-ui', function(data) {
        return _this.updateSwaggerUi(data);
      });
    };

    SwaggerUi.prototype.setOption = function(option, value) {
      return this.options[option] = value;
    };

    SwaggerUi.prototype.getOption = function(option) {
      return this.options[option];
    };

    SwaggerUi.prototype.updateSwaggerUi = function(data) {
      this.options.url = data.url;
      return this.load();
    };

    SwaggerUi.prototype.load = function() {
      var url, _ref1;
      if ((_ref1 = this.mainView) != null) {
        _ref1.clear();
      }
      url = this.options.url;
      if (url.indexOf("http") !== 0) {
        url = this.buildUrl(window.location.href.toString(), url);
      }
      this.options.url = url;
      this.headerView.update(url);
      this.api = new SwaggerClient(this.options);
      if (this.options.success === false) {
        return this.api.build();
      }
    };

    SwaggerUi.prototype.collapseAll = function() {
      return Docs.collapseEndpointListForResource('');
    };

    SwaggerUi.prototype.listAll = function() {
      return Docs.collapseOperationsForResource('');
    };

    SwaggerUi.prototype.expandAll = function() {
      return Docs.expandOperationsForResource('');
    };

    SwaggerUi.prototype.render = function() {
      this.showMessage('Finished Loading Resource Information. Rendering Swagger UI...');
      this.mainView = new MainView({
        model: this.api,
        el: $('#' + this.dom_id),
        swaggerOptions: this.options
      }).render();
      this.showMessage();
      switch (this.options.docExpansion) {
        case "full":
          this.expandAll();
          break;
        case "list":
          this.listAll();
      }
      if (this.options.onComplete) {
        return this.options.onComplete(this.api, this);
      }
    };

    SwaggerUi.prototype.buildUrl = function(base, url) {
      var endOfPath, parts;
      log("base is " + base);
      if (url.indexOf("/") === 0) {
        parts = base.split("/");
        base = parts[0] + "//" + parts[2];
        return base + url;
      } else {
        endOfPath = base.length;
        if (base.indexOf("?") > -1) {
          endOfPath = Math.min(endOfPath, base.indexOf("?"));
        }
        if (base.indexOf("#") > -1) {
          endOfPath = Math.min(endOfPath, base.indexOf("#"));
        }
        base = base.substring(0, endOfPath);
        if (base.indexOf("/", base.length - 1) !== -1) {
          return base + url;
        }
        return base + "/" + url;
      }
    };

    SwaggerUi.prototype.showMessage = function(data) {
      if (data == null) {
        data = '';
      }
      $('#message-bar').removeClass('message-fail');
      $('#message-bar').addClass('message-success');
      $('#message-bar').toggle(!!data);
      return $('#message-bar').html(data);
    };

    SwaggerUi.prototype.onLoadFailure = function(data) {
      var val;
      if (data == null) {
        data = '';
      }
      $('#message-bar').removeClass('message-success');
      $('#message-bar').addClass('message-fail');
      $('#message-bar').toggle(!!data);
      val = $('#message-bar').html(data);
      if (this.options.onFailure != null) {
        this.options.onFailure(data);
      }
      return val;
    };

    return SwaggerUi;

  })(Backbone.Router);

  window.SwaggerUi = SwaggerUi;

  HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      _ref1 = HeaderView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    HeaderView.prototype.events = {
      'click #show-pet-store-icon': 'showPetStore',
      'click #show-wordnik-dev-icon': 'showWordnikDev',
      'click #explore': 'showCustom',
      'keyup #input_baseUrl': 'showCustomOnKeyup',
      'keyup #input_apiKey': 'showCustomOnKeyup'
    };

    HeaderView.prototype.initialize = function() {};

    HeaderView.prototype.showPetStore = function(e) {
      return this.trigger('update-swagger-ui', {
        url: "http://petstore.swagger.wordnik.com/api/api-docs"
      });
    };

    HeaderView.prototype.showWordnikDev = function(e) {
      return this.trigger('update-swagger-ui', {
        url: "http://api.wordnik.com/v4/resources.json"
      });
    };

    HeaderView.prototype.showCustomOnKeyup = function(e) {
      if (e.keyCode === 13) {
        return this.showCustom();
      }
    };

    HeaderView.prototype.showCustom = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.trigger('update-swagger-ui', {
        url: $('#input_baseUrl').val(),
        apiKey: $('#input_apiKey').val()
      });
    };

    HeaderView.prototype.update = function(url, apiKey, trigger) {
      if (trigger == null) {
        trigger = false;
      }
      $('#input_baseUrl').val(url);
      if (trigger) {
        return this.trigger('update-swagger-ui', {
          url: url
        });
      }
    };

    return HeaderView;

  })(Backbone.View);

  MainView = (function(_super) {
    var sorters;

    __extends(MainView, _super);

    function MainView() {
      _ref2 = MainView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    sorters = {
      'alpha': function(a, b) {
        return a.path.localeCompare(b.path);
      },
      'method': function(a, b) {
        return a.method.localeCompare(b.method);
      }
    };

    MainView.prototype.initialize = function(opts) {
      var auth, key, name, url, value, _ref3;
      if (opts == null) {
        opts = {};
      }
      this.model.auths = [];
      _ref3 = this.model.securityDefinitions;
      for (key in _ref3) {
        value = _ref3[key];
        auth = {
          name: key,
          type: value.type,
          value: value
        };
        this.model.auths.push(auth);
      }
      if (this.model.info && this.model.info.license && typeof this.model.info.license === 'string') {
        name = this.model.info.license;
        url = this.model.info.licenseUrl;
        this.model.info.license = {};
        this.model.info.license.name = name;
        this.model.info.license.url = url;
      }
      if (!this.model.info) {
        this.model.info = {};
      }
      if (!this.model.info.version) {
        this.model.info.version = this.model.apiVersion;
      }
      this.model.info.full_version = this.model.info.version;
      this.model.info.version = this.model.info.version.split('.').slice(0, 2).join('.');
      if (this.model.info.description) {
        this.model.info.description = marked(this.model.info.description);
      } else {
        this.model.info.description = '';
      }
      if (false && this.model.swaggerVersion === "2.0") {
        if ("validatorUrl" in opts.swaggerOptions) {
          return this.model.validatorUrl = opts.swaggerOptions.validatorUrl;
        } else if (this.model.url.indexOf("localhost") > 0) {
          return this.model.validatorUrl = null;
        } else {
          return this.model.validatorUrl = "http://online.swagger.io/validator";
        }
      }
    };

    MainView.prototype.render = function() {
      var auth, button, counter, id, name, resource, resources, _i, _len, _ref3;
      if (this.model.securityDefinitions) {
        for (name in this.model.securityDefinitions) {
          auth = this.model.securityDefinitions[name];
          if (auth.type === "apiKey" && $("#apikey_button").length === 0) {
            button = new ApiKeyButton({
              model: auth
            }).render().el;
            $('.auth_main_container').append(button);
          }
          if (auth.type === "basicAuth" && $("#basic_auth_button").length === 0) {
            button = new BasicAuthButton({
              model: auth
            }).render().el;
            $('.auth_main_container').append(button);
          }
        }
      }
      $(this.el).html(Handlebars.templates.main(this.model));
      resources = {};
      counter = 0;
      _ref3 = this.model.apisArray;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        resource = _ref3[_i];
        id = resource.name;
        while (typeof resources[id] !== 'undefined') {
          id = id + "_" + counter;
          counter += 1;
        }
        resource.id = id;
        resource.api_version = this.model.info.version;
        resources[id] = resource;
        this.addResource(resource, this.model.auths);
      }
      return this;
    };

    MainView.prototype.addResource = function(resource, auths) {
      var resourceView;
      resource.id = resource.id.replace(/\s/g, '_');
      resourceView = new ResourceView({
        model: resource,
        tagName: 'li',
        id: 'resource_' + resource.id,
        className: 'resource',
        auths: auths,
        swaggerOptions: this.options.swaggerOptions
      });
      return $('#resources').append(resourceView.render().el);
    };

    MainView.prototype.clear = function() {
      return $(this.el).html('');
    };

    return MainView;

  })(Backbone.View);

  ResourceView = (function(_super) {
    __extends(ResourceView, _super);

    function ResourceView() {
      _ref3 = ResourceView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    ResourceView.prototype.initialize = function(opts) {
      if (opts == null) {
        opts = {};
      }
      this.auths = opts.auths;
      if ("" === this.model.description) {
        return this.model.description = null;
      }
    };

    ResourceView.prototype.render = function() {
      var counter, id, methods, operation, _i, _len, _ref4;
      if (this.model.description) {
        this.model.summary = this.model.description;
      }
      $(this.el).html(Handlebars.templates.resource(this.model));
      methods = {};
      _ref4 = this.model.operationsArray;
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        operation = _ref4[_i];
        counter = 0;
        id = operation.nickname;
        while (typeof methods[id] !== 'undefined') {
          id = id + "_" + counter;
          counter += 1;
        }
        methods[id] = operation;
        operation.nickname = id;
        operation.parentId = this.model.id;
        operation.api_version = this.model.api_version;
        this.addOperation(operation);
      }
      $('.toggleEndpointList', this.el).click(this.callDocs.bind(this, 'toggleEndpointListForResource'));
      $('.collapseResource', this.el).click(this.callDocs.bind(this, 'collapseOperationsForResource'));
      $('.expandResource', this.el).click(this.callDocs.bind(this, 'expandOperationsForResource'));
      return this;
    };

    ResourceView.prototype.addOperation = function(operation) {
      var operationView;
      operation.number = this.number;
      operationView = new OperationView({
        model: operation,
        tagName: 'li',
        className: 'endpoint',
        swaggerOptions: this.options.swaggerOptions,
        auths: this.auths
      });
      $('.endpoints', $(this.el)).append(operationView.render().el);
      return this.number++;
    };

    ResourceView.prototype.callDocs = function(fnName, e) {
      e.preventDefault();
      return Docs[fnName](e.currentTarget.getAttribute('data-id'));
    };

    return ResourceView;

  })(Backbone.View);

  OperationView = (function(_super) {
    __extends(OperationView, _super);

    function OperationView() {
      _ref4 = OperationView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    OperationView.prototype.invocationUrl = null;

    OperationView.prototype.events = {
      'submit .sandbox': 'submitOperation',
      'click .submit': 'submitOperation',
      'click .response_hider': 'hideResponse',
      'click .toggleOperation': 'toggleOperationContent',
      'mouseenter .api-ic': 'mouseEnter',
      'mouseout .api-ic': 'mouseExit'
    };

    OperationView.prototype.initialize = function(opts) {
      if (opts == null) {
        opts = {};
      }
      this.auths = opts.auths;
      return this;
    };

    OperationView.prototype.mouseEnter = function(e) {
      var elem, hgh, pos, scMaxX, scMaxY, scX, scY, wd, x, y;
      elem = $(e.currentTarget.parentNode).find('#api_information_panel');
      x = e.pageX;
      y = e.pageY;
      scX = $(window).scrollLeft();
      scY = $(window).scrollTop();
      scMaxX = scX + $(window).width();
      scMaxY = scY + $(window).height();
      wd = elem.width();
      hgh = elem.height();
      if (x + wd > scMaxX) {
        x = scMaxX - wd;
      }
      if (x < scX) {
        x = scX;
      }
      if (y + hgh > scMaxY) {
        y = scMaxY - hgh;
      }
      if (y < scY) {
        y = scY;
      }
      pos = {};
      pos.top = y;
      pos.left = x;
      elem.css(pos);
      return $(e.currentTarget.parentNode).find('#api_information_panel').show();
    };

    OperationView.prototype.mouseExit = function(e) {
      return $(e.currentTarget.parentNode).find('#api_information_panel').hide();
    };

    OperationView.prototype.render = function() {
      var a, auth, auths, code, contentTypeModel, isMethodSubmissionSupported, k, key, o, param, ref, responseContentTypeView, responseSignatureView, schema, schemaObj, signatureModel, statusCode, type, v, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref10, _ref11, _ref5, _ref6, _ref7, _ref8, _ref9;
      isMethodSubmissionSupported = true;
      if (!isMethodSubmissionSupported) {
        this.model.isReadOnly = true;
      }
      this.model.description = this.model.description || this.model.notes;
      if (this.model.description) {
        this.model.description = marked(this.model.description);
      }
      this.model.oauth = null;
      if (this.model.authorizations) {
        if (Array.isArray(this.model.authorizations)) {
          _ref5 = this.model.authorizations;
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            auths = _ref5[_i];
            for (key in auths) {
              auth = auths[key];
              for (a in this.auths) {
                auth = this.auths[a];
                if (auth.type === 'oauth2') {
                  this.model.oauth = {};
                  this.model.oauth.scopes = [];
                  _ref6 = auth.value.scopes;
                  for (k in _ref6) {
                    v = _ref6[k];
                    o = {
                      scope: k,
                      description: v
                    };
                    this.model.oauth.scopes.push(o);
                  }
                }
              }
            }
          }
        } else {
          _ref7 = this.model.authorizations;
          for (k in _ref7) {
            v = _ref7[k];
            if (k === "oauth2") {
              if (this.model.oauth === null) {
                this.model.oauth = {};
              }
              if (this.model.oauth.scopes === void 0) {
                this.model.oauth.scopes = [];
              }
              for (_j = 0, _len1 = v.length; _j < _len1; _j++) {
                o = v[_j];
                this.model.oauth.scopes.push(o);
              }
            }
          }
        }
      }
      if (typeof this.model.responses !== 'undefined') {
        this.model.responseMessages = [];
        _ref8 = this.model.responses;
        for (code in _ref8) {
          value = _ref8[code];
          schema = null;
          schemaObj = this.model.responses[code].schema;
          if (schemaObj && schemaObj['$ref']) {
            schema = schemaObj['$ref'];
            if (schema.indexOf('#/definitions/') === 0) {
              schema = schema.substring('#/definitions/'.length);
            }
          }
          this.model.responseMessages.push({
            code: code,
            message: value.description,
            responseModel: schema
          });
        }
      }
      if (typeof this.model.responseMessages === 'undefined') {
        this.model.responseMessages = [];
      }
      $(this.el).html(Handlebars.templates.operation(this.model));
      if (this.model.responseClassSignature && this.model.responseClassSignature !== 'string') {
        signatureModel = {
          sampleJSON: this.model.responseSampleJSON,
          isParam: false,
          signature: this.model.responseClassSignature
        };
        responseSignatureView = new SignatureView({
          model: signatureModel,
          tagName: 'div'
        });
        $('.model-signature', $(this.el)).append(responseSignatureView.render().el);
      } else {
        this.model.responseClassSignature = 'string';
        $('.model-signature', $(this.el)).html(this.model.type);
      }
      contentTypeModel = {
        isParam: false
      };
      contentTypeModel.consumes = this.model.consumes;
      contentTypeModel.produces = this.model.produces;
      _ref9 = this.model.parameters;
      for (_k = 0, _len2 = _ref9.length; _k < _len2; _k++) {
        param = _ref9[_k];
        type = param.type || param.dataType;
        if (typeof type === 'undefined') {
          schema = param.schema;
          if (schema && schema['type'] === 'array') {
            schema = schema['items'];
          }
          if (schema && schema['$ref']) {
            ref = schema['$ref'];
            if (ref.indexOf('#/definitions/') === 0) {
              type = ref.substring('#/definitions/'.length);
            } else {
              type = ref;
            }
          }
        }
        if (type && type.toLowerCase() === 'file') {
          if (!contentTypeModel.consumes) {
            contentTypeModel.consumes = 'multipart/form-data';
          }
        }
        param.type = type;
      }
      responseContentTypeView = new ResponseContentTypeView({
        model: contentTypeModel
      });
      $('.response-content-type', $(this.el)).append(responseContentTypeView.render().el);
      _ref10 = this.model.parameters;
      for (_l = 0, _len3 = _ref10.length; _l < _len3; _l++) {
        param = _ref10[_l];
        this.addParameter(param, contentTypeModel.consumes);
      }
      _ref11 = this.model.responseMessages;
      for (_m = 0, _len4 = _ref11.length; _m < _len4; _m++) {
        statusCode = _ref11[_m];
        this.addStatusCode(statusCode);
      }
      return this;
    };

    OperationView.prototype.addParameter = function(param, consumes) {
      var paramView;
      param.consumes = consumes;
      paramView = new ParameterView({
        model: param,
        tagName: 'tr',
        readOnly: this.model.isReadOnly
      });
      return $('.operation-params', $(this.el)).append(paramView.render().el);
    };

    OperationView.prototype.addStatusCode = function(statusCode) {
      var statusCodeView;
      statusCodeView = new StatusCodeView({
        model: statusCode,
        tagName: 'tr'
      });
      return $('.operation-status', $(this.el)).append(statusCodeView.render().el);
    };

    OperationView.prototype.submitOperation = function(e) {
      var error_free, form, isFileUpload, map, o, opts, val, _i, _j, _k, _len, _len1, _len2, _ref5, _ref6, _ref7;
      if (e != null) {
        e.preventDefault();
      }
      form = $('.sandbox', $(this.el));
      error_free = true;
      form.find("input.required").each(function() {
        var _this = this;
        $(this).removeClass("error");
        if (jQuery.trim($(this).val()) === "") {
          $(this).addClass("error");
          $(this).wiggle({
            callback: function() {
              return $(_this).focus();
            }
          });
          return error_free = false;
        }
      });
      form.find("textarea.required").each(function() {
        var _this = this;
        $(this).removeClass("error");
        if (jQuery.trim($(this).val()) === "") {
          $(this).addClass("error");
          $(this).wiggle({
            callback: function() {
              return $(_this).focus();
            }
          });
          return error_free = false;
        }
      });
      if (error_free) {
        map = {};
        opts = {
          parent: this
        };
        isFileUpload = false;
        _ref5 = form.find("input");
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          o = _ref5[_i];
          val = o.value;
          if ((val != null) && jQuery.trim(val).length > 0) {
            map[o.name] = val;
          }
          if (o.type === "file") {
            isFileUpload = true;
          }
        }
        _ref6 = form.find("textarea");
        for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
          o = _ref6[_j];
          val = this.getTextAreaValue(o);
          if ((val != null) && jQuery.trim(val).length > 0) {
            map[o.name] = val;
          }
        }
        _ref7 = form.find("select");
        for (_k = 0, _len2 = _ref7.length; _k < _len2; _k++) {
          o = _ref7[_k];
          val = this.getSelectedValue(o);
          if ((val != null) && jQuery.trim(val).length > 0) {
            map[o.name] = val;
          }
        }
        opts.responseContentType = $("div select[name=responseContentType]", $(this.el)).val();
        opts.requestContentType = $("div select[name=parameterContentType]", $(this.el)).val();
        $(".response_throbber", $(this.el)).show();
        if (isFileUpload) {
          return this.handleFileUpload(map, form);
        } else {
          return this.model["do"](map, opts, this.showCompleteStatus, this.showErrorStatus, this);
        }
      }
    };

    OperationView.prototype.success = function(response, parent) {
      return parent.showCompleteStatus(response);
    };

    OperationView.prototype.handleFileUpload = function(map, form) {
      var bodyParam, el, headerParams, o, obj, param, params, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref5, _ref6, _ref7, _ref8,
        _this = this;
      _ref5 = form.serializeArray();
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        o = _ref5[_i];
        if ((o.value != null) && jQuery.trim(o.value).length > 0) {
          map[o.name] = o.value;
        }
      }
      bodyParam = new FormData();
      params = 0;
      _ref6 = this.model.parameters;
      for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
        param = _ref6[_j];
        if (param.paramType === 'form') {
          if (param.type.toLowerCase() !== 'file' && map[param.name] !== void 0) {
            bodyParam.append(param.name, map[param.name]);
          }
        }
      }
      headerParams = {};
      _ref7 = this.model.parameters;
      for (_k = 0, _len2 = _ref7.length; _k < _len2; _k++) {
        param = _ref7[_k];
        if (param.paramType === 'header') {
          headerParams[param.name] = map[param.name];
        }
      }
      _ref8 = form.find('input[type~="file"]');
      for (_l = 0, _len3 = _ref8.length; _l < _len3; _l++) {
        el = _ref8[_l];
        if (typeof el.files[0] !== 'undefined') {
          bodyParam.append($(el).attr('name'), el.files[0]);
          params += 1;
        }
      }
      this.invocationUrl = this.model.supportHeaderParams() ? (headerParams = this.model.getHeaderParams(map), this.model.urlify(map, false)) : this.model.urlify(map, true);
      $(".request_url", $(this.el)).html("<pre></pre>");
      $(".request_url pre", $(this.el)).text(this.invocationUrl);
      obj = {
        type: this.model.method,
        url: this.invocationUrl,
        headers: headerParams,
        data: bodyParam,
        dataType: 'json',
        contentType: false,
        processData: false,
        error: function(data, textStatus, error) {
          return _this.showErrorStatus(_this.wrap(data), _this);
        },
        success: function(data) {
          return _this.showResponse(data, _this);
        },
        complete: function(data) {
          return _this.showCompleteStatus(_this.wrap(data), _this);
        }
      };
      if (window.authorizations) {
        window.authorizations.apply(obj);
      }
      if (params === 0) {
        obj.data.append("fake", "true");
      }
      jQuery.ajax(obj);
      return false;
    };

    OperationView.prototype.wrap = function(data) {
      var h, headerArray, headers, i, o, _i, _len;
      headers = {};
      headerArray = data.getAllResponseHeaders().split("\r");
      for (_i = 0, _len = headerArray.length; _i < _len; _i++) {
        i = headerArray[_i];
        h = i.split(':');
        if (h[0] !== void 0 && h[1] !== void 0) {
          headers[h[0].trim()] = h[1].trim();
        }
      }
      o = {};
      o.content = {};
      o.content.data = data.responseText;
      o.headers = headers;
      o.request = {};
      o.request.url = this.invocationUrl;
      o.status = data.status;
      return o;
    };

    OperationView.prototype.getTextAreaValue = function(textArea) {
      var i, param, parsed, result, _i, _len;
      if (textArea.value === null || jQuery.trim(textArea.value).length === 0) {
        return null;
      }
      param = this.getParamByName(textArea.name);
      if (param && param.type && param.type.toLowerCase() === 'array') {
        parsed = textArea.value.split('\n');
        result = [];
        for (_i = 0, _len = parsed.length; _i < _len; _i++) {
          i = parsed[_i];
          if ((i != null) && jQuery.trim(i).length > 0) {
            result.push(i);
          }
        }
        if (result.length > 0) {
          return result;
        } else {
          return null;
        }
      } else {
        return textArea.value;
      }
    };

    OperationView.prototype.getParamByName = function(name) {
      var i, _i, _len, _ref5;
      if (this.model.parameters) {
        _ref5 = this.model.parameters;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          i = _ref5[_i];
          if (i.name === name) {
            return i;
          }
        }
      }
      return null;
    };

    OperationView.prototype.getSelectedValue = function(select) {
      var opt, options, _i, _len, _ref5;
      if (!select.multiple) {
        return select.value;
      } else {
        options = [];
        _ref5 = select.options;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          opt = _ref5[_i];
          if (opt.selected) {
            options.push(opt.value);
          }
        }
        if (options.length > 0) {
          return options;
        } else {
          return null;
        }
      }
    };

    OperationView.prototype.hideResponse = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      $(".response", $(this.el)).slideUp();
      return $(".response_hider", $(this.el)).fadeOut();
    };

    OperationView.prototype.showResponse = function(response) {
      var prettyJson;
      prettyJson = JSON.stringify(response, null, "\t").replace(/\n/g, "<br>");
      return $(".response_body", $(this.el)).html(escape(prettyJson));
    };

    OperationView.prototype.showErrorStatus = function(data, parent) {
      return parent.showStatus(data);
    };

    OperationView.prototype.showCompleteStatus = function(data, parent) {
      return parent.showStatus(data);
    };

    OperationView.prototype.formatXml = function(xml) {
      var contexp, formatted, indent, lastType, lines, ln, pad, reg, transitions, wsexp, _fn, _i, _len;
      reg = /(>)(<)(\/*)/g;
      wsexp = /[ ]*(.*)[ ]+\n/g;
      contexp = /(<.+>)(.+\n)/g;
      xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
      pad = 0;
      formatted = '';
      lines = xml.split('\n');
      indent = 0;
      lastType = 'other';
      transitions = {
        'single->single': 0,
        'single->closing': -1,
        'single->opening': 0,
        'single->other': 0,
        'closing->single': 0,
        'closing->closing': -1,
        'closing->opening': 0,
        'closing->other': 0,
        'opening->single': 1,
        'opening->closing': 0,
        'opening->opening': 1,
        'opening->other': 1,
        'other->single': 0,
        'other->closing': -1,
        'other->opening': 0,
        'other->other': 0
      };
      _fn = function(ln) {
        var fromTo, j, key, padding, type, types, value;
        types = {
          single: Boolean(ln.match(/<.+\/>/)),
          closing: Boolean(ln.match(/<\/.+>/)),
          opening: Boolean(ln.match(/<[^!?].*>/))
        };
        type = ((function() {
          var _results;
          _results = [];
          for (key in types) {
            value = types[key];
            if (value) {
              _results.push(key);
            }
          }
          return _results;
        })())[0];
        type = type === void 0 ? 'other' : type;
        fromTo = lastType + '->' + type;
        lastType = type;
        padding = '';
        indent += transitions[fromTo];
        padding = ((function() {
          var _j, _ref5, _results;
          _results = [];
          for (j = _j = 0, _ref5 = indent; 0 <= _ref5 ? _j < _ref5 : _j > _ref5; j = 0 <= _ref5 ? ++_j : --_j) {
            _results.push('  ');
          }
          return _results;
        })()).join('');
        if (fromTo === 'opening->closing') {
          return formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
        } else {
          return formatted += padding + ln + '\n';
        }
      };
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        ln = lines[_i];
        _fn(ln);
      }
      return formatted;
    };

    OperationView.prototype.showStatus = function(response) {
      var code, content, contentType, e, headers, json, opts, pre, response_body, response_body_el, url;
      if (response.content === void 0) {
        content = response.data;
        url = response.url;
      } else {
        content = response.content.data;
        url = response.request.url;
      }
      headers = response.headers;
      contentType = null;
      if (headers) {
        contentType = headers["Content-Type"] || headers["content-type"];
        if (contentType) {
          contentType = contentType.split(";")[0].trim();
        }
      }
      if (!content) {
        code = $('<code />').text("no content");
        pre = $('<pre class="json" />').append(code);
      } else if (contentType === "application/json" || /\+json$/.test(contentType)) {
        json = null;
        try {
          json = JSON.stringify(JSON.parse(content), null, "  ");
        } catch (_error) {
          e = _error;
          json = "can't parse JSON.  Raw result:\n\n" + content;
        }
        code = $('<code />').text(json);
        pre = $('<pre class="json" />').append(code);
      } else if (contentType === "application/xml" || /\+xml$/.test(contentType)) {
        code = $('<code />').text(this.formatXml(content));
        pre = $('<pre class="xml" />').append(code);
      } else if (contentType === "text/html") {
        code = $('<code />').html(_.escape(content));
        pre = $('<pre class="xml" />').append(code);
      } else if (/^image\//.test(contentType)) {
        if (content instanceof Blob && (content.type.indexOf('image/') === 0)) {
          pre = $('<img>').attr('src', URL.createObjectURL(content));
        } else {
          pre = $('<code />').text("Received " + content.length + " bytes of " + contentType + " data.");
        }
      } else {
        code = $('<code />').text(content);
        pre = $('<pre class="json" />').append(code);
      }
      response_body = pre;
      $(".request_url", $(this.el)).html("<pre></pre>");
      $(".request_url pre", $(this.el)).text(url);
      $(".response_code", $(this.el)).html("<pre>" + response.status + "</pre>");
      $(".response_body", $(this.el)).html(response_body);
      $(".response_headers", $(this.el)).html("<pre>" + _.escape(JSON.stringify(response.headers, null, "  ")).replace(/\n/g, "<br>") + "</pre>");
      $(".response", $(this.el)).slideDown();
      $(".response_hider", $(this.el)).show();
      $(".response_throbber", $(this.el)).hide();
      response_body_el = $('.response_body', $(this.el))[0];
      opts = this.options.swaggerOptions;
      if (opts.highlightSizeThreshold && response.data.length > opts.highlightSizeThreshold) {
        return response_body_el;
      } else {
        return hljs.highlightBlock(response_body_el);
      }
    };

    OperationView.prototype.toggleOperationContent = function() {
      var elem;
      elem = $('#' + Docs.escapeResourceName(this.model.parentId + "_" + this.model.nickname + "_content"));
      if (elem.is(':visible')) {
        return Docs.collapseOperation(elem);
      } else {
        return Docs.expandOperation(elem);
      }
    };

    return OperationView;

  })(Backbone.View);

  StatusCodeView = (function(_super) {
    __extends(StatusCodeView, _super);

    function StatusCodeView() {
      _ref5 = StatusCodeView.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    StatusCodeView.prototype.initialize = function() {};

    StatusCodeView.prototype.render = function() {
      var responseModel, responseModelView, template;
      template = this.template();
      $(this.el).html(template(this.model));
      if (swaggerUi.api.models.hasOwnProperty(this.model.responseModel)) {
        responseModel = {
          sampleJSON: JSON.stringify(swaggerUi.api.models[this.model.responseModel].createJSONSample(), null, 2),
          isParam: false,
          signature: swaggerUi.api.models[this.model.responseModel].getMockSignature()
        };
        responseModelView = new SignatureView({
          model: responseModel,
          tagName: 'div'
        });
        $('.model-signature', this.$el).append(responseModelView.render().el);
      } else {
        $('.model-signature', this.$el).html('');
      }
      return this;
    };

    StatusCodeView.prototype.template = function() {
      return Handlebars.templates.status_code;
    };

    return StatusCodeView;

  })(Backbone.View);

  ParameterView = (function(_super) {
    __extends(ParameterView, _super);

    function ParameterView() {
      _ref6 = ParameterView.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    ParameterView.prototype.initialize = function() {
      Handlebars.registerHelper('isArray', function(param, opts) {
        if (param.type.toLowerCase() === 'array' || param.allowMultiple) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      });
      return initHandlebarsRegisterHelper();
    };

    ParameterView.prototype.render = function() {
      var contentTypeModel, isParam, parameterContentTypeView, ref, responseContentTypeView, schema, signatureModel, signatureView, template, type;
      type = this.model.type || this.model.dataType;
      if (typeof type === 'undefined') {
        schema = this.model.schema;
        if (schema && schema['$ref']) {
          ref = schema['$ref'];
          if (ref.indexOf('#/definitions/') === 0) {
            type = ref.substring('#/definitions/'.length);
          } else {
            type = ref;
          }
        }
      }
      this.model.type = type;
      this.model.paramType = this.model["in"] || this.model.paramType;
      if (this.model.paramType === 'body') {
        this.model.isBody = true;
      }
      if (type && type.toLowerCase() === 'file') {
        this.model.isFile = true;
      }
      this.model["default"] = this.model["default"] || this.model.defaultValue;
      if (this.model.allowableValues) {
        this.model.isList = true;
      }
      template = this.template();
      $(this.el).html(template(this.model));
      signatureModel = {
        sampleJSON: this.model.sampleJSON,
        isParam: true,
        signature: this.model.signature
      };
      if (this.model.sampleJSON) {
        signatureView = new SignatureView({
          model: signatureModel,
          tagName: 'div'
        });
        $('.model-signature', $(this.el)).append(signatureView.render().el);
      } else {
        $('.model-signature', $(this.el)).html(this.model.signature);
      }
      isParam = false;
      if (this.model.isBody) {
        isParam = true;
      }
      contentTypeModel = {
        isParam: isParam
      };
      contentTypeModel.consumes = this.model.consumes;
      if (isParam) {
        parameterContentTypeView = new ParameterContentTypeView({
          model: contentTypeModel
        });
        $('.parameter-content-type', $(this.el)).append(parameterContentTypeView.render().el);
      } else {
        responseContentTypeView = new ResponseContentTypeView({
          model: contentTypeModel
        });
        $('.response-content-type', $(this.el)).append(responseContentTypeView.render().el);
      }
      return this;
    };

    ParameterView.prototype.template = function() {
      if (this.model.isList) {
        return Handlebars.templates.param_list;
      } else {
        if (this.options.readOnly) {
          if (this.model.required) {
            return Handlebars.templates.param_readonly_required;
          } else {
            return Handlebars.templates.param_readonly;
          }
        } else {
          if (this.model.required) {
            return Handlebars.templates.param_required;
          } else {
            return Handlebars.templates.param;
          }
        }
      }
    };

    return ParameterView;

  })(Backbone.View);

  SignatureView = (function(_super) {
    __extends(SignatureView, _super);

    function SignatureView() {
      _ref7 = SignatureView.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    SignatureView.prototype.events = {
      'click a.description-link': 'switchToDescription',
      'click a.snippet-link': 'switchToSnippet',
      'mousedown .snippet': 'snippetToTextArea'
    };

    SignatureView.prototype.initialize = function() {};

    SignatureView.prototype.render = function() {
      var template;
      template = this.template();
      $(this.el).html(template(this.model));
      this.switchToSnippet();
      this.isParam = this.model.isParam;
      if (this.isParam) {
        $('.notice', $(this.el)).text('Click to set as parameter value');
      }
      return this;
    };

    SignatureView.prototype.template = function() {
      return Handlebars.templates.signature;
    };

    SignatureView.prototype.switchToDescription = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      $(".snippet", $(this.el)).hide();
      $(".description", $(this.el)).show();
      $('.description-link', $(this.el)).addClass('selected');
      return $('.snippet-link', $(this.el)).removeClass('selected');
    };

    SignatureView.prototype.switchToSnippet = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      $(".description", $(this.el)).hide();
      $(".snippet", $(this.el)).show();
      $('.snippet-link', $(this.el)).addClass('selected');
      return $('.description-link', $(this.el)).removeClass('selected');
    };

    SignatureView.prototype.snippetToTextArea = function(e) {
      var textArea;
      if (this.isParam) {
        if (e != null) {
          e.preventDefault();
        }
        textArea = $('textarea', $(this.el.parentNode.parentNode.parentNode));
        if ($.trim(textArea.val()) === '') {
          return textArea.val(this.model.sampleJSON);
        }
      }
    };

    return SignatureView;

  })(Backbone.View);

  ContentTypeView = (function(_super) {
    __extends(ContentTypeView, _super);

    function ContentTypeView() {
      _ref8 = ContentTypeView.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    ContentTypeView.prototype.initialize = function() {};

    ContentTypeView.prototype.render = function() {
      var template;
      template = this.template();
      $(this.el).html(template(this.model));
      $('label[for=contentType]', $(this.el)).text('Response Content Type');
      return this;
    };

    ContentTypeView.prototype.template = function() {
      return Handlebars.templates.content_type;
    };

    return ContentTypeView;

  })(Backbone.View);

  ResponseContentTypeView = (function(_super) {
    __extends(ResponseContentTypeView, _super);

    function ResponseContentTypeView() {
      _ref9 = ResponseContentTypeView.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    ResponseContentTypeView.prototype.initialize = function() {};

    ResponseContentTypeView.prototype.render = function() {
      var template;
      template = this.template();
      $(this.el).html(template(this.model));
      $('label[for=responseContentType]', $(this.el)).text('Response Content Type');
      return this;
    };

    ResponseContentTypeView.prototype.template = function() {
      return Handlebars.templates.response_content_type;
    };

    return ResponseContentTypeView;

  })(Backbone.View);

  ParameterContentTypeView = (function(_super) {
    __extends(ParameterContentTypeView, _super);

    function ParameterContentTypeView() {
      _ref10 = ParameterContentTypeView.__super__.constructor.apply(this, arguments);
      return _ref10;
    }

    ParameterContentTypeView.prototype.initialize = function() {};

    ParameterContentTypeView.prototype.render = function() {
      var template;
      template = this.template();
      $(this.el).html(template(this.model));
      $('label[for=parameterContentType]', $(this.el)).text('Parameter content type:');
      return this;
    };

    ParameterContentTypeView.prototype.template = function() {
      return Handlebars.templates.parameter_content_type;
    };

    return ParameterContentTypeView;

  })(Backbone.View);

  ApiKeyButton = (function(_super) {
    __extends(ApiKeyButton, _super);

    function ApiKeyButton() {
      _ref11 = ApiKeyButton.__super__.constructor.apply(this, arguments);
      return _ref11;
    }

    ApiKeyButton.prototype.initialize = function() {};

    ApiKeyButton.prototype.render = function() {
      var template;
      template = this.template();
      $(this.el).html(template(this.model));
      return this;
    };

    ApiKeyButton.prototype.events = {
      "click #apikey_button": "toggleApiKeyContainer",
      "click #apply_api_key": "applyApiKey"
    };

    ApiKeyButton.prototype.applyApiKey = function() {
      var elem;
      window.authorizations.add(this.model.name, new ApiKeyAuthorization(this.model.name, $("#input_apiKey_entry").val(), this.model["in"]));
      window.swaggerUi.load();
      return elem = $('#apikey_container').show();
    };

    ApiKeyButton.prototype.toggleApiKeyContainer = function() {
      var elem;
      if ($('#apikey_container').length > 0) {
        elem = $('#apikey_container').first();
        if (elem.is(':visible')) {
          return elem.hide();
        } else {
          $('.auth_container').hide();
          return elem.show();
        }
      }
    };

    ApiKeyButton.prototype.template = function() {
      return Handlebars.templates.apikey_button_view;
    };

    return ApiKeyButton;

  })(Backbone.View);

  BasicAuthButton = (function(_super) {
    __extends(BasicAuthButton, _super);

    function BasicAuthButton() {
      _ref12 = BasicAuthButton.__super__.constructor.apply(this, arguments);
      return _ref12;
    }

    BasicAuthButton.prototype.initialize = function() {};

    BasicAuthButton.prototype.render = function() {
      var template;
      template = this.template();
      $(this.el).html(template(this.model));
      return this;
    };

    BasicAuthButton.prototype.events = {
      "click #basic_auth_button": "togglePasswordContainer",
      "click #apply_basic_auth": "applyPassword"
    };

    BasicAuthButton.prototype.applyPassword = function() {
      var elem, password, username;
      console.log("applying password");
      username = $(".input_username").val();
      password = $(".input_password").val();
      window.authorizations.add(this.model.type, new PasswordAuthorization("basic", username, password));
      window.swaggerUi.load();
      return elem = $('#basic_auth_container').hide();
    };

    BasicAuthButton.prototype.togglePasswordContainer = function() {
      var elem;
      if ($('#basic_auth_container').length > 0) {
        elem = $('#basic_auth_container').show();
        if (elem.is(':visible')) {
          return elem.slideUp();
        } else {
          $('.auth_container').hide();
          return elem.show();
        }
      }
    };

    BasicAuthButton.prototype.template = function() {
      return Handlebars.templates.basic_auth_button_view;
    };

    return BasicAuthButton;

  })(Backbone.View);

}).call(this);
