// Generated by CoffeeScript 1.8.0
(function() {
  define(['aloha', 'aloha/plugin', 'jquery', 'aloha/ephemera', 'ui/ui', 'ui/button', 'semanticblock/semanticblock-plugin', 'css!example/css/example-plugin.css'], function(Aloha, Plugin, jQuery, Ephemera, UI, Button, semanticBlock) {
    var TYPE_CONTAINER, exampleishClasses, types;
    TYPE_CONTAINER = jQuery('<span class="type-container dropdown aloha-ephemera">\n    <span class="type-dropdown btn-link" data-toggle="dropdown"><span class="caret"></span><span class="type"></span></span>\n    <ul class="dropdown-menu">\n    </ul>\n</span>');
    exampleishClasses = {};
    types = [];
    return Plugin.create('example', {
      defaults: [
        {
          label: 'Activity',
          typeClass: 'example',
          hasTitle: true,
          dataClass: 'activity'
        }, {
          label: 'Practical',
          typeClass: 'example',
          hasTitle: true,
          dataClass: 'practical'
        }, {
          label: 'Demonstration',
          typeClass: 'example',
          hasTitle: true,
          dataClass: 'demonstration'
        }, {
          label: 'Example',
          typeClass: 'example',
          hasTitle: true
        }, {
          label: 'Case in point',
          typeClass: 'example',
          hasTitle: true,
          dataClass: 'case-in-point'
        }, {
          label: 'Case study',
          typeClass: 'example',
          hasTitle: true,
          dataClass: 'case-study'
        }, {
          label: 'Illustration',
          typeClass: 'example',
          hasTitle: true,
          dataClass: 'illustration'
        }
      ],
      getLabel: function($element) {
        var type, _i, _len;
        for (_i = 0, _len = types.length; _i < _len; _i++) {
          type = types[_i];
          if ($element.is(type.selector)) {
            return type.label;
          }
        }
      },
      activate: function($element) {
        var $body, $title, label;
        $title = $element.children('.title');
        $title.attr('hover-placeholder', 'Add a title (optional)');
        $title.aloha();
        label = 'Exercise';
        $body = $element.contents().not($title);
        if (types.enableTypes) {
          jQuery.each(types, (function(_this) {
            return function(i, type) {
              var typeContainer;
              if ($element.is(type.selector)) {
                label = type.label;
                typeContainer = TYPE_CONTAINER.clone();
                if (types.length > 1) {
                  jQuery.each(types, function(i, dropType) {
                    var $option;
                    $option = jQuery('<li><a href="#"></a></li>');
                    $option.appendTo(typeContainer.find('.dropdown-menu'));
                    $option = $option.children('a');
                    $option.text(dropType.label);
                    typeContainer.find('.type-dropdown').on('click', function() {
                      return jQuery.each(types, function(i, dropType) {
                        if ($element.attr('data-label') === dropType.dataClass) {
                          return typeContainer.find('.dropdown-menu li').each(function(i, li) {
                            jQuery(li).removeClass('checked');
                            if (jQuery(li).children('a').text() === dropType.label) {
                              return jQuery(li).addClass('checked');
                            }
                          });
                        }
                      });
                    });
                    return $option.on('click', function(e) {
                      var $newTitle, key;
                      e.preventDefault();
                      if (dropType.hasTitle) {
                        if (!$element.children('.title')[0]) {
                          $newTitle = jQuery("<" + (dropType.titleTagName || 'span') + " class='title'></" + (dropType.titleTagName || 'span'));
                          $element.append($newTitle);
                          $newTitle.aloha();
                        }
                      } else {
                        $element.children('.title').remove();
                      }
                      typeContainer.find('.type').text(dropType.label);
                      if (dropType.dataClass) {
                        $element.attr('data-label', dropType.dataClass);
                      } else {
                        $element.removeAttr('data-label');
                      }
                      for (key in exampleishClasses) {
                        $element.removeClass(key);
                      }
                      return $element.addClass(dropType.typeClass);
                    });
                  });
                } else {
                  typeContainer.find('.dropdown-menu').remove();
                  typeContainer.find('.type').removeAttr('data-toggle');
                }
                typeContainer.find('.type').text(type.label);
                return typeContainer.prependTo($element);
              }
            };
          })(this));
        }
        return jQuery('<div>').addClass('body').addClass('aloha-block-dropzone').attr('placeholder', "Type the text of your " + (label.toLowerCase()) + " here.").appendTo($element).aloha().append($body);
      },
      deactivate: function($element) {
        var $body, $title, $titleElement, hasTextChildren, hasTitle, isEmpty, titleTag;
        $body = $element.children('.body');
        hasTextChildren = $body.children().length !== $body.contents().length;
        isEmpty = $body.text().trim() === '';
        if (isEmpty) {
          $body = jQuery('<p class="para"></p>');
        } else {
          $body = $body.contents();
          if (hasTextChildren) {
            $body = $body.wrap('<p></p>').parent();
          }
        }
        $element.children('.body').remove();
        hasTitle = void 0;
        titleTag = 'span';
        jQuery.each(types, (function(_this) {
          return function(i, type) {
            if ($element.is(type.selector)) {
              hasTitle = type.hasTitle || false;
              return titleTag = type.titleTagName || titleTag;
            }
          };
        })(this));
        if (hasTitle || hasTitle === void 0) {
          $titleElement = $element.children('.title');
          $title = jQuery("<" + titleTag + " class=\"title\"></" + titleTag + ">");
          if ($titleElement.length) {
            $title.append($titleElement.contents());
            $titleElement.remove();
          }
          $title.prependTo($element);
        }
        return $element.append($body);
      },
      selector: '.example',
      init: function() {
        types = this.settings;
        jQuery.each(types, (function(_this) {
          return function(i, type) {
            var className, hasTitle, label, newTemplate, tagName, titleTagName, typeName;
            className = type.typeClass || (function() {
              throw 'BUG Invalid configuration of example plugin. typeClass required!';
            })();
            typeName = type.dataClass;
            hasTitle = !!type.hasTitle;
            label = type.label || (function() {
              throw 'BUG Invalid configuration of example plugin. label required!';
            })();
            tagName = type.tagName || 'div';
            titleTagName = type.titleTagName || 'div';
            if (typeName) {
              type.selector = "." + className + "[data-label='" + typeName + "']";
            } else {
              type.selector = "." + className + ':not([data-label])';
            }
            exampleishClasses[className] = true;
            newTemplate = jQuery("<" + tagName + "></" + tagName);
            newTemplate.addClass(className);
            if (typeName) {
              newTemplate.attr('data-label', typeName);
            }
            if (hasTitle) {
              newTemplate.append("<" + titleTagName + " class='title'></" + titleTagName);
            }
            UI.adopt("insert-" + className + typeName, Button, {
              click: function() {
                return semanticBlock.insertAtCursor(newTemplate.clone());
              }
            });
            if ('example' === className && !typeName) {
              return UI.adopt("insertExample", Button, {
                click: function() {
                  return semanticBlock.insertAtCursor(newTemplate.clone());
                }
              });
            }
          };
        })(this));
        return semanticBlock.register(this);
      }
    });
  });

}).call(this);