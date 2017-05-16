$(document).ready(function() {
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });
  $.validator.setDefaults({
    ignore: []
  });
  $("form").validate({
    submitHandler: function(form) {
      // console.log(form);
      return;
    },
    errorElement: 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  // DataTables
  $('#feedTable').DataTable();
  $('#genfeedTable').DataTable();
});



new Vue({
  el: "#app",
  data: {
    name: "",
    email: "",
    feedbackType: "",
    likes: [],
    selected: "",
    description: "",
    screenshotFile: "",
    recommend: "",
    satisfied: "",
    outcome: "",
    service: "",
    time: ""
  },
  methods: {
    // submitFeedback: function(){

    //   // if (this.name == "" || this.email == "" || this.feedbackType == "" || this.likes == null || this.selected == "" || this.description == "") {
    //   //   alert("Please fill all the fields...");
    //   // }
    //   // else{
    //     alert("Feedback Details: \n Name: " + this.name + "\n Email: " + this.email + "\n Feedback Type: " + this.feedbackType + "\n You Like: " + this.likes + "\n Satisfaction: " + this.selected + "\n Recommend: " + this.recommend + "\n Satisfied: " + this.satisfied + "\n Outcome: " + this.outcome + "\n service: " + this.service + "\n Time: " + this.time + "\n Description: " + this.description);
    //   //}
    //   // + "\n File Name: " + this.screenshotFile
    // },

    resetForm: function(){
      this.name = "";
      this.email = "";
      this.feedbackType = "";
      this.likes = [];
      this.description = "";
      this.screenshotFile = "";
    }
  }
});

$(document).ready(function(){

  // Our main user form
  $('#feedbackForm').on('submit', function(){

    // If the feedback type is  general feedback, then different schema to POST
    if(($('#feedbackForm [name=fType]:checked').val()) == "General Feedback"){
      var name = $('#feedbackForm #name').val();
      var email = $('#feedbackForm #email').val();
      var type = $('#feedbackForm [name=fType]:checked').val();
      var recommend = $('#feedbackForm #recommend').val();
      var satisfied = $('#feedbackForm #satisfied').val();
      var outcome = $('#feedbackForm #outcome').val();
      var service = $('#feedbackForm #service').val();
      var time = $('#feedbackForm #time').val();

      // Check if required fields are filled else show error
      if(name && email && type){
        $.ajax({
          type: 'POST',
          url: '/genfeedback',
          data: {name, email, type, recommend, satisfied, outcome, service, time},
          success: function(data){
            //Show success message
            swal({
              title: "Success!",
              text: "Your feedback is subbmitted! We appreciate your feedback! Thanks.",
              type: "success",
            });
            $('#resetBtn').trigger('click');
          }
        });
      }else{
        swal({
          title: "Missing Data!",
          text: "Please fill all the required fields and try again",
          type: "error",
        });
      }
      return false;
    }else{
      // Other feedback type schema
      var name = $('#feedbackForm #name');
      var email = $('#feedbackForm #email');
      var type = $('#feedbackForm [name=fType]:checked');
      var desc = $('#feedbackForm #bio');
      var userFeedback = {fullName: name.val(), email: email.val(), feedType: type.val(), description: desc.val()};

      // Check if required fields are filled else show error
      if(name.val() && email.val() && type.val() && desc.val()){
        $.ajax({
          type: 'POST',
          url: '/feedback',
          data: userFeedback,
          success: function(data){
            //Show success message
            swal({
              title: "Success!",
              text: "Your feedback is subbmitted! We appreciate your feedback! Thanks.",
              type: "success",
            });
            $('#resetBtn').trigger('click');
          }
        });
      }else{
        swal({
          title: "Missing Data!",
          text: "Please fill all the required fields and try again",
          type: "error",
        });
      }
      return false;
    }
  });

});
