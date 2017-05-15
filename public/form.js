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
      console.log(form);
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

// Vue.directive("select", {
//     "twoWay": true,

//     "bind": function () {
//         $(this.el).material_select();

//         var self = this;

//         $(this.el).on('change', function() {
//             self.set($(self.el).val());
//         });
//     },

//     update: function (newValue, oldValue) {
//         $(this.el).val(newValue);
//     },

//     "unbind": function () {
//         $(this.el).material_select('destroy');
//     }
// });



$(document).ready(function(){

  $('#feedbackForm').on('submit', function(){

    if(($('#feedbackForm [name=fType]:checked').val()) == "General Feedback"){
      var name = $('#feedbackForm #name');
      var email = $('#feedbackForm #email');
      var type = $('#feedbackForm [name=fType]:checked');
      var recommend = $('#feedbackForm #recommend');
      var satisfied = $('#feedbackForm #satisfied');
      var outcome = $('#feedbackForm #outcome');
      var service = $('#feedbackForm #service');
      var time = $('#feedbackForm #time');
      var slidersValue = {recommend: recommend.val(), satisfied: satisfied.val(), outcome: outcome.val(), service: service.val(), time: time.val() }

      // [ {recommend: recommend.val()}, {satisfied: satisfied.val()}, {outcome: outcome.val()}, {service: service.val()}, {time: time.val()} ]

      var userFeedback = {fullName: name.val(), email: email.val(), feedType: type.val(), genFeed: { recommend: recommend.val(), satisfied: satisfied.val(), outcome: outcome.val(), service: service.val(), time: time.val() } };

      if(name.val() && email.val() && type.val()){
        $.ajax({
          type: 'POST',
          url: '/genfeedback',
          data: userFeedback,
          success: function(data){
            //do something with the data via front-end framework
            swal({
              title: "Success!",
              text: "Your feedback is subbmitted! We appreciate your feedback! Thanks.",
              type: "success",
            });
            $('#feedbackForm')[0].reset();
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
      var name = $('#feedbackForm #name');
      var email = $('#feedbackForm #email');
      var type = $('#feedbackForm [name=fType]:checked');
      var desc = $('#feedbackForm #bio');
      var userFeedback = {fullName: name.val(), email: email.val(), feedType: type.val(), description: desc.val()};

      if(name.val() && email.val() && type.val() && desc.val()){
        $.ajax({
          type: 'POST',
          url: '/feedback',
          data: userFeedback,
          success: function(data){
            //do something with the data via front-end framework
            swal({
              title: "Success!",
              text: "Your feedback is subbmitted! We appreciate your feedback! Thanks.",
              type: "success",
            });
            $('#feedbackForm')[0].reset();
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