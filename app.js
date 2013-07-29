(function(){
 
  return {
    appID:  'agentTrackerv1',
    defaultState: 'loading',
    events: {
      'app.activated': 'onActivated'
    }, //end events
    onActivated: function()
    {
      this.doneLoading = false;
      this.loadIfDataReady();
    },
    loadIfDataReady: function()
    {
      if ( !this.doneLoading && this.ticket().assignee().group() != null)
      {
        this.doneLoading = true;
        this.appInit();
      }
    },
    appInit: function(){
      var aname;
      try
      {
        aname = this.ticket().assignee().user().name();
      }catch(err){
        console.log("Ticket is unassigned..");
        aname = false;
      }
      if(aname){
        aname = aname.replace(" ", "_");
        aname = aname.toLowerCase();
        this.ticket().tags().add(aname);
      }
      if(this.settings.append_group){
        var group = this.ticket().assignee().group().name();
        group = group.toLowerCase();
        group = group.replace(" ", "_");
        this.ticket().tags().add(group);
      }
    }
  };
}());
