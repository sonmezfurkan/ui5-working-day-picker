sap.ui.define([
    "sap/m/DatePicker",
    "sap/m/MessageToast"
  ], function (DatePicker, MessageToast) {
    "use strict";
  
   /**
	 * Date picker control that only allows working days to be selected
	 * @class
	 * @extends sap.m.DatePicker
	 * @author Furkan Soenmez
	 * @param {string} [errorMessage] Error message to be displayed when a non-working day is selected on calendar
	 * @alias WorkingDayPicker
	 * @constructor
	 * @public
	 */
    return DatePicker.extend("WorkingDayPicker",
    /** @lends WorkingDayPicker */
    {
      metadata: {
        properties:
          /** @lends errorMessage */
        {
          /**
           * errorMessage
           * @private
           */
          errorMessage: { type: "string", defaultValue: "Cannot select weekends" }
        }
      },
  
      /**
       * The default behaviour of DatePicker is, automatically converting invalid dates when changed directly inside the control without using calendar
       * if the newly determined date is a non-working date, converts it to the closest working day
       * @param {Object} oControlEvent
		   * @event
       * @override
       * @public
      */
      onChange: function(oEvent) {
  
        // call super
        DatePicker.prototype.onChange.apply(this, arguments);
        
        // get new date value
        var oNewDate = this.getDateValue();
  
        // check if the new date is valid
        if (!oNewDate || !this._bValid)
          return;
  
        // convert to closest work day
        while (oNewDate.getDay() === 0 || oNewDate.getDay() === 6) {
          oNewDate.setDate(oNewDate.getDate() + 1);
        }
  
        // set new value
        this._$input.val(this._formatValue(oNewDate));
        this.setProperty("value", this._formatValue(oNewDate), true);
        this.setProperty("dateValue", oNewDate, true);
      },
  
      /**
       * if the selected date on calendar is not a working day, displays an error message and aborts selection process
       * @override
		   * @private
       */
      _selectDate: function () {
  
        // get selected date from calendar control
        var aSelectedDates = this._oCalendar.getSelectedDates();
  
        // if a non-working day is selected, display error message and abort selection
        if (aSelectedDates.length && aSelectedDates[0].getStartDate().getDay() === 0 || aSelectedDates[0].getStartDate().getDay() === 6) {
          MessageToast.show(this.getErrorMessage());
          return;
        }
  
        // call super
        DatePicker.prototype._selectDate.apply(this, arguments);
      },
  
      /**
       * inherit parent renderer
       * @inheritdoc
		   * @private
       */
      renderer: {}
  
    });
  });
