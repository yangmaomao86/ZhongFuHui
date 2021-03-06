/**
 * A customizable date picker.
 * Based on bootstrap-datepicker

 * See available features http://bootstrap-datepicker.readthedocs.org/en/release/options.html
 *
 * Default options : fr, autoclose, french date format
 * Added feature :
 * - an 'ISOString' format
 *
 * Inputs:
 * @param {string} format (optional) datepicker output format (ex. 'yyyy-mm-dd') or 'ISOString'
 *                 see http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
 * @param {object} datepickerOptions (optional) datepicker options object as described in
 *                 http://bootstrap-datepicker.readthedocs.org/en/release/options.html
 *                 This object is merged with default options.
 *                 This object is watched and the datepicker is reseted on change.
 *
 */
angular
  .module('bootstrapdatepicker', [])
  .directive('bootstrapDatepicker', ['$timeout', 'dateFilter', function ($timeout, dateFilter) {

    // bootstrap datepicker display format
    // use only d, dd, m, mm, yy, yyyy
    // cf. http://bootstrap-datepicker.readthedocs.org/en/latest/options.html#format
    var FORMAT_DEFAULT = 'dd/mm/yyyy';

    // moment / cms formats
    var FORMAT_IO_DEFAULT = 'YYYY-MM-DD';

    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        datepickerOptions: '=',
        datepickerIoFormat: '@'
      },
      link: function (scope, element, attrs, ngModelCtrl) {

        var initialized = false; //< state : is our controller initialized ?
        var datepickerMomentFormat;

        // If we close the date picker, it won't reappear until we blur/focus again.
        // This helper make it reappear on every click on the parent element, more convenient.
        element.on('click', function() {
          element.datepicker('show');
        });

        // Bootstrap datepicker has a strange behaviour on "enter", even with keyboard support set to false.
        // If not empty, it clears the field. If empty, it sets the last selected date.
        // We attempt to correct it.
        element.on('keydown', function(event) {
          if(event.keyCode === 13) {
            // reset the datepicker to clear its internal state (whom we suppose is wrong)
            element.datepicker('remove');
            initialize();
            event.preventDefault(); // prevent the enter key event from being passed to other DOM elements
          }
        });

        // init / reinit if datepickerOptions change
        scope.$watch('datepickerOptions', function(current, previous) {
          if (! current) return;
          if (_.isEqual(current, previous)) return;
          if(initialized) {
            // reset datepicker to apply the new options
            element.datepicker('remove'); // send 'remove' command to the existing datepicker
            initialize();
          }
        }, true);

        // angular input formatting pipeline
        ngModelCtrl.$formatters.unshift(function (modelValue) {

          // We uses this unshift function call as a detector of model readiness.
          // (couldn't find another way)
          // WARNING : the remaining of this function expects initialization to be done.
          if(! initialized) {
            initialize();
          }

          // now that init is done, we can do the conversion

          var datepickerValue = formatIn(modelValue);

          if(datepickerValue) {
            // Helps datepicker to pick the current model value
            $timeout(function () {
              element.datepicker('update', datepickerValue);
            });
          }

          return datepickerValue;
        });

        // angular output formatting pipeline
        ngModelCtrl.$parsers.unshift(function () {
          return formatOut(element.val());
        });

        // Initialize controller, creating the datepicker widget.
        // For current date to be correctly set in datepicker,
        // we must wait for the model to be ready.
        function initialize() {
          var options = _.defaults({}, scope.datepickerOptions, {
            language: 'fr',
            autoclose: true, // click on a day closes the datepicker
            format: FORMAT_DEFAULT
          });

          // datepicker and moment formats are differents, we need to convert <=> from lower to upper case
          // use only d, dd, m, mm, yy, yyyy
          datepickerMomentFormat = (options.format ? options.format : FORMAT_DEFAULT).toUpperCase();

          // We can now instantiate the datepicker
          element.datepicker(options);

          // done
          initialized = true;
        }

        // format from model format to datepicker internal format
        function formatIn(modelValue) {
          if(! modelValue) return;

          var momentDate = moment(modelValue, scope.datepickerIoFormat ? scope.datepickerIoFormat : FORMAT_IO_DEFAULT);

          return momentDate.format(datepickerMomentFormat);
        }

        // format from datepicker internal format to model format
        function formatOut(datepickerValue) {
          if (! datepickerValue) return;

          var momentDate = moment(datepickerValue, datepickerMomentFormat);

          // standard formats
          return momentDate.format(scope.datepickerIoFormat ? scope.datepickerIoFormat : FORMAT_IO_DEFAULT);
        }
      }
    };
  }]);