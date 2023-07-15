// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function(){
  $(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //

    //jquery listener event on every element that has the '.btn' class
      $('.btn').click(function() {
        //we are setting the value of the sibling of the '.btn' class that has the '.description' class to a variable
        var description = $(this).siblings('.description').val();
        //checks to see if there is text in the description variable or not
        if (description !== '') {
          //if there is text, we get the attribute of the parent element of the '.btn' class called 'id', and put it in the variable ID
          var ID= $(this).parent().attr('id');
          //store the ID and text stored in description to local storage, the ID will be used as the key to call the correct data when setting the text later on 
          localStorage.setItem(ID, description);
        }
      });
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    
    //here i used the jquery each method, that iterates through every element with the class '.time-block' and then executes the function 
    $(".time-block").each(function() {
      //setting our variables , we are fetching the ID attribute, which I set equivalent to the time they represent using the 24 hour clock
      var hour = $(this).attr('id');
      //getting the current hour using dayjs and setting it to a variable
      var currentHour = dayjs().hour();
      //for each row in our planner, we check the current hour (which also comes in the 24 hour format) against our ID's, that i set to the appropriate 24 hour number, and then set the appropriate class depending on their relation to the current time 
      if(currentHour > hour) {
        $(this).addClass('past');
      } else if (currentHour < hour) {
        $(this).addClass('future');
      } else {
        $(this).addClass('present');
      }

      // here we are setting the text that is stored in the local storage to their appropriate position, so data will still be displayed if we refresh the page
      //I decided to put this in with my function that sets the right classes, as the function already iterates through every row in the planner, this lead to slightly confusing variable names however
      //the hour variable inputted in the local storage, is the same as the ID variable called when we stored the data originally, so we can call it as the key to get the correct text values associated with that row
      var description = localStorage.getItem(hour);
      //as we are currently in the parent '.time-block' class, we can use the .find method to target the a specific child element with the class name of '.description' 
      $(this).find('.description').val(description);
    });
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    //the basic setInterval function that updates the timer on the top of the page using dayjs every second
    setInterval(function() {
      $('#currentDay').text(dayjs().format('MMM D, YYYY hh:mm:ss A'))
    }, 1000);
  });
});