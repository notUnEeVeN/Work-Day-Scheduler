$(document).ready(function(){
  $(function () {

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

    //added a setinterval function, so that when the time updates, the colors of the rows will also live update
    //here i used the jquery each method, that iterates through every element with the class '.time-block' and then executes the function 
    //added a setinterval function so that the classes will refresh every second, and will in turn live update when the hour changes 
    setInterval(function() {
      $(".time-block").each(function() {
        //setting our variables , we are fetching the ID attribute, which I set equivalent to the time they represent using the 24 hour clock
        var hour = $(this).attr('id');
        //getting the current hour using dayjs and setting it to a variable
        var currentHour = dayjs().hour()
        //added this line to remove all the classes before adding new ones, as an attempt to fix the bug where the classes dont live update when the hour changes
        $(this).removeClass('past present future');
        //for each row in our planner, we check the current hour (which also comes in the 24 hour format) against our ID's, that i set to the appropriate 24 hour number, and then set the appropriate class depending on their relation to the current time 
        if(currentHour > hour) {
          $(this).addClass('past');
        } else if (currentHour < hour) {
          $(this).addClass('future');
        } else {
          $(this).addClass('present');
        }
      });
    }, 1000);

    //had to seperate this function from the last one, as it would delete what you were typing every second, making you un able to input any text
    $('.time-block').each(function() {
        //getting the key we stored along with the text, to allow us to input the correct text into the row
        var ID = $(this).attr('id');
        //calling the key in local storage will 
        var description = localStorage.getItem(ID);
        //as we are currently in the parent '.time-block' class, we can use the .find method to target the a specific child element with the class name of '.description' 
        $(this).find('.description').val(description);
    });
     

    //the basic setInterval function that updates the timer on the top of the page using dayjs every second
    setInterval(function() {
      $('#currentDay').text(dayjs().format('MMM D, YYYY hh:mm:ss A'))
    }, 1000);
  });
});