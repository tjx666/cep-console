var __log, __error, __result;
var __sel, __doc;

(function () {
    var isNotAiDomGroup = function (DOM) {
        if ($._ADBE_LIBS_AEFT) return true;

        if ('' + DOM === DOM) {
            return true;
        }
        if (!DOM) {
            return true;
        }
        var string, property, a, c;
        a = ['length', 'parent', 'length', 'typename'];
        string = '';
        c = 0;
        for (property in DOM) {
            string += property;
            if (a[c] && a[c] !== property) {
                a = c = property = string = null;
                return true;
            }
            if (string === 'lengthparentlengthtypename') {
                a = c = property = string = null;
                return false;
            }
            c++;
        }
        a = c = property = string = null;
        return true;
    };
    const ARRAY_SPLIT = ';;@;\u0800;:@#;';
    var log;
    if (new ExternalObject('lib:PlugPlugExternalObject')) {
        $.dispatch = function (in_eventType, in_message) {
            var eventObj = new CSXSEvent();
            eventObj.type = in_eventType;
            eventObj.data = '' + in_message;
            eventObj.dispatch();
        };

        log = function (message, style, __class, elementType, consoleID, defaultElementType) {
            style = style || '';
            __class = __class || '';
            elementType = elementType || defaultElementType || '';
            consoleID = consoleID || '';
            if (
                message &&
                isNotAiDomGroup(message) &&
                (message.constructor === Object || message.constructor === Array)
            ) {
                message = message.toSource();
            }
            $.dispatch(
                'com.creative-scripts.console.__log',
                [message, style, __class, elementType, consoleID].join(ARRAY_SPLIT)
            );
        };
        $.write = function (message, style, __class, elementType, consoleID) {
            log(message, style, __class, elementType, consoleID, 'span');
        };
        $.writeln = function (message, style, __class, elementType, consoleID) {
            log(message, style, __class, elementType, consoleID, '');
        };

        __log = function (message, style, __class, elementType, consoleID) {
            if (__log.off) {
                return;
            }
            log(message, style, __class, elementType, consoleID, '');
        };

        __error = function (message, style) {
            $.writeln(message, style, 'error');
        };
        __result = function (error, result, stderr) {
            if (error !== undefined) {
                if (isNotAiDomGroup(error) && (error.constructor === Object || error.constructor === Array)) {
                    error = error.toSource();
                }
                __error('Error: ' + error);
            }
            if (stderr !== undefined) {
                if (isNotAiDomGroup(stderr) && (stderr.constructor === Object || stderr.constructor === Array)) {
                    stderr = stderr.toSource();
                }
                __error('Stderr: ' + stderr);
            }
            if (result !== undefined) {
                if (isNotAiDomGroup(result) && (result.constructor === Object || result.constructor === Array)) {
                    result = result.toSource();
                }
                $.writeln('Result: ' + result);
            }
        };

        ////////////////////////////////////////////////////////////////////////////////////////
        // Returns the whole Enumeration and Enumerator and not just the Enumerator           //
        // i.e. AutoEnum.AUTO_VALUE and not just AUTO_VALUE                                   //
        // By Trevor http://creative-scripts.com                                              //
        // With help from Dirk Becker http://www.ixta.com/scripts/utilities/enumToSource.html //
        // See https://forums.adobe.com/message/8906558#8906558                               //
        // Made 28th July 2016   Modified Jan 11 2018                                         //
        ////////////////////////////////////////////////////////////////////////////////////////

        $.getEnum =
            app.name === 'Adobe InDesign'
                ? function (_enum, prop) {
                      var dic, _Class, n, l, en, reflection, key, defaults, nones;
                      // A lot of enums have the None value 1852796517 which makes the output a big mess
                      // As we know the argument name we can produce something more aesthetic than a large list for every NONE
                      // Same applies for 1147563124 DEFAULT_VALUE
                      // As new DEFAULT_VALUE and NONE enums are added to the DOM they will need to be manually added here.
                      defaults = {
                          // 1147563124
                          localDisplaySetting: 'DisplaySettingOptions.DEFAULT_VALUE',
                          flattenerOverride: 'SpreadFlattenerLevel.DEFAULT_VALUE',
                          blendingSpace: 'BlendingSpace.DEFAULT_VALUE',
                          pageBinding: 'PageBindingOptions.DEFAULT_VALUE',
                          vector: 'TagVector.DEFAULT_VALUE',
                          raster: 'TagRaster.DEFAULT_VALUE',
                          crd: 'ColorRenderingDictionary.DEFAULT_VALUE',
                          screening: 'Screeening.DEFAULT_VALUE',
                          open: 'OpenOptions.DEFAULT_VALUE',
                          move: 'BindingOptions.DEFAULT_VALUE',
                          pdfMarkType: 'MarkTypes.DEFAULT_VALUE',
                          pdfPageLayout: 'PageLayoutOptions.DEFAULT_VALUE',
                          transparency: 'TagTransparency.DEFAULT_VALUE',
                          pdfMagnification: 'PdfMagnificationOptions.DEFAULT_VALUE',
                          otfFigureStyle: 'OTFFigureStyle.DEFAULT_VALUE',
                      };
                      nones = {
                          // 1852796517
                          preview: 'PreviewTypes.NONE',
                          fontEmbedding: 'FontEmbedding.NONE',
                          currentTool: 'UITools.NONE',
                          clippingType: 'ClippingPathType.NONE',
                          colorBitmapCompression: 'BitmapCompression.NONE',
                          grayscaleBitmapCompression: 'BitmapCompression.NONE',
                          monochromeBitmapCompression: 'MonoBitmapCompression.NONE',
                          colorBitmapSampling: 'Sampling.NONE',
                          grayscaleBitmapSampling: 'Sampling.NONE',
                          monochromeBitmapSampling: 'Sampling.NONE',
                          resamplingType: 'Sampling.NONE',
                          standardsCompliance: 'PDFXStandards.NONE',
                          pageTransitionOverride: 'PageTransitionOverrideOptions.NONE',
                          fittingOnEmptyFrame: 'EmptyFrameFittingOptions.NONE',
                          topLeftCornerOption: 'CornerOptions.NONE',
                          topRightCornerOption: 'CornerOptions.NONE',
                          bottomLeftCornerOption: 'CornerOptions.NONE',
                          bottomRightCornerOption: 'CornerOptions.NONE',
                          strokeCornerAdjustment: 'StrokeCornerAdjustment.NONE',
                          leftLineEnd: 'ArrowHead.NONE',
                          rightLineEnd: 'ArrowHead.NONE',
                          textWrapMode: 'TextWrapModes.NONE',
                          glyphForm: 'AlternateGlyphForms.NONE',
                          kentenKind: 'KentenCharacter.NONE',
                          rubyParentOverhangAmount: 'RubyOverhang.NONE',
                          kinsokuHangType: 'KinsokuHangTypes.NONE',
                          gridAlignment: 'GridAlignment.NONE',
                          exportUntaggedTablesFormat: 'XMLExportUntaggedTablesFormat.NONE',
                          positionalForm: 'PositionalForms.NONE',
                          changeCase: 'ChangeCaseOptions.NONE',
                          mode: 'ShadowMode.NONE, FeatherMode.NONE',
                          flattenerOverride: 'SpreadFlattenerLevel.NONE',
                          followShapeMode: 'FollowShapeModeOptions.NONE',
                          pageNumberPosition: 'PageNumberPosition.NONE',
                          convertPageBreaks: 'ConvertPageBreaks.NONE',
                          highlight: 'HyperlinkAppearanceHighlight.NONE',
                          moviePosterType: 'MoviePosterTypes.NONE',
                          soundPosterType: 'SoundPosterTypes.NONE',
                          toolTips: 'ToolTipOptions.NONE',
                          flipItem: 'Flip.NONE',
                          flip: 'Flip.NONE',
                          absoluteFlip: 'Flip.NONE',
                          fontDownloading: 'FontDownloading.NONE',
                          sendImageData: 'ImageDataTypes.NONE',
                          markingForAddedText: 'ChangeMarkings.NONE',
                          markingForDeletedText: 'ChangeMarkings.NONE',
                          markingForMovedText: 'ChangeMarkings.NONE',
                          lockState: 'LockStateValues.NONE',
                          pageTransitionType: 'PageTransitionTypeOptions.NONE',
                          epubCover: 'EpubCover.NONE',
                          cssExportOption: 'StyleSheetExportOption.NONE',
                          characterCountLocation: 'CharacterCountLocation.NONE',
                      };
                      if ($.enumDataBase && _enum) {
                          if (_enum === 1852796517 && nones[prop]) {
                              // NONE
                              return [nones[prop]];
                          } else if (_enum === 1147563124 && defaults[prop]) {
                              // DEFAULT_VALUE
                              return [defaults[prop]];
                          } else {
                              return $.enumDataBase[+_enum] || [_enum && _enum.toString()];
                          }
                      }
                      $.enumDataBase = {};
                      dic = $.dictionary.getClasses();
                      for (_Class in dic) {
                          en = dic[_Class];
                          if (!$.global[en] || $.global[en].constructor.name !== 'Enumeration') continue;
                          reflection = $.global[en].reflect.properties;
                          l = reflection.length - 1;
                          for (n = 0; n < l; n++) {
                              key = +$.global[en][reflection[n]];
                              if ($.enumDataBase[key]) {
                                  $.enumDataBase[key].push(en + '.' + reflection[n]);
                              } else {
                                  $.enumDataBase[key] = [en + '.' + reflection[n]];
                              }
                          }
                      }
                      return $.enumDataBase[_enum] || [];
                  }
                : function () {
                      return [];
                  };

        $.getEnum();

        /**
         * [props] Lists the properties of a given target
         * If no target is given then the selection of application is used as the target
         * target can be provided in the form
         * $.props(app.activeDocument.layers[0]) or $.props(app.selection.layer) or $.props(['layer']) // Illustrator example
         * $.props(['textPath','selectedPathPoints',0]) // NOTE THE [BRACKETS] produces:
                anchor: [205,-1077]
                leftDirection: [205,-1077]
                rightDirection: [205,-1077]
                pointType: PointType.CORNER
                selected: PathPointSelection.ANCHORPOINT
                typename: "PathPoint"
                parent: [PathItem ]
         * One can filter results $.props(['textPath','selectedPathPoints',0], 'anchor', 'leftDirection', 'rightDirection'); produces the filtered:
                anchor: [205,-1077]
                leftDirection: [205,-1077]
                rightDirection: [205,-1077]
         * On InDesign the enums are given in the form topRightCornerOption: 1852796517 /* CornerOptions.NONE */
        /* @return {object} {properties: results.join('\n'), errors: errors.join('\n')}; */
        $.props = function () {
            var arg,
                n,
                l,
                props,
                methods,
                errors,
                results,
                prop,
                target,
                selTarget,
                getProp,
                propString,
                error,
                level,
                notAiCollection;
            props = [];
            errors = [];
            results = [];
            l = arguments.length;
            level = $.level;
            // ?????? debugger
            // $.level = 0;
            var propEnum = function (_enum, prop) {
                var str;
                str = $.getEnum(_enum, prop);
                str = str && str.join(', ');
                return str ? +_enum + ' /* ' + str + ' */' : _enum;
            };
            error = function (message) {
                var errorMessage = [
                    'To use the function either have an item selected or provide a valid DOM target.',
                    'Examples:',
                    'With item selected $.props() // => lists all the selected items properties',
                    'With item selected $.props(["fillColor", "parentColorGroup"]) // => lists all the selected items fillColors parentColorGroup properties (in InDesign)',
                    'With item selected $.props(["fillColor", "parentColorGroup"], "id", "name") // => lists id and name of the selected items fillColors parentColorGroup (in InDesign)',
                    'With or without item selected $.props(app.activeDocument.textFrames[0]) // => lists all textFrames[0] properties (in InDesign)',
                    'The examples here are for InDesign but the same idea should work in all the apps \ud83d\ude15',
                    '',
                ].join('\n');
                message = message ? message + '\n' + errorMessage : errorMessage;
                $.level = level;
                propEnum = error = getProp = null;
                return __log(message, 'color:red; top:10px; margin-left:3px;position: relative;');
            };
            for (n = 0; n < l; n++) {
                arg = arguments[n];
                if (typeof arg === 'object') {
                    target = arg;
                    continue;
                }
                if (arg) {
                    props.push(arg);
                }
            }
            if (!target) {
                target = (app.selection && (app.selection[0] || (app.selection.length && app.selection))) || app;
                if (target === app) {
                    propString = 'app';
                } else {
                    propString = app.selection && app.selection[0] ? 'app.selection[0]' : 'app.selection';
                }
                if (!target) {
                    return error('\ud83d\ude91 No item is selected and no target found.');
                }
            }
            getProp = function (prop, target) {
                var property, constructor, n, l, p, s, c;
                try {
                    property = target[prop];
                    if (property !== undefined) {
                        constructor = property.constructor;
                        // if (constructor === Object) {property = property.toSource();}
                        if (constructor === Array) {
                            l = property.length;
                            s = [];
                            for (n = 0; n < l; n++) {
                                p = property[n];
                                if (p === undefined) {
                                    s.push(p);
                                    continue;
                                }
                                c = p.constructor;
                                if (c === Array) {
                                    s.push(p.toSource());
                                    continue;
                                }
                                if (c.name === 'Enumerator') {
                                    s.push(propEnum(p, prop));
                                    continue;
                                }
                                s.push(p);
                            }
                            property = '[' + s + ']';
                        } else if (constructor.name === 'Enumerator') {
                            property = propEnum(property, prop);
                        } else if (constructor === String) {
                            property = '"' + property + '"';
                        }
                    }
                    // constructor
                    results.push(prop + ': ' + property);
                } catch (err) {
                    errors.push(prop + ': ' + err);
                }
            };
            // If the target is provided as an array that specifies the app.selection[0] try and resolve the target;
            notAiCollection = isNotAiDomGroup(target);
            if (notAiCollection && target.constructor === Array) {
                selTarget = (app.selection && (app.selection[0] || (app.selection.length && app.selection))) || app;
                if (selTarget === app) {
                    propString = 'app';
                } else {
                    propString = app.selection && app.selection[0] ? 'app.selection[0]' : 'app.selection';
                }
                l = target.length;
                for (n = 0; n < l; n++) {
                    prop = target[n];
                    propString += '["' + prop + '"]';
                    try {
                        selTarget = selTarget[prop];
                    } catch (err) {
                        return error('\ud83d\ude91 The target ' + propString + ' is not valid' + '\n' + err);
                    }
                }
            }
            target = selTarget || target;
            if (props.length) {
                // if properties have been selected then only find them
                l = props.length;
                for (n = 0; n < l; n++) {
                    getProp(props[n], target);
                }
            } else {
                // else find all the properties
                for (prop in target) {
                    // script properties so as not to double up on the results
                    if (prop === 'properties') {
                        continue;
                    }
                    getProp(prop, target);
                }
            }
            __log(
                'Target' + (propString ? ' - ' + propString : '') + ': ' + target,
                'background:yellow;color:blue;padding:2px;margin-top:2px;font-weight:800;'
            );
            if (results.length) {
                __log('Properties:\n' + results.join('\n'), 'color:rgb(29, 225, 29);font-weight:600;');
            }
            if (errors.length) {
                __error('Invalid Properties:\n' + errors.join('\n'));
            }
            methods = notAiCollection ? target.reflect.methods : [];
            if (methods.length) {
                __log('Methods:\n' + methods.join('()\n') + '()', 'color:#39F;font-weight:600;');
            }
            $.level = level;
            propEnum = error = getProp = null;
            return { properties: results, methods: methods, errors: errors };
        };
    } else {
        $.props = __log = __error = __result = $.writeln;
    }
    __sel = function (index) {
        if (index === undefined) {
            return (app.selection && app.selection[0]) || app.selection;
        }
        return app.selection[index];
    };

    __doc = function (index) {
        var doc;
        index = index || 0;
        doc = app.documents && app.documents.length && app.documents[index];
        if (doc) {
            return doc;
        }
        throw new Error('Error: There are no open documents.');
    };
    $.leak =
        $.leak ||
        function () {
            var oldSummary, newSummary, summaryObject, diffObject, key, diffArray, count, value;
            oldSummary = this.oldSummary || {};
            newSummary = $.summary();
            summaryObject = {};
            diffObject = {};
            newSummary.replace(/(\d+) (\S+)/g, function (whole, count, prop) {
                var diff;
                count = +count;
                summaryObject[prop] = count;
                diff = count - (oldSummary[prop] || 0);
                if (diff) {
                    diffObject[prop] = diff;
                }
            });
            for (key in oldSummary) {
                if (!summaryObject[key]) {
                    diffObject[key] = -oldSummary[key];
                }
            }
            this.oldSummary = summaryObject;
            diffArray = [];
            for (key in diffObject) {
                value = diffObject[key];
                if (value > 0) {
                    value = '+' + value;
                }
                diffArray.push([key, '\t' + value, '\t' + summaryObject[key]]);
            }
            diffArray.sort(function (a, b) {
                if (a[1] === b[1]) {
                    return 0;
                }
                if (+a[1] > +b[1]) {
                    return -1;
                }
                return 1;
            });
            count = diffArray.length;
            if (!count) {
                return 'No change from last $.leak()';
            }
            report = diffArray.join('\n').replace(/,/g, ': ');
            return count + ' memory change' + (count > 1 ? 's' : '') + '\n' + diffArray.join('\n').replace(/,/g, ': ');
        };
})();
